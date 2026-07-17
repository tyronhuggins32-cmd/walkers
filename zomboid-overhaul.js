(() => {
  "use strict";

  /*
   * Hollow County — Deep Survival Overhaul
   *
   * Original systems inspired by the depth and tension of hardcore
   * zombie-survival sandboxes. No third-party art, audio, or code is used.
   */

  const INSTALL_FLAG = "__hcDeepSurvivalOverhaulV1";
  const PLAYER_STATE = "deepSurvivalV1";
  const VEHICLE_SAVE_PREFIX = "hc-deep-vehicles-v1:";

  const FIREARMS = new Set([
    "pistol",
    "revolver",
    "machine_pistol",
    "smg",
    "shotgun",
    "double_barrel",
    "rifle",
    "carbine",
    "assault_rifle",
    "lever_rifle",
    "suppressed_pistol",
    "hand_cannon",
    "auto_shotgun",
    "sniper_rifle",
    "lmg"
  ]);

  const MELEE_WEAPONS = new Set([
    "knife",
    "hammer",
    "bat",
    "axe",
    "machete",
    "katana",
    "crowbar",
    "spear",
    "sledgehammer"
  ]);

  const ALL_WEAPONS = new Set([
    ...FIREARMS,
    ...MELEE_WEAPONS
  ]);

  const BLADED_WEAPONS = new Set([
    "knife",
    "axe",
    "machete",
    "katana",
    "spear"
  ]);

  const HEAVY_WEAPONS = new Set([
    "axe",
    "sledgehammer",
    "hand_cannon",
    "shotgun",
    "double_barrel",
    "auto_shotgun",
    "sniper_rifle",
    "lmg"
  ]);

  const BODY_PARTS = Object.freeze([
    { id: "head", name: "Head", weight: 7 },
    { id: "torso", name: "Torso", weight: 29 },
    { id: "left_arm", name: "Left arm", weight: 16 },
    { id: "right_arm", name: "Right arm", weight: 16 },
    { id: "left_leg", name: "Left leg", weight: 16 },
    { id: "right_leg", name: "Right leg", weight: 16 }
  ]);

  const SKILLS = Object.freeze({
    fitness: {
      name: "Fitness",
      description: "Stamina recovery, fatigue resistance and endurance."
    },
    strength: {
      name: "Strength",
      description: "Melee force, carrying control and shove power."
    },
    sprinting: {
      name: "Sprinting",
      description: "Faster, quieter and less exhausting sprints."
    },
    nimble: {
      name: "Nimble",
      description: "Movement while aiming and escaping tight spaces."
    },
    sneaking: {
      name: "Sneaking",
      description: "Reduces movement noise and nearby detection."
    },
    aiming: {
      name: "Aiming",
      description: "Reduces firearm sway, panic spread and recoil."
    },
    reloading: {
      name: "Reloading",
      description: "Improves reload handling and jam clearing."
    },
    maintenance: {
      name: "Maintenance",
      description: "Slows weapon wear and improves repairs."
    },
    carpentry: {
      name: "Carpentry",
      description: "Improves barricades and field construction."
    },
    first_aid: {
      name: "First Aid",
      description: "Better bandages, healing and infection control."
    },
    foraging: {
      name: "Foraging",
      description: "Finds useful material away from buildings."
    }
  });

  const OCCUPATIONS = Object.freeze({
    unemployed: {
      name: "Unemployed",
      description: "No specialty. Learns every skill 12% faster.",
      skills: {},
      xp: 1.12
    },
    veteran: {
      name: "Veteran",
      description: "Steady under pressure and trained with firearms.",
      skills: { aiming: 3, reloading: 2, fitness: 1 },
      panicResistance: 0.48
    },
    firefighter: {
      name: "Fire Officer",
      description: "Strong, fit and comfortable with heavy tools.",
      skills: { strength: 3, fitness: 3, sprinting: 1 },
      melee: 1.1
    },
    carpenter: {
      name: "Carpenter",
      description: "Builds stronger defenses and preserves tools.",
      skills: { carpentry: 3, maintenance: 2, strength: 1 },
      repair: 1.2
    },
    burglar: {
      name: "Burglar",
      description: "Quiet movement, fast hands and easy hotwiring.",
      skills: { sneaking: 3, nimble: 3, maintenance: 1 },
      hotwire: true
    },
    nurse: {
      name: "Nurse",
      description: "Treats injuries quickly and controls infection.",
      skills: { first_aid: 3, fitness: 1 },
      healing: 1.28
    }
  });

  const TRAITS = Object.freeze({
    balanced: {
      name: "Balanced",
      description: "No extra advantage or drawback."
    },
    athletic: {
      name: "Athletic",
      description: "+2 Fitness and slower fatigue, but faster thirst.",
      skills: { fitness: 2 },
      fatigue: 0.76,
      thirst: 1.14
    },
    strong: {
      name: "Strong",
      description: "+2 Strength and harder melee hits, but faster hunger.",
      skills: { strength: 2 },
      melee: 1.14,
      hunger: 1.12
    },
    inconspicuous: {
      name: "Inconspicuous",
      description: "+2 Sneaking and less footstep noise.",
      skills: { sneaking: 2 },
      stealth: 0.72
    },
    keen_hearing: {
      name: "Keen Hearing",
      description: "Panic builds slower and nearby threats are easier to read.",
      panic: 0.72
    },
    thin_skinned: {
      name: "Thin-skinned",
      description: "Learns 18% faster, but wounds bleed more severely.",
      xp: 1.18,
      wounds: 1.32
    }
  });

  const WEAPON_NAMES = Object.freeze({
    knife: "Kitchen knife",
    hammer: "Claw hammer",
    bat: "Baseball bat",
    axe: "Fire axe",
    machete: "Brush machete",
    katana: "Display katana",
    crowbar: "Steel crowbar",
    spear: "Salvaged spear",
    sledgehammer: "Sledgehammer",
    pistol: "9 mm pistol",
    revolver: ".357 revolver",
    machine_pistol: "Machine pistol",
    smg: "9 mm SMG",
    shotgun: "Pump shotgun",
    double_barrel: "Double-barrel shotgun",
    rifle: "Hunting rifle",
    carbine: "Patrol carbine",
    assault_rifle: "5.56 assault rifle",
    lever_rifle: "Lever-action rifle",
    suppressed_pistol: "Suppressed pistol",
    hand_cannon: ".50 hand cannon",
    auto_shotgun: "Automatic shotgun",
    sniper_rifle: "Precision sniper rifle",
    lmg: "Light machine gun"
  });

  const WEAPON_WEAR = Object.freeze({
    knife: 0.42,
    hammer: 0.24,
    bat: 0.31,
    axe: 0.27,
    machete: 0.3,
    katana: 0.23,
    crowbar: 0.12,
    spear: 0.36,
    sledgehammer: 0.2,
    pistol: 0.075,
    revolver: 0.05,
    machine_pistol: 0.085,
    smg: 0.07,
    shotgun: 0.08,
    double_barrel: 0.045,
    rifle: 0.055,
    carbine: 0.06,
    assault_rifle: 0.065,
    lever_rifle: 0.05,
    suppressed_pistol: 0.085,
    hand_cannon: 0.09,
    auto_shotgun: 0.1,
    sniper_rifle: 0.052,
    lmg: 0.075
  });

  const state = {
    game: null,
    uiTimer: 0,
    conditionTimer: 0,
    footstepTimer: 0,
    xpMoveTimer: 0,
    forageTimer: 0,
    forageTotal: 0,
    forageSeed: 0,
    lastReload: null,
    lastHealth: 100,
    recentWoundTimer: 0,
    vehicleNoiseTimer: 0,
    vehicleRecords: new Map(),
    activeCar: null,
    vehicleImpact: false,
    customPanel: null,
    inventoryTab: "items",
    legacyAppearanceTabs: null,
    syncingAppearanceTab: false
  };

  const clamp = (value, min, max) =>
    Math.max(min, Math.min(max, value));

  const lerp = (start, end, amount) =>
    start + (end - start) * amount;

  function hash01(value) {
    let hash = 2166136261;

    for (const character of String(value)) {
      hash ^= character.charCodeAt(0);
      hash = Math.imul(hash, 16777619);
    }

    return (hash >>> 0) / 4294967295;
  }

  function titleCase(value) {
    return String(value || "")
      .replaceAll("_", " ")
      .replace(/\b\w/g, character =>
        character.toUpperCase()
      );
  }

  function selectedProfile() {
    let saved = {};

    try {
      saved = JSON.parse(
        localStorage.getItem(
          "hc-deep-survivor-profile-v1"
        ) || "{}"
      );
    } catch {
      saved = {};
    }

    return {
      occupation:
        OCCUPATIONS[saved.occupation]
          ? saved.occupation
          : "unemployed",
      trait:
        TRAITS[saved.trait]
          ? saved.trait
          : "balanced"
    };
  }

  function saveSelectedProfile(profile) {
    try {
      localStorage.setItem(
        "hc-deep-survivor-profile-v1",
        JSON.stringify(profile)
      );
    } catch {
      // The game remains fully playable if browser storage is unavailable.
    }
  }

  function makeSkills(profile) {
    const levels = {};
    const xp = {};

    for (const id of Object.keys(SKILLS)) {
      levels[id] = 0;
      xp[id] = 0;
    }

    const occupation =
      OCCUPATIONS[profile.occupation];

    const trait = TRAITS[profile.trait];

    for (const [id, level] of Object.entries(
      occupation.skills || {}
    )) {
      levels[id] = clamp(
        (levels[id] || 0) + level,
        0,
        10
      );
    }

    for (const [id, level] of Object.entries(
      trait.skills || {}
    )) {
      levels[id] = clamp(
        (levels[id] || 0) + level,
        0,
        10
      );
    }

    return { levels, xp };
  }

  function ensurePlayerState(game, fresh = false) {
    const player = game?.player;

    if (!player) return null;

    if (!player[PLAYER_STATE] || fresh) {
      const profile = selectedProfile();
      const skills = makeSkills(profile);

      player[PLAYER_STATE] = {
        version: 1,
        occupation: profile.occupation,
        trait: profile.trait,
        skills: skills.levels,
        xp: skills.xp,
        wounds: [],
        pain: 0,
        panic: 0,
        fatigue: 8,
        wetness: 0,
        temperature: 37,
        sickness: 0,
        painkillerTimer: 0,
        resting: false,
        weaponCondition: {},
        weaponHeat: {},
        jams: {},
        clearingJam: null,
        vehicleId: null,
        metersDriven: 0,
        shouts: 0,
        itemsForaged: 0
      };
    }

    const survival = player[PLAYER_STATE];

    survival.skills ||= {};
    survival.xp ||= {};
    survival.wounds ||= [];
    survival.weaponCondition ||= {};
    survival.weaponHeat ||= {};
    survival.jams ||= {};

    for (const id of Object.keys(SKILLS)) {
      survival.skills[id] = clamp(
        Number(survival.skills[id]) || 0,
        0,
        10
      );
      survival.xp[id] = Math.max(
        0,
        Number(survival.xp[id]) || 0
      );
    }

    for (const weaponId of ALL_WEAPONS) {
      if (!Number.isFinite(
        survival.weaponCondition[weaponId]
      )) {
        const seed =
          `${game.world?.seed || "COUNTY"}:` +
          `${weaponId}:condition`;

        survival.weaponCondition[weaponId] =
          72 + hash01(seed) * 28;
      }

      survival.weaponCondition[weaponId] =
        clamp(
          survival.weaponCondition[weaponId],
          0,
          100
        );

      survival.weaponHeat[weaponId] =
        Math.max(
          0,
          Number(
            survival.weaponHeat[weaponId]
          ) || 0
        );
    }

    return survival;
  }

  function occupationFor(survival) {
    return OCCUPATIONS[
      survival?.occupation
    ] || OCCUPATIONS.unemployed;
  }

  function traitFor(survival) {
    return TRAITS[
      survival?.trait
    ] || TRAITS.balanced;
  }

  function skillLevel(game, id) {
    return ensurePlayerState(game)
      ?.skills?.[id] || 0;
  }

  function xpRequired(level) {
    return Math.round(
      55 + level * 34 + level * level * 17
    );
  }

  function gainSkill(game, id, amount) {
    const survival = ensurePlayerState(game);

    if (
      !survival ||
      !SKILLS[id] ||
      survival.skills[id] >= 10 ||
      amount <= 0
    ) {
      return;
    }

    const occupation =
      occupationFor(survival);

    const trait = traitFor(survival);

    survival.xp[id] +=
      amount *
      (occupation.xp || 1) *
      (trait.xp || 1);

    while (
      survival.skills[id] < 10 &&
      survival.xp[id] >=
        xpRequired(survival.skills[id])
    ) {
      survival.xp[id] -=
        xpRequired(survival.skills[id]);

      survival.skills[id] += 1;

      game.toast?.(
        `${SKILLS[id].name} reached level ${survival.skills[id]}.`
      );
    }
  }

  function bodyPartById(id) {
    return BODY_PARTS.find(
      part => part.id === id
    ) || BODY_PARTS[1];
  }

  function weightedBodyPart(seed) {
    const total = BODY_PARTS.reduce(
      (sum, part) => sum + part.weight,
      0
    );

    let roll = hash01(seed) * total;

    for (const part of BODY_PARTS) {
      roll -= part.weight;
      if (roll <= 0) return part;
    }

    return BODY_PARTS[1];
  }

  function currentWeaponCondition(game) {
    const id = game.player?.equipped;

    if (!ALL_WEAPONS.has(id)) return 100;

    return ensurePlayerState(game)
      .weaponCondition[id];
  }

  function addStyles() {
    if (document.getElementById("hcDeepSurvivalStyles")) {
      return;
    }

    const style = document.createElement("style");
    style.id = "hcDeepSurvivalStyles";
    style.textContent = `
      .hc-profile-picker {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 9px;
        margin: 0 0 14px;
      }

      .hc-profile-picker label {
        display: grid;
        gap: 6px;
        color: #7f8b81;
        font-size: 8px;
        font-weight: 900;
        letter-spacing: .14em;
        text-transform: uppercase;
      }

      .hc-profile-picker select {
        width: 100%;
        min-height: 42px;
        padding: 0 10px;
        color: #d9ded5;
        border: 1px solid rgba(190,210,190,.16);
        outline: none;
        background: #0b100d;
        font: 800 10px system-ui, sans-serif;
      }

      .hc-profile-description {
        grid-column: 1 / -1;
        min-height: 30px;
        margin: -1px 0 0;
        padding: 8px 10px;
        color: #778278;
        border-left: 2px solid #829375;
        background: rgba(255,255,255,.025);
        font: 9px/1.45 system-ui, sans-serif;
      }

      #hcMoodles {
        position: absolute;
        z-index: 27;
        top: 266px;
        right: 17px;
        width: min(190px, 32vw);
        display: grid;
        justify-items: end;
        gap: 5px;
        pointer-events: none;
      }

      .hc-moodle {
        --moodle: #c5ad67;
        max-width: 100%;
        display: grid;
        grid-template-columns: 27px minmax(0, 1fr);
        align-items: center;
        gap: 7px;
        padding: 5px 8px 5px 5px;
        border: 1px solid color-mix(in srgb, var(--moodle), transparent 58%);
        border-radius: 5px;
        background: rgba(6,9,7,.89);
        box-shadow: 0 4px 14px rgba(0,0,0,.34);
        animation: hcMoodleIn .18s ease-out;
      }

      .hc-moodle[data-level="3"] {
        box-shadow: 0 0 0 1px color-mix(in srgb, var(--moodle), transparent 55%), 0 5px 18px rgba(0,0,0,.42);
      }

      .hc-moodle-icon {
        width: 25px;
        height: 25px;
        display: grid;
        place-items: center;
        color: #0d110e;
        border-radius: 50%;
        background: var(--moodle);
        font: 950 8px system-ui, sans-serif;
        letter-spacing: .02em;
      }

      .hc-moodle-copy {
        min-width: 0;
        display: grid;
        gap: 1px;
      }

      .hc-moodle-copy b {
        overflow: hidden;
        color: var(--moodle);
        font: 900 8px system-ui, sans-serif;
        letter-spacing: .09em;
        text-overflow: ellipsis;
        text-transform: uppercase;
        white-space: nowrap;
      }

      .hc-moodle-copy small {
        overflow: hidden;
        color: #8d968e;
        font: 7px system-ui, sans-serif;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      @keyframes hcMoodleIn {
        from { opacity: 0; transform: translateX(10px); }
      }

      #hcConditionWidget {
        position: absolute;
        z-index: 26;
        right: 18px;
        bottom: 84px;
        width: 176px;
        padding: 9px 10px;
        border: 1px solid rgba(190,210,190,.14);
        border-radius: 5px;
        background: rgba(7,10,8,.88);
        pointer-events: none;
      }

      #hcConditionWidget header,
      #hcVehicleHud header {
        display: flex;
        justify-content: space-between;
        gap: 8px;
        color: #8c968e;
        font: 900 7px system-ui, sans-serif;
        letter-spacing: .1em;
        text-transform: uppercase;
      }

      .hc-meter {
        height: 5px;
        margin-top: 6px;
        overflow: hidden;
        background: rgba(255,255,255,.08);
      }

      .hc-meter i {
        display: block;
        width: 100%;
        height: 100%;
        background: #829774;
        transition: width .2s, background .2s;
      }

      #hcVehicleHud {
        position: absolute;
        z-index: 29;
        left: 50%;
        bottom: 83px;
        width: 250px;
        transform: translateX(-50%);
        padding: 10px 12px;
        border: 1px solid rgba(202,190,122,.28);
        border-radius: 6px;
        background: rgba(6,9,7,.93);
        box-shadow: 0 10px 28px rgba(0,0,0,.45);
        pointer-events: none;
      }

      .hc-vehicle-main {
        display: grid;
        grid-template-columns: 1fr auto;
        align-items: end;
        gap: 10px;
        margin-top: 5px;
      }

      .hc-vehicle-main strong {
        color: #e5ddb0;
        font: 950 25px/1 system-ui, sans-serif;
      }

      .hc-vehicle-main small {
        color: #747e76;
        font: 8px system-ui, sans-serif;
      }

      .hc-vehicle-bars {
        display: grid;
        gap: 5px;
        margin-top: 7px;
      }

      .hc-vehicle-bars div {
        display: grid;
        grid-template-columns: 44px 1fr 30px;
        align-items: center;
        gap: 6px;
        color: #7c867e;
        font: 800 7px system-ui, sans-serif;
      }

      #hcVehiclePrompt {
        position: absolute;
        z-index: 28;
        left: 50%;
        bottom: 132px;
        transform: translateX(-50%);
        padding: 7px 10px;
        color: #d9ddb8;
        border: 1px solid rgba(202,190,122,.3);
        border-radius: 4px;
        background: rgba(5,8,6,.9);
        font: 900 8px system-ui, sans-serif;
        letter-spacing: .1em;
        pointer-events: none;
      }

      .hc-deep-panel {
        position: absolute;
        z-index: 42;
        top: 78px;
        right: 18px;
        bottom: 18px;
        width: min(430px, calc(100vw - 36px));
        display: flex;
        flex-direction: column;
        overflow: hidden;
        border: 1px solid rgba(190,210,190,.17);
        background: linear-gradient(150deg, rgba(20,28,23,.99), rgba(7,11,8,.99));
        box-shadow: 0 25px 70px rgba(0,0,0,.62);
      }

      .hc-deep-panel > header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 17px 18px;
        border-bottom: 1px solid rgba(190,210,190,.12);
      }

      .hc-deep-panel > header p,
      .hc-deep-panel > header h2 {
        margin: 0;
      }

      .hc-deep-panel > header p {
        margin-bottom: 4px;
        color: #8ca078;
        font: 900 8px system-ui, sans-serif;
        letter-spacing: .16em;
      }

      .hc-deep-panel > header h2 {
        font: 900 23px system-ui, sans-serif;
      }

      .hc-panel-close {
        width: 35px;
        height: 35px;
        color: #a5aea6;
        border: 1px solid rgba(255,255,255,.12);
        background: rgba(255,255,255,.035);
        cursor: pointer;
      }

      .hc-panel-scroll {
        min-height: 0;
        flex: 1;
        overflow: auto;
        padding: 16px 18px 22px;
      }

      .hc-overall-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 7px;
        margin-bottom: 15px;
      }

      .hc-overall-grid article {
        display: grid;
        gap: 4px;
        padding: 9px;
        border: 1px solid rgba(255,255,255,.07);
        background: rgba(255,255,255,.025);
      }

      .hc-overall-grid span {
        color: #727e75;
        font: 800 7px system-ui, sans-serif;
        letter-spacing: .1em;
        text-transform: uppercase;
      }

      .hc-overall-grid b {
        color: #d7ddd4;
        font: 900 15px system-ui, sans-serif;
      }

      .hc-section-title {
        margin: 17px 0 8px;
        color: #99a98b;
        font: 900 8px system-ui, sans-serif;
        letter-spacing: .16em;
        text-transform: uppercase;
      }

      .hc-wound-list,
      .hc-skill-list {
        display: grid;
        gap: 7px;
      }

      .hc-wound {
        display: grid;
        grid-template-columns: 1fr auto;
        gap: 8px;
        padding: 10px;
        border-left: 3px solid #b65349;
        background: rgba(255,255,255,.035);
      }

      .hc-wound h3,
      .hc-wound p {
        margin: 0;
      }

      .hc-wound h3 {
        color: #d9ddd6;
        font: 900 10px system-ui, sans-serif;
      }

      .hc-wound p {
        margin-top: 4px;
        color: #78837b;
        font: 8px/1.4 system-ui, sans-serif;
      }

      .hc-wound-actions {
        display: grid;
        align-content: center;
        gap: 5px;
      }

      .hc-small-button,
      .hc-panel-action {
        color: #c5cec4;
        border: 1px solid rgba(190,210,190,.17);
        background: rgba(255,255,255,.045);
        font: 900 7px system-ui, sans-serif;
        letter-spacing: .08em;
        cursor: pointer;
      }

      .hc-small-button {
        min-width: 73px;
        min-height: 26px;
      }

      .hc-small-button:disabled {
        opacity: .3;
        cursor: not-allowed;
      }

      .hc-panel-action {
        width: 100%;
        min-height: 39px;
        margin-top: 9px;
      }

      .hc-skill {
        display: grid;
        grid-template-columns: 95px 1fr 28px;
        align-items: center;
        gap: 9px;
        padding: 8px 9px;
        border: 1px solid rgba(255,255,255,.065);
        background: rgba(255,255,255,.025);
      }

      .hc-skill-name {
        display: grid;
        gap: 2px;
      }

      .hc-skill-name b {
        color: #cdd4cb;
        font: 900 9px system-ui, sans-serif;
      }

      .hc-skill-name small {
        color: #667168;
        font: 7px system-ui, sans-serif;
      }

      .hc-skill-track {
        height: 6px;
        overflow: hidden;
        background: rgba(255,255,255,.07);
      }

      .hc-skill-track i {
        display: block;
        height: 100%;
        background: linear-gradient(90deg, #60775b, #a5b989);
      }

      .hc-skill-level {
        color: #d8ddb6;
        text-align: center;
        font: 950 16px system-ui, sans-serif;
      }

      .hc-profile-card,
      .hc-equipment-card {
        padding: 11px 12px;
        border: 1px solid rgba(255,255,255,.075);
        background: rgba(255,255,255,.025);
      }

      .hc-profile-card b,
      .hc-equipment-card b {
        color: #d5dbd2;
        font: 900 10px system-ui, sans-serif;
      }

      .hc-profile-card p,
      .hc-equipment-card p {
        margin: 5px 0 0;
        color: #778279;
        font: 8px/1.45 system-ui, sans-serif;
      }

      .hc-hotbar-condition {
        position: absolute;
        left: 5px;
        right: 5px;
        bottom: 3px;
        height: 2px;
        overflow: hidden;
        background: rgba(0,0,0,.55);
      }

      .hc-hotbar-condition i {
        display: block;
        height: 100%;
        background: #87a276;
      }

      .hc-item-condition {
        grid-column: 1 / -1;
        height: 3px;
        margin-top: 4px;
        overflow: hidden;
        background: rgba(255,255,255,.07);
      }

      .hc-item-condition i {
        display: block;
        height: 100%;
        background: #839b73;
      }

      .hc-action-progress {
        position: absolute;
        z-index: 30;
        left: 50%;
        bottom: 141px;
        width: 210px;
        transform: translateX(-50%);
        padding: 8px 9px;
        color: #b9c2b8;
        border: 1px solid rgba(190,210,190,.17);
        background: rgba(6,9,7,.91);
        font: 900 8px system-ui, sans-serif;
        letter-spacing: .1em;
        text-align: center;
      }

      .hc-action-progress .hc-meter {
        margin-top: 7px;
      }

      @media (max-width: 700px) {
        .hc-profile-picker { grid-template-columns: 1fr; }
        .hc-profile-description { grid-column: 1; }
        #hcMoodles { top: 118px; right: 8px; width: 137px; }
        .hc-moodle { grid-template-columns: 22px minmax(0,1fr); gap: 5px; padding: 4px; }
        .hc-moodle-icon { width: 21px; height: 21px; font-size: 7px; }
        .hc-moodle-copy small { display: none; }
        #hcConditionWidget { right: 8px; bottom: 169px; width: 142px; }
        #hcVehicleHud { bottom: 164px; width: 225px; }
        #hcVehiclePrompt { bottom: 218px; }
        .hc-deep-panel { inset: 64px 7px 94px; width: auto; }
        .hc-overall-grid { grid-template-columns: 1fr 1fr; }
        .hc-skill { grid-template-columns: 80px 1fr 24px; }
      }

      /* Clean survival HUD and unified survivor ledger. */
      #game .hud-top {
        height: 58px;
        padding: 0 12px;
        border-bottom: 1px solid rgba(188,207,179,.12);
        background: linear-gradient(180deg, rgba(3,7,5,.95), rgba(5,9,7,.72));
        box-shadow: 0 10px 28px rgba(0,0,0,.2);
        backdrop-filter: blur(8px);
      }

      #game .day-readout { gap: 8px; }
      #game .day-readout strong {
        color: #edf1e8;
        font-size: 18px;
        font-variant-numeric: tabular-nums;
      }

      #game .day-readout span,
      #game .location-readout > span { color: #aebe94; }
      #game .location-readout { gap: 1px; }
      #game .location-readout > span { font-size: 9px; }
      #game .location-readout small { font-size: 7px; }
      #game .hud-actions { gap: 6px; }
      #game .hud-actions button {
        min-height: 34px;
        padding: 0 10px;
        border: 1px solid rgba(188,207,179,.15);
        border-radius: 5px;
        background: rgba(14,21,16,.72);
        box-shadow: none;
      }

      #game .hud-actions button:hover {
        color: #e4eadf;
        border-color: rgba(174,194,148,.42);
        background: rgba(42,54,39,.82);
      }

      #game .vitals {
        top: 70px;
        left: 12px;
        width: 196px;
        gap: 6px;
        padding: 10px 11px;
        border: 1px solid rgba(188,207,179,.13);
        border-radius: 7px;
        background: rgba(5,9,7,.76);
        box-shadow: 0 10px 25px rgba(0,0,0,.24);
        backdrop-filter: blur(7px);
      }

      #game .vital {
        grid-template-columns: 51px 1fr 24px;
        gap: 7px;
      }

      #game .vital span,
      #game .vital b { font-size: 7px; }
      #game .vital > div { height: 5px; }

      #game .hc-hud-state {
        gap: 8px;
        margin-top: 2px;
        padding-top: 7px;
      }

      #game .hc-hud-state > div {
        padding: 2px 0;
        border: 0;
        background: transparent;
      }

      #game .hc-hud-state span { margin-bottom: 3px; }
      #game .hc-hud-state b { font-size: 7px; }

      #game .minimap-wrap {
        top: 70px;
        right: 12px;
        gap: 4px;
        padding: 5px 5px 6px;
        border-color: rgba(188,207,179,.12);
        border-radius: 7px;
        background: rgba(5,9,7,.72);
        box-shadow: 0 10px 25px rgba(0,0,0,.22);
        backdrop-filter: blur(7px);
      }

      #game #minimap { width: 112px; height: 112px; }
      #game .minimap-wrap span { font-size: 6px; }

      #game .objective {
        top: 70px;
        right: 142px;
        width: 172px;
        padding: 8px 10px;
        border: 1px solid rgba(198,171,103,.17);
        border-left: 2px solid #b69f64;
        border-radius: 4px;
        background: rgba(5,9,7,.7);
        backdrop-filter: blur(7px);
      }

      #game .objective p { margin-top: 3px; font-size: 8px; }

      #hcMoodles {
        top: 212px;
        right: 12px;
        width: 34px;
        justify-items: stretch;
        gap: 6px;
        pointer-events: none;
      }

      .hc-moodle {
        position: relative;
        width: 34px;
        height: 34px;
        display: grid;
        grid-template-columns: 1fr;
        place-items: center;
        gap: 0;
        padding: 4px;
        border-radius: 8px;
        background: rgba(5,9,7,.9);
        box-shadow: 0 6px 16px rgba(0,0,0,.28);
        pointer-events: auto;
      }

      .hc-moodle-icon {
        width: 24px;
        height: 24px;
        font-size: 7px;
      }

      .hc-moodle-copy {
        position: absolute;
        top: 50%;
        right: 42px;
        width: 164px;
        gap: 2px;
        padding: 7px 9px;
        opacity: 0;
        border: 1px solid rgba(188,207,179,.14);
        border-radius: 5px;
        background: rgba(5,9,7,.96);
        box-shadow: 0 8px 22px rgba(0,0,0,.36);
        transform: translate(5px,-50%);
        transition: opacity .14s, transform .14s;
        pointer-events: none;
      }

      .hc-moodle:hover .hc-moodle-copy {
        opacity: 1;
        transform: translate(0,-50%);
      }

      #hcConditionWidget {
        right: 12px;
        bottom: 76px;
        width: 154px;
        padding: 7px 9px;
        border-radius: 5px;
        background: rgba(5,9,7,.82);
      }

      #hcVehicleHud {
        bottom: 75px;
        width: 268px;
        padding: 8px 10px;
        border-radius: 7px;
      }

      .hc-vehicle-main strong { font-size: 21px; }
      #hcVehiclePrompt { bottom: 116px; }
      #game .interact-prompt {
        bottom: 94px;
        padding: 7px 11px;
        border-radius: 5px;
        background: rgba(5,9,7,.86);
        backdrop-filter: blur(6px);
      }

      #game .toast-stack { top: 68px; }
      #game .toast {
        padding: 8px 12px;
        border-radius: 5px;
        background: rgba(5,9,7,.88);
        box-shadow: 0 8px 22px rgba(0,0,0,.25);
        backdrop-filter: blur(7px);
      }

      #game .hotbar {
        gap: 5px;
        padding: 5px;
        border-radius: 8px;
        background: rgba(5,9,7,.68);
      }

      #game .hot-slot {
        width: 50px;
        height: 50px;
        border-radius: 5px;
      }

      #inventoryPanel {
        top: 66px;
        right: 12px;
        bottom: 12px;
        width: min(590px, calc(100vw - 24px));
        padding: 0 0 18px;
        overflow-x: hidden;
        border: 1px solid rgba(188,207,179,.18);
        border-radius: 10px;
        background:
          radial-gradient(circle at 100% 0, rgba(128,151,108,.1), transparent 34%),
          linear-gradient(180deg, rgba(16,24,19,.985), rgba(6,11,8,.99));
        box-shadow: -18px 18px 60px rgba(0,0,0,.52);
      }

      #inventoryPanel > header {
        position: sticky;
        z-index: 3;
        top: 0;
        align-items: center;
        margin: 0;
        padding: 16px 18px 13px;
        border-bottom: 1px solid rgba(188,207,179,.1);
        background: rgba(12,19,15,.96);
        backdrop-filter: blur(9px);
      }

      #inventoryPanel > header .label { color: #82936f; }
      #inventoryPanel > header h2 {
        color: #edf1e8;
        font-size: 22px;
      }

      #inventoryPanel > .hc-pack-tabs.hc-legacy-tabs { display: none !important; }

      .hc-survival-tabs {
        position: sticky;
        z-index: 3;
        top: 65px;
        display: grid;
        grid-template-columns: repeat(5, minmax(0,1fr));
        gap: 4px;
        margin: 0 0 14px;
        padding: 9px 18px;
        border-bottom: 1px solid rgba(188,207,179,.1);
        background: rgba(9,15,11,.95);
        backdrop-filter: blur(9px);
      }

      .hc-survival-tabs button {
        position: relative;
        min-width: 0;
        min-height: 34px;
        padding: 5px 4px;
        overflow: hidden;
        color: #748078;
        border: 1px solid transparent;
        border-radius: 5px;
        background: transparent;
        font: 900 7px/1 system-ui, sans-serif;
        letter-spacing: .09em;
        text-overflow: ellipsis;
        white-space: nowrap;
        cursor: pointer;
      }

      .hc-survival-tabs button:hover {
        color: #bfc8bc;
        background: rgba(255,255,255,.035);
      }

      .hc-survival-tabs button.active {
        color: #edf1e8;
        border-color: rgba(172,190,143,.28);
        background: #2b3829;
        box-shadow: inset 0 -2px #a4b781;
      }

      .hc-survival-tabs button[data-alert="true"]::after {
        content: "";
        position: absolute;
        top: 5px;
        right: 5px;
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background: #d6675e;
        box-shadow: 0 0 7px rgba(214,103,94,.7);
      }

      #inventoryPanel > .weight {
        margin: 0 18px 12px;
        padding: 9px 10px;
        border: 1px solid rgba(188,207,179,.1);
        border-radius: 6px;
        background: rgba(0,0,0,.16);
      }

      #inventoryPanel > .hc-loadout-card { margin: 0 18px 12px; }
      #inventoryPanel > #hcInventoryTools { margin: 0 18px 12px; }
      #inventoryPanel > #inventoryList {
        margin: 0 18px;
        grid-template-columns: repeat(2,minmax(0,1fr));
      }

      #inventoryPanel > #hcInventoryFilterEmpty { margin: 0 18px; }
      #inventoryPanel > footer { margin: 14px 18px 0; }

      #inventoryPanel[data-hc-tab]:not([data-hc-tab="items"]) > .weight,
      #inventoryPanel[data-hc-tab]:not([data-hc-tab="items"]) > .hc-loadout-card,
      #inventoryPanel[data-hc-tab]:not([data-hc-tab="items"]) > #hcInventoryTools,
      #inventoryPanel[data-hc-tab]:not([data-hc-tab="items"]) > #inventoryList,
      #inventoryPanel[data-hc-tab]:not([data-hc-tab="items"]) > #hcInventoryFilterEmpty,
      #inventoryPanel[data-hc-tab]:not([data-hc-tab="items"]) > footer {
        display: none !important;
      }

      .hc-inventory-tab-page {
        display: none;
        padding: 0 18px 24px;
      }

      #inventoryPanel[data-hc-tab="health"] > #hcHealthPanel,
      #inventoryPanel[data-hc-tab="skills"] > #hcSkillsPanel,
      #inventoryPanel[data-hc-tab="vehicle"] > #hcVehiclePanel {
        display: block;
      }

      #inventoryPanel:not([data-hc-tab="appearance"]) > #hcAppearanceCustomizer {
        display: none !important;
      }

      #inventoryPanel[data-hc-tab="appearance"] > #hcAppearanceCustomizer {
        display: block !important;
      }

      .hc-tab-intro {
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        gap: 12px;
        margin: 2px 0 14px;
        padding-bottom: 12px;
        border-bottom: 1px solid rgba(188,207,179,.1);
      }

      .hc-tab-intro p,
      .hc-tab-intro h3 { margin: 0; }
      .hc-tab-intro p {
        margin-bottom: 4px;
        color: #82936f;
        font: 900 7px system-ui, sans-serif;
        letter-spacing: .16em;
      }

      .hc-tab-intro h3 {
        color: #dce2d8;
        font: 900 17px system-ui, sans-serif;
      }

      .hc-tab-key {
        color: #6f7b73;
        font: 800 7px system-ui, sans-serif;
        letter-spacing: .1em;
      }

      .hc-vehicle-sheet {
        display: grid;
        gap: 10px;
      }

      .hc-vehicle-summary-card {
        display: grid;
        grid-template-columns: minmax(0,1fr) auto;
        align-items: center;
        gap: 14px;
        padding: 15px;
        border: 1px solid rgba(188,207,179,.12);
        border-radius: 8px;
        background: linear-gradient(135deg, rgba(36,48,38,.64), rgba(5,9,7,.4));
      }

      .hc-vehicle-summary-card span {
        display: block;
        margin-bottom: 5px;
        color: #819070;
        font: 900 7px system-ui, sans-serif;
        letter-spacing: .15em;
      }

      .hc-vehicle-summary-card h3 {
        margin: 0;
        color: #e3e8df;
        font: 900 20px system-ui, sans-serif;
      }

      .hc-vehicle-summary-card p {
        margin: 5px 0 0;
        color: #78857c;
        font: 8px/1.45 system-ui, sans-serif;
      }

      .hc-vehicle-speed-tile {
        min-width: 76px;
        padding-left: 14px;
        text-align: right;
        border-left: 1px solid rgba(188,207,179,.1);
      }

      .hc-vehicle-speed-tile strong {
        display: block;
        color: #e4dcae;
        font: 950 31px/1 system-ui, sans-serif;
        font-variant-numeric: tabular-nums;
      }

      .hc-vehicle-speed-tile small {
        color: #707b73;
        font: 800 7px system-ui, sans-serif;
        letter-spacing: .14em;
      }

      .hc-vehicle-tab-meters {
        display: grid;
        gap: 7px;
        padding: 12px;
        border: 1px solid rgba(188,207,179,.1);
        border-radius: 7px;
        background: rgba(0,0,0,.16);
      }

      .hc-vehicle-tab-meter {
        display: grid;
        grid-template-columns: 62px 1fr 36px;
        align-items: center;
        gap: 8px;
        color: #77837b;
        font: 900 7px system-ui, sans-serif;
        letter-spacing: .1em;
      }

      .hc-vehicle-tab-meter > b {
        color: #b9c3b6;
        text-align: right;
        font-variant-numeric: tabular-nums;
      }

      .hc-vehicle-note {
        padding: 10px 11px;
        color: #78847c;
        border-left: 2px solid #718465;
        background: rgba(255,255,255,.025);
        font: 8px/1.5 system-ui, sans-serif;
      }

      @media (max-width: 900px) {
        #game .hud-top { height: 58px; }
        #game .vitals { top: 68px; left: 8px; width: 184px; }
        #game .objective { top: 68px; right: 8px; width: 156px; }
        #inventoryPanel { top: 64px; right: 7px; bottom: 7px; width: min(590px,calc(100vw - 14px)); }
      }

      @media (max-width: 700px) {
        #game .hud-top { padding: 0 8px; }
        #game .hud-actions button { padding: 0 8px; }
        #game .vitals { width: 176px; padding: 9px; }
        #game .objective { display: none; }
        #hcMoodles { top: 68px; right: 8px; width: 31px; }
        .hc-moodle { width: 31px; height: 31px; padding: 3px; }
        .hc-moodle-copy { display: none; }
        #hcConditionWidget { right: 8px; bottom: 160px; width: 138px; }
        #hcVehicleHud { bottom: 155px; width: 224px; }
        #hcVehiclePrompt { bottom: 211px; }
        #inventoryPanel { bottom: calc(88px + var(--safe-bottom)); }
        .hc-survival-tabs {
          top: 64px;
          grid-template-columns: repeat(5, minmax(68px,1fr));
          overflow-x: auto;
          padding: 8px 12px;
        }
        #inventoryPanel > .weight,
        #inventoryPanel > .hc-loadout-card,
        #inventoryPanel > #hcInventoryTools,
        #inventoryPanel > #inventoryList,
        #inventoryPanel > #hcInventoryFilterEmpty,
        #inventoryPanel > footer { margin-left: 12px; margin-right: 12px; }
        #inventoryPanel > #inventoryList { grid-template-columns: 1fr; }
        .hc-inventory-tab-page { padding-left: 12px; padding-right: 12px; }
        .hc-overall-grid { grid-template-columns: 1fr 1fr; }
        .hc-vehicle-summary-card { padding: 12px; }
      }

      @media (max-width: 430px) {
        #game .day-readout small,
        #game .hud-actions kbd { display: none; }
        #game .hud-actions button { font-size: 7px; }
        #game .vitals { width: 168px; }
        .hc-tab-key { display: none; }
        .hc-skill { grid-template-columns: 75px 1fr 24px; }
      }
    `;

    document.head.append(style);
  }

  function makeButton(id, label, title) {
    const button = document.createElement("button");
    button.id = id;
    button.type = "button";
    button.title = title;
    button.textContent = label;
    return button;
  }

  function createProfilePicker() {
    const card = document.querySelector(".start-card");

    if (!card || document.getElementById("hcProfilePicker")) {
      return;
    }

    const picker = document.createElement("div");
    picker.id = "hcProfilePicker";
    picker.className = "hc-profile-picker";

    const occupationLabel = document.createElement("label");
    occupationLabel.textContent = "Occupation";

    const occupation = document.createElement("select");
    occupation.id = "hcOccupation";

    for (const [id, info] of Object.entries(OCCUPATIONS)) {
      const option = document.createElement("option");
      option.value = id;
      option.textContent = info.name;
      occupation.append(option);
    }

    occupationLabel.append(occupation);

    const traitLabel = document.createElement("label");
    traitLabel.textContent = "Starting trait";

    const trait = document.createElement("select");
    trait.id = "hcTrait";

    for (const [id, info] of Object.entries(TRAITS)) {
      const option = document.createElement("option");
      option.value = id;
      option.textContent = info.name;
      trait.append(option);
    }

    traitLabel.append(trait);

    const description = document.createElement("p");
    description.className = "hc-profile-description";

    picker.append(
      occupationLabel,
      traitLabel,
      description
    );

    const profile = selectedProfile();
    occupation.value = profile.occupation;
    trait.value = profile.trait;

    const update = () => {
      const selection = {
        occupation: occupation.value,
        trait: trait.value
      };

      saveSelectedProfile(selection);

      description.textContent =
        `${OCCUPATIONS[selection.occupation].description} ` +
        `${TRAITS[selection.trait].description}`;
    };

    occupation.addEventListener("change", update);
    trait.addEventListener("change", update);
    update();

    const newGame = document.getElementById("newGameBtn");
    card.insertBefore(picker, newGame);

    const version = card.querySelector(".version");
    if (version) version.textContent = "BUILD 4.1";

    const featureGrid = card.querySelector(".feature-grid");

    if (featureGrid) {
      featureGrid.innerHTML = `
        <div><b>DEEP INJURIES</b><span>Wounds, bleeding & treatment</span></div>
        <div><b>11 SKILLS</b><span>Practice-driven progression</span></div>
        <div><b>VEHICLES</b><span>Fuel, damage & horde-scale noise</span></div>
        <div><b>LIVING COUNTY</b><span>Memory, sound & persistent survival</span></div>
      `;
    }
  }

  function createGameUi(game) {
    const root = document.getElementById("game");

    if (!root) return;

    const actions = root.querySelector(".hud-actions");

    for (const id of ["hcHealthBtn", "hcSkillsBtn", "hcVehicleBtn"]) {
      document.getElementById(id)?.remove();
    }

    if (actions) {
      const inventoryButton = document.getElementById("inventoryBtn");
      const label = [...(inventoryButton?.childNodes || [])].find(
        node => node.nodeType === Node.TEXT_NODE
      );

      if (label) label.textContent = "SURVIVOR ";
      if (inventoryButton) {
        inventoryButton.title = "Survivor inventory and condition (Tab or I)";
      }
    }

    if (!document.getElementById("hcMoodles")) {
      const moodles = document.createElement("div");
      moodles.id = "hcMoodles";
      root.append(moodles);
    }

    if (!document.getElementById("hcConditionWidget")) {
      const widget = document.createElement("div");
      widget.id = "hcConditionWidget";
      widget.className = "hidden";
      widget.innerHTML = `
        <header><span id="hcConditionName">WEAPON</span><b id="hcConditionValue">100%</b></header>
        <div class="hc-meter"><i id="hcConditionBar"></i></div>
      `;
      root.append(widget);
    }

    if (!document.getElementById("hcVehicleHud")) {
      const hud = document.createElement("div");
      hud.id = "hcVehicleHud";
      hud.className = "hidden";
      hud.innerHTML = `
        <header><span id="hcVehicleName">SEDAN</span><b>V TO EXIT</b></header>
        <div class="hc-vehicle-main"><strong id="hcVehicleSpeed">0</strong><small>MPH</small></div>
        <div class="hc-vehicle-bars">
          <div><span>FUEL</span><div class="hc-meter"><i id="hcVehicleFuelBar"></i></div><b id="hcVehicleFuel">0%</b></div>
          <div><span>CONDITION</span><div class="hc-meter"><i id="hcVehicleConditionBar"></i></div><b id="hcVehicleCondition">0%</b></div>
        </div>
      `;
      root.append(hud);
    }

    if (!document.getElementById("hcVehiclePrompt")) {
      const prompt = document.createElement("div");
      prompt.id = "hcVehiclePrompt";
      prompt.className = "hidden";
      prompt.textContent = "V  ENTER VEHICLE";
      root.append(prompt);
    }

    if (!document.getElementById("hcActionProgress")) {
      const progress = document.createElement("div");
      progress.id = "hcActionProgress";
      progress.className = "hc-action-progress hidden";
      progress.innerHTML = `
        <span id="hcActionLabel">ACTION</span>
        <div class="hc-meter"><i id="hcActionBar"></i></div>
      `;
      root.append(progress);
    }

    const inventoryPanel = document.getElementById("inventoryPanel");

    if (inventoryPanel) {
      createHealthPanel(inventoryPanel, game);
      createSkillsPanel(inventoryPanel, game);
      createVehiclePanel(inventoryPanel, game);
      createInventoryTabs(inventoryPanel, game);
    }

    const touchActions = root.querySelector(
      "#mobileControls .touch-actions"
    );

    if (
      touchActions &&
      !document.getElementById("hcMobileVehicle")
    ) {
      const vehicle = makeButton(
        "hcMobileVehicle",
        "VEHICLE",
        "Enter or exit vehicle"
      );
      vehicle.className = "touch-small";
      vehicle.addEventListener("pointerdown", event => {
        event.preventDefault();
        toggleVehicle(game);
      });
      touchActions.insertBefore(
        vehicle,
        touchActions.lastElementChild
      );
    }
  }

  function createHealthPanel(root, game) {
    if (document.getElementById("hcHealthPanel")) return;

    const panel = document.createElement("section");
    panel.id = "hcHealthPanel";
    panel.className = "hc-inventory-tab-page";
    panel.dataset.hcTabPage = "health";
    panel.innerHTML = `
      <div class="hc-tab-intro">
        <div><p>BODY CONDITION</p><h3>Health & treatment</h3></div>
        <span class="hc-tab-key">QUICK KEY · H</span>
      </div>
      <div>
        <div id="hcOverallCondition" class="hc-overall-grid"></div>
        <button id="hcRestBtn" class="hc-panel-action" type="button">REST AND CATCH YOUR BREATH</button>
        <p class="hc-section-title">Wounds</p>
        <div id="hcWoundList" class="hc-wound-list"></div>
        <p class="hc-section-title">Treatment notes</p>
        <div class="hc-profile-card">
          <b>Survival medicine</b>
          <p>Bandages stop bleeding. Disinfectant lowers wound-infection risk. Painkillers suppress pain temporarily. Dirty bandages eventually become dangerous.</p>
        </div>
      </div>
    `;

    panel.querySelector("#hcRestBtn")
      .addEventListener("click", () =>
        toggleRest(game)
      );

    root.append(panel);
  }

  function createSkillsPanel(root, game) {
    if (document.getElementById("hcSkillsPanel")) return;

    const panel = document.createElement("section");
    panel.id = "hcSkillsPanel";
    panel.className = "hc-inventory-tab-page";
    panel.dataset.hcTabPage = "skills";
    panel.innerHTML = `
      <div class="hc-tab-intro">
        <div><p>SURVIVOR DEVELOPMENT</p><h3>Skills & equipment</h3></div>
        <span class="hc-tab-key">QUICK KEY · K</span>
      </div>
      <div>
        <div id="hcProfileCard" class="hc-profile-card"></div>
        <p class="hc-section-title">Practice-based skills</p>
        <div id="hcSkillList" class="hc-skill-list"></div>
        <p class="hc-section-title">Equipped weapon</p>
        <div id="hcEquipmentCard" class="hc-equipment-card"></div>
        <button id="hcRepairBtn" class="hc-panel-action" type="button">REPAIR / CLEAN EQUIPPED WEAPON</button>
        <p class="hc-section-title">Field controls</p>
        <div class="hc-profile-card">
          <b>H Health · K Skills · V Enter/exit · F Forage · Q Shout</b>
          <p>Shouting carries across several blocks. Foraging only works outdoors while the area is reasonably clear.</p>
        </div>
      </div>
    `;

    panel.querySelector("#hcRepairBtn")
      .addEventListener("click", () =>
        repairEquippedWeapon(game)
      );

    root.append(panel);
  }

  function createVehiclePanel(root, game) {
    if (document.getElementById("hcVehiclePanel")) return;

    const panel = document.createElement("section");
    panel.id = "hcVehiclePanel";
    panel.className = "hc-inventory-tab-page";
    panel.dataset.hcTabPage = "vehicle";
    panel.innerHTML = `
      <div class="hc-tab-intro">
        <div><p>TRANSPORT</p><h3>Vehicle condition</h3></div>
        <span class="hc-tab-key">ENTER / EXIT · V</span>
      </div>
      <div class="hc-vehicle-sheet">
        <article id="hcVehicleSummaryCard" class="hc-vehicle-summary-card">
          <div>
            <span id="hcVehicleTabState">ON FOOT</span>
            <h3 id="hcVehicleTabName">No vehicle selected</h3>
            <p id="hcVehicleTabDetail">Move close to a street vehicle to inspect it.</p>
          </div>
          <div class="hc-vehicle-speed-tile">
            <strong id="hcVehicleTabSpeed">0</strong>
            <small>MPH</small>
          </div>
        </article>
        <div class="hc-vehicle-tab-meters">
          <div class="hc-vehicle-tab-meter"><span>FUEL</span><div class="hc-meter"><i id="hcVehicleTabFuelBar"></i></div><b id="hcVehicleTabFuel">—</b></div>
          <div class="hc-vehicle-tab-meter"><span>ENGINE</span><div class="hc-meter"><i id="hcVehicleTabConditionBar"></i></div><b id="hcVehicleTabCondition">—</b></div>
          <div class="hc-vehicle-tab-meter"><span>BATTERY</span><div class="hc-meter"><i id="hcVehicleTabBatteryBar"></i></div><b id="hcVehicleTabBattery">—</b></div>
        </div>
        <button id="hcVehicleTabAction" class="hc-panel-action" type="button" disabled>NO VEHICLE IN RANGE</button>
        <div class="hc-vehicle-note">Vehicles protect you from direct attacks, but crashes damage the engine and loud engines pull hordes from several blocks away. Slow down before exiting.</div>
      </div>
    `;

    panel.querySelector("#hcVehicleTabAction")
      .addEventListener("click", () => {
        toggleVehicle(game);
        renderVehiclePanel(game);
      });

    root.append(panel);
  }

  function wireLegacyAppearanceTabs(panel, game) {
    const legacy = [...panel.children].find(
      child =>
        child.classList?.contains("hc-pack-tabs") &&
        !child.classList.contains("hc-survival-tabs")
    );

    if (!legacy) return null;

    legacy.classList.add("hc-legacy-tabs");
    const [gear, appearance] = legacy.querySelectorAll("button");

    if (!gear || !appearance) return null;

    if (!legacy.dataset.hcUnifiedWired) {
      legacy.dataset.hcUnifiedWired = "true";

      gear.addEventListener("click", () => {
        if (
          !state.syncingAppearanceTab &&
          panel.dataset.hcTab === "appearance"
        ) {
          selectInventoryTab(game, "items");
        }
      });

      appearance.addEventListener("click", () => {
        if (!state.syncingAppearanceTab) {
          selectInventoryTab(game, "appearance");
        }
      });
    }

    state.legacyAppearanceTabs = { panel, gear, appearance };
    return state.legacyAppearanceTabs;
  }

  function createInventoryTabs(panel, game) {
    wireLegacyAppearanceTabs(panel, game);

    const header = panel.querySelector(":scope > header");
    const heading = header?.querySelector("h2");
    const label = header?.querySelector(".label");

    if (heading) heading.textContent = "Survivor";
    if (label) label.textContent = "FIELD LEDGER";

    if (!document.getElementById("hcSurvivalTabs")) {
      const tabs = document.createElement("nav");
      tabs.id = "hcSurvivalTabs";
      tabs.className = "hc-survival-tabs";
      tabs.setAttribute("aria-label", "Survivor panel sections");
      tabs.innerHTML = `
        <button type="button" data-hc-tab="items">PACK</button>
        <button type="button" data-hc-tab="health">HEALTH</button>
        <button type="button" data-hc-tab="skills">SKILLS</button>
        <button type="button" data-hc-tab="vehicle">VEHICLE</button>
        <button type="button" data-hc-tab="appearance">LOOK</button>
      `;

      for (const button of tabs.querySelectorAll("button")) {
        button.addEventListener("click", () =>
          selectInventoryTab(game, button.dataset.hcTab)
        );
      }

      header?.after(tabs);
    }

    panel.dataset.hcTab ||= state.inventoryTab;
    selectInventoryTab(game, panel.dataset.hcTab, false);
    game.__hcOpenSurvivorTab = tab => openInventoryTab(game, tab, false);
  }

  function selectInventoryTab(game, tab, render = true) {
    const allowed = new Set([
      "items",
      "health",
      "skills",
      "vehicle",
      "appearance"
    ]);
    const selected = allowed.has(tab) ? tab : "items";
    const panel = document.getElementById("inventoryPanel");

    if (!panel) return;

    const legacy = wireLegacyAppearanceTabs(panel, game);
    state.inventoryTab = selected;
    state.customPanel = ["health", "skills"].includes(selected)
      ? selected
      : null;
    panel.dataset.hcTab = selected;

    if (legacy) {
      state.syncingAppearanceTab = true;
      try {
        (selected === "appearance"
          ? legacy.appearance
          : legacy.gear).click();
      } finally {
        state.syncingAppearanceTab = false;
      }
    } else {
      panel.classList.toggle(
        "hc-show-appearance",
        selected === "appearance"
      );
    }

    for (const button of panel.querySelectorAll(
      "#hcSurvivalTabs [data-hc-tab]"
    )) {
      const active = button.dataset.hcTab === selected;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    }

    if (!render) return;

    if (selected === "items") {
      game.renderInventory?.();
    } else if (selected === "health") {
      renderHealthPanel(game);
    } else if (selected === "skills") {
      renderSkillsPanel(game);
    } else if (selected === "vehicle") {
      renderVehiclePanel(game);
    }
  }

  function openInventoryTab(game, tab, toggleSame = true) {
    if (!game?.player || game.mode !== "playing") return;

    createGameUi(game);

    if (
      toggleSame &&
      game.panelOpen === "inventoryPanel" &&
      state.inventoryTab === tab
    ) {
      game.closePanel?.("inventoryPanel");
      state.customPanel = null;
      return;
    }

    if (game.panelOpen !== "inventoryPanel") {
      game.openPanel?.("inventoryPanel");
    }

    selectInventoryTab(game, tab);
  }

  function toggleCustomPanel(game, id) {
    const tab = id === "hcHealthPanel" ? "health" : "skills";
    openInventoryTab(game, tab, true);
  }

  function closeCustomPanel(game) {
    if (
      game &&
      game.panelOpen === "inventoryPanel" &&
      ["health", "skills"].includes(state.inventoryTab)
    ) {
      game.closePanel?.("inventoryPanel");
    }

    state.customPanel = null;
  }

  function overallConditionText(value, reverse = false) {
    const amount = reverse ? 100 - value : value;

    if (amount >= 80) return "Severe";
    if (amount >= 55) return "High";
    if (amount >= 30) return "Moderate";
    if (amount >= 10) return "Minor";
    return "Clear";
  }

  function renderHealthPanel(game) {
    const survival = ensurePlayerState(game);
    const overall = document.getElementById("hcOverallCondition");
    const list = document.getElementById("hcWoundList");

    if (!survival || !overall || !list) return;

    overall.innerHTML = `
      <article><span>Health</span><b>${Math.round(game.player.health)}%</b></article>
      <article><span>Pain</span><b>${Math.round(survival.pain)}%</b></article>
      <article><span>Fatigue</span><b>${Math.round(survival.fatigue)}%</b></article>
      <article><span>Panic</span><b>${Math.round(survival.panic)}%</b></article>
    `;

    list.replaceChildren();

    if (survival.wounds.length === 0) {
      const empty = document.createElement("div");
      empty.className = "hc-profile-card";
      empty.innerHTML = "<b>No open wounds</b><p>Your survivor has no wounds requiring treatment.</p>";
      list.append(empty);
    }

    const wounds = [...survival.wounds].sort(
      (a, b) => b.severity - a.severity
    );

    for (const wound of wounds) {
      const row = document.createElement("article");
      row.className = "hc-wound";

      const status = [
        wound.bandaged
          ? wound.dirtyBandage
            ? "dirty bandage"
            : "bandaged"
          : wound.bleed > 0.1
            ? "bleeding"
            : "uncovered",
        wound.disinfected ? "disinfected" : null,
        wound.infected ? "wound infection" : null
      ].filter(Boolean).join(" · ");

      const copy = document.createElement("div");
      copy.innerHTML = `
        <h3>${bodyPartById(wound.part).name} — ${titleCase(wound.type)}</h3>
        <p>${status}. Severity ${Math.round(wound.severity * 100)}% · healing ${Math.round(wound.healing * 100)}%</p>
      `;

      const actions = document.createElement("div");
      actions.className = "hc-wound-actions";

      const bandage = document.createElement("button");
      bandage.className = "hc-small-button";
      bandage.type = "button";
      bandage.textContent = wound.bandaged ? "CHANGE" : "BANDAGE";
      bandage.disabled = game.itemCount?.("bandage") <= 0;
      bandage.addEventListener("click", () =>
        treatWound(game, wound.id, "bandage")
      );

      const disinfect = document.createElement("button");
      disinfect.className = "hc-small-button";
      disinfect.type = "button";
      disinfect.textContent = "DISINFECT";
      disinfect.disabled =
        wound.disinfected ||
        game.itemCount?.("disinfectant") <= 0;
      disinfect.addEventListener("click", () =>
        treatWound(game, wound.id, "disinfectant")
      );

      actions.append(bandage, disinfect);
      row.append(copy, actions);
      list.append(row);
    }

    const rest = document.getElementById("hcRestBtn");
    if (rest) {
      rest.textContent = survival.resting
        ? "STOP RESTING"
        : "REST AND CATCH YOUR BREATH";
    }
  }

  function renderSkillsPanel(game) {
    const survival = ensurePlayerState(game);
    const profile = document.getElementById("hcProfileCard");
    const list = document.getElementById("hcSkillList");
    const equipment = document.getElementById("hcEquipmentCard");
    const repair = document.getElementById("hcRepairBtn");

    if (!survival || !profile || !list || !equipment) return;

    const occupation = occupationFor(survival);
    const trait = traitFor(survival);

    profile.innerHTML = `
      <b>${occupation.name} · ${trait.name}</b>
      <p>${occupation.description} ${trait.description}</p>
    `;

    list.replaceChildren();

    for (const [id, skill] of Object.entries(SKILLS)) {
      const level = survival.skills[id];
      const needed = xpRequired(level);
      const progress = level >= 10
        ? 100
        : clamp(survival.xp[id] / needed * 100, 0, 100);

      const row = document.createElement("article");
      row.className = "hc-skill";
      row.title = skill.description;
      row.innerHTML = `
        <div class="hc-skill-name"><b>${skill.name}</b><small>${level >= 10 ? "MASTERED" : `${Math.floor(survival.xp[id])}/${needed} XP`}</small></div>
        <div class="hc-skill-track"><i style="width:${progress}%"></i></div>
        <b class="hc-skill-level">${level}</b>
      `;
      list.append(row);
    }

    const weaponId = game.player.equipped;

    if (!ALL_WEAPONS.has(weaponId)) {
      equipment.innerHTML = "<b>Bare hands</b><p>Equip a weapon to inspect and maintain it.</p>";
      if (repair) repair.disabled = true;
    } else {
      const condition = Math.round(
        survival.weaponCondition[weaponId]
      );
      const jam = survival.jams[weaponId];

      equipment.innerHTML = `
        <b>${WEAPON_NAMES[weaponId] || titleCase(weaponId)} — ${condition}%</b>
        <p>${jam ? "JAMMED — press R to clear it. " : ""}${FIREARMS.has(weaponId) ? "Cleaning requires 1 rag and 1 scrap." : "Repairing requires suitable scrap or wood material."}</p>
        <div class="hc-meter"><i style="width:${condition}%"></i></div>
      `;

      if (repair) {
        repair.disabled = condition >= 99;
      }
    }
  }

  function setVehicleTabMeter(name, value, color) {
    const safeValue = clamp(Number(value) || 0, 0, 100);
    const bar = document.getElementById(`hcVehicleTab${name}Bar`);
    const label = document.getElementById(`hcVehicleTab${name}`);

    if (bar) {
      bar.style.width = `${safeValue}%`;
      bar.style.background = color;
    }

    if (label) label.textContent = `${Math.round(safeValue)}%`;
  }

  function renderVehiclePanel(game) {
    const name = document.getElementById("hcVehicleTabName");
    const status = document.getElementById("hcVehicleTabState");
    const detail = document.getElementById("hcVehicleTabDetail");
    const speed = document.getElementById("hcVehicleTabSpeed");
    const action = document.getElementById("hcVehicleTabAction");

    if (!name || !status || !detail || !speed || !action) return;

    const car = state.activeCar || nearestVehicle(game, 82);
    const active = Boolean(state.activeCar && car === state.activeCar);

    if (!car) {
      status.textContent = "ON FOOT";
      name.textContent = "No vehicle in range";
      detail.textContent = "Move close to a street vehicle to inspect and start it.";
      speed.textContent = "0";
      action.textContent = "NO VEHICLE IN RANGE";
      action.disabled = true;
      setVehicleTabMeter("Fuel", 0, "#6f7771");
      setVehicleTabMeter("Condition", 0, "#6f7771");
      setVehicleTabMeter("Battery", 0, "#6f7771");
      return;
    }

    const info = ensureVehicle(game, car);
    const mph = Math.round(Math.abs(info.speed) * 0.22);
    const distanceFromPlayer = Math.max(
      0,
      Math.hypot(car.x - game.player.x, car.y - game.player.y) -
        Math.max(car.w, car.h) * 0.5
    );

    status.textContent = active
      ? info.engine
        ? "ENGINE RUNNING"
        : "PARKED"
      : "NEARBY VEHICLE";
    name.textContent = titleCase(car.kind || "vehicle");
    detail.textContent = active
      ? `${Math.round(info.distance / 12)} m driven · ${info.condition < 30 ? "engine needs attention" : "vehicle responding normally"}.`
      : `${Math.round(distanceFromPlayer)} units away · ${info.condition < 30 ? "rough mechanical condition" : "appears driveable"}.`;
    speed.textContent = String(mph);

    setVehicleTabMeter(
      "Fuel",
      info.fuel,
      info.fuel < 18 ? "#c75b52" : "#b3a45e"
    );
    setVehicleTabMeter(
      "Condition",
      info.condition,
      conditionColor(info.condition)
    );
    setVehicleTabMeter(
      "Battery",
      info.battery,
      info.battery < 15 ? "#c75b52" : "#718d91"
    );

    if (active) {
      const movingTooFast = Math.abs(info.speed) > 18;
      action.disabled = movingTooFast;
      action.textContent = movingTooFast
        ? "SLOW DOWN TO EXIT"
        : "EXIT VEHICLE";
    } else if (info.condition <= 8) {
      action.disabled = true;
      action.textContent = "ENGINE DESTROYED";
    } else if (info.fuel <= 0.2) {
      action.disabled = true;
      action.textContent = "FUEL TANK EMPTY";
    } else if (info.battery <= 4) {
      action.disabled = true;
      action.textContent = "BATTERY DEAD";
    } else {
      action.disabled = false;
      action.textContent = "ENTER & START VEHICLE";
    }
  }

  function updateInventoryTabIndicators(game) {
    const survival = ensurePlayerState(game);
    if (!survival) return;

    const healthTab = document.querySelector(
      "#hcSurvivalTabs [data-hc-tab='health']"
    );
    const skillsTab = document.querySelector(
      "#hcSurvivalTabs [data-hc-tab='skills']"
    );
    const vehicleTab = document.querySelector(
      "#hcSurvivalTabs [data-hc-tab='vehicle']"
    );

    const urgentWound = survival.wounds.some(wound =>
      wound.infected ||
      wound.dirtyBandage ||
      (!wound.bandaged && wound.bleed > 0.08)
    );
    const weaponId = game.player?.equipped;
    const weaponProblem = Boolean(
      survival.jams[weaponId] ||
      (ALL_WEAPONS.has(weaponId) &&
        survival.weaponCondition[weaponId] < 20)
    );
    const vehicleProblem = Boolean(
      state.activeCar &&
      ensureVehicle(game, state.activeCar).condition < 22
    );

    if (healthTab) healthTab.dataset.alert = String(urgentWound);
    if (skillsTab) skillsTab.dataset.alert = String(weaponProblem);
    if (vehicleTab) vehicleTab.dataset.alert = String(vehicleProblem);
  }

  function woundTypeFor(zombie, infectionIncrease, seed) {
    if (infectionIncrease > 0.01) return "bite";

    const roll = hash01(seed);

    if (zombie?.archetype === "brute") {
      return roll < 0.72 ? "laceration" : "deep bruise";
    }

    if (zombie?.archetype === "crawler") {
      return roll < 0.6 ? "scratch" : "laceration";
    }

    return roll < 0.48
      ? "scratch"
      : roll < 0.83
        ? "laceration"
        : "deep bruise";
  }

  function createWound(
    game,
    zombie,
    damage,
    infectionIncrease = 0,
    forcedType = null
  ) {
    const survival = ensurePlayerState(game);

    if (!survival || state.recentWoundTimer > 0.08) return;

    const seed =
      `${game.world?.seed}:${game.day}:` +
      `${game.timeMinutes}:${zombie?.id || "damage"}:` +
      `${survival.wounds.length}`;

    const part = weightedBodyPart(`${seed}:part`);
    const type = forcedType || woundTypeFor(
      zombie,
      infectionIncrease,
      `${seed}:type`
    );

    const trait = traitFor(survival);
    const woundScale = trait.wounds || 1;

    const typeSeverity =
      type === "bite"
        ? 1.25
        : type === "laceration" || type === "gunshot"
          ? 1.05
          : type === "scratch"
            ? 0.66
            : 0.55;

    const severity = clamp(
      (0.22 + damage / 31) *
        typeSeverity *
        woundScale,
      0.18,
      1
    );

    const bleedFactor =
      type === "bite"
        ? 0.9
        : type === "laceration"
          ? 1.1
          : type === "gunshot"
            ? 1.25
            : type === "scratch"
              ? 0.45
              : 0.08;

    const wound = {
      id:
        `w${Date.now().toString(36)}` +
        `${Math.floor(hash01(seed) * 999).toString(36)}`,
      part: part.id,
      type,
      severity,
      initialSeverity: severity,
      bleed: severity * bleedFactor,
      pain: severity *
        (type === "deep bruise" ? 50 : 72),
      bandaged: false,
      dirtyBandage: false,
      bandageAge: 0,
      disinfected: false,
      infected: false,
      infectionRisk:
        type === "bite"
          ? 0.4
          : type === "gunshot"
            ? 0.26
            : type === "laceration"
              ? 0.18
              : type === "scratch"
                ? 0.07
                : 0.025,
      ageMinutes: 0,
      healing: 0
    };

    survival.wounds.push(wound);
    survival.pain = clamp(
      survival.pain + wound.pain * 0.45,
      0,
      100
    );
    survival.panic = clamp(
      survival.panic +
        (type === "bite" ? 34 : 13),
      0,
      100
    );

    state.recentWoundTimer = 0.55;

    game.toast?.(
      `${bodyPartById(part.id).name}: ${type}. Open Health (H) to treat it.`,
      "danger"
    );
  }

  function mostUrgentWound(survival, treatment) {
    const candidates = survival.wounds.filter(wound => {
      if (treatment === "bandage") {
        return !wound.bandaged || wound.dirtyBandage;
      }

      if (treatment === "disinfectant") {
        return !wound.disinfected;
      }

      return true;
    });

    return candidates.sort((a, b) => {
      const aScore =
        a.severity * 2 + a.bleed +
        (a.infected ? 2 : 0) +
        (a.dirtyBandage ? 1 : 0);

      const bScore =
        b.severity * 2 + b.bleed +
        (b.infected ? 2 : 0) +
        (b.dirtyBandage ? 1 : 0);

      return bScore - aScore;
    })[0] || null;
  }

  function treatWound(game, woundId, treatment) {
    const survival = ensurePlayerState(game);

    if (!survival) return false;

    const wound = woundId
      ? survival.wounds.find(entry => entry.id === woundId)
      : mostUrgentWound(survival, treatment);

    if (!wound) {
      game.toast?.("No wound needs that treatment.");
      return false;
    }

    if (treatment === "bandage") {
      if (game.itemCount?.("bandage") <= 0) {
        game.toast?.("No bandages remain.", "danger");
        return false;
      }

      game.removeItem?.("bandage", 1);
      wound.bandaged = true;
      wound.dirtyBandage = false;
      wound.bandageAge = 0;
      wound.bleed *= 0.16;
      wound.pain *= 0.88;

      gainSkill(
        game,
        "first_aid",
        7 + wound.severity * 8
      );

      game.toast?.(
        `Bandaged ${bodyPartById(wound.part).name.toLowerCase()}.`
      );
    } else if (treatment === "disinfectant") {
      if (game.itemCount?.("disinfectant") <= 0) {
        game.toast?.("No disinfectant remains.", "danger");
        return false;
      }

      game.removeItem?.("disinfectant", 1);
      wound.disinfected = true;
      wound.infectionRisk *= 0.18;

      if (wound.infected) {
        wound.infected =
          Math.random() >
          0.45 + skillLevel(game, "first_aid") * 0.045;
      }

      gainSkill(
        game,
        "first_aid",
        9 + wound.severity * 9
      );

      game.toast?.(
        `Disinfected ${bodyPartById(wound.part).name.toLowerCase()}.`
      );
    }

    game.player.actionKind = "medical";
    game.player.actionItem = treatment;
    game.player.actionDuration = 1.45;
    game.player.actionAnim = 1.45;
    game.renderInventory?.();
    game.updateHotbar?.();
    renderHealthPanel(game);
    return true;
  }

  function usePainkillers(game) {
    const survival = ensurePlayerState(game);

    if (!survival || game.itemCount?.("painkillers") <= 0) {
      return false;
    }

    game.removeItem?.("painkillers", 1);
    survival.painkillerTimer = Math.max(
      survival.painkillerTimer,
      95
    );
    survival.pain = Math.max(0, survival.pain - 12);
    game.player.actionKind = "medical";
    game.player.actionItem = "painkillers";
    game.player.actionDuration = 1.1;
    game.player.actionAnim = 1.1;
    game.toast?.("Painkillers taken. Pain will be suppressed temporarily.");
    game.renderInventory?.();
    game.updateHotbar?.();
    return true;
  }

  function nearbyThreatCount(game, radius = 360) {
    const player = game.player;
    if (!player) return 0;

    let threat = 0;

    for (const zombie of game.zombies || []) {
      if (zombie.dead) continue;

      const distance = Math.hypot(
        zombie.x - player.x,
        zombie.y - player.y
      );

      if (distance > radius) continue;

      const awareness =
        zombie.state === "chase" ||
        zombie.targetEntityId === "player"
          ? 1.5
          : 1;

      threat +=
        awareness *
        clamp(1 - distance / radius, 0.08, 1);
    }

    return threat;
  }

  function toggleRest(game) {
    const survival = ensurePlayerState(game);
    if (!survival) return;

    if (!survival.resting && nearbyThreatCount(game, 260) > 0.2) {
      game.toast?.("Too dangerous to rest here.", "danger");
      return;
    }

    survival.resting = !survival.resting;
    game.closeAllPanels?.();
    closeCustomPanel(game);
    game.toast?.(
      survival.resting
        ? "Resting. Movement or danger will interrupt you."
        : "Stopped resting."
    );
  }

  function movementPenalty(game) {
    const survival = ensurePlayerState(game);
    if (!survival) return 1;

    const legSeverity = survival.wounds
      .filter(wound => wound.part.endsWith("leg"))
      .reduce((sum, wound) => sum + wound.severity, 0);

    const pain = survival.pain / 100;
    const fatigue = survival.fatigue / 100;
    const sickness = survival.sickness / 100;
    const fitness = skillLevel(game, "fitness");
    const nimble = skillLevel(game, "nimble");

    let encumbrance = 0;

    if (
      typeof game.inventoryWeight === "function" &&
      typeof game.maxWeight === "function"
    ) {
      const ratio =
        game.inventoryWeight() /
        Math.max(1, game.maxWeight());

      encumbrance = Math.max(0, ratio - 0.72) * 0.42;
    }

    return clamp(
      1.01 + fitness * 0.012 + nimble * 0.005 -
        legSeverity * 0.18 -
        pain * 0.17 -
        Math.max(0, fatigue - 0.45) * 0.22 -
        sickness * 0.16 -
        encumbrance,
      0.42,
      1.15
    );
  }

  function updateWounds(game, dt) {
    const survival = ensurePlayerState(game);
    if (!survival) return;

    const firstAid = skillLevel(game, "first_aid");
    const occupation = occupationFor(survival);
    const worldMinutes = dt * 3.25;
    let painTarget = 0;
    let sicknessTarget = game.player.infection * 0.55;

    for (const wound of survival.wounds) {
      wound.ageMinutes += worldMinutes;
      wound.bandageAge += wound.bandaged ? worldMinutes : 0;

      if (
        wound.bandaged &&
        wound.bandageAge >
          260 + firstAid * 24
      ) {
        wound.dirtyBandage = true;
      }

      const bleeding = wound.bandaged
        ? wound.bleed *
          (wound.dirtyBandage ? 0.32 : 0.1)
        : wound.bleed;

      if (bleeding > 0.015) {
        game.player.health = Math.max(
          0,
          game.player.health -
            dt * bleeding * 0.055
        );
      }

      const infectionChance =
        wound.infectionRisk *
        (wound.disinfected ? 0.12 : 1) *
        (wound.dirtyBandage ? 2.4 : 1) *
        (1 - firstAid * 0.045);

      if (
        !wound.infected &&
        Math.random() <
          dt * infectionChance * 0.0014
      ) {
        wound.infected = true;
        game.toast?.(
          `${bodyPartById(wound.part).name} wound looks infected.`,
          "danger"
        );
      }

      if (wound.infected) {
        sicknessTarget += 16 + wound.severity * 28;
        game.player.health = Math.max(
          0,
          game.player.health -
            dt * wound.severity * 0.018
        );
      }

      const nourished =
        clamp(
          Math.min(
            game.player.hunger,
            game.player.thirst
          ) / 65,
          0.24,
          1.25
        );

      const treatment =
        wound.bandaged ? 1.15 : 0.68;

      const healRate =
        worldMinutes /
        (900 + wound.initialSeverity * 2500) *
        nourished *
        treatment *
        (1 + firstAid * 0.045) *
        (occupation.healing || 1) *
        (wound.infected ? 0.3 : 1);

      wound.healing = clamp(
        wound.healing + healRate,
        0,
        1
      );

      wound.severity = Math.max(
        0,
        wound.initialSeverity *
          (1 - wound.healing)
      );

      wound.bleed = Math.max(
        0,
        wound.bleed - healRate * 1.9
      );

      painTarget +=
        wound.pain *
        (0.32 + wound.severity * 0.68) *
        (wound.bandaged ? 0.84 : 1);
    }

    survival.wounds = survival.wounds.filter(
      wound => wound.severity > 0.025
    );

    survival.painkillerTimer = Math.max(
      0,
      survival.painkillerTimer - dt
    );

    if (survival.painkillerTimer > 0) {
      painTarget *= 0.42;
    }

    survival.pain = lerp(
      survival.pain,
      clamp(painTarget, 0, 100),
      1 - Math.exp(-dt * 1.4)
    );

    survival.sickness = lerp(
      survival.sickness,
      clamp(sicknessTarget, 0, 100),
      1 - Math.exp(-dt * 0.17)
    );
  }

  function updateNeeds(game, dt) {
    const player = game.player;
    const survival = ensurePlayerState(game);
    if (!player || !survival) return;

    const occupation = occupationFor(survival);
    const trait = traitFor(survival);
    const threat = nearbyThreatCount(game, 430);
    const inside = Boolean(game.buildingAt?.(player));
    const panicTarget = clamp(
      threat * 24 +
        survival.wounds.filter(wound => !wound.bandaged).length * 4 +
        (game.dayPhase?.() === "NIGHT" && !inside ? 8 : 0),
      0,
      100
    );

    const panicResistance =
      (occupation.panicResistance || 1) *
      (trait.panic || 1);

    if (panicTarget > survival.panic) {
      survival.panic +=
        (panicTarget - survival.panic) *
        Math.min(1, dt * 1.4 * panicResistance);
    } else {
      survival.panic +=
        (panicTarget - survival.panic) *
        Math.min(1, dt * 0.085 / panicResistance);
    }

    const fatigueGain =
      (player.sprintingNow ? 0.72 : player.movingNow ? 0.29 : 0.17) *
      (trait.fatigue || 1) *
      (1 - skillLevel(game, "fitness") * 0.035);

    if (survival.resting) {
      survival.fatigue = Math.max(
        0,
        survival.fatigue - dt * (1.15 + (inside ? 0.35 : 0))
      );

      player.stamina = Math.min(
        100,
        player.stamina + dt * 8
      );

      if (threat > 0.2) {
        survival.resting = false;
        game.toast?.("Rest interrupted — something is close.", "danger");
      }
    } else {
      survival.fatigue = clamp(
        survival.fatigue + dt * fatigueGain,
        0,
        100
      );
    }

    const raining = game.weather === "LIGHT RAIN";

    if (raining && !inside) {
      survival.wetness = clamp(
        survival.wetness + dt * 0.88,
        0,
        100
      );
    } else {
      survival.wetness = clamp(
        survival.wetness - dt * (inside ? 0.65 : 0.24),
        0,
        100
      );
    }

    const hour = game.timeMinutes / 60;
    const weatherOffset =
      game.weather === "COLD WIND"
        ? -1.5
        : game.weather === "LIGHT RAIN"
          ? -0.9
          : game.weather === "CLEARING"
            ? 0.45
            : 0;

    const nightOffset =
      hour >= 20 || hour < 6 ? -0.65 : 0;

    const activityOffset =
      player.sprintingNow ? 1.25 : player.movingNow ? 0.35 : 0;

    const targetTemperature =
      37 + weatherOffset + nightOffset + activityOffset -
      survival.wetness / 100 * 1.1 +
      survival.sickness / 100 * 0.9;

    survival.temperature = lerp(
      survival.temperature,
      targetTemperature,
      1 - Math.exp(-dt * 0.035)
    );

    // Traits modify the existing core hunger/thirst simulation without
    // replacing it or risking conflicts with saved games.
    if ((trait.hunger || 1) > 1) {
      player.hunger = Math.max(
        0,
        player.hunger - dt * 0.075 * (trait.hunger - 1)
      );
    }

    if ((trait.thirst || 1) > 1) {
      player.thirst = Math.max(
        0,
        player.thirst - dt * 0.11 * (trait.thirst - 1)
      );
    }

    for (const weaponId of FIREARMS) {
      survival.weaponHeat[weaponId] = Math.max(
        0,
        survival.weaponHeat[weaponId] - dt * 9
      );
    }

    if (survival.clearingJam) {
      survival.clearingJam.timer -= dt *
        (1 + skillLevel(game, "reloading") * 0.055);

      player.attackCooldown = Math.max(
        player.attackCooldown || 0,
        0.12
      );

      if (survival.clearingJam.timer <= 0) {
        const weaponId = survival.clearingJam.weaponId;
        survival.jams[weaponId] = false;
        survival.clearingJam = null;
        gainSkill(game, "maintenance", 4);
        gainSkill(game, "reloading", 5);
        game.toast?.("Weapon cleared and ready.");
      }
    }
  }

  function updateMovementXp(game, dt) {
    state.xpMoveTimer -= dt;
    state.footstepTimer -= dt;

    if (state.xpMoveTimer <= 0) {
      state.xpMoveTimer = 1.15;

      if (game.player.sprintingNow) {
        gainSkill(game, "sprinting", 0.95);
        gainSkill(game, "fitness", 0.24);
      } else if (game.player.crouching && game.player.movingNow) {
        const danger = nearbyThreatCount(game, 300);
        gainSkill(
          game,
          "sneaking",
          0.35 + danger * 0.35
        );
        gainSkill(game, "nimble", 0.14);
      } else if (game.player.movingNow) {
        gainSkill(game, "fitness", 0.04);
      }
    }

    if (state.footstepTimer <= 0 && game.player.movingNow) {
      const survival = ensurePlayerState(game);
      const trait = traitFor(survival);
      const sneak = skillLevel(game, "sneaking");
      const base = game.player.sprintingNow
        ? 110
        : game.player.crouching
          ? 22
          : 54;

      const radius = base *
        (trait.stealth || 1) *
        (1 - sneak * 0.045);

      game.emitNoise?.(
        game.player.x,
        game.player.y,
        radius,
        game.player.crouching
          ? "quiet movement"
          : "walking footsteps"
      );

      state.footstepTimer = game.player.sprintingNow
        ? 0.72
        : game.player.crouching
          ? 1.75
          : 1.2;
    }
  }

  function beginForaging(game) {
    const survival = ensurePlayerState(game);
    if (!survival || game.mode !== "playing") return;

    if (state.activeCar) {
      game.toast?.("Exit the vehicle before foraging.");
      return;
    }

    if (game.buildingAt?.(game.player)) {
      game.toast?.("Foraging works outdoors, away from buildings.");
      return;
    }

    if (nearbyThreatCount(game, 280) > 0.25) {
      game.toast?.("Too dangerous to search the ground here.", "danger");
      return;
    }

    if (state.forageTimer > 0) {
      state.forageTimer = 0;
      game.toast?.("Foraging cancelled.");
      return;
    }

    const level = skillLevel(game, "foraging");
    state.forageTotal = Math.max(2.8, 5.2 - level * 0.2);
    state.forageTimer = state.forageTotal;
    state.forageSeed = hash01(
      `${game.world?.seed}:${game.player.x.toFixed(0)}:` +
      `${game.player.y.toFixed(0)}:${game.timeMinutes.toFixed(1)}`
    );

    game.player.actionKind = "forage";
    game.player.actionItem = "ground";
    game.player.actionDuration = state.forageTotal;
    game.player.actionAnim = state.forageTotal;
    game.toast?.("Searching the roadside growth...");
  }

  function finishForaging(game) {
    const survival = ensurePlayerState(game);
    const level = skillLevel(game, "foraging");
    const roll = state.forageSeed + level * 0.018;

    const finds = [
      { id: "rag", qty: 1, threshold: 0.18, name: "a usable rag" },
      { id: "plank", qty: 1, threshold: 0.34, name: "a straight plank" },
      { id: "scrap", qty: 1, threshold: 0.5, name: "metal scrap" },
      { id: "nails", qty: 1, threshold: 0.62, name: "loose nails" },
      { id: "water", qty: 1, threshold: 0.71, name: "a sealed water bottle" },
      { id: "jerky", qty: 1, threshold: 0.78, name: "an unopened strip of jerky" }
    ];

    const find = finds.find(entry => roll < entry.threshold);

    if (find && game.addItem?.(find.id, find.qty)) {
      survival.itemsForaged += find.qty;
      gainSkill(game, "foraging", 10 + level * 0.5);
      game.toast?.(`Foraging found ${find.name}.`);
      game.renderInventory?.();
      game.updateHotbar?.();
    } else {
      gainSkill(game, "foraging", 4);
      game.toast?.("Nothing useful turned up.");
    }

    state.forageTimer = 0;
    state.forageTotal = 0;
  }

  function updateForaging(game, dt) {
    if (state.forageTimer <= 0) return;

    if (
      game.player.movingNow ||
      state.activeCar ||
      nearbyThreatCount(game, 235) > 0.3
    ) {
      state.forageTimer = 0;
      state.forageTotal = 0;
      game.player.actionAnim = 0;
      game.toast?.("Foraging interrupted.", "danger");
      return;
    }

    state.forageTimer -= dt;

    if (state.forageTimer <= 0) {
      finishForaging(game);
    }
  }

  function shout(game) {
    const survival = ensurePlayerState(game);
    if (!survival || game.mode !== "playing") return;

    if (state.activeCar) {
      game.toast?.("The engine is already loud enough.");
      return;
    }

    survival.shouts += 1;
    survival.panic = Math.max(0, survival.panic - 4);
    game.emitNoise?.(
      game.player.x,
      game.player.y,
      920,
      "player shout"
    );
    game.camera.shake = Math.max(game.camera.shake || 0, 2);
    game.toast?.("HEY! OVER HERE!", "danger");
  }

  function repairMaterialFor(weaponId) {
    if (FIREARMS.has(weaponId)) {
      return [
        ["rag", 1],
        ["scrap", 1]
      ];
    }

    if (["bat", "spear"].includes(weaponId)) {
      return [
        ["plank", 1],
        ["nails", 1]
      ];
    }

    return [["scrap", 1]];
  }

  function repairEquippedWeapon(game) {
    const survival = ensurePlayerState(game);
    const weaponId = game.player?.equipped;

    if (!survival || !ALL_WEAPONS.has(weaponId)) {
      game.toast?.("Equip a weapon first.");
      return;
    }

    const condition = survival.weaponCondition[weaponId];

    if (condition >= 99) {
      game.toast?.("That weapon is already in excellent condition.");
      return;
    }

    const costs = repairMaterialFor(weaponId);

    const missing = costs.find(
      ([id, qty]) => game.itemCount?.(id) < qty
    );

    if (missing) {
      game.toast?.(
        `Repair needs ${missing[1]} ${titleCase(missing[0])}.`,
        "danger"
      );
      return;
    }

    for (const [id, qty] of costs) {
      game.removeItem?.(id, qty);
    }

    const maintenance = skillLevel(game, "maintenance");
    const occupation = occupationFor(survival);
    const amount =
      (FIREARMS.has(weaponId) ? 18 : 24) *
      (1 + maintenance * 0.045) *
      (occupation.repair || 1);

    survival.weaponCondition[weaponId] = clamp(
      condition + amount,
      0,
      100
    );
    survival.weaponHeat[weaponId] = 0;
    survival.jams[weaponId] = false;
    gainSkill(game, "maintenance", 13);
    game.toast?.(
      `${WEAPON_NAMES[weaponId]} restored to ${Math.round(survival.weaponCondition[weaponId])}%.`
    );
    game.renderInventory?.();
    game.updateHotbar?.();
    renderSkillsPanel(game);
  }

  function wearWeapon(game, weaponId) {
    const survival = ensurePlayerState(game);
    if (!survival || !ALL_WEAPONS.has(weaponId)) return;

    const maintenance = skillLevel(game, "maintenance");
    const wear = (WEAPON_WEAR[weaponId] || 0.2) *
      (1 - maintenance * 0.055) *
      (0.72 + Math.random() * 0.56);

    survival.weaponCondition[weaponId] = Math.max(
      0,
      survival.weaponCondition[weaponId] - wear
    );

    if (FIREARMS.has(weaponId)) {
      survival.weaponHeat[weaponId] = clamp(
        survival.weaponHeat[weaponId] +
          (HEAVY_WEAPONS.has(weaponId) ? 9 : 6),
        0,
        100
      );

      const condition = survival.weaponCondition[weaponId];
      const heat = survival.weaponHeat[weaponId];
      const jamChance =
        Math.max(0, 45 - condition) * 0.00055 +
        Math.max(0, heat - 70) * 0.00075;

      if (
        !survival.jams[weaponId] &&
        Math.random() < jamChance
      ) {
        survival.jams[weaponId] = true;
        game.toast?.(
          `${WEAPON_NAMES[weaponId]} jammed — press R to clear it.`,
          "danger"
        );
      }
    }

    if (survival.weaponCondition[weaponId] <= 0) {
      game.toast?.(
        `${WEAPON_NAMES[weaponId]} broke beyond use.`,
        "danger"
      );
      game.removeItem?.(weaponId, 1);
      game.player.equipped = null;
      game.player.hotbar = game.player.hotbar.map(
        id => id === weaponId ? null : id
      );
    }
  }

  function beginClearJam(game) {
    const survival = ensurePlayerState(game);
    const weaponId = game.player?.equipped;

    if (
      !survival ||
      !FIREARMS.has(weaponId) ||
      !survival.jams[weaponId]
    ) {
      return false;
    }

    if (survival.clearingJam) return true;

    survival.clearingJam = {
      weaponId,
      timer: Math.max(
        0.55,
        1.35 - skillLevel(game, "reloading") * 0.07
      )
    };

    game.player.gunReload = null;
    game.player.actionKind = "weapon";
    game.player.actionItem = weaponId;
    game.player.actionDuration = survival.clearingJam.timer;
    game.player.actionAnim = survival.clearingJam.timer;
    game.toast?.("Clearing firearm malfunction...");
    return true;
  }

  function vehicleSaveKey(game) {
    return VEHICLE_SAVE_PREFIX +
      (game.world?.seed || "COUNTY");
  }

  function initialVehicleState(game, car) {
    const seed =
      `${game.world?.seed}:${car.id}:vehicle`;

    return {
      fuel: clamp(
        12 + hash01(`${seed}:fuel`) * 78,
        0,
        100
      ),
      condition: clamp(
        28 + hash01(`${seed}:condition`) * 68,
        0,
        100
      ),
      battery: clamp(
        32 + hash01(`${seed}:battery`) * 65,
        0,
        100
      ),
      speed: 0,
      angle: car.h > car.w ? Math.PI / 2 : 0,
      moved: false,
      engine: false,
      distance: 0
    };
  }

  function ensureVehicle(game, car) {
    if (!car) return null;

    if (!car.deepVehicle) {
      const saved = state.vehicleRecords.get(car.id);
      car.deepVehicle = {
        ...initialVehicleState(game, car),
        ...(saved || {})
      };

      if (saved) {
        car.x = saved.x ?? car.x;
        car.y = saved.y ?? car.y;
      }
    }

    return car.deepVehicle;
  }

  function vehicleRecord(car) {
    const info = car.deepVehicle;

    if (!info) return null;

    return {
      id: car.id,
      x: car.x,
      y: car.y,
      fuel: info.fuel,
      condition: info.condition,
      battery: info.battery,
      speed: 0,
      angle: info.angle,
      moved: info.moved,
      engine: false,
      distance: info.distance
    };
  }

  function saveVehicles(game) {
    if (!game.world) return;

    const records = [];

    for (const car of game.world.cars || []) {
      if (!car.deepVehicle) continue;
      const record = vehicleRecord(car);
      if (record) {
        records.push(record);
        state.vehicleRecords.set(car.id, record);
      }
    }

    for (const [id, record] of state.vehicleRecords) {
      if (!records.some(entry => entry.id === id)) {
        records.push(record);
      }
    }

    try {
      localStorage.setItem(
        vehicleSaveKey(game),
        JSON.stringify(records)
      );
    } catch {
      // Core save data still persists if the optional vehicle save fails.
    }
  }

  function loadVehicles(game, clear = false) {
    state.vehicleRecords = new Map();

    if (clear) {
      try {
        localStorage.removeItem(vehicleSaveKey(game));
      } catch {
        // Ignore unavailable storage.
      }
    } else {
      try {
        const records = JSON.parse(
          localStorage.getItem(vehicleSaveKey(game)) || "[]"
        );

        for (const record of records || []) {
          if (record?.id) {
            state.vehicleRecords.set(record.id, record);
          }
        }
      } catch {
        state.vehicleRecords = new Map();
      }
    }

    for (const car of game.world?.cars || []) {
      ensureVehicle(game, car);
    }

    const survival = ensurePlayerState(game);
    const activeId = survival?.vehicleId;

    state.activeCar = activeId
      ? (game.world?.cars || []).find(car => car.id === activeId) || null
      : null;

    if (state.activeCar) {
      const info = ensureVehicle(game, state.activeCar);
      info.engine = true;
      info.speed = 0;
      game.player.x = state.activeCar.x;
      game.player.y = state.activeCar.y;
    } else if (survival) {
      survival.vehicleId = null;
    }
  }

  function applyVehicleRecords(game) {
    if (!game.world) return;

    for (const car of game.world.cars || []) {
      const record = state.vehicleRecords.get(car.id);

      if (record && !car.deepVehicle) {
        car.x = record.x ?? car.x;
        car.y = record.y ?? car.y;
        car.deepVehicle = {
          ...initialVehicleState(game, car),
          ...record,
          engine: false,
          speed: 0
        };
      }
    }

    if (
      state.activeCar &&
      !game.world.cars.includes(state.activeCar)
    ) {
      game.world.cars = game.world.cars.filter(
        car => car.id !== state.activeCar.id
      );
      game.world.cars.push(state.activeCar);
    }
  }

  function nearestVehicle(game, range = 82) {
    const player = game.player;
    if (!player || !game.world) return null;

    let nearest = null;
    let best = range;

    for (const car of game.world.cars || []) {
      const edge = Math.max(
        0,
        Math.hypot(
          car.x - player.x,
          car.y - player.y
        ) - Math.max(car.w, car.h) * 0.5
      );

      if (edge < best) {
        best = edge;
        nearest = car;
      }
    }

    return nearest;
  }

  function withCarIgnored(game, car, callback) {
    const cars = game.world.cars;
    game.world.cars = cars.filter(entry => entry !== car);

    try {
      return callback();
    } finally {
      game.world.cars = cars;
    }
  }

  function findExitPosition(game, car) {
    const info = ensureVehicle(game, car);
    const length = Math.max(car.w, car.h);
    const width = Math.min(car.w, car.h);
    const rightX = -Math.sin(info.angle);
    const rightY = Math.cos(info.angle);

    return withCarIgnored(game, car, () => {
      for (const side of [1, -1]) {
        for (const extra of [18, 28, 38]) {
          const x = car.x + rightX * (width / 2 + extra) * side;
          const y = car.y + rightY * (width / 2 + extra) * side;

          if (!game.circleBlocked?.(x, y, 8, true)) {
            return { x, y };
          }
        }
      }

      const backX = car.x - Math.cos(info.angle) * (length / 2 + 25);
      const backY = car.y - Math.sin(info.angle) * (length / 2 + 25);

      if (!game.circleBlocked?.(backX, backY, 8, true)) {
        return { x: backX, y: backY };
      }

      return null;
    });
  }

  function toggleVehicle(game) {
    const survival = ensurePlayerState(game);
    if (!survival || game.mode !== "playing") return;

    if (state.activeCar) {
      const info = ensureVehicle(game, state.activeCar);

      if (Math.abs(info.speed) > 18) {
        game.toast?.("Slow down before leaving the vehicle.", "danger");
        return;
      }

      const exit = findExitPosition(game, state.activeCar);

      if (!exit) {
        game.toast?.("Both doors are blocked.", "danger");
        return;
      }

      info.engine = false;
      info.speed = 0;
      state.activeCar = null;
      survival.vehicleId = null;
      game.player.x = exit.x;
      game.player.y = exit.y;
      game.player.velocityX = 0;
      game.player.velocityY = 0;
      game.toast?.("Vehicle exited. Engine off.");
      saveVehicles(game);
      return;
    }

    const car = nearestVehicle(game);

    if (!car) {
      game.toast?.("No vehicle close enough.");
      return;
    }

    const info = ensureVehicle(game, car);

    if (info.condition <= 8) {
      game.toast?.("The engine is destroyed.", "danger");
      return;
    }

    if (info.fuel <= 0.2) {
      game.toast?.("The fuel tank is empty.", "danger");
      return;
    }

    if (info.battery <= 4) {
      game.toast?.("The battery is dead.", "danger");
      return;
    }

    const startChance =
      0.72 + info.condition / 500 +
      (occupationFor(survival).hotwire ? 0.12 : 0);

    if (Math.random() > startChance) {
      info.battery = Math.max(0, info.battery - 1.5);
      game.emitNoise?.(car.x, car.y, 170, "engine starter");
      game.toast?.("The engine turns over but does not catch.", "danger");
      return;
    }

    state.activeCar = car;
    survival.vehicleId = car.id;
    survival.resting = false;
    info.engine = true;
    info.speed = 0;
    game.player.x = car.x;
    game.player.y = car.y;
    game.player.velocityX = 0;
    game.player.velocityY = 0;
    game.emitNoise?.(car.x, car.y, 420, "vehicle engine start");
    game.toast?.(`${titleCase(car.kind || "vehicle")} started. WASD drives; V exits.`);
  }

  function vehicleBlocked(game, car, x, y, angle) {
    const length = Math.max(car.w, car.h);
    const width = Math.min(car.w, car.h);
    const forwardX = Math.cos(angle);
    const forwardY = Math.sin(angle);
    const rightX = -forwardY;
    const rightY = forwardX;

    const samples = [
      [0, 0],
      [length * 0.34, 0],
      [-length * 0.34, 0],
      [length * 0.24, width * 0.3],
      [length * 0.24, -width * 0.3],
      [-length * 0.24, width * 0.3],
      [-length * 0.24, -width * 0.3]
    ];

    return withCarIgnored(game, car, () =>
      samples.some(([forward, right]) =>
        game.circleBlocked?.(
          x + forwardX * forward + rightX * right,
          y + forwardY * forward + rightY * right,
          Math.max(6, width * 0.22),
          true
        )
      )
    );
  }

  function hitZombiesWithVehicle(game, car, dt) {
    const info = ensureVehicle(game, car);
    const speed = Math.abs(info.speed);
    if (speed < 34) return;

    const length = Math.max(car.w, car.h);
    const width = Math.min(car.w, car.h);
    const forwardX = Math.cos(info.angle);
    const forwardY = Math.sin(info.angle);
    const rightX = -forwardY;
    const rightY = forwardX;

    for (const zombie of game.zombies || []) {
      if (zombie.dead) continue;

      zombie.deepVehicleCooldown = Math.max(
        0,
        (zombie.deepVehicleCooldown || 0) - dt
      );

      if (zombie.deepVehicleCooldown > 0) continue;

      const dx = zombie.x - car.x;
      const dy = zombie.y - car.y;
      const localForward = dx * forwardX + dy * forwardY;
      const localRight = dx * rightX + dy * rightY;

      if (
        Math.abs(localForward) > length / 2 + zombie.radius ||
        Math.abs(localRight) > width / 2 + zombie.radius
      ) {
        continue;
      }

      zombie.deepVehicleCooldown = 0.65;
      const damage = clamp(speed * 0.62, 18, 190);

      state.vehicleImpact = true;

      try {
        game.damageZombie?.(
          zombie,
          damage,
          forwardX * speed * 0.18,
          forwardY * speed * 0.18,
          game.player
        );
      } finally {
        state.vehicleImpact = false;
      }

      info.condition = Math.max(
        0,
        info.condition - clamp(speed / 230, 0.15, 1.2)
      );
      info.speed *= 0.88;
      game.camera.shake = Math.max(
        game.camera.shake || 0,
        clamp(speed / 14, 4, 15)
      );
    }
  }

  function updateVehicle(game, dt, movement) {
    const car = state.activeCar;
    if (!car) return;

    const survival = ensurePlayerState(game);
    const info = ensureVehicle(game, car);

    if (info.condition <= 0 || info.fuel <= 0) {
      info.engine = false;
      info.speed *= Math.exp(-dt * 2.4);

      if (info.condition <= 0) {
        game.toast?.("The engine has failed.", "danger");
      } else {
        game.toast?.("The vehicle ran out of fuel.", "danger");
      }
    }

    const throttle = info.engine
      ? clamp(-(movement?.y || 0), -1, 1)
      : 0;

    const steering = clamp(
      movement?.x || 0,
      -1,
      1
    );

    const engineHealth = clamp(info.condition / 70, 0.35, 1);
    const maxForward = 275 * engineHealth;
    const maxReverse = -105 * engineHealth;

    if (Math.abs(throttle) > 0.05 && info.engine) {
      const changingDirection =
        Math.sign(throttle) !== Math.sign(info.speed) &&
        Math.abs(info.speed) > 8;

      const acceleration = changingDirection ? 230 : 126;
      info.speed += throttle * acceleration * dt;
    } else {
      info.speed *= Math.exp(-dt * 1.15);
    }

    info.speed = clamp(
      info.speed,
      maxReverse,
      maxForward
    );

    if (Math.abs(info.speed) < 0.4) info.speed = 0;

    if (Math.abs(info.speed) > 3) {
      const steeringRate =
        1.42 *
        clamp(Math.abs(info.speed) / 90, 0.18, 1);

      info.angle +=
        steering * steeringRate * dt *
        Math.sign(info.speed);
    }

    const nextX = car.x +
      Math.cos(info.angle) * info.speed * dt;

    const nextY = car.y +
      Math.sin(info.angle) * info.speed * dt;

    if (
      Math.abs(info.speed) > 0.1 &&
      vehicleBlocked(game, car, nextX, nextY, info.angle)
    ) {
      const impact = Math.abs(info.speed);
      info.condition = Math.max(
        0,
        info.condition - clamp(impact * 0.035, 0.35, 8)
      );
      info.speed *= -0.12;
      game.camera.shake = Math.max(
        game.camera.shake || 0,
        clamp(impact / 10, 5, 18)
      );
      game.emitNoise?.(car.x, car.y, 680, "vehicle crash");

      if (impact > 125) {
        game.player.health = Math.max(
          0,
          game.player.health - (impact - 105) * 0.055
        );
        createWound(game, null, (impact - 100) * 0.08, 0, "deep bruise");
      }
    } else {
      const traveled = Math.hypot(nextX - car.x, nextY - car.y);
      car.x = nextX;
      car.y = nextY;
      info.distance += traveled;
      info.moved = info.moved || traveled > 0.1;
      survival.metersDriven += traveled / 12;
    }

    info.fuel = Math.max(
      0,
      info.fuel - dt *
        (0.035 + Math.abs(info.speed) * 0.00042)
    );
    info.battery = Math.max(0, info.battery - dt * 0.002);

    game.player.x = car.x;
    game.player.y = car.y;
    game.player.facingX = Math.cos(info.angle);
    game.player.facingY = Math.sin(info.angle);
    game.player.renderFacingX = game.player.facingX;
    game.player.renderFacingY = game.player.facingY;
    game.player.movingNow = Math.abs(info.speed) > 4;
    game.player.sprintingNow = false;
    game.player.velocityX = 0;
    game.player.velocityY = 0;

    hitZombiesWithVehicle(game, car, dt);

    state.vehicleNoiseTimer -= dt;

    if (state.vehicleNoiseTimer <= 0 && info.engine) {
      const noise = 390 + Math.abs(info.speed) * 1.65;
      game.emitNoise?.(car.x, car.y, noise, "running vehicle engine");
      state.vehicleNoiseTimer = 0.72;
    }

    if (info.moved) {
      const chunkSize = game.world?.chunkSize || 96;
      const tileSize = game.world?.tileSize || 32;
      car.chunkKey =
        `${Math.floor(car.x / tileSize / chunkSize)},` +
        `${Math.floor(car.y / tileSize / chunkSize)}`;
    }
  }

  function drawDeepVehicle(ctx, game, car, shakeX, shakeY) {
    const info = ensureVehicle(game, car);
    const p = game.worldToScreen(car.x, car.y, shakeX, shakeY);

    if (
      p.x < -110 ||
      p.y < -110 ||
      p.x > game.viewWidth + 110 ||
      p.y > game.viewHeight + 110
    ) {
      return;
    }

    const length = Math.max(car.w, car.h);
    const width = Math.min(car.w, car.h);
    const halfL = length / 2;
    const halfW = width / 2;
    const damage = 1 - info.condition / 100;

    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(info.angle);

    ctx.fillStyle = "rgba(0,0,0,.38)";
    ctx.fillRect(-halfL + 3, -halfW + 6, length, width);

    ctx.fillStyle = "#111514";
    ctx.fillRect(-halfL + 8, -halfW - 3, 12, 5);
    ctx.fillRect(halfL - 20, -halfW - 3, 12, 5);
    ctx.fillRect(-halfL + 8, halfW - 2, 12, 5);
    ctx.fillRect(halfL - 20, halfW - 2, 12, 5);

    ctx.fillStyle = car.color || "#47534c";
    ctx.fillRect(-halfL, -halfW, length, width);

    ctx.fillStyle = "rgba(235,236,218,.12)";
    ctx.fillRect(-halfL + 2, -halfW + 2, length - 4, 3);

    const cabinStart = -halfL + length * 0.31;
    const cabinLength = length * 0.42;
    ctx.fillStyle = "#142125";
    ctx.fillRect(cabinStart, -halfW + 4, cabinLength, width - 8);

    ctx.fillStyle = "#2b4449";
    ctx.fillRect(cabinStart + 3, -halfW + 6, 7, width - 12);
    ctx.fillRect(cabinStart + cabinLength - 10, -halfW + 6, 7, width - 12);

    ctx.strokeStyle = "rgba(13,18,16,.7)";
    ctx.lineWidth = 1;
    ctx.strokeRect(-halfL + 0.5, -halfW + 0.5, length - 1, width - 1);

    ctx.fillStyle = info.engine ? "#e5d696" : "#bcae70";
    ctx.fillRect(halfL - 4, -halfW + 4, 3, 6);
    ctx.fillRect(halfL - 4, halfW - 10, 3, 6);
    ctx.fillStyle = "#8d3c36";
    ctx.fillRect(-halfL + 1, -halfW + 4, 3, 6);
    ctx.fillRect(-halfL + 1, halfW - 10, 3, 6);

    if (damage > 0.2) {
      ctx.strokeStyle = `rgba(30,22,18,${clamp(damage, 0.2, 0.85)})`;
      ctx.beginPath();
      ctx.moveTo(halfL - 15, -halfW + 2);
      ctx.lineTo(halfL - 22, 0);
      ctx.lineTo(halfL - 13, halfW - 2);
      ctx.stroke();
    }

    if (state.activeCar === car) {
      ctx.strokeStyle = "rgba(219,205,127,.55)";
      ctx.lineWidth = 1.5;
      ctx.strokeRect(-halfL - 2, -halfW - 2, length + 4, width + 4);
    }

    ctx.restore();
  }

  function moodleLevel(value, thresholds = [22, 45, 72]) {
    if (value >= thresholds[2]) return 3;
    if (value >= thresholds[1]) return 2;
    if (value >= thresholds[0]) return 1;
    return 0;
  }

  function moodlesFor(game) {
    const player = game.player;
    const survival = ensurePlayerState(game);
    if (!player || !survival) return [];

    const moodles = [];

    const add = (id, icon, label, detail, level, color) => {
      if (level <= 0) return;
      moodles.push({ id, icon, label, detail, level, color });
    };

    const bleed = survival.wounds.reduce(
      (sum, wound) =>
        sum +
        (wound.bandaged
          ? wound.bleed * 0.15
          : wound.bleed),
      0
    );

    add(
      "bleeding",
      "BL",
      bleed > 1.2 ? "Heavy bleeding" : "Bleeding",
      "Health is draining until wounds are bandaged",
      moodleLevel(bleed * 55, [8, 35, 66]),
      "#ce5a50"
    );

    add(
      "pain",
      "PA",
      overallConditionText(survival.pain) + " pain",
      "Movement and weapon control are impaired",
      moodleLevel(survival.pain, [10, 35, 70]),
      "#d28a69"
    );

    add(
      "panic",
      "PN",
      survival.panic > 72 ? "Terrified" : survival.panic > 45 ? "Panicked" : "Anxious",
      "Firearm sway and stamina use are increased",
      moodleLevel(survival.panic, [10, 35, 70]),
      "#d6b56e"
    );

    add(
      "fatigue",
      "ZZ",
      survival.fatigue > 72 ? "Exhausted" : survival.fatigue > 45 ? "Tired" : "Drowsy",
      "Rest somewhere secure",
      moodleLevel(survival.fatigue),
      "#8c91ad"
    );

    add(
      "wet",
      "WT",
      survival.wetness > 70 ? "Soaked" : survival.wetness > 40 ? "Wet" : "Damp",
      "Wet clothing is lowering body temperature",
      moodleLevel(survival.wetness, [18, 45, 75]),
      "#65a4ba"
    );

    add(
      "cold",
      "CL",
      survival.temperature < 35.3 ? "Freezing" : "Cold",
      `${survival.temperature.toFixed(1)}°C body temperature`,
      survival.temperature < 35.3 ? 3 : survival.temperature < 36 ? 2 : survival.temperature < 36.5 ? 1 : 0,
      "#77a9cf"
    );

    add(
      "hot",
      "HT",
      survival.temperature > 38.8 ? "Overheating" : "Hot",
      `${survival.temperature.toFixed(1)}°C body temperature`,
      survival.temperature > 38.8 ? 3 : survival.temperature > 38.1 ? 2 : survival.temperature > 37.6 ? 1 : 0,
      "#d9785e"
    );

    add(
      "sick",
      "SK",
      survival.sickness > 70 ? "Feverish" : survival.sickness > 40 ? "Sick" : "Queasy",
      "Infected wounds or illness are weakening you",
      moodleLevel(survival.sickness),
      "#88a96d"
    );

    add(
      "infection",
      "IN",
      player.infection > 70 ? "Terminal infection" : player.infection > 35 ? "Infected" : "Suspicious wound",
      `${Math.round(player.infection)}% zombie infection`,
      moodleLevel(player.infection, [1, 35, 70]),
      "#78955c"
    );

    if (
      typeof game.inventoryWeight === "function" &&
      typeof game.maxWeight === "function"
    ) {
      const ratio =
        game.inventoryWeight() /
        Math.max(1, game.maxWeight());

      add(
        "encumbered",
        "KG",
        ratio > 0.94 ? "Overloaded" : "Encumbered",
        `${game.inventoryWeight().toFixed(1)} / ${game.maxWeight()} kg carried`,
        ratio > 0.94 ? 3 : ratio > 0.84 ? 2 : ratio > 0.73 ? 1 : 0,
        "#c99b65"
      );
    }

    const condition = currentWeaponCondition(game);
    const weaponId = player.equipped;

    add(
      "weapon",
      "WR",
      condition < 18 ? "Weapon failing" : "Weapon worn",
      `${WEAPON_NAMES[weaponId] || "Weapon"} condition ${Math.round(condition)}%`,
      condition < 18 ? 3 : condition < 35 ? 2 : condition < 55 ? 1 : 0,
      "#b77d5d"
    );

    return moodles.slice(0, 8);
  }

  function renderMoodles(game) {
    const root = document.getElementById("hcMoodles");
    if (!root) return;

    root.replaceChildren();

    for (const moodle of moodlesFor(game)) {
      const row = document.createElement("div");
      row.className = "hc-moodle";
      row.dataset.level = String(moodle.level);
      row.style.setProperty("--moodle", moodle.color);
      row.title = `${moodle.label}: ${moodle.detail}`;
      row.innerHTML = `
        <span class="hc-moodle-icon">${moodle.icon}</span>
        <span class="hc-moodle-copy"><b>${moodle.label}</b><small>${moodle.detail}</small></span>
      `;
      root.append(row);
    }
  }

  function conditionColor(condition) {
    return condition < 20
      ? "#c74f47"
      : condition < 45
        ? "#c79054"
        : "#839c72";
  }

  function renderConditionWidget(game) {
    const widget = document.getElementById("hcConditionWidget");
    const weaponId = game.player?.equipped;

    if (!widget) return;

    if (!ALL_WEAPONS.has(weaponId) || state.activeCar) {
      widget.classList.add("hidden");
      return;
    }

    const condition = currentWeaponCondition(game);
    const survival = ensurePlayerState(game);
    const jammed = survival.jams[weaponId];

    widget.classList.remove("hidden");
    document.getElementById("hcConditionName").textContent =
      jammed ? "JAMMED · PRESS R" : WEAPON_NAMES[weaponId];
    document.getElementById("hcConditionValue").textContent =
      `${Math.round(condition)}%`;

    const bar = document.getElementById("hcConditionBar");
    bar.style.width = `${condition}%`;
    bar.style.background = conditionColor(condition);
  }

  function renderVehicleUi(game) {
    const hud = document.getElementById("hcVehicleHud");
    const prompt = document.getElementById("hcVehiclePrompt");

    if (!hud || !prompt) return;

    if (state.activeCar) {
      const car = state.activeCar;
      const info = ensureVehicle(game, car);
      const mph = Math.round(Math.abs(info.speed) * 0.22);

      hud.classList.remove("hidden");
      prompt.classList.add("hidden");
      document.getElementById("hcVehicleName").textContent =
        titleCase(car.kind || "vehicle");
      document.getElementById("hcVehicleSpeed").textContent = String(mph);
      document.getElementById("hcVehicleFuel").textContent = `${Math.round(info.fuel)}%`;
      document.getElementById("hcVehicleCondition").textContent = `${Math.round(info.condition)}%`;

      const fuelBar = document.getElementById("hcVehicleFuelBar");
      fuelBar.style.width = `${info.fuel}%`;
      fuelBar.style.background = info.fuel < 18 ? "#c05248" : "#b4a65e";

      const conditionBar = document.getElementById("hcVehicleConditionBar");
      conditionBar.style.width = `${info.condition}%`;
      conditionBar.style.background = conditionColor(info.condition);
      return;
    }

    hud.classList.add("hidden");

    const car = nearestVehicle(game, 65);

    if (car && game.mode === "playing" && !game.panelOpen) {
      const info = ensureVehicle(game, car);
      prompt.textContent =
        `V  ENTER ${titleCase(car.kind || "vehicle")} · FUEL ${Math.round(info.fuel)}%`;
      prompt.classList.remove("hidden");
    } else {
      prompt.classList.add("hidden");
    }
  }

  function renderActionProgress(game) {
    const root = document.getElementById("hcActionProgress");
    if (!root) return;

    let label = null;
    let progress = 0;

    if (state.forageTimer > 0) {
      label = "FORAGING";
      progress = 1 - state.forageTimer / state.forageTotal;
    } else {
      const survival = ensurePlayerState(game);

      if (survival?.clearingJam) {
        label = "CLEARING JAM";
        const total = Math.max(
          0.55,
          1.35 - skillLevel(game, "reloading") * 0.07
        );
        progress = 1 - survival.clearingJam.timer / total;
      } else if (survival?.resting) {
        label = "RESTING — MOVE TO CANCEL";
        progress = 1 - survival.fatigue / 100;
      }
    }

    if (!label) {
      root.classList.add("hidden");
      return;
    }

    root.classList.remove("hidden");
    document.getElementById("hcActionLabel").textContent = label;
    document.getElementById("hcActionBar").style.width =
      `${clamp(progress * 100, 0, 100)}%`;
  }

  function decorateHotbar(game) {
    const hotbar = document.getElementById("hotbar");
    const survival = ensurePlayerState(game);
    if (!hotbar || !survival) return;

    [...hotbar.children].forEach((slot, index) => {
      const weaponId = game.player.hotbar?.[index];
      slot.style.position = "relative";
      slot.querySelector(".hc-hotbar-condition")?.remove();

      if (!ALL_WEAPONS.has(weaponId)) return;

      const condition = survival.weaponCondition[weaponId];
      const bar = document.createElement("span");
      bar.className = "hc-hotbar-condition";
      bar.innerHTML = `<i style="width:${condition}%;background:${conditionColor(condition)}"></i>`;
      slot.append(bar);
      slot.title =
        `${WEAPON_NAMES[weaponId]} · ${Math.round(condition)}% condition` +
        (survival.jams[weaponId] ? " · JAMMED" : "");
    });
  }

  function updateDeepUi(game) {
    renderMoodles(game);
    renderConditionWidget(game);
    renderVehicleUi(game);
    renderActionProgress(game);
    decorateHotbar(game);
    updateInventoryTabIndicators(game);

    if (
      game.panelOpen === "inventoryPanel" &&
      state.inventoryTab === "health"
    ) {
      renderHealthPanel(game);
    } else if (
      game.panelOpen === "inventoryPanel" &&
      state.inventoryTab === "skills"
    ) {
      renderSkillsPanel(game);
    } else if (
      game.panelOpen === "inventoryPanel" &&
      state.inventoryTab === "vehicle"
    ) {
      renderVehiclePanel(game);
    }
  }

  function installPanelHooks(game) {
    if (typeof game.openPanel === "function") {
      const original = game.openPanel.bind(game);

      game.openPanel = function (id, ...args) {
        const result = original(id, ...args);

        if (id === "inventoryPanel") {
          createGameUi(this);
          selectInventoryTab(this, state.inventoryTab);
        }

        return result;
      };
    }

    if (typeof game.closePanel === "function") {
      const original = game.closePanel.bind(game);

      game.closePanel = function (id, ...args) {
        const result = original(id, ...args);
        if (id === "inventoryPanel") state.customPanel = null;
        return result;
      };
    }

    if (typeof game.closeAllPanels === "function") {
      const original = game.closeAllPanels.bind(game);

      game.closeAllPanels = function (...args) {
        const result = original(...args);
        state.customPanel = null;
        return result;
      };
    }

    if (typeof game.showMenu === "function") {
      const original = game.showMenu.bind(game);

      game.showMenu = function (...args) {
        closeCustomPanel(this);
        return original(...args);
      };
    }
  }

  function installStartSaveHooks(game) {
    if (typeof game.startNew === "function") {
      const original = game.startNew.bind(game);

      game.startNew = function (...args) {
        const result = original(...args);

        ensurePlayerState(this, true);
        state.activeCar = null;
        state.inventoryTab = "items";
        state.customPanel = null;
        state.forageTimer = 0;
        loadVehicles(this, true);
        createGameUi(this);
        updateDeepUi(this);
        this.saveGame?.();
        this.toast?.(
          `${occupationFor(ensurePlayerState(this)).name} profile ready. Health, skills and vehicles enabled.`
        );
        return result;
      };
    }

    if (typeof game.loadSaved === "function") {
      const original = game.loadSaved.bind(game);

      game.loadSaved = function (...args) {
        const result = original(...args);

        if (this.player && this.world) {
          ensurePlayerState(this);
          state.forageTimer = 0;
          loadVehicles(this, false);
          createGameUi(this);
          updateDeepUi(this);
        }

        return result;
      };
    }

    if (typeof game.saveGame === "function") {
      const original = game.saveGame.bind(game);

      game.saveGame = function (...args) {
        const result = original(...args);
        saveVehicles(this);
        return result;
      };
    }

    if (typeof game.die === "function") {
      const original = game.die.bind(game);

      game.die = function (...args) {
        if (state.activeCar) {
          ensureVehicle(this, state.activeCar).engine = false;
          ensureVehicle(this, state.activeCar).speed = 0;
        }
        saveVehicles(this);
        return original(...args);
      };
    }
  }

  function installMedicalHooks(game) {
    if (typeof game.useInventoryItem !== "function") return;

    const original = game.useInventoryItem.bind(game);

    game.useInventoryItem = function (index) {
      const entry = this.player?.inventory?.[index];
      const survival = ensurePlayerState(this);

      if (!entry || !survival) {
        return original(index);
      }

      if (
        entry.id === "bandage" &&
        survival.wounds.length > 0
      ) {
        return treatWound(this, null, "bandage");
      }

      if (
        entry.id === "disinfectant" &&
        survival.wounds.length > 0
      ) {
        return treatWound(this, null, "disinfectant");
      }

      if (entry.id === "painkillers") {
        return usePainkillers(this);
      }

      return original(index);
    };
  }

  function installMovementHooks(game) {
    if (typeof game.updatePlayer !== "function") return;

    const original = game.updatePlayer.bind(game);

    game.updatePlayer = function (dt) {
      const input = this.input;
      const originalMovement = input.movement.bind(input);
      const movement = originalMovement();
      const survival = ensurePlayerState(this);

      if (state.activeCar) {
        input.movement = () => ({ x: 0, y: 0 });

        try {
          original(dt);
        } finally {
          input.movement = originalMovement;
        }

        updateVehicle(this, dt, movement);
        return;
      }

      const inputStrength = Math.hypot(
        movement.x || 0,
        movement.y || 0
      );

      if (
        survival.resting &&
        inputStrength > 0.08
      ) {
        survival.resting = false;
        this.toast?.("Rest interrupted by movement.");
      }

      const modifier = survival.resting
        ? 0
        : movementPenalty(this);

      input.movement = () => ({
        x: (movement.x || 0) * modifier,
        y: (movement.y || 0) * modifier
      });

      const staminaBefore = this.player.stamina;

      try {
        original(dt);
      } finally {
        input.movement = originalMovement;
      }

      const staminaChange = this.player.stamina - staminaBefore;
      const fitness = skillLevel(this, "fitness");

      if (staminaChange < 0) {
        this.player.stamina = Math.min(
          100,
          this.player.stamina +
            Math.abs(staminaChange) * fitness * 0.025
        );
      } else if (staminaChange > 0) {
        this.player.stamina = Math.min(
          100,
          this.player.stamina +
            staminaChange * fitness * 0.018
        );
      }

      if (survival.fatigue > 84) {
        this.player.stamina = Math.min(
          this.player.stamina,
          72
        );
      }
    };
  }

  function installCombatHooks(game) {
    if (typeof game.attack === "function") {
      const original = game.attack.bind(game);

      game.attack = function (...args) {
        const survival = ensurePlayerState(this);
        const weaponId = this.player?.equipped;

        if (state.activeCar) {
          this.toast?.("You cannot attack while driving.");
          return;
        }

        if (survival.resting) {
          survival.resting = false;
        }

        if (survival.clearingJam) return;

        if (
          FIREARMS.has(weaponId) &&
          survival.jams[weaponId]
        ) {
          this.toast?.(
            `${WEAPON_NAMES[weaponId]} is jammed. Press R.`,
            "danger"
          );
          return;
        }

        if (
          ALL_WEAPONS.has(weaponId) &&
          survival.weaponCondition[weaponId] <= 0
        ) {
          this.toast?.("That weapon is broken.", "danger");
          return;
        }

        const cooldown = this.player.attackCooldown || 0;
        const animation = this.player.attackAnim || 0;
        const effectCount = this.effects?.length || 0;
        const result = original(...args);

        const attacked =
          (this.player.attackCooldown || 0) > cooldown + 0.01 ||
          (this.player.attackAnim || 0) > animation + 0.01 ||
          (this.effects?.length || 0) > effectCount;

        if (attacked && ALL_WEAPONS.has(weaponId)) {
          wearWeapon(this, weaponId);

          if (FIREARMS.has(weaponId)) {
            gainSkill(this, "aiming", 0.72);
          } else {
            gainSkill(this, "strength", HEAVY_WEAPONS.has(weaponId) ? 0.48 : 0.25);
            gainSkill(this, "maintenance", 0.1);
          }
        }

        return result;
      };
    }

    if (typeof game.traceShot === "function") {
      const original = game.traceShot.bind(game);

      game.traceShot = function (angle, weapon) {
        const survival = ensurePlayerState(this);
        const aiming = skillLevel(this, "aiming");
        const desired = Math.atan2(
          this.player.facingY,
          this.player.facingX
        );

        let difference = Math.atan2(
          Math.sin(angle - desired),
          Math.cos(angle - desired)
        );

        const control = clamp(
          1.14 - aiming * 0.065,
          0.45,
          1.14
        );

        difference *= control;

        const armInjury = survival.wounds
          .filter(wound => wound.part.endsWith("arm"))
          .reduce((sum, wound) => sum + wound.severity, 0);

        const sway =
          survival.panic * 0.00022 +
          survival.pain * 0.00014 +
          Math.max(0, survival.fatigue - 45) * 0.00012 +
          armInjury * 0.012;

        const adjusted =
          desired + difference +
          (Math.random() - 0.5) * sway * 2;

        return original(adjusted, weapon);
      };
    }

    if (typeof game.damageZombie === "function") {
      const original = game.damageZombie.bind(game);

      game.damageZombie = function (
        zombie,
        amount,
        knockX,
        knockY,
        source
      ) {
        const playerSource =
          source === undefined ||
          source === this.player;

        const weaponId = this.player?.equipped;
        const survival = ensurePlayerState(this);
        let adjusted = amount;

        if (
          playerSource &&
          !state.vehicleImpact &&
          ALL_WEAPONS.has(weaponId)
        ) {
          const condition =
            survival.weaponCondition[weaponId] / 100;

          if (FIREARMS.has(weaponId)) {
            adjusted *=
              (0.93 + skillLevel(this, "aiming") * 0.012) *
              clamp(0.72 + condition * 0.28, 0.72, 1);
          } else {
            adjusted *=
              (0.9 + skillLevel(this, "strength") * 0.035) *
              (occupationFor(survival).melee || 1) *
              (traitFor(survival).melee || 1) *
              clamp(0.62 + condition * 0.38, 0.62, 1);
          }
        }

        const healthBefore = zombie?.health || 0;
        const result = original(
          zombie,
          adjusted,
          knockX,
          knockY,
          source
        );

        if (
          playerSource &&
          healthBefore > (zombie?.health || healthBefore) &&
          !state.vehicleImpact
        ) {
          gainSkill(
            this,
            FIREARMS.has(weaponId) ? "aiming" : "strength",
            zombie?.dead ? 2.2 : 0.35
          );
        }

        return result;
      };
    }

    if (typeof game.zombieAttack === "function") {
      const original = game.zombieAttack.bind(game);

      game.zombieAttack = function (zombie, target = this.player) {
        if (target === this.player && state.activeCar) {
          const info = ensureVehicle(this, state.activeCar);
          zombie.attackCooldown = 0.72 + Math.random() * 0.35;
          zombie.attackAnim = 0.42;
          info.condition = Math.max(
            0,
            info.condition -
              (zombie.archetype === "brute" ? 2.4 : 0.55)
          );
          this.emitNoise?.(
            state.activeCar.x,
            state.activeCar.y,
            105,
            "zombie hitting vehicle"
          );

          if (info.condition <= 0) {
            info.engine = false;
            info.speed = 0;
            this.toast?.("The dead have disabled the vehicle.", "danger");
          }
          return;
        }

        const health = target?.health || 0;
        const infection = target?.infection || 0;
        const result = original(zombie, target);

        if (
          target === this.player &&
          target.health < health
        ) {
          createWound(
            this,
            zombie,
            health - target.health,
            Math.max(0, target.infection - infection)
          );
        }

        return result;
      };
    }
  }

  function installInventoryCraftHooks(game) {
    if (typeof game.makeItemRow === "function") {
      const original = game.makeItemRow.bind(game);

      game.makeItemRow = function (entry, item) {
        const row = original(entry, item);

        if (ALL_WEAPONS.has(entry?.id)) {
          const survival = ensurePlayerState(this);
          const condition = survival.weaponCondition[entry.id];
          const bar = document.createElement("span");
          bar.className = "hc-item-condition";
          bar.title = `${Math.round(condition)}% condition`;
          bar.innerHTML = `<i style="width:${condition}%;background:${conditionColor(condition)}"></i>`;
          row.append(bar);
        }

        return row;
      };
    }

    if (typeof game.updateHotbar === "function") {
      const original = game.updateHotbar.bind(game);

      game.updateHotbar = function (...args) {
        const result = original(...args);
        decorateHotbar(this);
        return result;
      };
    }

    if (typeof game.craft === "function") {
      const original = game.craft.bind(game);

      game.craft = function (id) {
        const bandages = this.itemCount?.("bandage") || 0;
        const result = original(id);

        if (
          id === "rough_bandage" &&
          (this.itemCount?.("bandage") || 0) > bandages
        ) {
          gainSkill(this, "first_aid", 3.5);
        }

        return result;
      };
    }

    if (typeof game.tryPlaceStructure === "function") {
      const original = game.tryPlaceStructure.bind(game);

      game.tryPlaceStructure = function (...args) {
        const count = this.structures?.length || 0;
        const result = original(...args);

        if ((this.structures?.length || 0) > count) {
          const structure = this.structures.at(-1);
          const carpentry = skillLevel(this, "carpentry");

          if (structure?.type === "barricade") {
            const boost = 1 + carpentry * 0.09;
            structure.maxHp = Math.round((structure.maxHp || 110) * boost);
            structure.hp = structure.maxHp;
            gainSkill(this, "carpentry", 16);
          } else {
            gainSkill(this, "carpentry", 7);
          }
        }

        return result;
      };
    }
  }

  function installVehicleRenderHooks(game) {
    if (typeof game.drawCars === "function") {
      const original = game.drawCars.bind(game);

      game.drawCars = function (ctx, shakeX, shakeY) {
        const cars = this.world?.cars || [];
        const custom = cars.filter(car =>
          car === state.activeCar ||
          car.deepVehicle?.moved
        );

        if (custom.length === 0) {
          return original(ctx, shakeX, shakeY);
        }

        const customSet = new Set(custom);
        this.world.cars = cars.filter(car => !customSet.has(car));

        try {
          original(ctx, shakeX, shakeY);
        } finally {
          this.world.cars = cars;
        }

        for (const car of custom) {
          drawDeepVehicle(ctx, this, car, shakeX, shakeY);
        }
      };
    }

    if (typeof game.drawPlayer === "function") {
      const original = game.drawPlayer.bind(game);

      game.drawPlayer = function (...args) {
        if (state.activeCar) return;
        return original(...args);
      };
    }

    if (typeof game.updateWorldStreaming === "function") {
      const original = game.updateWorldStreaming.bind(game);

      game.updateWorldStreaming = function (...args) {
        const result = original(...args);
        applyVehicleRecords(this);
        return result;
      };
    }
  }

  function installUpdateHook(game) {
    if (typeof game.update !== "function") return;

    const original = game.update.bind(game);

    game.update = function (dt) {
      const healthBefore = this.player?.health || 0;
      state.recentWoundTimer = Math.max(
        0,
        state.recentWoundTimer - dt
      );

      const result = original(dt);

      if (!this.player || this.mode !== "playing") {
        return result;
      }

      const unexplainedDamage =
        healthBefore - this.player.health;

      if (
        unexplainedDamage > 3 &&
        state.recentWoundTimer <= 0.08 &&
        !state.activeCar
      ) {
        createWound(
          this,
          null,
          unexplainedDamage,
          0,
          "gunshot"
        );
      }

      updateWounds(this, dt);
      updateNeeds(this, dt);
      updateMovementXp(this, dt);
      updateForaging(this, dt);

      const survival = ensurePlayerState(this);

      if (this.player.gunReload) {
        const reload = this.player.gunReload;
        const reloading = skillLevel(this, "reloading");

        reload.timer -= dt * reloading * 0.035;
        state.lastReload = reload.weaponId;
      } else if (state.lastReload) {
        gainSkill(this, "reloading", 5.5);
        state.lastReload = null;
      }

      if (survival.clearingJam) {
        this.player.gunReload = null;
      }

      if (
        survival.sickness > 78 ||
        survival.temperature < 34.7 ||
        survival.temperature > 40.2
      ) {
        this.player.health = Math.max(
          0,
          this.player.health - dt * 0.075
        );
      }

      state.uiTimer -= dt;
      state.conditionTimer -= dt;

      if (state.uiTimer <= 0) {
        state.uiTimer = 0.22;
        updateDeepUi(this);
      }

      if (state.conditionTimer <= 0) {
        state.conditionTimer = 2.5;
        saveVehicles(this);
      }

      return result;
    };
  }

  function installKeyHooks(game) {
    window.addEventListener("keydown", event => {
      if (
        event.repeat ||
        event.ctrlKey ||
        event.metaKey ||
        event.altKey ||
        ["INPUT", "TEXTAREA", "SELECT"].includes(
          document.activeElement?.tagName
        )
      ) {
        return;
      }

      const key = event.key.toLowerCase();

      if (!["h", "k", "v", "f", "q", "r"].includes(key)) {
        return;
      }

      if (!game.player || game.mode !== "playing") return;

      if (key === "h") {
        event.preventDefault();
        toggleCustomPanel(game, "hcHealthPanel");
      } else if (key === "k") {
        event.preventDefault();
        toggleCustomPanel(game, "hcSkillsPanel");
      } else if (key === "v") {
        event.preventDefault();
        toggleVehicle(game);
      } else if (key === "f") {
        event.preventDefault();
        beginForaging(game);
      } else if (key === "q") {
        event.preventDefault();
        shout(game);
      } else if (key === "r") {
        const survival = ensurePlayerState(game);
        const weaponId = game.player.equipped;

        if (survival.jams[weaponId]) {
          event.preventDefault();
          beginClearJam(game);
        }
      }
    });
  }

  function install(game) {
    if (!game || game[INSTALL_FLAG]) return;

    game[INSTALL_FLAG] = true;
    state.game = game;

    addStyles();
    createProfilePicker();
    createGameUi(game);
    installPanelHooks(game);
    installStartSaveHooks(game);
    installMedicalHooks(game);
    installMovementHooks(game);
    installCombatHooks(game);
    installInventoryCraftHooks(game);
    installVehicleRenderHooks(game);
    installUpdateHook(game);
    installKeyHooks(game);

    if (game.player && game.world) {
      ensurePlayerState(game);
      loadVehicles(game, false);
      updateDeepUi(game);
    }

    game.toast?.(
      "Deep Survival Overhaul loaded: wounds, moodles, skills, traits, durability and vehicles."
    );
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
