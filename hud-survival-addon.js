(() => {
  "use strict";

  /*
    Hollow County Clean Survival HUD

    Layout:
    - Minimal time at the top
    - Objective at the upper-left
    - Minimap at the upper-right
    - Survival condition at the lower-left
    - Minecraft-style five-slot hotbar at the bottom
    - No separate gun HUD covering the hotbar
    - Keeps the 30% zombie population increase
  */

  const INSTALL_FLAG = "__hcCleanSurvivalHudV3";
  const ZOMBIE_INCREASE = 0.30;

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

  function addStyles() {
    if (document.getElementById("hcCleanHudStyles")) {
      return;
    }

    const style = document.createElement("style");
    style.id = "hcCleanHudStyles";

    style.textContent = `
      :root {
        --clean-dark: rgba(7, 11, 8, .90);
        --clean-panel: rgba(19, 26, 20, .88);
        --clean-border: rgba(218, 225, 208, .17);
        --clean-text: #e7e9df;
        --clean-muted: #899289;
        --clean-green: #8fa477;
        --clean-gold: #d0c17c;
        --clean-red: #ca5e55;
      }

      /*
       * Remove the old extra overlays.
       * Gun ammunition remains visible inside the hotbar.
       */
      #gunHud,
      #hcThreatHud,
      .hc-hud-state {
        display: none !important;
      }

      #game::after {
        content: none !important;
      }

      /*
       * Top HUD: no giant bar across the screen.
       */
      #game .hud-top {
        top: 0 !important;
        left: 0 !important;
        right: 0 !important;
        width: 100% !important;
        height: 72px !important;
        padding: 0 !important;
        border: 0 !important;
        border-radius: 0 !important;
        background: transparent !important;
        box-shadow: none !important;
        backdrop-filter: none !important;
        pointer-events: none;
      }

      #game .day-readout {
        position: absolute !important;
        top: 10px !important;
        left: 50% !important;
        display: flex !important;
        align-items: center !important;
        gap: 9px !important;
        padding: 7px 11px !important;
        transform: translateX(-50%) !important;
        border: 1px solid var(--clean-border) !important;
        border-radius: 5px !important;
        background:
          linear-gradient(
            180deg,
            rgba(27, 35, 28, .91),
            var(--clean-dark)
          ) !important;
        box-shadow: 0 8px 22px rgba(0, 0, 0, .34) !important;
        pointer-events: auto;
        backdrop-filter: blur(6px);
      }

      #game .day-readout span {
        color: var(--clean-gold) !important;
        font: 900 7px/1 system-ui !important;
        letter-spacing: .13em !important;
      }

      #game .day-readout strong {
        color: var(--clean-text) !important;
        font: 950 18px/1 system-ui !important;
        font-variant-numeric: tabular-nums;
        text-shadow: 0 2px 8px #000;
      }

      #game .day-readout small {
        color: var(--clean-muted) !important;
        font: 800 6px/1 system-ui !important;
        letter-spacing: .08em !important;
      }

      #game .location-readout {
        position: absolute !important;
        top: 50px !important;
        left: 50% !important;
        width: 270px !important;
        transform: translateX(-50%) !important;
        text-align: center !important;
        pointer-events: none;
      }

      #game .location-readout span {
        display: block !important;
        overflow: hidden;
        color: rgba(231, 233, 223, .82) !important;
        font: 900 7px/1 system-ui !important;
        letter-spacing: .12em !important;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-shadow: 0 2px 6px #000;
      }

      #game .location-readout small {
        display: none !important;
      }

      #game .hud-actions {
        position: absolute !important;
        top: 12px !important;
        right: 14px !important;
        display: flex !important;
        gap: 5px !important;
        pointer-events: auto;
      }

      #game .hud-actions button {
        min-height: 32px !important;
        padding: 0 9px !important;
        color: #b8c0b7 !important;
        border: 1px solid var(--clean-border) !important;
        border-radius: 4px !important;
        background:
          linear-gradient(
            180deg,
            rgba(37, 47, 39, .88),
            rgba(10, 15, 11, .91)
          ) !important;
        box-shadow: 0 5px 13px rgba(0, 0, 0, .25) !important;
        font: 900 7px/1 system-ui !important;
        letter-spacing: .06em !important;
      }

      #game .hud-actions kbd {
        color: var(--clean-gold) !important;
        border: 0 !important;
        background: transparent !important;
        font-size: 6px !important;
      }

      /*
       * Objective: small card in an unused corner.
       */
      #game .objective {
        top: 86px !important;
        left: 14px !important;
        right: auto !important;
        width: 210px !important;
        padding: 10px 11px !important;
        border: 1px solid var(--clean-border) !important;
        border-left: 3px solid var(--clean-green) !important;
        border-radius: 2px 6px 6px 2px !important;
        background:
          linear-gradient(
            145deg,
            var(--clean-panel),
            var(--clean-dark)
          ) !important;
        box-shadow: 0 8px 22px rgba(0, 0, 0, .3) !important;
        backdrop-filter: blur(6px);
      }

      #game .objective span {
        color: var(--clean-gold) !important;
        font: 900 6px/1 system-ui !important;
        letter-spacing: .14em !important;
      }

      #game .objective p {
        margin-top: 6px !important;
        color: #b8c0b6 !important;
        font: 700 8px/1.35 system-ui !important;
      }

      /*
       * Minimap.
       */
      #game .minimap-wrap {
        top: 58px !important;
        right: 14px !important;
        width: 140px !important;
        padding: 6px !important;
        border: 1px solid var(--clean-border) !important;
        border-radius: 6px !important;
        background:
          linear-gradient(
            145deg,
            var(--clean-panel),
            var(--clean-dark)
          ) !important;
        box-shadow: 0 9px 24px rgba(0, 0, 0, .34) !important;
        backdrop-filter: blur(6px);
      }

      #game .minimap-wrap canvas {
        width: 126px !important;
        height: 126px !important;
        border: 1px solid rgba(220, 228, 211, .13) !important;
        border-radius: 2px !important;
        filter:
          saturate(.72)
          contrast(1.09)
          brightness(.9);
      }

      #game .minimap-wrap > span {
        display: block !important;
        margin-top: 5px !important;
        color: var(--clean-muted) !important;
        font: 900 6px/1 system-ui !important;
        letter-spacing: .12em !important;
        text-align: center !important;
      }

      /*
       * Bottom-left survival information.
       */
      #game .vitals {
        top: auto !important;
        bottom: 16px !important;
        left: 14px !important;
        width: 210px !important;
        display: grid !important;
        gap: 6px !important;
        padding: 10px 11px !important;
        border: 1px solid var(--clean-border) !important;
        border-radius: 6px !important;
        background:
          linear-gradient(
            145deg,
            var(--clean-panel),
            var(--clean-dark)
          ) !important;
        box-shadow: 0 10px 28px rgba(0, 0, 0, .36) !important;
        backdrop-filter: blur(6px);
      }

      #game .vitals::before {
        content: none !important;
      }

      #game .vital {
        display: grid !important;
        grid-template-columns: 49px 1fr 23px !important;
        align-items: center !important;
        gap: 6px !important;
      }

      #game .vital > span {
        color: #aab3aa !important;
        font: 900 6px/1 system-ui !important;
        letter-spacing: .05em !important;
      }

      #game .vital > div {
        height: 6px !important;
        overflow: hidden;
        border: 1px solid rgba(255, 255, 255, .045) !important;
        border-radius: 1px !important;
        background: rgba(0, 0, 0, .55) !important;
      }

      #game .vital i {
        border-radius: 0 !important;
        box-shadow: none !important;
      }

      #game .vital.health i {
        background:
          linear-gradient(
            90deg,
            #753831,
            var(--clean-red)
          ) !important;
      }

      #game .vital.stamina i {
        background:
          linear-gradient(
            90deg,
            #756b3c,
            var(--clean-gold)
          ) !important;
      }

      #game .vital.hunger i {
        background:
          linear-gradient(
            90deg,
            #506141,
            var(--clean-green)
          ) !important;
      }

      #game .vital.thirst i {
        background:
          linear-gradient(
            90deg,
            #3f686f,
            #72a8b0
          ) !important;
      }

      #game .vital.infection i {
        background:
          linear-gradient(
            90deg,
            #68405f,
            #b46e9d
          ) !important;
      }

      #game .vital b {
        color: #dce0d7 !important;
        font: 900 7px/1 system-ui !important;
        font-variant-numeric: tabular-nums;
      }

      /*
       * Small contextual status instead of another large threat panel.
       */
      #hcCleanStatus {
        position: absolute;
        left: 14px;
        bottom: 154px;
        z-index: 24;
        display: flex;
        align-items: center;
        gap: 7px;
        max-width: 210px;
        padding: 6px 8px;
        color: #aeb7ad;
        border: 1px solid rgba(218, 225, 208, .13);
        border-radius: 4px;
        background: rgba(7, 11, 8, .8);
        box-shadow: 0 6px 17px rgba(0, 0, 0, .26);
        font: 900 6px/1 system-ui;
        letter-spacing: .08em;
        pointer-events: none;
        backdrop-filter: blur(5px);
      }

      #hcCleanStatus::before {
        content: "";
        width: 6px;
        height: 6px;
        flex: 0 0 auto;
        border-radius: 50%;
        background: var(--clean-green);
        box-shadow: 0 0 7px rgba(143, 164, 119, .65);
      }

      #hcCleanStatus.warning::before {
        background: var(--clean-gold);
        box-shadow: 0 0 7px rgba(208, 193, 124, .65);
      }

      #hcCleanStatus.danger::before {
        background: var(--clean-red);
        box-shadow: 0 0 8px rgba(202, 94, 85, .72);
      }

      /*
       * Minecraft-style hotbar.
       */
      #game .hotbar {
        left: 50% !important;
        bottom: 15px !important;
        z-index: 28 !important;
        display: grid !important;
        grid-template-columns: repeat(5, 52px) !important;
        gap: 3px !important;
        padding: 5px !important;
        transform: translateX(-50%) !important;
        border: 2px solid rgba(4, 7, 5, .96) !important;
        border-radius: 3px !important;
        background: rgba(9, 13, 10, .82) !important;
        box-shadow:
          0 10px 28px rgba(0, 0, 0, .42),
          inset 0 0 0 1px rgba(218, 225, 208, .1) !important;
        backdrop-filter: blur(5px);
      }

      #game .hot-slot {
        position: relative;
        width: 52px !important;
        height: 52px !important;
        padding: 0 !important;
        border: 2px solid #364037 !important;
        border-radius: 1px !important;
        background:
          linear-gradient(
            145deg,
            rgba(54, 64, 54, .93),
            rgba(15, 20, 16, .97)
          ) !important;
        box-shadow:
          inset 0 0 0 2px rgba(0, 0, 0, .31) !important;
        transition:
          transform .1s,
          border-color .1s;
      }

      #game .hot-slot.selected {
        z-index: 2;
        border-color: #ebe5bd !important;
        background:
          linear-gradient(
            145deg,
            rgba(89, 103, 76, .98),
            rgba(24, 32, 25, .98)
          ) !important;
        box-shadow:
          0 0 0 2px rgba(208, 193, 124, .24),
          0 0 14px rgba(208, 193, 124, .17) !important;
        transform: translateY(-3px);
      }

      #game .hot-slot .slot-number {
        top: 3px !important;
        left: 4px !important;
        color: #899489 !important;
        font: 900 6px/1 system-ui !important;
      }

      #game .hot-slot .item-icon {
        color: var(--clean-text) !important;
        font: 950 9px/1 system-ui !important;
        text-shadow: 0 2px 6px #000;
      }

      #game .hot-slot small {
        right: 4px !important;
        bottom: 4px !important;
        color: #eee2ab !important;
        font: 950 7px/1 system-ui !important;
      }

      /*
       * Keep inventory and loot panels readable.
       */
      #game .side-panel,
      #game .modal-card,
      #game .death-card {
        border-color: var(--clean-border) !important;
        background:
          radial-gradient(
            circle at 100% 0,
            rgba(143, 164, 119, .07),
            transparent 35%
          ),
          linear-gradient(
            180deg,
            #111813,
            #080c09 76%
          ) !important;
      }

      #game .item-row,
      #game .recipe-row {
        border-radius: 4px !important;
        background:
          linear-gradient(
            145deg,
            rgba(29, 38, 31, .65),
            rgba(9, 14, 11, .76)
          ) !important;
      }

      /*
       * Mobile layout keeps controls separated.
       */
      @media (max-width: 760px) {
        #game .hud-actions {
          display: none !important;
        }

        #game .day-readout {
          top: 7px !important;
          padding: 6px 9px !important;
        }

        #game .day-readout strong {
          font-size: 16px !important;
        }

        #game .day-readout small {
          display: none !important;
        }

        #game .location-readout {
          top: 43px !important;
          width: 175px !important;
        }

        #game .objective {
          display: none !important;
        }

        #game .minimap-wrap {
          top: 68px !important;
          right: 8px !important;
          width: 106px !important;
          padding: 5px !important;
        }

        #game .minimap-wrap canvas {
          width: 94px !important;
          height: 94px !important;
        }

        #game .vitals {
          top: 68px !important;
          bottom: auto !important;
          left: 8px !important;
          width: 168px !important;
          gap: 5px !important;
          padding: 8px 9px !important;
        }

        #game .vital {
          grid-template-columns: 43px 1fr 20px !important;
          gap: 5px !important;
        }

        #game .vital > span,
        #game .vital b {
          font-size: 5px !important;
        }

        #hcCleanStatus {
          display: none !important;
        }

        #game .hotbar {
          bottom: 105px !important;
          grid-template-columns: repeat(5, 43px) !important;
          padding: 4px !important;
        }

        #game .hot-slot {
          width: 43px !important;
          height: 43px !important;
        }
      }

      @media (max-width: 390px) {
        #game .vitals {
          width: 156px !important;
        }

        #game .minimap-wrap {
          width: 96px !important;
        }

        #game .minimap-wrap canvas {
          width: 84px !important;
          height: 84px !important;
        }

        #game .hotbar {
          grid-template-columns: repeat(5, 39px) !important;
          gap: 2px !important;
        }

        #game .hot-slot {
          width: 39px !important;
          height: 39px !important;
        }
      }
    `;

    document.head.append(style);
  }

  function createStatusElement() {
    const gameScreen = document.getElementById("game");

    if (
      !gameScreen ||
      document.getElementById("hcCleanStatus")
    ) {
      return;
    }

    const status = document.createElement("div");
    status.id = "hcCleanStatus";
    status.textContent = "AREA QUIET";

    gameScreen.append(status);
  }

  function nearbyZombieCount(game, range) {
    const player = game.player;

    if (!player) {
      return 0;
    }

    let count = 0;

    for (const zombie of game.zombies || []) {
      if (!zombie || zombie.dead) {
        continue;
      }

      const distance = Math.hypot(
        zombie.x - player.x,
        zombie.y - player.y
      );

      if (distance <= range) {
        count += 1;
      }
    }

    return count;
  }

  function updateStatus(game) {
    const player = game.player;
    const status = document.getElementById("hcCleanStatus");

    if (!player || !status) {
      return;
    }

    const close = nearbyZombieCount(game, 220);
    const nearby = nearbyZombieCount(game, 520);

    status.classList.remove("warning", "danger");

    if (player.gunReload) {
      status.textContent = `RELOADING · ${nearby} NEARBY`;
      status.classList.add("warning");
      return;
    }

    if (close >= 5) {
      status.textContent = `SURROUNDED · ${close} CLOSE`;
      status.classList.add("danger");
      return;
    }

    if (close >= 2) {
      status.textContent = `DANGER · ${close} CLOSE`;
      status.classList.add("danger");
      return;
    }

    if (nearby >= 4) {
      status.textContent = `MOVEMENT · ${nearby} NEARBY`;
      status.classList.add("warning");
      return;
    }

    const movement = player.crouching
      ? "QUIET"
      : player.sprintingNow
        ? "LOUD"
        : player.movingNow
          ? "MOVING"
          : "AREA QUIET";

    status.textContent =
      nearby > 0
        ? `${movement} · ${nearby} NEARBY`
        : movement;

    if (player.sprintingNow) {
      status.classList.add("warning");
    }
  }

  function isBonusZombie(spawn) {
    const id = String(spawn?.id || "");

    return Boolean(
      spawn?.__hcBonus30 ||
      spawn?.__hcCleanBonus ||
      id.includes("bonus30") ||
      id.includes("-hc30-")
    );
  }

  function makeBonusSpawn(game, chunk, source, index) {
    const seed =
      `${game.world?.seed || "HOLLOW"}:` +
      `${chunk.key}:clean30:${index}`;

    const angle =
      hash01(`${seed}:angle`) *
      Math.PI *
      2;

    const distance =
      12 +
      hash01(`${seed}:distance`) *
      18;

    const healthScale =
      0.95 +
      hash01(`${seed}:health`) *
      0.1;

    const speedScale =
      0.96 +
      hash01(`${seed}:speed`) *
      0.08;

    const health = Math.max(
      1,
      Math.round(
        (source.health || source.maxHealth || 60) *
        healthScale
      )
    );

    return {
      ...source,

      id: `${chunk.key}-hc30-${index}`,
      chunkKey: chunk.key,

      x:
        source.x +
        Math.cos(angle) *
        distance,

      y:
        source.y +
        Math.sin(angle) *
        distance,

      health,
      maxHealth: health,

      speed:
        Math.max(
          8,
          (source.speed || 40) *
          speedScale
        ),

      packId:
        `${source.packId || chunk.key}-extra`,

      __hcCleanBonus: true
    };
  }

  function applyZombieIncrease(game) {
    const world = game.world;

    if (
      !world?.chunks ||
      !Array.isArray(game.zombies) ||
      typeof game.makeZombie !== "function"
    ) {
      return;
    }

    const worldSpawnIds = new Set(
      (world.zombieSpawns || []).map(
        spawn => spawn.id
      )
    );

    const liveZombieIds = new Set(
      (game.zombies || []).map(
        zombie => zombie.id
      )
    );

    for (const chunk of world.chunks.values()) {
      if (!chunk) {
        continue;
      }

      const chunkSpawns =
        chunk.zombieSpawns || [];

      const normalSpawns =
        chunkSpawns.filter(
          spawn => !isBonusZombie(spawn)
        );

      const existingBonuses =
        chunkSpawns.filter(
          spawn => isBonusZombie(spawn)
        );

      const targetBonusCount =
        Math.round(
          normalSpawns.length *
          ZOMBIE_INCREASE
        );

      const missing =
        Math.max(
          0,
          targetBonusCount -
          existingBonuses.length
        );

      if (
        normalSpawns.length === 0 ||
        missing === 0
      ) {
        continue;
      }

      for (
        let extra = 0;
        extra < missing;
        extra += 1
      ) {
        const index =
          existingBonuses.length +
          extra;

        const sourceIndex =
          Math.floor(
            hash01(
              `${world.seed}:` +
              `${chunk.key}:source:${index}`
            ) *
            normalSpawns.length
          ) %
          normalSpawns.length;

        const source =
          normalSpawns[sourceIndex];

        const spawn =
          makeBonusSpawn(
            game,
            chunk,
            source,
            index
          );

        if (!worldSpawnIds.has(spawn.id)) {
          world.zombieSpawns.push(spawn);
          worldSpawnIds.add(spawn.id);
        }

        if (
          !chunkSpawns.some(
            entry => entry.id === spawn.id
          )
        ) {
          chunkSpawns.push(spawn);
        }

        if (!liveZombieIds.has(spawn.id)) {
          game.zombies.push(
            game.makeZombie(spawn)
          );

          liveZombieIds.add(spawn.id);
        }
      }
    }
  }

  function wrapAfter(game, methodName, callback) {
    if (typeof game[methodName] !== "function") {
      return;
    }

    const original =
      game[methodName].bind(game);

    game[methodName] = function (...args) {
      const result = original(...args);

      callback(this);

      return result;
    };
  }

  function install(game) {
    if (
      !game ||
      game[INSTALL_FLAG]
    ) {
      return;
    }

    game[INSTALL_FLAG] = true;

    addStyles();
    createStatusElement();

    wrapAfter(
      game,
      "updateWorldStreaming",
      currentGame => {
        applyZombieIncrease(currentGame);
      }
    );

    wrapAfter(
      game,
      "startNew",
      currentGame => {
        createStatusElement();
        applyZombieIncrease(currentGame);
        updateStatus(currentGame);

        currentGame.toast?.(
          "Clean survival HUD loaded. Zombie population increased by 30%."
        );
      }
    );

    wrapAfter(
      game,
      "loadSaved",
      currentGame => {
        createStatusElement();
        applyZombieIncrease(currentGame);
        updateStatus(currentGame);
      }
    );

    if (typeof game.update === "function") {
      const originalUpdate =
        game.update.bind(game);

      let statusTimer = 0;

      game.update = function (dt) {
        const result =
          originalUpdate(dt);

        statusTimer -= dt;

        if (statusTimer <= 0) {
          statusTimer = 0.15;
          updateStatus(this);
        }

        return result;
      };
    }

    if (game.world) {
      applyZombieIncrease(game);
    }

    if (game.player) {
      updateStatus(game);
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