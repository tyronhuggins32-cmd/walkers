(() => {
  "use strict";

  const SUPABASE_URL = "https://hapnntzinjmqdoytvphn.supabase.co";
  const SUPABASE_KEY = "sb_publishable_ByuHAeY_f6wPd_kDOMAcAA_OPEbWVoM";
  const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const myId = sessionStorage.walkersPlayerId || (
    sessionStorage.walkersPlayerId =
      (crypto.randomUUID?.() || Math.random().toString(36).slice(2))
  );

  const net = {
    client: null,
    ready: false,
    channel: null,
    readyChannel: null,
    room: "",
    seed: "",
    host: false,
    name: "",
    remotes: new Map(),
    joinTimer: 0
  };

  function showStatus(message, color = "#287a45") {
    let el = document.getElementById("multiplayer-status");
    if (!el) {
      el = document.createElement("div");
      el.id = "multiplayer-status";
      Object.assign(el.style, {
        position: "fixed",
        top: "max(12px, env(safe-area-inset-top))",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: "99999",
        padding: "8px 14px",
        borderRadius: "8px",
        color: "#fff",
        font: "800 11px system-ui, sans-serif",
        letterSpacing: "1px",
        whiteSpace: "nowrap",
        boxShadow: "0 5px 18px rgba(0,0,0,.4)"
      });
      document.body.appendChild(el);
    }
    el.textContent = message;
    el.style.background = color;
  }

  function roomMessage(message, bad = false) {
    const el = document.getElementById("mpMessage");
    if (!el) return;
    el.textContent = message;
    el.style.color = bad ? "#ef8d83" : "#aebca9";
  }

  function cleanCode(value) {
    return String(value || "")
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, "")
      .slice(0, 6);
  }

  function randomCode() {
    const bytes = crypto.getRandomValues(new Uint8Array(6));
    return Array.from(bytes, (value) => ALPHABET[value % ALPHABET.length]).join("");
  }

  function send(event, payload) {
    if (!net.channel) return Promise.resolve("no channel");
    return net.channel.send({ type: "broadcast", event, payload });
  }

  function addLobby() {
    const card = document.querySelector(".start-card");
    if (!card || document.getElementById("mpLobby")) return;

    const style = document.createElement("style");
    style.textContent = `
      #mpLobby{margin-top:16px;padding:14px;border:1px solid rgba(183,200,174,.22);background:rgba(5,9,7,.72)}
      #mpLobby h3{margin:0 0 10px;color:#dce4d5;font:900 13px system-ui;letter-spacing:1.4px}
      #mpLobby .mp-row{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:8px 0}
      #mpLobby input,#mpLobby button{min-height:42px;border:1px solid rgba(183,200,174,.28);border-radius:3px}
      #mpLobby input{width:100%;box-sizing:border-box;padding:0 11px;background:#0b110e;color:#edf2e8;font:800 13px system-ui;text-transform:uppercase}
      #mpLobby button{background:#29372e;color:#edf2e8;font:900 11px system-ui;letter-spacing:.8px}
      #mpLobby button:disabled{opacity:.4}
      #mpMessage{min-height:17px;margin:8px 0 0;color:#aebca9;font:700 11px system-ui}
      @media(max-width:540px){#mpLobby .mp-row{grid-template-columns:1fr}}
    `;
    document.head.appendChild(style);

    const lobby = document.createElement("section");
    lobby.id = "mpLobby";
    lobby.innerHTML = `
      <h3>ONLINE CO-OP</h3>
      <input id="mpName" maxlength="16" placeholder="YOUR NAME" autocomplete="off">
      <div class="mp-row">
        <button id="mpCreate" type="button" disabled>CREATE ROOM</button>
        <input id="mpRoom" maxlength="6" placeholder="ROOM CODE" autocomplete="off">
      </div>
      <button id="mpJoin" type="button" disabled>JOIN ROOM</button>
      <p id="mpMessage">Connecting to multiplayer…</p>
    `;
    const seedField = card.querySelector(".seed-field");
card.insertBefore(lobby, seedField);

    document.getElementById("mpName").value = localStorage.walkersOnlineName || "";
    document.getElementById("mpRoom").addEventListener("input", (event) => {
      event.target.value = cleanCode(event.target.value);
    });
    document.getElementById("mpCreate").addEventListener("click", () => openRoom(true));
    document.getElementById("mpJoin").addEventListener("click", () => openRoom(false));
  }

  function enableLobby() {
    document.getElementById("mpCreate")?.removeAttribute("disabled");
    document.getElementById("mpJoin")?.removeAttribute("disabled");
    roomMessage("Create a room or enter a friend's code.");
  }

  function startSharedGame(seed) {
    const game = window.__walkers;
    if (!game) {
      roomMessage("The game engine did not load.", true);
      return;
    }
    if (
      game.__multiplayerRoom === net.room &&
      game.__multiplayerSeed === seed &&
      game.mode === "playing"
    ) return;

    game.__multiplayerRoom = net.room;
    game.__multiplayerSeed = seed;
    const seedInput = document.getElementById("seedInput");
    if (seedInput) seedInput.value = seed;
    game.startNew(seed);
    game.toast?.(`Online room ${net.room} joined.`);
  }

  function receivePlayer(payload) {
    if (!payload || payload.id === myId || payload.room !== net.room) return;
    let remote = net.remotes.get(payload.id);
    if (!remote) {
      remote = {
        id: payload.id,
        name: payload.name || "Survivor",
        x: payload.x,
        y: payload.y,
        targetX: payload.x,
        targetY: payload.y,
        facingX: 1,
        facingY: 0,
        renderFacingX: 1,
        renderFacingY: 0,
        velocityX: 0,
        velocityY: 0,
        actualSpeed: 0,
        moveBlend: 0,
        animTime: 0,
        turnLean: 0,
        radius: 7.5,
        health: 100,
        stamina: 100,
        hunger: 100,
        thirst: 100,
        infection: 0,
        inventory: [],
        equipped: "knife",
        attackAnim: 0,
        attackDuration: 0.3,
        hurtAnim: 0,
        hurtCooldown: 0,
        actionAnim: 0,
        actionDuration: 0,
        knockbackTime: 0,
        exhausted: false
      };
      net.remotes.set(payload.id, remote);
    }

    remote.name = payload.name || remote.name;
    remote.targetX = Number(payload.x) || 0;
    remote.targetY = Number(payload.y) || 0;
    remote.facingX = Number(payload.fx) || remote.facingX || 1;
    remote.facingY = Number(payload.fy) || 0;
    remote.renderFacingX = remote.facingX;
    remote.renderFacingY = remote.facingY;
    remote.velocityX = Number(payload.vx) || 0;
    remote.velocityY = Number(payload.vy) || 0;
    remote.actualSpeed = Number(payload.speed) || 0;
    remote.moving = Boolean(payload.moving);
    remote.sprintingNow = Boolean(payload.sprinting);
    remote.crouching = Boolean(payload.crouching);
    remote.equipped = payload.equipped || "knife";
    remote.attackAnim = Math.max(remote.attackAnim || 0, Number(payload.attackAnim) || 0);
    remote.hurtAnim = Math.max(remote.hurtAnim || 0, Number(payload.hurtAnim) || 0);
    remote.appearance = payload.appearance || remote.appearance;
    remote.seen = performance.now();
  }

  async function openRoom(makeHost) {
    if (!net.ready) {
      roomMessage("Multiplayer is still connecting.", true);
      return;
    }

    const nameInput = document.getElementById("mpName");
    const roomInput = document.getElementById("mpRoom");
    const name = String(nameInput?.value || "").trim().slice(0, 16) ||
      `Survivor-${myId.slice(0, 4)}`;
    const room = makeHost ? randomCode() : cleanCode(roomInput?.value);

    if (!makeHost && room.length !== 6) {
      roomMessage("Enter the host's 6-character room code.", true);
      return;
    }

    localStorage.walkersOnlineName = name;
    net.name = name;
    net.room = room;
    net.host = makeHost;
    net.seed = "";
    net.remotes.clear();
    if (roomInput) roomInput.value = room;

    if (net.channel) await net.client.removeChannel(net.channel);
    roomMessage(makeHost ? "Creating room…" : "Looking for the host…");
    showStatus(`JOINING ${room}…`, "#7a621f");

    net.channel = net.client
      .channel(`walkers-room-${room}`, {
        config: { presence: { key: myId } }
      })
      .on("broadcast", { event: "join-request" }, () => {
        if (!net.host || !net.seed) return;
        send("room-state", {
          room: net.room,
          seed: net.seed,
          hostId: myId,
          day: window.__walkers?.day || 1,
          timeMinutes: window.__walkers?.timeMinutes || 480
        });
      })
      .on("broadcast", { event: "room-state" }, ({ payload }) => {
        if (net.host || !payload || payload.room !== net.room) return;
        clearTimeout(net.joinTimer);
        net.seed = payload.seed;
        startSharedGame(net.seed);
        showStatus(`ONLINE • ${net.room}`);
        roomMessage(`Joined room ${net.room}.`);
      })
      .on("broadcast", { event: "player-state" }, ({ payload }) => {
        receivePlayer(payload);
        if (!net.host && payload?.host && window.__walkers?.mode === "playing") {
          window.__walkers.day = payload.day || window.__walkers.day;
          window.__walkers.timeMinutes = Number(payload.timeMinutes) || window.__walkers.timeMinutes;
          window.__walkers.weather = payload.weather || window.__walkers.weather;
        }
      })
      .on("presence", { event: "sync" }, () => {
        const presence = net.channel.presenceState();
        const count = Object.values(presence)
          .reduce((total, entries) => total + entries.length, 0);
        roomMessage(`Room ${net.room} • ${count} player${count === 1 ? "" : "s"}`);
      })
      .on("presence", { event: "leave" }, ({ leftPresences }) => {
        for (const presence of leftPresences || []) {
          if (presence.id) net.remotes.delete(presence.id);
        }
      });

    net.channel.subscribe(async (status) => {
      if (status === "SUBSCRIBED") {
        await net.channel.track({
          id: myId,
          name: net.name,
          host: net.host,
          joinedAt: Date.now()
        });

        if (net.host) {
          net.seed = String(
            document.getElementById("seedInput")?.value ||
            Date.now().toString(36)
          ).trim().toUpperCase().slice(0, 24);
          startSharedGame(net.seed);
          await send("room-state", {
            room: net.room,
            seed: net.seed,
            hostId: myId,
            day: 1,
            timeMinutes: 480
          });
          showStatus(`HOST • ${net.room}`);
          roomMessage(`Room ${net.room} created. Share this code.`);
        } else {
          await send("join-request", { id: myId, name: net.name });
          net.joinTimer = setTimeout(() => {
            if (!net.seed) roomMessage("No host answered. Check the room code.", true);
          }, 6000);
        }
      }

      if (status === "CHANNEL_ERROR" || status === "TIMED_OUT") {
        roomMessage("Room connection failed. Try again.", true);
        showStatus("ROOM CONNECTION FAILED", "#a83232");
      }
    });
  }

  function installRemoteRenderer() {
    const game = window.__walkers;
    if (!game || game.__remoteRendererInstalled) return;
    game.__remoteRendererInstalled = true;
    const originalDrawPlayer = game.drawPlayer;

    game.drawPlayer = function drawOnlinePlayers(ctx, shakeX = 0, shakeY = 0) {
      originalDrawPlayer.call(this, ctx, shakeX, shakeY);
      if (!this.player || !net.room) return;

      const localPlayer = this.player;
      const now = performance.now();
      try {
        for (const [id, remote] of net.remotes) {
          if (now - (remote.seen || 0) > 6000) {
            net.remotes.delete(id);
            continue;
          }

          const dt = Math.min(0.05, Math.max(0.001, (now - (remote.lastDraw || now - 16)) / 1000));
          remote.lastDraw = now;
          const blend = 1 - Math.exp(-13 * dt);
          remote.x += (remote.targetX - remote.x) * blend;
          remote.y += (remote.targetY - remote.y) * blend;
          remote.moveBlend += ((remote.moving ? 1 : 0) - remote.moveBlend) * blend;
          remote.animTime += dt * (remote.moving ? remote.sprintingNow ? 16 : 11 : 2.2);
          remote.attackAnim = Math.max(0, (remote.attackAnim || 0) - dt);
          remote.hurtAnim = Math.max(0, (remote.hurtAnim || 0) - dt);

          if (this.isHiddenInside?.(remote)) continue;
          this.player = remote;
          originalDrawPlayer.call(this, ctx, shakeX, shakeY);

          const screen = this.worldToScreen(remote.x, remote.y, shakeX, shakeY);
          ctx.save();
          ctx.font = "900 8px system-ui, sans-serif";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          const label = remote.name || "Survivor";
          const width = Math.max(52, ctx.measureText(label).width + 14);
          ctx.fillStyle = "rgba(5,9,7,.88)";
          ctx.fillRect(screen.x - width / 2, screen.y - 49, width, 14);
          ctx.fillStyle = "#75cba3";
          ctx.fillRect(screen.x - width / 2, screen.y - 49, 3, 14);
          ctx.fillStyle = "#edf5e9";
          ctx.fillText(label, screen.x, screen.y - 42);
          ctx.restore();
        }
      } finally {
        this.player = localPlayer;
      }
    };
  }

  function broadcastPlayer() {
    const game = window.__walkers;
    const player = game?.player;
    if (!net.channel || !net.room || !player || game.mode !== "playing") return;

    send("player-state", {
      room: net.room,
      id: myId,
      name: net.name,
      host: net.host,
      x: Math.round(player.x * 10) / 10,
      y: Math.round(player.y * 10) / 10,
      fx: player.renderFacingX ?? player.facingX ?? 1,
      fy: player.renderFacingY ?? player.facingY ?? 0,
      vx: player.velocityX || 0,
      vy: player.velocityY || 0,
      speed: player.actualSpeed || 0,
      moving: Boolean(player.movingNow || player.actualSpeed > 2),
      sprinting: Boolean(player.sprintingNow),
      crouching: Boolean(player.crouching),
      equipped: player.equipped || "knife",
      attackAnim: player.attackAnim || 0,
      hurtAnim: player.hurtAnim || 0,
      appearance: player.appearance || null,
      day: game.day,
      timeMinutes: game.timeMinutes,
      weather: game.weather
    });
  }

  function boot() {
    addLobby();
    if (!window.supabase?.createClient) {
      showStatus("MULTIPLAYER LIBRARY MISSING", "#a83232");
      roomMessage("Supabase did not load.", true);
      return;
    }

    net.client = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false
      }
    });
    window.walkersSupabase = net.client;
    window.walkersMultiplayer = net;

    installRemoteRenderer();
    showStatus("CONNECTING ONLINE…", "#7a621f");

    net.readyChannel = net.client.channel("walkers-ready");
    net.readyChannel.subscribe((status) => {
      if (status === "SUBSCRIBED") {
        net.ready = true;
        enableLobby();
        showStatus("ONLINE READY");
      }
      if (status === "CHANNEL_ERROR" || status === "TIMED_OUT") {
        showStatus("MULTIPLAYER CONNECTION FAILED", "#a83232");
        roomMessage("Could not reach the multiplayer service.", true);
      }
    });

    setInterval(broadcastPlayer, 200);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot, { once: true });
  } else {
    boot();
  }
})();