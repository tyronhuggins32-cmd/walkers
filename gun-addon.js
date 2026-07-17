(() => {
  "use strict";

  const INSTALL_FLAG = "__hollowCountyGunAddonV5";

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
    },

    suppressed_pistol: {
      name: "suppressed 9 mm pistol",
      ammo: "ammo9",
      label: "9 MM SUB",
      capacity: 15,
      reload: 1.45,
      mode: "mag",
      model: "suppressed_pistol"
    },

    hand_cannon: {
      name: ".50 hand cannon",
      ammo: "magnum_round",
      label: ".50 MAG",
      capacity: 7,
      reload: 2.2,
      mode: "mag",
      model: "hand_cannon"
    },

    auto_shotgun: {
      name: "automatic shotgun",
      ammo: "shell",
      label: "12 GA",
      capacity: 8,
      reload: 2.75,
      mode: "mag",
      model: "auto_shotgun"
    },

    sniper_rifle: {
      name: "precision sniper rifle",
      ammo: "rifle_round",
      label: ".308",
      capacity: 5,
      reload: 3.25,
      mode: "mag",
      model: "sniper_rifle"
    },

    lmg: {
      name: "5.56 light machine gun",
      ammo: "ammo556",
      label: "5.56 BELT",
      capacity: 60,
      reload: 4.35,
      mode: "mag",
      model: "lmg"
    }
  });

  const BALLISTICS = Object.freeze({
    pistol: { color: "#ffd36b", core: "#fff2b0", width: 1.4, glow: 4, dash: [], style: "solid", muzzle: "#ffd36b" },
    revolver: { color: "#ff8b3d", core: "#ffe0a1", width: 2.2, glow: 7, dash: [], style: "spark", muzzle: "#ff9b42" },
    machine_pistol: { color: "#73e9ff", core: "#e5fbff", width: 1.2, glow: 4, dash: [5, 3], style: "dash", muzzle: "#7be9ff" },
    smg: { color: "#93ff78", core: "#efffe9", width: 1.35, glow: 5, dash: [8, 3], style: "dash", muzzle: "#adff83" },
    shotgun: { color: "#ffb24e", core: "#fff0c4", width: 1.8, glow: 6, dash: [], style: "pellet", muzzle: "#ffb347" },
    double_barrel: { color: "#ff603f", core: "#ffe1ba", width: 2.2, glow: 9, dash: [], style: "double", muzzle: "#ff6d45" },
    rifle: { color: "#d8efff", core: "#ffffff", width: 1.2, glow: 7, dash: [], style: "needle", muzzle: "#d6edff" },
    carbine: { color: "#5ecbff", core: "#e4f8ff", width: 1.5, glow: 5, dash: [12, 3], style: "solid", muzzle: "#68d4ff" },
    assault_rifle: { color: "#e0ff69", core: "#f8ffd7", width: 1.55, glow: 6, dash: [10, 2], style: "dash", muzzle: "#e7ff75" },
    lever_rifle: { color: "#f4bd77", core: "#fff0d2", width: 1.75, glow: 6, dash: [], style: "spark", muzzle: "#f8c27a" },
    suppressed_pistol: { color: "#72e2bd", core: "#ddfff3", width: 1, glow: 3, dash: [2, 5], style: "quiet", muzzle: "#8de8c9" },
    hand_cannon: { color: "#ff433c", core: "#fff0cf", width: 3, glow: 12, dash: [], style: "shock", muzzle: "#ff4e3e" },
    auto_shotgun: { color: "#cf83ff", core: "#f5ddff", width: 1.9, glow: 8, dash: [7, 2], style: "pellet", muzzle: "#d58cff" },
    sniper_rifle: { color: "#7d9dff", core: "#f3f7ff", width: 1.05, glow: 10, dash: [], style: "beam", muzzle: "#95afff" },
    lmg: { color: "#ffda35", core: "#fff8be", width: 1.8, glow: 7, dash: [14, 4], style: "hot", muzzle: "#ffe04a" }
  });

  const ANIMATIONS = Object.freeze({
    pistol: { recoil: 3, rise: 0.035, shake: 0.1, cycle: "slide", scale: 0.64 },
    revolver: { recoil: 5.5, rise: 0.085, shake: 0.18, cycle: "hammer", scale: 0.66 },
    machine_pistol: { recoil: 2.8, rise: 0.045, shake: 0.8, cycle: "slide", scale: 0.64 },
    smg: { recoil: 3.2, rise: 0.032, shake: 0.9, cycle: "bolt", scale: 0.64 },
    shotgun: { recoil: 7, rise: 0.075, shake: 0.25, cycle: "pump", scale: 0.68 },
    double_barrel: { recoil: 9, rise: 0.11, shake: 0.3, cycle: "break", scale: 0.7 },
    rifle: { recoil: 7.5, rise: 0.07, shake: 0.15, cycle: "bolt", scale: 0.68 },
    carbine: { recoil: 4.2, rise: 0.04, shake: 0.55, cycle: "bolt", scale: 0.65 },
    assault_rifle: { recoil: 4.6, rise: 0.045, shake: 0.75, cycle: "bolt", scale: 0.66 },
    lever_rifle: { recoil: 6.5, rise: 0.065, shake: 0.18, cycle: "lever", scale: 0.69 },
    suppressed_pistol: { recoil: 2.1, rise: 0.022, shake: 0.06, cycle: "slide", scale: 0.66 },
    hand_cannon: { recoil: 10.5, rise: 0.14, shake: 0.35, cycle: "heavy-slide", scale: 0.72 },
    auto_shotgun: { recoil: 6.2, rise: 0.06, shake: 0.65, cycle: "gas", scale: 0.7 },
    sniper_rifle: { recoil: 9, rise: 0.09, shake: 0.12, cycle: "sniper-bolt", scale: 0.72 },
    lmg: { recoil: 4.8, rise: 0.035, shake: 1.15, cycle: "belt", scale: 0.72 }
  });

  const GUN_IDS = new Set(Object.keys(GUNS));

  const SPAWNS = Object.freeze({
    house: {
      chance: 0.09,
      choices: [
        ["pistol", 43],
        ["revolver", 22],
        ["double_barrel", 14],
        ["shotgun", 10],
        ["suppressed_pistol", 7],
        ["hand_cannon", 4]
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
        ["rifle", 3],
        ["suppressed_pistol", 8],
        ["hand_cannon", 4],
        ["auto_shotgun", 6],
        ["sniper_rifle", 3],
        ["lmg", 2]
      ]
    },

    prison: {
      chance: 0.2,
      choices: [
        ["pistol", 44],
        ["revolver", 20],
        ["shotgun", 25],
        ["carbine", 8],
        ["smg", 3],
        ["suppressed_pistol", 6],
        ["hand_cannon", 3],
        ["auto_shotgun", 5]
      ]
    },

    warehouse: {
      chance: 0.075,
      choices: [
        ["shotgun", 35],
        ["double_barrel", 30],
        ["rifle", 22],
        ["lever_rifle", 13],
        ["auto_shotgun", 8],
        ["sniper_rifle", 5],
        ["lmg", 4]
      ]
    },

    grocery: {
      chance: 0.025,
      choices: [
        ["pistol", 65],
        ["revolver", 25],
        ["double_barrel", 10],
        ["suppressed_pistol", 4]
      ]
    },

    hospital: {
      chance: 0.015,
      choices: [
        ["pistol", 75],
        ["revolver", 25],
        ["suppressed_pistol", 3]
      ]
    },

    car: {
      chance: 0.08,
      choices: [
        ["pistol", 52],
        ["revolver", 28],
        ["double_barrel", 12],
        ["shotgun", 6],
        ["carbine", 2],
        ["suppressed_pistol", 5],
        ["hand_cannon", 2]
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

      const effectStart =
        Array.isArray(this.effects)
          ? this.effects.length
          : 0;

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
          const animation =
            ANIMATIONS[weaponId];

          for (
            const effect of
            (this.effects || []).slice(
              effectStart
            )
          ) {
            if (
              effect?.type === "tracer" ||
              effect?.type === "muzzle" ||
              effect?.type === "casing"
            ) {
              effect.weaponId = weaponId;
              effect.gunVfx =
                BALLISTICS[weaponId];
            }
          }

          if (this.camera && animation) {
            this.camera.shake =
              Math.max(
                this.camera.shake || 0,
                animation.recoil * 0.9
              );
          }

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

      const effectStart =
        Array.isArray(this.effects)
          ? this.effects.length
          : 0;

      const result = original(dt);

      const newEffects =
        (this.effects || []).slice(
          effectStart
        );

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
          for (const effect of newEffects) {
            if (
              effect?.weaponId ||
              ![
                "tracer",
                "muzzle",
                "casing"
              ].includes(effect?.type)
            ) {
              continue;
            }

            const effectDistance =
              Math.hypot(
                (effect.x || 0) -
                  snapshot.survivor.x,
                (effect.y || 0) -
                  snapshot.survivor.y
              );

            if (effectDistance <= 28) {
              effect.weaponId =
                snapshot.weaponId;

              effect.gunVfx =
                BALLISTICS[
                  snapshot.weaponId
                ];
            }
          }

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
      target.__gunBoostV5
    ) {
      return;
    }

    target.__gunBoostV5 = true;

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
      `${targetId}:gun-v5`;

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

  function drawBallisticTracer(
    ctx,
    effect,
    p,
    p2,
    vfx,
    alpha
  ) {
    const dx = p2.x - p.x;
    const dy = p2.y - p.y;
    const length = Math.hypot(dx, dy) || 1;
    const nx = -dy / length;
    const ny = dx / length;

    function line(
      offset,
      width,
      color,
      opacity,
      dash = []
    ) {
      ctx.globalAlpha = opacity;
      ctx.strokeStyle = color;
      ctx.lineWidth = width;
      ctx.setLineDash(dash);
      ctx.beginPath();
      ctx.moveTo(
        p.x + nx * offset,
        p.y + ny * offset
      );
      ctx.lineTo(
        p2.x + nx * offset,
        p2.y + ny * offset
      );
      ctx.stroke();
    }

    ctx.save();
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.globalCompositeOperation =
      "lighter";
    ctx.lineDashOffset =
      -performance.now() * 0.08;

    if (vfx.style === "double") {
      for (const offset of [-2.2, 2.2]) {
        line(
          offset,
          vfx.width + vfx.glow,
          vfx.color,
          alpha * 0.12
        );
        line(
          offset,
          vfx.width,
          vfx.color,
          alpha * 0.92
        );
        line(
          offset,
          Math.max(0.65, vfx.width * 0.35),
          vfx.core,
          alpha
        );
      }
    } else {
      line(
        0,
        vfx.width + vfx.glow,
        vfx.color,
        alpha * 0.13,
        vfx.dash
      );
      line(
        0,
        vfx.width,
        vfx.color,
        alpha * 0.9,
        vfx.dash
      );
      line(
        0,
        Math.max(0.65, vfx.width * 0.38),
        vfx.core,
        alpha,
        vfx.dash
      );
    }

    ctx.setLineDash([]);
    ctx.globalAlpha = alpha;

    if (
      vfx.style === "spark" ||
      vfx.style === "hot" ||
      vfx.style === "pellet"
    ) {
      const rays =
        vfx.style === "pellet" ? 6 : 4;

      ctx.strokeStyle = vfx.color;
      ctx.lineWidth =
        Math.max(1, vfx.width * 0.7);

      for (let index = 0; index < rays; index += 1) {
        const angle =
          index / rays * Math.PI * 2 +
          effect.x2 * 0.013;
        const radius =
          (vfx.style === "pellet" ? 9 : 6) *
          alpha;

        ctx.beginPath();
        ctx.moveTo(p2.x, p2.y);
        ctx.lineTo(
          p2.x + Math.cos(angle) * radius,
          p2.y + Math.sin(angle) * radius
        );
        ctx.stroke();
      }
    } else if (vfx.style === "shock") {
      ctx.strokeStyle = vfx.color;
      ctx.lineWidth = 2.4;
      ctx.beginPath();
      ctx.arc(
        p2.x,
        p2.y,
        13 * (1 - alpha * 0.35),
        0,
        Math.PI * 2
      );
      ctx.stroke();

      for (let index = 0; index < 8; index += 1) {
        const angle =
          index / 8 * Math.PI * 2;
        ctx.beginPath();
        ctx.moveTo(
          p2.x + Math.cos(angle) * 4,
          p2.y + Math.sin(angle) * 4
        );
        ctx.lineTo(
          p2.x + Math.cos(angle) * 13,
          p2.y + Math.sin(angle) * 13
        );
        ctx.stroke();
      }
    } else if (vfx.style === "beam") {
      ctx.strokeStyle = vfx.color;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(
        p2.x,
        p2.y,
        7 + (1 - alpha) * 7,
        0,
        Math.PI * 2
      );
      ctx.stroke();
    } else if (vfx.style === "quiet") {
      ctx.fillStyle = vfx.core;
      ctx.beginPath();
      ctx.arc(
        p2.x,
        p2.y,
        2.5 * alpha,
        0,
        Math.PI * 2
      );
      ctx.fill();
    }

    ctx.restore();
  }

  function drawBallisticMuzzle(
    ctx,
    p,
    vfx,
    alpha
  ) {
    const size = 4 + alpha * 10;

    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.globalCompositeOperation =
      "lighter";
    ctx.fillStyle = vfx.muzzle;
    ctx.strokeStyle = vfx.core;

    if (vfx.style === "quiet") {
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(
        p.x,
        p.y,
        3 + (1 - alpha) * 5,
        0,
        Math.PI * 2
      );
      ctx.stroke();
    } else if (vfx.style === "shock") {
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(
        p.x,
        p.y,
        size,
        0,
        Math.PI * 2
      );
      ctx.stroke();

      for (let index = 0; index < 8; index += 1) {
        const angle =
          index / 8 * Math.PI * 2;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(
          p.x + Math.cos(angle) * size * 1.35,
          p.y + Math.sin(angle) * size * 1.35
        );
        ctx.stroke();
      }
    } else if (
      vfx.style === "pellet" ||
      vfx.style === "double"
    ) {
      ctx.beginPath();
      ctx.ellipse(
        p.x,
        p.y,
        size * 1.35,
        size * 0.65,
        0,
        0,
        Math.PI * 2
      );
      ctx.fill();
    } else {
      ctx.beginPath();
      ctx.moveTo(p.x - size, p.y);
      ctx.lineTo(p.x, p.y - size * 0.55);
      ctx.lineTo(p.x + size, p.y);
      ctx.lineTo(p.x, p.y + size * 0.55);
      ctx.closePath();
      ctx.fill();
    }

    ctx.restore();
  }

  function installBallisticEffects(game) {
    if (
      typeof game.drawEffects !==
      "function"
    ) {
      return;
    }

    const original =
      game.drawEffects.bind(game);

    game.drawEffects = function (
      ctx,
      shakeX,
      shakeY,
      behind
    ) {
      const allEffects =
        this.effects || [];

      if (behind) {
        return original(
          ctx,
          shakeX,
          shakeY,
          behind
        );
      }

      const custom =
        allEffects.filter(
          effect =>
            BALLISTICS[
              effect?.weaponId
            ] &&
            (
              effect.type === "tracer" ||
              effect.type === "muzzle"
            )
        );

      if (custom.length === 0) {
        return original(
          ctx,
          shakeX,
          shakeY,
          behind
        );
      }

      const customSet = new Set(custom);
      this.effects = allEffects.filter(
        effect => !customSet.has(effect)
      );

      let result;

      try {
        result = original(
          ctx,
          shakeX,
          shakeY,
          behind
        );
      } finally {
        this.effects = allEffects;
      }

      for (const effect of custom) {
        if (
          this.isHiddenInside?.(effect)
        ) {
          continue;
        }

        const vfx =
          effect.gunVfx ||
          BALLISTICS[effect.weaponId];

        const alpha = clamp(
          effect.life /
            (effect.maxLife || 1),
          0,
          1
        );

        const p = this.worldToScreen(
          effect.x,
          effect.y,
          shakeX,
          shakeY
        );

        if (effect.type === "tracer") {
          const p2 = this.worldToScreen(
            effect.x2,
            effect.y2,
            shakeX,
            shakeY
          );

          drawBallisticTracer(
            ctx,
            effect,
            p,
            p2,
            vfx,
            alpha
          );
        } else {
          drawBallisticMuzzle(
            ctx,
            p,
            vfx,
            alpha
          );
        }
      }

      return result;
    };
  }

  function drawGun(
    ctx,
    weaponId,
    x,
    y,
    dx,
    dy,
    firing = false,
    scale = 0.66,
    cycle = 0,
    reloadProgress = 0
  ) {
    const gun = GUNS[weaponId];

    if (!gun) {
      return;
    }

    const direction =
      normalize(dx, dy);

    const animation =
      ANIMATIONS[weaponId] ||
      ANIMATIONS.pistol;

    const cycleProgress = clamp(
      cycle,
      0,
      1
    );

    const mechanical = firing
      ? Math.sin(
          Math.min(
            1,
            cycleProgress * 1.8
          ) * Math.PI
        )
      : 0;

    const kick = firing
      ? Math.max(
          0,
          1 - cycleProgress * 1.7
        )
      : 0;

    const reloadArc = Math.sin(
      Math.PI *
        clamp(reloadProgress, 0, 1)
    );

    const side =
      direction.x < 0 ? -1 : 1;

    const jitter = firing
      ? Math.sin(
          performance.now() * 0.055
        ) * animation.shake
      : 0;

    const reloadTilt =
      animation.cycle === "break"
        ? 0.78
        : animation.cycle === "belt"
          ? 0.24
          : animation.cycle ===
              "sniper-bolt"
            ? 0.34
            : 0.46;

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
            animation.recoil * kick -
          direction.y * jitter
      ),
      Math.round(
        y -
          direction.y *
            animation.recoil * kick +
          direction.x * jitter +
          reloadArc * 4
      )
    );

    ctx.rotate(
      Math.atan2(
        direction.y,
        direction.x
      ) -
        animation.rise * kick * side +
        reloadTilt * reloadArc * side
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
        box(
          -5 - mechanical * 4,
          -5,
          22,
          7,
          metal
        );
        rect(
          1 - mechanical * 4,
          -4,
          14,
          2,
          shine
        );
        box(0, 2, 7, 11, metal);
        rect(2, 4, 4, 8, "#242a2d");
        rect(
          13 - mechanical * 4,
          -7,
          3,
          2,
          dark
        );
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

        ctx.save();
        ctx.translate(1, 1);
        ctx.rotate(mechanical * 1.25);
        ctx.fillStyle = dark;

        for (let index = 0; index < 6; index += 1) {
          const angle =
            index / 6 * Math.PI * 2;
          ctx.fillRect(
            Math.cos(angle) * 2.5 - 0.6,
            Math.sin(angle) * 2.5 - 0.6,
            1.2,
            1.2
          );
        }

        ctx.restore();

        box(-5, 4, 7, 11, wood);
        rect(-3, 6, 4, 7, wood2);
        box(
          -6 - mechanical * 2,
          -8 - mechanical * 2,
          4,
          5,
          metal2
        );
        break;

      case "machine_pistol":
        box(
          -6 - mechanical * 5,
          -5,
          24,
          8,
          metal
        );
        rect(
          2 - mechanical * 5,
          -4,
          14,
          2,
          shine
        );
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
        rect(
          8 - mechanical * 8,
          -7,
          7,
          2,
          shine
        );
        break;

      case "shotgun":
        box(-24, -4, 18, 8, wood);
        rect(-21, -2, 14, 4, wood2);
        box(-7, -5, 20, 9, metal);
        box(12, -3, 34, 5, metal);
        rect(15, -2, 29, 1, shine);
        box(
          12 - mechanical * 12,
          3,
          15,
          7,
          wood
        );
        rect(
          14 - mechanical * 12,
          4,
          11,
          4,
          wood2
        );
        break;

      case "double_barrel":
        box(-24, -4, 19, 8, wood);
        rect(-21, -2, 14, 4, wood2);
        box(-6, -5, 17, 10, metal);
        box(
          10 - mechanical * 3,
          -5 + mechanical * 4,
          39,
          4,
          metal
        );
        box(
          10 - mechanical * 3,
          1 + mechanical * 4,
          39,
          4,
          metal
        );
        rect(
          13 - mechanical * 3,
          -4 + mechanical * 4,
          33,
          1,
          shine
        );
        rect(
          13 - mechanical * 3,
          2 + mechanical * 4,
          33,
          1,
          shine
        );
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
        box(
          9 - mechanical * 9,
          -7,
          7,
          3,
          metal2
        );
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
        rect(
          9 - mechanical * 7,
          -7,
          7,
          2,
          shine
        );
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
        rect(
          10 - mechanical * 7,
          -7,
          8,
          2,
          shine
        );
        break;

      case "lever_rifle":
        box(-25, -5, 21, 9, wood);
        rect(-22, -3, 16, 5, wood2);
        box(-6, -5, 24, 9, metal);
        box(16, -3, 45, 5, metal);
        rect(20, -2, 38, 1, shine);
        box(17, 2, 22, 6, wood);

        ctx.save();
        ctx.translate(1, 8);
        ctx.rotate(mechanical * 0.72);
        ctx.strokeStyle = dark;
        ctx.lineWidth = 4;
        ctx.beginPath();

        ctx.ellipse(
          0,
          0,
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
          0,
          0,
          8,
          5,
          0,
          0,
          Math.PI * 2
        );

        ctx.stroke();
        ctx.restore();
        break;

      case "suppressed_pistol":
        box(
          -6 - mechanical * 4,
          -5,
          24,
          7,
          "#263235"
        );
        rect(
          0 - mechanical * 4,
          -4,
          16,
          2,
          "#75a99b"
        );
        box(0, 2, 7, 11, "#283033");
        rect(2, 4, 4, 8, "#151c1e");
        box(16, -4, 23, 5, "#182426");
        rect(19, -3, 17, 1, "#56887b");
        break;

      case "hand_cannon":
        box(
          -8 - mechanical * 7,
          -7,
          39,
          11,
          "#33383c"
        );
        rect(
          -1 - mechanical * 7,
          -5,
          28,
          3,
          "#a87f5d"
        );
        box(-2, 3, 10, 16, "#24292c");
        rect(1, 6, 6, 11, "#4b3027");
        box(25, -5, 7, 7, metal2);
        rect(
          21 - mechanical * 7,
          -9,
          5,
          3,
          dark
        );
        break;

      case "auto_shotgun":
        box(-25, -5, 17, 9, "#202629");
        box(-9, -6, 31, 11, "#2b3135");
        box(20, -3, 35, 5, metal);
        rect(23, -2, 29, 1, "#c39cff");
        box(-1, 5, 6, 12, "#252b2e");
        box(9, 5, 8, 15, "#24252d");
        box(
          25 - mechanical * 10,
          2,
          16,
          7,
          "#43364d"
        );
        rect(
          10 - mechanical * 8,
          -7,
          8,
          2,
          "#d0a4e8"
        );
        break;

      case "sniper_rifle":
        box(-29, -5, 23, 9, "#26313b");
        rect(-25, -3, 17, 5, "#465e70");
        box(-7, -6, 29, 10, "#222a31");
        box(20, -3, 52, 5, "#33414b");
        rect(24, -2, 45, 1, "#9bb8ce");
        box(-1, 4, 6, 13, "#22282d");
        box(7, 4, 6, 9, metal2);
        box(-1, -12, 31, 5, dark);
        rect(3, -11, 23, 3, "#607d91");
        rect(2, -15, 4, 4, dark);
        rect(25, -15, 4, 4, dark);
        box(
          11 - mechanical * 12,
          -8,
          8,
          3,
          "#8ca8b8"
        );
        rect(42, 2, 2, 12, metal2);
        rect(56, 2, 2, 12, metal2);
        break;

      case "lmg":
        box(-30, -5, 23, 9, "#26302a");
        box(-8, -7, 38, 13, "#252d29");
        box(28, -3, 38, 5, metal);
        rect(31, -2, 32, 1, "#d6ba54");
        box(-1, 6, 7, 13, "#252b2e");
        box(8, 6, 17, 16, "#3b3828");
        rect(11, 8, 11, 11, "#7a6c35");
        box(15, -12, 19, 4, dark);
        rect(18, -11, 13, 2, "#b8a64d");
        rect(
          13 - mechanical * 8,
          -8,
          10,
          3,
          "#d7c668"
        );
        rect(42, 2, 2, 14, metal2);
        rect(57, 2, 2, 14, metal2);
        break;
    }

    if (firing && kick > 0.12) {
      const muzzleX = ({
        pistol: 17,
        revolver: 17,
        machine_pistol: 18,
        smg: 35,
        shotgun: 46,
        double_barrel: 49,
        rifle: 62,
        carbine: 51,
        assault_rifle: 59,
        lever_rifle: 61,
        suppressed_pistol: 39,
        hand_cannon: 32,
        auto_shotgun: 55,
        sniper_rifle: 72,
        lmg: 66
      })[gun.model] || 55;

      const vfx =
        BALLISTICS[weaponId];

      ctx.save();
      ctx.globalCompositeOperation =
        "lighter";
      ctx.fillStyle = vfx.muzzle;

      if (vfx.style === "quiet") {
        ctx.globalAlpha = 0.55;
        ctx.beginPath();
        ctx.arc(
          muzzleX + 2,
          0,
          3,
          0,
          Math.PI * 2
        );
        ctx.fill();
      } else {
        const flash =
          vfx.style === "shock"
            ? 17
            : vfx.style === "pellet" ||
                vfx.style === "double"
              ? 12
              : 9;

        ctx.beginPath();
        ctx.moveTo(muzzleX - 1, 0);
        ctx.lineTo(
          muzzleX + flash,
          -flash * 0.58
        );
        ctx.lineTo(
          muzzleX + flash * 0.62,
          0
        );
        ctx.lineTo(
          muzzleX + flash,
          flash * 0.58
        );
        ctx.closePath();
        ctx.fill();

        if (vfx.style === "double") {
          rect(
            muzzleX,
            -4,
            flash,
            2,
            vfx.core
          );
          rect(
            muzzleX,
            2,
            flash,
            2,
            vfx.core
          );
        } else {
          rect(
            muzzleX - 3,
            -1,
            flash * 0.8,
            2,
            vfx.core
          );
        }
      }

      ctx.restore();
    }

    ctx.restore();
  }

  function installGunModels(game) {
    window.__hollowCountyDetailedGunModelsV5 =
      true;

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

        const duration =
          player.attackDuration || 0.2;

        const remaining = clamp(
          (player.attackAnim || 0) /
            duration,
          0,
          1
        );

        const firing = remaining > 0;
        const cycle = 1 - remaining;
        const reload =
          player.gunReload;

        const reloadProgress = reload
          ? 1 -
            clamp(
              reload.timer /
                reload.total,
              0,
              1
            )
          : 0;

        const animation =
          ANIMATIONS[weaponId];

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
          animation.scale,
          cycle,
          reloadProgress
        );

        if (reload) {
          const progress =
            reloadProgress;

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

            const remaining = clamp(
              (survivor.attackAnim || 0) /
                0.24,
              0,
              1
            );

            const reload =
              survivor.__gunState
                ?.reload;

            const reloadProgress = reload
              ? 1 -
                clamp(
                  reload.timer /
                    reload.total,
                  0,
                  1
                )
              : 0;

            const animation =
              ANIMATIONS[weaponId];

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
              remaining > 0,
              animation.scale * 0.9,
              1 - remaining,
              reloadProgress
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
    installBallisticEffects(game);
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
      "Gun upgrade loaded: 15 guns, unique bullet effects, class animations, magazines and reloads."
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
