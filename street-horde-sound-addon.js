(() => {
  "use strict";

  const INSTALL_FLAG = "__walkersStreetHordeSoundV1";
  const ROAD_TILE = 1;
  const ROAD_SPACING = 48;

  const audio = {
    context: null,
    master: null,
    wind: null,
    muted: false,
    stepTimer: 0,
    groanTimer: 1.2,
    cooldowns: new Map()
  };

  const clamp = (value, min, max) =>
    Math.max(min, Math.min(max, value));

  function hash01(text) {
    let hash = 2166136261;

    for (const character of String(text)) {
      hash ^= character.charCodeAt(0);
      hash = Math.imul(hash, 16777619);
    }

    return (hash >>> 0) / 4294967295;
  }

  function positiveModulo(value, divisor) {
    return ((value % divisor) + divisor) % divisor;
  }

  function tileAt(world, worldX, worldY) {
    if (!world) return 3;

    const tileSize = world.tileSize || 32;
    const tx = Math.floor(worldX / tileSize);
    const ty = Math.floor(worldY / tileSize);

    if (
      tx < 0 ||
      ty < 0 ||
      tx >= world.width ||
      ty >= world.height
    ) {
      return 3;
    }

    if (world.chunked) {
      const chunkSize = world.chunkSize || 96;
      const cx = Math.floor(tx / chunkSize);
      const cy = Math.floor(ty / chunkSize);
      const chunk = world.chunks?.get(`${cx},${cy}`);

      if (chunk?.tiles) {
        const lx = tx - cx * chunkSize;
        const ly = ty - cy * chunkSize;
        return chunk.tiles[ly * chunkSize + lx];
      }

      const xDistance = Math.min(
        positiveModulo(tx, ROAD_SPACING),
        ROAD_SPACING - positiveModulo(tx, ROAD_SPACING)
      );

      const yDistance = Math.min(
        positiveModulo(ty, ROAD_SPACING),
        ROAD_SPACING - positiveModulo(ty, ROAD_SPACING)
      );

      return Math.min(xDistance, yDistance) <= 2
        ? ROAD_TILE
        : 0;
    }

    return world.tiles?.[ty * world.width + tx] ?? 0;
  }

  function isStreetZombie(world, spawn) {
    return tileAt(world, spawn.x, spawn.y) === ROAD_TILE;
  }

  function makeStreetCopy(game, source, copyNumber) {
    const world = game.world;
    const seed =
      `${world.seed}:${source.id}:street-copy:${copyNumber}`;

    const angle = hash01(`${seed}:angle`) * Math.PI * 2;
    const distance = 18 + hash01(`${seed}:distance`) * 24;

    let x = source.x + Math.cos(angle) * distance;
    let y = source.y + Math.sin(angle) * distance;

    if (tileAt(world, x, y) !== ROAD_TILE) {
      x = source.x - Math.cos(angle) * distance;
      y = source.y - Math.sin(angle) * distance;
    }

    if (tileAt(world, x, y) !== ROAD_TILE) {
      x = source.x;
      y = source.y;
    }

    const healthScale =
      0.94 + hash01(`${seed}:health`) * 0.12;

    const speedScale =
      0.95 + hash01(`${seed}:speed`) * 0.1;

    const health = Math.max(
      1,
      Math.round(
        (source.health || source.maxHealth || 60) * healthScale
      )
    );

    return {
      ...source,
      id: `${source.id}-street3-${copyNumber}`,
      x,
      y,
      health,
      maxHealth: health,
      speed: Math.max(8, (source.speed || 40) * speedScale),
      packId: `${source.packId || source.chunkKey || "street"}-triple`,
      __streetTripleBonus: true,

      // This prevents the older 30% HUD add-on from multiplying
      // these extra street zombies again.
      __hcCleanBonus: true
    };
  }

  function tripleStreetZombies(game) {
    const world = game.world;

    if (
      !world ||
      !Array.isArray(world.zombieSpawns) ||
      !Array.isArray(game.zombies) ||
      typeof game.makeZombie !== "function"
    ) {
      return 0;
    }

    const chunks = world.chunks
      ? [...world.chunks.values()]
      : [{ key: "finite", zombieSpawns: world.zombieSpawns }];

    const worldIds = new Set(
      world.zombieSpawns.map(spawn => spawn.id)
    );

    const liveIds = new Set(
      game.zombies.map(zombie => zombie.id)
    );

    let added = 0;

    for (const chunk of chunks) {
      if (!chunk?.zombieSpawns) continue;

      const sources = [...chunk.zombieSpawns].filter(
        spawn =>
          !spawn.__streetTripleBonus &&
          isStreetZombie(world, spawn)
      );

      const cleared = new Set(
        world.chunkStates?.get(chunk.key)?.clearedZombieIds || []
      );

      for (const source of sources) {
        for (let copyNumber = 1; copyNumber <= 2; copyNumber += 1) {
          const id = `${source.id}-street3-${copyNumber}`;

          if (cleared.has(id)) continue;

          let spawn = chunk.zombieSpawns.find(entry => entry.id === id);

          if (!spawn) {
            spawn = makeStreetCopy(game, source, copyNumber);
            chunk.zombieSpawns.push(spawn);
          }

          if (!worldIds.has(id)) {
            world.zombieSpawns.push(spawn);
            worldIds.add(id);
          }

          if (!liveIds.has(id)) {
            game.zombies.push(game.makeZombie(spawn));
            liveIds.add(id);
            added += 1;
          }
        }
      }
    }

    return added;
  }

  function ensureAudio() {
    const AudioContextClass =
      window.AudioContext || window.webkitAudioContext;

    if (!AudioContextClass) return null;

    if (!audio.context) {
      audio.context = new AudioContextClass();
      audio.master = audio.context.createGain();
      audio.master.gain.value = audio.muted ? 0 : 0.48;
      audio.master.connect(audio.context.destination);
      startWind();
    }

    if (audio.context.state === "suspended") {
      audio.context.resume().catch(() => {});
    }

    return audio.context;
  }

  function startWind() {
    const context = audio.context;

    if (!context || audio.wind) return;

    const length = context.sampleRate * 2;
    const buffer = context.createBuffer(1, length, context.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < length; i += 1) {
      data[i] = (Math.random() * 2 - 1) * 0.32;
    }

    const source = context.createBufferSource();
    const filter = context.createBiquadFilter();
    const gain = context.createGain();

    source.buffer = buffer;
    source.loop = true;
    filter.type = "lowpass";
    filter.frequency.value = 420;
    gain.gain.value = 0.045;

    source.connect(filter);
    filter.connect(gain);
    gain.connect(audio.master);
    source.start();

    audio.wind = { source, filter, gain };
  }

  function canPlay(key, delayMs) {
    const now = performance.now();
    const previous = audio.cooldowns.get(key) || 0;

    if (now - previous < delayMs) return false;

    audio.cooldowns.set(key, now);
    return true;
  }

  function tone({
    frequency = 120,
    endFrequency = frequency,
    duration = 0.12,
    volume = 0.1,
    type = "sine",
    delay = 0
  } = {}) {
    const context = ensureAudio();

    if (!context || audio.muted || volume <= 0) return;

    const now = context.currentTime + delay;
    const oscillator = context.createOscillator();
    const gain = context.createGain();

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(Math.max(1, frequency), now);
    oscillator.frequency.exponentialRampToValueAtTime(
      Math.max(1, endFrequency),
      now + duration
    );

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(
      Math.max(0.0001, volume),
      now + 0.012
    );
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    oscillator.connect(gain);
    gain.connect(audio.master);
    oscillator.start(now);
    oscillator.stop(now + duration + 0.03);
  }

  function noiseBurst({
    duration = 0.08,
    volume = 0.08,
    frequency = 900,
    filterType = "lowpass"
  } = {}) {
    const context = ensureAudio();

    if (!context || audio.muted || volume <= 0) return;

    const length = Math.max(1, Math.floor(context.sampleRate * duration));
    const buffer = context.createBuffer(1, length, context.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < length; i += 1) {
      const fade = 1 - i / length;
      data[i] = (Math.random() * 2 - 1) * fade;
    }

    const source = context.createBufferSource();
    const filter = context.createBiquadFilter();
    const gain = context.createGain();
    const now = context.currentTime;

    source.buffer = buffer;
    filter.type = filterType;
    filter.frequency.value = frequency;
    gain.gain.setValueAtTime(volume, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    source.connect(filter);
    filter.connect(gain);
    gain.connect(audio.master);
    source.start(now);
  }

  function distanceVolume(game, x, y, maxDistance = 1100) {
    const player = game.player;

    if (!player) return 0.35;

    const distance = Math.hypot(player.x - x, player.y - y);
    return clamp(1 - distance / maxDistance, 0, 1);
  }

  function playGun(volume, heavy = false) {
    if (!canPlay("gun", heavy ? 115 : 70)) return;

    noiseBurst({
      duration: heavy ? 0.22 : 0.13,
      volume: volume * (heavy ? 0.32 : 0.24),
      frequency: heavy ? 1100 : 1500
    });

    tone({
      frequency: heavy ? 105 : 145,
      endFrequency: heavy ? 42 : 62,
      duration: heavy ? 0.25 : 0.15,
      volume: volume * (heavy ? 0.26 : 0.18),
      type: "triangle"
    });
  }

  function playImpact(volume) {
    if (!canPlay("impact", 65)) return;

    noiseBurst({ duration: 0.06, volume: volume * 0.13, frequency: 720 });
    tone({
      frequency: 92,
      endFrequency: 48,
      duration: 0.075,
      volume: volume * 0.11,
      type: "square"
    });
  }

  function playFootstep(volume, sprinting) {
    if (!canPlay("footstep", sprinting ? 185 : 260)) return;

    noiseBurst({
      duration: 0.045,
      volume: volume * (sprinting ? 0.11 : 0.075),
      frequency: 520
    });
  }

  function playGroan(volume, variant = Math.random()) {
    if (!canPlay("groan", 720)) return;

    const start = 72 + variant * 42;

    tone({
      frequency: start,
      endFrequency: 42 + variant * 18,
      duration: 0.48 + variant * 0.42,
      volume: volume * 0.14,
      type: "sawtooth"
    });

    tone({
      frequency: start * 0.52,
      endFrequency: 31,
      duration: 0.55,
      volume: volume * 0.07,
      type: "triangle",
      delay: 0.03
    });
  }

  function playHurt() {
    if (!canPlay("hurt", 230)) return;

    noiseBurst({ duration: 0.09, volume: 0.16, frequency: 480 });
    tone({
      frequency: 180,
      endFrequency: 72,
      duration: 0.2,
      volume: 0.15,
      type: "sawtooth"
    });
  }

  function playNoiseEvent(game, x, y, radius, type) {
    if (!audio.context || audio.muted || game.mode !== "playing") return;

    const soundType = String(type || "").toLowerCase();
    const volume = distanceVolume(game, x, y, Math.max(850, radius * 1.8));

    if (volume <= 0.01) return;

    if (/howler|scream|horde/.test(soundType)) {
      playGroan(volume * 1.2, 0.9);
      return;
    }

    if (/explosion|rupture|collapse|trap|alarm/.test(soundType)) {
      if (!canPlay("blast", 180)) return;
      noiseBurst({ duration: 0.3, volume: volume * 0.3, frequency: 650 });
      tone({
        frequency: 82,
        endFrequency: 28,
        duration: 0.38,
        volume: volume * 0.27,
        type: "triangle"
      });
      return;
    }

    if (
      radius >= 400 ||
      /pistol|rifle|shotgun|revolver|carbine|gun|firearm/.test(soundType)
    ) {
      playGun(volume, /shotgun|rifle|revolver/.test(soundType));
      return;
    }

    if (/door|glass|building/.test(soundType)) {
      if (!canPlay("door", 120)) return;
      noiseBurst({ duration: 0.11, volume: volume * 0.16, frequency: 620 });
      tone({
        frequency: 105,
        endFrequency: 58,
        duration: 0.13,
        volume: volume * 0.1,
        type: "square"
      });
      return;
    }

    if (/melee|impact/.test(soundType)) {
      playImpact(volume);
    }
  }

  function updateAmbientAudio(game, dt) {
    if (!audio.context || audio.muted || game.mode !== "playing") return;

    const player = game.player;

    if (!player) return;

    audio.stepTimer -= dt;

    if (player.movingNow && audio.stepTimer <= 0) {
      playFootstep(
        player.crouching ? 0.45 : 1,
        Boolean(player.sprintingNow)
      );

      audio.stepTimer = player.sprintingNow
        ? 0.22
        : player.crouching
          ? 0.48
          : 0.34;
    }

    audio.groanTimer -= dt;

    if (audio.groanTimer <= 0) {
      let nearest = null;
      let nearestDistance = Infinity;

      for (const zombie of game.zombies || []) {
        if (zombie.dead) continue;

        const distance = Math.hypot(
          zombie.x - player.x,
          zombie.y - player.y
        );

        if (distance < nearestDistance && distance < 820) {
          nearest = zombie;
          nearestDistance = distance;
        }
      }

      if (nearest) {
        const volume = clamp(1 - nearestDistance / 900, 0.08, 1);
        playGroan(volume, hash01(nearest.id));
      }

      audio.groanTimer = 1.7 + Math.random() * 2.8;
    }
  }

  function updateSoundButton(game) {
    const button = document.getElementById("soundToggleBtn");

    if (!button) return;

    button.innerHTML = audio.muted
      ? `SOUND OFF <kbd>M</kbd>`
      : `SOUND ON <kbd>M</kbd>`;

    button.classList.toggle("muted", audio.muted);

    if (audio.master) {
      audio.master.gain.value = audio.muted ? 0 : 0.48;
    }

    game?.toast?.(audio.muted ? "Sound muted." : "Sound enabled.");
  }

  function toggleSound(game) {
    ensureAudio();
    audio.muted = !audio.muted;
    updateSoundButton(game);
  }

  function createSoundButton(game) {
    if (document.getElementById("soundToggleBtn")) return;

    const actions = document.querySelector(".hud-actions");

    if (!actions) return;

    const button = document.createElement("button");
    button.id = "soundToggleBtn";
    button.type = "button";
    button.title = "Mute or enable sound (M)";
    button.innerHTML = `SOUND ON <kbd>M</kbd>`;

    button.addEventListener("click", event => {
      event.preventDefault();
      event.stopPropagation();
      toggleSound(game);
    });

    actions.insertBefore(
      button,
      document.getElementById("pauseBtn") || null
    );

    if (!document.getElementById("streetSoundStyles")) {
      const style = document.createElement("style");
      style.id = "streetSoundStyles";
      style.textContent = `
        #soundToggleBtn.muted {
          color: #d98979 !important;
          border-color: rgba(210, 95, 78, .38) !important;
        }

        @media (max-width: 700px) {
          #soundToggleBtn {
            font-size: 7px !important;
            padding-inline: 7px !important;
          }

          #soundToggleBtn kbd {
            display: none !important;
          }
        }
      `;
      document.head.append(style);
    }
  }

  function wrapAfter(game, methodName, callback) {
    if (typeof game[methodName] !== "function") return;

    const original = game[methodName].bind(game);

    game[methodName] = function (...args) {
      const result = original(...args);
      callback(this, ...args);
      return result;
    };
  }

  function install(game) {
    if (!game || game[INSTALL_FLAG]) return;

    game[INSTALL_FLAG] = true;
    createSoundButton(game);

    const unlockAudio = () => ensureAudio();

    window.addEventListener("pointerdown", unlockAudio, { passive: true });
    window.addEventListener("keydown", unlockAudio);

    window.addEventListener("keydown", event => {
      if (
        event.repeat ||
        event.ctrlKey ||
        event.metaKey ||
        event.altKey ||
        event.key.toLowerCase() !== "m" ||
        ["INPUT", "TEXTAREA"].includes(document.activeElement?.tagName)
      ) {
        return;
      }

      event.preventDefault();
      toggleSound(game);
    });

    wrapAfter(game, "startNew", currentGame => {
      ensureAudio();
      const added = tripleStreetZombies(currentGame);
      currentGame.toast?.(
        `Street infestation tripled: ${added} extra walkers added. Sound enabled.`
      );
    });

    wrapAfter(game, "loadSaved", currentGame => {
      ensureAudio();
      tripleStreetZombies(currentGame);
    });

    wrapAfter(game, "updateWorldStreaming", currentGame => {
      tripleStreetZombies(currentGame);
    });

    if (typeof game.emitNoise === "function") {
      const originalEmitNoise = game.emitNoise.bind(game);

      game.emitNoise = function (x, y, radius, type) {
        const result = originalEmitNoise(x, y, radius, type);
        playNoiseEvent(this, x, y, radius, type);
        return result;
      };
    }

    if (typeof game.zombieAttack === "function") {
      const originalZombieAttack = game.zombieAttack.bind(game);

      game.zombieAttack = function (...args) {
        const before = this.player?.health ?? 0;
        const result = originalZombieAttack(...args);

        if ((this.player?.health ?? before) < before) {
          playHurt();
        }

        return result;
      };
    }

    if (typeof game.damageZombie === "function") {
      const originalDamageZombie = game.damageZombie.bind(game);

      game.damageZombie = function (zombie, ...args) {
        const before = zombie?.health ?? 0;
        const result = originalDamageZombie(zombie, ...args);

        if ((zombie?.health ?? before) < before) {
          const volume = distanceVolume(this, zombie.x, zombie.y, 720);
          playImpact(volume);
        }

        return result;
      };
    }

    if (typeof game.update === "function") {
      const originalUpdate = game.update.bind(game);

      game.update = function (dt) {
        const result = originalUpdate(dt);
        updateAmbientAudio(this, dt);
        return result;
      };
    }

    if (game.world && game.player) {
      tripleStreetZombies(game);
    }
  }

  if (window.__walkers) {
    install(window.__walkers);
  } else {
    window.addEventListener(
      "load",
      () => install(window.__walkers),
      { once: true }
    );
  }
})();
