(() => {
  "use strict";

  const FLAG = "__hcHudZombie30V2";
  const MULTIPLIER = 1.30;
  const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

  function hash(text) {
    let h = 2166136261;

    for (const c of String(text)) {
      h ^= c.charCodeAt(0);
      h = Math.imul(h, 16777619);
    }

    return (h >>> 0) / 4294967295;
  }

  function addStyles() {
    if (document.getElementById("hcHudV2Styles")) return;

    const style = document.createElement("style");
    style.id = "hcHudV2Styles";

    style.textContent = `
      :root {
        --hc-bg: rgba(7, 12, 9, .92);
        --hc-bg2: rgba(20, 28, 22, .9);
        --hc-line: rgba(211, 222, 201, .18);
        --hc-text: #e7eadf;
        --hc-muted: #7f8b82;
        --hc-gold: #d1c47e;
        --hc-red: #d06459;
        --hc-green: #91a874;
      }

      #game {
        --hc-threat: 0%;
      }

      #game::after {
        content: "";
        position: absolute;
        inset: 0;
        z-index: 3;
        pointer-events: none;
        background:
          linear-gradient(
            180deg,
            rgba(0, 0, 0, .28),
            transparent 18%,
            transparent 76%,
            rgba(0, 0, 0, .35)
          ),
          radial-gradient(
            circle at center,
            transparent 55%,
            rgba(0, 0, 0, .2)
          );
      }

      #game .hud-top {
        top: 10px !important;
        left: 50% !important;
        right: auto !important;
        width: min(760px, calc(100% - 28px)) !important;
        height: 58px !important;
        display: grid !important;
        grid-template-columns: 1fr auto 1fr !important;
        align-items: center !important;
        gap: 12px !important;
        padding: 7px 10px !important;
        transform: translateX(-50%);
        border: 1px solid var(--hc-line) !important;
        border-radius: 9px !important;
        background:
          linear-gradient(
            180deg,
            var(--hc-bg2),
            var(--hc-bg)
          ) !important;
        box-shadow:
          0 12px 30px rgba(0, 0, 0, .35),
          inset 0 1px rgba(255, 255, 255, .04) !important;
        backdrop-filter: blur(8px);
      }

      #game .location-readout {
        grid-column: 1;
        min-width: 0;
        text-align: left !important;
      }

      #game .location-readout span {
        display: block;
        overflow: hidden;
        color: var(--hc-text) !important;
        font: 900 8px/1.2 system-ui !important;
        letter-spacing: .1em !important;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      #game .location-readout small {
        color: #68746b !important;
        font: 800 6px/1 system-ui !important;
      }

      #game .day-readout {
        grid-column: 2;
        display: grid !important;
        grid-template-columns: auto auto !important;
        align-items: center !important;
        gap: 4px 9px !important;
        text-align: center;
      }

      #game .day-readout span {
        color: var(--hc-gold) !important;
        font: 900 7px/1 system-ui !important;
        letter-spacing: .16em !important;
      }

      #game .day-readout strong {
        grid-column: 2;
        grid-row: 1 / 3;
        color: var(--hc-text) !important;
        font: 950 22px/1 system-ui !important;
        font-variant-numeric: tabular-nums;
        text-shadow: 0 3px 12px #000;
      }

      #game .day-readout small {
        color: var(--hc-muted) !important;
        font: 800 6px/1 system-ui !important;
      }

      #game .hud-actions {
        grid-column: 3;
        justify-self: end;
        gap: 5px !important;
      }

      #game .hud-actions button {
        min-height: 34px !important;
        padding: 0 9px !important;
        color: #adb7ac !important;
        border: 1px solid rgba(205, 216, 194, .14) !important;
        border-radius: 4px !important;
        background:
          linear-gradient(
            180deg,
            rgba(42, 52, 43, .72),
            rgba(12, 18, 14, .82)
          ) !important;
        font: 900 7px/1 system-ui !important;
        letter-spacing: .07em !important;
      }

      #game .hud-actions kbd {
        color: var(--hc-gold) !important;
        border: 0 !important;
        background: transparent !important;
        font-size: 6px !important;
      }

      #game .vitals {
        top: 84px !important;
        left: 14px !important;
        width: 224px !important;
        display: grid !important;
        gap: 8px !important;
        padding: 13px 14px !important;
        border: 1px solid var(--hc-line) !important;
        border-radius: 10px 10px 10px 2px !important;
        background:
          linear-gradient(
            145deg,
            var(--hc-bg2),
            var(--hc-bg)
          ) !important;
        box-shadow:
          0 14px 34px rgba(0, 0, 0, .36) !important;
        backdrop-filter: blur(8px);
      }

      #game .vitals::before {
        content: "SURVIVOR CONDITION";
        padding-bottom: 9px;
        color: #8a9688;
        border-bottom: 1px solid rgba(205, 216, 194, .12);
        font: 900 7px/1 system-ui;
        letter-spacing: .16em;
      }

      #game .vital {
        display: grid !important;
        grid-template-columns: 58px 1fr 26px !important;
        align-items: center !important;
        gap: 7px !important;
      }

      #game .vital > span {
        color: #aeb7ad !important;
        font: 900 7px/1 system-ui !important;
        letter-spacing: .07em !important;
      }

      #game .vital > span::before {
        display: inline-block;
        width: 12px;
        margin-right: 4px;
        text-align: center;
      }

      #game .vital.health > span::before {
        content: "✚";
        color: #d46b61;
      }

      #game .vital.stamina > span::before {
        content: "↯";
        color: #d1c47e;
      }

      #game .vital.hunger > span::before {
        content: "◆";
        color: #91a874;
      }

      #game .vital.thirst > span::before {
        content: "●";
        color: #70a5af;
      }

      #game .vital.infection > span::before {
        content: "☣";
        color: #b7799f;
      }

      #game .vital > div {
        height: 7px !important;
        overflow: hidden;
        border: 1px solid rgba(255, 255, 255, .045) !important;
        border-radius: 1px !important;
        background: rgba(0, 0, 0, .52) !important;
      }

      #game .vital i {
        border-radius: 0 !important;
      }

      #game .vital.health i {
        background:
          linear-gradient(
            90deg,
            #783b35,
            #d06459
          ) !important;
      }

      #game .vital.stamina i {
        background:
          linear-gradient(
            90deg,
            #796d3c,
            #d1c47e
          ) !important;
      }

      #game .vital.hunger i {
        background:
          linear-gradient(
            90deg,
            #506342,
            #91a874
          ) !important;
      }

      #game .vital.thirst i {
        background:
          linear-gradient(
            90deg,
            #41676e,
            #70a5af
          ) !important;
      }

      #game .vital.infection i {
        background:
          linear-gradient(
            90deg,
            #68435f,
            #b7799f
          ) !important;
      }

      #game .vital b {
        color: #dce0d7 !important;
        font: 900 8px/1 system-ui !important;
        font-variant-numeric: tabular-nums;
      }

      #hcThreatHud {
        position: absolute;
        left: 14px;
        bottom: 18px;
        z-index: 25;
        width: 224px;
        padding: 10px 13px;
        pointer-events: none;
        border: 1px solid var(--hc-line);
        border-radius: 2px 10px 10px 10px;
        background:
          linear-gradient(
            145deg,
            var(--hc-bg2),
            var(--hc-bg)
          );
        box-shadow:
          0 14px 32px rgba(0, 0, 0, .34);
        backdrop-filter: blur(8px);
      }

      .hc-threat-head,
      .hc-threat-foot {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
      }

      .hc-threat-head span {
        color: #78847b;
        font: 900 6px/1 system-ui;
        letter-spacing: .15em;
      }

      #hcThreatLabel {
        color: #b9c6ab;
        font: 950 8px/1 system-ui;
        letter-spacing: .09em;
      }

      .hc-threat-track {
        height: 5px;
        margin: 8px 0;
        overflow: hidden;
        border: 1px solid rgba(255, 255, 255, .045);
        background: rgba(0, 0, 0, .54);
      }

      #hcThreatFill {
        display: block;
        width: var(--hc-threat);
        height: 100%;
        background:
          linear-gradient(
            90deg,
            #667c56,
            #d0bd6f 58%,
            #d05d52
          );
        transition: width .15s linear;
      }

      #hcMoveLabel,
      #hcWeaponLabel {
        overflow: hidden;
        color: #b8c1b6;
        font: 900 7px/1 system-ui;
        letter-spacing: .07em;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      #game.hc-danger #hcThreatHud {
        border-color: rgba(208, 93, 82, .46);
        box-shadow:
          0 14px 32px rgba(0, 0, 0, .34),
          0 0 20px rgba(208, 93, 82, .12);
      }

      #game.hc-danger #hcThreatLabel {
        color: #e17a70;
      }

      #game .minimap-wrap {
        top: 84px !important;
        right: 14px !important;
        width: 174px !important;
        padding: 8px !important;
        border: 1px solid var(--hc-line) !important;
        border-radius: 10px 10px 2px 10px !important;
        background:
          linear-gradient(
            145deg,
            var(--hc-bg2),
            var(--hc-bg)
          ) !important;
        box-shadow:
          0 14px 34px rgba(0, 0, 0, .36) !important;
        backdrop-filter: blur(8px);
      }

      #game .minimap-wrap::before {
        content: "LOCAL AREA";
        display: block;
        padding: 1px 3px 7px;
        color: #899487;
        font: 900 7px/1 system-ui;
        letter-spacing: .15em;
      }

      #game .minimap-wrap canvas {
        width: 156px !important;
        height: 156px !important;
        border: 1px solid rgba(213, 221, 203, .14) !important;
        border-radius: 3px !important;
        filter:
          saturate(.78)
          contrast(1.08)
          brightness(.9);
      }

      #game .minimap-wrap > span {
        display: none !important;
      }

      #game .objective {
        top: 278px !important;
        right: 14px !important;
        width: 174px !important;
        padding: 11px !important;
        border: 1px solid rgba(204, 215, 193, .14) !important;
        border-left: 3px solid var(--hc-green) !important;
        border-radius: 2px 8px 8px 2px !important;
        background:
          linear-gradient(
            145deg,
            var(--hc-bg2),
            var(--hc-bg)
          ) !important;
        box-shadow:
          0 10px 26px rgba(0, 0, 0, .28) !important;
      }

      #game .objective span {
        color: var(--hc-gold) !important;
        font: 900 7px/1 system-ui !important;
        letter-spacing: .15em !important;
      }

      #game .objective p {
        margin-top: 7px !important;
        color: #b8c1b6 !important;
        font: 700 9px/1.35 system-ui !important;
      }

      #game .hotbar {
        left: 50% !important;
        bottom: 14px !important;
        z-index: 27 !important;
        display: grid !important;
        grid-template-columns: repeat(5, 54px) !important;
        gap: 4px !important;
        padding: 6px !important;
        transform: translateX(-50%) !important;
        border: 2px solid rgba(4, 7, 5, .96) !important;
        border-radius: 5px !important;
        background: rgba(8, 12, 9, .82) !important;
        box-shadow:
          0 12px 32px rgba(0, 0, 0, .44),
          inset 0 0 0 1px rgba(204, 215, 193, .11) !important;
        backdrop-filter: blur(6px);
      }

      #game .hot-slot {
        position: relative;
        width: 54px !important;
        height: 54px !important;
        padding: 0 !important;
        overflow: visible !important;
        border: 2px solid #303a31 !important;
        border-radius: 2px !important;
        background:
          linear-gradient(
            145deg,
            rgba(54, 65, 54, .92),
            rgba(15, 21, 16, .97)
          ) !important;
        box-shadow:
          inset 0 0 0 2px rgba(0, 0, 0, .32) !important;
      }

      #game .hot-slot.selected {
        z-index: 2;
        border-color: #e4dfbc !important;
        background:
          linear-gradient(
            145deg,
            rgba(91, 104, 77, .98),
            rgba(25, 34, 25, .98)
          ) !important;
        box-shadow:
          0 0 0 2px rgba(208, 195, 132, .24),
          0 0 18px rgba(203, 193, 125, .2) !important;
        transform: translateY(-3px) scale(1.06);
      }

      #game .hot-slot .slot-number {
        top: 3px !important;
        left: 4px !important;
        color: #8a968b !important;
        font: 900 7px/1 system-ui !important;
      }

      #game .hot-slot .item-icon {
        color: #e5e7dc !important;
        font: 950 10px/1 system-ui !important;
        text-shadow: 0 2px 6px #000;
      }

      #game .hot-slot small {
        right: 4px !important;
        bottom: 4px !important;
        color: #f1e4ad !important;
        font: 950 8px/1 system-ui !important;
      }

      #gunHud {
        bottom: 82px !important;
        border-radius: 5px !important;
        background:
          linear-gradient(
            180deg,
            var(--hc-bg2),
            var(--hc-bg)
          ) !important;
      }

      #game .side-panel,
      #game .modal-card,
      #game .death-card {
        border-color: rgba(205, 216, 194, .18) !important;
        background:
          radial-gradient(
            circle at 100% 0,
            rgba(143, 161, 117, .08),
            transparent 34%
          ),
          linear-gradient(
            180deg,
            #111914,
            #080d0a 76%
          ) !important;
      }

      #game .item-row,
      #game .recipe-row {
        border-radius: 4px !important;
        background:
          linear-gradient(
            145deg,
            rgba(29, 39, 31, .65),
            rgba(9, 14, 11, .76)
          ) !important;
      }

      @media (max-width: 900px) {
        #game .hud-top {
          top: 7px !important;
          width: calc(100% - 14px) !important;
          height: 54px !important;
        }

        #game .day-readout strong {
          font-size: 18px !important;
        }

        #game .location-readout small {
          display: none;
        }

        #game .vitals {
          top: 70px !important;
          left: 8px !important;
          width: 190px !important;
          padding: 10px 11px !important;
        }

        #game .vital {
          grid-template-columns: 51px 1fr 23px !important;
          gap: 6px !important;
        }

        #game .vital > span {
          font-size: 6px !important;
        }

        #game .minimap-wrap {
          top: 70px !important;
          right: 8px !important;
          width: 136px !important;
          padding: 6px !important;
        }

        #game .minimap-wrap canvas {
          width: 122px !important;
          height: 122px !important;
        }

        #game .objective {
          top: 223px !important;
          right: 8px !important;
          width: 136px !important;
          padding: 9px !important;
        }

        #hcThreatHud {
          left: 8px;
          bottom: 92px;
          width: 190px;
        }

        #game .hotbar {
          bottom: 10px !important;
          grid-template-columns: repeat(5, 46px) !important;
          gap: 3px !important;
          padding: 5px !important;
        }

        #game .hot-slot {
          width: 46px !important;
          height: 46px !important;
        }

        #gunHud {
          bottom: 69px !important;
        }
      }

      @media (max-width: 620px) and (orientation: portrait) {
        #game .hud-top {
          grid-template-columns: minmax(0, 1fr) auto !important;
        }

        #game .location-readout {
          grid-column: 1;
        }

        #game .day-readout {
          grid-column: 2;
        }

        #game .day-readout small,
        #game .day-readout span {
          display: none !important;
        }

        #game .day-readout strong {
          grid-column: 1;
          font-size: 17px !important;
        }

        #game .hud-actions {
          display: none !important;
        }

        #game .vitals {
          width: 174px !important;
        }

        #game .vitals::before {
          content: "CONDITION";
        }

        #game .minimap-wrap {
          width: 112px !important;
        }

        #game .minimap-wrap canvas {
          width: 98px !important;
          height: 98px !important;
        }

        #game .objective {
          top: 198px !important;
          width: 112px !important;
        }

        #game .objective p {
          font-size: 8px !important;
        }

        #hcThreatHud {
          width: 174px;
          bottom: 104px;
        }

        #game .hotbar {
          grid-template-columns: repeat(5, 42px) !important;
        }

        #game .hot-slot {
          width: 42px !important;
          height: 42px !important;
        }

        #gunHud {
          bottom: 111px !important;
        }
      }
    `;

    document.head.append(style);
  }

  function createThreatHud() {
    const root = document.getElementById("game");

    if (
      !root ||
      document.getElementById("hcThreatHud")
    ) {
      return;
    }

    const hud = document.createElement("aside");

    hud.id = "hcThreatHud";

    hud.innerHTML = `
      <div class="hc-threat-head">
        <span>LOCAL THREAT</span>
        <b id="hcThreatLabel">CLEAR</b>
      </div>

      <div class="hc-threat-track">
        <i id="hcThreatFill"></i>
      </div>

      <div class="hc-threat-foot">
        <b id="hcMoveLabel">STANDING</b>
        <b id="hcWeaponLabel">BARE HANDS</b>
      </div>
    `;

    root.append(hud);
  }

  function updateThreatHud(game) {
    const player = game.player;
    const root = document.getElementById("game");

    if (!player || !root) return;

    let near = 0;
    let close = 0;
    let closest = Infinity;

    for (const zombie of game.zombies || []) {
      if (!zombie || zombie.dead) continue;

      const distance = Math.hypot(
        zombie.x - player.x,
        zombie.y - player.y
      );

      if (distance < 640) near++;
      if (distance < 245) close++;

      closest = Math.min(
        closest,
        distance
      );
    }

    const score = clamp(
      close * 18 +
      near * 4 +
      (
        closest < 110
          ? 26
          : closest < 220
            ? 12
            : 0
      ),
      0,
      100
    );

    root.style.setProperty(
      "--hc-threat",
      `${score}%`
    );

    root.classList.toggle(
      "hc-danger",
      score >= 58
    );

    let status = "CLEAR";

    if (
      close >= 6 ||
      score >= 82
    ) {
      status = "SURROUNDED";
    } else if (
      close >= 3 ||
      score >= 58
    ) {
      status = "HUNTED";
    } else if (
      near >= 4 ||
      score >= 28
    ) {
      status = "WATCHED";
    } else if (near > 0) {
      status = "MOVEMENT";
    }

    const threat =
      document.getElementById(
        "hcThreatLabel"
      );

    const move =
      document.getElementById(
        "hcMoveLabel"
      );

    const weapon =
      document.getElementById(
        "hcWeaponLabel"
      );

    if (threat) {
      threat.textContent =
        `${status} · ${near}`;
    }

    if (move) {
      move.textContent =
        player.crouching
          ? "QUIET"
          : player.sprintingNow
            ? "LOUD"
            : player.movingNow
              ? "MOVING"
              : "STANDING";
    }

    if (weapon) {
      weapon.textContent =
        player.equipped
          ? player.equipped
              .replaceAll("_", " ")
              .toUpperCase()
          : "BARE HANDS";
    }
  }

  function bonusSpawn(
    game,
    chunk,
    source,
    index
  ) {
    const seed =
      `${game.world?.seed || "HOLLOW"}:` +
      `${chunk.key}:bonus30:${index}`;

    const angle =
      hash(`${seed}:angle`) *
      Math.PI *
      2;

    const offset =
      5 +
      hash(`${seed}:offset`) *
      8;

    const healthScale =
      .94 +
      hash(`${seed}:health`) *
      .12;

    const speedScale =
      .95 +
      hash(`${seed}:speed`) *
      .10;

    return {
      ...source,

      id:
        `${chunk.key}-bonus30-${index}`,

      chunkKey:
        chunk.key,

      x:
        source.x +
        Math.cos(angle) *
        offset,

      y:
        source.y +
        Math.sin(angle) *
        offset,

      packId:
        `${
          source.packId ||
          `${chunk.key}-pack`
        }-reinforced`,

      health:
        Math.max(
          1,
          Math.round(
            (source.health || 60) *
            healthScale
          )
        ),

      maxHealth:
        Math.max(
          1,
          Math.round(
            (
              source.maxHealth ||
              source.health ||
              60
            ) *
            healthScale
          )
        ),

      speed:
        Math.max(
          8,
          (source.speed || 40) *
          speedScale
        ),

      __hcBonus30: true
    };
  }

  function applyZombieBoost(game) {
    const world = game.world;

    if (
      !world?.chunks ||
      !Array.isArray(game.zombies) ||
      typeof game.makeZombie !==
        "function"
    ) {
      return;
    }

    const liveIds =
      new Set(
        game.zombies.map(
          zombie => zombie.id
        )
      );

    const worldIds =
      new Set(
        (world.zombieSpawns || [])
          .map(spawn => spawn.id)
      );

    for (
      const chunk of
      world.chunks.values()
    ) {
      if (
        !chunk ||
        chunk.__hcBoost30Applied
      ) {
        continue;
      }

      const base =
        (chunk.zombieSpawns || [])
          .filter(
            spawn =>
              !spawn.__hcBonus30
          );

      const extraCount =
        Math.round(
          base.length *
          (MULTIPLIER - 1)
        );

      chunk.__hcBoost30Applied =
        true;

      if (
        !base.length ||
        extraCount <= 0
      ) {
        continue;
      }

      for (
        let index = 0;
        index < extraCount;
        index++
      ) {
        const pick =
          Math.floor(
            hash(
              `${world.seed}:` +
              `${chunk.key}:` +
              `pick:${index}`
            ) *
            base.length
          ) %
          base.length;

        const spawn =
          bonusSpawn(
            game,
            chunk,
            base[pick],
            index
          );

        if (!worldIds.has(spawn.id)) {
          world.zombieSpawns.push(
            spawn
          );

          worldIds.add(spawn.id);
        }

        if (
          !chunk.zombieSpawns.some(
            entry =>
              entry.id === spawn.id
          )
        ) {
          chunk.zombieSpawns.push(
            spawn
          );
        }

        if (!liveIds.has(spawn.id)) {
          game.zombies.push(
            game.makeZombie(spawn)
          );

          liveIds.add(spawn.id);
        }
      }
    }
  }

  function wrap(
    game,
    name,
    after
  ) {
    if (
      typeof game[name] !==
      "function"
    ) {
      return;
    }

    const original =
      game[name].bind(game);

    game[name] =
      function (...args) {
        const result =
          original(...args);

        after(this);

        return result;
      };
  }

  function install(game) {
    if (
      !game ||
      game[FLAG]
    ) {
      return;
    }

    game[FLAG] = true;

    addStyles();
    createThreatHud();

    wrap(
      game,
      "updateWorldStreaming",
      current =>
        applyZombieBoost(current)
    );

    wrap(
      game,
      "startNew",
      current => {
        createThreatHud();
        applyZombieBoost(current);
        updateThreatHud(current);

        current.toast?.(
          "HUD upgraded. Zombie population increased by 30%."
        );
      }
    );

    wrap(
      game,
      "loadSaved",
      current => {
        createThreatHud();
        applyZombieBoost(current);
        updateThreatHud(current);
      }
    );

    if (
      typeof game.update ===
      "function"
    ) {
      const originalUpdate =
        game.update.bind(game);

      let timer = 0;

      game.update =
        function (dt) {
          const result =
            originalUpdate(dt);

          timer -= dt;

          if (timer <= 0) {
            timer = .12;
            updateThreatHud(this);
          }

          return result;
        };
    }

    if (game.world) {
      applyZombieBoost(game);
    }

    if (game.player) {
      updateThreatHud(game);
    }

    game.toast?.(
      "Survival HUD and 30% zombie upgrade installed."
    );
  }

  if (window.__walkers) {
    install(window.__walkers);
  } else {
    window.addEventListener(
      "load",
      () =>
        install(window.__walkers),
      {
        once: true
      }
    );
  }
})();