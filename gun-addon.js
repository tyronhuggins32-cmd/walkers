(() => {
  "use strict";

  const INSTALL_FLAG = "__hollowCountyGunAddonV3";

  const GUNS = Object.freeze({
    pistol: {
      name: "9 mm pistol",
      ammo: "ammo9",
      label: "9 MM",
      capacity: 15,
      reload: 1.55,
      mode: "mag",
      model: "pistol"
    },

    revolver: {
      name: ".357 revolver",
      ammo: "ammo9",
      label: ".357",
      capacity: 6,
      reload: 2.65,
      mode: "mag",
      model: "revolver"
    },

    machine_pistol: {
      name: "machine pistol",
      ammo: "ammo9",
      label: "9 MM",
      capacity: 20,
      reload: 1.8,
      mode: "mag",
      model: "machine_pistol"
    },

    smg: {
      name: "9 mm submachine gun",
      ammo: "ammo9",
      label: "9 MM",
      capacity: 30,
      reload: 2.25,
      mode: "mag",
      model: "smg"
    },

    shotgun: {
      name: "pump shotgun",
      ammo: "shell",
      label: "12 GA",
      capacity: 8,
      reload: 0.68,
      mode: "single",
      model: "shotgun"
    },

    double_barrel: {
      name: "double-barrel shotgun",
      ammo: "shell",
      label: "12 GA",
      capacity: 2,
      reload: 2.05,
      mode: "mag",
      model: "double_barrel"
    },

    rifle: {
      name: "hunting rifle",
      ammo: "rifle_round",
      label: ".308",
      capacity: 5,
      reload: 2.8,
      mode: "mag",
      model: "rifle"
    },

    carbine: {
      name: "patrol carbine",
      ammo: "rifle_round",
      label: ".308",
      capacity: 20,
      reload: 2.15,
      mode: "mag",
      model: "carbine"
    },

    assault_rifle: {
      name: "5.56 assault rifle",
      ammo: "ammo556",
      label: "5.56",
      capacity: 30,
      reload: 2.35,
      mode: "mag",
      model: "assault_rifle"
    },

    lever_rifle: {
      name: "lever-action rifle",
      ammo: "rifle_round",
      label: ".308",
      capacity: 7,
      reload: 0.76,
      mode: "single",
      model: "lever_rifle"
    }
  });

  const GUN_IDS = new Set(Object.keys(GUNS));

  const SPAWNS = Object.freeze({
    house: {
      chance: 0.09,
      choices: [
        ["pistol", 50],
        ["revolver", 25],
        ["double_barrel", 15],
        ["shotgun", 10]
      ]
    },

    sheriff: {
      chance: 0.48,
      choices: [
        ["pistol", 30],
        ["revolver", 18],
        ["shotgun", 20],
        ["carbine", 15],
        ["smg", 9],
        ["assault_rifle", 5],
        ["rifle", 3]
      ]
    },

    prison: {
      chance: 0.2,
      choices: [
        ["pistol", 44],
        ["revolver", 20],
        ["shotgun", 25],
        ["carbine", 8],
        ["smg", 3]
      ]
    },

    warehouse: {
      chance: 0.075,
      choices: [
        ["shotgun", 35],
        ["double_barrel", 30],
        ["rifle", 22],
        ["lever_rifle", 13]
      ]
    },

    grocery: {
      chance: 0.025,
      choices: [
        ["pistol", 65],
        ["revolver", 25],
        ["double_barrel", 10]
      ]
    },

    hospital: {
      chance: 0.015,
      choices: [
        ["pistol", 75],
        ["revolver", 25]
      ]
    },

    car: {
      chance: 0.08,
      choices: [
        ["pistol", 52],
        ["revolver", 28],
        ["double_barrel", 12],
        ["shotgun", 6],
        ["carbine", 2]
      ]
    }
  });

  const state = {
    bypassAmmo: null,
    lootTimer: 0,
    hudTimer: 0
  };

  const clamp = (value, min, max) =>
    Math.max(min, Math.min(max, value));

  function hash01(text) {
    let hash = 2166136261;

    for (const char of String(text)) {
      hash ^= char.charCodeAt(0);
      hash = Math.imul(hash, 16777619);
    }

    return (hash >>> 0) / 4294967295;
  }

  function weightedPick(entries, seed) {
    const total = entries.reduce(
      (sum, entry) => sum + entry[1],
      0
    );

    let roll = hash01(seed) * total;

    for (const [id, weight] of entries) {
      roll -= weight;

      if (roll <= 0) {
        return id;
      }
    }

    return entries[entries.length - 1][0];
  }

  function normalize(x, y) {
    const length = Math.hypot(x, y) || 1;

    return {
      x: x / length,
      y: y / length
    };
  }

  function magazine(entity, weaponId, seed = "player") {
    const gun = GUNS[weaponId];

    if (!gun) {
      return null;
    }

    if (!entity.gunMagazines) {
      entity.gunMagazines = {};
    }

    let mag = entity.gunMagazines[weaponId];

    if (typeof mag === "number") {
      mag = {
        rounds: mag
      };
    }

    if (!mag) {
      const fill =
        0.58 +
        hash01(`${seed}:${weaponId}:loaded`) * 0.42;

      mag = {
        rounds: Math.max(
          1,
          Math.ceil(gun.capacity * fill)
        )
      };
    }

    mag.rounds = clamp(
      Math.floor(Number(mag.rounds) || 0),
      0,
      gun.capacity
    );

    entity.gunMagazines[weaponId] = mag;

    return mag;
  }

  function reserve(game, ammoId) {
    if (typeof game.itemCount !== "function") {
      return 0;
    }

    return Math.max(
      0,
      Math.floor(game.itemCount(ammoId) || 0)
    );
  }

  function removeReserve(game, ammoId, amount) {
    amount = Math.max(
      0,
      Math.floor(amount || 0)
    );

    if (amount <= 0) {
      return true;
    }

    if (typeof game.__gunOriginalRemoveItem !== "function") {
      return false;
    }

    return game.__gunOriginalRemoveItem(
      ammoId,
      amount
    );
  }

  function cancelReload(game, showToast = false) {
    if (!game.player || !game.player.gunReload) {
      return;
    }

    game.player.gunReload = null;

    if (showToast) {
      game.toast?.("Reload cancelled.");
    }
  }

  function startReload(game, automatic = false) {
    const player = game.player;
    const weaponId = player?.equipped;
    const gun = GUNS[weaponId];

    if (!player || !gun) {
      return false;
    }

    const mag = magazine(
      player,
      weaponId,
      `${game.world?.seed}:player`
    );

    const spare = reserve(
      game,
      gun.ammo
    );

    if (mag.rounds >= gun.capacity) {
      if (!automatic) {
        game.toast?.(
          `${gun.name} is already loaded.`
        );
      }

      return false;
    }

    if (spare <= 0) {
      if (!automatic) {
        game.toast?.(
          `No ${gun.label} ammunition.`,
          "danger"
        );
      }

      return false;
    }

    player.gunReload = {
      weaponId,
      timer: gun.reload,
      total: gun.reload
    };

    player.attackCooldown = Math.max(
      player.attackCooldown || 0,
      0.12
    );

    if (!automatic) {
      const message =
        gun.mode === "single"
          ? `Loading ${gun.name}...`
          : `Reloading ${gun.name}...`;

      game.toast?.(message);
    }

    return true;
  }

  function finishReloadStep(game) {
    const player = game.player;
    const reload = player?.gunReload;

    if (!player || !reload) {
      return;
    }

    const gun = GUNS[reload.weaponId];

    if (!gun) {
      player.gunReload = null;
      return;
    }

    const mag = magazine(
      player,
      reload.weaponId,
      `${game.world?.seed}:player`
    );

    const spare = reserve(
      game,
      gun.ammo
    );

    const missing =
      gun.capacity - mag.rounds;

    if (spare <= 0 || missing <= 0) {
      player.gunReload = null;
      return;
    }

    if (gun.mode === "single") {
      if (removeReserve(game, gun.ammo, 1)) {
        mag.rounds += 1;
      }

      const keepLoading =
        mag.rounds < gun.capacity &&
        reserve(game, gun.ammo) > 0 &&
        player.equipped === reload.weaponId;

      if (keepLoading) {
        reload.timer = gun.reload;
        reload.total = gun.reload;
      } else {
        player.gunReload = null;
      }
    } else {
      const amount = Math.min(
        missing,
        spare
      );

      if (
        removeReserve(
          game,
          gun.ammo,
          amount
        )
      ) {
        mag.rounds += amount;
      }

      player.gunReload = null;
    }

    game.updateHotbar?.();
  }

  function updatePlayerReload(game, dt) {
    const reload =
      game.player?.gunReload;

    if (!reload) {
      return;
    }

    if (
      game.player.equipped !==
      reload.weaponId
    ) {
      cancelReload(game);
      return;
    }

    reload.timer -= dt;

    game.player.attackCooldown =
      Math.max(
        game.player.attackCooldown || 0,
        Math.min(
          0.18,
          Math.max(0, reload.timer)
        )
      );

    if (reload.timer <= 0) {
      finishReloadStep(game);
    }
  }

  function installPlayerFire(game) {
    if (
      typeof game.attack !== "function" ||
      typeof game.removeItem !== "function"
    ) {
      return;
    }

    const originalAttack =
      game.attack.bind(game);

    const originalRemoveItem =
      game.removeItem.bind(game);

    game.__gunOriginalRemoveItem =
      originalRemoveItem;

    game.removeItem = function (
      id,
      quantity = 1
    ) {
      if (
        state.bypassAmmo &&
        id === state.bypassAmmo
      ) {
        return true;
      }

      return originalRemoveItem(
        id,
        quantity
      );
    };

    game.attack = function (...args) {
      const player = this.player;
      const weaponId =
        player?.equipped;

      const gun = GUNS[weaponId];

      if (!player || !gun) {
        return originalAttack(...args);
      }

      if (
        (player.attackCooldown || 0) > 0 ||
        (player.stamina || 0) <= 1
      ) {
        return;
      }

      const mag = magazine(
        player,
        weaponId,
        `${this.world?.seed}:player`
      );

      if (player.gunReload) {
        if (mag.rounds > 0) {
          cancelReload(this);
        } else {
          return;
        }
      }

      if (mag.rounds <= 0) {
        this.toast?.(
          `${gun.name} is empty.`,
          "danger"
        );

        startReload(this, true);
        return;
      }

      const oldCooldown =
        player.attackCooldown || 0;

      const oldAnimation =
        player.attackAnim || 0;

      state.bypassAmmo = gun.ammo;

      try {
        const result =
          originalAttack(...args);

        const fired =
          (player.attackCooldown || 0) >
            oldCooldown + 0.01 ||
          (player.attackAnim || 0) >
            oldAnimation + 0.01;

        if (fired) {
          mag.rounds = Math.max(
            0,
            mag.rounds - 1
          );

          if (
            mag.rounds <= 0 &&
            reserve(this, gun.ammo) > 0
          ) {
            startReload(this, true);
          }

          this.updateHotbar?.();
        }

        return result;
      } finally {
        state.bypassAmmo = null;
      }
    };
  }

  function npcState(
    game,
    survivor,
    weaponId
  ) {
    if (!survivor.__gunState) {
      survivor.__gunState = {
        reload: null
      };
    }

    magazine(
      survivor,
      weaponId,
      `${game.world?.seed}:${
        survivor.id ||
        survivor.name ||
        "npc"
      }`
    );

    return survivor.__gunState;
  }

  function startNpcReload(
    game,
    survivor,
    weaponId
  ) {
    const gun = GUNS[weaponId];

    if (
      !gun ||
      (survivor.ammo || 0) <= 0
    ) {
      return;
    }

    const info = npcState(
      game,
      survivor,
      weaponId
    );

    const mag = magazine(
      survivor,
      weaponId,
      survivor.id || "npc"
    );

    if (
      info.reload ||
      mag.rounds >= gun.capacity
    ) {
      return;
    }

    info.reload = {
      weaponId,
      timer: gun.reload,
      total: gun.reload
    };

    survivor.attackCooldown =
      Math.max(
        survivor.attackCooldown || 0,
        gun.reload
      );
  }

  function updateNpcReload(
    game,
    survivor,
    dt
  ) {
    const weaponId = survivor.weapon;
    const gun = GUNS[weaponId];

    if (!gun) {
      return;
    }

    const info = npcState(
      game,
      survivor,
      weaponId
    );

    const mag = magazine(
      survivor,
      weaponId,
      survivor.id || "npc"
    );

    if (
      !info.reload &&
      mag.rounds <= 0 &&
      (survivor.ammo || 0) > 0
    ) {
      startNpcReload(
        game,
        survivor,
        weaponId
      );
    }

    if (!info.reload) {
      return;
    }

    info.reload.timer -= dt;

    survivor.attackCooldown =
      Math.max(
        survivor.attackCooldown || 0,
        Math.max(
          0.08,
          info.reload.timer
        )
      );

    if (info.reload.timer > 0) {
      return;
    }

    const missing =
      gun.capacity - mag.rounds;

    const spare = Math.max(
      0,
      Math.floor(
        survivor.ammo || 0
      )
    );

    if (
      missing <= 0 ||
      spare <= 0
    ) {
      info.reload = null;
      return;
    }

    if (gun.mode === "single") {
      mag.rounds += 1;
      survivor.ammo = spare - 1;

      if (
        mag.rounds < gun.capacity &&
        survivor.ammo > 0
      ) {
        info.reload.timer = gun.reload;
        info.reload.total = gun.reload;
      } else {
        info.reload = null;
      }
    } else {
      const amount = Math.min(
        missing,
        spare
      );

      mag.rounds += amount;
      survivor.ammo = spare - amount;
      info.reload = null;
    }
  }

  function installNpcReload(game) {
    if (
      typeof game.updateSurvivors !==
      "function"
    ) {
      return;
    }

    const original =
      game.updateSurvivors.bind(game);

    game.updateSurvivors = function (dt) {
      const snapshots = [];

      for (
        const survivor of
        this.survivors || []
      ) {
        if (
          !survivor ||
          survivor.dead ||
          !GUNS[survivor.weapon]
        ) {
          continue;
        }

        updateNpcReload(
          this,
          survivor,
          dt
        );

        const mag = magazine(
          survivor,
          survivor.weapon,
          survivor.id || "npc"
        );

        const info = npcState(
          this,
          survivor,
          survivor.weapon
        );

        const actualReserve =
          Math.max(
            0,
            Math.floor(
              survivor.ammo || 0
            )
          );

        if (
          mag.rounds <= 0 &&
          actualReserve > 0 &&
          !info.reload
        ) {
          startNpcReload(
            this,
            survivor,
            survivor.weapon
          );
        }

        if (info.reload) {
          survivor.attackCooldown =
            Math.max(
              survivor.attackCooldown || 0,
              Math.max(
                0.1,
                info.reload.timer
              )
            );
        }

        const visibleAmmo =
          mag.rounds > 0
            ? Math.max(1, actualReserve)
            : actualReserve;

        snapshots.push({
          survivor,
          weaponId: survivor.weapon,
          mag,
          actualReserve,
          visibleAmmo
        });

        survivor.ammo = visibleAmmo;
      }

      const result = original(dt);

      for (const snapshot of snapshots) {
        const after = Math.max(
          0,
          Math.floor(
            snapshot.survivor.ammo || 0
          )
        );

        const fired = Math.max(
          0,
          snapshot.visibleAmmo - after
        );

        snapshot.survivor.ammo =
          snapshot.actualReserve;

        if (fired > 0) {
          snapshot.mag.rounds =
            Math.max(
              0,
              snapshot.mag.rounds - fired
            );

          if (
            snapshot.mag.rounds <= 0 &&
            snapshot.survivor.ammo > 0
          ) {
            startNpcReload(
              this,
              snapshot.survivor,
              snapshot.weaponId
            );
          }
        }
      }

      return result;
    };
  }

  function addLoot(loot, id, qty) {
    const found = loot.find(
      entry => entry?.id === id
    );

    if (found) {
      found.qty = Math.max(
        1,
        (found.qty || 0) + qty
      );
    } else {
      loot.push({
        id,
        qty
      });
    }
  }

  function boostTarget(
    game,
    target,
    locationType
  ) {
    if (
      !target ||
      target.searched ||
      !Array.isArray(target.loot) ||
      target.__gunBoostV3
    ) {
      return;
    }

    target.__gunBoostV3 = true;

    const table =
      SPAWNS[locationType];

    if (!table) {
      return;
    }

    const alreadyHasGun =
      target.loot.some(
        entry =>
          GUN_IDS.has(entry?.id)
      );

    if (alreadyHasGun) {
      return;
    }

    const targetId =
      target.id ||
      `${target.x}:${target.y}`;

    const seed =
      `${game.world?.seed || "HOLLOW"}:` +
      `${targetId}:gun-v3`;

    if (
      hash01(`${seed}:chance`) >=
      table.chance
    ) {
      return;
    }

    const weaponId = weightedPick(
      table.choices,
      `${seed}:weapon`
    );

    const gun = GUNS[weaponId];

    const ammoRoll =
      hash01(`${seed}:ammo`);

    const ammoQuantity =
      gun.mode === "single"
        ? Math.max(
            2,
            Math.ceil(
              gun.capacity *
                (0.45 + ammoRoll * 0.85)
            )
          )
        : Math.max(
            4,
            Math.ceil(
              gun.capacity *
                (0.35 + ammoRoll * 0.7)
            )
          );

    addLoot(
      target.loot,
      weaponId,
      1
    );

    addLoot(
      target.loot,
      gun.ammo,
      ammoQuantity
    );
  }

  function boostGunSpawns(game) {
    const world = game.world;

    if (!world) {
      return;
    }

    const buildingTypes =
      new Map();

    for (
      const building of
      world.buildings || []
    ) {
      buildingTypes.set(
        building.id,
        building.type ||
          building.kind ||
          "house"
      );
    }

    for (
      const container of
      world.containers || []
    ) {
      const type =
        buildingTypes.get(
          container.buildingId
        ) || "house";

      boostTarget(
        game,
        container,
        type
      );
    }

    for (
      const car of
      world.cars || []
    ) {
      boostTarget(
        game,
        car,
        "car"
      );
    }
  }

  function addStyles() {
    if (
      document.getElementById(
        "gunAddonStyles"
      )
    ) {
      return;
    }

    const style =
      document.createElement("style");

    style.id = "gunAddonStyles";

    style.textContent = `
      #gunHud {
        position: absolute;
        left: 50%;
        bottom: 84px;
        z-index: 24;
        min-width: 152px;
        transform: translateX(-50%);
        padding: 8px 11px 7px;
        border: 1px solid rgba(196,211,177,.24);
        border-radius: 8px;
        background: linear-gradient(
          180deg,
          rgba(17,24,19,.94),
          rgba(5,9,7,.92)
        );
        box-shadow: 0 9px 24px rgba(0,0,0,.38);
        font-family: system-ui, sans-serif;
        pointer-events: none;
        backdrop-filter: blur(7px);
      }

      #gunHud.hidden {
        display: none;
      }

      #gunHudTop,
      #gunHudBottom {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
      }

      #gunHudName {
        overflow: hidden;
        color: #aebaa4;
        font-size: 7px;
        font-weight: 900;
        letter-spacing: .1em;
        text-overflow: ellipsis;
        text-transform: uppercase;
        white-space: nowrap;
      }

      #gunHudAmmo {
        color: #f0e4b8;
        font-size: 15px;
        font-weight: 950;
        font-variant-numeric: tabular-nums;
      }

      #gunHudAmmo small {
        color: #79847a;
        font-size: 9px;
      }

      #gunHudBottom {
        margin-top: 3px;
        color: #717e73;
        font-size: 6px;
        font-weight: 900;
        letter-spacing: .1em;
      }

      #gunReloadTrack {
        height: 3px;
        margin-top: 6px;
        overflow: hidden;
        border-radius: 4px;
        background: rgba(0,0,0,.5);
      }

      #gunReloadFill {
        display: block;
        width: 0;
        height: 100%;
        border-radius: inherit;
        background: linear-gradient(
          90deg,
          #7f9368,
          #d1c77d
        );
      }

      @media (max-width: 700px) {
        #gunHud {
          bottom: 105px;
          min-width: 137px;
          padding: 7px 9px 6px;
        }

        #gunHudAmmo {
          font-size: 13px;
        }

        #reloadBtn {
          display: none;
        }

        .touch-actions {
          gap: 7px;
        }
      }
    `;

    document.head.append(style);
  }

  function createHud(game) {
    const root =
      document.getElementById("game");

    if (!root) {
      return;
    }

    if (
      !document.getElementById(
        "gunHud"
      )
    ) {
      const hud =
        document.createElement("div");

      hud.id = "gunHud";
      hud.className = "hidden";

      hud.innerHTML = `
        <div id="gunHudTop">
          <span id="gunHudName">FIREARM</span>
          <b id="gunHudAmmo">
            0 <small>/ 0</small>
          </b>
        </div>

        <div id="gunHudBottom">
          <span id="gunHudCaliber">AMMO</span>
          <span id="gunHudState">READY</span>
        </div>

        <div id="gunReloadTrack">
          <i id="gunReloadFill"></i>
        </div>
      `;

      root.append(hud);
    }

    const actions =
      root.querySelector(
        ".hud-actions"
      );

    if (
      actions &&
      !document.getElementById(
        "reloadBtn"
      )
    ) {
      const button =
        document.createElement("button");

      button.id = "reloadBtn";
      button.type = "button";
      button.title =
        "Reload weapon (R)";

      button.innerHTML =
        `RELOAD <kbd>R</kbd>`;

      button.addEventListener(
        "click",
        () => startReload(game)
      );

      actions.insertBefore(
        button,
        actions.lastElementChild
      );
    }

    const touch =
      document.querySelector(
        "#mobileControls .touch-actions"
      );

    if (
      touch &&
      !document.getElementById(
        "mobileReloadBtn"
      )
    ) {
      const button =
        document.createElement("button");

      button.id =
        "mobileReloadBtn";

      button.type = "button";
      button.className =
        "touch-small";

      button.textContent =
        "RELOAD";

      button.addEventListener(
        "pointerdown",
        event => {
          event.preventDefault();
          startReload(game);
        }
      );

      touch.insertBefore(
        button,
        touch.lastElementChild
      );
    }
  }

  function updateHud(game) {
    const hud =
      document.getElementById(
        "gunHud"
      );

    const player = game.player;
    const weaponId =
      player?.equipped;

    const gun = GUNS[weaponId];

    if (!hud || !player || !gun) {
      hud?.classList.add("hidden");
      return;
    }

    const mag = magazine(
      player,
      weaponId,
      `${game.world?.seed}:player`
    );

    const spare = reserve(
      game,
      gun.ammo
    );

    const reload =
      player.gunReload?.weaponId ===
      weaponId
        ? player.gunReload
        : null;

    hud.classList.remove("hidden");

    document.getElementById(
      "gunHudName"
    ).textContent = gun.name;

    document.getElementById(
      "gunHudAmmo"
    ).innerHTML =
      `${mag.rounds} ` +
      `<small>/ ${spare}</small>`;

    document.getElementById(
      "gunHudCaliber"
    ).textContent =
      `${gun.label} · ${gun.capacity} CAP`;

    document.getElementById(
      "gunHudState"
    ).textContent =
      reload
        ? gun.mode === "single"
          ? "LOADING"
          : "RELOADING"
        : mag.rounds <= 0
          ? "EMPTY"
          : "READY";

    const progress = reload
      ? Math.round(
          (
            1 -
            clamp(
              reload.timer /
                reload.total,
              0,
              1
            )
          ) * 100
        )
      : 0;

    document.getElementById(
      "gunReloadFill"
    ).style.width =
      `${progress}%`;
  }

  function updateHotbarAmmo(game) {
    const hotbar =
      document.getElementById(
        "hotbar"
      );

    if (!hotbar || !game.player) {
      return;
    }

    const slots = [
      ...hotbar.children
    ];

    slots.forEach(
      (slot, index) => {
        const weaponId =
          game.player.hotbar?.[index];

        const gun =
          GUNS[weaponId];

        if (!gun) {
          return;
        }

        const mag = magazine(
          game.player,
          weaponId,
          `${game.world?.seed}:player`
        );

        const quantity =
          slot.querySelector("small");

        if (quantity) {
          quantity.textContent =
            `${mag.rounds}/` +
            `${reserve(game, gun.ammo)}`;
        }
      }
    );
  }

  function installHudHooks(game) {
    if (
      typeof game.updateHotbar ===
      "function"
    ) {
      const original =
        game.updateHotbar.bind(game);

      game.updateHotbar =
        function (...args) {
          const result =
            original(...args);

          updateHotbarAmmo(this);
          updateHud(this);

          return result;
        };
    }

    window.addEventListener(
      "keydown",
      event => {
        if (
          event.repeat ||
          event.ctrlKey ||
          event.metaKey ||
          event.altKey
        ) {
          return;
        }

        if (
          event.key.toLowerCase() !==
          "r"
        ) {
          return;
        }

        if (
          ["INPUT", "TEXTAREA"].includes(
            document.activeElement?.tagName
          )
        ) {
          return;
        }

        event.preventDefault();
        startReload(game);
      }
    );
  }

  function drawGun(
    ctx,
    weaponId,
    x,
    y,
    dx,
    dy,
    firing = false,
    scale = 0.66
  ) {
    const gun = GUNS[weaponId];

    if (!gun) {
      return;
    }

    const direction =
      normalize(dx, dy);

    const dark = "#090c0e";
    const metal = "#30373b";
    const metal2 = "#596267";
    const shine = "#8d9698";
    const wood = "#6c452d";
    const wood2 = "#9a6742";

    ctx.save();

    ctx.translate(
      Math.round(
        x -
          direction.x *
            (firing ? 2 : 0)
      ),
      Math.round(
        y -
          direction.y *
            (firing ? 2 : 0)
      )
    );

    ctx.rotate(
      Math.atan2(
        direction.y,
        direction.x
      )
    );

    ctx.scale(scale, scale);
    ctx.imageSmoothingEnabled = false;

    function rect(
      px,
      py,
      width,
      height,
      color
    ) {
      ctx.fillStyle = color;

      ctx.fillRect(
        Math.round(px),
        Math.round(py),
        Math.round(width),
        Math.round(height)
      );
    }

    function box(
      px,
      py,
      width,
      height,
      color
    ) {
      rect(
        px - 1,
        py - 1,
        width + 2,
        height + 2,
        dark
      );

      rect(
        px,
        py,
        width,
        height,
        color
      );
    }

    function curvedMagazine(
      px,
      py
    ) {
      box(
        px,
        py,
        5,
        10,
        metal2
      );

      box(
        px + 3,
        py + 6,
        4,
        7,
        metal2
      );
    }

    switch (gun.model) {
      case "pistol":
        box(-5, -5, 22, 7, metal);
        rect(1, -4, 14, 2, shine);
        box(0, 2, 7, 11, metal);
        rect(2, 4, 4, 8, "#242a2d");
        rect(13, -7, 3, 2, dark);
        break;

      case "revolver":
        box(-5, -4, 21, 6, metal);
        rect(9, -3, 8, 2, shine);

        ctx.fillStyle = dark;
        ctx.beginPath();
        ctx.arc(
          1,
          1,
          6,
          0,
          Math.PI * 2
        );
        ctx.fill();

        ctx.fillStyle = metal2;
        ctx.beginPath();
        ctx.arc(
          1,
          1,
          4.5,
          0,
          Math.PI * 2
        );
        ctx.fill();

        box(-5, 4, 7, 11, wood);
        rect(-3, 6, 4, 7, wood2);
        break;

      case "machine_pistol":
        box(-6, -5, 24, 8, metal);
        rect(2, -4, 14, 2, shine);
        box(-1, 3, 7, 11, metal);
        box(7, 3, 5, 15, "#252b2e");
        break;

      case "smg":
        box(
          -13,
          -5,
          35,
          9,
          "#202629"
        );

        box(-23, -4, 10, 7, metal);
        box(19, -3, 16, 5, metal);
        rect(22, -2, 11, 1, shine);
        box(-1, 4, 6, 14, "#252b2e");
        box(8, 4, 5, 11, metal);
        break;

      case "shotgun":
        box(-24, -4, 18, 8, wood);
        rect(-21, -2, 14, 4, wood2);
        box(-7, -5, 20, 9, metal);
        box(12, -3, 34, 5, metal);
        rect(15, -2, 29, 1, shine);
        box(12, 3, 15, 7, wood);
        rect(14, 4, 11, 4, wood2);
        break;

      case "double_barrel":
        box(-24, -4, 19, 8, wood);
        rect(-21, -2, 14, 4, wood2);
        box(-6, -5, 17, 10, metal);
        box(10, -5, 39, 4, metal);
        box(10, 1, 39, 4, metal);
        rect(13, -4, 33, 1, shine);
        rect(13, 2, 33, 1, shine);
        break;

      case "rifle":
        box(-25, -5, 19, 9, wood);
        rect(-21, -3, 14, 5, wood2);
        box(-7, -5, 25, 9, metal);
        box(16, -3, 46, 5, metal);
        rect(20, -2, 39, 1, shine);
        box(0, -10, 25, 4, dark);
        rect(3, -9, 19, 2, metal2);
        rect(5, -12, 3, 3, dark);
        rect(18, -12, 3, 3, dark);
        break;

      case "carbine":
        box(-22, -4, 15, 7, metal);

        box(
          -8,
          -6,
          30,
          11,
          "#22282b"
        );

        box(20, -3, 31, 5, metal);
        rect(23, -2, 25, 1, shine);
        box(-2, 5, 6, 12, metal);
        curvedMagazine(9, 5);
        box(-2, -11, 19, 4, dark);
        rect(1, -10, 13, 2, metal2);
        break;

      case "assault_rifle":
        box(-23, -5, 18, 9, wood);
        rect(-20, -3, 14, 5, wood2);

        box(
          -7,
          -6,
          31,
          11,
          "#202629"
        );

        box(22, -3, 37, 5, metal);
        rect(25, -2, 31, 1, shine);
        box(-1, 5, 6, 12, wood);
        curvedMagazine(10, 5);
        box(24, 2, 17, 7, wood);
        break;

      case "lever_rifle":
        box(-25, -5, 21, 9, wood);
        rect(-22, -3, 16, 5, wood2);
        box(-6, -5, 24, 9, metal);
        box(16, -3, 45, 5, metal);
        rect(20, -2, 38, 1, shine);
        box(17, 2, 22, 6, wood);

        ctx.strokeStyle = dark;
        ctx.lineWidth = 4;
        ctx.beginPath();

        ctx.ellipse(
          1,
          8,
          9,
          6,
          0,
          0,
          Math.PI * 2
        );

        ctx.stroke();

        ctx.strokeStyle = metal2;
        ctx.lineWidth = 2;
        ctx.beginPath();

        ctx.ellipse(
          1,
          8,
          8,
          5,
          0,
          0,
          Math.PI * 2
        );

        ctx.stroke();
        break;
    }

    if (firing) {
      ctx.fillStyle =
        "rgba(255,221,132,.98)";

      ctx.beginPath();
      ctx.moveTo(63, 0);
      ctx.lineTo(73, -6);
      ctx.lineTo(69, 0);
      ctx.lineTo(73, 6);
      ctx.closePath();
      ctx.fill();

      rect(
        59,
        -1,
        6,
        2,
        "#fff0b1"
      );
    }

    ctx.restore();
  }

  function installGunModels(game) {
    if (
      typeof game.drawPlayer ===
      "function"
    ) {
      const original =
        game.drawPlayer.bind(game);

      game.drawPlayer = function (
        ctx,
        shakeX = 0,
        shakeY = 0
      ) {
        original(
          ctx,
          shakeX,
          shakeY
        );

        const player = this.player;
        const weaponId =
          player?.equipped;

        if (
          !player ||
          !GUNS[weaponId]
        ) {
          return;
        }

        const screen =
          this.worldToScreen(
            player.x,
            player.y,
            shakeX,
            shakeY
          );

        const direction =
          normalize(
            player.renderFacingX ??
              player.facingX ??
              1,

            (
              player.renderFacingY ??
              player.facingY ??
              0
            ) * 0.78
          );

        const firing =
          (player.attackAnim || 0) >
          (player.attackDuration ||
            0.2) *
            0.4;

        drawGun(
          ctx,
          weaponId,
          screen.x +
            direction.x * 10,
          screen.y -
            18 +
            direction.y * 5,
          direction.x,
          direction.y,
          firing,
          0.64
        );

        const reload =
          player.gunReload;

        if (reload) {
          const progress =
            1 -
            clamp(
              reload.timer /
                reload.total,
              0,
              1
            );

          ctx.save();

          ctx.translate(
            Math.round(screen.x),
            Math.round(
              screen.y - 42
            )
          );

          ctx.lineWidth = 3;
          ctx.strokeStyle =
            "rgba(0,0,0,.72)";

          ctx.beginPath();

          ctx.arc(
            0,
            0,
            10,
            0,
            Math.PI * 2
          );

          ctx.stroke();

          ctx.strokeStyle =
            "#d1c77d";

          ctx.beginPath();

          ctx.arc(
            0,
            0,
            10,
            -Math.PI / 2,
            -Math.PI / 2 +
              Math.PI *
                2 *
                progress
          );

          ctx.stroke();

          ctx.fillStyle =
            "#e7e7d9";

          ctx.font =
            "900 6px system-ui";

          ctx.textAlign =
            "center";

          ctx.fillText(
            "RELOAD",
            0,
            -14
          );

          ctx.restore();
        }
      };
    }

    if (
      typeof game.drawSurvivors ===
      "function"
    ) {
      const original =
        game.drawSurvivors.bind(game);

      game.drawSurvivors =
        function (
          ctx,
          shakeX = 0,
          shakeY = 0
        ) {
          original(
            ctx,
            shakeX,
            shakeY
          );

          for (
            const survivor of
            this.survivors || []
          ) {
            const weaponId =
              survivor?.weapon;

            if (
              !survivor ||
              survivor.dead ||
              !GUNS[weaponId] ||
              this.isHiddenInside?.(
                survivor
              )
            ) {
              continue;
            }

            const screen =
              this.worldToScreen(
                survivor.x,
                survivor.y,
                shakeX,
                shakeY
              );

            const direction =
              normalize(
                Math.cos(
                  survivor.angle || 0
                ),

                Math.sin(
                  survivor.angle || 0
                ) * 0.78
              );

            drawGun(
              ctx,
              weaponId,
              screen.x +
                direction.x * 9,
              screen.y -
                16 +
                direction.y * 4,
              direction.x,
              direction.y,
              (survivor.attackAnim ||
                0) > 0.08,
              0.58
            );
          }
        };
    }
  }

  function installUpdate(game) {
    if (
      typeof game.update !==
      "function"
    ) {
      return;
    }

    const original =
      game.update.bind(game);

    game.update = function (dt) {
      const result = original(dt);

      updatePlayerReload(
        this,
        dt
      );

      state.lootTimer -= dt;

      if (state.lootTimer <= 0) {
        state.lootTimer = 0.8;
        boostGunSpawns(this);
      }

      state.hudTimer -= dt;

      if (state.hudTimer <= 0) {
        state.hudTimer = 0.08;
        updateHud(this);
        updateHotbarAmmo(this);
      }

      return result;
    };
  }

  function installStartHooks(game) {
    const methodNames = [
      "startNew",
      "loadSaved"
    ];

    for (
      const methodName of
      methodNames
    ) {
      if (
        typeof game[methodName] !==
        "function"
      ) {
        continue;
      }

      const original =
        game[methodName].bind(game);

      game[methodName] =
        function (...args) {
          const result =
            original(...args);

          if (this.player) {
            if (
              !this.player
                .gunMagazines
            ) {
              this.player
                .gunMagazines = {};
            }

            this.player.gunReload =
              null;
          }

          createHud(this);
          boostGunSpawns(this);
          this.updateHotbar?.();
          updateHud(this);

          return result;
        };
    }
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
    createHud(game);
    installPlayerFire(game);
    installNpcReload(game);
    installHudHooks(game);
    installGunModels(game);
    installUpdate(game);
    installStartHooks(game);

    if (game.player) {
      if (
        !game.player.gunMagazines
      ) {
        game.player.gunMagazines =
          {};
      }
    }

    boostGunSpawns(game);
    game.updateHotbar?.();
    updateHud(game);

    game.toast?.(
      "Gun add-on loaded: reloads, magazines, improved models and higher common gun spawns."
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