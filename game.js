(() => {
  // hollow-county/src/data.js
  var ITEMS = Object.freeze({
    canned_beans: { name: "Canned beans", icon: "CAN", kind: "food", hunger: 32, weight: 0.5, maxStack: 4, description: "Heavy, safe, and still sealed." },
    crackers: { name: "Crackers", icon: "BOX", kind: "food", hunger: 18, thirst: -3, weight: 0.2, maxStack: 6, description: "Dry food that keeps for years." },
    jerky: { name: "Beef jerky", icon: "MEAT", kind: "food", hunger: 24, thirst: -5, weight: 0.2, maxStack: 5, description: "Salty, but packed with energy." },
    water: { name: "Water bottle", icon: "H2O", kind: "drink", thirst: 42, weight: 0.7, maxStack: 3, description: "Clean drinking water." },
    soda: { name: "Warm soda", icon: "POP", kind: "drink", thirst: 24, stamina: 16, weight: 0.4, maxStack: 3, description: "Flat, sugary, useful." },
    bandage: { name: "Sterile bandage", icon: "+", kind: "medical", health: 28, infection: -3, weight: 0.1, maxStack: 5, description: "Stops bleeding and protects a wound." },
    painkillers: { name: "Painkillers", icon: "PILL", kind: "medical", health: 12, stamina: 18, weight: 0.1, maxStack: 3, description: "Keeps you moving through the pain." },
    disinfectant: { name: "Disinfectant", icon: "MED", kind: "medical", infection: -12, weight: 0.3, maxStack: 2, description: "May slow an infected wound." },
    rag: { name: "Clean rag", icon: "RAG", kind: "material", weight: 0.1, maxStack: 8, description: "Useful for rough bandages." },
    plank: { name: "Wood plank", icon: "WOOD", kind: "material", weight: 1.6, maxStack: 6, description: "Building material for barricades." },
    nails: { name: "Box of nails", icon: "NAIL", kind: "material", weight: 0.2, maxStack: 8, description: "A handful of salvaged nails." },
    scrap: { name: "Metal scrap", icon: "SCRP", kind: "material", weight: 0.8, maxStack: 6, description: "Bent metal with a few uses left." },
    knife: { name: "Kitchen knife", icon: "KNF", kind: "weapon", mode: "melee", damage: 14, range: 46, cooldown: 0.4, noise: 22, staminaCost: 8, weight: 0.6, maxStack: 1, description: "Fast and quiet, but dangerously close." },
    hammer: { name: "Claw hammer", icon: "HAM", kind: "weapon", mode: "melee", damage: 20, range: 51, cooldown: 0.5, noise: 39, staminaCost: 10, weight: 0.9, maxStack: 1, description: "A compact tool with a vicious backswing." },
    bat: { name: "Baseball bat", icon: "BAT", kind: "weapon", mode: "melee", damage: 22, range: 58, cooldown: 0.62, noise: 42, staminaCost: 13, weight: 1.4, maxStack: 1, description: "Reliable blunt force." },
    axe: { name: "Fire axe", icon: "AXE", kind: "weapon", mode: "melee", damage: 36, range: 62, cooldown: 0.82, noise: 48, staminaCost: 17, weight: 2.2, maxStack: 1, description: "Heavy, exhausting, devastating." },
    machete: { name: "Brush machete", icon: "MCH", kind: "weapon", mode: "melee", damage: 28, range: 66, cooldown: 0.56, noise: 34, staminaCost: 11, weight: 1, maxStack: 1, description: "A long, fast blade made for clearing more than brush." },
    katana: { name: "Display katana", icon: "KTN", kind: "weapon", mode: "melee", damage: 38, range: 74, cooldown: 0.7, noise: 31, staminaCost: 15, weight: 1.3, maxStack: 1, description: "Rare, balanced, and sharper than it has any right to be." },
    crowbar: { name: "Steel crowbar", icon: "BAR", kind: "weapon", mode: "melee", damage: 24, range: 63, cooldown: 0.68, noise: 50, staminaCost: 14, weight: 1.7, maxStack: 1, description: "Heavy steel with a useful hooked end." },
    spear: { name: "Salvaged spear", icon: "SPR", kind: "weapon", mode: "melee", damage: 30, range: 88, cooldown: 0.74, noise: 34, staminaCost: 14, weight: 2, maxStack: 1, description: "Keeps teeth farther away than most tools." },
    sledgehammer: { name: "Sledgehammer", icon: "SLG", kind: "weapon", mode: "melee", damage: 44, range: 68, cooldown: 1.05, noise: 62, staminaCost: 22, weight: 4.5, maxStack: 1, description: "Awful to carry. Worse to stand in front of." },
    pistol: { name: "9 mm pistol", icon: "9MM", kind: "weapon", mode: "ranged", damage: 42, range: 560, cooldown: 0.32, noise: 520, ammo: "ammo9", weight: 1.1, maxStack: 1, description: "Accurate enough. Every shot calls the dead." },
    revolver: { name: ".357 revolver", icon: "357", kind: "weapon", mode: "ranged", damage: 58, range: 650, cooldown: 0.48, noise: 650, ammo: "ammo9", weight: 1.3, maxStack: 1, description: "Slow, loud, and brutally dependable." },
    smg: { name: "9 mm submachine gun", icon: "SMG", kind: "weapon", mode: "ranged", damage: 21, range: 460, cooldown: 0.12, noise: 520, spread: 0.065, ammo: "ammo9", automatic: true, weight: 2.6, maxStack: 1, description: "Automatic fire trades ammunition for breathing room." },
    shotgun: { name: "Pump shotgun", icon: "12G", kind: "weapon", mode: "ranged", damage: 32, pellets: 6, spread: 0.18, range: 390, cooldown: 0.95, noise: 760, ammo: "shell", weight: 3.2, maxStack: 1, description: "A room clearer and horde caller." },
    double_barrel: { name: "Double-barrel shotgun", icon: "DBL", kind: "weapon", mode: "ranged", damage: 38, pellets: 7, spread: 0.22, range: 360, cooldown: 1.12, noise: 820, ammo: "shell", weight: 3.5, maxStack: 1, description: "Two old barrels built for one brutal answer." },
    rifle: { name: "Hunting rifle", icon: "RFL", kind: "weapon", mode: "ranged", damage: 72, range: 830, cooldown: 0.82, noise: 860, spread: 0.018, ammo: "rifle_round", weight: 3.6, maxStack: 1, description: "Long reach and stopping power at a terrible volume." },
    carbine: { name: "Patrol carbine", icon: "CAR", kind: "weapon", mode: "ranged", damage: 46, range: 690, cooldown: 0.24, noise: 720, spread: 0.028, ammo: "rifle_round", weight: 3.1, maxStack: 1, description: "Fast follow-up shots in a compact sheriff-department rifle." },
    machine_pistol: { name: "Machine pistol", icon: "MP9", kind: "weapon", mode: "ranged", gunType: "machine_pistol", damage: 18, range: 430, cooldown: 0.085, noise: 545, spread: 0.078, ammo: "ammo9", automatic: true, weight: 1.5, maxStack: 1, description: "A compact automatic sidearm. Easy to carry and difficult to control." },
    assault_rifle: { name: "5.56 assault rifle", icon: "AR", kind: "weapon", mode: "ranged", gunType: "assault_rifle", damage: 35, range: 760, cooldown: 0.145, noise: 790, spread: 0.033, ammo: "ammo556", automatic: true, weight: 3.4, maxStack: 1, description: "A select-fire patrol rifle with reach, volume, and a hungry magazine." },
    lever_rifle: { name: "Lever-action rifle", icon: "LEV", kind: "weapon", mode: "ranged", gunType: "lever_rifle", damage: 66, range: 810, cooldown: 0.68, noise: 835, spread: 0.019, ammo: "rifle_round", weight: 3.5, maxStack: 1, description: "An old county rifle with a hard-hitting round and deliberate action." },
    ammo9: { name: "9 mm rounds", icon: "9MM", kind: "ammo", weight: 0.03, maxStack: 30, description: "Pistol ammunition." },
    shell: { name: "12-gauge shells", icon: "12G", kind: "ammo", weight: 0.06, maxStack: 16, description: "Shotgun ammunition." },
    rifle_round: { name: ".308 rifle rounds", icon: "308", kind: "ammo", weight: 0.05, maxStack: 20, description: "Hunting-rifle ammunition." },
    ammo556: { name: "5.56 rounds", icon: "556", kind: "ammo", weight: 0.04, maxStack: 30, description: "Boxed intermediate-rifle ammunition." },
    backpack: { name: "Hiking backpack", icon: "PACK", kind: "gear", capacity: 12, weight: 0.8, maxStack: 1, description: "Adds 12 kg of carrying capacity." },
    flashlight: { name: "Flashlight", icon: "LITE", kind: "gear", light: true, weight: 0.4, maxStack: 1, description: "A narrow beam for blacked-out rooms." }
  });
  var BUILDING_TYPES = Object.freeze({
    house: { name: "Residence", color: "#5a554b", loot: "home" },
    grocery: { name: "Grocery Store", color: "#58604d", loot: "store" },
    hospital: { name: "St. Mercy Hospital", color: "#516966", loot: "medical" },
    sheriff: { name: "Sheriff Department", color: "#465966", loot: "police" },
    prison: { name: "Hollow County Prison", color: "#555e60", loot: "prison" },
    warehouse: { name: "Warehouse", color: "#615a50", loot: "tools" }
  });
  var LOOT_TABLES = Object.freeze({
    home: [
      ["canned_beans", 4],
      ["crackers", 4],
      ["water", 5],
      ["soda", 3],
      ["bandage", 2],
      ["rag", 5],
      ["knife", 2],
      ["hammer", 1.2],
      ["bat", 1],
      ["machete", 0.45],
      ["katana", 0.08],
      ["crowbar", 0.35],
      ["flashlight", 1],
      ["backpack", 0.5]
    ],
    store: [
      ["canned_beans", 7],
      ["crackers", 6],
      ["jerky", 4],
      ["water", 7],
      ["soda", 6],
      ["rag", 2],
      ["backpack", 1],
      ["machete", 0.35],
      ["ammo9", 0.7]
    ],
    medical: [
      ["bandage", 8],
      ["painkillers", 5],
      ["disinfectant", 4],
      ["rag", 4],
      ["water", 2]
    ],
    police: [
      ["pistol", 2.5],
      ["revolver", 1.1],
      ["smg", 0.45],
      ["machine_pistol", 0.25],
      ["shotgun", 0.8],
      ["double_barrel", 0.25],
      ["rifle", 0.35],
      ["carbine", 0.55],
      ["assault_rifle", 0.22],
      ["lever_rifle", 0.2],
      ["ammo9", 8],
      ["shell", 4],
      ["rifle_round", 2.5],
      ["ammo556", 2.2],
      ["bandage", 2],
      ["bat", 2],
      ["flashlight", 3]
    ],
    prison: [
      ["bat", 2.5],
      ["hammer", 1.2],
      ["crowbar", 2],
      ["machete", 1.1],
      ["sledgehammer", 0.45],
      ["pistol", 0.65],
      ["shotgun", 0.3],
      ["ammo9", 4],
      ["shell", 1.4],
      ["bandage", 2],
      ["painkillers", 1.2],
      ["water", 2],
      ["jerky", 2],
      ["rag", 4],
      ["scrap", 3],
      ["flashlight", 1.5]
    ],
    tools: [
      ["plank", 7],
      ["nails", 7],
      ["scrap", 5],
      ["axe", 1.4],
      ["hammer", 2],
      ["bat", 2],
      ["crowbar", 1.5],
      ["machete", 0.8],
      ["katana", 0.06],
      ["spear", 0.65],
      ["sledgehammer", 0.5],
      ["rifle", 0.18],
      ["lever_rifle", 0.14],
      ["double_barrel", 0.12],
      ["rifle_round", 0.7],
      ["rag", 2]
    ],
    car: [
      ["water", 2],
      ["jerky", 2],
      ["rag", 3],
      ["scrap", 4],
      ["bat", 0.8],
      ["crowbar", 0.55],
      ["revolver", 0.12],
      ["ammo9", 0.5],
      ["rifle_round", 0.18]
    ]
  });
  var RECIPES = Object.freeze({
    rough_bandage: {
      name: "Rough bandage",
      description: "Tear and fold two clean rags.",
      costs: { rag: 2 },
      gives: { bandage: 1 }
    },
    barricade: {
      name: "Wood barricade",
      description: "Place a wall that slows the dead.",
      costs: { plank: 2, nails: 1 },
      build: "barricade"
    },
    noise_trap: {
      name: "Noise trap",
      description: "Place a timed lure made from scrap.",
      costs: { scrap: 2, nails: 1 },
      build: "noise_trap"
    }
  });
  function itemWeight(entry) {
    return (ITEMS[entry.id]?.weight ?? 0) * entry.qty;
  }

  // hollow-county/src/input.js
  var InputController = class {
    constructor(canvas, joystick, joystickThumb, onAction) {
      this.canvas = canvas;
      this.joystick = joystick;
      this.joystickThumb = joystickThumb;
      this.onAction = onAction;
      this.keys = /* @__PURE__ */ new Set();
      this.pointer = { x: 0, y: 0, down: false, active: false };
      this.joystickVector = { x: 0, y: 0 };
      this.joystickPointer = null;
      this.bind();
    }
    bind() {
      window.addEventListener("keydown", (event) => {
        const key2 = event.key.toLowerCase();
        if (["w", "a", "s", "d", "shift", "c", "e", "tab", "b", "escape", "1", "2", "3", "4", "5"].includes(key2)) {
          event.preventDefault();
        }
        if (!event.repeat) this.onAction("key", key2);
        this.keys.add(key2);
      });
      window.addEventListener("keyup", (event) => this.keys.delete(event.key.toLowerCase()));
      window.addEventListener("blur", () => {
        this.keys.clear();
        this.pointer.down = false;
        this.resetJoystick();
      });
      const point = (event) => {
        const rect = this.canvas.getBoundingClientRect();
        this.pointer.x = event.clientX - rect.left;
        this.pointer.y = event.clientY - rect.top;
        this.pointer.active = true;
      };
      this.canvas.addEventListener("pointermove", point);
      this.canvas.addEventListener("pointerdown", (event) => {
        point(event);
        this.pointer.down = true;
        this.canvas.setPointerCapture?.(event.pointerId);
        this.onAction("attack", true);
      });
      this.canvas.addEventListener("pointerup", (event) => {
        point(event);
        this.pointer.down = false;
        this.onAction("attack", false);
      });
      this.canvas.addEventListener("pointercancel", () => {
        this.pointer.down = false;
      });
      this.canvas.addEventListener("contextmenu", (event) => event.preventDefault());
      this.joystick.addEventListener("pointerdown", (event) => {
        event.preventDefault();
        this.joystickPointer = event.pointerId;
        this.joystick.setPointerCapture?.(event.pointerId);
        this.updateJoystick(event);
      });
      this.joystick.addEventListener("pointermove", (event) => {
        if (event.pointerId === this.joystickPointer) this.updateJoystick(event);
      });
      const releaseJoystick = (event) => {
        if (event.pointerId === this.joystickPointer) this.resetJoystick();
      };
      this.joystick.addEventListener("pointerup", releaseJoystick);
      this.joystick.addEventListener("pointercancel", releaseJoystick);
      document.querySelectorAll("[data-action]").forEach((button) => {
        button.addEventListener("pointerdown", (event) => {
          event.preventDefault();
          this.onAction(button.dataset.action, true);
        });
        button.addEventListener("pointerup", (event) => {
          event.preventDefault();
          this.onAction(button.dataset.action, false);
        });
        button.addEventListener("pointercancel", () => this.onAction(button.dataset.action, false));
      });
    }
    updateJoystick(event) {
      const rect = this.joystick.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = event.clientX - cx;
      const dy = event.clientY - cy;
      const max = rect.width * 0.31;
      const length = Math.hypot(dx, dy) || 1;
      const scale = Math.min(1, max / length);
      const px = dx * scale;
      const py = dy * scale;
      this.joystickVector.x = px / max;
      this.joystickVector.y = py / max;
      this.joystickThumb.style.transform = `translate(${px}px, ${py}px)`;
    }
    resetJoystick() {
      this.joystickPointer = null;
      this.joystickVector.x = 0;
      this.joystickVector.y = 0;
      this.joystickThumb.style.transform = "translate(0, 0)";
    }
    movement() {
      let x = 0;
      let y = 0;
      if (this.keys.has("a") || this.keys.has("arrowleft")) x -= 1;
      if (this.keys.has("d") || this.keys.has("arrowright")) x += 1;
      if (this.keys.has("w") || this.keys.has("arrowup")) y -= 1;
      if (this.keys.has("s") || this.keys.has("arrowdown")) y += 1;
      x += this.joystickVector.x;
      y += this.joystickVector.y;
      const length = Math.hypot(x, y);
      if (length > 1) return { x: x / length, y: y / length };
      return { x, y };
    }
    get sprinting() {
      return this.keys.has("shift") || Math.hypot(this.joystickVector.x, this.joystickVector.y) > 0.92;
    }
  };

  // hollow-county/src/rng.js
  function xmur3(text) {
    let h = 1779033703 ^ text.length;
    for (let i = 0; i < text.length; i += 1) {
      h = Math.imul(h ^ text.charCodeAt(i), 3432918353);
      h = h << 13 | h >>> 19;
    }
    return () => {
      h = Math.imul(h ^ h >>> 16, 2246822507);
      h = Math.imul(h ^ h >>> 13, 3266489909);
      return (h ^= h >>> 16) >>> 0;
    };
  }
  function mulberry32(seed) {
    return () => {
      let t = seed += 1831565813;
      t = Math.imul(t ^ t >>> 15, t | 1);
      t ^= t + Math.imul(t ^ t >>> 7, t | 61);
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }
  var RNG = class {
    constructor(seed = "HOLLOW") {
      this.seed = String(seed).trim().toUpperCase() || "HOLLOW";
      this.random = mulberry32(xmur3(this.seed)());
    }
    float(min = 0, max = 1) {
      return min + this.random() * (max - min);
    }
    int(min, max) {
      return Math.floor(this.float(min, max + 1));
    }
    chance(probability) {
      return this.random() < probability;
    }
    pick(values) {
      return values[this.int(0, values.length - 1)];
    }
    shuffle(values) {
      for (let i = values.length - 1; i > 0; i -= 1) {
        const j = this.int(0, i);
        [values[i], values[j]] = [values[j], values[i]];
      }
      return values;
    }
  };
  function hash2D(x, y, seed = "HOLLOW") {
    const h = xmur3(`${seed}:${x}:${y}`)();
    return h / 4294967295;
  }
  function randomSeed() {
    const places = ["MERCY", "HOLLOW", "CINDER", "MOURNING", "BLACKWATER", "ASH", "RAVEN"];
    const suffix = Math.floor(Math.random() * 9e3 + 1e3);
    return `${places[Math.floor(Math.random() * places.length)]}-${suffix}`;
  }

  // hollow-county/src/world.js
  var TILE = Object.freeze({
    GRASS: 0,
    ROAD: 1,
    FLOOR: 2,
    WALL: 3,
    WATER: 4,
    TREE: 5
  });
  var CHUNK_SIZE = 48;
  var DEFAULT_WORLD_SIZE = CHUNK_SIZE * 96;
  var ROAD_SPACING = 24;
  var TILE_SIZE = 32;
  function tileIndex(world, x, y) {
    return y * world.width + x;
  }
  function inBounds(world, x, y) {
    return x >= 0 && y >= 0 && x < world.width && y < world.height;
  }
  function getTile(world, x, y) {
    if (!inBounds(world, x, y)) return TILE.WALL;
    if (world.chunked) {
      const cx = Math.floor(x / world.chunkSize);
      const cy = Math.floor(y / world.chunkSize);
      const chunk = world.chunks.get(`${cx},${cy}`);
      if (!chunk) return proceduralBaseTile(world, x, y);
      const lx = x - cx * world.chunkSize;
      const ly = y - cy * world.chunkSize;
      return chunk.tiles[ly * world.chunkSize + lx];
    }
    return world.tiles[tileIndex(world, x, y)];
  }
  function setTile(world, x, y, tile) {
    if (!inBounds(world, x, y)) return;
    if (world.chunked) {
      const cx = Math.floor(x / world.chunkSize);
      const cy = Math.floor(y / world.chunkSize);
      const chunk = world.chunks.get(`${cx},${cy}`);
      if (!chunk) return;
      const lx = x - cx * world.chunkSize;
      const ly = y - cy * world.chunkSize;
      chunk.tiles[ly * world.chunkSize + lx] = tile;
      return;
    }
    world.tiles[tileIndex(world, x, y)] = tile;
  }
  function isSolidTile(tile) {
    return tile === TILE.WALL || tile === TILE.WATER || tile === TILE.TREE;
  }
  function isWalkable(world, x, y) {
    return inBounds(world, x, y) && !isSolidTile(getTile(world, x, y));
  }
  function blocksSight(tile) {
    return tile === TILE.WALL || tile === TILE.TREE;
  }
  function positiveModulo(value, divisor) {
    return (value % divisor + divisor) % divisor;
  }
  function gridDistance(value, spacing = ROAD_SPACING) {
    const offset = positiveModulo(value, spacing);
    return Math.min(offset, spacing - offset);
  }
  function isRoadCenter(world, axis, value) {
    if (world.chunked) return positiveModulo(value, ROAD_SPACING) === 0;
    return (axis === "x" ? world.roadX : world.roadY).includes(value);
  }
  function proceduralBaseTile(world, x, y) {
    if (gridDistance(x) <= 1 || gridDistance(y) <= 1) return TILE.ROAD;
    const basinX = Math.floor(x / 11);
    const basinY = Math.floor(y / 11);
    const basin = hash2D(basinX, basinY, `${world.seed}:WATER`);
    const ripple = hash2D(x, y, `${world.seed}:SHORE`);
    if (basin < 0.018 && ripple < 0.76) return TILE.WATER;
    const grove = hash2D(Math.floor(x / 7), Math.floor(y / 7), `${world.seed}:GROVE`);
    const tree = hash2D(x, y, `${world.seed}:TREE`);
    if (grove > 0.76 && tree > 0.72 || tree > 0.972) return TILE.TREE;
    return TILE.GRASS;
  }
  function roadPositions(rng, size) {
    const roads = [rng.int(8, 11)];
    while (roads.at(-1) < size - 24) roads.push(roads.at(-1) + rng.int(18, 25));
    if (size - roads.at(-1) < 11) roads.pop();
    return roads;
  }
  function markRoads(world, roadX, roadY) {
    for (const x of roadX) {
      for (let y = 0; y < world.height; y += 1) {
        setTile(world, x - 1, y, TILE.ROAD);
        setTile(world, x, y, TILE.ROAD);
        setTile(world, x + 1, y, TILE.ROAD);
      }
    }
    for (const y of roadY) {
      for (let x = 0; x < world.width; x += 1) {
        setTile(world, x, y - 1, TILE.ROAD);
        setTile(world, x, y, TILE.ROAD);
        setTile(world, x, y + 1, TILE.ROAD);
      }
    }
  }
  function carvePond(world, rng) {
    const cx = rng.chance(0.5) ? rng.int(3, 18) : rng.int(world.width - 19, world.width - 4);
    const cy = rng.int(3, world.height - 4);
    const rx = rng.int(3, 7);
    const ry = rng.int(3, 7);
    for (let y = cy - ry; y <= cy + ry; y += 1) {
      for (let x = cx - rx; x <= cx + rx; x += 1) {
        const d = ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2;
        if (d + hash2D(x, y, world.seed) * 0.45 < 1.08) setTile(world, x, y, TILE.WATER);
      }
    }
  }
  function chooseBuildingType(rng, distanceFromCenter, rect) {
    const roll = rng.float();
    const major = rect.w >= 10 && rect.h >= 9;
    if (major && roll < 0.07) return "prison";
    if (major && roll < 0.18) return "hospital";
    if (rect.w >= 9 && rect.h >= 8 && roll < 0.29) return "sheriff";
    if (rect.w >= 8 && rect.h >= 7 && roll < 0.48) return "grocery";
    if (roll < 0.67) return "warehouse";
    return "house";
  }
  function weightedLoot(rng, tableName) {
    const table = LOOT_TABLES[tableName];
    const total = table.reduce((sum, [, weight]) => sum + weight, 0);
    let roll = rng.float(0, total);
    for (const [id, weight] of table) {
      roll -= weight;
      if (roll <= 0) return id;
    }
    return table.at(-1)[0];
  }
  function createLoot(rng, tableName, minimum = 1, maximum = 4) {
    const entries = [];
    for (let i = 0, count = rng.int(minimum, maximum); i < count; i += 1) {
      const id = weightedLoot(rng, tableName);
      const stackable = ITEMS[id]?.kind === "ammo" || ["nails", "rag", "plank", "scrap", "bandage"].includes(id);
      const qty = stackable ? rng.int(1, ITEMS[id]?.kind === "ammo" ? 9 : 3) : 1;
      const existing = entries.find((entry) => entry.id === id);
      if (existing) existing.qty += qty;
      else entries.push({ id, qty });
    }
    return entries;
  }
  var BUILDING_VARIANTS = Object.freeze({
    house: ["bungalow", "l_house", "ranch"],
    grocery: ["corner_market", "loading_notch", "supermarket"],
    hospital: ["cross_wing", "emergency_wing"],
    sheriff: ["station_wings", "brick_station"],
    prison: ["courtyard_block", "fortified_block"],
    warehouse: ["loading_bay", "workshop"]
  });
  function footprintIncludes(type, variant, lx, ly, w, h) {
    if (type === "house" && variant === "l_house") {
      return !(lx >= Math.max(3, Math.floor(w * 0.62)) && ly >= Math.max(3, Math.floor(h * 0.58)));
    }
    if (type === "grocery" && variant === "loading_notch") {
      return !(lx >= w - 2 && ly >= h - 2);
    }
    if (type === "hospital" && variant === "cross_wing") {
      const verticalWidth = Math.max(4, Math.floor(w * 0.48));
      const verticalStart = Math.floor((w - verticalWidth) / 2);
      const horizontalHeight = Math.max(4, Math.floor(h * 0.48));
      const horizontalStart = Math.floor((h - horizontalHeight) / 2);
      return lx >= verticalStart && lx < verticalStart + verticalWidth || ly >= horizontalStart && ly < horizontalStart + horizontalHeight;
    }
    if (type === "sheriff" && variant === "station_wings") {
      return !(ly < 2 && (lx < 2 || lx >= w - 2));
    }
    if (type === "prison" && variant === "courtyard_block" && w >= 10 && h >= 9) {
      const courtyard = lx >= 3 && lx <= w - 4 && ly >= 3 && ly <= h - 4;
      return !courtyard;
    }
    if (type === "warehouse" && variant === "workshop") {
      return !(lx >= w - 2 && ly < 2);
    }
    return true;
  }
  function closestRoadSide(world, rect) {
    const cx = rect.x + rect.w / 2;
    const cy = rect.y + rect.h / 2;
    if (world.chunked) {
      const roadX2 = Math.round(cx / ROAD_SPACING) * ROAD_SPACING;
      const roadY2 = Math.round(cy / ROAD_SPACING) * ROAD_SPACING;
      if (Math.abs(roadX2 - cx) < Math.abs(roadY2 - cy)) return roadX2 < cx ? "west" : "east";
      return roadY2 < cy ? "north" : "south";
    }
    const roadX = world.roadX.reduce((best, value) => Math.abs(value - cx) < Math.abs(best - cx) ? value : best, world.roadX[0]);
    const roadY = world.roadY.reduce((best, value) => Math.abs(value - cy) < Math.abs(best - cy) ? value : best, world.roadY[0]);
    if (Math.abs(roadX - cx) < Math.abs(roadY - cy)) return roadX < cx ? "west" : "east";
    return roadY < cy ? "north" : "south";
  }
  function doorOrientation(side) {
    return side === "north" || side === "south" ? "horizontal" : "vertical";
  }
  function addDoor(world, building, x, y, side, exterior = false, style = "wood") {
    if (!building.cellSet.has(`${x},${y}`)) return false;
    setTile(world, x, y, TILE.FLOOR);
    if (!building.doors.some((door) => door.x === x && door.y === y)) {
      const defaultOpen = !exterior;
      const maxHp = style === "steel" || style === "barred" ? 190 : style === "glass" || style === "automatic" ? 75 : 110;
      building.doors.push({
        id: `${building.id}-d${building.doors.length}`,
        buildingId: building.id,
        chunkKey: building.chunkKey,
        x,
        y,
        side,
        orientation: doorOrientation(side),
        exterior,
        style,
        defaultOpen,
        open: defaultOpen,
        broken: false,
        hp: maxHp,
        maxHp
      });
    }
    return true;
  }
  function addPartition(world, building, axis, coordinate, from, to, openings = []) {
    for (let value = from; value <= to; value += 1) {
      const x = axis === "vertical" ? coordinate : value;
      const y = axis === "vertical" ? value : coordinate;
      if (!building.cellSet.has(`${x},${y}`) || getTile(world, x, y) !== TILE.FLOOR) continue;
      setTile(world, x, y, TILE.WALL);
    }
    for (const opening of openings) {
      const x = axis === "vertical" ? coordinate : opening;
      const y = axis === "vertical" ? opening : coordinate;
      const side = axis === "vertical" ? "west" : "north";
      if (getTile(world, x, y) === TILE.WALL) addDoor(world, building, x, y, side, false, "interior");
    }
  }
  function furnishKinds(type) {
    if (type === "grocery") return ["checkout", "shelf", "shelf", "freezer", "shelf", "counter"];
    if (type === "hospital") return ["reception", "hospital_bed", "medical_cabinet", "gurney", "supply_cart", "hospital_bed"];
    if (type === "sheriff") return ["desk", "locker", "evidence_cabinet", "desk", "gun_locker"];
    if (type === "prison") return ["cell_locker", "canteen_table", "cell_locker", "medical_cabinet", "guard_desk", "crate"];
    if (type === "warehouse") return ["crate", "workbench", "crate", "tool_cabinet"];
    return ["fridge", "dresser", "cupboard", "table"];
  }
  function addBuilding(world, rng, rect, type) {
    const id = world.activeChunkKey ? `${world.activeChunkKey}-b${world.activeChunkBuildingIndex++}` : `b${world.buildings.length}`;
    const variants = BUILDING_VARIANTS[type] || ["standard"];
    const variant = rng.pick(variants);
    const building = {
      id,
      chunkKey: world.activeChunkKey || null,
      type,
      variant,
      name: BUILDING_TYPES[type].name,
      ...rect,
      doors: [],
      windows: [],
      barTiles: [],
      cells: [],
      cellSet: /* @__PURE__ */ new Set()
    };
    for (let ly = 0; ly < rect.h; ly += 1) {
      for (let lx = 0; lx < rect.w; lx += 1) {
        if (!footprintIncludes(type, variant, lx, ly, rect.w, rect.h)) continue;
        const x = rect.x + lx;
        const y = rect.y + ly;
        building.cells.push({ x, y });
        building.cellSet.add(`${x},${y}`);
        setTile(world, x, y, TILE.FLOOR);
      }
    }
    for (const cell of building.cells) {
      const boundary = [[1, 0], [-1, 0], [0, 1], [0, -1]].some(([dx, dy]) => !building.cellSet.has(`${cell.x + dx},${cell.y + dy}`));
      if (boundary) setTile(world, cell.x, cell.y, TILE.WALL);
    }
    const preferredSide = closestRoadSide(world, rect);
    const boundaryBySide = {
      north: building.cells.filter((cell) => cell.y === rect.y && getTile(world, cell.x, cell.y) === TILE.WALL),
      south: building.cells.filter((cell) => cell.y === rect.y + rect.h - 1 && getTile(world, cell.x, cell.y) === TILE.WALL),
      west: building.cells.filter((cell) => cell.x === rect.x && getTile(world, cell.x, cell.y) === TILE.WALL),
      east: building.cells.filter((cell) => cell.x === rect.x + rect.w - 1 && getTile(world, cell.x, cell.y) === TILE.WALL)
    };
    const entryCandidates = boundaryBySide[preferredSide].length ? boundaryBySide[preferredSide] : Object.values(boundaryBySide).flat();
    const centerX = rect.x + (rect.w - 1) / 2;
    const centerY = rect.y + (rect.h - 1) / 2;
    entryCandidates.sort((a, b) => Math.hypot(a.x - centerX, a.y - centerY) - Math.hypot(b.x - centerX, b.y - centerY));
    const entry = entryCandidates[0];
    const entryStyle = type === "hospital" ? "glass" : type === "grocery" ? "automatic" : type === "prison" ? "steel" : "wood";
    if (entry) {
      addDoor(world, building, entry.x, entry.y, preferredSide, true, entryStyle);
      const wideEntrance = ["hospital", "grocery", "sheriff"].includes(type);
      if (wideEntrance) {
        const adjacent = preferredSide === "north" || preferredSide === "south" ? { x: entry.x + (entry.x < centerX ? 1 : -1), y: entry.y } : { x: entry.x, y: entry.y + (entry.y < centerY ? 1 : -1) };
        if (getTile(world, adjacent.x, adjacent.y) === TILE.WALL) addDoor(world, building, adjacent.x, adjacent.y, preferredSide, true, entryStyle);
      }
      const signCandidates = boundaryBySide[preferredSide].filter((cell) => getTile(world, cell.x, cell.y) === TILE.WALL);
      signCandidates.sort((a, b) => Math.hypot(a.x - entry.x, a.y - entry.y) - Math.hypot(b.x - entry.x, b.y - entry.y));
      building.signTile = signCandidates[0] || null;
    }
    const x1 = rect.x + 1;
    const x2 = rect.x + rect.w - 2;
    const y1 = rect.y + 1;
    const y2 = rect.y + rect.h - 2;
    const midX = rect.x + Math.floor(rect.w / 2);
    const midY = rect.y + Math.floor(rect.h / 2);
    if (type === "house") {
      addPartition(world, building, "vertical", midX, y1, y2, [midY]);
      if (rect.h >= 9) addPartition(world, building, "horizontal", rect.y + Math.floor(rect.h * 0.62), x1, midX - 1, [rect.x + 2]);
    } else if (type === "grocery") {
      addPartition(world, building, "horizontal", rect.y + rect.h - 3, x1, x2, [midX]);
    } else if (type === "hospital") {
      addPartition(world, building, "vertical", midX, y1, y2, [rect.y + 2, midY, rect.y + rect.h - 3]);
      addPartition(world, building, "horizontal", midY, x1, x2, [rect.x + 2, midX, rect.x + rect.w - 3]);
    } else if (type === "sheriff") {
      const lobbyWall = rect.y + Math.min(3, rect.h - 3);
      addPartition(world, building, "horizontal", lobbyWall, x1, x2, [midX]);
      addPartition(world, building, "vertical", midX, lobbyWall + 1, y2, [Math.min(y2, lobbyWall + 2)]);
    } else if (type === "prison") {
      if (variant === "courtyard_block") {
        addDoor(world, building, midX, rect.y + 2, "north", false, "barred");
        addDoor(world, building, midX, rect.y + rect.h - 3, "south", false, "barred");
        for (const cell of building.cells) {
          const innerEdge = cell.x === rect.x + 2 || cell.x === rect.x + rect.w - 3 || cell.y === rect.y + 2 || cell.y === rect.y + rect.h - 3;
          if (innerEdge && getTile(world, cell.x, cell.y) === TILE.WALL && (cell.x + cell.y) % 2 === 0) building.barTiles.push({ x: cell.x, y: cell.y });
        }
      } else {
        addPartition(world, building, "vertical", midX, y1, y2, [rect.y + 2, midY, rect.y + rect.h - 3]);
        for (let y = rect.y + 3; y < rect.y + rect.h - 2; y += 3) {
          addPartition(world, building, "horizontal", y, x1, midX - 1, [midX - 2]);
          addPartition(world, building, "horizontal", y, midX + 1, x2, [midX + 2]);
        }
      }
    } else if (type === "warehouse") {
      addPartition(world, building, "vertical", rect.x + Math.min(3, rect.w - 3), y1, rect.y + Math.min(4, rect.h - 2), [rect.y + 2]);
    }
    const exteriorWalls = Object.values(boundaryBySide).flat().filter((cell) => getTile(world, cell.x, cell.y) === TILE.WALL);
    const desiredWindows = type === "prison" ? 4 : type === "hospital" ? 10 : type === "grocery" ? 8 : Math.max(3, Math.floor((rect.w + rect.h) / 4));
    const windowPool = rng.shuffle(exteriorWalls.filter((cell) => !building.signTile || cell.x !== building.signTile.x || cell.y !== building.signTile.y));
    for (const cell of windowPool.slice(0, Math.min(desiredWindows, windowPool.length))) {
      building.windows.push({ x: cell.x, y: cell.y, barred: type === "prison" });
    }
    const doorKeys = new Set(building.doors.map((door) => `${door.x},${door.y}`));
    const edgeFloors = building.cells.filter((cell) => {
      if (getTile(world, cell.x, cell.y) !== TILE.FLOOR || doorKeys.has(`${cell.x},${cell.y}`)) return false;
      return [[1, 0], [-1, 0], [0, 1], [0, -1]].some(([dx, dy]) => getTile(world, cell.x + dx, cell.y + dy) === TILE.WALL);
    });
    const allFloors = building.cells.filter((cell) => getTile(world, cell.x, cell.y) === TILE.FLOOR && !doorKeys.has(`${cell.x},${cell.y}`));
    const furniturePool = rng.shuffle(edgeFloors.length >= 3 ? edgeFloors : allFloors);
    const countRange = type === "hospital" ? [7, 10] : type === "grocery" ? [6, 9] : type === "prison" ? [7, 11] : type === "sheriff" ? [5, 8] : type === "warehouse" ? [4, 7] : [2, 4];
    const containerCount = Math.min(furniturePool.length, rng.int(countRange[0], countRange[1]));
    const kinds = furnishKinds(type);
    const placed = [];
    for (let i = 0; i < containerCount; i += 1) {
      const cellIndex = furniturePool.findIndex((cell2) => placed.every((other) => Math.hypot(cell2.x - other.x, cell2.y - other.y) >= 1.8));
      if (cellIndex < 0) break;
      const cell = furniturePool.splice(cellIndex, 1)[0];
      placed.push(cell);
      const wallSide = [[0, -1, "north"], [1, 0, "east"], [0, 1, "south"], [-1, 0, "west"]].find(([dx, dy]) => getTile(world, cell.x + dx, cell.y + dy) === TILE.WALL);
      const side = wallSide?.[2] || rng.pick(["north", "east", "south", "west"]);
      world.containers.push({
        id: `${id}-c${i}`,
        buildingId: id,
        chunkKey: world.activeChunkKey || null,
        x: (cell.x + 0.5) * world.tileSize,
        y: (cell.y + 0.5) * world.tileSize,
        kind: kinds[i % kinds.length],
        side,
        searched: false,
        loot: createLoot(rng, BUILDING_TYPES[type].loot, 1, ["hospital", "sheriff", "prison"].includes(type) ? 5 : 4)
      });
    }
    delete building.cellSet;
    world.buildings.push(building);
    return building;
  }
  function generateBlocks(world, rng, roadX, roadY) {
    const centerX = world.width / 2;
    const centerY = world.height / 2;
    for (let yi = 0; yi < roadY.length - 1; yi += 1) {
      for (let xi = 0; xi < roadX.length - 1; xi += 1) {
        const left = roadX[xi] + 3;
        const right = roadX[xi + 1] - 3;
        const top = roadY[yi] + 3;
        const bottom = roadY[yi + 1] - 3;
        const blockW = right - left;
        const blockH = bottom - top;
        if (blockW < 7 || blockH < 7) continue;
        const dx = (left + blockW / 2 - centerX) / centerX;
        const dy = (top + blockH / 2 - centerY) / centerY;
        const distance2 = Math.min(1, Math.hypot(dx, dy));
        const density = 0.86 - distance2 * 0.35 + hash2D(xi, yi, world.seed) * 0.18;
        if (!rng.chance(density)) continue;
        const split = blockW >= 13 && rng.chance(0.42);
        const lots = split ? [
          { x: left, y: top, w: Math.floor(blockW / 2) - 1, h: blockH },
          { x: left + Math.floor(blockW / 2) + 1, y: top, w: blockW - Math.floor(blockW / 2) - 1, h: blockH }
        ] : [{ x: left, y: top, w: blockW, h: blockH }];
        for (const lot of lots) {
          if (lot.w < 6 || lot.h < 6) continue;
          const marginX = rng.int(0, Math.min(2, lot.w - 6));
          const marginY = rng.int(0, Math.min(2, lot.h - 6));
          const w = Math.max(6, lot.w - marginX - rng.int(0, 1));
          const h = Math.max(6, lot.h - marginY - rng.int(0, 1));
          const rect = { x: lot.x + marginX, y: lot.y + marginY, w, h };
          addBuilding(world, rng, rect, chooseBuildingType(rng, distance2, rect));
        }
      }
    }
  }
  function scatterNature(world, rng) {
    const attempts = Math.floor(world.width * world.height * 0.075);
    for (let i = 0; i < attempts; i += 1) {
      const x = rng.int(1, world.width - 2);
      const y = rng.int(1, world.height - 2);
      if (getTile(world, x, y) !== TILE.GRASS) continue;
      const edge = Math.min(x, y, world.width - x, world.height - y);
      const chance = edge < 15 ? 0.82 : 0.38;
      if (rng.chance(chance)) setTile(world, x, y, TILE.TREE);
    }
  }
  function addCars(world, rng, roadX, roadY) {
    const linearScale = Math.max(1, world.width / 144);
    const count = rng.int(Math.round(18 * linearScale), Math.round(30 * linearScale));
    for (let i = 0; i < count; i += 1) {
      const vertical = rng.chance(0.5);
      const tx = vertical ? rng.pick(roadX) : rng.int(3, world.width - 4);
      const ty = vertical ? rng.int(3, world.height - 4) : rng.pick(roadY);
      if (getTile(world, tx, ty) !== TILE.ROAD) continue;
      const width = vertical ? 24 : 52;
      const height = vertical ? 52 : 24;
      world.cars.push({
        id: `car${world.cars.length}`,
        x: (tx + 0.5) * world.tileSize,
        y: (ty + 0.5) * world.tileSize,
        w: width,
        h: height,
        color: rng.pick(["#6d3732", "#374b55", "#5d5a4b", "#303536", "#6b6748"]),
        searched: false,
        loot: createLoot(rng, "car", 0, 3)
      });
    }
  }
  function findSpawn(world) {
    const cx = world.width / 2;
    const cy = world.height / 2;
    const candidates = world.buildings.filter((building2) => building2.type === "house");
    const building = (candidates.length ? candidates : world.buildings).sort((a, b) => {
      const ad = Math.hypot(a.x + a.w / 2 - cx, a.y + a.h / 2 - cy);
      const bd = Math.hypot(b.x + b.w / 2 - cx, b.y + b.h / 2 - cy);
      return ad - bd;
    })[0];
    if (building) {
      const floors = (building.cells || []).filter((cell) => getTile(world, cell.x, cell.y) === TILE.FLOOR).sort((a, b) => {
        const ad = Math.hypot(a.x - (building.x + building.w / 2), a.y - (building.y + building.h / 2));
        const bd = Math.hypot(b.x - (building.x + building.w / 2), b.y - (building.y + building.h / 2));
        return ad - bd;
      });
      const spawnCell = floors[0] || { x: building.x + Math.floor(building.w / 2), y: building.y + Math.floor(building.h / 2) };
      return {
        x: (spawnCell.x + 0.5) * world.tileSize,
        y: (spawnCell.y + 0.5) * world.tileSize,
        buildingId: building.id
      };
    }
    return { x: cx * world.tileSize, y: cy * world.tileSize, buildingId: null };
  }
  function spawnZombies(world, rng) {
    const total = Math.min(420, Math.floor(world.width * world.height / 180));
    for (let i = 0; i < total * 5 && world.zombieSpawns.length < total; i += 1) {
      const tx = rng.int(2, world.width - 3);
      const ty = rng.int(2, world.height - 3);
      if (!isWalkable(world, tx, ty)) continue;
      const x = (tx + 0.5) * world.tileSize;
      const y = (ty + 0.5) * world.tileSize;
      if (Math.hypot(x - world.spawn.x, y - world.spawn.y) < 380) continue;
      const urban = getTile(world, tx, ty) === TILE.ROAD || getTile(world, tx, ty) === TILE.FLOOR;
      if (!urban && !rng.chance(0.28)) continue;
      world.zombieSpawns.push({
        id: `z${world.zombieSpawns.length}`,
        x,
        y,
        archetype: "normal",
        speed: rng.float(32, 49),
        health: rng.int(45, 68),
        hue: rng.int(-8, 8)
      });
    }
  }
  var SURVIVOR_NAMES = ["Mara", "Eli", "June", "Darius", "Nora", "Cole", "Imani", "Wes", "Rosa", "Malik", "Tess", "Jonah"];
  var SURVIVOR_ROLES = ["scavenger", "medic", "guard", "drifter"];
  var SURVIVOR_WEAPONS = ["knife", "hammer", "bat", "machete", "pistol", "revolver", "machine_pistol", "lever_rifle"];
  function addSurvivorSpawns(world, rng, count, idPrefix, chunkKey = null, bounds = null) {
    const x0 = bounds?.x ?? 2;
    const y0 = bounds?.y ?? 2;
    const width = bounds?.w ?? world.width - 4;
    const height = bounds?.h ?? world.height - 4;
    for (let i = 0, attempts = 0; i < count && attempts < count * 20; attempts += 1) {
      const tx = x0 + rng.int(0, Math.max(0, width - 1));
      const ty = y0 + rng.int(0, Math.max(0, height - 1));
      if (!inBounds(world, tx, ty) || !isWalkable(world, tx, ty)) continue;
      const x = (tx + 0.5) * world.tileSize;
      const y = (ty + 0.5) * world.tileSize;
      if (world.spawn && Math.hypot(x - world.spawn.x, y - world.spawn.y) < 280) continue;
      const role = rng.pick(SURVIVOR_ROLES);
      const weapon = role === "guard" ? rng.pick(["pistol", "revolver", "bat", "assault_rifle"]) : role === "medic" ? rng.pick(["knife", "hammer"]) : rng.pick(SURVIVOR_WEAPONS);
      world.survivorSpawns.push({
        id: `${idPrefix}-s${i}`,
        chunkKey,
        x,
        y,
        name: SURVIVOR_NAMES[(i + rng.int(0, SURVIVOR_NAMES.length - 1)) % SURVIVOR_NAMES.length],
        role,
        weapon,
        courage: rng.float(0.28, 0.92),
        health: rng.int(72, 100),
        outfit: rng.int(0, 5)
      });
      i += 1;
    }
  }
  function generateFiniteWorld(seed, size) {
    const safeSize = Math.max(72, Math.min(512, Math.floor(size)));
    const rng = new RNG(seed);
    const world = {
      version: 2,
      seed: rng.seed,
      width: safeSize,
      height: safeSize,
      tileSize: TILE_SIZE,
      tiles: new Uint8Array(safeSize * safeSize),
      buildings: [],
      containers: [],
      cars: [],
      zombieSpawns: [],
      survivorSpawns: [],
      spawn: null,
      roadX: [],
      roadY: []
    };
    const featureScale = Math.max(1, safeSize / 144);
    for (let i = 0; i < rng.int(Math.round(2 * featureScale), Math.round(4 * featureScale)); i += 1) carvePond(world, rng);
    world.roadX = roadPositions(rng, safeSize);
    world.roadY = roadPositions(rng, safeSize);
    markRoads(world, world.roadX, world.roadY);
    generateBlocks(world, rng, world.roadX, world.roadY);
    scatterNature(world, rng);
    addCars(world, rng, world.roadX, world.roadY);
    world.spawn = findSpawn(world);
    spawnZombies(world, rng);
    addSurvivorSpawns(world, rng, Math.round(world.zombieSpawns.length * 0.3), "finite");
    return world;
  }
  function chunkCoordinates(world, tileX, tileY) {
    return {
      cx: Math.floor(tileX / world.chunkSize),
      cy: Math.floor(tileY / world.chunkSize)
    };
  }
  function chunkInBounds(world, cx, cy) {
    const max = Math.ceil(world.width / world.chunkSize);
    return cx >= 0 && cy >= 0 && cx < max && cy < max;
  }
  function restoreChunkState(world, chunk) {
    const state = world.chunkStates.get(chunk.key);
    if (!state) return;
    const containers = new Map((state.containers || []).map((entry) => [entry.id, entry]));
    for (const container of chunk.containers) Object.assign(container, containers.get(container.id) || {});
    const cars = new Map((state.cars || []).map((entry) => [entry.id, entry]));
    for (const car of chunk.cars) Object.assign(car, cars.get(car.id) || {});
    const doors = new Map((state.doors || []).map((entry) => [entry.id, entry]));
    for (const building of chunk.buildings) {
      for (const door of building.doors || []) Object.assign(door, doors.get(door.id) || {});
    }
    const cleared = new Set(state.clearedZombieIds || []);
    if (cleared.size) {
      chunk.zombieSpawns = chunk.zombieSpawns.filter((spawn) => !cleared.has(spawn.id));
      world.zombieSpawns = world.zombieSpawns.filter((spawn) => spawn.chunkKey !== chunk.key || !cleared.has(spawn.id));
    }
    const clearedSurvivors = new Set(state.clearedSurvivorIds || []);
    if (clearedSurvivors.size) {
      chunk.survivorSpawns = chunk.survivorSpawns.filter((spawn) => !clearedSurvivors.has(spawn.id));
      world.survivorSpawns = world.survivorSpawns.filter((spawn) => spawn.chunkKey !== chunk.key || !clearedSurvivors.has(spawn.id));
    }
    const survivors = new Map((state.survivors || []).map((entry) => [entry.id, entry]));
    for (const spawn of chunk.survivorSpawns) Object.assign(spawn, survivors.get(spawn.id) || {});
  }
  function addChunkCars(world, chunk, rng) {
    const count = rng.int(2, 5);
    const x0 = chunk.cx * world.chunkSize;
    const y0 = chunk.cy * world.chunkSize;
    for (let i = 0; i < count; i += 1) {
      const vertical = rng.chance(0.5);
      const localRoad = rng.pick([0, ROAD_SPACING]);
      const tx = vertical ? x0 + localRoad : x0 + rng.int(3, world.chunkSize - 4);
      const ty = vertical ? y0 + rng.int(3, world.chunkSize - 4) : y0 + localRoad;
      if (!inBounds(world, tx, ty) || getTile(world, tx, ty) !== TILE.ROAD) continue;
      const car = {
        id: `${chunk.key}-car${i}`,
        chunkKey: chunk.key,
        x: (tx + 0.5) * world.tileSize,
        y: (ty + 0.5) * world.tileSize,
        w: vertical ? 24 : 52,
        h: vertical ? 52 : 24,
        color: rng.pick(["#6d3732", "#374b55", "#5d5a4b", "#303536", "#6b6748", "#4d425c"]),
        searched: false,
        loot: createLoot(rng, "car", 0, 3)
      };
      world.cars.push(car);
    }
  }
  function addChunkZombies(world, chunk, rng) {
    const x0 = chunk.cx * world.chunkSize;
    const y0 = chunk.cy * world.chunkSize;
    const count = rng.int(5, 9);
    for (let i = 0, attempts = 0; i < count && attempts < count * 12; attempts += 1) {
      const tx = x0 + rng.int(2, world.chunkSize - 3);
      const ty = y0 + rng.int(2, world.chunkSize - 3);
      if (!inBounds(world, tx, ty) || !isWalkable(world, tx, ty)) continue;
      const x = (tx + 0.5) * world.tileSize;
      const y = (ty + 0.5) * world.tileSize;
      if (world.spawn && Math.hypot(x - world.spawn.x, y - world.spawn.y) < 360) continue;
      const roll = rng.float();
      const archetype = roll < 0.57 ? "normal" : roll < 0.7 ? "runner" : roll < 0.82 ? "crawler" : roll < 0.91 ? "bloater" : roll < 0.98 ? "brute" : "howler";
      const stats = {
        normal: { speed: [32, 48], health: [48, 72] },
        runner: { speed: [54, 70], health: [38, 56] },
        crawler: { speed: [45, 62], health: [32, 48] },
        bloater: { speed: [24, 36], health: [68, 94] },
        brute: { speed: [25, 38], health: [145, 205] },
        howler: { speed: [34, 46], health: [55, 78] }
      }[archetype];
      const spawn = {
        id: `${chunk.key}-z${i}`,
        chunkKey: chunk.key,
        x,
        y,
        archetype,
        packId: `${chunk.key}-pack${Math.floor(i / 3)}`,
        speed: rng.float(stats.speed[0], stats.speed[1]),
        health: rng.int(stats.health[0], stats.health[1]),
        hearing: rng.float(0.78, 1.35),
        sight: rng.float(0.8, 1.24),
        curiosity: rng.float(0.25, 0.95),
        aggression: rng.float(0.55, 1.25),
        hue: rng.int(-8, 8)
      };
      world.zombieSpawns.push(spawn);
      i += 1;
    }
  }
  function addChunkSurvivors(world, chunk, rng, zombieCount) {
    addSurvivorSpawns(
      world,
      rng,
      Math.round(zombieCount * 0.3),
      chunk.key,
      chunk.key,
      { x: chunk.cx * world.chunkSize + 2, y: chunk.cy * world.chunkSize + 2, w: world.chunkSize - 4, h: world.chunkSize - 4 }
    );
  }
  function generateChunk(world, cx, cy) {
    const key2 = `${cx},${cy}`;
    if (!world.chunked || !chunkInBounds(world, cx, cy)) return null;
    if (world.chunks.has(key2)) return world.chunks.get(key2);
    const chunk = {
      key: key2,
      cx,
      cy,
      tiles: new Uint8Array(world.chunkSize * world.chunkSize),
      buildings: [],
      containers: [],
      cars: [],
      zombieSpawns: [],
      survivorSpawns: []
    };
    world.chunks.set(key2, chunk);
    const x0 = cx * world.chunkSize;
    const y0 = cy * world.chunkSize;
    for (let ly = 0; ly < world.chunkSize; ly += 1) {
      for (let lx = 0; lx < world.chunkSize; lx += 1) {
        const x = x0 + lx;
        const y = y0 + ly;
        chunk.tiles[ly * world.chunkSize + lx] = inBounds(world, x, y) ? proceduralBaseTile(world, x, y) : TILE.WALL;
      }
    }
    const rng = new RNG(`${world.seed}:CHUNK:${key2}`);
    world.activeChunkKey = key2;
    world.activeChunkBuildingIndex = 0;
    const beforeBuildings = world.buildings.length;
    const beforeContainers = world.containers.length;
    const beforeCars = world.cars.length;
    const beforeZombies = world.zombieSpawns.length;
    const beforeSurvivors = world.survivorSpawns.length;
    const roadsX = [x0, x0 + ROAD_SPACING, x0 + world.chunkSize];
    const roadsY = [y0, y0 + ROAD_SPACING, y0 + world.chunkSize];
    generateBlocks(world, rng, roadsX, roadsY);
    addChunkCars(world, chunk, rng);
    addChunkZombies(world, chunk, rng);
    addChunkSurvivors(world, chunk, rng, world.zombieSpawns.length - beforeZombies);
    chunk.buildings = world.buildings.slice(beforeBuildings);
    chunk.containers = world.containers.slice(beforeContainers);
    chunk.cars = world.cars.slice(beforeCars);
    chunk.zombieSpawns = world.zombieSpawns.slice(beforeZombies);
    chunk.survivorSpawns = world.survivorSpawns.slice(beforeSurvivors);
    restoreChunkState(world, chunk);
    delete world.activeChunkKey;
    delete world.activeChunkBuildingIndex;
    return chunk;
  }
  function unloadChunk(world, key2) {
    const chunk = world.chunks.get(key2);
    if (!chunk) return;
    world.chunkStates.set(key2, {
      ...world.chunkStates.get(key2) || {},
      containers: chunk.containers.filter((entry) => entry.searched).map(({ id, searched, loot }) => ({ id, searched, loot })),
      cars: chunk.cars.filter((entry) => entry.searched).map(({ id, searched, loot }) => ({ id, searched, loot })),
      doors: chunk.buildings.flatMap((building) => (building.doors || []).filter((door) => door.open !== door.defaultOpen || door.broken || door.hp !== door.maxHp).map(({ id, open, broken, hp }) => ({ id, open, broken, hp })))
    });
    world.buildings = world.buildings.filter((entry) => entry.chunkKey !== key2);
    world.containers = world.containers.filter((entry) => entry.chunkKey !== key2);
    world.cars = world.cars.filter((entry) => entry.chunkKey !== key2);
    world.zombieSpawns = world.zombieSpawns.filter((entry) => entry.chunkKey !== key2);
    world.survivorSpawns = world.survivorSpawns.filter((entry) => entry.chunkKey !== key2);
    world.chunks.delete(key2);
  }
  function streamWorldChunks(world, tileX, tileY, loadRadius = 2, keepRadius = 3) {
    if (!world.chunked) return { added: [], removed: [], changed: false };
    const { cx, cy } = chunkCoordinates(world, tileX, tileY);
    const wanted = /* @__PURE__ */ new Set();
    const added = [];
    for (let dy = -loadRadius; dy <= loadRadius; dy += 1) {
      for (let dx = -loadRadius; dx <= loadRadius; dx += 1) {
        const nextX = cx + dx;
        const nextY = cy + dy;
        if (!chunkInBounds(world, nextX, nextY)) continue;
        const key2 = `${nextX},${nextY}`;
        wanted.add(key2);
        if (!world.chunks.has(key2)) {
          generateChunk(world, nextX, nextY);
          added.push(key2);
        }
      }
    }
    const removed = [];
    for (const [key2, chunk] of [...world.chunks]) {
      if (wanted.has(key2)) continue;
      if (Math.abs(chunk.cx - cx) <= keepRadius && Math.abs(chunk.cy - cy) <= keepRadius) continue;
      unloadChunk(world, key2);
      removed.push(key2);
    }
    world.centerChunk = `${cx},${cy}`;
    return { added, removed, changed: added.length > 0 || removed.length > 0 };
  }
  function createChunkedWorld(seed) {
    const rng = new RNG(seed);
    const world = {
      version: 4,
      seed: rng.seed,
      width: DEFAULT_WORLD_SIZE,
      height: DEFAULT_WORLD_SIZE,
      tileSize: TILE_SIZE,
      chunked: true,
      chunkSize: CHUNK_SIZE,
      chunks: /* @__PURE__ */ new Map(),
      chunkStates: /* @__PURE__ */ new Map(),
      buildings: [],
      containers: [],
      cars: [],
      zombieSpawns: [],
      survivorSpawns: [],
      spawn: null,
      roadX: [],
      roadY: []
    };
    const center = Math.floor(world.width / 2);
    streamWorldChunks(world, center, center, 2, 3);
    world.spawn = findSpawn(world);
    world.zombieSpawns = world.zombieSpawns.filter((spawn) => Math.hypot(spawn.x - world.spawn.x, spawn.y - world.spawn.y) >= 360);
    for (const chunk of world.chunks.values()) {
      chunk.zombieSpawns = chunk.zombieSpawns.filter((spawn) => world.zombieSpawns.includes(spawn));
      const desiredSurvivors = Math.round(chunk.zombieSpawns.length * 0.3);
      chunk.survivorSpawns = chunk.survivorSpawns.slice(0, desiredSurvivors);
    }
    world.survivorSpawns = [...world.chunks.values()].flatMap((chunk) => chunk.survivorSpawns);
    return world;
  }
  function generateWorld(seed, size) {
    if (Number.isFinite(size)) return generateFiniteWorld(seed, size);
    return createChunkedWorld(seed);
  }

  // hollow-county/src/pathfinding.js
  var CARDINAL = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1]
  ];
  function key(x, y) {
    return `${x},${y}`;
  }
  function heuristic(ax, ay, bx, by) {
    return Math.abs(ax - bx) + Math.abs(ay - by);
  }
  var MinHeap = class {
    constructor() {
      this.values = [];
    }
    push(node) {
      this.values.push(node);
      let i = this.values.length - 1;
      while (i > 0) {
        const parent = Math.floor((i - 1) / 2);
        if (this.values[parent].f <= node.f) break;
        this.values[i] = this.values[parent];
        i = parent;
      }
      this.values[i] = node;
    }
    pop() {
      if (!this.values.length) return null;
      const root = this.values[0];
      const tail = this.values.pop();
      if (this.values.length) {
        let i = 0;
        while (true) {
          const left = i * 2 + 1;
          const right = left + 1;
          if (left >= this.values.length) break;
          const child = right < this.values.length && this.values[right].f < this.values[left].f ? right : left;
          if (this.values[child].f >= tail.f) break;
          this.values[i] = this.values[child];
          i = child;
        }
        this.values[i] = tail;
      }
      return root;
    }
    get length() {
      return this.values.length;
    }
  };
  function findPath(world, startX, startY, goalX, goalY, maxVisited = 1800, blockingPredicate = null) {
    const sx = Math.floor(startX);
    const sy = Math.floor(startY);
    const gx = Math.floor(goalX);
    const gy = Math.floor(goalY);
    const blocked = (x, y) => isSolidTile(getTile(world, x, y)) || Boolean(blockingPredicate?.(x, y));
    if (!inBounds(world, sx, sy) || !inBounds(world, gx, gy) || blocked(gx, gy)) return [];
    if (sx === gx && sy === gy) return [{ x: gx, y: gy }];
    const open = new MinHeap();
    const cameFrom = /* @__PURE__ */ new Map();
    const gScore = /* @__PURE__ */ new Map([[key(sx, sy), 0]]);
    const closed = /* @__PURE__ */ new Set();
    open.push({ x: sx, y: sy, g: 0, f: heuristic(sx, sy, gx, gy) });
    let visited = 0;
    while (open.length && visited < maxVisited) {
      const current = open.pop();
      const currentKey = key(current.x, current.y);
      if (closed.has(currentKey)) continue;
      closed.add(currentKey);
      visited += 1;
      if (current.x === gx && current.y === gy) {
        const path = [{ x: gx, y: gy }];
        let cursor = currentKey;
        while (cameFrom.has(cursor)) {
          const previous = cameFrom.get(cursor);
          path.push({ x: previous.x, y: previous.y });
          cursor = key(previous.x, previous.y);
        }
        path.reverse();
        return path.slice(1);
      }
      for (const [dx, dy] of CARDINAL) {
        const nx = current.x + dx;
        const ny = current.y + dy;
        const nextKey = key(nx, ny);
        if (!inBounds(world, nx, ny) || closed.has(nextKey) || blocked(nx, ny)) continue;
        const tentative = current.g + 1;
        if (tentative >= (gScore.get(nextKey) ?? Infinity)) continue;
        cameFrom.set(nextKey, { x: current.x, y: current.y });
        gScore.set(nextKey, tentative);
        open.push({ x: nx, y: ny, g: tentative, f: tentative + heuristic(nx, ny, gx, gy) });
      }
    }
    return [];
  }
  function hasLineOfSight(world, ax, ay, bx, by, blockingPredicate = isSolidTile) {
    const dx = bx - ax;
    const dy = by - ay;
    const distance2 = Math.hypot(dx, dy);
    const step = world.tileSize * 0.22;
    const count = Math.max(1, Math.ceil(distance2 / step));
    for (let i = 1; i < count; i += 1) {
      const x = ax + dx * (i / count);
      const y = ay + dy * (i / count);
      const tx = Math.floor(x / world.tileSize);
      const ty = Math.floor(y / world.tileSize);
      const tile = getTile(world, tx, ty);
      if (blockingPredicate(tile, tx, ty)) return false;
    }
    return true;
  }

  // hollow-county/src/game.js
  var SAVE_KEY = "hollow-county-save-v1";
  var SAVE_VERSION = 4;
  var CAMERA_ZOOM = 1.5;
  var FISTS = { name: "Bare hands", mode: "melee", damage: 7, range: 40, cooldown: 0.48, noise: 25, staminaCost: 9 };
  var STREET_NAMES = ["Mercy", "Harrow", "Cinder", "Morrow", "Stillwater", "Rook", "Lantern", "Graves", "Hollow", "Ash"];
  var WEATHER = ["OVERCAST", "LIGHT RAIN", "COLD WIND", "LOW FOG", "CLEARING"];
  var ZOMBIE_ARCHETYPES = Object.freeze({
    normal: { label: "Walker", radius: 12, chase: 1.16, damage: [6, 14], infection: 0.28, doorDamage: 15, color: "#85906f" },
    runner: { label: "Runner", radius: 11, chase: 1.5, damage: [5, 11], infection: 0.22, doorDamage: 12, color: "#95886c" },
    crawler: { label: "Crawler", radius: 9, chase: 1.25, damage: [4, 9], infection: 0.34, doorDamage: 7, color: "#6f8370" },
    bloater: { label: "Bloater", radius: 16, chase: 0.88, damage: [9, 17], infection: 0.4, doorDamage: 20, color: "#76906b" },
    brute: { label: "Brute", radius: 17, chase: 1.03, damage: [14, 24], infection: 0.22, doorDamage: 48, color: "#647863" },
    howler: { label: "Howler", radius: 12, chase: 1.12, damage: [6, 13], infection: 0.32, doorDamage: 13, color: "#788a79" }
  });
  var SURVIVOR_LOOKS = Object.freeze([
    { skin: "#c28f6f", shirt: "#4f6570", dark: "#33444c", pants: "#2e3538", hair: "#211d1b" },
    { skin: "#8d6049", shirt: "#6a5c46", dark: "#453b2d", pants: "#303633", hair: "#1b1715" },
    { skin: "#d2a782", shirt: "#5e7255", dark: "#3d4b38", pants: "#34363b", hair: "#5b392b" },
    { skin: "#9e735d", shirt: "#6e4e51", dark: "#493437", pants: "#2d3337", hair: "#27201d" },
    { skin: "#b98060", shirt: "#5e596e", dark: "#3d3949", pants: "#30383a", hair: "#151719" },
    { skin: "#704b3b", shirt: "#516a61", dark: "#34463f", pants: "#272f31", hair: "#131415" }
  ]);
  var SURVIVOR_NAMES2 = ["Alex", "Mara", "June", "Darius", "Nora", "Cole", "Imani", "Wes", "Rosa", "Malik", "Tess", "Jonah"];
  var ZOMBIE_LOOKS = Object.freeze([
    { skin: "#8e9270", skinDark: "#656b50", shirt: "#4f614f", shirtDark: "#354438", pants: "#2f3835", hair: "#2a241d", accent: "#713431" },
    { skin: "#929279", skinDark: "#666754", shirt: "#4f5864", shirtDark: "#343b46", pants: "#292f39", hair: "#24211f", accent: "#754039" },
    { skin: "#87917b", skinDark: "#5d6857", shirt: "#77756b", shirtDark: "#4e5048", pants: "#383b38", hair: "#302921", accent: "#69312f" },
    { skin: "#989078", skinDark: "#6d6350", shirt: "#66524d", shirtDark: "#443632", pants: "#303037", hair: "#201d1c", accent: "#773634" }
  ]);
  function drawBlockLimb(ctx, x1, y1, x2, y2, width, color, endColor = color) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const length = Math.hypot(dx, dy) || 1;
    ctx.save();
    ctx.translate(Math.round(x1), Math.round(y1));
    ctx.rotate(Math.atan2(dy, dx));
    ctx.fillStyle = color;
    ctx.fillRect(0, -Math.ceil(width / 2), Math.ceil(length), Math.ceil(width));
    ctx.restore();
    const endSize = Math.max(2, Math.ceil(width));
    ctx.fillStyle = endColor;
    ctx.fillRect(Math.round(x2 - endSize / 2), Math.round(y2 - endSize / 2), endSize, endSize);
  }
  function fillBlockPolygon(ctx, color, points) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(points[0][0], points[0][1]);
    for (let i = 1; i < points.length; i += 1) ctx.lineTo(points[i][0], points[i][1]);
    ctx.closePath();
    ctx.fill();
  }
  var FURNITURE_SIZES = Object.freeze({
    fridge: [24, 27],
    cupboard: [27, 19],
    dresser: [28, 19],
    counter: [30, 20],
    shelf: [29, 17],
    medical_cabinet: [25, 19],
    supply_cart: [25, 18],
    locker: [24, 20],
    desk: [30, 20],
    crate: [24, 24],
    table: [27, 21],
    checkout: [30, 20],
    freezer: [30, 21],
    reception: [31, 21],
    hospital_bed: [29, 18],
    gurney: [28, 17],
    evidence_cabinet: [27, 19],
    gun_locker: [27, 20],
    cell_locker: [23, 19],
    canteen_table: [30, 19],
    guard_desk: [30, 20],
    workbench: [30, 20],
    tool_cabinet: [27, 19]
  });
  function furnitureSize(container) {
    const base = FURNITURE_SIZES[container.kind] || [26, 20];
    const vertical = container.side === "east" || container.side === "west";
    return { w: vertical ? base[1] : base[0], h: vertical ? base[0] : base[1] };
  }
  function furnitureDistance(container, point) {
    const { w, h } = furnitureSize(container);
    const dx = Math.max(0, Math.abs(container.x - point.x) - w / 2);
    const dy = Math.max(0, Math.abs(container.y - point.y) - h / 2);
    return Math.hypot(dx, dy);
  }
  function roundedRectPath(ctx, x, y, width, height, radius) {
    const r = Math.min(radius, width / 2, height / 2);
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + width - r, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + r);
    ctx.lineTo(x + width, y + height - r);
    ctx.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
    ctx.lineTo(x + r, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  }
  function drawSmoothLimb(ctx, x1, y1, x2, y2, width, color, outline = "#202621") {
    ctx.lineCap = "round";
    ctx.strokeStyle = outline;
    ctx.lineWidth = width + 2;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }
  function drawRangedWeaponModel(ctx, id, x, y, aimX, aimY) {
    const angle = Math.atan2(aimY, aimX);
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.lineCap = "round";
    if (id === "double_barrel") {
      ctx.fillStyle = "#211912";
      roundedRectPath(ctx, -11, -4, 21, 8, 3);
      ctx.fill();
      ctx.fillStyle = "#805333";
      roundedRectPath(ctx, -10, -3, 20, 6, 2);
      ctx.fill();
      ctx.fillStyle = "#202625";
      ctx.fillRect(7, -4, 24, 3);
      ctx.fillRect(7, 1, 24, 3);
      ctx.fillStyle = "#a6aca8";
      ctx.fillRect(9, -3, 21, 1);
      ctx.fillRect(9, 2, 21, 1);
      ctx.fillStyle = "#c4a85e";
      ctx.fillRect(7, -3, 3, 6);
    } else if (id === "shotgun") {
      ctx.fillStyle = "#201b16";
      roundedRectPath(ctx, -10, -4, 17, 8, 3);
      ctx.fill();
      ctx.fillStyle = "#744d2e";
      roundedRectPath(ctx, -9, -3, 15, 6, 2);
      ctx.fill();
      ctx.fillStyle = "#171d1c";
      ctx.fillRect(4, -3, 25, 4);
      ctx.fillStyle = "#818a85";
      ctx.fillRect(7, -2, 22, 1);
      ctx.fillStyle = "#66452b";
      roundedRectPath(ctx, 10, -4, 9, 7, 2);
      ctx.fill();
    } else if (id === "assault_rifle") {
      ctx.fillStyle = "#171c1b";
      roundedRectPath(ctx, -12, -5, 29, 10, 3);
      ctx.fill();
      ctx.fillStyle = "#465148";
      roundedRectPath(ctx, -8, -4, 24, 7, 2);
      ctx.fill();
      ctx.fillStyle = "#1a201f";
      ctx.fillRect(14, -2, 23, 3);
      ctx.fillStyle = "#89938c";
      ctx.fillRect(17, -1, 18, 1);
      ctx.fillStyle = "#222926";
      ctx.beginPath();
      ctx.moveTo(2, 4);
      ctx.lineTo(10, 4);
      ctx.lineTo(8, 15);
      ctx.lineTo(2, 13);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = "#2e3934";
      roundedRectPath(ctx, 4, -8, 13, 3, 1);
      ctx.fill();
    } else if (id === "lever_rifle") {
      ctx.fillStyle = "#261d15";
      roundedRectPath(ctx, -12, -4, 25, 8, 3);
      ctx.fill();
      ctx.fillStyle = "#875a32";
      roundedRectPath(ctx, -11, -3, 23, 6, 2);
      ctx.fill();
      ctx.fillStyle = "#202625";
      ctx.fillRect(10, -2, 27, 3);
      ctx.fillStyle = "#9ba39f";
      ctx.fillRect(13, -1, 22, 1);
      ctx.strokeStyle = "#b68b4e";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.ellipse(4, 5, 7, 5, 0, 0, Math.PI * 2);
      ctx.stroke();
    } else if (id === "machine_pistol") {
      ctx.fillStyle = "#151a19";
      roundedRectPath(ctx, -5, -5, 23, 10, 3);
      ctx.fill();
      ctx.fillStyle = "#58615d";
      roundedRectPath(ctx, -1, -4, 17, 6, 2);
      ctx.fill();
      ctx.fillStyle = "#202725";
      ctx.fillRect(16, -2, 11, 3);
      ctx.fillStyle = "#252d2b";
      ctx.beginPath();
      ctx.moveTo(2, 4);
      ctx.lineTo(9, 4);
      ctx.lineTo(8, 14);
      ctx.lineTo(3, 13);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = "#343d3a";
      ctx.fillRect(11, 3, 4, 10);
    } else if (id === "carbine") {
      ctx.fillStyle = "#171d1c";
      roundedRectPath(ctx, -11, -4, 26, 8, 3);
      ctx.fill();
      ctx.fillStyle = "#46524e";
      roundedRectPath(ctx, -7, -3, 22, 6, 2);
      ctx.fill();
      ctx.fillStyle = "#202625";
      ctx.fillRect(13, -2, 21, 3);
      ctx.fillStyle = "#87918c";
      ctx.fillRect(15, -1, 18, 1);
      ctx.fillStyle = "#252c2a";
      ctx.beginPath();
      ctx.moveTo(1, 3);
      ctx.lineTo(8, 3);
      ctx.lineTo(7, 13);
      ctx.lineTo(2, 12);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = "#222a28";
      roundedRectPath(ctx, 5, -7, 13, 3, 1);
      ctx.fill();
      ctx.fillStyle = "#6e8d8a";
      ctx.fillRect(8, -6, 6, 1);
    } else if (id === "rifle") {
      ctx.fillStyle = "#211a14";
      roundedRectPath(ctx, -11, -4, 22, 8, 3);
      ctx.fill();
      ctx.fillStyle = "#765033";
      roundedRectPath(ctx, -10, -3, 21, 6, 2);
      ctx.fill();
      ctx.fillStyle = "#1a201f";
      ctx.fillRect(7, -3, 25, 4);
      ctx.fillStyle = "#909895";
      ctx.fillRect(10, -2, 22, 1);
      ctx.fillStyle = "#222a28";
      roundedRectPath(ctx, 6, -6, 14, 3, 1);
      ctx.fill();
      ctx.fillStyle = "#75909a";
      ctx.fillRect(9, -5.5, 7, 1);
    } else if (id === "smg") {
      ctx.fillStyle = "#151b1a";
      roundedRectPath(ctx, -7, -5, 22, 10, 3);
      ctx.fill();
      ctx.fillStyle = "#3f4946";
      roundedRectPath(ctx, -4, -4, 17, 7, 2);
      ctx.fill();
      ctx.fillStyle = "#171d1c";
      ctx.fillRect(13, -2, 11, 3);
      ctx.fillStyle = "#252d2b";
      ctx.beginPath();
      ctx.moveTo(3, 4);
      ctx.lineTo(10, 4);
      ctx.lineTo(8, 14);
      ctx.lineTo(3, 13);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = "#68716d";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(-6, 0);
      ctx.lineTo(-13, 5);
      ctx.stroke();
    } else if (id === "revolver") {
      ctx.fillStyle = "#2a302f";
      roundedRectPath(ctx, -2, -4, 18, 7, 2);
      ctx.fill();
      ctx.fillStyle = "#8d9692";
      ctx.fillRect(4, -3, 14, 3);
      ctx.fillStyle = "#67716d";
      ctx.beginPath();
      ctx.arc(3, 0, 4.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#60432d";
      ctx.beginPath();
      ctx.moveTo(-1, 3);
      ctx.lineTo(6, 3);
      ctx.lineTo(3, 12);
      ctx.lineTo(-3, 10);
      ctx.closePath();
      ctx.fill();
    } else {
      ctx.fillStyle = "#171d1c";
      roundedRectPath(ctx, -2, -4, 17, 7, 2);
      ctx.fill();
      ctx.fillStyle = "#747e79";
      ctx.fillRect(1, -3, 14, 3);
      ctx.fillStyle = "#2d3633";
      ctx.beginPath();
      ctx.moveTo(0, 3);
      ctx.lineTo(7, 3);
      ctx.lineTo(5, 11);
      ctx.lineTo(0, 9);
      ctx.closePath();
      ctx.fill();
    }
    ctx.restore();
  }
  function meleeModelLength(id) {
    return { knife: 12, hammer: 15, machete: 21, katana: 25, bat: 21, axe: 20, crowbar: 22, spear: 29, sledgehammer: 22 }[id] || 17;
  }
  function drawMeleeWeaponModel(ctx, id, x, y, aimX, aimY) {
    const angle = Math.atan2(aimY, aimX);
    const length = meleeModelLength(id);
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.lineCap = "round";
    if (id === "knife") {
      ctx.fillStyle = "#30251e";
      roundedRectPath(ctx, -2, -2.5, 7, 5, 2);
      ctx.fill();
      ctx.fillStyle = "#d7dfda";
      ctx.beginPath();
      ctx.moveTo(5, -2.5);
      ctx.lineTo(length, 0);
      ctx.lineTo(5, 2.5);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = "#6f7b76";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(6, 0);
      ctx.lineTo(length - 2, 0);
      ctx.stroke();
    } else if (id === "hammer") {
      ctx.strokeStyle = "#2f2117";
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(-2, 0);
      ctx.lineTo(length, 0);
      ctx.stroke();
      ctx.strokeStyle = "#795237";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(-2, 0);
      ctx.lineTo(length, 0);
      ctx.stroke();
      ctx.fillStyle = "#9ca5a1";
      roundedRectPath(ctx, length - 3, -6, 8, 12, 2);
      ctx.fill();
      ctx.fillStyle = "#4b5350";
      ctx.beginPath();
      ctx.moveTo(length + 4, -5);
      ctx.lineTo(length + 9, -2);
      ctx.lineTo(length + 4, 0);
      ctx.closePath();
      ctx.fill();
    } else if (id === "machete") {
      ctx.fillStyle = "#2b251f";
      roundedRectPath(ctx, -2, -3, 8, 6, 2);
      ctx.fill();
      ctx.fillStyle = "#aeb9b4";
      ctx.beginPath();
      ctx.moveTo(5, -3);
      ctx.lineTo(length - 2, -4);
      ctx.lineTo(length + 1, -1);
      ctx.lineTo(length - 2, 3);
      ctx.lineTo(5, 2);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = "#d9dfdc";
      ctx.beginPath();
      ctx.moveTo(7, -2);
      ctx.lineTo(length - 3, -3);
      ctx.lineTo(length - 1, -1.5);
      ctx.lineTo(7, 0);
      ctx.closePath();
      ctx.fill();
    } else if (id === "katana") {
      ctx.fillStyle = "#25201c";
      roundedRectPath(ctx, -4, -2.5, 11, 5, 2);
      ctx.fill();
      ctx.fillStyle = "#c6a85b";
      ctx.fillRect(5, -4, 2, 8);
      ctx.fillStyle = "#d7dedb";
      ctx.beginPath();
      ctx.moveTo(7, -2);
      ctx.quadraticCurveTo(length - 1, -4, length + 4, -1);
      ctx.lineTo(length + 2, 1);
      ctx.quadraticCurveTo(length - 1, 1, 7, 2);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = "#7e8b87";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(9, 0);
      ctx.lineTo(length + 1, -1);
      ctx.stroke();
    } else if (id === "crowbar") {
      ctx.strokeStyle = "#271714";
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(-1, 0);
      ctx.lineTo(length - 2, 0);
      ctx.quadraticCurveTo(length + 3, 0, length + 2, -6);
      ctx.stroke();
      ctx.strokeStyle = "#8e3f35";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(-1, 0);
      ctx.lineTo(length - 2, 0);
      ctx.quadraticCurveTo(length + 3, 0, length + 2, -6);
      ctx.stroke();
      ctx.strokeStyle = "#b86150";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(1, -1);
      ctx.lineTo(length - 3, -1);
      ctx.stroke();
    } else if (id === "spear") {
      ctx.strokeStyle = "#2d2117";
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(-5, 0);
      ctx.lineTo(length - 4, 0);
      ctx.stroke();
      ctx.strokeStyle = "#765338";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(-5, 0);
      ctx.lineTo(length - 4, 0);
      ctx.stroke();
      ctx.fillStyle = "#b9c3bf";
      ctx.beginPath();
      ctx.moveTo(length + 3, 0);
      ctx.lineTo(length - 5, -5);
      ctx.lineTo(length - 3, 0);
      ctx.lineTo(length - 5, 5);
      ctx.closePath();
      ctx.fill();
    } else if (id === "sledgehammer") {
      ctx.strokeStyle = "#2d2118";
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(-3, 0);
      ctx.lineTo(length, 0);
      ctx.stroke();
      ctx.strokeStyle = "#775136";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(-3, 0);
      ctx.lineTo(length, 0);
      ctx.stroke();
      ctx.fillStyle = "#252c2b";
      roundedRectPath(ctx, length - 3, -8, 10, 16, 2);
      ctx.fill();
      ctx.fillStyle = "#79817e";
      ctx.fillRect(length - 1, -7, 5, 14);
    } else if (id === "axe") {
      ctx.strokeStyle = "#2d2118";
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(-2, 0);
      ctx.lineTo(length, 0);
      ctx.stroke();
      ctx.strokeStyle = "#704c30";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(-2, 0);
      ctx.lineTo(length, 0);
      ctx.stroke();
      ctx.fillStyle = "#aeb6b1";
      roundedRectPath(ctx, length - 3, -7, 8, 14, 2);
      ctx.fill();
      ctx.fillStyle = "#d9dfdb";
      ctx.beginPath();
      ctx.moveTo(length + 1, -6);
      ctx.lineTo(length + 8, -4);
      ctx.lineTo(length + 8, 3);
      ctx.lineTo(length + 1, 1);
      ctx.closePath();
      ctx.fill();
    } else {
      ctx.strokeStyle = "#2e2118";
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.moveTo(-2, 0);
      ctx.lineTo(length, 0);
      ctx.stroke();
      ctx.strokeStyle = "#80593a";
      ctx.lineWidth = id === "bat" ? 4.5 : 3.5;
      ctx.beginPath();
      ctx.moveTo(-2, 0);
      ctx.lineTo(length, 0);
      ctx.stroke();
      ctx.fillStyle = "#b78959";
      ctx.beginPath();
      ctx.arc(length, 0, id === "bat" ? 2.8 : 2, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }
  var $ = (selector) => document.querySelector(selector);
  var clamp = (value, min, max) => Math.max(min, Math.min(max, value));
  var distance = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
  var titleCase = (value) => value.replaceAll("_", " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
  var HollowCountyGame = class {
    constructor() {
      this.canvas = $("#gameCanvas");
      this.ctx = this.canvas.getContext("2d", { alpha: false });
      this.minimap = $("#minimap");
      this.mapCtx = this.minimap.getContext("2d");
      this.menu = $("#menu");
      this.gameScreen = $("#game");
      this.mode = "menu";
      this.world = null;
      this.player = null;
      this.zombies = [];
      this.survivors = [];
      this.structures = [];
      this.noises = [];
      this.effects = [];
      this.blood = [];
      this.camera = { x: 0, y: 0, shake: 0 };
      this.timeMinutes = 8 * 60;
      this.day = 1;
      this.lastDayPhase = "DAY";
      this.weather = "OVERCAST";
      this.lastFrame = performance.now();
      this.uiTimer = 0;
      this.mapTimer = 0;
      this.saveTimer = 0;
      this.spawnTimer = 32;
      this.ambientTimer = 24;
      this.survivorSpawnCarry = 0;
      this.nearestInteractable = null;
      this.openContainer = null;
      this.selectedInventoryIndex = -1;
      this.panelOpen = null;
      this.buildMode = null;
      this.attackHeld = false;
      this.windowTiles = /* @__PURE__ */ new Map();
      this.doorTiles = /* @__PURE__ */ new Map();
      this.barTiles = /* @__PURE__ */ new Set();
      this.signTiles = /* @__PURE__ */ new Map();
      this.buildingLookup = /* @__PURE__ */ new Map();
      this.courtyardLookup = /* @__PURE__ */ new Map();
      this.lastStreamChunk = null;
      this.playerBuildingId = null;
      this.stats = { searched: 0 };
      this.input = new InputController(
        this.canvas,
        $("#joystick"),
        $("#joystickThumb"),
        (action, value) => this.handleAction(action, value)
      );
      this.bindUI();
      this.resize();
      window.addEventListener("resize", () => this.resize());
      document.addEventListener("visibilitychange", () => {
        if (document.hidden && this.mode === "playing") this.pause();
      });
      $("#seedInput").value = randomSeed();
      this.refreshSaveSummary();
      setTimeout(() => {
        $("#boot").classList.add("hidden");
        this.menu.classList.remove("hidden");
      }, 340);
      requestAnimationFrame((now) => this.frame(now));
    }
    bindUI() {
      $("#randomSeedBtn").addEventListener("click", () => {
        $("#seedInput").value = randomSeed();
      });
      $("#newGameBtn").addEventListener("click", () => this.startNew($("#seedInput").value));
      $("#continueBtn").addEventListener("click", () => this.loadSaved());
      $("#inventoryBtn").addEventListener("click", () => this.togglePanel("inventoryPanel"));
      $("#craftBtn").addEventListener("click", () => this.togglePanel("craftPanel"));
      $("#pauseBtn").addEventListener("click", () => this.pause());
      $("#resumeBtn").addEventListener("click", () => this.resume());
      $("#saveQuitBtn").addEventListener("click", () => this.saveAndQuit());
      $("#abandonBtn").addEventListener("click", () => this.abandonRun());
      $("#newRunBtn").addEventListener("click", () => {
        this.showMenu();
        $("#seedInput").value = randomSeed();
      });
      $("#deathMenuBtn").addEventListener("click", () => this.showMenu());
      const takeAllButton = $("#takeAllBtn");
      let takeAllTouchHandled = false;
      takeAllButton.addEventListener("pointerup", (event) => {
        if (event.pointerType !== "touch") return;
        event.preventDefault();
        takeAllTouchHandled = true;
        this.takeAllLoot();
        setTimeout(() => {
          takeAllTouchHandled = false;
        }, 420);
      });
      takeAllButton.addEventListener("click", () => {
        if (takeAllTouchHandled) return;
        this.takeAllLoot();
      });
      $("#dropItemBtn").addEventListener("click", () => this.dropSelectedItem());
      document.querySelectorAll("[data-close]").forEach((button) => {
        button.addEventListener("click", () => this.closePanel(button.dataset.close));
      });
    }
    resize() {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const rect = this.canvas.getBoundingClientRect();
      this.canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      this.canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      this.ctx.imageSmoothingEnabled = false;
      this.viewWidth = rect.width;
      this.viewHeight = rect.height;
      this.dpr = dpr;
    }
    startNew(seed) {
      const normalizedSeed = String(seed || randomSeed()).trim().toUpperCase().slice(0, 24) || randomSeed();
      this.world = generateWorld(normalizedSeed);
      this.indexWorld();
      this.player = this.makePlayer();
      this.zombies = this.world.zombieSpawns.map((spawn) => this.makeZombie(spawn));
      this.survivors = this.world.survivorSpawns.map((spawn) => this.makeSurvivor(spawn));
      this.lastStreamChunk = null;
      this.updateWorldStreaming(true);
      this.structures = [];
      this.noises = [];
      this.effects = [];
      this.blood = [];
      this.ambientTimer = 28 + Math.random() * 22;
      this.survivorSpawnCarry = 0;
      this.timeMinutes = 8 * 60;
      this.day = 1;
      this.lastDayPhase = this.dayPhase();
      this.weather = WEATHER[Math.floor(hash2D(7, 9, normalizedSeed) * WEATHER.length)];
      this.stats = { searched: 0 };
      this.camera.x = this.player.x;
      this.camera.y = this.player.y;
      this.mode = "playing";
      this.closeAllPanels();
      $("#deathPanel").classList.add("hidden");
      this.menu.classList.add("hidden");
      this.gameScreen.classList.remove("hidden");
      this.resize();
      $("#seedLabel").textContent = `SEED ${normalizedSeed}`;
      this.renderInventory();
      this.renderRecipes();
      this.updateHotbar();
      this.updateObjective();
      this.toast("County generated. Keep quiet and search the safe house.");
      this.saveGame();
    }
    makePlayer() {
      return {
        x: this.world.spawn.x,
        y: this.world.spawn.y,
        radius: 8,
        facingX: 1,
        facingY: 0,
        renderFacingX: 1,
        renderFacingY: 0,
        velocityX: 0,
        velocityY: 0,
        actualSpeed: 0,
        turnLean: 0,
        health: 100,
        stamina: 100,
        hunger: 92,
        thirst: 88,
        infection: 0,
        inventory: [
          { id: "knife", qty: 1 },
          { id: "water", qty: 1 },
          { id: "canned_beans", qty: 1 },
          { id: "bandage", qty: 1 }
        ],
        hotbar: ["knife", null, null, null, null],
        equipped: "knife",
        crouching: false,
        attackCooldown: 0,
        hurtCooldown: 0,
        noiseCooldown: 0,
        animTime: 0,
        moveBlend: 0,
        movingNow: false,
        sprintingNow: false,
        attackAnim: 0,
        attackDuration: 0.28,
        attackMode: "melee",
        hurtAnim: 0,
        kills: 0,
        distanceWalked: 0,
        flashlight: false
      };
    }
    makeZombie(spawn) {
      const lookNoise = hash2D(Math.floor(spawn.x || 0), Math.floor(spawn.y || 0), this.world?.seed || "WALKERS");
      const archetype = spawn.archetype || "normal";
      const profile = ZOMBIE_ARCHETYPES[archetype] || ZOMBIE_ARCHETYPES.normal;
      return {
        ...spawn,
        archetype,
        radius: profile.radius,
        health: spawn.health || spawn.maxHealth || 60,
        maxHealth: spawn.maxHealth || spawn.health || 60,
        state: "wander",
        targetX: spawn.x,
        targetY: spawn.y,
        wanderTimer: Math.random() * 3,
        senseTimer: Math.random() * 0.25,
        pathTimer: 0,
        path: [],
        memory: 0,
        attackCooldown: 0,
        bashCooldown: 0,
        howlCooldown: 3 + lookNoise * 8,
        targetEntityId: "player",
        hitFlash: 0,
        dead: false,
        angle: Math.random() * Math.PI * 2,
        animTime: lookNoise * Math.PI * 2,
        moveBlend: 0,
        attackAnim: 0,
        hurtAnim: 0,
        deathAnim: 0,
        deathSide: lookNoise > 0.5 ? 1 : -1,
        variant: Math.min(ZOMBIE_LOOKS.length - 1, Math.floor(lookNoise * ZOMBIE_LOOKS.length)),
        limpSide: lookNoise > 0.68 ? 1 : -1
      };
    }
    makeSurvivor(spawn) {
      const lookNoise = hash2D(Math.floor(spawn.x || 0), Math.floor(spawn.y || 0), `${this.world?.seed || "WALKERS"}:SURVIVOR`);
      return {
        ...spawn,
        radius: 10,
        health: spawn.health || 88,
        maxHealth: spawn.maxHealth || spawn.health || 88,
        state: "scavenge",
        targetX: spawn.x,
        targetY: spawn.y,
        path: [],
        pathTimer: 0,
        thinkTimer: lookNoise * 0.4,
        wanderTimer: lookNoise * 3,
        attackCooldown: 0,
        hurtCooldown: 0,
        speechTimer: 2 + lookNoise * 7,
        speech: "",
        dead: false,
        angle: lookNoise * Math.PI * 2,
        animTime: lookNoise * Math.PI * 2,
        moveBlend: 0,
        attackAnim: 0,
        hurtAnim: 0,
        outfit: spawn.outfit ?? Math.floor(lookNoise * SURVIVOR_LOOKS.length),
        ammo: 18 + Math.floor(lookNoise * 25)
      };
    }
    indexWorld() {
      this.windowTiles.clear();
      this.doorTiles.clear();
      this.barTiles.clear();
      this.signTiles.clear();
      this.buildingLookup.clear();
      this.courtyardLookup.clear();
      for (const building of this.world.buildings) {
        for (const window2 of building.windows || []) this.windowTiles.set(`${window2.x},${window2.y}`, window2);
        for (const door of building.doors || []) this.doorTiles.set(`${door.x},${door.y}`, door);
        for (const bar of building.barTiles || []) this.barTiles.add(`${bar.x},${bar.y}`);
        if (building.signTile) this.signTiles.set(`${building.signTile.x},${building.signTile.y}`, building);
        for (const cell of building.cells || []) this.buildingLookup.set(`${cell.x},${cell.y}`, building);
        if (building.variant === "courtyard_block") {
          for (let y = building.y + 3; y <= building.y + building.h - 4; y += 1) {
            for (let x = building.x + 3; x <= building.x + building.w - 4; x += 1) this.courtyardLookup.set(`${x},${y}`, building);
          }
        }
      }
    }
    updateWorldStreaming(force = false) {
      if (!this.world?.chunked || !this.player) return;
      const tileX = Math.floor(this.player.x / TILE_SIZE);
      const tileY = Math.floor(this.player.y / TILE_SIZE);
      const chunkKey = `${Math.floor(tileX / CHUNK_SIZE)},${Math.floor(tileY / CHUNK_SIZE)}`;
      if (!force && chunkKey === this.lastStreamChunk) return;
      const result = streamWorldChunks(this.world, tileX, tileY, 2, 3);
      this.lastStreamChunk = chunkKey;
      if (!result.changed) return;
      const removed = new Set(result.removed);
      for (const key2 of removed) {
        const state = this.world.chunkStates.get(key2) || {};
        state.survivors = (this.survivors || []).filter((survivor) => survivor.chunkKey === key2 && !survivor.dead && !String(survivor.id).startsWith("hs")).map(({ path, speech, ...survivor }) => ({ ...survivor, path: [], speech: "" }));
        this.world.chunkStates.set(key2, state);
      }
      this.zombies = (this.zombies || []).filter((zombie) => !removed.has(zombie.chunkKey));
      this.survivors = (this.survivors || []).filter((survivor) => !removed.has(survivor.chunkKey));
      const existing = new Set(this.zombies.map((zombie) => zombie.id));
      const existingSurvivors = new Set(this.survivors.map((survivor) => survivor.id));
      const added = new Set(result.added);
      for (const spawn of this.world.zombieSpawns) {
        if (added.has(spawn.chunkKey) && !existing.has(spawn.id)) this.zombies.push(this.makeZombie(spawn));
      }
      for (const spawn of this.world.survivorSpawns) {
        if (added.has(spawn.chunkKey) && !existingSurvivors.has(spawn.id)) this.survivors.push(this.makeSurvivor(spawn));
      }
      this.indexWorld();
    }
    handleAction(action, value) {
      if (action === "key") {
        if (value === "escape") {
          if (this.panelOpen) this.closeAllPanels();
          else if (this.mode === "paused") this.resume();
          else if (this.mode === "playing") this.pause();
          return;
        }
        if (this.mode !== "playing") return;
        if (value === "tab") this.togglePanel("inventoryPanel");
        else if (value === "b") this.togglePanel("craftPanel");
        else if (value === "e") this.interact();
        else if (value === "c") {
          this.player.crouching = !this.player.crouching;
          this.toast(this.player.crouching ? "Moving quietly." : "Standing upright.");
        } else if (/^[1-5]$/.test(value)) this.selectHotbar(Number(value) - 1);
        return;
      }
      if (this.mode !== "playing" || this.panelOpen) return;
      if (action === "attack") {
        this.attackHeld = Boolean(value);
        if (value) {
          if (this.buildMode) this.tryPlaceStructure();
          else this.attack();
        }
      } else if (action === "interact" && value) {
        this.interact();
      } else if (action === "crouch" && value) {
        this.player.crouching = !this.player.crouching;
        this.toast(this.player.crouching ? "Moving quietly." : "Standing upright.");
      }
    }
    frame(now) {
      const dt = Math.min(0.05, Math.max(0, (now - this.lastFrame) / 1e3));
      this.lastFrame = now;
      if (this.mode === "playing" && !this.panelOpen) this.update(dt);
      if (this.world && this.mode !== "menu") this.render();
      requestAnimationFrame((next) => this.frame(next));
    }
    update(dt) {
      this.updatePlayer(dt);
      this.updateWorldStreaming();
      this.updateSurvival(dt);
      this.updateSurvivors(dt);
      this.updateZombies(dt);
      this.updateStructures(dt);
      this.updateEffects(dt);
      this.updateCamera(dt);
      this.uiTimer -= dt;
      this.mapTimer -= dt;
      this.saveTimer += dt;
      this.spawnTimer -= dt;
      this.ambientTimer -= dt;
      if (this.uiTimer <= 0) {
        this.uiTimer = 0.12;
        this.updateHUD();
        this.updateInteractPrompt();
      }
      if (this.mapTimer <= 0) {
        this.mapTimer = 0.35;
        this.drawMinimap();
        this.updateLocation();
      }
      if (this.saveTimer >= 15) {
        this.saveTimer = 0;
        this.saveGame();
      }
      if (this.spawnTimer <= 0) {
        this.spawnTimer = 35;
        this.spawnNightWanderers();
      }
      if (this.ambientTimer <= 0) this.triggerAmbientEvent();
      if (this.player.health <= 0 || this.player.infection >= 100) this.die();
    }
    updatePlayer(dt) {
      const player = this.player;
      player.animTime ?? (player.animTime = 0);
      player.moveBlend ?? (player.moveBlend = 0);
      player.velocityX ?? (player.velocityX = 0);
      player.velocityY ?? (player.velocityY = 0);
      player.actualSpeed ?? (player.actualSpeed = 0);
      player.renderFacingX ?? (player.renderFacingX = player.facingX ?? 1);
      player.renderFacingY ?? (player.renderFacingY = player.facingY ?? 0);
      player.turnLean ?? (player.turnLean = 0);
      player.radius = 8;
      player.attackAnim ?? (player.attackAnim = 0);
      player.attackDuration ?? (player.attackDuration = 0.28);
      player.attackMode ?? (player.attackMode = "melee");
      player.hurtAnim ?? (player.hurtAnim = 0);
      player.attackCooldown = Math.max(0, player.attackCooldown - dt);
      player.hurtCooldown = Math.max(0, player.hurtCooldown - dt);
      player.noiseCooldown = Math.max(0, player.noiseCooldown - dt);
      player.attackAnim = Math.max(0, player.attackAnim - dt);
      player.hurtAnim = Math.max(0, player.hurtAnim - dt);
      const move = this.input.movement();
      const inputLength = Math.hypot(move.x, move.y);
      const inputStrength = clamp(inputLength, 0, 1);
      const hasInput = inputStrength > 0.045;
      const inputX = hasInput ? move.x / inputLength : 0;
      const inputY = hasInput ? move.y / inputLength : 0;
      const canSprint = this.input.sprinting && !player.crouching && player.stamina > 3 && hasInput;
      let speed = player.crouching ? 65 : 112;
      if (canSprint) {
        speed = 176;
        player.stamina = Math.max(0, player.stamina - dt * 19);
        if (player.noiseCooldown <= 0) {
          player.noiseCooldown = 0.32;
          this.emitNoise(player.x, player.y, 195, "footsteps");
        }
      } else {
        const recovery = player.hunger < 15 || player.thirst < 15 ? 6 : 14;
        player.stamina = Math.min(100, player.stamina + dt * recovery);
      }
      const desiredVelocityX = inputX * speed * inputStrength;
      const desiredVelocityY = inputY * speed * inputStrength;
      const response = hasInput ? canSprint ? 10.5 : player.crouching ? 12 : 14 : 18;
      const velocityBlend = 1 - Math.exp(-response * dt);
      player.velocityX += (desiredVelocityX - player.velocityX) * velocityBlend;
      player.velocityY += (desiredVelocityY - player.velocityY) * velocityBlend;
      if (!hasInput && Math.hypot(player.velocityX, player.velocityY) < 0.35) {
        player.velocityX = 0;
        player.velocityY = 0;
      }
      const beforeX = player.x;
      const beforeY = player.y;
      if (Math.hypot(player.velocityX, player.velocityY) > 0.02) {
        const requestedX = player.velocityX * dt;
        const requestedY = player.velocityY * dt;
        this.moveCircle(player, requestedX, requestedY, true);
        const actualX2 = player.x - beforeX;
        const actualY2 = player.y - beforeY;
        if (Math.abs(requestedX) > 0.01 && Math.abs(actualX2) < Math.abs(requestedX) * 0.2) player.velocityX *= 0.18;
        if (Math.abs(requestedY) > 0.01 && Math.abs(actualY2) < Math.abs(requestedY) * 0.2) player.velocityY *= 0.18;
      }
      const actualX = player.x - beforeX;
      const actualY = player.y - beforeY;
      const moved = Math.hypot(actualX, actualY);
      const measuredSpeed = moved / Math.max(dt, 1 / 240);
      player.actualSpeed += (measuredSpeed - player.actualSpeed) * (1 - Math.exp(-16 * dt));
      player.distanceWalked += moved;
      player.movingNow = player.actualSpeed > 2.5;
      player.sprintingNow = canSprint && player.actualSpeed > 90;
      const coarsePointer = matchMedia("(pointer: coarse)").matches;
      if (hasInput && (!this.input.pointer.active || coarsePointer)) {
        player.facingX = inputX;
        player.facingY = inputY;
      }
      if (this.input.pointer.active && !coarsePointer) {
        const worldPoint = this.screenToWorld(this.input.pointer.x, this.input.pointer.y);
        const dx = worldPoint.x - player.x;
        const dy = worldPoint.y - player.y;
        const length = Math.hypot(dx, dy) || 1;
        player.facingX = dx / length;
        player.facingY = dy / length;
      }
      const targetAngle = Math.atan2(player.facingY, player.facingX);
      const currentAngle = Math.atan2(player.renderFacingY, player.renderFacingX);
      let angleDifference = targetAngle - currentAngle;
      angleDifference = Math.atan2(Math.sin(angleDifference), Math.cos(angleDifference));
      const turnResponse = player.attackAnim > 0 ? 26 : player.sprintingNow ? 10 : 15;
      const renderedAngle = currentAngle + angleDifference * (1 - Math.exp(-turnResponse * dt));
      player.renderFacingX = Math.cos(renderedAngle);
      player.renderFacingY = Math.sin(renderedAngle);
      const leanTarget = clamp(angleDifference * 0.42, -0.34, 0.34) * player.moveBlend;
      player.turnLean += (leanTarget - player.turnLean) * (1 - Math.exp(-12 * dt));
      const motionTarget = clamp(player.actualSpeed / (player.crouching ? 52 : canSprint ? 142 : 92), 0, 1);
      player.moveBlend += (motionTarget - player.moveBlend) * (1 - Math.exp(-(hasInput ? 13 : 9) * dt));
      const gaitRate = player.crouching ? 5.2 : player.sprintingNow ? 11.2 : 8.1;
      player.animTime += dt * (1.15 + gaitRate * player.moveBlend);
      const equipped = ITEMS[player.equipped];
      if (this.attackHeld && equipped?.automatic && player.attackCooldown <= 0) this.attack();
    }
    updateSurvival(dt) {
      const player = this.player;
      const previousPhase = this.lastDayPhase || this.dayPhase();
      this.timeMinutes += dt * 3.25;
      if (this.timeMinutes >= 1440) {
        this.timeMinutes -= 1440;
        this.day += 1;
        this.weather = WEATHER[Math.floor(hash2D(this.day * 13, this.day * 29, this.world.seed) * WEATHER.length)];
        this.toast(`Day ${this.day}. The county population is getting restless.`, "danger");
        this.updateObjective();
      }
      const currentPhase = this.dayPhase();
      if (currentPhase !== previousPhase) {
        const message = currentPhase === "NIGHT" ? "Night has fallen. The walkers are harder to track." : currentPhase === "DAWN" ? "Dawn is breaking over the county." : currentPhase === "DUSK" ? "Dusk is settling in. Find light or shelter." : "Full daylight has returned.";
        this.toast(message, currentPhase === "NIGHT" || currentPhase === "DUSK" ? "danger" : "");
      }
      this.lastDayPhase = currentPhase;
      player.hunger = Math.max(0, player.hunger - dt * 0.075);
      player.thirst = Math.max(0, player.thirst - dt * 0.11);
      if (player.hunger <= 0) player.health -= dt * 1.1;
      if (player.thirst <= 0) player.health -= dt * 1.8;
      if (player.infection > 0) {
        const growth = player.infection > 55 ? 0.034 : 0.014;
        player.infection = Math.min(100, player.infection + dt * growth);
        if (player.infection > 75) player.stamina = Math.min(player.stamina, 75);
      }
    }
    doorAtTile(tx, ty) {
      return this.doorTiles.get(`${tx},${ty}`) || null;
    }
    isDoorClosed(tx, ty) {
      const door = this.doorAtTile(tx, ty);
      return Boolean(door && !door.open && !door.broken);
    }
    hasVision(a, b) {
      return hasLineOfSight(this.world, a.x, a.y, b.x, b.y, (tile, tx, ty) => blocksSight(tile) || this.isDoorClosed(tx, ty));
    }
    buildingAt(entity) {
      const key2 = `${Math.floor(entity.x / TILE_SIZE)},${Math.floor(entity.y / TILE_SIZE)}`;
      return this.buildingLookup.get(key2) || this.courtyardLookup.get(key2) || null;
    }
    isHiddenInside(entity) {
      const building = this.buildingAt(entity);
      const playerBuildingId = this.buildingAt(this.player)?.id || null;
      return Boolean(building && building.id !== playerBuildingId);
    }
    nearestDoor(entity, maxRange = 72, closedOnly = false) {
      let closest = null;
      let best = maxRange;
      for (const door of this.doorTiles.values()) {
        if (closedOnly && (door.open || door.broken)) continue;
        const x = (door.x + 0.5) * TILE_SIZE;
        const y = (door.y + 0.5) * TILE_SIZE;
        const d = Math.hypot(x - entity.x, y - entity.y);
        if (d < best) {
          best = d;
          closest = { door, x, y, distance: d };
        }
      }
      return closest;
    }
    updateSurvivors(dt) {
      for (const survivor of this.survivors) {
        if (survivor.dead) continue;
        survivor.attackCooldown = Math.max(0, survivor.attackCooldown - dt);
        survivor.hurtCooldown = Math.max(0, survivor.hurtCooldown - dt);
        survivor.attackAnim = Math.max(0, survivor.attackAnim - dt);
        survivor.hurtAnim = Math.max(0, survivor.hurtAnim - dt);
        survivor.thinkTimer -= dt;
        survivor.wanderTimer -= dt;
        survivor.speechTimer -= dt;
        survivor.animTime += dt * (1.7 + survivor.moveBlend * 6.2);
        const playerDistance = distance(survivor, this.player);
        if (playerDistance > 1550) continue;
        const threats = this.zombies.filter((zombie) => !zombie.dead && distance(zombie, survivor) < 540).sort((a, b) => distance(a, survivor) - distance(b, survivor));
        const threat = threats[0] || null;
        const threatDistance = threat ? distance(threat, survivor) : Infinity;
        const weapon = ITEMS[survivor.weapon] || ITEMS.knife;
        if (survivor.thinkTimer <= 0) {
          survivor.thinkTimer = 0.18 + Math.random() * 0.2;
          if (threat && (threatDistance < 185 || this.hasVision(survivor, threat))) {
            const outmatched = threats.filter((zombie) => distance(zombie, survivor) < 210).length >= 2;
            const needsAmmo = weapon.mode === "ranged" && survivor.ammo <= 0;
            survivor.state = needsAmmo || outmatched && survivor.courage < 0.72 ? "flee" : "fight";
            if (survivor.speechTimer <= 0 && playerDistance < 430) {
              survivor.speech = survivor.state === "flee" ? "Too many\u2014move!" : threat.archetype === "brute" ? "Big one!" : "Contact!";
              survivor.speechTimer = 5 + Math.random() * 4;
            }
          } else if (survivor.wanderTimer <= 0) {
            survivor.state = Math.random() < 0.22 ? "follow" : "scavenge";
            survivor.wanderTimer = 3 + Math.random() * 6;
            const buddy = this.survivors.find((other) => other !== survivor && !other.dead && distance(other, survivor) < 420);
            if (survivor.state === "follow" && buddy) {
              survivor.targetX = buddy.x + (Math.random() - 0.5) * 90;
              survivor.targetY = buddy.y + (Math.random() - 0.5) * 90;
            } else {
              survivor.targetX = survivor.x + (Math.random() - 0.5) * 320;
              survivor.targetY = survivor.y + (Math.random() - 0.5) * 320;
            }
          }
        }
        let moveX = survivor.targetX;
        let moveY = survivor.targetY;
        let shouldMove = survivor.state !== "fight";
        if (threat) {
          const dx = threat.x - survivor.x;
          const dy = threat.y - survivor.y;
          const length = Math.hypot(dx, dy) || 1;
          survivor.angle = Math.atan2(dy, dx);
          if (survivor.state === "flee") {
            moveX = survivor.x - dx / length * 230;
            moveY = survivor.y - dy / length * 230;
            shouldMove = true;
          } else if (survivor.state === "fight") {
            const preferred = weapon.mode === "ranged" ? Math.min(320, weapon.range * 0.58) : weapon.range * 0.72;
            if (threatDistance > preferred + 35) {
              moveX = threat.x;
              moveY = threat.y;
              shouldMove = true;
            } else if (weapon.mode === "ranged" && threatDistance < 105) {
              moveX = survivor.x - dx / length * 180;
              moveY = survivor.y - dy / length * 180;
              shouldMove = true;
            } else {
              shouldMove = false;
            }
            if (survivor.attackCooldown <= 0 && threatDistance <= weapon.range + threat.radius && this.hasVision(survivor, threat)) {
              this.survivorAttack(survivor, threat, weapon);
            }
          }
        }
        if (shouldMove) {
          const dx = moveX - survivor.x;
          const dy = moveY - survivor.y;
          const length = Math.hypot(dx, dy) || 1;
          const speed = survivor.state === "flee" ? 142 : 88;
          const oldX = survivor.x;
          const oldY = survivor.y;
          survivor.angle = Math.atan2(dy, dx);
          this.moveCircle(survivor, dx / length * speed * dt, dy / length * speed * dt, true);
          const moved = Math.hypot(survivor.x - oldX, survivor.y - oldY);
          if (moved < speed * dt * 0.18) {
            const nearDoor = this.nearestDoor(survivor, 42, true);
            if (nearDoor) {
              nearDoor.door.open = true;
              this.emitNoise(nearDoor.x, nearDoor.y, nearDoor.door.style === "steel" ? 105 : 52, "door");
            } else {
              survivor.targetX += (Math.random() - 0.5) * 180;
              survivor.targetY += (Math.random() - 0.5) * 180;
            }
          }
          survivor.moveBlend += ((moved > 0.05 ? 1 : 0) - survivor.moveBlend) * Math.min(1, dt * 10);
        } else {
          survivor.moveBlend += (0 - survivor.moveBlend) * Math.min(1, dt * 9);
        }
      }
    }
    survivorAttack(survivor, zombie, weapon) {
      const dx = zombie.x - survivor.x;
      const dy = zombie.y - survivor.y;
      const length = Math.hypot(dx, dy) || 1;
      survivor.attackCooldown = weapon.cooldown * (0.85 + Math.random() * 0.35);
      survivor.attackAnim = weapon.mode === "ranged" ? 0.2 : 0.3;
      if (weapon.mode === "ranged") {
        if (survivor.ammo <= 0) return;
        survivor.ammo -= 1;
        const accuracy = 0.72 + survivor.courage * 0.22;
        const hit = Math.random() < accuracy;
        const endX = hit ? zombie.x : zombie.x + (Math.random() - 0.5) * 90;
        const endY = hit ? zombie.y : zombie.y + (Math.random() - 0.5) * 90;
        this.effects.push({ type: "tracer", x: survivor.x, y: survivor.y, x2: endX, y2: endY, life: 0.08, maxLife: 0.08 });
        this.effects.push({ type: "muzzle", x: survivor.x + dx / length * 18, y: survivor.y + dy / length * 18, life: 0.09, maxLife: 0.09 });
        this.emitNoise(survivor.x, survivor.y, weapon.noise * 0.9, `${survivor.name}'s ${weapon.name}`);
        if (hit) this.damageZombie(zombie, weapon.damage * (0.72 + survivor.courage * 0.25), dx / length * 8, dy / length * 8, survivor);
      } else if (distance(survivor, zombie) <= weapon.range + zombie.radius) {
        this.damageZombie(zombie, weapon.damage * (0.68 + survivor.courage * 0.24), dx / length * 7, dy / length * 7, survivor);
        this.emitNoise(survivor.x, survivor.y, weapon.noise, "survivor melee");
      }
    }
    updateZombies(dt) {
      const player = this.player;
      const night = this.nightStrength();
      const humanTargets = [player, ...this.survivors.filter((survivor) => !survivor.dead)];
      for (const zombie of this.zombies) {
        zombie.deathAnim = Math.max(0, (zombie.deathAnim ?? 0) - dt * 2.5);
        if (zombie.dead) continue;
        const profile = ZOMBIE_ARCHETYPES[zombie.archetype] || ZOMBIE_ARCHETYPES.normal;
        zombie.animTime ?? (zombie.animTime = 0);
        zombie.moveBlend ?? (zombie.moveBlend = 0);
        zombie.attackCooldown = Math.max(0, zombie.attackCooldown - dt);
        zombie.bashCooldown = Math.max(0, (zombie.bashCooldown || 0) - dt);
        zombie.howlCooldown = Math.max(0, (zombie.howlCooldown || 0) - dt);
        zombie.hitFlash = Math.max(0, zombie.hitFlash - dt);
        zombie.attackAnim = Math.max(0, zombie.attackAnim - dt);
        zombie.hurtAnim = Math.max(0, zombie.hurtAnim - dt);
        zombie.senseTimer -= dt;
        zombie.pathTimer -= dt;
        zombie.wanderTimer -= dt;
        zombie.memory = Math.max(0, zombie.memory - dt);
        const playerDistance = distance(zombie, player);
        if (playerDistance > 1500 && zombie.state === "wander") {
          zombie.moveBlend += (0 - zombie.moveBlend) * Math.min(1, dt * 5);
          continue;
        }
        if (zombie.senseTimer <= 0) {
          zombie.senseTimer = 0.16 + Math.random() * 0.18;
          let seen = null;
          let seenDistance = Infinity;
          for (const target of humanTargets) {
            const d = distance(zombie, target);
            const stealth = target === player ? (player.crouching ? 0.52 : 1) * (player.sprintingNow ? 1.2 : 1) : 0.92;
            const sightRange = (315 - night * 105) * (zombie.sight || 1) * stealth;
            if (d < sightRange && d < seenDistance && this.hasVision(zombie, target)) {
              seen = target;
              seenDistance = d;
            }
          }
          const lightDistance = distance(zombie, player);
          let seesLight = false;
          if (!seen && player.flashlight && night > 0.16 && lightDistance < 650 * (zombie.sight || 1) && this.hasVision(zombie, player)) {
            const towardZombieX = (zombie.x - player.x) / (lightDistance || 1);
            const towardZombieY = (zombie.y - player.y) / (lightDistance || 1);
            seesLight = towardZombieX * player.facingX + towardZombieY * player.facingY > 0.18 || lightDistance < 115;
          }
          if (seen || seesLight) {
            const target = seen || player;
            zombie.state = seen ? "chase" : "investigate";
            zombie.targetEntityId = target === player ? "player" : target.id;
            zombie.targetX = target.x;
            zombie.targetY = target.y;
            zombie.memory = seen ? 8 : 5;
            if (zombie.archetype === "howler" && seen && zombie.howlCooldown <= 0) this.zombieHowl(zombie, target);
            for (const packmate of this.zombies) {
              if (packmate.dead || packmate === zombie || packmate.packId !== zombie.packId || distance(packmate, zombie) > 430) continue;
              packmate.state = "investigate";
              packmate.targetX = target.x;
              packmate.targetY = target.y;
              packmate.targetEntityId = zombie.targetEntityId;
              packmate.memory = Math.max(packmate.memory, 5);
            }
          } else if (zombie.state !== "chase" || zombie.memory <= 0) {
            const heard = this.loudestNoiseFor(zombie);
            if (heard) {
              zombie.state = "investigate";
              zombie.targetX = heard.x;
              zombie.targetY = heard.y;
              zombie.targetEntityId = null;
              zombie.memory = 6 + (zombie.curiosity || 0.5) * 5;
            } else if (zombie.memory <= 0) {
              zombie.state = "wander";
              zombie.targetEntityId = null;
              zombie.path = [];
            }
          }
        }
        let targetEntity = zombie.targetEntityId === "player" ? player : this.survivors.find((survivor) => survivor.id === zombie.targetEntityId && !survivor.dead);
        if (targetEntity && zombie.memory > 0) {
          zombie.targetX = targetEntity.x;
          zombie.targetY = targetEntity.y;
        } else if (zombie.targetEntityId && !targetEntity) {
          zombie.targetEntityId = null;
          zombie.state = "investigate";
        }
        if (zombie.state === "wander" && zombie.wanderTimer <= 0) {
          zombie.wanderTimer = 2.5 + Math.random() * 4.5;
          zombie.angle += (Math.random() - 0.5) * Math.PI * 1.8;
          zombie.targetX = zombie.x + Math.cos(zombie.angle) * (80 + Math.random() * 150);
          zombie.targetY = zombie.y + Math.sin(zombie.angle) * (80 + Math.random() * 150);
        }
        targetEntity = targetEntity || null;
        const targetDistance = targetEntity ? distance(zombie, targetEntity) : Math.hypot(zombie.targetX - zombie.x, zombie.targetY - zombie.y);
        if (targetEntity && targetDistance < zombie.radius + targetEntity.radius + 13) {
          zombie.state = "chase";
          zombie.memory = 7;
          zombie.moveBlend *= Math.max(0, 1 - dt * 8);
          if (zombie.attackCooldown <= 0) this.zombieAttack(zombie, targetEntity);
          continue;
        }
        if (targetDistance < 17 && zombie.state === "investigate") {
          zombie.state = "wander";
          zombie.memory = 0;
        }
        if (playerDistance > 1250 && zombie.state === "wander") continue;
        let targetX = zombie.targetX;
        let targetY = zombie.targetY;
        const direct = this.hasVision(zombie, { x: targetX, y: targetY });
        if (!direct && zombie.pathTimer <= 0 && (zombie.state !== "wander" || playerDistance < 720)) {
          zombie.pathTimer = 1.05 + Math.random() * 0.75;
          zombie.path = findPath(this.world, zombie.x / TILE_SIZE, zombie.y / TILE_SIZE, targetX / TILE_SIZE, targetY / TILE_SIZE, 1050);
        }
        if (!direct && zombie.path?.length) {
          const node = zombie.path[0];
          targetX = (node.x + 0.5) * TILE_SIZE;
          targetY = (node.y + 0.5) * TILE_SIZE;
          if (Math.hypot(targetX - zombie.x, targetY - zombie.y) < 13) zombie.path.shift();
        }
        let dx = targetX - zombie.x;
        let dy = targetY - zombie.y;
        const length = Math.hypot(dx, dy) || 1;
        dx /= length;
        dy /= length;
        const stateSpeed = zombie.state === "chase" ? profile.chase : zombie.state === "investigate" ? 1.04 : 0.58;
        const speed = zombie.speed * stateSpeed * (this.day > 2 ? 1.06 : 1);
        const oldX = zombie.x;
        const oldY = zombie.y;
        this.moveCircle(zombie, dx * speed * dt, dy * speed * dt, true);
        zombie.angle = Math.atan2(dy, dx);
        const moved = Math.hypot(zombie.x - oldX, zombie.y - oldY);
        zombie.moveBlend += ((moved > 0.08 ? 1 : 0) - zombie.moveBlend) * Math.min(1, dt * 11);
        zombie.animTime += dt * (1.45 + zombie.moveBlend * (zombie.state === "chase" ? 7.4 : 4.1));
        if (moved < speed * dt * 0.18) {
          const door = this.nearestDoor(zombie, zombie.radius + 28, true);
          if (door && (zombie.state === "chase" || zombie.state === "investigate")) {
            zombie.state = "bash";
            if (zombie.bashCooldown <= 0) {
              zombie.bashCooldown = zombie.archetype === "brute" ? 0.38 : 0.68 + Math.random() * 0.3;
              zombie.attackAnim = 0.42;
              door.door.hp -= profile.doorDamage * (0.8 + (zombie.aggression || 1) * 0.35);
              this.emitNoise(door.x, door.y, door.door.style === "steel" ? 170 : 112, "door impact");
              if (door.door.hp <= 0) {
                door.door.hp = 0;
                door.door.broken = true;
                door.door.open = true;
                this.emitNoise(door.x, door.y, 340, "door collapse");
                if (distance(door, player) < 550) this.toast("A door was smashed open.", "danger");
              }
            }
          } else {
            const barricade = this.structures.find((structure) => structure.type === "barricade" && this.circleRectOverlap(zombie.x, zombie.y, zombie.radius + 8, structure));
            if (barricade) {
              barricade.hp -= dt * profile.doorDamage;
              if (Math.random() < dt * 2) this.emitNoise(barricade.x, barricade.y, 90, "wood impact");
            } else {
              const side = Math.random() < 0.5 ? -1 : 1;
              this.moveCircle(zombie, -dy * speed * dt * side, dx * speed * dt * side, true);
            }
          }
        }
      }
      this.zombies = this.zombies.filter((zombie) => !zombie.remove);
    }
    zombieHowl(zombie, target) {
      zombie.howlCooldown = 13 + Math.random() * 8;
      zombie.attackAnim = 0.7;
      this.emitNoise(zombie.x, zombie.y, 720, "howler scream");
      for (const other of this.zombies) {
        if (other.dead || distance(other, zombie) > 720) continue;
        other.state = "investigate";
        other.targetX = target.x;
        other.targetY = target.y;
        other.targetEntityId = target === this.player ? "player" : target.id;
        other.memory = Math.max(other.memory, 9);
      }
      if (distance(zombie, this.player) < 620) this.toast("A howler's scream carries across the district.", "danger");
    }
    zombieAttack(zombie, target = this.player) {
      const profile = ZOMBIE_ARCHETYPES[zombie.archetype] || ZOMBIE_ARCHETYPES.normal;
      zombie.attackCooldown = (zombie.archetype === "runner" ? 0.58 : 0.88) + Math.random() * 0.38;
      zombie.attackAnim = 0.42;
      if (target === this.player) {
        if (target.hurtCooldown > 0) return;
        target.hurtCooldown = 0.48;
        target.hurtAnim = 0.3;
        const damage = profile.damage[0] + Math.random() * (profile.damage[1] - profile.damage[0]);
        target.health = Math.max(0, target.health - damage);
        this.camera.shake = Math.max(this.camera.shake, zombie.archetype === "brute" ? 12 : 7);
        this.addBlood(target.x, target.y, 4);
        if (Math.random() < profile.infection) {
          const infection = 4 + Math.random() * 13;
          const first = target.infection <= 0;
          target.infection = Math.min(100, target.infection + infection);
          if (first) this.toast("The bite broke skin. Infection risk detected.", "danger");
        } else {
          this.toast(`${profile.label} hit: -${Math.round(damage)} health`, "danger");
        }
      } else {
        this.damageSurvivor(target, profile.damage[0] + Math.random() * (profile.damage[1] - profile.damage[0]), zombie);
      }
    }
    damageSurvivor(survivor, amount, zombie = null) {
      if (survivor.dead || survivor.hurtCooldown > 0) return;
      survivor.health -= amount;
      survivor.hurtCooldown = 0.32;
      survivor.hurtAnim = 0.3;
      survivor.state = "flee";
      this.addBlood(survivor.x, survivor.y, 3);
      if (survivor.health > 0) return;
      survivor.dead = true;
      survivor.speech = "";
      if (survivor.chunkKey) {
        const state = this.world.chunkStates.get(survivor.chunkKey) || {};
        state.clearedSurvivorIds = [.../* @__PURE__ */ new Set([...state.clearedSurvivorIds || [], survivor.id])];
        this.world.chunkStates.set(survivor.chunkKey, state);
      }
      this.effects.push({ type: "death", x: survivor.x, y: survivor.y, life: 8, maxLife: 8 });
      if (distance(survivor, this.player) < 560) this.toast(`${survivor.name} was killed${zombie ? ` by a ${ZOMBIE_ARCHETYPES[zombie.archetype]?.label.toLowerCase() || "walker"}` : ""}.`, "danger");
    }
    updateStructures(dt) {
      for (const structure of this.structures) {
        if (structure.type === "noise_trap") {
          structure.timer -= dt;
          if (structure.timer <= 0 && !structure.triggered) {
            structure.triggered = true;
            structure.removeTimer = 1.4;
            this.emitNoise(structure.x, structure.y, 760, "noise trap");
            this.camera.shake = Math.max(this.camera.shake, 5);
            this.toast("The noise trap is ringing across the county.");
          }
          if (structure.triggered) structure.removeTimer -= dt;
        }
      }
      const broken = this.structures.filter((structure) => structure.hp <= 0);
      for (const structure of broken) {
        this.emitNoise(structure.x, structure.y, 230, "barricade collapse");
        this.toast("A barricade was destroyed.", "danger");
      }
      this.structures = this.structures.filter((structure) => structure.hp > 0 && !(structure.triggered && structure.removeTimer <= 0));
    }
    updateEffects(dt) {
      for (const noise of this.noises) noise.age += dt;
      this.noises = this.noises.filter((noise) => noise.age < noise.life);
      for (const effect of this.effects) {
        effect.life -= dt;
        effect.x += (effect.vx || 0) * dt;
        effect.y += (effect.vy || 0) * dt;
      }
      this.effects = this.effects.filter((effect) => effect.life > 0);
      for (const container of this.world.containers) container.openAnim = Math.max(0, (container.openAnim || 0) - dt * 1.8);
      this.camera.shake = Math.max(0, this.camera.shake - dt * 22);
    }
    updateCamera(dt) {
      const smoothing = 1 - Math.exp(-dt * 8);
      this.camera.x += (this.player.x - this.camera.x) * smoothing;
      this.camera.y += (this.player.y - this.camera.y) * smoothing;
    }
    moveCircle(entity, amountX, amountY, includeStructures = false) {
      const nextX = entity.x + amountX;
      if (!this.circleBlocked(nextX, entity.y, entity.radius, includeStructures)) entity.x = nextX;
      const nextY = entity.y + amountY;
      if (!this.circleBlocked(entity.x, nextY, entity.radius, includeStructures)) entity.y = nextY;
      entity.x = clamp(entity.x, entity.radius, this.world.width * TILE_SIZE - entity.radius);
      entity.y = clamp(entity.y, entity.radius, this.world.height * TILE_SIZE - entity.radius);
    }
    circleBlocked(x, y, radius, includeStructures = true) {
      const minX = Math.floor((x - radius) / TILE_SIZE);
      const maxX = Math.floor((x + radius) / TILE_SIZE);
      const minY = Math.floor((y - radius) / TILE_SIZE);
      const maxY = Math.floor((y + radius) / TILE_SIZE);
      for (let ty = minY; ty <= maxY; ty += 1) {
        for (let tx = minX; tx <= maxX; tx += 1) {
          if (!isSolidTile(getTile(this.world, tx, ty)) && !this.isDoorClosed(tx, ty)) continue;
          const left = tx * TILE_SIZE;
          const top = ty * TILE_SIZE;
          const nearestX = clamp(x, left, left + TILE_SIZE);
          const nearestY = clamp(y, top, top + TILE_SIZE);
          if ((x - nearestX) ** 2 + (y - nearestY) ** 2 < radius ** 2) return true;
        }
      }
      for (const car of this.world.cars) {
        if (this.circleRectOverlap(x, y, radius, { x: car.x, y: car.y, w: car.w, h: car.h, centered: true })) return true;
      }
      if (includeStructures) {
        for (const structure of this.structures) {
          if (structure.type === "barricade" && this.circleRectOverlap(x, y, radius, structure)) return true;
        }
      }
      return false;
    }
    circleRectOverlap(x, y, radius, rect) {
      const left = rect.centered === false ? rect.x : rect.x - rect.w / 2;
      const top = rect.centered === false ? rect.y : rect.y - rect.h / 2;
      const nearestX = clamp(x, left, left + rect.w);
      const nearestY = clamp(y, top, top + rect.h);
      return (x - nearestX) ** 2 + (y - nearestY) ** 2 < radius ** 2;
    }
    loudestNoiseFor(zombie) {
      let best = null;
      let score = 0;
      for (const noise of this.noises) {
        const d = Math.hypot(noise.x - zombie.x, noise.y - zombie.y);
        const reach = noise.radius * (zombie.hearing || 1) * (1 - noise.age / noise.life);
        if (d > reach) continue;
        const candidate = (reach - d) * (0.72 + (zombie.curiosity || 0.5) * 0.45);
        if (candidate > score) {
          score = candidate;
          best = noise;
        }
      }
      return best;
    }
    emitNoise(x, y, radius, type) {
      const gunfire = radius >= 400 || /pistol|rifle|shotgun|revolver|carbine|gun/i.test(type || "");
      this.noises.push({ x, y, radius, type, gunfire, age: 0, life: gunfire ? 3.4 : radius > 250 ? 2.5 : 1.8 });
      if (this.noises.length > 48) this.noises.shift();
    }
    aimVector() {
      if (!matchMedia("(pointer: coarse)").matches && this.input.pointer.active) {
        const target = this.screenToWorld(this.input.pointer.x, this.input.pointer.y);
        const dx = target.x - this.player.x;
        const dy = target.y - this.player.y;
        const length = Math.hypot(dx, dy) || 1;
        return { x: dx / length, y: dy / length };
      }
      const nearest = this.zombies.filter((zombie) => !zombie.dead && !this.isHiddenInside(zombie) && distance(zombie, this.player) < 560).sort((a, b) => distance(a, this.player) - distance(b, this.player))[0];
      if (nearest) {
        const dx = nearest.x - this.player.x;
        const dy = nearest.y - this.player.y;
        const length = Math.hypot(dx, dy) || 1;
        return { x: dx / length, y: dy / length };
      }
      return { x: this.player.facingX, y: this.player.facingY };
    }
    attack() {
      const player = this.player;
      if (player.attackCooldown > 0 || player.stamina <= 1) return;
      const weapon = ITEMS[player.equipped] ?? FISTS;
      const aim = this.aimVector();
      player.facingX = aim.x;
      player.facingY = aim.y;
      player.attackCooldown = weapon.cooldown;
      player.stamina = Math.max(0, player.stamina - (weapon.staminaCost || 2));
      if (weapon.mode === "ranged") {
        if (!this.removeItem(weapon.ammo, 1)) {
          player.attackCooldown = 0.18;
          this.toast(`No ${ITEMS[weapon.ammo].name.toLowerCase()}.`, "danger");
          return;
        }
        player.attackMode = "ranged";
        player.attackDuration = weapon.pellets || player.equipped === "rifle" ? 0.28 : 0.18;
        player.attackAnim = player.attackDuration;
        const pellets = weapon.pellets || 1;
        for (let i = 0; i < pellets; i += 1) {
          const angle = Math.atan2(aim.y, aim.x) + (Math.random() - 0.5) * (weapon.spread || 0.035);
          this.traceShot(angle, weapon);
        }
        this.emitNoise(player.x, player.y, weapon.noise, weapon.name);
        this.camera.shake = weapon.pellets ? 10 : player.equipped === "rifle" ? 8 : player.equipped === "revolver" ? 6 : 5;
        this.effects.push({ type: "muzzle", x: player.x + aim.x * 18, y: player.y + aim.y * 18, life: 0.09, maxLife: 0.09 });
        this.effects.push({
          type: "casing",
          x: player.x - aim.y * 8,
          y: player.y + aim.x * 8,
          vx: -aim.y * (45 + Math.random() * 35) - aim.x * 12,
          vy: aim.x * (45 + Math.random() * 35) - aim.y * 12,
          life: 0.42,
          maxLife: 0.42,
          shell: weapon.ammo === "shell"
        });
        this.updateHotbar();
      } else {
        player.attackMode = "melee";
        player.attackDuration = clamp(weapon.cooldown * 0.58, 0.22, 0.42);
        player.attackAnim = player.attackDuration;
        this.emitNoise(player.x, player.y, weapon.noise, "melee");
        let best = null;
        let bestDistance = Infinity;
        for (const zombie of this.zombies) {
          if (zombie.dead) continue;
          const dx = zombie.x - player.x;
          const dy = zombie.y - player.y;
          const d = Math.hypot(dx, dy);
          if (d > weapon.range + zombie.radius) continue;
          const dot = dx / d * aim.x + dy / d * aim.y;
          if (dot > 0.18 && d < bestDistance) {
            best = zombie;
            bestDistance = d;
          }
        }
        if (best) {
          const critical = Math.random() < 0.12;
          this.damageZombie(best, weapon.damage * (critical ? 1.75 : 1), aim.x * 14, aim.y * 14);
        }
        const swingStyle = ["knife", "spear"].includes(player.equipped) ? "thrust" : ["axe", "hammer", "sledgehammer"].includes(player.equipped) ? "overhead" : "sweep";
        this.effects.push({ type: "swing", style: swingStyle, x: player.x, y: player.y, angle: Math.atan2(aim.y, aim.x), life: 0.14, maxLife: 0.14, range: weapon.range });
      }
    }
    traceShot(angle, weapon) {
      const dx = Math.cos(angle);
      const dy = Math.sin(angle);
      let hit = null;
      let hitDistance = weapon.range;
      let hitDoor = null;
      for (let along = 12; along <= weapon.range; along += 8) {
        const tx = Math.floor((this.player.x + dx * along) / TILE_SIZE);
        const ty = Math.floor((this.player.y + dy * along) / TILE_SIZE);
        const door = this.doorAtTile(tx, ty);
        if (door && !door.open && !door.broken) {
          hitDistance = along;
          hitDoor = door;
          break;
        }
        if (isSolidTile(getTile(this.world, tx, ty))) {
          hitDistance = along;
          break;
        }
      }
      for (const zombie of this.zombies) {
        if (zombie.dead || this.isHiddenInside(zombie)) continue;
        const zx = zombie.x - this.player.x;
        const zy = zombie.y - this.player.y;
        const along = zx * dx + zy * dy;
        if (along <= 0 || along > hitDistance) continue;
        const perpendicular = Math.abs(zx * dy - zy * dx);
        if (perpendicular <= zombie.radius + 4) {
          hit = zombie;
          hitDistance = along;
          hitDoor = null;
        }
      }
      const endX = this.player.x + dx * hitDistance;
      const endY = this.player.y + dy * hitDistance;
      this.effects.push({ type: "tracer", x: this.player.x, y: this.player.y, x2: endX, y2: endY, life: 0.08, maxLife: 0.08 });
      if (hitDoor) {
        hitDoor.hp -= weapon.damage * (weapon.pellets ? 0.12 : 0.62);
        this.emitNoise(endX, endY, 115, "bullet impact");
        if (hitDoor.hp <= 0) {
          hitDoor.hp = 0;
          hitDoor.broken = true;
          hitDoor.open = true;
          this.emitNoise(endX, endY, 330, "door collapse");
        }
      }
      if (hit) {
        const falloff = 1 - hitDistance / weapon.range * 0.25;
        this.damageZombie(hit, weapon.damage * falloff, dx * 18, dy * 18);
      }
    }
    damageZombie(zombie, amount, knockX = 0, knockY = 0, source = this.player) {
      zombie.health -= amount;
      zombie.hitFlash = 0.1;
      zombie.hurtAnim = 0.28;
      zombie.x += knockX;
      zombie.y += knockY;
      zombie.state = "chase";
      zombie.targetX = this.player.x;
      zombie.targetY = this.player.y;
      zombie.memory = 9;
      this.addBlood(zombie.x, zombie.y, 3);
      if (zombie.health <= 0 && !zombie.dead) {
        zombie.dead = true;
        zombie.deathAnim = 1;
        zombie.attackAnim = 0;
        zombie.remove = false;
        if (source === this.player) this.player.kills += 1;
        if (zombie.chunkKey && !String(zombie.id).startsWith("h")) {
          const state = this.world.chunkStates.get(zombie.chunkKey) || {};
          state.clearedZombieIds = [.../* @__PURE__ */ new Set([...state.clearedZombieIds || [], zombie.id])];
          this.world.chunkStates.set(zombie.chunkKey, state);
        }
        this.addBlood(zombie.x, zombie.y, 8);
        this.effects.push({ type: "death", x: zombie.x, y: zombie.y, life: 8, maxLife: 8 });
        if (zombie.archetype === "bloater") this.explodeBloater(zombie, source);
        if (source === this.player && this.player.kills === 1) this.toast("First kill. The noise may bring more.");
        this.updateObjective();
      }
    }
    explodeBloater(zombie, source) {
      const radius = 112;
      this.emitNoise(zombie.x, zombie.y, 610, "bloater rupture");
      this.effects.push({ type: "blast", x: zombie.x, y: zombie.y, life: 0.48, maxLife: 0.48, radius });
      this.camera.shake = Math.max(this.camera.shake, distance(zombie, this.player) < 420 ? 11 : 4);
      if (distance(zombie, this.player) < radius) {
        this.player.health = Math.max(0, this.player.health - 18);
        this.player.infection = Math.min(100, this.player.infection + 7);
        this.toast("Bloater bile burned through your clothes.", "danger");
      }
      for (const survivor of this.survivors) {
        if (!survivor.dead && distance(zombie, survivor) < radius) this.damageSurvivor(survivor, 22);
      }
      for (const other of this.zombies) {
        if (!other.dead && other !== zombie && distance(zombie, other) < radius) {
          this.damageZombie(other, 18, 0, 0, source);
          other.state = "investigate";
          other.targetX = zombie.x;
          other.targetY = zombie.y;
        }
      }
    }
    addBlood(x, y, count) {
      for (let i = 0; i < count; i += 1) {
        this.blood.push({ x: x + (Math.random() - 0.5) * 24, y: y + (Math.random() - 0.5) * 24, size: 2 + Math.random() * 6, alpha: 0.35 + Math.random() * 0.35 });
      }
      if (this.blood.length > 260) this.blood.splice(0, this.blood.length - 260);
    }
    nearestSearchable(maxRange = 104) {
      let closest = null;
      let best = maxRange;
      for (const container of this.world.containers) {
        if (this.isHiddenInside(container)) continue;
        const edgeDistance = furnitureDistance(container, this.player);
        const visible = this.hasVision(this.player, container);
        if (visible && edgeDistance < best) {
          best = edgeDistance;
          closest = { ...container, ref: container, source: "container", interactionDistance: edgeDistance };
        }
      }
      for (const car of this.world.cars) {
        const d = distance(car, this.player);
        const edgeDistance = Math.max(0, d - Math.max(car.w, car.h) / 2);
        if (edgeDistance < best) {
          best = edgeDistance;
          closest = { ...car, ref: car, kind: "wrecked car", source: "car", interactionDistance: edgeDistance };
        }
      }
      return closest;
    }
    nearestWorldInteractable(maxRange = 104) {
      const searchable = this.nearestSearchable(maxRange);
      const nearDoor = this.nearestDoor(this.player, Math.min(maxRange, 78));
      if (!nearDoor || searchable && searchable.interactionDistance <= nearDoor.distance) return searchable;
      return {
        ref: nearDoor.door,
        source: "door",
        kind: `${nearDoor.door.style || "wood"} door`,
        interactionDistance: nearDoor.distance,
        x: nearDoor.x,
        y: nearDoor.y
      };
    }
    toggleDoor(door) {
      if (door.broken) {
        this.toast("The door is broken off its frame.");
        return;
      }
      if (door.open) {
        const center = { x: (door.x + 0.5) * TILE_SIZE, y: (door.y + 0.5) * TILE_SIZE };
        const occupied = [this.player, ...this.survivors, ...this.zombies].some((entity) => !entity.dead && distance(entity, center) < (entity.radius || 10) + 12);
        if (occupied) {
          this.toast("Something is blocking the doorway.", "danger");
          return;
        }
      }
      door.open = !door.open;
      const metal = door.style === "steel" || door.style === "barred";
      this.emitNoise((door.x + 0.5) * TILE_SIZE, (door.y + 0.5) * TILE_SIZE, metal ? 125 : 68, door.open ? "door opening" : "door closing");
      this.toast(`${door.open ? "Opened" : "Closed"} ${door.exterior ? "exterior " : ""}door.`);
    }
    interact() {
      if (this.mode !== "playing") return;
      if (this.panelOpen === "lootPanel") {
        this.takeAllLoot();
        return;
      }
      if (this.panelOpen) return;
      const searchable = this.nearestWorldInteractable();
      if (!searchable) {
        this.toast("Nothing nearby to search.");
        return;
      }
      const ref = searchable.ref;
      if (searchable.source === "door") {
        this.toggleDoor(ref);
        return;
      }
      ref.openAnim = 1;
      if (!ref.searched) {
        ref.searched = true;
        this.stats.searched += 1;
        this.emitNoise(this.player.x, this.player.y, 55, "searching");
        this.updateObjective();
      }
      this.openContainer = ref;
      $("#lootTitle").textContent = titleCase(searchable.kind || "container");
      this.renderLoot();
      this.openPanel("lootPanel");
    }
    renderLoot() {
      const list = $("#lootList");
      list.replaceChildren();
      if (!this.openContainer?.loot?.length) {
        const empty = document.createElement("div");
        empty.className = "empty";
        empty.textContent = "Picked clean. Nothing remains.";
        list.append(empty);
        $("#takeAllBtn").disabled = true;
        return;
      }
      $("#takeAllBtn").disabled = false;
      this.openContainer.loot.forEach((entry, index) => {
        const item = ITEMS[entry.id];
        const row = this.makeItemRow(entry, item);
        row.classList.add("loot-row");
        row.setAttribute("aria-label", `Take ${item.name}`);
        let touchHandled = false;
        row.addEventListener("pointerup", (event) => {
          if (event.pointerType !== "touch") return;
          event.preventDefault();
          touchHandled = true;
          this.takeLoot(index);
        });
        row.addEventListener("click", () => {
          if (touchHandled) return;
          this.takeLoot(index);
        });
        list.append(row);
      });
    }
    takeLoot(index) {
      const entry = this.openContainer?.loot[index];
      if (!entry) return;
      const accepted = this.addItem(entry.id, entry.qty);
      if (accepted <= 0) {
        this.toast("Your pack is too heavy.", "danger");
        return;
      }
      entry.qty -= accepted;
      if (entry.qty <= 0) this.openContainer.loot.splice(index, 1);
      this.toast(`Took ${ITEMS[entry.id].name}${accepted > 1 ? ` \xD7${accepted}` : ""}.`);
      this.renderLoot();
      this.renderInventory();
      this.updateHotbar();
    }
    takeAllLoot() {
      if (!this.openContainer) return;
      let taken = 0;
      for (let index = this.openContainer.loot.length - 1; index >= 0; index -= 1) {
        const entry = this.openContainer.loot[index];
        const accepted = this.addItem(entry.id, entry.qty);
        if (accepted > 0) {
          entry.qty -= accepted;
          taken += accepted;
          if (entry.qty <= 0) this.openContainer.loot.splice(index, 1);
        }
      }
      this.toast(taken ? `Packed ${taken} item${taken === 1 ? "" : "s"}.` : "No room left in your pack.", taken ? "" : "danger");
      this.renderLoot();
      this.renderInventory();
      this.updateHotbar();
    }
    inventoryWeight() {
      return this.player.inventory.reduce((sum, entry) => sum + itemWeight(entry), 0);
    }
    maxWeight() {
      return 18 + (this.player.inventory.some((entry) => entry.id === "backpack") ? ITEMS.backpack.capacity : 0);
    }
    addItem(id, quantity = 1) {
      const item = ITEMS[id];
      if (!item) return 0;
      const unitWeight = item.weight || 0;
      const availableWeight = Math.max(0, this.maxWeight() - this.inventoryWeight());
      const weightLimit = unitWeight > 0 ? Math.floor((availableWeight + 1e-4) / unitWeight) : quantity;
      let remaining = Math.min(quantity, Math.max(0, weightLimit));
      const accepted = remaining;
      if (!remaining) return 0;
      for (const entry of this.player.inventory) {
        if (entry.id !== id || entry.qty >= item.maxStack) continue;
        const moved = Math.min(remaining, item.maxStack - entry.qty);
        entry.qty += moved;
        remaining -= moved;
        if (!remaining) break;
      }
      while (remaining > 0) {
        const moved = Math.min(remaining, item.maxStack);
        this.player.inventory.push({ id, qty: moved });
        remaining -= moved;
      }
      this.autoHotbar(id);
      return accepted;
    }
    removeItem(id, quantity = 1) {
      if (this.itemCount(id) < quantity) return false;
      let remaining = quantity;
      for (let i = this.player.inventory.length - 1; i >= 0 && remaining > 0; i -= 1) {
        const entry = this.player.inventory[i];
        if (entry.id !== id) continue;
        const moved = Math.min(remaining, entry.qty);
        entry.qty -= moved;
        remaining -= moved;
        if (entry.qty <= 0) this.player.inventory.splice(i, 1);
      }
      if (id === this.player.equipped && this.itemCount(id) <= 0) {
        this.player.equipped = null;
        this.player.hotbar = this.player.hotbar.map((slot) => slot === id ? null : slot);
      }
      return true;
    }
    itemCount(id) {
      return this.player.inventory.filter((entry) => entry.id === id).reduce((sum, entry) => sum + entry.qty, 0);
    }
    autoHotbar(id) {
      const item = ITEMS[id];
      if (!item || !["weapon", "food", "drink", "medical", "gear"].includes(item.kind)) return;
      if (this.player.hotbar.includes(id)) return;
      const empty = this.player.hotbar.indexOf(null);
      if (empty >= 0) this.player.hotbar[empty] = id;
    }
    makeItemRow(entry, item) {
      const row = document.createElement("button");
      row.type = "button";
      row.className = "item-row";
      const icon = document.createElement("span");
      icon.className = "item-icon";
      icon.textContent = item.icon;
      const copy = document.createElement("div");
      const name = document.createElement("b");
      name.textContent = item.name;
      const description = document.createElement("p");
      description.textContent = item.description;
      copy.append(name, description);
      const qty = document.createElement("span");
      qty.textContent = entry.qty > 1 ? `\xD7${entry.qty}` : `${item.weight ?? 0}kg`;
      row.append(icon, copy, qty);
      return row;
    }
    renderInventory() {
      if (!this.player) return;
      const list = $("#inventoryList");
      list.replaceChildren();
      if (!this.player.inventory.length) {
        const empty = document.createElement("div");
        empty.className = "empty";
        empty.textContent = "Your pack is empty.";
        list.append(empty);
      }
      this.player.inventory.forEach((entry, index) => {
        const row = this.makeItemRow(entry, ITEMS[entry.id]);
        if (index === this.selectedInventoryIndex) row.classList.add("selected");
        row.addEventListener("click", () => this.useInventoryItem(index));
        list.append(row);
      });
      const weight = this.inventoryWeight();
      const max = this.maxWeight();
      $("#weightValue").textContent = `${weight.toFixed(1)} / ${max} kg`;
      $("#weightBar").style.width = `${clamp(weight / max * 100, 0, 100)}%`;
      $("#dropItemBtn").disabled = this.selectedInventoryIndex < 0;
    }
    useInventoryItem(index) {
      const entry = this.player.inventory[index];
      if (!entry) return;
      const item = ITEMS[entry.id];
      this.selectedInventoryIndex = index;
      if (item.kind === "weapon") {
        this.player.equipped = entry.id;
        this.autoHotbar(entry.id);
        const slot = this.player.hotbar.indexOf(entry.id);
        if (slot >= 0) this.selectHotbar(slot);
        this.toast(`${item.name} equipped.`);
      } else if (item.kind === "food") {
        this.player.hunger = clamp(this.player.hunger + (item.hunger || 0), 0, 100);
        this.player.thirst = clamp(this.player.thirst + (item.thirst || 0), 0, 100);
        this.removeItem(entry.id, 1);
        this.toast(`Ate ${item.name.toLowerCase()}.`);
      } else if (item.kind === "drink") {
        this.player.thirst = clamp(this.player.thirst + (item.thirst || 0), 0, 100);
        this.player.stamina = clamp(this.player.stamina + (item.stamina || 0), 0, 100);
        this.removeItem(entry.id, 1);
        this.toast(`Drank ${item.name.toLowerCase()}.`);
      } else if (item.kind === "medical") {
        this.player.health = clamp(this.player.health + (item.health || 0), 0, 100);
        this.player.stamina = clamp(this.player.stamina + (item.stamina || 0), 0, 100);
        this.player.infection = clamp(this.player.infection + (item.infection || 0), 0, 100);
        this.removeItem(entry.id, 1);
        this.toast(`Used ${item.name.toLowerCase()}.`);
      } else if (item.kind === "gear" && item.light) {
        this.player.flashlight = !this.player.flashlight;
        this.toast(`Flashlight ${this.player.flashlight ? "on" : "off"}.`);
      } else if (item.kind === "gear") {
        this.toast(`${item.name} is equipped automatically.`);
      }
      this.selectedInventoryIndex = Math.min(this.selectedInventoryIndex, this.player.inventory.length - 1);
      this.renderInventory();
      this.renderRecipes();
      this.updateHotbar();
    }
    dropSelectedItem() {
      const entry = this.player.inventory[this.selectedInventoryIndex];
      if (!entry) return;
      const name = ITEMS[entry.id].name;
      this.removeItem(entry.id, 1);
      this.toast(`Dropped ${name.toLowerCase()}.`);
      this.selectedInventoryIndex = -1;
      this.renderInventory();
      this.updateHotbar();
    }
    updateHotbar() {
      if (!this.player) return;
      const hotbar = $("#hotbar");
      hotbar.replaceChildren();
      this.player.hotbar.forEach((id, index) => {
        const slot = document.createElement("button");
        slot.type = "button";
        slot.className = `hot-slot${id && this.player.equipped === id ? " selected" : ""}`;
        const number = document.createElement("span");
        number.className = "slot-number";
        number.textContent = String(index + 1);
        slot.append(number);
        if (id && ITEMS[id] && this.itemCount(id) > 0) {
          const icon = document.createElement("span");
          icon.className = "item-icon";
          icon.textContent = ITEMS[id].icon;
          const qty = document.createElement("small");
          qty.textContent = ITEMS[id].kind === "weapon" && ITEMS[id].ammo ? String(this.itemCount(ITEMS[id].ammo)) : String(this.itemCount(id));
          slot.append(icon, qty);
        } else if (id) {
          this.player.hotbar[index] = null;
        }
        slot.addEventListener("click", () => this.selectHotbar(index));
        hotbar.append(slot);
      });
    }
    selectHotbar(index) {
      const id = this.player.hotbar[index];
      if (!id || this.itemCount(id) <= 0) return;
      const item = ITEMS[id];
      if (item.kind === "weapon") {
        this.player.equipped = id;
        this.toast(`${item.name} equipped.`);
      } else {
        const inventoryIndex = this.player.inventory.findIndex((entry) => entry.id === id);
        this.useInventoryItem(inventoryIndex);
      }
      this.updateHotbar();
    }
    canCraft(recipe) {
      return Object.entries(recipe.costs).every(([id, qty]) => this.itemCount(id) >= qty);
    }
    renderRecipes() {
      if (!this.player) return;
      const list = $("#recipeList");
      list.replaceChildren();
      for (const [id, recipe] of Object.entries(RECIPES)) {
        const card = document.createElement("article");
        card.className = "recipe-card";
        const header = document.createElement("header");
        const title = document.createElement("h3");
        title.textContent = recipe.name;
        const button = document.createElement("button");
        button.type = "button";
        button.textContent = recipe.build ? "PLACE" : "CRAFT";
        button.disabled = !this.canCraft(recipe);
        button.addEventListener("click", () => this.craft(id));
        header.append(title, button);
        const copy = document.createElement("p");
        copy.textContent = recipe.description;
        const costs = document.createElement("div");
        costs.className = "cost";
        for (const [itemId, qty] of Object.entries(recipe.costs)) {
          const cost = document.createElement("span");
          cost.textContent = `${ITEMS[itemId].name} ${this.itemCount(itemId)}/${qty}`;
          costs.append(cost);
        }
        card.append(header, copy, costs);
        list.append(card);
      }
    }
    craft(id) {
      const recipe = RECIPES[id];
      if (!recipe || !this.canCraft(recipe)) return;
      if (recipe.build) {
        this.buildMode = { recipeId: id, type: recipe.build };
        this.closeAllPanels();
        this.toast(`Placement mode: tap the ground near you to place ${recipe.name.toLowerCase()}.`);
        return;
      }
      for (const [itemId, qty] of Object.entries(recipe.costs)) this.removeItem(itemId, qty);
      for (const [itemId, qty] of Object.entries(recipe.gives)) this.addItem(itemId, qty);
      this.toast(`Crafted ${recipe.name.toLowerCase()}.`);
      this.renderInventory();
      this.renderRecipes();
      this.updateHotbar();
    }
    tryPlaceStructure() {
      if (!this.buildMode) return;
      let target;
      if (!matchMedia("(pointer: coarse)").matches && this.input.pointer.active) {
        target = this.screenToWorld(this.input.pointer.x, this.input.pointer.y);
      } else {
        target = { x: this.player.x + this.player.facingX * 68, y: this.player.y + this.player.facingY * 68 };
      }
      const dx = target.x - this.player.x;
      const dy = target.y - this.player.y;
      const d = Math.hypot(dx, dy) || 1;
      target.x = this.player.x + dx / d * Math.min(95, d);
      target.y = this.player.y + dy / d * Math.min(95, d);
      target.x = Math.round(target.x / 16) * 16;
      target.y = Math.round(target.y / 16) * 16;
      const recipe = RECIPES[this.buildMode.recipeId];
      if (!this.canCraft(recipe)) {
        this.buildMode = null;
        this.toast("Required materials are missing.", "danger");
        return;
      }
      const vertical = Math.abs(this.player.facingX) > Math.abs(this.player.facingY);
      const rect = this.buildMode.type === "barricade" ? { x: target.x, y: target.y, w: vertical ? 14 : 54, h: vertical ? 54 : 14, centered: true } : { x: target.x, y: target.y, w: 18, h: 18, centered: true };
      if (this.circleBlocked(target.x, target.y, Math.max(rect.w, rect.h) * 0.45, false)) {
        this.toast("That ground is blocked.", "danger");
        return;
      }
      for (const [itemId, qty] of Object.entries(recipe.costs)) this.removeItem(itemId, qty);
      if (this.buildMode.type === "barricade") this.structures.push({ ...rect, type: "barricade", hp: 110, maxHp: 110 });
      else this.structures.push({ ...rect, type: "noise_trap", hp: 1, timer: 8, triggered: false });
      this.emitNoise(target.x, target.y, 125, "building");
      this.toast(`${recipe.name} placed.`);
      this.buildMode = null;
      this.renderInventory();
      this.renderRecipes();
      this.updateHotbar();
    }
    spawnNightWanderers() {
      const targetPopulation = 85 + this.day * 9;
      const living = this.zombies.filter((zombie) => !zombie.dead).length;
      if (living >= targetPopulation) return;
      const night = this.nightStrength();
      const count = 1 + Math.floor(night * 3) + Math.min(2, this.day - 1);
      let spawned = 0;
      for (let i = 0; i < count; i += 1) {
        const angle = Math.random() * Math.PI * 2;
        const radius = 650 + Math.random() * 340;
        const x = clamp(this.player.x + Math.cos(angle) * radius, 40, this.world.width * TILE_SIZE - 40);
        const y = clamp(this.player.y + Math.sin(angle) * radius, 40, this.world.height * TILE_SIZE - 40);
        if (isSolidTile(getTile(this.world, Math.floor(x / TILE_SIZE), Math.floor(y / TILE_SIZE)))) continue;
        const chunkKey = `${Math.floor(x / TILE_SIZE / CHUNK_SIZE)},${Math.floor(y / TILE_SIZE / CHUNK_SIZE)}`;
        const roll = Math.random();
        const archetype = roll < 0.58 ? "normal" : roll < 0.72 ? "runner" : roll < 0.83 ? "crawler" : roll < 0.92 ? "bloater" : roll < 0.98 ? "brute" : "howler";
        const stats = {
          normal: [38, 60],
          runner: [58, 46],
          crawler: [52, 40],
          bloater: [30, 82],
          brute: [32, 175],
          howler: [40, 66]
        }[archetype];
        this.zombies.push(this.makeZombie({
          id: `h${Date.now()}-${i}`,
          chunkKey,
          x,
          y,
          archetype,
          packId: `horde-${Math.floor(Date.now() / 35e3)}`,
          speed: stats[0] * (0.88 + Math.random() * 0.24),
          health: stats[1] * (0.88 + Math.random() * 0.24),
          hearing: 0.8 + Math.random() * 0.5,
          sight: 0.8 + Math.random() * 0.4,
          curiosity: 0.3 + Math.random() * 0.65,
          aggression: 0.6 + Math.random() * 0.55,
          hue: 0
        }));
        spawned += 1;
      }
      this.survivorSpawnCarry += spawned * 0.3;
      while (this.survivorSpawnCarry >= 1) {
        this.survivorSpawnCarry -= 1;
        const angle = Math.random() * Math.PI * 2;
        const radius = 520 + Math.random() * 260;
        const x = clamp(this.player.x + Math.cos(angle) * radius, 40, this.world.width * TILE_SIZE - 40);
        const y = clamp(this.player.y + Math.sin(angle) * radius, 40, this.world.height * TILE_SIZE - 40);
        if (isSolidTile(getTile(this.world, Math.floor(x / TILE_SIZE), Math.floor(y / TILE_SIZE)))) continue;
        const chunkKey = `${Math.floor(x / TILE_SIZE / CHUNK_SIZE)},${Math.floor(y / TILE_SIZE / CHUNK_SIZE)}`;
        const index = this.survivors.length;
        this.survivors.push(this.makeSurvivor({
          id: `hs${Date.now()}-${index}`,
          chunkKey,
          x,
          y,
          name: SURVIVOR_NAMES2[index % SURVIVOR_NAMES2.length],
          role: Math.random() < 0.28 ? "guard" : Math.random() < 0.35 ? "medic" : "scavenger",
          weapon: Math.random() < 0.35 ? "pistol" : Math.random() < 0.18 ? "lever_rifle" : "machete",
          courage: 0.3 + Math.random() * 0.62,
          health: 72 + Math.random() * 28,
          outfit: index % SURVIVOR_LOOKS.length
        }));
      }
    }
    triggerAmbientEvent() {
      this.ambientTimer = 32 + Math.random() * 55;
      const angle = Math.random() * Math.PI * 2;
      const radius = 520 + Math.random() * 850;
      const x = clamp(this.player.x + Math.cos(angle) * radius, 32, this.world.width * TILE_SIZE - 32);
      const y = clamp(this.player.y + Math.sin(angle) * radius, 32, this.world.height * TILE_SIZE - 32);
      const roll = Math.random();
      if (roll < 0.42) {
        this.emitNoise(x, y, 690, "distant gunfire");
        if (radius < 920) this.toast("A distant gunshot rolls between the buildings.");
      } else if (roll < 0.72) {
        this.emitNoise(x, y, 520, "car alarm");
        if (radius < 900) this.toast("A car alarm starts somewhere nearby.");
      } else {
        this.emitNoise(x, y, 360, "breaking glass");
        if (radius < 760) this.toast("Glass breaks in the next block.");
      }
    }
    nightStrength() {
      const hour = this.timeMinutes / 60;
      const smooth = (value) => {
        const t = clamp(value, 0, 1);
        return t * t * (3 - 2 * t);
      };
      if (hour >= 20.5 || hour < 5) return 0.94;
      if (hour >= 18) return smooth((hour - 18) / 2.5) * 0.94;
      if (hour < 7.25) return (1 - smooth((hour - 5) / 2.25)) * 0.94;
      return 0;
    }
    twilightStrength() {
      const hour = this.timeMinutes / 60;
      const dawn = clamp(1 - Math.abs(hour - 6.15) / 1.35, 0, 1);
      const dusk = clamp(1 - Math.abs(hour - 19.1) / 1.55, 0, 1);
      return Math.max(dawn, dusk);
    }
    dayPhase() {
      const hour = this.timeMinutes / 60;
      if (hour >= 20.5 || hour < 5) return "NIGHT";
      if (hour < 7.25) return "DAWN";
      if (hour >= 18) return "DUSK";
      return "DAY";
    }
    updateHUD() {
      const player = this.player;
      const hour = Math.floor(this.timeMinutes / 60);
      const minute = Math.floor(this.timeMinutes % 60);
      $("#dayLabel").textContent = `DAY ${this.day}`;
      $("#timeLabel").textContent = `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
      $("#weatherLabel").textContent = `${this.dayPhase()} \u2022 ${this.weather}`;
      for (const [name, value] of Object.entries({ health: player.health, stamina: player.stamina, hunger: player.hunger, thirst: player.thirst, infection: player.infection })) {
        $(`#${name}Bar`).style.width = `${clamp(value, 0, 100)}%`;
        $(`#${name}Value`).textContent = String(Math.round(value));
      }
      $("#infectionVital").classList.toggle("hidden", player.infection <= 0.1);
    }
    updateInteractPrompt() {
      this.nearestInteractable = this.nearestWorldInteractable();
      const prompt = $("#interactPrompt");
      const touchButton = document.querySelector('[data-action="interact"]');
      if (!this.nearestInteractable || this.panelOpen || this.mode !== "playing") {
        prompt.classList.add("hidden");
        touchButton.textContent = "SEARCH";
        touchButton.classList.remove("ready");
        return;
      }
      prompt.classList.remove("hidden");
      const action = this.nearestInteractable.source === "door" ? this.nearestInteractable.ref.open ? "CLOSE" : "OPEN" : this.nearestInteractable.ref.searched ? "OPEN" : "LOOT";
      prompt.querySelector("span").textContent = `${action} ${String(this.nearestInteractable.kind || "container").replaceAll("_", " ").toUpperCase()}`;
      touchButton.textContent = action;
      touchButton.classList.add("ready");
    }
    updateLocation() {
      const tx = Math.floor(this.player.x / TILE_SIZE);
      const ty = Math.floor(this.player.y / TILE_SIZE);
      const building = this.buildingLookup.get(`${tx},${ty}`);
      if (building) {
        $("#locationLabel").textContent = building.name.toUpperCase();
        return;
      }
      const roadX = Math.round(tx / ROAD_SPACING) * ROAD_SPACING;
      const roadY = Math.round(ty / ROAD_SPACING) * ROAD_SPACING;
      const xDistance = Math.abs(tx - roadX);
      const yDistance = Math.abs(ty - roadY);
      const roadIndex = xDistance < 4 || yDistance < 4 ? xDistance < yDistance ? Math.floor(roadX / ROAD_SPACING) : Math.floor(roadY / ROAD_SPACING) + 5 : -1;
      const sector = `${Math.floor(tx / CHUNK_SIZE)}-${Math.floor(ty / CHUNK_SIZE)}`;
      $("#locationLabel").textContent = roadIndex >= 0 ? `${STREET_NAMES[Math.abs(roadIndex) % STREET_NAMES.length].toUpperCase()} ROAD` : `HOLLOW COUNTY \u2022 SECTOR ${sector}`;
    }
    updateObjective() {
      const text = $("#objective").querySelector("p");
      if (this.stats.searched < 2) text.textContent = "Search your safe house. Find water and a weapon.";
      else if (!this.player.inventory.some((entry) => ["bat", "axe", "pistol", "shotgun"].includes(entry.id))) text.textContent = "Find a stronger weapon before nightfall.";
      else if (this.structures.length === 0) text.textContent = "Gather planks and nails. Build a barricade.";
      else if (this.day < 2) text.textContent = "Survive until dawn. Gunfire attracts distant hordes.";
      else text.textContent = "Stay fed. Fortify a home. See how long you last.";
    }
    openPanel(id) {
      if (this.mode !== "playing") return;
      const lootContext = id === "lootPanel" ? this.openContainer : null;
      this.closeAllPanels();
      this.openContainer = lootContext;
      this.panelOpen = id;
      this.gameScreen.classList.add("panel-open");
      $(`#${id}`).classList.remove("hidden");
      if (id === "inventoryPanel") this.renderInventory();
      if (id === "craftPanel") this.renderRecipes();
    }
    closePanel(id) {
      $(`#${id}`).classList.add("hidden");
      if (this.panelOpen === id) {
        this.panelOpen = null;
        this.gameScreen.classList.remove("panel-open");
      }
    }
    closeAllPanels() {
      ["inventoryPanel", "lootPanel", "craftPanel"].forEach((id) => $(`#${id}`).classList.add("hidden"));
      this.panelOpen = null;
      this.openContainer = null;
      this.gameScreen.classList.remove("panel-open");
    }
    togglePanel(id) {
      if (this.panelOpen === id) this.closePanel(id);
      else this.openPanel(id);
    }
    pause() {
      if (this.mode !== "playing") return;
      this.closeAllPanels();
      this.mode = "paused";
      $("#pausePanel").classList.remove("hidden");
      this.saveGame();
    }
    resume() {
      if (this.mode !== "paused") return;
      this.mode = "playing";
      $("#pausePanel").classList.add("hidden");
      this.lastFrame = performance.now();
    }
    die() {
      if (this.mode === "dead") return;
      this.mode = "dead";
      localStorage.removeItem(SAVE_KEY);
      $("#deathDays").textContent = String(this.day);
      $("#deathKills").textContent = String(this.player.kills);
      $("#deathLooted").textContent = String(this.stats.searched);
      $("#deathPanel").classList.remove("hidden");
    }
    abandonRun() {
      localStorage.removeItem(SAVE_KEY);
      $("#pausePanel").classList.add("hidden");
      this.showMenu();
    }
    saveAndQuit() {
      this.saveGame();
      $("#pausePanel").classList.add("hidden");
      this.showMenu();
    }
    showMenu() {
      this.mode = "menu";
      this.closeAllPanels();
      $("#pausePanel").classList.add("hidden");
      $("#deathPanel").classList.add("hidden");
      this.gameScreen.classList.add("hidden");
      this.menu.classList.remove("hidden");
      this.refreshSaveSummary();
    }
    saveGame() {
      if (!this.world || !this.player || this.mode === "dead") return;
      if (this.world.chunked) {
        for (const [key2, chunk] of this.world.chunks) {
          this.world.chunkStates.set(key2, {
            ...this.world.chunkStates.get(key2) || {},
            containers: chunk.containers.filter((entry) => entry.searched).map(({ id, searched, loot }) => ({ id, searched, loot })),
            cars: chunk.cars.filter((entry) => entry.searched).map(({ id, searched, loot }) => ({ id, searched, loot })),
            doors: chunk.buildings.flatMap((building) => (building.doors || []).filter((door) => door.open !== door.defaultOpen || door.broken || door.hp !== door.maxHp).map(({ id, open, broken, hp }) => ({ id, open, broken, hp }))),
            survivors: this.survivors.filter((survivor) => survivor.chunkKey === key2 && !survivor.dead && !String(survivor.id).startsWith("hs")).map(({ path, speech, ...survivor }) => ({ ...survivor, path: [], speech: "" }))
          });
        }
      }
      const save = {
        version: SAVE_VERSION,
        chunked: Boolean(this.world.chunked),
        savedAt: Date.now(),
        seed: this.world.seed,
        worldSize: this.world.width,
        day: this.day,
        timeMinutes: this.timeMinutes,
        weather: this.weather,
        survivorSpawnCarry: this.survivorSpawnCarry,
        player: this.player,
        zombies: this.zombies.filter((zombie) => !zombie.dead).map(({ path, ...zombie }) => ({ ...zombie, path: [] })),
        survivors: this.survivors.filter((survivor) => !survivor.dead).map(({ path, speech, ...survivor }) => ({ ...survivor, path: [], speech: "" })),
        structures: this.structures,
        containers: this.world.containers.filter((entry) => entry.searched).map(({ id, searched, loot }) => ({ id, searched, loot })),
        cars: this.world.cars.filter((entry) => entry.searched).map(({ id, searched, loot }) => ({ id, searched, loot })),
        doors: [...this.doorTiles.values()].filter((door) => door.open !== door.defaultOpen || door.broken || door.hp !== door.maxHp).map(({ id, open, broken, hp }) => ({ id, open, broken, hp })),
        chunkStates: this.world.chunked ? [...this.world.chunkStates.entries()] : [],
        blood: this.blood.slice(-160),
        stats: this.stats
      };
      try {
        localStorage.setItem(SAVE_KEY, JSON.stringify(save));
      } catch {
        this.toast("Browser storage is full; save failed.", "danger");
      }
    }
    loadSaved() {
      let save;
      try {
        save = JSON.parse(localStorage.getItem(SAVE_KEY));
      } catch {
        save = null;
      }
      if (!save || ![1, 2, 3, SAVE_VERSION].includes(save.version)) {
        this.toastMenu("The save could not be loaded.");
        return;
      }
      const migratingChunkedCounty = save.version < 3 || !save.chunked;
      this.world = generateWorld(save.seed);
      if (!migratingChunkedCounty) this.world.chunkStates = new Map(save.chunkStates || []);
      this.player = migratingChunkedCounty ? { ...this.makePlayer(), ...save.player || {}, x: this.world.spawn.x, y: this.world.spawn.y } : { ...this.makePlayer(), ...save.player || {} };
      if (!migratingChunkedCounty) {
        streamWorldChunks(
          this.world,
          Math.floor(this.player.x / TILE_SIZE),
          Math.floor(this.player.y / TILE_SIZE),
          2,
          3
        );
        const containers = new Map(save.containers?.map((entry) => [entry.id, entry]) || []);
        for (const container of this.world.containers) Object.assign(container, containers.get(container.id) || {});
        const cars = new Map(save.cars?.map((entry) => [entry.id, entry]) || []);
        for (const car of this.world.cars) Object.assign(car, cars.get(car.id) || {});
      }
      this.indexWorld();
      const savedDoors = new Map((save.doors || []).map((door) => [door.id, door]));
      for (const door of this.doorTiles.values()) Object.assign(door, savedDoors.get(door.id) || {});
      this.zombies = migratingChunkedCounty || save.version < 4 ? this.world.zombieSpawns.map((spawn) => this.makeZombie(spawn)) : (save.zombies || []).map((zombie) => ({ ...this.makeZombie(zombie), ...zombie, path: [] }));
      this.survivors = save.version >= 4 && save.survivors ? save.survivors.map((survivor) => ({ ...this.makeSurvivor(survivor), ...survivor, path: [], speech: "" })) : this.world.survivorSpawns.map((spawn) => this.makeSurvivor(spawn));
      this.structures = migratingChunkedCounty ? [] : save.structures || [];
      this.blood = migratingChunkedCounty ? [] : save.blood || [];
      this.noises = [];
      this.effects = [];
      this.ambientTimer = 24 + Math.random() * 30;
      this.survivorSpawnCarry = save.survivorSpawnCarry || 0;
      this.day = save.day || 1;
      this.timeMinutes = save.timeMinutes ?? 480;
      this.lastDayPhase = this.dayPhase();
      this.weather = save.weather || "OVERCAST";
      this.stats = save.stats || { searched: 0 };
      this.camera.x = this.player.x;
      this.camera.y = this.player.y;
      this.lastStreamChunk = null;
      this.updateWorldStreaming(true);
      this.mode = "playing";
      this.menu.classList.add("hidden");
      this.gameScreen.classList.remove("hidden");
      this.resize();
      $("#deathPanel").classList.add("hidden");
      $("#seedLabel").textContent = `SEED ${this.world.seed}`;
      this.closeAllPanels();
      this.renderInventory();
      this.renderRecipes();
      this.updateHotbar();
      this.updateObjective();
      this.toast(migratingChunkedCounty ? "County rebuilt with streaming chunks. Your survivor and gear moved to a new safe house." : `Survivor loaded \u2014 Day ${this.day}.`);
      if (save.version < SAVE_VERSION) this.saveGame();
    }
    refreshSaveSummary() {
      let save;
      try {
        save = JSON.parse(localStorage.getItem(SAVE_KEY));
      } catch {
        save = null;
      }
      const button = $("#continueBtn");
      if (!save || ![1, 2, 3, SAVE_VERSION].includes(save.version)) {
        button.disabled = true;
        $("#saveSummary").textContent = "No living survivor found.";
        return;
      }
      button.disabled = false;
      const kills = save.player?.kills || 0;
      $("#saveSummary").textContent = `Day ${save.day} // ${save.seed} // ${kills} kill${kills === 1 ? "" : "s"}`;
    }
    toast(message, style = "") {
      const stack = $("#toastStack");
      const toast = document.createElement("div");
      toast.className = `toast ${style}`.trim();
      toast.textContent = message;
      stack.append(toast);
      setTimeout(() => toast.remove(), 2800);
    }
    toastMenu(message) {
      $("#saveSummary").textContent = message;
    }
    screenToWorld(x, y) {
      return {
        x: (x - this.viewWidth / 2) / CAMERA_ZOOM + this.camera.x,
        y: (y - this.viewHeight / 2) / CAMERA_ZOOM + this.camera.y
      };
    }
    worldToScreen(x, y, shakeX = 0, shakeY = 0) {
      return { x: x - this.camera.x + this.viewWidth / 2 + shakeX, y: y - this.camera.y + this.viewHeight / 2 + shakeY };
    }
    render() {
      const ctx = this.ctx;
      const width = this.viewWidth;
      const height = this.viewHeight;
      const shakeX = this.camera.shake ? (Math.random() - 0.5) * this.camera.shake : 0;
      const shakeY = this.camera.shake ? (Math.random() - 0.5) * this.camera.shake : 0;
      this.playerBuildingId = this.buildingAt(this.player)?.id || null;
      ctx.save();
      ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
      ctx.fillStyle = "#111912";
      ctx.fillRect(0, 0, width, height);
      ctx.save();
      ctx.translate(width / 2, height / 2);
      ctx.scale(CAMERA_ZOOM, CAMERA_ZOOM);
      ctx.translate(-width / 2, -height / 2);
      const halfWorldWidth = width / (2 * CAMERA_ZOOM);
      const halfWorldHeight = height / (2 * CAMERA_ZOOM);
      const minTileX = clamp(Math.floor((this.camera.x - halfWorldWidth) / TILE_SIZE) - 2, 0, this.world.width - 1);
      const maxTileX = clamp(Math.ceil((this.camera.x + halfWorldWidth) / TILE_SIZE) + 2, 0, this.world.width - 1);
      const minTileY = clamp(Math.floor((this.camera.y - halfWorldHeight) / TILE_SIZE) - 2, 0, this.world.height - 1);
      const maxTileY = clamp(Math.ceil((this.camera.y + halfWorldHeight) / TILE_SIZE) + 2, 0, this.world.height - 1);
      for (let ty = minTileY; ty <= maxTileY; ty += 1) {
        for (let tx = minTileX; tx <= maxTileX; tx += 1) this.drawTile(ctx, tx, ty, shakeX, shakeY);
      }
      for (const blood of this.blood) {
        if (this.isHiddenInside(blood)) continue;
        const p = this.worldToScreen(blood.x, blood.y, shakeX, shakeY);
        if (p.x < -20 || p.y < -20 || p.x > width + 20 || p.y > height + 20) continue;
        ctx.fillStyle = `rgba(85, 25, 24, ${blood.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, blood.size, 0, Math.PI * 2);
        ctx.fill();
      }
      this.drawCars(ctx, shakeX, shakeY);
      this.drawContainers(ctx, shakeX, shakeY);
      this.drawStructures(ctx, shakeX, shakeY);
      this.drawEffects(ctx, shakeX, shakeY, true);
      this.drawZombies(ctx, shakeX, shakeY);
      this.drawSurvivors(ctx, shakeX, shakeY);
      this.drawPlayer(ctx, shakeX, shakeY);
      this.drawEffects(ctx, shakeX, shakeY, false);
      ctx.restore();
      this.drawLighting(ctx);
      this.drawVignette(ctx);
      ctx.restore();
    }
    drawRoofTile(ctx, tx, ty, p, building, variation) {
      const palettes = {
        house: ["#4a4a43", "#505047"],
        grocery: ["#4d5049", "#56594f"],
        hospital: ["#606a68", "#687270"],
        sheriff: ["#48565d", "#505f66"],
        prison: ["#454d4e", "#4c5556"],
        warehouse: ["#5a5248", "#61584c"]
      };
      const palette = palettes[building?.type] || palettes.house;
      ctx.fillStyle = variation > 0.5 ? palette[1] : palette[0];
      ctx.fillRect(p.x, p.y, TILE_SIZE + 1, TILE_SIZE + 1);
      ctx.fillStyle = "rgba(9,12,10,.16)";
      ctx.fillRect(p.x, p.y + 29, TILE_SIZE, 3);
      ctx.strokeStyle = "rgba(219,220,199,.09)";
      ctx.lineWidth = 1;
      if (building?.type === "house") {
        for (let y = 6; y < 30; y += 7) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y + y);
          ctx.lineTo(p.x + TILE_SIZE, p.y + y);
          ctx.stroke();
        }
      } else {
        ctx.strokeRect(p.x + 0.5, p.y + 0.5, TILE_SIZE - 1, TILE_SIZE - 1);
        if ((tx + ty) % 7 === 0) {
          ctx.fillStyle = "rgba(25,29,27,.42)";
          roundedRectPath(ctx, p.x + 9, p.y + 8, 14, 12, 3);
          ctx.fill();
          ctx.fillStyle = "rgba(160,171,161,.18)";
          ctx.fillRect(p.x + 11, p.y + 9, 10, 2);
        }
      }
    }
    drawTile(ctx, tx, ty, shakeX, shakeY) {
      const tile = getTile(this.world, tx, ty);
      const p = this.worldToScreen(tx * TILE_SIZE, ty * TILE_SIZE, shakeX, shakeY);
      const variation = hash2D(tx, ty, this.world.seed);
      const building = this.buildingLookup.get(`${tx},${ty}`);
      const courtyard = this.courtyardLookup.get(`${tx},${ty}`);
      const doorData = this.doorTiles.get(`${tx},${ty}`);
      if (courtyard && courtyard.id !== this.playerBuildingId) {
        this.drawRoofTile(ctx, tx, ty, p, courtyard, variation);
        return;
      }
      if (building && building.id !== this.playerBuildingId) {
        const exteriorBoundary = [[1, 0], [-1, 0], [0, 1], [0, -1]].some(([dx, dy]) => !building.cellSet?.has(`${tx + dx},${ty + dy}`));
        const roofOverFloor = tile === TILE.FLOOR && !doorData?.exterior;
        const roofOverPartition = tile === TILE.WALL && !exteriorBoundary;
        if (roofOverFloor || roofOverPartition) {
          this.drawRoofTile(ctx, tx, ty, p, building, variation);
          return;
        }
      }
      if (tile === TILE.GRASS) {
        ctx.fillStyle = variation > 0.72 ? "#26382b" : variation > 0.22 ? "#223328" : "#203025";
        ctx.fillRect(p.x, p.y, TILE_SIZE + 1, TILE_SIZE + 1);
        if (variation > 0.52) {
          ctx.strokeStyle = "rgba(139,158,119,.2)";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(p.x + 7, p.y + 25);
          ctx.lineTo(p.x + 5, p.y + 19);
          ctx.moveTo(p.x + 9, p.y + 25);
          ctx.lineTo(p.x + 11, p.y + 20);
          ctx.moveTo(p.x + 22, p.y + 13);
          ctx.lineTo(p.x + 24, p.y + 7);
          ctx.stroke();
        }
        if (variation < 0.11) {
          ctx.fillStyle = "rgba(70,57,41,.2)";
          ctx.beginPath();
          ctx.ellipse(p.x + 17, p.y + 17, 8, 4, -0.25, 0, Math.PI * 2);
          ctx.fill();
        }
      } else if (tile === TILE.ROAD) {
        ctx.fillStyle = variation > 0.58 ? "#343a38" : "#303633";
        ctx.fillRect(p.x, p.y, TILE_SIZE + 1, TILE_SIZE + 1);
        if ((tx + ty) % 11 === 0) {
          ctx.strokeStyle = "rgba(10,13,12,.32)";
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(p.x + 2, p.y + 7);
          ctx.lineTo(p.x + 11, p.y + 9);
          ctx.lineTo(p.x + 16, p.y + 16);
          ctx.lineTo(p.x + 27, p.y + 18);
          ctx.stroke();
        }
        if (isRoadCenter(this.world, "x", tx) && ty % 3 === 0) {
          ctx.fillStyle = "rgba(197,181,124,.25)";
          ctx.fillRect(p.x + 15, p.y + 4, 2, 16);
        }
        if (isRoadCenter(this.world, "y", ty) && tx % 3 === 0) {
          ctx.fillStyle = "rgba(197,181,124,.25)";
          ctx.fillRect(p.x + 4, p.y + 15, 16, 2);
        }
      } else if (tile === TILE.FLOOR) {
        if (building?.type === "house") {
          ctx.fillStyle = variation > 0.55 ? "#645a49" : "#605645";
          ctx.fillRect(p.x, p.y, TILE_SIZE + 1, TILE_SIZE + 1);
          ctx.strokeStyle = "rgba(45,34,25,.3)";
          ctx.lineWidth = 1;
          for (let row = 8; row < TILE_SIZE; row += 8) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y + row);
            ctx.lineTo(p.x + TILE_SIZE, p.y + row);
            ctx.stroke();
          }
          const seam = variation > 0.5 ? 11 : 22;
          ctx.fillStyle = "rgba(39,30,23,.22)";
          ctx.fillRect(p.x + seam, p.y, 1, 8);
          ctx.fillRect(p.x + (32 - seam), p.y + 8, 1, 8);
          ctx.fillRect(p.x + seam, p.y + 16, 1, 8);
          ctx.fillStyle = "rgba(226,206,162,.06)";
          ctx.fillRect(p.x + 2, p.y + 2, TILE_SIZE - 4, 1);
        } else if (building?.type === "warehouse") {
          ctx.fillStyle = variation > 0.55 ? "#5c5c55" : "#575851";
          ctx.fillRect(p.x, p.y, TILE_SIZE + 1, TILE_SIZE + 1);
          if (variation > 0.7) {
            ctx.strokeStyle = "rgba(33,35,32,.28)";
            ctx.beginPath();
            ctx.moveTo(p.x + 3, p.y + 26);
            ctx.lineTo(p.x + 13, p.y + 17);
            ctx.lineTo(p.x + 20, p.y + 19);
            ctx.stroke();
          }
        } else {
          const floorColors = {
            grocery: variation > 0.5 ? "#74735f" : "#6d6d59",
            hospital: variation > 0.5 ? "#858c84" : "#7c847d",
            sheriff: variation > 0.5 ? "#697378" : "#626c71",
            prison: variation > 0.5 ? "#626966" : "#5b625f"
          };
          ctx.fillStyle = floorColors[building?.type] || "#69675d";
          ctx.fillRect(p.x, p.y, TILE_SIZE + 1, TILE_SIZE + 1);
          ctx.strokeStyle = "rgba(31,35,32,.22)";
          ctx.lineWidth = 1;
          ctx.strokeRect(p.x + 0.5, p.y + 0.5, 15, 15);
          ctx.strokeRect(p.x + 16.5, p.y + 0.5, 15, 15);
          ctx.strokeRect(p.x + 0.5, p.y + 16.5, 15, 15);
          ctx.strokeRect(p.x + 16.5, p.y + 16.5, 15, 15);
          ctx.fillStyle = "rgba(255,255,240,.055)";
          ctx.fillRect(p.x + 2, p.y + 2, 12, 2);
          ctx.fillRect(p.x + 18, p.y + 18, 12, 2);
        }
        const door = doorData;
        if (door) {
          const vertical = door.orientation === "vertical";
          ctx.save();
          ctx.translate(p.x + TILE_SIZE / 2, p.y + TILE_SIZE / 2);
          if (vertical) ctx.rotate(Math.PI / 2);
          if (door.open || door.broken) {
            ctx.translate(-14, 0);
            ctx.rotate((door.broken ? 0.42 : 0.78) * Math.PI / 2);
            ctx.translate(14, 0);
            if (door.broken) ctx.globalAlpha = 0.72;
          }
          ctx.fillStyle = "rgba(4,6,5,.55)";
          roundedRectPath(ctx, -15, -8, 30, 18, 3);
          ctx.fill();
          const glass = door.style === "glass" || door.style === "automatic";
          const steel = door.style === "steel" || door.style === "barred";
          ctx.fillStyle = glass ? "#29434a" : steel ? "#4b5554" : door.style === "interior" ? "#755d45" : "#765039";
          roundedRectPath(ctx, -14, -9, 28, 16, 2);
          ctx.fill();
          if (glass) {
            ctx.fillStyle = "#416870";
            ctx.fillRect(-11, -7, 9, 11);
            ctx.fillRect(2, -7, 9, 11);
            ctx.fillStyle = "rgba(193,220,216,.34)";
            ctx.fillRect(-9, -6, 3, 9);
            ctx.fillRect(4, -6, 3, 9);
            ctx.fillStyle = "#a9b7af";
            ctx.fillRect(-1, -7, 2, 12);
          } else if (door.style === "barred") {
            ctx.fillStyle = "#222927";
            ctx.fillRect(-11, -7, 22, 12);
            ctx.fillStyle = "#7d8984";
            for (let x = -9; x <= 9; x += 4) ctx.fillRect(x, -7, 2, 12);
            ctx.fillRect(-11, -2, 22, 2);
          } else {
            ctx.fillStyle = steel ? "#75807c" : "#9a704c";
            ctx.fillRect(-12, -7, 24, 3);
            ctx.strokeStyle = steel ? "#252c2b" : "#493323";
            ctx.strokeRect(-11.5, -6.5, 23, 11);
            ctx.fillStyle = "#d9b85f";
            ctx.beginPath();
            ctx.arc(8, 0, 1.6, 0, Math.PI * 2);
            ctx.fill();
          }
          if (door.exterior) {
            ctx.fillStyle = "rgba(216,198,139,.32)";
            ctx.fillRect(-15, 8, 30, 3);
          }
          if (door.hp < door.maxHp && !door.broken) {
            ctx.strokeStyle = "rgba(34,24,20,.78)";
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(-8, -6);
            ctx.lineTo(-2, 0);
            ctx.lineTo(-6, 5);
            ctx.moveTo(3, -7);
            ctx.lineTo(7, -1);
            ctx.stroke();
          }
          ctx.restore();
        }
      } else if (tile === TILE.WALL) {
        const wallColors = {
          hospital: "#60756f",
          sheriff: "#4d606b",
          prison: "#596262",
          warehouse: "#695f50",
          grocery: "#6e604d",
          house: "#5d554a"
        };
        ctx.fillStyle = wallColors[building?.type] || "#5d554a";
        ctx.fillRect(p.x, p.y, TILE_SIZE + 1, TILE_SIZE + 1);
        ctx.fillStyle = "rgba(238,232,207,.13)";
        ctx.fillRect(p.x, p.y, TILE_SIZE, 4);
        ctx.fillStyle = "rgba(27,25,21,.17)";
        for (let y = 9; y < 25; y += 8) ctx.fillRect(p.x, p.y + y, TILE_SIZE, 1);
        ctx.fillStyle = "rgba(4,6,5,.35)";
        ctx.fillRect(p.x, p.y + 25, TILE_SIZE, 7);
        ctx.fillStyle = "rgba(222,211,183,.09)";
        ctx.fillRect(p.x + 3, p.y + 6, 2, 16);
        const windowData = this.windowTiles.get(`${tx},${ty}`);
        if (windowData) {
          ctx.fillStyle = "#242a28";
          ctx.fillRect(p.x + 5, p.y + 5, 22, 17);
          ctx.fillStyle = "#17282d";
          ctx.fillRect(p.x + 7, p.y + 7, 18, 12);
          const shine = 0.14 + variation * 0.12;
          ctx.fillStyle = `rgba(142,178,180,${shine})`;
          ctx.beginPath();
          ctx.moveTo(p.x + 8, p.y + 8);
          ctx.lineTo(p.x + 15, p.y + 8);
          ctx.lineTo(p.x + 9, p.y + 18);
          ctx.lineTo(p.x + 7, p.y + 18);
          ctx.closePath();
          ctx.fill();
          ctx.strokeStyle = "rgba(190,205,193,.4)";
          ctx.lineWidth = 1;
          ctx.strokeRect(p.x + 6.5, p.y + 6.5, 19, 13);
          ctx.beginPath();
          ctx.moveTo(p.x + 16, p.y + 7);
          ctx.lineTo(p.x + 16, p.y + 19);
          ctx.stroke();
          if (windowData.barred || this.barTiles.has(`${tx},${ty}`)) {
            ctx.strokeStyle = "#858d88";
            ctx.lineWidth = 2;
            for (let x = 9; x <= 23; x += 5) {
              ctx.beginPath();
              ctx.moveTo(p.x + x, p.y + 5);
              ctx.lineTo(p.x + x, p.y + 22);
              ctx.stroke();
            }
            ctx.beginPath();
            ctx.moveTo(p.x + 5, p.y + 13);
            ctx.lineTo(p.x + 27, p.y + 13);
            ctx.stroke();
          }
        }
        const signBuilding = this.signTiles.get(`${tx},${ty}`);
        if (signBuilding) {
          const sign = signBuilding.type === "hospital" ? "H" : signBuilding.type === "sheriff" ? "STAR" : signBuilding.type === "prison" ? "HC" : signBuilding.type === "grocery" ? "FOOD" : "";
          if (sign) {
            ctx.fillStyle = "rgba(13,17,15,.75)";
            roundedRectPath(ctx, p.x + 3, p.y + 8, 26, 15, 3);
            ctx.fill();
            ctx.fillStyle = signBuilding.type === "hospital" ? "#d9e9df" : signBuilding.type === "grocery" ? "#e2c96f" : "#b9c9c8";
            ctx.font = `900 ${sign.length > 2 ? 7 : 12}px system-ui, sans-serif`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(sign, p.x + 16, p.y + 15.5);
          }
        }
      } else if (tile === TILE.WATER) {
        ctx.fillStyle = variation > 0.5 ? "#263e40" : "#223a3c";
        ctx.fillRect(p.x, p.y, TILE_SIZE + 1, TILE_SIZE + 1);
        ctx.strokeStyle = "rgba(141,178,176,.18)";
        ctx.beginPath();
        ctx.moveTo(p.x + 4, p.y + 12);
        ctx.quadraticCurveTo(p.x + 14, p.y + 9, p.x + 27, p.y + 13);
        ctx.stroke();
      } else if (tile === TILE.TREE) {
        ctx.fillStyle = "#1e3022";
        ctx.fillRect(p.x, p.y, TILE_SIZE + 1, TILE_SIZE + 1);
        ctx.fillStyle = "rgba(0,0,0,.3)";
        ctx.beginPath();
        ctx.ellipse(p.x + 19, p.y + 24, 12, 6, 0.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#31291e";
        ctx.fillRect(p.x + 13, p.y + 15, 7, 17);
        ctx.fillStyle = "#4a3b27";
        ctx.fillRect(p.x + 14, p.y + 16, 2, 14);
        ctx.fillStyle = variation > 0.5 ? "#2d4b32" : "#29442f";
        ctx.beginPath();
        ctx.arc(p.x + 10, p.y + 14, 10, 0, Math.PI * 2);
        ctx.arc(p.x + 21, p.y + 12, 11, 0, Math.PI * 2);
        ctx.arc(p.x + 16, p.y + 6, 9, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "rgba(143,167,112,.18)";
        ctx.beginPath();
        ctx.arc(p.x + 12, p.y + 7, 6, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    drawCars(ctx, shakeX, shakeY) {
      for (const car of this.world.cars) {
        const p = this.worldToScreen(car.x, car.y, shakeX, shakeY);
        if (p.x < -80 || p.y < -80 || p.x > this.viewWidth + 80 || p.y > this.viewHeight + 80) continue;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.fillStyle = "rgba(0,0,0,.28)";
        ctx.fillRect(-car.w / 2 + 4, -car.h / 2 + 6, car.w, car.h);
        ctx.fillStyle = car.color;
        ctx.fillRect(-car.w / 2, -car.h / 2, car.w, car.h);
        ctx.fillStyle = "#172024";
        if (car.w > car.h) {
          ctx.fillRect(-car.w * 0.2, -car.h / 2 + 3, car.w * 0.42, car.h - 6);
          ctx.fillStyle = "#151817";
          ctx.fillRect(-car.w / 2 + 4, -car.h / 2 - 3, 9, 3);
          ctx.fillRect(car.w / 2 - 13, car.h / 2, 9, 3);
        } else {
          ctx.fillRect(-car.w / 2 + 3, -car.h * 0.2, car.w - 6, car.h * 0.42);
          ctx.fillStyle = "#151817";
          ctx.fillRect(-car.w / 2 - 3, -car.h / 2 + 4, 3, 9);
          ctx.fillRect(car.w / 2, car.h / 2 - 13, 3, 9);
        }
        if (car.searched) {
          ctx.strokeStyle = "rgba(219,215,190,.2)";
          ctx.strokeRect(-car.w / 2 + 2, -car.h / 2 + 2, car.w - 4, car.h - 4);
        }
        ctx.restore();
      }
    }
    drawContainers(ctx, shakeX, shakeY) {
      for (const container of this.world.containers) {
        if (this.isHiddenInside(container)) continue;
        const p = this.worldToScreen(container.x, container.y, shakeX, shakeY);
        if (p.x < -48 || p.y < -48 || p.x > this.viewWidth + 48 || p.y > this.viewHeight + 48) continue;
        const base = FURNITURE_SIZES[container.kind] || [26, 20];
        const w = base[0];
        const h = base[1];
        const selected = this.nearestInteractable?.ref === container && !this.panelOpen;
        const pulse = 0.55 + Math.sin(performance.now() / 145) * 0.22;
        const open = container.openAnim > 0 ? Math.sin((1 - container.openAnim) * Math.PI) : 0;
        const rotation = container.side === "south" ? Math.PI : container.side === "west" ? -Math.PI / 2 : container.side === "east" ? Math.PI / 2 : 0;
        ctx.save();
        ctx.translate(p.x, p.y - open * 1.5);
        ctx.rotate(rotation);
        ctx.fillStyle = "rgba(4,7,5,.35)";
        roundedRectPath(ctx, -w / 2 + 3, -h / 2 + 5, w, h, 3);
        ctx.fill();
        if (container.kind === "fridge") {
          ctx.fillStyle = "#303733";
          roundedRectPath(ctx, -w / 2 - 1, -h / 2 - 1, w + 2, h + 2, 3);
          ctx.fill();
          ctx.fillStyle = container.searched ? "#9b9c8f" : "#c1c2b4";
          roundedRectPath(ctx, -w / 2, -h / 2, w, h, 2);
          ctx.fill();
          ctx.fillStyle = "rgba(255,255,255,.18)";
          ctx.fillRect(-w / 2 + 2, -h / 2 + 2, w - 4, 3);
          ctx.fillStyle = "#696e68";
          ctx.fillRect(-w / 2 + 1, -2, w - 2, 2);
          ctx.fillStyle = "#525a55";
          ctx.fillRect(w / 2 - 5 + open * 5, 1, 2, 9);
          ctx.fillStyle = "#b04f45";
          ctx.fillRect(-5, -8, 3, 3);
          ctx.fillStyle = "#d0b457";
          ctx.fillRect(1, -6, 3, 3);
          if (open > 0.08) {
            ctx.fillStyle = "#222925";
            ctx.fillRect(-w / 2 + 2, 1, w - 4, h / 2 - 3);
            ctx.fillStyle = "#b9baac";
            roundedRectPath(ctx, w / 2 - 2, 0, w * 0.68, h / 2 - 1, 2);
            ctx.fill();
          }
        } else if (container.kind === "freezer") {
          ctx.fillStyle = "#2b3332";
          roundedRectPath(ctx, -w / 2 - 1, -h / 2 - 1, w + 2, h + 2, 3);
          ctx.fill();
          ctx.fillStyle = container.searched ? "#7f8984" : "#aeb8b1";
          roundedRectPath(ctx, -w / 2, -h / 2, w, h, 2);
          ctx.fill();
          ctx.fillStyle = "#263c42";
          ctx.fillRect(-w / 2 + 3, -h / 2 + 3, w - 6, h - 8);
          ctx.fillStyle = "rgba(191,224,225,.26)";
          ctx.fillRect(-w / 2 + 5, -h / 2 + 5, w - 10, 3);
          ctx.strokeStyle = "#566560";
          ctx.strokeRect(-w / 2 + 2.5, -h / 2 + 2.5, w - 5, h - 7);
          ctx.fillStyle = "#d9c66b";
          ctx.fillRect(w / 2 - 7, h / 2 - 4, 4, 2);
        } else if (container.kind === "crate") {
          ctx.fillStyle = "#3b2a1d";
          ctx.fillRect(-w / 2 - 1, -h / 2 - 1, w + 2, h + 2);
          ctx.fillStyle = container.searched ? "#5e4933" : "#7a5a39";
          ctx.fillRect(-w / 2, -h / 2, w, h);
          ctx.strokeStyle = "#3b2a1d";
          ctx.lineWidth = 3;
          ctx.strokeRect(-w / 2 + 2, -h / 2 + 2, w - 4, h - 4);
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(-w / 2 + 4, -h / 2 + 4);
          ctx.lineTo(w / 2 - 4, h / 2 - 4);
          ctx.moveTo(w / 2 - 4, -h / 2 + 4);
          ctx.lineTo(-w / 2 + 4, h / 2 - 4);
          ctx.stroke();
          ctx.fillStyle = "rgba(226,190,119,.18)";
          ctx.fillRect(-w / 2 + 3, -h / 2 + 3, w - 6, 2);
        } else if (container.kind === "shelf") {
          ctx.fillStyle = "#292c28";
          ctx.fillRect(-w / 2 - 1, -h / 2 - 1, w + 2, h + 2);
          ctx.fillStyle = "#55544b";
          ctx.fillRect(-w / 2, -h / 2, w, h);
          ctx.fillStyle = "#252925";
          ctx.fillRect(-w / 2 + 2, -4, w - 4, 2);
          ctx.fillRect(-w / 2 + 2, 4, w - 4, 2);
          ["#8d5941", "#6f7e59", "#b09a58", "#657987", "#8d6a72"].forEach((color, index) => {
            ctx.fillStyle = color;
            ctx.fillRect(-w / 2 + 3 + index * 5, -h / 2 + 3 + index % 2 * 8, 3, 5);
          });
        } else if (container.kind === "hospital_bed" || container.kind === "gurney") {
          const gurney = container.kind === "gurney";
          ctx.fillStyle = "#262d2b";
          roundedRectPath(ctx, -w / 2 - 1, -h / 2, w + 2, h - 2, 4);
          ctx.fill();
          ctx.fillStyle = gurney ? "#aeb5ac" : "#d5d8ca";
          roundedRectPath(ctx, -w / 2, -h / 2 - 2, w, h - 4, 4);
          ctx.fill();
          ctx.fillStyle = gurney ? "#697d78" : "#7c998d";
          ctx.fillRect(-w / 2 + 2, -2, w - 4, 5);
          ctx.fillStyle = "#e3e0ca";
          roundedRectPath(ctx, -w / 2 + 2, -h / 2, 8, 7, 2);
          ctx.fill();
          ctx.strokeStyle = "#707975";
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(-w / 2 + 2, h / 2 - 4);
          ctx.lineTo(-w / 2 + 2, h / 2 + 3);
          ctx.moveTo(w / 2 - 2, h / 2 - 4);
          ctx.lineTo(w / 2 - 2, h / 2 + 3);
          ctx.stroke();
          if (gurney) {
            ctx.fillStyle = "#1d2221";
            ctx.beginPath();
            ctx.arc(-w / 2 + 3, h / 2 + 3, 2, 0, Math.PI * 2);
            ctx.arc(w / 2 - 3, h / 2 + 3, 2, 0, Math.PI * 2);
            ctx.fill();
          }
        } else if (["locker", "medical_cabinet", "evidence_cabinet", "gun_locker", "cell_locker", "tool_cabinet"].includes(container.kind)) {
          const medical = container.kind === "medical_cabinet";
          const gun = container.kind === "gun_locker";
          const evidence = container.kind === "evidence_cabinet";
          const prison = container.kind === "cell_locker";
          const tools = container.kind === "tool_cabinet";
          ctx.fillStyle = "#252c2b";
          roundedRectPath(ctx, -w / 2 - 1, -h / 2 - 1, w + 2, h + 2, 2);
          ctx.fill();
          ctx.fillStyle = medical ? "#aeb7ad" : gun ? "#3d4b49" : evidence ? "#6a7672" : prison ? "#4f5654" : tools ? "#6b6354" : "#58645f";
          roundedRectPath(ctx, -w / 2, -h / 2, w, h, 2);
          ctx.fill();
          ctx.strokeStyle = medical ? "#68746c" : "#303a36";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(0, -h / 2 + 1);
          ctx.lineTo(0, h / 2 - 1);
          ctx.stroke();
          if (medical) {
            ctx.fillStyle = "#9d4945";
            ctx.fillRect(-2, -6, 4, 12);
            ctx.fillRect(-6, -2, 12, 4);
          } else if (gun) {
            ctx.fillStyle = "#151b1a";
            ctx.fillRect(-8, -6, 16, 10);
            ctx.strokeStyle = "#88938e";
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(-6, 1);
            ctx.lineTo(6, -4);
            ctx.moveTo(-4, 4);
            ctx.lineTo(7, 0);
            ctx.stroke();
            ctx.fillStyle = "#c2a55f";
            ctx.fillRect(-2, 5, 4, 3);
          } else if (evidence) {
            ctx.fillStyle = "#d4cfb8";
            ctx.fillRect(-8, -6, 16, 7);
            ctx.fillStyle = "#3d4542";
            ctx.fillRect(-6, -4, 12, 1);
            ctx.fillStyle = "#b89e59";
            ctx.fillRect(-2, 4, 4, 3);
          } else {
            ctx.fillStyle = "#252d2a";
            for (let x = -7; x <= 4; x += 11) for (let y = -5; y <= -1; y += 2) ctx.fillRect(x, y, 5, 1);
            ctx.fillStyle = "#b4a46b";
            ctx.fillRect(-3, 3, 2, 3);
            ctx.fillRect(2, 3, 2, 3);
          }
        } else if (container.kind === "supply_cart") {
          ctx.fillStyle = "#343b38";
          roundedRectPath(ctx, -w / 2, -h / 2, w, h - 2, 3);
          ctx.fill();
          ctx.fillStyle = "#aeb3a8";
          roundedRectPath(ctx, -w / 2 + 1, -h / 2 + 1, w - 2, h - 5, 2);
          ctx.fill();
          ctx.fillStyle = "#6b746d";
          ctx.fillRect(-w / 2 + 3, -2, w - 6, 1);
          ctx.fillRect(-w / 2 + 3, 4, w - 6, 1);
          ctx.fillStyle = "#1f2422";
          ctx.beginPath();
          ctx.arc(-w / 2 + 4, h / 2 - 1, 2, 0, Math.PI * 2);
          ctx.arc(w / 2 - 4, h / 2 - 1, 2, 0, Math.PI * 2);
          ctx.fill();
        } else if (["desk", "counter", "checkout", "reception", "guard_desk", "workbench", "canteen_table", "table"].includes(container.kind)) {
          const desk = ["desk", "guard_desk", "reception"].includes(container.kind);
          const checkout = container.kind === "checkout";
          const workbench = container.kind === "workbench";
          const canteen = container.kind === "canteen_table" || container.kind === "table";
          ctx.fillStyle = "#2d251e";
          roundedRectPath(ctx, -w / 2 - 1, -h / 2 - 1, w + 2, h + 2, 2);
          ctx.fill();
          ctx.fillStyle = workbench ? "#70563d" : canteen ? "#6b6555" : checkout ? "#595f50" : desk ? "#65513d" : "#695743";
          roundedRectPath(ctx, -w / 2, -h / 2, w, h, 2);
          ctx.fill();
          ctx.fillStyle = "#8a7455";
          ctx.fillRect(-w / 2 + 1, -h / 2 + 1, w - 2, 4);
          ctx.fillStyle = "rgba(25,20,16,.48)";
          ctx.fillRect(-w / 2 + 3, 2, w - 6, 1);
          if (checkout) {
            ctx.fillStyle = "#252c29";
            roundedRectPath(ctx, 2, -8, 9, 8, 2);
            ctx.fill();
            ctx.fillStyle = "#71877e";
            ctx.fillRect(4, -6, 5, 3);
            ctx.fillStyle = "#d3b65d";
            ctx.fillRect(-9, 2, 11, 2);
          } else if (workbench) {
            ctx.fillStyle = "#b3a36b";
            ctx.fillRect(-9, -5, 11, 2);
            ctx.fillStyle = "#3c4440";
            ctx.fillRect(4, -6, 6, 6);
            ctx.strokeStyle = "#262b29";
            ctx.beginPath();
            ctx.moveTo(6, -6);
            ctx.lineTo(10, -1);
            ctx.stroke();
          } else if (canteen) {
            ctx.fillStyle = "#323733";
            ctx.fillRect(-w / 2 + 3, -2, w - 6, 4);
            ctx.fillStyle = "#91855e";
            ctx.fillRect(-2, -h / 2 + 2, 4, h - 4);
          } else if (desk) {
            ctx.fillStyle = "#d1c9ad";
            ctx.save();
            ctx.rotate(-0.12);
            ctx.fillRect(-7, -7, 11, 7);
            ctx.restore();
            ctx.fillStyle = "#b2a25f";
            ctx.fillRect(6, 3, 3, 2);
          }
        } else {
          ctx.fillStyle = "#2c241d";
          roundedRectPath(ctx, -w / 2 - 1, -h / 2 - 1, w + 2, h + 2, 2);
          ctx.fill();
          ctx.fillStyle = container.searched ? "#594638" : "#765a43";
          roundedRectPath(ctx, -w / 2, -h / 2, w, h, 2);
          ctx.fill();
          ctx.fillStyle = "#907458";
          ctx.fillRect(-w / 2 + 2, -h / 2 + 2, w - 4, 3);
          if (container.kind === "dresser") {
            ctx.strokeStyle = "#49382c";
            for (let y = -4; y <= 5; y += 8) {
              ctx.strokeRect(-w / 2 + 3, y, w - 6, 6);
              ctx.fillStyle = "#c1a76a";
              ctx.fillRect(-1, y + 2, 3, 2);
            }
          } else {
            ctx.strokeStyle = "#49382c";
            ctx.strokeRect(-w / 2 + 3, -h / 2 + 6, w / 2 - 4, h - 9);
            ctx.strokeRect(1, -h / 2 + 6, w / 2 - 4, h - 9);
            ctx.fillStyle = "#c1a76a";
            ctx.fillRect(-3 - open * 4, 2, 2, 3);
            ctx.fillRect(2 + open * 4, 2, 2, 3);
            if (open > 0.08) {
              ctx.strokeStyle = "#9b7a57";
              ctx.strokeRect(1 + open * 9, -h / 2 + 6, w / 2 - 4, h - 9);
            }
          }
        }
        ctx.restore();
        if (selected) {
          const size = furnitureSize(container);
          ctx.save();
          ctx.strokeStyle = `rgba(229,199,112,${pulse})`;
          ctx.lineWidth = 2;
          ctx.setLineDash([4, 3]);
          roundedRectPath(ctx, p.x - size.w / 2 - 5, p.y - size.h / 2 - 5, size.w + 10, size.h + 10, 6);
          ctx.stroke();
          ctx.setLineDash([]);
          const label = container.searched ? "OPEN" : "LOOT";
          ctx.font = "800 8px system-ui, sans-serif";
          ctx.textAlign = "center";
          ctx.fillStyle = "rgba(6,9,7,.9)";
          roundedRectPath(ctx, p.x - 22, p.y - size.h / 2 - 20, 44, 14, 4);
          ctx.fill();
          ctx.fillStyle = "#e5c770";
          ctx.fillText(label, p.x, p.y - size.h / 2 - 10);
          ctx.restore();
        }
      }
    }
    drawStructures(ctx, shakeX, shakeY) {
      for (const structure of this.structures) {
        const p = this.worldToScreen(structure.x, structure.y, shakeX, shakeY);
        if (structure.type === "barricade") {
          ctx.fillStyle = "rgba(0,0,0,.3)";
          ctx.fillRect(p.x - structure.w / 2 + 3, p.y - structure.h / 2 + 4, structure.w, structure.h);
          ctx.fillStyle = structure.hp < 40 ? "#5a342d" : "#684c35";
          ctx.fillRect(p.x - structure.w / 2, p.y - structure.h / 2, structure.w, structure.h);
          ctx.strokeStyle = "#2e241d";
          ctx.strokeRect(p.x - structure.w / 2, p.y - structure.h / 2, structure.w, structure.h);
        } else {
          const pulse = structure.triggered ? 0.5 + Math.sin(performance.now() / 45) * 0.4 : 0.5;
          ctx.fillStyle = "#292e29";
          ctx.beginPath();
          ctx.arc(p.x, p.y, 10, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = `rgba(210,167,86,${pulse})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 14, 0, Math.PI * 2);
          ctx.stroke();
        }
      }
      if (this.buildMode) {
        const target = matchMedia("(pointer: coarse)").matches ? { x: this.player.x + this.player.facingX * 68, y: this.player.y + this.player.facingY * 68 } : this.screenToWorld(this.input.pointer.x, this.input.pointer.y);
        const p = this.worldToScreen(target.x, target.y, shakeX, shakeY);
        ctx.strokeStyle = "rgba(188,205,166,.7)";
        ctx.setLineDash([5, 4]);
        ctx.strokeRect(p.x - 25, p.y - 8, 50, 16);
        ctx.setLineDash([]);
      }
    }
    drawZombiesLegacy(ctx, shakeX, shakeY) {
      for (const zombie of this.zombies) {
        const p = this.worldToScreen(zombie.x, zombie.y, shakeX, shakeY);
        if (p.x < -48 || p.y < -48 || p.x > this.viewWidth + 48 || p.y > this.viewHeight + 48) continue;
        const look = ZOMBIE_LOOKS[(zombie.variant ?? 0) % ZOMBIE_LOOKS.length];
        const phase = (zombie.animTime ?? 0) + (zombie.variant ?? 0) * 0.73;
        const move = clamp(zombie.moveBlend ?? 0, 0, 1);
        const chasing = zombie.state === "chase";
        const stride = Math.sin(phase) * move * (chasing ? 5.2 : 3.3);
        const sway = Math.sin(phase * 0.5) * move * (chasing ? 1.4 : 2.1);
        const attackRemaining = clamp((zombie.attackAnim ?? 0) / 0.42, 0, 1);
        const attackProgress = 1 - attackRemaining;
        const lunge = Math.sin(attackProgress * Math.PI) * (attackRemaining > 0 ? 5 : 0);
        const hurt = clamp((zombie.hurtAnim ?? 0) / 0.28, 0, 1);
        const flashing = zombie.hitFlash > 0;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((zombie.angle ?? 0) + Math.PI / 2);
        if (zombie.dead) {
          const fall = 1 - clamp(zombie.deathAnim ?? 0, 0, 1);
          const side = zombie.deathSide ?? 1;
          ctx.rotate(side * (0.2 + fall * 1.05));
          ctx.translate(side * fall * 5, fall * 4);
          ctx.globalAlpha = 0.86 - fall * 0.18;
          ctx.fillStyle = "rgba(0,0,0,.3)";
          ctx.beginPath();
          ctx.ellipse(side * 3, 5, 18, 7, 0, 0, Math.PI * 2);
          ctx.fill();
          const spread = fall * side;
          drawBlockLimb(ctx, -4, 5, -8 - spread * 6, 15 - fall * 2, 5, look.pants, "#202522");
          drawBlockLimb(ctx, 4, 5, 8 + spread * 4, 15 + fall * 2, 5, look.pants, "#202522");
          fillBlockPolygon(ctx, look.shirtDark, [[-8, -6], [7, -7], [9, 7], [-8, 8]]);
          fillBlockPolygon(ctx, look.shirt, [[-6, -5], [5, -5], [7, 5], [-6, 6]]);
          drawBlockLimb(ctx, -6, -3, -12 - spread * 4, 3 + fall * 4, 4, look.shirtDark, look.skinDark);
          drawBlockLimb(ctx, 6, -3, 12 + spread * 5, -1 - fall * 3, 4, look.shirtDark, look.skinDark);
          ctx.fillStyle = look.skinDark;
          ctx.fillRect(-5 + spread * 3, -15 + fall * 4, 11, 10);
          ctx.fillStyle = look.skin;
          ctx.fillRect(-4 + spread * 3, -15 + fall * 4, 9, 7);
          ctx.fillStyle = look.hair;
          ctx.fillRect(-5 + spread * 3, -8 + fall * 4, 11, 3);
          ctx.fillStyle = look.accent;
          ctx.fillRect(-1 + spread * 3, -14 + fall * 4, 3, 2);
          ctx.restore();
          continue;
        }
        ctx.translate(sway, -lunge + Math.round(Math.cos(phase * 2) * move));
        ctx.rotate((zombie.deathSide ?? 1) * hurt * 0.2);
        ctx.fillStyle = "rgba(0,0,0,.28)";
        ctx.beginPath();
        ctx.ellipse(2, 10, 14, 7, 0, 0, Math.PI * 2);
        ctx.fill();
        const limpLeft = (zombie.limpSide ?? -1) < 0;
        const leftStride = stride * (limpLeft ? 0.42 : 1);
        const rightStride = -stride * (limpLeft ? 1 : 0.42);
        drawBlockLimb(ctx, -4, 5, -5 - sway * 0.25, 16 + leftStride, 5, flashing ? "#d7cec2" : look.pants, "#202522");
        drawBlockLimb(ctx, 4, 5, 5 + sway * 0.25, 16 + rightStride, 5, flashing ? "#d7cec2" : look.pants, "#202522");
        fillBlockPolygon(ctx, flashing ? "#eadfd3" : look.shirtDark, [[-9, -7], [8, -7], [9, 7], [-8, 8]]);
        fillBlockPolygon(ctx, flashing ? "#f1e6da" : look.shirt, [[-7, -6], [6, -6], [7, 5], [-6, 6]]);
        const armReach = chasing ? 1 : 0;
        const attackReach = attackRemaining > 0 ? Math.sin(attackProgress * Math.PI) : 0;
        const leftHandX = -10 + Math.sin(phase) * move * 2 + attackReach * 5;
        const rightHandX = 10 - Math.sin(phase) * move * 2 - attackReach * 5;
        const idleDrag = Math.cos(phase) * move * 3;
        const leftHandY = armReach ? -10 - attackReach * 7 : 4 + idleDrag;
        const rightHandY = armReach ? -12 - attackReach * 7 : 7 - idleDrag;
        drawBlockLimb(ctx, -7, -4, leftHandX, leftHandY, 4, flashing ? "#eadfd3" : look.shirtDark, flashing ? "#f4e6d8" : look.skinDark);
        drawBlockLimb(ctx, 7, -4, rightHandX, rightHandY, 4, flashing ? "#eadfd3" : look.shirtDark, flashing ? "#f4e6d8" : look.skinDark);
        if ((zombie.variant ?? 0) === 0) {
          ctx.fillStyle = "rgba(199,164,77,.48)";
          ctx.fillRect(-6, 1, 13, 2);
        } else if ((zombie.variant ?? 0) === 1) {
          ctx.fillStyle = "#737d86";
          ctx.fillRect(-1, -5, 2, 10);
          ctx.fillStyle = look.accent;
          ctx.fillRect(4, -4, 3, 3);
        } else if ((zombie.variant ?? 0) === 2) {
          ctx.fillStyle = look.skinDark;
          ctx.fillRect(3, 3, 4, 4);
          ctx.fillStyle = look.accent;
          ctx.fillRect(-6, -1, 4, 2);
        } else {
          ctx.fillStyle = "#25282b";
          ctx.fillRect(-1, -5, 2, 9);
        }
        ctx.fillStyle = flashing ? "#f3e6d8" : look.skinDark;
        ctx.fillRect(-6, -17, 12, 11);
        ctx.fillStyle = flashing ? "#fff0e2" : look.skin;
        ctx.fillRect(-5, -17, 10, 8);
        ctx.fillStyle = look.hair;
        ctx.fillRect(-6, -9, 12, 3);
        ctx.fillRect((zombie.variant ?? 0) % 2 ? -6 : 3, -15, 3, 6);
        ctx.fillStyle = "#25231e";
        ctx.fillRect(-4, -16, 2, 2);
        ctx.fillRect(3, -16, 2, 2);
        ctx.fillStyle = look.accent;
        ctx.fillRect((zombie.variant ?? 0) % 2 ? -2 : 1, -12, 4, 2);
        if (chasing) {
          ctx.fillStyle = "rgba(175,64,57,.65)";
          ctx.fillRect(-9, -25, 18 * clamp(zombie.health / zombie.maxHealth, 0, 1), 2);
        }
        ctx.restore();
      }
    }
    drawPlayerLegacy(ctx, shakeX, shakeY) {
      const player = this.player;
      const p = this.worldToScreen(player.x, player.y, shakeX, shakeY);
      const angle = Math.atan2(player.facingY, player.facingX) + Math.PI / 2;
      const phase = player.animTime ?? 0;
      const move = clamp(player.moveBlend ?? 0, 0, 1);
      const sprinting = Boolean(player.sprintingNow);
      const crouchDrop = player.crouching ? 4 : 0;
      const stride = Math.sin(phase) * move * (sprinting ? 6.2 : player.crouching ? 2.7 : 4.4);
      const bodyBob = Math.round(Math.abs(Math.cos(phase)) * move * (sprinting ? 2 : 1));
      const attackDuration = player.attackDuration || 0.28;
      const attackRemaining = clamp((player.attackAnim ?? 0) / attackDuration, 0, 1);
      const attackProgress = 1 - attackRemaining;
      const attackCurve = attackRemaining > 0 ? Math.sin(attackProgress * Math.PI) : 0;
      const hurt = clamp((player.hurtAnim ?? 0) / 0.3, 0, 1);
      const hurtFlash = hurt > 0 && Math.floor(hurt * 22) % 2 === 0;
      const weapon = ITEMS[player.equipped] ?? FISTS;
      const ranged = weapon.mode === "ranged";
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(angle);
      ctx.translate(0, bodyBob + hurt * 3);
      ctx.rotate(Math.sin(hurt * Math.PI) * -0.13);
      ctx.fillStyle = "rgba(0,0,0,.3)";
      ctx.beginPath();
      ctx.ellipse(2, 11 + crouchDrop * 0.35, sprinting ? 16 : 14, player.crouching ? 8 : 7, 0, 0, Math.PI * 2);
      ctx.fill();
      const legY = player.crouching ? 13 : 17;
      drawBlockLimb(ctx, -4, 5 + crouchDrop, -5, legY + stride, 5, hurtFlash ? "#efe4d8" : "#27322f", "#171d1b");
      drawBlockLimb(ctx, 4, 5 + crouchDrop, 5, legY - stride, 5, hurtFlash ? "#efe4d8" : "#303b37", "#171d1b");
      const hasBackpack = player.inventory?.some((entry) => entry.id === "backpack" && entry.qty > 0);
      if (hasBackpack) {
        ctx.fillStyle = "#343a2e";
        ctx.fillRect(-9, -2 + crouchDrop, 18, 12);
        ctx.fillStyle = "#535b42";
        ctx.fillRect(-7, 0 + crouchDrop, 14, 7);
        ctx.fillStyle = "#a68a55";
        ctx.fillRect(-1, 5 + crouchDrop, 3, 3);
      }
      fillBlockPolygon(ctx, hurtFlash ? "#f0e3d7" : "#394a3e", [[-9, -7 + crouchDrop], [9, -7 + crouchDrop], [8, 8 + crouchDrop], [-8, 8 + crouchDrop]]);
      fillBlockPolygon(ctx, hurtFlash ? "#fff0e3" : player.crouching ? "#536552" : "#60775f", [[-7, -6 + crouchDrop], [7, -6 + crouchDrop], [6, 6 + crouchDrop], [-6, 6 + crouchDrop]]);
      ctx.fillStyle = "#8ca080";
      ctx.fillRect(-1, -5 + crouchDrop, 2, 10);
      ctx.fillStyle = "#b59b63";
      ctx.fillRect(3, -4 + crouchDrop, 3, 3);
      const skin = hurtFlash ? "#fff1e4" : "#bf9677";
      const sleeve = hurtFlash ? "#f0e3d7" : "#4f6552";
      let leftHand = { x: -10, y: 3 + Math.cos(phase) * move * 3 + crouchDrop };
      let rightHand = { x: 10, y: 3 - Math.cos(phase) * move * 3 + crouchDrop };
      if (ranged) {
        const recoil = attackCurve * (weapon.pellets ? 4 : 2);
        leftHand = { x: -2, y: -12 + crouchDrop + recoil };
        rightHand = { x: 3, y: -11 + crouchDrop + recoil };
      } else if (attackRemaining > 0) {
        const sweep = -1.12 + attackProgress * 2.24;
        rightHand = {
          x: Math.sin(sweep) * 14,
          y: -Math.cos(sweep) * 14 - 1 + crouchDrop
        };
        if (player.equipped === "bat" || player.equipped === "axe") {
          leftHand = { x: rightHand.x * 0.56 - 2, y: rightHand.y * 0.56 + crouchDrop * 0.44 };
        }
      } else if (weapon !== FISTS) {
        rightHand = { x: 8, y: -9 + crouchDrop };
      }
      drawBlockLimb(ctx, -7, -4 + crouchDrop, leftHand.x, leftHand.y, 4, sleeve, skin);
      drawBlockLimb(ctx, 7, -4 + crouchDrop, rightHand.x, rightHand.y, 4, sleeve, skin);
      if (ranged) {
        const recoil = attackCurve * (weapon.pellets ? 4 : 2);
        if (player.equipped === "shotgun") {
          ctx.fillStyle = "#4a3425";
          ctx.fillRect(-3, -10 + crouchDrop + recoil, 6, 10);
          ctx.fillStyle = "#242a29";
          ctx.fillRect(-2, -27 + crouchDrop + recoil, 5, 19);
          ctx.fillStyle = "#7a674a";
          ctx.fillRect(-3, -18 + crouchDrop + recoil, 6, 5);
        } else {
          ctx.fillStyle = "#252b2b";
          ctx.fillRect(-2, -22 + crouchDrop + recoil, 5, 13);
          ctx.fillStyle = "#727a75";
          ctx.fillRect(-1, -24 + crouchDrop + recoil, 3, 5);
        }
      } else if (weapon !== FISTS) {
        let dx = rightHand.x;
        let dy = rightHand.y - crouchDrop;
        const length = Math.hypot(dx, dy) || 1;
        dx /= length;
        dy /= length;
        const reach = player.equipped === "knife" ? 9 : player.equipped === "axe" ? 15 : 14;
        const endX = rightHand.x + dx * reach;
        const endY = rightHand.y + dy * reach;
        if (player.equipped === "knife") {
          drawBlockLimb(ctx, rightHand.x, rightHand.y, endX, endY, 2, "#c7d0ca", "#e4ebe5");
          ctx.fillStyle = "#302a25";
          ctx.fillRect(Math.round(rightHand.x - 2), Math.round(rightHand.y - 2), 4, 4);
        } else {
          drawBlockLimb(ctx, rightHand.x, rightHand.y, endX, endY, player.equipped === "bat" ? 4 : 3, player.equipped === "bat" ? "#785337" : "#694a30");
          if (player.equipped === "axe") {
            ctx.save();
            ctx.translate(endX, endY);
            ctx.rotate(Math.atan2(dy, dx));
            ctx.fillStyle = "#9aa19d";
            ctx.fillRect(-2, -6, 6, 12);
            ctx.fillStyle = "#c2c8c3";
            ctx.fillRect(1, -6, 4, 4);
            ctx.restore();
          }
        }
      }
      ctx.fillStyle = hurtFlash ? "#f8e9dc" : "#9d735b";
      ctx.fillRect(-6, -18 + crouchDrop, 12, 11);
      ctx.fillStyle = skin;
      ctx.fillRect(-5, -18 + crouchDrop, 10, 8);
      ctx.fillStyle = "#29231f";
      ctx.fillRect(-6, -10 + crouchDrop, 12, 3);
      ctx.fillRect(-6, -16 + crouchDrop, 3, 7);
      ctx.fillStyle = "#2b2924";
      ctx.fillRect(-3, -17 + crouchDrop, 2, 2);
      ctx.fillRect(2, -17 + crouchDrop, 2, 2);
      ctx.fillStyle = "#8f5142";
      ctx.fillRect(-1, -13 + crouchDrop, 3, 1);
      ctx.restore();
    }
    drawCrawlerZombie(ctx, zombie, p, fx, fy, look, phase, move, flashing) {
      const side = Math.sin(phase) * move;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(Math.atan2(fy, fx));
      if (zombie.dead) ctx.globalAlpha = 0.58;
      ctx.fillStyle = "rgba(2,5,3,.42)";
      ctx.beginPath();
      ctx.ellipse(-3, 4, 21, 7, 0, 0, Math.PI * 2);
      ctx.fill();
      drawSmoothLimb(ctx, -10, 0, -21, -5 + side * 4, 5, look.pants);
      drawSmoothLimb(ctx, -8, 3, -20, 8 - side * 3, 5, look.pants);
      ctx.fillStyle = flashing ? "#efe4d8" : look.shirt;
      roundedRectPath(ctx, -10, -7, 23, 15, 6);
      ctx.fill();
      ctx.fillStyle = look.accent;
      ctx.beginPath();
      ctx.ellipse(-8, 5, 6, 3, -0.2, 0, Math.PI * 2);
      ctx.fill();
      drawSmoothLimb(ctx, 4, -4, 20 + side * 5, -9, 4.5, look.shirtDark);
      drawSmoothLimb(ctx, 5, 4, 22 - side * 4, 8, 4.5, look.shirtDark);
      ctx.fillStyle = flashing ? "#fff0e2" : look.skin;
      ctx.beginPath();
      ctx.ellipse(14, 0, 7, 7.5, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = look.hair;
      ctx.beginPath();
      ctx.arc(12, -3, 5, Math.PI, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#23251f";
      ctx.fillRect(16, -3, 2, 2);
      ctx.fillStyle = look.accent;
      ctx.fillRect(17, 2, 5, 3);
      if (!zombie.dead && ["chase", "bash"].includes(zombie.state)) {
        ctx.fillStyle = "rgba(15,9,8,.72)";
        ctx.fillRect(3, -16, 22, 3);
        ctx.fillStyle = "#a64d47";
        ctx.fillRect(4, -15, 20 * clamp(zombie.health / zombie.maxHealth, 0, 1), 1.5);
      }
      ctx.restore();
    }
    // Screen-upright, three-quarter characters: turning changes the pose and face,
    // not the direction of gravity. This keeps a survivor facing east from looking
    // as if they fell onto their side.
    drawZombies(ctx, shakeX, shakeY) {
      for (const zombie of this.zombies) {
        if (this.isHiddenInside(zombie)) continue;
        const p = this.worldToScreen(zombie.x, zombie.y, shakeX, shakeY);
        if (p.x < -55 || p.y < -55 || p.x > this.viewWidth + 55 || p.y > this.viewHeight + 55) continue;
        const look = ZOMBIE_LOOKS[(zombie.variant ?? 0) % ZOMBIE_LOOKS.length];
        const fx = Math.cos(zombie.angle ?? 0);
        const fy = Math.sin(zombie.angle ?? 0);
        const side = fx >= 0 ? 1 : -1;
        const phase = (zombie.animTime ?? 0) + (zombie.variant ?? 0) * 0.81;
        const move = clamp(zombie.moveBlend ?? 0, 0, 1);
        const chasing = zombie.state === "chase" || zombie.state === "bash";
        const flashing = zombie.hitFlash > 0;
        const hurt = clamp((zombie.hurtAnim ?? 0) / 0.28, 0, 1);
        const attackRemaining = clamp((zombie.attackAnim ?? 0) / 0.42, 0, 1);
        const attackProgress = 1 - attackRemaining;
        const attackReach = attackRemaining > 0 ? Math.sin(attackProgress * Math.PI) : 0;
        const fall = zombie.dead ? 1 - clamp(zombie.deathAnim ?? 0, 0, 1) : 0;
        const fallSide = zombie.deathSide ?? 1;
        const idleTwitch = Math.sin(phase * 0.43 + (zombie.variant ?? 0) * 1.7) * (1 - move);
        if (zombie.archetype === "crawler") {
          this.drawCrawlerZombie(ctx, zombie, p, fx, fy, look, phase, move, flashing);
          continue;
        }
        ctx.save();
        ctx.translate(p.x, p.y);
        if (zombie.archetype === "brute") ctx.scale(1.34, 1.14);
        else if (zombie.archetype === "bloater") ctx.scale(1.22, 1.1);
        else if (zombie.archetype === "runner") ctx.scale(0.9, 1.05);
        if (zombie.dead) {
          ctx.rotate(fallSide * fall * 1.18);
          ctx.translate(fallSide * fall * 4, fall * 6);
          ctx.globalAlpha = 0.9 - fall * 0.22;
        } else {
          ctx.translate(-fx * attackReach * 5 + fallSide * hurt * 3, -fy * attackReach * 3 + hurt * 2);
        }
        ctx.fillStyle = "rgba(2,5,3,.38)";
        ctx.beginPath();
        ctx.ellipse(2, 1, zombie.dead ? 18 : 12 + move * 2, zombie.dead ? 7 : 5, 0, 0, Math.PI * 2);
        ctx.fill();
        const gait = Math.sin(phase) * move * (chasing ? 4.7 : 3.1);
        const limpLeft = (zombie.limpSide ?? -1) < 0;
        const leftStep = gait * (limpLeft ? 0.42 : 1);
        const rightStep = -gait * (limpLeft ? 1 : 0.42);
        const hipY = -10;
        const leftFoot = { x: -4 + fx * leftStep, y: -1 + fy * leftStep * 0.45 };
        const rightFoot = { x: 4 + fx * rightStep, y: -1 + fy * rightStep * 0.45 };
        drawSmoothLimb(ctx, -4, hipY, -5 + fx * leftStep * 0.45, -5 + fy * leftStep * 0.2, 5, flashing ? "#e7dbcf" : look.pants);
        drawSmoothLimb(ctx, -5 + fx * leftStep * 0.45, -5 + fy * leftStep * 0.2, leftFoot.x, leftFoot.y, 4.5, flashing ? "#e7dbcf" : look.pants);
        drawSmoothLimb(ctx, 4, hipY, 5 + fx * rightStep * 0.45, -5 + fy * rightStep * 0.2, 5, flashing ? "#e7dbcf" : look.pants);
        drawSmoothLimb(ctx, 5 + fx * rightStep * 0.45, -5 + fy * rightStep * 0.2, rightFoot.x, rightFoot.y, 4.5, flashing ? "#e7dbcf" : look.pants);
        ctx.fillStyle = "#171d1b";
        ctx.beginPath();
        ctx.ellipse(leftFoot.x + fx * 1.5, leftFoot.y, 4.5, 2.6, 0, 0, Math.PI * 2);
        ctx.ellipse(rightFoot.x + fx * 1.5, rightFoot.y, 4.5, 2.6, 0, 0, Math.PI * 2);
        ctx.fill();
        const bob = Math.abs(Math.cos(phase)) * move * 1.2;
        const hunch = chasing ? 1.5 : 0;
        const bodyX = Math.sin(phase * 0.5) * move * 1.2 + fx * hunch + idleTwitch * 0.8;
        const bodyY = -18 + bob + hunch + Math.abs(idleTwitch) * 0.45;
        const shirt = flashing ? "#f1e5d9" : look.shirt;
        const shirtDark = flashing ? "#d9cec4" : look.shirtDark;
        const shoulderY = bodyY - 1;
        let leftHand;
        let rightHand;
        if (chasing || attackRemaining > 0) {
          const reach = 9 + attackReach * 10;
          leftHand = { x: bodyX - 5 + fx * reach, y: shoulderY + 3 + fy * reach * 0.55 };
          rightHand = { x: bodyX + 5 + fx * (reach + 2), y: shoulderY + 4 + fy * (reach + 2) * 0.55 };
        } else {
          leftHand = { x: bodyX - 10 - side, y: bodyY + 9 + Math.cos(phase) * move * 2.5 };
          rightHand = { x: bodyX + 10, y: bodyY + 11 - Math.cos(phase) * move * 2 };
        }
        drawSmoothLimb(ctx, bodyX - 7, shoulderY, leftHand.x, leftHand.y, 4.5, shirtDark);
        drawSmoothLimb(ctx, bodyX + 7, shoulderY, rightHand.x, rightHand.y, 4.5, shirtDark);
        roundedRectPath(ctx, bodyX - 9, bodyY - 7, 18, 17, 5);
        ctx.fillStyle = "#242a26";
        ctx.fill();
        roundedRectPath(ctx, bodyX - 7.5, bodyY - 6, 15, 15, 4);
        ctx.fillStyle = shirt;
        ctx.fill();
        ctx.fillStyle = shirtDark;
        ctx.fillRect(bodyX - 7, bodyY + 6, 14, 3);
        if (zombie.archetype === "bloater") {
          ctx.fillStyle = flashing ? "#efe3d7" : "#6f865f";
          ctx.beginPath();
          ctx.ellipse(bodyX, bodyY + 5, 11, 10, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = "rgba(187,168,103,.48)";
          ctx.beginPath();
          ctx.ellipse(bodyX - 4, bodyY + 5, 3, 4, 0.2, 0, Math.PI * 2);
          ctx.ellipse(bodyX + 5, bodyY + 2, 2.5, 3.5, -0.3, 0, Math.PI * 2);
          ctx.fill();
        } else if (zombie.archetype === "brute") {
          ctx.fillStyle = "rgba(40,52,42,.78)";
          roundedRectPath(ctx, bodyX - 10, bodyY - 5, 20, 5, 2);
          ctx.fill();
          ctx.fillStyle = look.accent;
          ctx.fillRect(bodyX + 4, bodyY + 1, 5, 3);
        } else if (zombie.archetype === "runner") {
          ctx.fillStyle = "rgba(128,46,42,.58)";
          ctx.fillRect(bodyX - 6, bodyY + 1, 12, 2);
        }
        if ((zombie.variant ?? 0) === 0) {
          ctx.fillStyle = "rgba(215,178,77,.55)";
          ctx.fillRect(bodyX - 7, bodyY + 1, 14, 2);
        } else if ((zombie.variant ?? 0) === 1) {
          ctx.fillStyle = "#78828a";
          ctx.fillRect(bodyX - 1, bodyY - 5, 2, 12);
          ctx.fillStyle = look.accent;
          ctx.fillRect(bodyX + 3, bodyY - 3, 3, 3);
        } else if ((zombie.variant ?? 0) === 2) {
          ctx.fillStyle = look.accent;
          ctx.beginPath();
          ctx.ellipse(bodyX - 4, bodyY + 3, 3, 2, 0.4, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillStyle = "#25282b";
          ctx.beginPath();
          ctx.moveTo(bodyX, bodyY - 5);
          ctx.lineTo(bodyX + 2, bodyY + 5);
          ctx.lineTo(bodyX - 1, bodyY + 7);
          ctx.closePath();
          ctx.fill();
        }
        const handColor = flashing ? "#fff0e2" : look.skinDark;
        ctx.fillStyle = handColor;
        ctx.beginPath();
        ctx.arc(leftHand.x, leftHand.y, 2.8, 0, Math.PI * 2);
        ctx.arc(rightHand.x, rightHand.y, 2.8, 0, Math.PI * 2);
        ctx.fill();
        const headX = bodyX + fx * 2.3 + idleTwitch * 0.65;
        const headY = bodyY - 12 + fy * 1.2 - idleTwitch * 0.35;
        ctx.fillStyle = "#252922";
        ctx.beginPath();
        ctx.ellipse(headX, headY, 7.2, 8, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = flashing ? "#fff0e2" : look.skin;
        ctx.beginPath();
        ctx.ellipse(headX, headY - 0.5, 6.1, 6.9, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = look.hair;
        ctx.beginPath();
        ctx.ellipse(headX - side * 1.2, headY - 4.5, 6, 3.4, side * 0.12, Math.PI, Math.PI * 2);
        ctx.fill();
        ctx.fillRect(headX - (side > 0 ? 6 : -3), headY - 4, 3, 7);
        if (fy > -0.66) {
          const eyeY = headY - 1 + Math.max(0, fy) * 1.5;
          ctx.fillStyle = "#24251f";
          if (Math.abs(fx) > 0.55) {
            ctx.fillRect(headX + side * 2 - 1, eyeY, 2, 2);
          } else {
            ctx.fillRect(headX - 3, eyeY, 2, 2);
            ctx.fillRect(headX + 2, eyeY, 2, 2);
          }
          ctx.fillStyle = look.accent;
          const jawDrop = zombie.archetype === "howler" ? 5 + Math.abs(Math.sin(phase * 0.72)) * 2 : chasing ? 1 + Math.abs(Math.sin(phase * 0.72)) * 1.5 : 0.5;
          ctx.fillRect(headX - 2 + side, eyeY + 4, zombie.archetype === "howler" ? 5 : 4, jawDrop);
        }
        if (chasing && !zombie.dead) {
          const hp = clamp(zombie.health / zombie.maxHealth, 0, 1);
          ctx.fillStyle = "rgba(15,9,8,.72)";
          ctx.fillRect(headX - 10, headY - 13, 20, 3);
          ctx.fillStyle = "#a64d47";
          ctx.fillRect(headX - 9, headY - 12, 18 * hp, 1.5);
        }
        ctx.restore();
      }
    }
    drawSurvivors(ctx, shakeX, shakeY) {
      const speakingSurvivor = this.survivors.find((survivor) => !survivor.dead && survivor.speech && survivor.speechTimer > 2.7 && distance(survivor, this.player) < 390);
      const nearestNamed = speakingSurvivor || this.survivors.filter((survivor) => !survivor.dead && distance(survivor, this.player) < 230).sort((a, b) => distance(a, this.player) - distance(b, this.player))[0];
      for (const survivor of this.survivors) {
        if (this.isHiddenInside(survivor)) continue;
        const p = this.worldToScreen(survivor.x, survivor.y, shakeX, shakeY);
        if (p.x < -70 || p.y < -70 || p.x > this.viewWidth + 70 || p.y > this.viewHeight + 70) continue;
        const look = SURVIVOR_LOOKS[(survivor.outfit || 0) % SURVIVOR_LOOKS.length];
        const fx = Math.cos(survivor.angle || 0);
        const fy = Math.sin(survivor.angle || 0);
        const side = fx >= 0 ? 1 : -1;
        const phase = survivor.animTime || 0;
        const move = clamp(survivor.moveBlend || 0, 0, 1);
        const stride = Math.sin(phase) * move * (survivor.state === "flee" ? 5.5 : 3.8);
        const hurt = clamp((survivor.hurtAnim || 0) / 0.3, 0, 1);
        const flashing = hurt > 0 && Math.floor(hurt * 20) % 2 === 0;
        const weapon = ITEMS[survivor.weapon] || ITEMS.knife;
        const attacking = survivor.attackAnim > 0;
        ctx.save();
        ctx.translate(p.x + hurt * side * -3, p.y + hurt * 2);
        if (survivor.dead) {
          ctx.rotate(side * 1.35);
          ctx.translate(3, 6);
          ctx.globalAlpha = 0.72;
        }
        ctx.fillStyle = "rgba(2,5,3,.38)";
        ctx.beginPath();
        ctx.ellipse(2, 1, survivor.dead ? 17 : 12 + move * 2, survivor.dead ? 6 : 5, 0, 0, Math.PI * 2);
        ctx.fill();
        const hipY = -10;
        const leftFoot = { x: -4 + fx * stride, y: -1 + fy * stride * 0.42 };
        const rightFoot = { x: 4 - fx * stride, y: -1 - fy * stride * 0.42 };
        drawSmoothLimb(ctx, -4, hipY, leftFoot.x, leftFoot.y, 4.8, flashing ? "#eee2d7" : look.pants);
        drawSmoothLimb(ctx, 4, hipY, rightFoot.x, rightFoot.y, 4.8, flashing ? "#eee2d7" : look.pants);
        ctx.fillStyle = "#171c1a";
        ctx.beginPath();
        ctx.ellipse(leftFoot.x, leftFoot.y, 4.5, 2.4, 0, 0, Math.PI * 2);
        ctx.ellipse(rightFoot.x, rightFoot.y, 4.5, 2.4, 0, 0, Math.PI * 2);
        ctx.fill();
        const bob = Math.abs(Math.cos(phase)) * move;
        const bodyX = survivor.state === "flee" ? fx * 2 : 0;
        const bodyY = -19 + bob;
        const shoulderY = bodyY - 1;
        let leftHand = { x: bodyX - 10, y: bodyY + 7 + Math.cos(phase) * move * 2 };
        let rightHand = { x: bodyX + 10, y: bodyY + 7 - Math.cos(phase) * move * 2 };
        if (weapon.mode === "ranged") {
          const recoil = attacking ? 2.5 : 0;
          leftHand = { x: bodyX - 1 + fx * (10 - recoil), y: bodyY + fy * 6 };
          rightHand = { x: bodyX + 2 + fx * (11 - recoil), y: bodyY + 2 + fy * 7 };
        } else if (attacking) {
          rightHand = { x: bodyX + fx * 14, y: bodyY + fy * 9 };
        }
        drawSmoothLimb(ctx, bodyX - 7, shoulderY, leftHand.x, leftHand.y, 4.2, flashing ? "#e5d9cd" : look.dark, flashing ? "#e5d9cd" : look.dark);
        drawSmoothLimb(ctx, bodyX + 7, shoulderY, rightHand.x, rightHand.y, 4.2, flashing ? "#e5d9cd" : look.dark, flashing ? "#e5d9cd" : look.dark);
        roundedRectPath(ctx, bodyX - 8.5, bodyY - 7, 17, 17, 5);
        ctx.fillStyle = flashing ? "#f0e3d8" : look.dark;
        ctx.fill();
        roundedRectPath(ctx, bodyX - 7, bodyY - 6, 14, 14, 4);
        ctx.fillStyle = flashing ? "#fff0e4" : look.shirt;
        ctx.fill();
        ctx.fillStyle = survivor.role === "medic" ? "#d8ded8" : survivor.role === "guard" ? "#cfad59" : "#899d83";
        if (survivor.role === "medic") {
          ctx.fillRect(bodyX - 1, bodyY - 4, 2, 7);
          ctx.fillRect(bodyX - 3, bodyY - 2, 6, 2);
        } else {
          ctx.fillRect(bodyX + 3, bodyY - 3, 3, 3);
        }
        ctx.fillStyle = flashing ? "#fff0e4" : look.skin;
        ctx.beginPath();
        ctx.arc(leftHand.x, leftHand.y, 2.6, 0, Math.PI * 2);
        ctx.arc(rightHand.x, rightHand.y, 2.6, 0, Math.PI * 2);
        ctx.fill();
        const headX = bodyX + fx * 2;
        const headY = bodyY - 12 + fy;
        ctx.fillStyle = flashing ? "#fff0e4" : look.skin;
        ctx.beginPath();
        ctx.ellipse(headX, headY, 6.2, 7, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = look.hair;
        ctx.beginPath();
        ctx.ellipse(headX - side, headY - 4.2, 6, 3.5, 0, Math.PI, Math.PI * 2);
        ctx.fill();
        ctx.fillRect(headX - (side > 0 ? 6 : -3), headY - 4, 3, 7);
        ctx.fillStyle = "#26231f";
        ctx.fillRect(headX + side * 2 - 1, headY - 1, 2, 2);
        if (!survivor.dead) {
          const weaponStartX = (leftHand.x + rightHand.x) / 2;
          const weaponStartY = (leftHand.y + rightHand.y) / 2;
          if (weapon.mode === "ranged") drawRangedWeaponModel(ctx, survivor.weapon, weaponStartX, weaponStartY, fx, fy * 0.72);
          else drawMeleeWeaponModel(ctx, survivor.weapon, rightHand.x, rightHand.y, fx, fy * 0.72);
        }
        ctx.restore();
        const activeSpeech = survivor.speech && survivor.speechTimer > 2.7;
        if (!survivor.dead && survivor === nearestNamed) {
          ctx.save();
          ctx.font = "800 8px system-ui, sans-serif";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          const label = `${survivor.name} \u2022 ${survivor.role.toUpperCase()}`;
          const labelWidth = Math.min(112, Math.max(58, ctx.measureText(label).width + 13));
          ctx.fillStyle = "rgba(7,11,9,.76)";
          roundedRectPath(ctx, p.x - labelWidth / 2, p.y - 48, labelWidth, 12, 4);
          ctx.fill();
          ctx.fillStyle = "#c9ded3";
          ctx.fillText(label, p.x, p.y - 42);
          if (activeSpeech) {
            const width = Math.min(126, Math.max(62, survivor.speech.length * 5.2));
            ctx.fillStyle = "rgba(225,224,203,.94)";
            roundedRectPath(ctx, p.x - width / 2, p.y - 68, width, 17, 5);
            ctx.fill();
            ctx.fillStyle = "#1c2521";
            ctx.font = "800 9px system-ui, sans-serif";
            ctx.fillText(survivor.speech, p.x, p.y - 59.5);
          }
          ctx.restore();
        }
      }
    }
    drawPlayer(ctx, shakeX, shakeY) {
      const player = this.player;
      const p = this.worldToScreen(player.x, player.y, shakeX, shakeY);
      const fx = player.renderFacingX ?? player.facingX ?? 1;
      const fy = player.renderFacingY ?? player.facingY ?? 0;
      const side = fx >= 0 ? 1 : -1;
      const phase = player.animTime ?? 0;
      const move = clamp(player.moveBlend ?? 0, 0, 1);
      const sprinting = Boolean(player.sprintingNow);
      const crouching = Boolean(player.crouching);
      const attackDuration = player.attackDuration || 0.28;
      const attackRemaining = clamp((player.attackAnim ?? 0) / attackDuration, 0, 1);
      const attackProgress = 1 - attackRemaining;
      const attackCurve = attackRemaining > 0 ? Math.sin(attackProgress * Math.PI) : 0;
      const hurt = clamp((player.hurtAnim ?? 0) / 0.3, 0, 1);
      const hurtFlash = hurt > 0 && Math.floor(hurt * 22) % 2 === 0;
      const weapon = ITEMS[player.equipped] ?? FISTS;
      const ranged = weapon.mode === "ranged";
      const twoHandedMelee = ["bat", "axe", "katana", "crowbar", "spear", "sledgehammer"].includes(player.equipped);
      const compress = crouching ? 5 : 0;
      const step = Math.sin(phase) * move * (sprinting ? 5.8 : crouching ? 2.7 : 4.1);
      const bob = Math.abs(Math.cos(phase)) * move * (sprinting ? 1.8 : 1.1);
      const breathing = Math.sin(phase * 0.58) * (1 - move) * (crouching ? 0.35 : 0.8);
      ctx.save();
      ctx.translate(p.x + Math.sin(hurt * Math.PI) * -side * 4, p.y + hurt * 2);
      ctx.rotate((player.turnLean || 0) * 0.08);
      ctx.scale(0.88, 0.88);
      ctx.fillStyle = "rgba(2,5,3,.4)";
      ctx.beginPath();
      ctx.ellipse(2, 1, sprinting ? 15 : 12, crouching ? 6 : 5, 0, 0, Math.PI * 2);
      ctx.fill();
      const hipY = -10 + compress;
      const leftFoot = { x: -4 + fx * step, y: -1 + fy * step * 0.45 };
      const rightFoot = { x: 4 - fx * step, y: -1 - fy * step * 0.45 };
      const pantsLeft = hurtFlash ? "#eee2d7" : "#2b3733";
      const pantsRight = hurtFlash ? "#eee2d7" : "#34413c";
      drawSmoothLimb(ctx, -4, hipY, -5 + fx * step * 0.45, -5 + compress * 0.4 + fy * step * 0.2, 5, pantsLeft);
      drawSmoothLimb(ctx, -5 + fx * step * 0.45, -5 + compress * 0.4 + fy * step * 0.2, leftFoot.x, leftFoot.y, 4.6, pantsLeft);
      drawSmoothLimb(ctx, 4, hipY, 5 - fx * step * 0.45, -5 + compress * 0.4 - fy * step * 0.2, 5, pantsRight);
      drawSmoothLimb(ctx, 5 - fx * step * 0.45, -5 + compress * 0.4 - fy * step * 0.2, rightFoot.x, rightFoot.y, 4.6, pantsRight);
      ctx.fillStyle = "#141b18";
      ctx.beginPath();
      ctx.ellipse(leftFoot.x + fx * 1.4, leftFoot.y, 4.6, 2.6, 0, 0, Math.PI * 2);
      ctx.ellipse(rightFoot.x + fx * 1.4, rightFoot.y, 4.6, 2.6, 0, 0, Math.PI * 2);
      ctx.fill();
      const lean = sprinting ? fx * 2.3 : 0;
      const bodyX = lean;
      const bodyY = -19 + compress + bob + breathing;
      const skin = hurtFlash ? "#fff1e4" : "#bf9677";
      const jacket = hurtFlash ? "#f7e9dc" : crouching ? "#546b58" : "#607b64";
      const jacketDark = hurtFlash ? "#d9ccc1" : "#3e5445";
      const hasBackpack = player.inventory?.some((entry) => entry.id === "backpack" && entry.qty > 0);
      if (hasBackpack) {
        ctx.fillStyle = "#252d25";
        roundedRectPath(ctx, bodyX - 9 - fx, bodyY - 4, 18, 17, 5);
        ctx.fill();
        ctx.fillStyle = "#4f5a42";
        roundedRectPath(ctx, bodyX - 7 - fx, bodyY - 2, 14, 13, 4);
        ctx.fill();
        ctx.fillStyle = "#a68a55";
        ctx.fillRect(bodyX - 1 - fx, bodyY + 6, 3, 3);
      }
      const shoulderY = bodyY - 1;
      let leftHand = { x: bodyX - 10 - fx * Math.cos(phase) * move * 2, y: bodyY + 7 - fy * Math.cos(phase) * move * 2 };
      let rightHand = { x: bodyX + 10 + fx * Math.cos(phase) * move * 2, y: bodyY + 7 + fy * Math.cos(phase) * move * 2 };
      let weaponDir = { x: fx, y: fy };
      if (ranged) {
        const recoil = attackCurve * (weapon.pellets || player.equipped === "rifle" ? 4 : player.equipped === "revolver" ? 3 : 2);
        const reach = 10 - recoil;
        leftHand = { x: bodyX - 2 + fx * reach, y: bodyY - 1 + fy * reach * 0.62 };
        rightHand = { x: bodyX + 2 + fx * (reach + 1), y: bodyY + 1 + fy * (reach + 1) * 0.62 };
      } else if (attackRemaining > 0) {
        const baseAngle = Math.atan2(fy, fx);
        const thrusting = ["knife", "spear"].includes(player.equipped) || weapon === FISTS;
        const overhead = ["axe", "hammer", "sledgehammer"].includes(player.equipped);
        if (thrusting) {
          const thrust = Math.sin(attackProgress * Math.PI);
          weaponDir = { x: fx, y: fy };
          rightHand = { x: bodyX + fx * (10 + thrust * 8), y: bodyY + fy * (7 + thrust * 6) };
          if (player.equipped === "spear") leftHand = { x: bodyX + fx * (5 + thrust * 5) - side * 2, y: bodyY + fy * (4 + thrust * 4) + 1 };
        } else {
          const arcWidth = overhead ? 2.05 : player.equipped === "katana" ? 2.9 : 2.48;
          const start = overhead ? -1.72 : player.equipped === "katana" ? -1.45 : -1.24;
          const sweep = baseAngle + start + attackProgress * arcWidth;
          weaponDir = { x: Math.cos(sweep), y: Math.sin(sweep) };
          const reach = overhead ? 15 : 13;
          rightHand = { x: bodyX + weaponDir.x * reach, y: bodyY + weaponDir.y * (overhead ? 12 : 9) };
          if (twoHandedMelee) leftHand = { x: bodyX + weaponDir.x * 7 - side * 2, y: bodyY + weaponDir.y * 5 + 1 };
        }
      } else if (weapon !== FISTS) {
        rightHand = { x: bodyX + side * 7 + fx * 6, y: bodyY + 3 + fy * 5 };
      }
      drawSmoothLimb(ctx, bodyX - 7, shoulderY, leftHand.x, leftHand.y, 4.8, jacketDark);
      roundedRectPath(ctx, bodyX - 9, bodyY - 8, 18, 18, 5);
      ctx.fillStyle = "#263029";
      ctx.fill();
      roundedRectPath(ctx, bodyX - 7.5, bodyY - 7, 15, 16, 4);
      ctx.fillStyle = jacket;
      ctx.fill();
      ctx.fillStyle = "rgba(230,236,216,.2)";
      ctx.fillRect(bodyX - 5, bodyY - 5, 10, 2);
      ctx.fillStyle = jacketDark;
      ctx.fillRect(bodyX - 1, bodyY - 6, 2, 14);
      ctx.fillStyle = "#b69d65";
      ctx.beginPath();
      ctx.arc(bodyX + 4, bodyY - 2, 1.5, 0, Math.PI * 2);
      ctx.fill();
      drawSmoothLimb(ctx, bodyX + 7, shoulderY, rightHand.x, rightHand.y, 4.8, jacketDark);
      ctx.fillStyle = skin;
      ctx.beginPath();
      ctx.arc(leftHand.x, leftHand.y, 2.8, 0, Math.PI * 2);
      ctx.arc(rightHand.x, rightHand.y, 2.8, 0, Math.PI * 2);
      ctx.fill();
      if (ranged) {
        const startX = (leftHand.x + rightHand.x) / 2;
        const startY = (leftHand.y + rightHand.y) / 2;
        drawRangedWeaponModel(ctx, player.equipped, startX, startY, fx, fy * 0.72);
      } else if (weapon !== FISTS) {
        const startX = rightHand.x;
        const startY = rightHand.y;
        drawMeleeWeaponModel(ctx, player.equipped, startX, startY, weaponDir.x, weaponDir.y * 0.78);
      }
      const headX = bodyX + fx * 2.1;
      const headY = bodyY - 13 + fy * 1.1;
      ctx.fillStyle = "#2b2923";
      ctx.beginPath();
      ctx.ellipse(headX, headY, 7.4, 8.2, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = skin;
      ctx.beginPath();
      ctx.ellipse(headX, headY - 0.3, 6.2, 7, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#29231f";
      ctx.beginPath();
      ctx.ellipse(headX - side, headY - 4.8, 6.2, 3.6, side * 0.12, Math.PI, Math.PI * 2);
      ctx.fill();
      ctx.fillRect(headX - (side > 0 ? 6 : -3), headY - 4, 3, 7);
      if (fy > -0.67) {
        const eyeY = headY - 0.8 + Math.max(0, fy) * 1.4;
        ctx.fillStyle = "#27251f";
        if (Math.abs(fx) > 0.55) ctx.fillRect(headX + side * 2 - 1, eyeY, 2, 2);
        else {
          ctx.fillRect(headX - 3, eyeY, 2, 2);
          ctx.fillRect(headX + 2, eyeY, 2, 2);
        }
        ctx.fillStyle = "#8f5142";
        ctx.fillRect(headX - 1 + side, eyeY + 4, 3, 1.2);
      }
      ctx.restore();
    }
    drawEffects(ctx, shakeX, shakeY, behind) {
      for (const effect of this.effects) {
        if (effect.type === "death" !== behind) continue;
        if (this.isHiddenInside(effect)) continue;
        const p = this.worldToScreen(effect.x, effect.y, shakeX, shakeY);
        const alpha = clamp(effect.life / effect.maxLife, 0, 1);
        if (effect.type === "death") continue;
        if (effect.type === "tracer") {
          const p2 = this.worldToScreen(effect.x2, effect.y2, shakeX, shakeY);
          ctx.strokeStyle = `rgba(255,221,144,${alpha * 0.75})`;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        } else if (effect.type === "muzzle") {
          ctx.fillStyle = `rgba(255,205,105,${alpha})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 12 * alpha, 0, Math.PI * 2);
          ctx.fill();
        } else if (effect.type === "blast") {
          const progress = 1 - alpha;
          ctx.fillStyle = `rgba(116,151,77,${alpha * 0.32})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, effect.radius * (0.25 + progress * 0.75), 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = `rgba(194,198,118,${alpha * 0.52})`;
          ctx.lineWidth = 4 * alpha;
          ctx.beginPath();
          ctx.arc(p.x, p.y, effect.radius * progress, 0, Math.PI * 2);
          ctx.stroke();
        } else if (effect.type === "casing") {
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate((1 - alpha) * 9);
          ctx.fillStyle = effect.shell ? `rgba(177,62,42,${alpha})` : `rgba(206,172,79,${alpha})`;
          ctx.fillRect(-2, -1, effect.shell ? 5 : 4, 2);
          ctx.restore();
        } else if (effect.type === "swing") {
          ctx.strokeStyle = `rgba(225,225,205,${alpha * 0.52})`;
          ctx.lineWidth = effect.style === "overhead" ? 4 : 3;
          ctx.beginPath();
          if (effect.style === "thrust") {
            ctx.moveTo(p.x + Math.cos(effect.angle) * 18, p.y + Math.sin(effect.angle) * 18);
            ctx.lineTo(p.x + Math.cos(effect.angle) * effect.range, p.y + Math.sin(effect.angle) * effect.range);
          } else {
            const spread = effect.style === "overhead" ? 0.38 : 0.72;
            ctx.arc(p.x, p.y, effect.range, effect.angle - spread, effect.angle + spread);
          }
          ctx.stroke();
        }
      }
    }
    drawLighting(ctx) {
      const night = this.nightStrength();
      const twilight = this.twilightStrength();
      if (night <= 0.01 && twilight <= 0.01) return;
      ctx.save();
      const player = this.worldToScreen(this.player.x, this.player.y);
      if (twilight > 0.01) {
        const dusk = this.timeMinutes / 60 >= 12;
        ctx.fillStyle = dusk ? `rgba(117,54,28,${twilight * 0.16})` : `rgba(119,82,45,${twilight * 0.11})`;
        ctx.fillRect(0, 0, this.viewWidth, this.viewHeight);
      }
      if (night > 0.01) {
        ctx.fillStyle = `rgba(2,8,18,${night * 0.24})`;
        ctx.fillRect(0, 0, this.viewWidth, this.viewHeight);
        const radius = (this.player.flashlight ? 300 : 168) * CAMERA_ZOOM;
        const gradient = ctx.createRadialGradient(player.x, player.y, 18, player.x, player.y, radius);
        gradient.addColorStop(0, `rgba(2,6,14,${night * 0.1})`);
        gradient.addColorStop(0.45, `rgba(2,6,14,${night * 0.32})`);
        gradient.addColorStop(1, `rgba(2,6,14,${night * 0.86})`);
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, this.viewWidth, this.viewHeight);
      }
      if (this.player.flashlight && night > 0.08) {
        const angle = Math.atan2(this.player.facingY, this.player.facingX);
        ctx.globalCompositeOperation = "screen";
        const beamRadius = 430 * CAMERA_ZOOM;
        const beam = ctx.createRadialGradient(player.x, player.y, 20, player.x, player.y, beamRadius);
        beam.addColorStop(0, "rgba(239,228,174,.16)");
        beam.addColorStop(0.55, "rgba(221,216,172,.07)");
        beam.addColorStop(1, "rgba(221,216,172,0)");
        ctx.fillStyle = beam;
        ctx.beginPath();
        ctx.moveTo(player.x, player.y);
        ctx.arc(player.x, player.y, beamRadius, angle - 0.24, angle + 0.24);
        ctx.closePath();
        ctx.fill();
      }
      ctx.restore();
    }
    drawVignette(ctx) {
      const gradient = ctx.createRadialGradient(this.viewWidth / 2, this.viewHeight / 2, Math.min(this.viewWidth, this.viewHeight) * 0.2, this.viewWidth / 2, this.viewHeight / 2, Math.max(this.viewWidth, this.viewHeight) * 0.72);
      gradient.addColorStop(0, "rgba(0,0,0,0)");
      gradient.addColorStop(1, "rgba(0,0,0,.5)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, this.viewWidth, this.viewHeight);
      if (this.player.hurtCooldown > 0) {
        ctx.fillStyle = `rgba(145,27,24,${this.player.hurtCooldown * 0.26})`;
        ctx.fillRect(0, 0, this.viewWidth, this.viewHeight);
      }
      if (this.weather === "LIGHT RAIN") {
        ctx.strokeStyle = "rgba(175,195,198,.12)";
        ctx.lineWidth = 1;
        const t = performance.now() * 0.3;
        for (let i = 0; i < 45; i += 1) {
          const x = (i * 83 + t) % (this.viewWidth + 80) - 40;
          const y = (i * 137 + t * 1.8) % (this.viewHeight + 80) - 40;
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x - 6, y + 15);
          ctx.stroke();
        }
      }
    }
    drawMinimap() {
      const ctx = this.mapCtx;
      const size = this.minimap.width;
      const tilesAcross = 31;
      const scale = size / tilesAcross;
      const centerX = Math.floor(this.player.x / TILE_SIZE);
      const centerY = Math.floor(this.player.y / TILE_SIZE);
      const half = Math.floor(tilesAcross / 2);
      ctx.fillStyle = "#0a0e0b";
      ctx.fillRect(0, 0, size, size);
      for (let oy = -half; oy <= half; oy += 1) {
        for (let ox = -half; ox <= half; ox += 1) {
          const tile = getTile(this.world, centerX + ox, centerY + oy);
          ctx.fillStyle = tile === TILE.ROAD ? "#59605b" : tile === TILE.FLOOR ? "#817765" : tile === TILE.WALL ? "#333a35" : tile === TILE.WATER ? "#29434a" : tile === TILE.TREE ? "#18291c" : "#26362a";
          ctx.fillRect((ox + half) * scale, (oy + half) * scale, Math.ceil(scale), Math.ceil(scale));
        }
      }
      for (const zombie of this.zombies) {
        if (zombie.dead || distance(zombie, this.player) > half * TILE_SIZE) continue;
        const x = size / 2 + (zombie.x - this.player.x) / TILE_SIZE * scale;
        const y = size / 2 + (zombie.y - this.player.y) / TILE_SIZE * scale;
        ctx.fillStyle = "#8f403b";
        ctx.fillRect(x - 1, y - 1, 3, 3);
      }
      for (const survivor of this.survivors) {
        if (survivor.dead || distance(survivor, this.player) > half * TILE_SIZE) continue;
        const x = size / 2 + (survivor.x - this.player.x) / TILE_SIZE * scale;
        const y = size / 2 + (survivor.y - this.player.y) / TILE_SIZE * scale;
        ctx.fillStyle = "#69b69a";
        ctx.fillRect(x - 1.5, y - 1.5, 3, 3);
      }
      ctx.fillStyle = "#e3d8b6";
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, 3.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "rgba(221,226,212,.26)";
      ctx.strokeRect(0.5, 0.5, size - 1, size - 1);
    }
  };
  window.__walkers = new HollowCountyGame();

  // Walkers-Zombie-Types-Addon.js
  (() => {
    "use strict";
    const TYPES = Object.freeze({
      normal: { name: "WALKER", hp: 62, speed: 41, radius: 12, color: "#849071" },
      runner: { name: "RUNNER", hp: 46, speed: 67, radius: 11, color: "#95896d" },
      crawler: { name: "CRAWLER", hp: 48, speed: 53, radius: 10, color: "#738573" },
      sploder: { name: "SPLODER", hp: 88, speed: 29, radius: 17, color: "#739264" },
      brute: { name: "BRUTE", hp: 185, speed: 31, radius: 18, color: "#607562" }
    });
    const LOOKS = [
      { skin: "#899276", skin2: "#606a54", shirt: "#465648", dark: "#2d3931", pants: "#2b3333", wound: "#7d3433", hair: "#24211d" },
      { skin: "#969177", skin2: "#686451", shirt: "#545b67", dark: "#343c46", pants: "#292e38", wound: "#813e38", hair: "#211f1d" },
      { skin: "#7d8e7c", skin2: "#556759", shirt: "#706c61", dark: "#494940", pants: "#363a36", wound: "#71312e", hair: "#2e2720" },
      { skin: "#9a8d72", skin2: "#6e604b", shirt: "#62504c", dark: "#413431", pants: "#303037", wound: "#823c35", hair: "#1f1c1a" }
    ];
    function hash(value) {
      const text = String(value ?? "walker");
      let result = 2166136261;
      for (let i = 0; i < text.length; i += 1) {
        result ^= text.charCodeAt(i);
        result = Math.imul(result, 16777619);
      }
      return (result >>> 0) / 4294967295;
    }
    function chooseType(zombie) {
      if (zombie.zombieType && TYPES[zombie.zombieType]) return zombie.zombieType;
      if (zombie.archetype === "bloater") return "sploder";
      if (TYPES[zombie.archetype]) return zombie.archetype;
      const roll = hash(`${zombie.id}:${Math.floor(zombie.x || 0)}:${Math.floor(zombie.y || 0)}`);
      if (roll < 0.55) return "normal";
      if (roll < 0.7) return "runner";
      if (roll < 0.82) return "crawler";
      if (roll < 0.92) return "sploder";
      return "brute";
    }
    function upgradeZombie(zombie) {
      const type = chooseType(zombie);
      const profile = TYPES[type];
      zombie.zombieType = type;
      if ("archetype" in zombie) zombie.archetype = type === "sploder" ? "bloater" : type;
      if (!zombie.__visibleTypeStats) {
        const oldMax = zombie.maxHealth || zombie.health || 60;
        const healthRatio = Math.max(0.05, Math.min(1, (zombie.health || oldMax) / oldMax));
        zombie.maxHealth = profile.hp;
        zombie.health = profile.hp * healthRatio;
        zombie.speed = profile.speed * (0.9 + hash(`${zombie.id}:speed`) * 0.2);
        zombie.radius = profile.radius;
        zombie.__visibleTypeStats = true;
      }
      return zombie;
    }
    function rounded(ctx, x, y, width, height, radius) {
      const r = Math.min(radius, width / 2, height / 2);
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.lineTo(x + width - r, y);
      ctx.quadraticCurveTo(x + width, y, x + width, y + r);
      ctx.lineTo(x + width, y + height - r);
      ctx.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
      ctx.lineTo(x + r, y + height);
      ctx.quadraticCurveTo(x, y + height, x, y + height - r);
      ctx.lineTo(x, y + r);
      ctx.quadraticCurveTo(x, y, x + r, y);
      ctx.closePath();
    }
    function limb(ctx, x1, y1, x2, y2, width, color, endColor = color) {
      ctx.lineCap = "round";
      ctx.strokeStyle = "#20251f";
      ctx.lineWidth = width + 2.5;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
      ctx.strokeStyle = color;
      ctx.lineWidth = width;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
      ctx.fillStyle = endColor;
      ctx.beginPath();
      ctx.arc(x2, y2, width * 0.57, 0, Math.PI * 2);
      ctx.fill();
    }
    function shadow(ctx, width, height = 6) {
      ctx.fillStyle = "rgba(2,5,3,.44)";
      ctx.beginPath();
      ctx.ellipse(2, 2, width, height, 0, 0, Math.PI * 2);
      ctx.fill();
    }
    function face(ctx, x, y, side, look, scale = 1, mouth = 2) {
      ctx.fillStyle = "#263027";
      ctx.beginPath();
      ctx.ellipse(x, y, 7.4 * scale, 8.3 * scale, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = look.skin;
      ctx.beginPath();
      ctx.ellipse(x, y, 6.2 * scale, 7.1 * scale, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = look.hair;
      ctx.beginPath();
      ctx.ellipse(x - side, y - 4.6 * scale, 6.1 * scale, 3.2 * scale, 0, Math.PI, Math.PI * 2);
      ctx.fill();
      ctx.fillRect(x - (side > 0 ? 6 : -3) * scale, y - 4 * scale, 3 * scale, 6 * scale);
      ctx.fillStyle = "#20231e";
      ctx.fillRect(x + side * 2 - 1, y - 1.5, 2, 2);
      ctx.fillStyle = look.wound;
      ctx.fillRect(x - 2 + side, y + 3, 5, mouth);
    }
    function typeTag(ctx, zombie, y) {
      if (zombie.zombieType === "normal" || zombie.dead) return;
      const profile = TYPES[zombie.zombieType];
      const width = profile.name.length * 5.4 + 13;
      ctx.fillStyle = "rgba(8,12,9,.82)";
      rounded(ctx, -width / 2, y, width, 13, 4);
      ctx.fill();
      ctx.fillStyle = zombie.zombieType === "sploder" ? "#c5db72" : zombie.zombieType === "brute" ? "#e0a267" : "#d8ddd0";
      ctx.font = "900 8px system-ui, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(profile.name, 0, y + 6.5);
    }
    function drawNormal(ctx, zombie, look, phase, move, fx, fy, special = "normal") {
      const side = fx >= 0 ? 1 : -1;
      const stride = Math.sin(phase) * move * (special === "runner" ? 6.2 : 3.8);
      const bodyX = special === "runner" ? fx * 4 : fx * 1.5;
      const bodyY = -18 + Math.abs(Math.cos(phase)) * move;
      shadow(ctx, special === "runner" ? 13 : 15);
      limb(ctx, -4, -10, -5 + fx * stride, 0 + fy * stride * 0.4, 5, look.pants, "#171c1a");
      limb(ctx, 4, -10, 5 - fx * stride, 0 - fy * stride * 0.4, 5, look.pants, "#171c1a");
      const attack = zombie.state === "chase" || zombie.state === "bash";
      const reach = attack ? 12 : 3;
      limb(ctx, bodyX - 7, bodyY - 1, bodyX - 11 + fx * reach, bodyY + 7 + fy * reach * 0.5, 4.5, look.dark, look.skin2);
      limb(ctx, bodyX + 7, bodyY - 1, bodyX + 10 + fx * (reach + 2), bodyY + 9 + fy * reach * 0.5, 4.5, look.dark, look.skin2);
      ctx.fillStyle = "#222922";
      rounded(ctx, bodyX - 9, bodyY - 8, 18, 19, 5);
      ctx.fill();
      ctx.fillStyle = look.shirt;
      rounded(ctx, bodyX - 7.5, bodyY - 7, 15, 16, 4);
      ctx.fill();
      ctx.fillStyle = look.wound;
      ctx.beginPath();
      ctx.ellipse(bodyX + 4, bodyY + 3, 3, 2, 0.4, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "rgba(216,214,185,.18)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(bodyX - 6, bodyY - 1);
      ctx.lineTo(bodyX + 5, bodyY + 1);
      ctx.stroke();
      face(ctx, bodyX + fx * 2, bodyY - 13 + fy, side, look, special === "runner" ? 0.9 : 1, attack ? 3 : 1.5);
      typeTag(ctx, zombie, -51);
    }
    function drawBrute(ctx, zombie, look, phase, move, fx, fy) {
      const side = fx >= 0 ? 1 : -1;
      const stomp = Math.sin(phase) * move * 3;
      shadow(ctx, 25, 8);
      limb(ctx, -9, -10, -11 + fx * stomp, 2 + fy * stomp * 0.3, 8, "#303936", "#181d1b");
      limb(ctx, 9, -10, 11 - fx * stomp, 2 - fy * stomp * 0.3, 8, "#303936", "#181d1b");
      const attacking = zombie.state === "chase" || zombie.state === "bash";
      const punch = attacking ? 9 + Math.abs(Math.sin(phase)) * 7 : 0;
      limb(ctx, -14, -27, -22 + fx * punch, -9 + fy * punch * 0.4, 10, look.skin2, look.skin2);
      limb(ctx, 14, -27, 22 + fx * (punch + 2), -8 + fy * punch * 0.4, 11, look.skin2, look.skin2);
      ctx.fillStyle = "#263128";
      rounded(ctx, -17, -37, 34, 30, 9);
      ctx.fill();
      ctx.fillStyle = "#5f6d5d";
      rounded(ctx, -14, -35, 28, 25, 8);
      ctx.fill();
      ctx.fillStyle = look.shirt;
      ctx.beginPath();
      ctx.moveTo(-14, -34);
      ctx.lineTo(2, -37);
      ctx.lineTo(14, -30);
      ctx.lineTo(8, -22);
      ctx.lineTo(-13, -24);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = look.wound;
      ctx.beginPath();
      ctx.ellipse(-5, -22, 6, 3, -0.2, 0, Math.PI * 2);
      ctx.fill();
      face(ctx, fx * 3, -45 + fy * 2, side, look, 1.1, attacking ? 4 : 2);
      typeTag(ctx, zombie, -66);
    }
    function drawSploder(ctx, zombie, look, phase, move, fx, fy) {
      const side = fx >= 0 ? 1 : -1;
      const wobble = Math.sin(phase * 0.7) * 1.4;
      shadow(ctx, 23, 8);
      limb(ctx, -8, -8, -10 + fx * move * 2, 2, 7, "#3c4039", "#1a1d1b");
      limb(ctx, 8, -8, 10 - fx * move * 2, 2, 7, "#3c4039", "#1a1d1b");
      limb(ctx, -14, -25, -20, -8 + wobble, 7, "#557055", look.skin2);
      limb(ctx, 14, -25, 20, -7 - wobble, 7, "#557055", look.skin2);
      ctx.fillStyle = "#263428";
      ctx.beginPath();
      ctx.ellipse(0, -20, 19, 18, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#69875e";
      ctx.beginPath();
      ctx.ellipse(0, -20 + wobble * 0.25, 17, 16, 0, 0, Math.PI * 2);
      ctx.fill();
      const sacs = [[-8, -19, 5], [7, -15, 4], [3, -28, 3.5]];
      for (const [x, y, r] of sacs) {
        ctx.fillStyle = "#b8ad69";
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "rgba(230,218,142,.38)";
        ctx.beginPath();
        ctx.arc(x - 1, y - 1, r * 0.45, 0, Math.PI * 2);
        ctx.fill();
      }
      face(ctx, fx * 2, -40 + fy, side, { ...look, skin: "#78936b" }, 0.92, 7);
      ctx.fillStyle = "#5b2e68";
      ctx.fillRect(side > 0 ? 1 : -5, -34, 5, 8 + Math.abs(wobble));
      typeTag(ctx, zombie, -61);
    }
    function drawCrawler(ctx, zombie, look, phase, move, fx, fy) {
      ctx.save();
      ctx.rotate(Math.atan2(fy, fx));
      const crawl = Math.sin(phase) * move * 5;
      shadow(ctx, 24, 8);
      limb(ctx, -8, -4, -22, -8 + crawl * 0.3, 6, look.pants, look.wound);
      limb(ctx, -8, 4, -20, 9 - crawl * 0.3, 6, look.pants, look.wound);
      ctx.fillStyle = "#253027";
      rounded(ctx, -11, -9, 25, 18, 7);
      ctx.fill();
      ctx.fillStyle = look.shirt;
      rounded(ctx, -9, -7, 22, 14, 6);
      ctx.fill();
      ctx.fillStyle = look.wound;
      ctx.beginPath();
      ctx.ellipse(-8, 4, 6, 3, -0.2, 0, Math.PI * 2);
      ctx.fill();
      limb(ctx, 5, -6, 24 + crawl, -13, 5, look.dark, look.skin2);
      limb(ctx, 6, 6, 26 - crawl, 12, 5, look.dark, look.skin2);
      face(ctx, 16, 0, 1, look, 1, 5);
      ctx.restore();
      typeTag(ctx, zombie, -31);
    }
    function install(game) {
      if (!game || game.__zombieTypesAddonInstalled) return;
      game.__zombieTypesAddonInstalled = true;
      const originalMakeZombie = game.makeZombie.bind(game);
      game.makeZombie = function patchedMakeZombie(spawn) {
        return upgradeZombie(originalMakeZombie(spawn));
      };
      const upgradeAll = () => {
        for (const zombie of game.zombies || []) upgradeZombie(zombie);
      };
      upgradeAll();
      game.drawZombies = function drawNewZombieModels(ctx, shakeX = 0, shakeY = 0) {
        upgradeAll();
        for (const zombie of this.zombies || []) {
          if (typeof this.isHiddenInside === "function" && this.isHiddenInside(zombie)) continue;
          const p = this.worldToScreen(zombie.x, zombie.y, shakeX, shakeY);
          if (p.x < -90 || p.y < -90 || p.x > this.viewWidth + 90 || p.y > this.viewHeight + 90) continue;
          const look = LOOKS[Math.floor(hash(`${zombie.id}:look`) * LOOKS.length) % LOOKS.length];
          const phase = zombie.animTime || performance.now() / 350;
          const move = Math.max(0, Math.min(1, zombie.moveBlend ?? 0.6));
          const fx = Math.cos(zombie.angle || 0);
          const fy = Math.sin(zombie.angle || 0);
          const hurt = zombie.hitFlash > 0;
          ctx.save();
          ctx.translate(p.x, p.y);
          if (zombie.dead) {
            ctx.rotate((zombie.deathSide || 1) * 1.2);
            ctx.translate(4, 5);
            ctx.globalAlpha = 0.62;
          } else if (hurt) {
            ctx.translate((Math.random() - 0.5) * 4, (Math.random() - 0.5) * 3);
          }
          if (hurt) ctx.filter = "brightness(1.8) saturate(.4)";
          if (zombie.zombieType === "brute") drawBrute(ctx, zombie, look, phase, move, fx, fy);
          else if (zombie.zombieType === "sploder") drawSploder(ctx, zombie, look, phase, move, fx, fy);
          else if (zombie.zombieType === "crawler") drawCrawler(ctx, zombie, look, phase, move, fx, fy);
          else drawNormal(ctx, zombie, look, phase, move, fx, fy, zombie.zombieType);
          ctx.filter = "none";
          ctx.restore();
        }
      };
      const originalDamageZombie = game.damageZombie.bind(game);
      game.damageZombie = function patchedDamageZombie(zombie, amount, knockX = 0, knockY = 0, ...rest) {
        const wasAlive = !zombie.dead;
        const result = originalDamageZombie(zombie, amount, knockX, knockY, ...rest);
        if (wasAlive && zombie.dead && zombie.zombieType === "sploder" && typeof this.explodeBloater !== "function") {
          const blastRadius = 125;
          if (typeof this.emitNoise === "function") this.emitNoise(zombie.x, zombie.y, 720, "sploder explosion");
          if (typeof this.addBlood === "function") this.addBlood(zombie.x, zombie.y, 18);
          if (this.player && Math.hypot(this.player.x - zombie.x, this.player.y - zombie.y) < blastRadius) {
            this.player.health = Math.max(0, this.player.health - 22);
            this.player.infection = Math.min(100, (this.player.infection || 0) + 8);
            if (typeof this.toast === "function") this.toast("The Sploder burst beside you!", "danger");
          }
          if (this.camera) this.camera.shake = Math.max(this.camera.shake || 0, 13);
        }
        return result;
      };
      const originalStartNew = game.startNew?.bind(game);
      if (originalStartNew) {
        game.startNew = function patchedStartNew(...args) {
          const result = originalStartNew(...args);
          upgradeAll();
          if (typeof this.toast === "function") this.toast("Zombie variants active: Runner, Crawler, Sploder, and Brute.", "danger");
          return result;
        };
      }
      const originalLoadSaved = game.loadSaved?.bind(game);
      if (originalLoadSaved) {
        game.loadSaved = function patchedLoadSaved(...args) {
          const result = originalLoadSaved(...args);
          upgradeAll();
          return result;
        };
      }
    }
    if (window.__walkers) install(window.__walkers);
    else window.addEventListener("load", () => install(window.__walkers), { once: true });
  })();

  // Walkers-NPC-Player-Upgrade-Addon.js
  (() => {
    "use strict";
    const ATTITUDE = Object.freeze({
      passive: { label: "PASSIVE", color: "#8dc9ba", speed: 91 },
      neutral: { label: "NEUTRAL", color: "#d5bd72", speed: 96 },
      aggressive: { label: "HOSTILE", color: "#e35f59", speed: 108 }
    });
    const WEAPONS = Object.freeze({
      fists: { name: "fists", mode: "melee", damage: 7, range: 40, cooldown: 0.48, noise: 24 },
      knife: { name: "knife", mode: "melee", damage: 14, range: 46, cooldown: 0.4, noise: 22 },
      hammer: { name: "hammer", mode: "melee", damage: 20, range: 51, cooldown: 0.5, noise: 39 },
      bat: { name: "bat", mode: "melee", damage: 22, range: 58, cooldown: 0.62, noise: 42 },
      axe: { name: "axe", mode: "melee", damage: 36, range: 62, cooldown: 0.82, noise: 48 },
      machete: { name: "machete", mode: "melee", damage: 28, range: 66, cooldown: 0.56, noise: 34 },
      katana: { name: "katana", mode: "melee", damage: 38, range: 74, cooldown: 0.7, noise: 31 },
      crowbar: { name: "crowbar", mode: "melee", damage: 24, range: 63, cooldown: 0.68, noise: 50 },
      spear: { name: "spear", mode: "melee", damage: 30, range: 88, cooldown: 0.74, noise: 34 },
      sledgehammer: { name: "sledgehammer", mode: "melee", damage: 44, range: 68, cooldown: 1.05, noise: 62 },
      pistol: { name: "9 mm pistol", mode: "ranged", damage: 42, range: 560, cooldown: 0.32, noise: 520 },
      revolver: { name: ".357 revolver", mode: "ranged", damage: 58, range: 650, cooldown: 0.48, noise: 650 },
      machine_pistol: { name: "machine pistol", mode: "ranged", damage: 18, range: 430, cooldown: 0.1, noise: 545 },
      smg: { name: "SMG", mode: "ranged", damage: 21, range: 460, cooldown: 0.12, noise: 520 },
      shotgun: { name: "shotgun", mode: "ranged", damage: 55, range: 390, cooldown: 0.95, noise: 760 },
      double_barrel: { name: "double barrel", mode: "ranged", damage: 68, range: 360, cooldown: 1.12, noise: 820 },
      rifle: { name: "hunting rifle", mode: "ranged", damage: 72, range: 830, cooldown: 0.82, noise: 860 },
      carbine: { name: "carbine", mode: "ranged", damage: 46, range: 690, cooldown: 0.24, noise: 720 },
      assault_rifle: { name: "assault rifle", mode: "ranged", damage: 35, range: 760, cooldown: 0.15, noise: 790 },
      lever_rifle: { name: "lever rifle", mode: "ranged", damage: 66, range: 810, cooldown: 0.68, noise: 835 }
    });
    const PALETTES = Object.freeze({
      player: {
        skin: "#bd8e6d",
        darkSkin: "#8c624d",
        uniform: "#343a3c",
        uniform2: "#22282a",
        vest: "#171c1e",
        armor: "#596064",
        pants: "#3c4244",
        boot: "#181b1b",
        accent: "#b5974a"
      },
      passive: {
        skin: "#c89b79",
        darkSkin: "#976e55",
        uniform: "#536a63",
        uniform2: "#354942",
        vest: "#394d47",
        armor: "#768780",
        pants: "#3d4744",
        boot: "#202625",
        accent: "#8dc9ba"
      },
      neutral: {
        skin: "#a9755b",
        darkSkin: "#754f3e",
        uniform: "#4c5050",
        uniform2: "#303536",
        vest: "#282e2f",
        armor: "#697072",
        pants: "#383e40",
        boot: "#1d2021",
        accent: "#d5bd72"
      },
      aggressive: {
        skin: "#b78263",
        darkSkin: "#815943",
        uniform: "#292b2c",
        uniform2: "#17191a",
        vest: "#151718",
        armor: "#4e5152",
        pants: "#303234",
        boot: "#151616",
        accent: "#b4423f"
      }
    });
    const RANGED = /* @__PURE__ */ new Set(["pistol", "revolver", "machine_pistol", "smg", "shotgun", "double_barrel", "rifle", "carbine", "assault_rifle", "lever_rifle"]);
    const THRUST = /* @__PURE__ */ new Set(["knife", "spear"]);
    const TWO_HAND = /* @__PURE__ */ new Set(["bat", "axe", "machete", "katana", "crowbar", "spear", "sledgehammer"]);
    const clamp2 = (value, min, max) => Math.max(min, Math.min(max, value));
    const distance2 = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
    const ease = (value) => 1 - (1 - clamp2(value, 0, 1)) ** 3;
    function hash(value) {
      const text = String(value ?? "survivor");
      let result = 2166136261;
      for (let i = 0; i < text.length; i += 1) {
        result ^= text.charCodeAt(i);
        result = Math.imul(result, 16777619);
      }
      return (result >>> 0) / 4294967295;
    }
    function weaponFor(id) {
      return WEAPONS[id] || WEAPONS.knife;
    }
    function chooseAttitude(survivor) {
      if (ATTITUDE[survivor.attitude]) return survivor.attitude;
      const roll = hash(`${survivor.id}:${Math.floor(survivor.x || 0)}:${Math.floor(survivor.y || 0)}:attitude`);
      if (roll < 0.43) return "passive";
      if (roll < 0.8) return "neutral";
      return "aggressive";
    }
    function upgradeSurvivor(survivor) {
      survivor.attitude = chooseAttitude(survivor);
      survivor.radius = survivor.radius || 11;
      survivor.moveBlend = survivor.moveBlend || 0;
      survivor.animTime = survivor.animTime || hash(`${survivor.id}:phase`) * Math.PI * 2;
      survivor.__vx = Number.isFinite(survivor.__vx) ? survivor.__vx : 0;
      survivor.__vy = Number.isFinite(survivor.__vy) ? survivor.__vy : 0;
      survivor.__stuck = survivor.__stuck || 0;
      survivor.__decision = survivor.__decision || hash(`${survivor.id}:think`) * 0.28;
      survivor.__npcUpgrade = true;
      if (survivor.attitude === "aggressive") {
        survivor.name = "Negan";
        survivor.role = "raider";
        survivor.courage = Math.max(0.92, survivor.courage || 0);
        survivor.hostile = true;
        if (!survivor.__neganLoadout) {
          const gunNegan = hash(`${survivor.id}:negan-weapon`) > 0.52;
          survivor.weapon = gunNegan ? "revolver" : "bat";
          survivor.ammo = Math.max(survivor.ammo || 0, gunNegan ? 30 : 0);
          survivor.__neganLoadout = true;
        }
      } else if (survivor.attitude === "passive") {
        survivor.role = survivor.role === "medic" ? "medic" : "civilian";
        survivor.courage = Math.min(0.44, survivor.courage || 0.38);
        survivor.hostile = false;
      } else {
        survivor.hostile = Boolean(survivor.provoked);
      }
      return survivor;
    }
    function makeGrid(entities, cellSize, accept = () => true) {
      const grid = /* @__PURE__ */ new Map();
      for (const entity of entities || []) {
        if (!accept(entity)) continue;
        const key2 = `${Math.floor(entity.x / cellSize)},${Math.floor(entity.y / cellSize)}`;
        if (!grid.has(key2)) grid.set(key2, []);
        grid.get(key2).push(entity);
      }
      return { cells: grid, size: cellSize };
    }
    function nearby(grid, x, y, radius) {
      const results = [];
      const minX = Math.floor((x - radius) / grid.size);
      const maxX = Math.floor((x + radius) / grid.size);
      const minY = Math.floor((y - radius) / grid.size);
      const maxY = Math.floor((y + radius) / grid.size);
      for (let cy = minY; cy <= maxY; cy += 1) {
        for (let cx = minX; cx <= maxX; cx += 1) {
          const cell = grid.cells.get(`${cx},${cy}`);
          if (cell) results.push(...cell);
        }
      }
      return results;
    }
    function nearestZombie(game, survivor, grid, radius) {
      let best = null;
      let bestDistance = radius;
      for (const zombie of nearby(grid, survivor.x, survivor.y, radius)) {
        const d = distance2(survivor, zombie);
        if (d < bestDistance) {
          best = zombie;
          bestDistance = d;
        }
      }
      return { entity: best, distance: bestDistance };
    }
    function setSpeech(survivor, text) {
      if ((survivor.speechTimer || 0) > 0) return;
      survivor.speech = text;
      survivor.speechTimer = 5.5;
    }
    function attackPlayer(game, survivor, weapon) {
      const player = game.player;
      const dx = player.x - survivor.x;
      const dy = player.y - survivor.y;
      const length = Math.hypot(dx, dy) || 1;
      survivor.angle = Math.atan2(dy, dx);
      survivor.attackCooldown = weapon.cooldown * (0.88 + Math.random() * 0.24);
      survivor.attackAnim = weapon.mode === "ranged" ? 0.24 : 0.38;
      if (weapon.mode === "ranged") {
        if ((survivor.ammo || 0) <= 0) {
          survivor.weapon = "bat";
          survivor.attackCooldown = 0.24;
          return;
        }
        survivor.ammo -= 1;
        const accuracy = clamp2(0.57 + (survivor.courage || 0.8) * 0.25 - Math.max(0, length - 220) / 1500, 0.35, 0.85);
        const hit = Math.random() < accuracy;
        const endX = hit ? player.x : player.x + (Math.random() - 0.5) * 110;
        const endY = hit ? player.y : player.y + (Math.random() - 0.5) * 110;
        game.effects?.push({ type: "tracer", x: survivor.x, y: survivor.y, x2: endX, y2: endY, life: 0.08, maxLife: 0.08 });
        game.effects?.push({ type: "muzzle", x: survivor.x + dx / length * 20, y: survivor.y + dy / length * 20, life: 0.09, maxLife: 0.09 });
        game.emitNoise?.(survivor.x, survivor.y, weapon.noise, `${survivor.name}'s ${weapon.name}`);
        if (hit && player.hurtCooldown <= 0) {
          const damage = weapon.damage * (0.2 + Math.random() * 0.12);
          player.health = Math.max(0, player.health - damage);
          player.hurtCooldown = 0.48;
          player.hurtAnim = 0.3;
          game.camera.shake = Math.max(game.camera.shake || 0, 6);
          game.addBlood?.(player.x, player.y, 4);
          game.toast?.(`Negan shot you: -${Math.round(damage)} health`, "danger");
        }
      } else if (length <= weapon.range + (player.radius || 11) + 8 && player.hurtCooldown <= 0) {
        const damage = weapon.damage * (0.36 + Math.random() * 0.16);
        player.health = Math.max(0, player.health - damage);
        player.hurtCooldown = 0.48;
        player.hurtAnim = 0.3;
        game.camera.shake = Math.max(game.camera.shake || 0, 7);
        game.addBlood?.(player.x, player.y, 3);
        game.emitNoise?.(survivor.x, survivor.y, weapon.noise, "hostile melee");
        game.toast?.(`Negan hit you: -${Math.round(damage)} health`, "danger");
      }
    }
    function pixelBar(ctx, x1, y1, x2, y2, width, color, outline = "#121516") {
      const dx = x2 - x1;
      const dy = y2 - y1;
      const length = Math.hypot(dx, dy) || 1;
      ctx.save();
      ctx.translate(Math.round(x1), Math.round(y1));
      ctx.rotate(Math.atan2(dy, dx));
      ctx.fillStyle = outline;
      ctx.fillRect(-1, -Math.ceil(width / 2) - 1, Math.ceil(length) + 2, Math.ceil(width) + 2);
      ctx.fillStyle = color;
      ctx.fillRect(0, -Math.ceil(width / 2), Math.ceil(length), Math.ceil(width));
      ctx.restore();
    }
    function pixelGun(ctx, id, x, y, dx, dy, firing) {
      const angle = Math.atan2(dy, dx);
      const longGun = ["smg", "shotgun", "double_barrel", "rifle", "carbine", "assault_rifle", "lever_rifle"].includes(id);
      const length = longGun ? id === "rifle" || id === "lever_rifle" ? 29 : 25 : 15;
      ctx.save();
      ctx.translate(Math.round(x), Math.round(y));
      ctx.rotate(angle);
      ctx.fillStyle = "#111516";
      ctx.fillRect(-5, -4, length + 9, 8);
      ctx.fillStyle = id === "lever_rifle" || id === "shotgun" || id === "double_barrel" ? "#70482d" : "#343a3c";
      ctx.fillRect(-4, -3, longGun ? 13 : 10, 6);
      ctx.fillStyle = "#171b1c";
      ctx.fillRect(7, -2, length - 5, 4);
      ctx.fillStyle = "#60676a";
      ctx.fillRect(9, -1, length - 7, 1);
      ctx.fillStyle = "#1a1d1e";
      ctx.fillRect(longGun ? 5 : 2, 3, 5, 6);
      if (longGun) {
        ctx.fillStyle = "#24292a";
        ctx.fillRect(-10, -3, 7, 6);
      }
      if (firing) {
        ctx.fillStyle = "rgba(255,213,120,.92)";
        ctx.beginPath();
        ctx.moveTo(length + 4, 0);
        ctx.lineTo(length + 12, -5);
        ctx.lineTo(length + 9, 0);
        ctx.lineTo(length + 12, 5);
        ctx.closePath();
        ctx.fill();
      }
      ctx.restore();
    }
    function pixelMelee(ctx, id, x, y, dx, dy) {
      const angle = Math.atan2(dy, dx);
      ctx.save();
      ctx.translate(Math.round(x), Math.round(y));
      ctx.rotate(angle);
      const long = id === "spear" ? 36 : id === "katana" ? 30 : id === "machete" ? 24 : 22;
      ctx.fillStyle = "#171412";
      ctx.fillRect(-7, -3, long + 8, 6);
      ctx.fillStyle = id === "bat" ? "#765136" : "#65452e";
      ctx.fillRect(-5, -2, id === "bat" ? long : 13, 4);
      if (id === "axe" || id === "sledgehammer" || id === "hammer") {
        ctx.fillStyle = "#858c8e";
        ctx.fillRect(long - 6, -7, 8, 14);
        ctx.fillStyle = "#c4cbca";
        ctx.fillRect(long - 5, -6, 2, 12);
      } else if (id === "crowbar") {
        ctx.fillStyle = "#8d3f37";
        ctx.fillRect(4, -2, long - 3, 4);
        ctx.fillRect(long - 1, -6, 3, 7);
      } else if (id !== "bat") {
        ctx.fillStyle = "#aeb7b7";
        if (id === "spear") {
          ctx.beginPath();
          ctx.moveTo(long + 5, 0);
          ctx.lineTo(long - 1, -5);
          ctx.lineTo(long - 1, 5);
          ctx.closePath();
          ctx.fill();
        } else {
          ctx.fillRect(10, -2, long - 8, 4);
          ctx.fillStyle = "#d2d7d4";
          ctx.fillRect(12, -2, long - 10, 1);
        }
      }
      ctx.restore();
    }
    function drawAttackTrail(ctx, x, y, angle, progress, range) {
      if (progress < 0.24 || progress > 0.74) return;
      const alpha = Math.sin((progress - 0.24) / 0.5 * Math.PI) * 0.32;
      ctx.strokeStyle = `rgba(225,230,218,${alpha})`;
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.arc(x, y, range, angle - 0.58, angle + 0.18);
      ctx.stroke();
      ctx.strokeStyle = `rgba(255,255,239,${alpha * 0.75})`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(x, y, range + 2, angle - 0.45, angle + 0.14);
      ctx.stroke();
    }
    function drawTacticalHuman(ctx, entity, screen, options = {}) {
      const palette = options.palette;
      const fx = options.fx;
      const fy = options.fy;
      const side = fx >= 0 ? 1 : -1;
      const phase = entity.animTime || 0;
      const move = clamp2(entity.moveBlend || 0, 0, 1);
      const crouching = Boolean(options.crouching);
      const sprinting = Boolean(options.sprinting);
      const dead = Boolean(entity.dead);
      const hurt = clamp2((entity.hurtAnim || 0) / 0.3, 0, 1);
      const flash = hurt > 0 && Math.floor(hurt * 22) % 2 === 0;
      const weaponId = options.weaponId || "knife";
      const weapon = weaponFor(weaponId);
      const duration = options.attackDuration || (weapon.mode === "ranged" ? 0.24 : 0.36);
      const remaining = clamp2((entity.attackAnim || 0) / duration, 0, 1);
      const progress = remaining > 0 ? 1 - remaining : 0;
      const recoil = remaining > 0 ? Math.sin(progress * Math.PI) : 0;
      const compress = crouching ? 5 : 0;
      const stride = Math.sin(phase) * move * (sprinting ? 6.4 : crouching ? 2.8 : 4.6);
      const bob = Math.abs(Math.cos(phase)) * move * (sprinting ? 2 : 1.2);
      ctx.save();
      const previousSmoothing = ctx.imageSmoothingEnabled;
      ctx.imageSmoothingEnabled = false;
      ctx.translate(Math.round(screen.x + Math.sin(hurt * Math.PI) * -side * 4), Math.round(screen.y + hurt * 2));
      if (dead) {
        ctx.rotate(side * 1.28);
        ctx.translate(4, 7);
        ctx.globalAlpha = 0.7;
      }
      ctx.fillStyle = "rgba(2,5,3,.44)";
      ctx.beginPath();
      ctx.ellipse(2, 2, sprinting ? 17 : 14, crouching ? 6 : 5, 0, 0, Math.PI * 2);
      ctx.fill();
      const hipY = -11 + compress;
      const leftFoot = { x: -5 + fx * stride, y: -1 + fy * stride * 0.4 };
      const rightFoot = { x: 5 - fx * stride, y: -1 - fy * stride * 0.4 };
      const pants = flash ? "#e8e4dc" : palette.pants;
      pixelBar(ctx, -5, hipY, leftFoot.x, leftFoot.y, 6, pants);
      pixelBar(ctx, 5, hipY, rightFoot.x, rightFoot.y, 6, pants);
      ctx.fillStyle = flash ? "#f2eee7" : palette.armor;
      ctx.fillRect(Math.round((-5 + leftFoot.x) / 2) - 3, -7 + compress, 6, 5);
      ctx.fillRect(Math.round((5 + rightFoot.x) / 2) - 3, -7 + compress, 6, 5);
      ctx.fillStyle = palette.boot;
      ctx.fillRect(Math.round(leftFoot.x - 5 + side), Math.round(leftFoot.y - 2), 9, 5);
      ctx.fillRect(Math.round(rightFoot.x - 5 + side), Math.round(rightFoot.y - 2), 9, 5);
      const bodyX = sprinting ? fx * 3 : 0;
      const bodyY = -22 + compress + bob;
      const shoulderY = bodyY - 1;
      let weaponDX = fx;
      let weaponDY = fy * 0.78;
      let leftHand = { x: bodyX - 10 - fx * Math.cos(phase) * move * 2, y: bodyY + 8 };
      let rightHand = { x: bodyX + 10 + fx * Math.cos(phase) * move * 2, y: bodyY + 8 };
      if (weapon.mode === "ranged") {
        const reach = 13 - recoil * (weaponId === "shotgun" || weaponId === "rifle" ? 5 : 3);
        leftHand = { x: bodyX - 2 + fx * reach, y: bodyY + fy * reach * 0.58 };
        rightHand = { x: bodyX + 2 + fx * (reach + 2), y: bodyY + 2 + fy * (reach + 2) * 0.58 };
      } else if (remaining > 0) {
        const base = Math.atan2(fy, fx);
        if (THRUST.has(weaponId) || weaponId === "fists") {
          const thrust = Math.sin(progress * Math.PI);
          rightHand = { x: bodyX + fx * (11 + thrust * 12), y: bodyY + fy * (8 + thrust * 9) };
          weaponDX = fx;
          weaponDY = fy;
          if (weaponId === "spear") leftHand = { x: bodyX + fx * (6 + thrust * 5) - side * 2, y: bodyY + fy * (5 + thrust * 4) };
        } else {
          const overhead = ["axe", "hammer", "sledgehammer"].includes(weaponId);
          const start = overhead ? -2.05 : -1.55;
          const end = overhead ? 0.45 : 1.15;
          const swing = base + start + (end - start) * ease(progress);
          weaponDX = Math.cos(swing);
          weaponDY = Math.sin(swing);
          rightHand = { x: bodyX + weaponDX * 15, y: bodyY + weaponDY * 12 };
          if (TWO_HAND.has(weaponId)) leftHand = { x: bodyX + weaponDX * 8 - side * 2, y: bodyY + weaponDY * 6 + 1 };
          drawAttackTrail(ctx, bodyX, bodyY + 2, swing, progress, weaponId === "katana" ? 31 : 27);
        }
      } else if (weaponId !== "fists") {
        rightHand = { x: bodyX + side * 8 + fx * 6, y: bodyY + 5 + fy * 5 };
      }
      const sleeve = flash ? "#eeeae2" : palette.uniform2;
      pixelBar(ctx, bodyX - 8, shoulderY, leftHand.x, leftHand.y, 6, sleeve);
      ctx.fillStyle = "#111516";
      ctx.fillRect(Math.round(bodyX - 11), Math.round(bodyY - 10), 22, 22);
      ctx.fillStyle = flash ? "#eeeae2" : palette.uniform;
      ctx.fillRect(Math.round(bodyX - 9), Math.round(bodyY - 8), 18, 18);
      ctx.fillStyle = flash ? "#dedad4" : palette.vest;
      ctx.fillRect(Math.round(bodyX - 8), Math.round(bodyY - 6), 16, 16);
      ctx.fillStyle = flash ? "#f6f1e9" : palette.armor;
      ctx.fillRect(Math.round(bodyX - 6), Math.round(bodyY - 5), 12, 5);
      ctx.fillStyle = palette.uniform2;
      ctx.fillRect(Math.round(bodyX - 1), Math.round(bodyY - 5), 2, 15);
      ctx.fillStyle = palette.accent;
      ctx.fillRect(Math.round(bodyX - 6), Math.round(bodyY + 4), 5, 5);
      ctx.fillRect(Math.round(bodyX + 2), Math.round(bodyY + 4), 5, 5);
      ctx.fillRect(Math.round(bodyX + 5), Math.round(bodyY - 3), 2, 2);
      pixelBar(ctx, bodyX + 8, shoulderY, rightHand.x, rightHand.y, 6, sleeve);
      ctx.fillStyle = flash ? "#fff4e8" : palette.skin;
      ctx.fillRect(Math.round(leftHand.x - 3), Math.round(leftHand.y - 3), 6, 6);
      ctx.fillRect(Math.round(rightHand.x - 3), Math.round(rightHand.y - 3), 6, 6);
      if (!dead) {
        if (weapon.mode === "ranged") {
          const startX = (leftHand.x + rightHand.x) / 2;
          const startY = (leftHand.y + rightHand.y) / 2;
          pixelGun(ctx, weaponId, startX, startY, fx, fy * 0.78, remaining > 0.42);
        } else if (weaponId !== "fists") {
          pixelMelee(ctx, weaponId, rightHand.x, rightHand.y, weaponDX, weaponDY);
        }
      }
      const headX = bodyX + fx * 2;
      const headY = bodyY - 15 + fy;
      const skin = flash ? "#fff4e8" : palette.skin;
      ctx.fillStyle = "#15191a";
      ctx.fillRect(Math.round(headX - 8), Math.round(headY - 8), 16, 15);
      ctx.fillStyle = skin;
      ctx.fillRect(Math.round(headX - 6), Math.round(headY - 5), 12, 11);
      ctx.fillStyle = palette.darkSkin;
      ctx.fillRect(Math.round(headX - (side > 0 ? 6 : -3)), Math.round(headY + 1), 3, 5);
      ctx.fillStyle = "#111516";
      ctx.fillRect(Math.round(headX - 9), Math.round(headY - 10), 18, 8);
      ctx.fillStyle = palette.uniform2;
      ctx.fillRect(Math.round(headX - 7), Math.round(headY - 10), 14, 6);
      ctx.fillStyle = palette.armor;
      ctx.fillRect(Math.round(headX - 4), Math.round(headY - 9), 7, 2);
      ctx.fillStyle = "#101314";
      ctx.fillRect(Math.round(headX - 9 + side * 2), Math.round(headY - 4), 18, 3);
      ctx.fillStyle = "#737a7c";
      ctx.fillRect(Math.round(headX + side * 4 - 2), Math.round(headY - 7), 3, 2);
      ctx.fillStyle = "#24201c";
      ctx.fillRect(Math.round(headX + side * 2 - 1), Math.round(headY - 1), 2, 2);
      if (options.attitude === "aggressive") {
        ctx.fillStyle = "#a73835";
        ctx.fillRect(Math.round(headX - 6), Math.round(headY + 4), 12, 3);
      } else {
        ctx.fillStyle = "#7f4f3d";
        ctx.fillRect(Math.round(headX - 1 + side), Math.round(headY + 4), 4, 1);
      }
      ctx.imageSmoothingEnabled = previousSmoothing;
      ctx.restore();
    }
    function install(game) {
      if (!game || game.__npcCharacterUpgradeInstalled) return;
      game.__npcCharacterUpgradeInstalled = true;
      const originalMakeSurvivor = typeof game.makeSurvivor === "function" ? game.makeSurvivor.bind(game) : null;
      if (originalMakeSurvivor) {
        game.makeSurvivor = function patchedMakeSurvivor(spawn) {
          return upgradeSurvivor(originalMakeSurvivor(spawn));
        };
      }
      const upgradeAll = () => {
        for (const survivor of game.survivors || []) upgradeSurvivor(survivor);
      };
      upgradeAll();
      const originalSurvivorAttack = typeof game.survivorAttack === "function" ? game.survivorAttack.bind(game) : null;
      const originalDamageSurvivor = typeof game.damageSurvivor === "function" ? game.damageSurvivor.bind(game) : null;
      game.updateSurvivors = function smootherSurvivorUpdate(frameDt) {
        const dt = clamp2(frameDt, 0, 0.05);
        if (!this.player || !this.survivors) return;
        upgradeAll();
        const zombieGrid = makeGrid(this.zombies || [], 220, (zombie) => !zombie.dead);
        const survivorGrid = makeGrid(this.survivors, 90, (survivor) => !survivor.dead);
        for (const survivor of this.survivors) {
          if (survivor.dead) continue;
          survivor.attackCooldown = Math.max(0, (survivor.attackCooldown || 0) - dt);
          survivor.hurtCooldown = Math.max(0, (survivor.hurtCooldown || 0) - dt);
          survivor.attackAnim = Math.max(0, (survivor.attackAnim || 0) - dt);
          survivor.hurtAnim = Math.max(0, (survivor.hurtAnim || 0) - dt);
          survivor.speechTimer = Math.max(0, (survivor.speechTimer || 0) - dt);
          survivor.wanderTimer = Math.max(0, (survivor.wanderTimer || 0) - dt);
          survivor.__decision -= dt;
          const playerDistance = distance2(survivor, this.player);
          if (playerDistance > 1450) {
            survivor.__vx *= Math.max(0, 1 - dt * 4);
            survivor.__vy *= Math.max(0, 1 - dt * 4);
            survivor.moveBlend += (0 - survivor.moveBlend) * Math.min(1, dt * 6);
            continue;
          }
          let threat = survivor.__threat && !survivor.__threat.dead ? survivor.__threat : null;
          let threatDistance = threat ? distance2(survivor, threat) : Infinity;
          const canSeePlayer = playerDistance < 650 && (typeof this.hasVision !== "function" || this.hasVision(survivor, this.player));
          if (survivor.__decision <= 0) {
            survivor.__decision = 0.24 + hash(`${survivor.id}:${Math.floor((survivor.animTime || 0) * 2)}`) * 0.18;
            const found = nearestZombie(this, survivor, zombieGrid, survivor.attitude === "passive" ? 460 : 540);
            threat = found.entity;
            threatDistance = found.distance;
            survivor.__threat = threat;
            if (survivor.attitude === "aggressive" && canSeePlayer && playerDistance < 610 && (!threat || threatDistance > 135)) {
              survivor.__targetKind = "player";
              survivor.state = "hostile";
              setSpeech(survivor, playerDistance < 260 ? "You picked the wrong road." : "I see you.");
            } else if (threat) {
              survivor.__targetKind = "zombie";
              const weapon2 = weaponFor(survivor.weapon);
              if (survivor.attitude === "passive") survivor.state = "flee";
              else {
                const closeCount = nearby(zombieGrid, survivor.x, survivor.y, 190).filter((zombie) => distance2(zombie, survivor) < 190).length;
                const outmatched = closeCount >= (survivor.attitude === "aggressive" ? 4 : 2);
                const emptyGun = weapon2.mode === "ranged" && (survivor.ammo || 0) <= 0;
                survivor.state = emptyGun || outmatched && (survivor.courage || 0.5) < 0.76 ? "flee" : "fight";
              }
            } else if (survivor.wanderTimer <= 0) {
              survivor.__targetKind = null;
              survivor.state = playerDistance < 230 && survivor.attitude === "neutral" ? "observe" : "scavenge";
              survivor.wanderTimer = 3.5 + hash(`${survivor.id}:${Math.floor(survivor.animTime || 0)}:wander`) * 5;
              const angle = hash(`${survivor.id}:${survivor.wanderTimer}`) * Math.PI * 2;
              const range = 90 + hash(`${survivor.id}:range:${survivor.wanderTimer}`) * 190;
              survivor.targetX = survivor.x + Math.cos(angle) * range;
              survivor.targetY = survivor.y + Math.sin(angle) * range;
              if (survivor.attitude === "passive" && playerDistance < 165) setSpeech(survivor, "Easy\u2014I don't want trouble.");
              if (survivor.attitude === "neutral" && playerDistance < 190) setSpeech(survivor, "Keep it peaceful and we're fine.");
            }
          }
          let target = null;
          if (survivor.__targetKind === "player") target = this.player;
          else if (survivor.__targetKind === "zombie") target = threat;
          if (target?.dead) target = null;
          const weapon = weaponFor(survivor.weapon);
          let desiredX = 0;
          let desiredY = 0;
          let shouldMove = false;
          if (target) {
            const dx = target.x - survivor.x;
            const dy = target.y - survivor.y;
            const length = Math.hypot(dx, dy) || 1;
            const targetDistance = length;
            survivor.angle = Math.atan2(dy, dx);
            if (survivor.state === "flee") {
              desiredX = -dx / length;
              desiredY = -dy / length;
              shouldMove = true;
            } else {
              const preferred = weapon.mode === "ranged" ? Math.min(310, weapon.range * 0.55) : weapon.range * 0.68;
              if (targetDistance > preferred + 36) {
                desiredX = dx / length;
                desiredY = dy / length;
                shouldMove = true;
              } else if (weapon.mode === "ranged" && targetDistance < Math.max(105, preferred - 90)) {
                desiredX = -dx / length;
                desiredY = -dy / length;
                shouldMove = true;
              }
              const canSee = typeof this.hasVision !== "function" || this.hasVision(survivor, target);
              if (survivor.attackCooldown <= 0 && targetDistance <= weapon.range + (target.radius || 11) && canSee) {
                if (target === this.player) attackPlayer(this, survivor, weapon);
                else if (originalSurvivorAttack) originalSurvivorAttack(survivor, target, weapon);
              }
            }
          } else if (survivor.state === "scavenge") {
            const dx = (survivor.targetX || survivor.x) - survivor.x;
            const dy = (survivor.targetY || survivor.y) - survivor.y;
            const length = Math.hypot(dx, dy);
            if (length > 18) {
              desiredX = dx / length;
              desiredY = dy / length;
              shouldMove = true;
              survivor.angle = Math.atan2(dy, dx);
            }
          } else if (survivor.state === "observe" && playerDistance < 300) {
            survivor.angle = Math.atan2(this.player.y - survivor.y, this.player.x - survivor.x);
          }
          if (shouldMove) {
            let separateX = 0;
            let separateY = 0;
            for (const other of nearby(survivorGrid, survivor.x, survivor.y, 34)) {
              if (other === survivor || other.dead) continue;
              const dx = survivor.x - other.x;
              const dy = survivor.y - other.y;
              const d = Math.hypot(dx, dy) || 1;
              if (d < 29) {
                const force = (29 - d) / 29;
                separateX += dx / d * force;
                separateY += dy / d * force;
              }
            }
            desiredX += separateX * 0.75;
            desiredY += separateY * 0.75;
            const desiredLength = Math.hypot(desiredX, desiredY) || 1;
            desiredX /= desiredLength;
            desiredY /= desiredLength;
          }
          const baseSpeed = survivor.state === "flee" ? 142 : ATTITUDE[survivor.attitude].speed;
          const targetVX = shouldMove ? desiredX * baseSpeed : 0;
          const targetVY = shouldMove ? desiredY * baseSpeed : 0;
          const smoothing = 1 - Math.exp(-dt * (shouldMove ? 8 : 11));
          survivor.__vx += (targetVX - survivor.__vx) * smoothing;
          survivor.__vy += (targetVY - survivor.__vy) * smoothing;
          const oldX = survivor.x;
          const oldY = survivor.y;
          this.moveCircle?.(survivor, survivor.__vx * dt, survivor.__vy * dt, true);
          const moved = Math.hypot(survivor.x - oldX, survivor.y - oldY);
          const expected = Math.hypot(survivor.__vx, survivor.__vy) * dt;
          if (shouldMove && expected > 0.3 && moved < expected * 0.18) survivor.__stuck += dt;
          else survivor.__stuck = Math.max(0, survivor.__stuck - dt * 2);
          if (survivor.__stuck > 0.34) {
            const nearDoor = this.nearestDoor?.(survivor, 44, true);
            if (nearDoor) {
              nearDoor.door.open = true;
              this.emitNoise?.(nearDoor.x, nearDoor.y, nearDoor.door.style === "steel" ? 105 : 52, "door");
            } else {
              const turn = hash(`${survivor.id}:${Math.floor(survivor.animTime || 0)}:unstick`) > 0.5 ? 1 : -1;
              const oldVX = survivor.__vx;
              survivor.__vx = -survivor.__vy * turn;
              survivor.__vy = oldVX * turn;
              survivor.targetX = survivor.x + survivor.__vx * 1.4;
              survivor.targetY = survivor.y + survivor.__vy * 1.4;
            }
            survivor.__stuck = 0;
          }
          const blendTarget = moved > 0.04 ? 1 : 0;
          survivor.moveBlend += (blendTarget - survivor.moveBlend) * Math.min(1, dt * 10);
          survivor.animTime += dt * (1.8 + survivor.moveBlend * (survivor.state === "flee" ? 8.2 : 6.2));
        }
      };
      const originalAimVector = typeof game.aimVector === "function" ? game.aimVector.bind(game) : null;
      if (originalAimVector) {
        game.aimVector = function upgradedAimVector() {
          const pointerFine = this.input?.pointer?.active && typeof matchMedia === "function" && !matchMedia("(pointer: coarse)").matches;
          if (pointerFine) return originalAimVector();
          let nearest = null;
          let best = 560;
          for (const zombie of this.zombies || []) {
            if (zombie.dead || this.isHiddenInside?.(zombie)) continue;
            const d = distance2(zombie, this.player);
            if (d < best) {
              best = d;
              nearest = zombie;
            }
          }
          for (const survivor of this.survivors || []) {
            if (survivor.dead || !(survivor.attitude === "aggressive" || survivor.provoked)) continue;
            const d = distance2(survivor, this.player);
            if (d < best && (!this.hasVision || this.hasVision(this.player, survivor))) {
              best = d;
              nearest = survivor;
            }
          }
          if (!nearest) return originalAimVector();
          const dx = nearest.x - this.player.x;
          const dy = nearest.y - this.player.y;
          const length = Math.hypot(dx, dy) || 1;
          return { x: dx / length, y: dy / length };
        };
      }
      const originalAttack = typeof game.attack === "function" ? game.attack.bind(game) : null;
      if (originalAttack && originalDamageSurvivor) {
        game.attack = function playerAttackWithHostiles(...args) {
          const player = this.player;
          const oldAnim = player.attackAnim || 0;
          const oldCooldown = player.attackCooldown || 0;
          originalAttack(...args);
          if (oldCooldown > 0 || (player.attackAnim || 0) <= oldAnim) return;
          const weapon = weaponFor(player.equipped || "fists");
          const aimX = player.facingX || 1;
          const aimY = player.facingY || 0;
          let target = null;
          let best = weapon.range + 20;
          for (const survivor of this.survivors || []) {
            if (survivor.dead || !(survivor.attitude === "aggressive" || survivor.provoked)) continue;
            const dx = survivor.x - player.x;
            const dy = survivor.y - player.y;
            const d = Math.hypot(dx, dy) || 1;
            if (d > best) continue;
            const dot = dx / d * aimX + dy / d * aimY;
            const threshold = weapon.mode === "ranged" ? 0.975 : 0.18;
            if (dot < threshold || this.hasVision && !this.hasVision(player, survivor)) continue;
            target = survivor;
            best = d;
          }
          if (!target) return;
          if (weapon.mode === "ranged") {
            for (const zombie of this.zombies || []) {
              if (zombie.dead) continue;
              const dx = zombie.x - player.x;
              const dy = zombie.y - player.y;
              const d = Math.hypot(dx, dy) || 1;
              const dot = dx / d * aimX + dy / d * aimY;
              if (dot > 0.975 && d < best) return;
            }
          }
          originalDamageSurvivor(target, weapon.damage * (weapon.mode === "ranged" ? 0.9 : 1), null);
          if (!target.dead) {
            target.provoked = true;
            target.hostile = true;
            target.state = "hostile";
            target.__targetKind = "player";
            target.__decision = 0;
          }
        };
      }
      game.drawPlayer = function upgradedPlayerModel(ctx, shakeX = 0, shakeY = 0) {
        if (!this.player) return;
        const screen = this.worldToScreen(this.player.x, this.player.y, shakeX, shakeY);
        drawTacticalHuman(ctx, this.player, screen, {
          palette: PALETTES.player,
          fx: this.player.facingX ?? 1,
          fy: this.player.facingY ?? 0,
          crouching: this.player.crouching,
          sprinting: this.player.sprintingNow,
          weaponId: this.player.equipped || "fists",
          attackDuration: this.player.attackDuration || 0.3,
          attitude: "player"
        });
      };
      game.drawSurvivors = function upgradedSurvivorModels(ctx, shakeX = 0, shakeY = 0) {
        upgradeAll();
        for (const survivor of this.survivors || []) {
          if (this.isHiddenInside?.(survivor)) continue;
          const screen = this.worldToScreen(survivor.x, survivor.y, shakeX, shakeY);
          if (screen.x < -90 || screen.y < -90 || screen.x > this.viewWidth + 90 || screen.y > this.viewHeight + 90) continue;
          const fx = Math.cos(survivor.angle || 0);
          const fy = Math.sin(survivor.angle || 0);
          drawTacticalHuman(ctx, survivor, screen, {
            palette: PALETTES[survivor.attitude] || PALETTES.neutral,
            fx,
            fy,
            crouching: false,
            sprinting: survivor.state === "flee",
            weaponId: survivor.weapon || "knife",
            attackDuration: weaponFor(survivor.weapon).mode === "ranged" ? 0.24 : 0.38,
            attitude: survivor.attitude
          });
          if (survivor.dead) continue;
          const playerDistance = distance2(survivor, this.player);
          if (playerDistance > (survivor.attitude === "aggressive" ? 620 : 285)) continue;
          const profile = ATTITUDE[survivor.attitude] || ATTITUDE.neutral;
          const title = `${survivor.name} \u2022 ${profile.label}`;
          ctx.save();
          ctx.font = "900 9px system-ui, sans-serif";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          const width = clamp2(ctx.measureText(title).width + 17, 68, 148);
          ctx.fillStyle = "rgba(7,10,9,.88)";
          ctx.fillRect(Math.round(screen.x - width / 2), Math.round(screen.y - 60), Math.round(width), 15);
          ctx.fillStyle = profile.color;
          ctx.fillRect(Math.round(screen.x - width / 2), Math.round(screen.y - 60), 3, 15);
          ctx.fillText(title, Math.round(screen.x), Math.round(screen.y - 52.5));
          if (survivor.speech && survivor.speechTimer > 2.4) {
            const speechWidth = clamp2(survivor.speech.length * 5.5 + 16, 74, 170);
            ctx.fillStyle = "rgba(229,226,210,.94)";
            ctx.fillRect(Math.round(screen.x - speechWidth / 2), Math.round(screen.y - 82), Math.round(speechWidth), 17);
            ctx.fillStyle = "#18201c";
            ctx.font = "800 9px system-ui, sans-serif";
            ctx.fillText(survivor.speech, Math.round(screen.x), Math.round(screen.y - 73.5));
          }
          ctx.restore();
        }
      };
      const originalStartNew = typeof game.startNew === "function" ? game.startNew.bind(game) : null;
      if (originalStartNew) {
        game.startNew = function patchedNpcStart(...args) {
          const result = originalStartNew(...args);
          upgradeAll();
          this.toast?.("Survivors now have Passive, Neutral, and Hostile attitudes.", "danger");
          return result;
        };
      }
      const originalLoadSaved = typeof game.loadSaved === "function" ? game.loadSaved.bind(game) : null;
      if (originalLoadSaved) {
        game.loadSaved = function patchedNpcLoad(...args) {
          const result = originalLoadSaved(...args);
          upgradeAll();
          return result;
        };
      }
      game.toast?.("NPC smoothing and tactical character upgrade installed.");
    }
    if (window.__walkers) install(window.__walkers);
    else window.addEventListener("load", () => install(window.__walkers), { once: true });
  })();

  // Walkers-Character-Creator-Inventory-Addon.js
  (() => {
    "use strict";
    const APPEARANCE_KEY = "walkers-player-appearance-v1";
    const DEFAULT_LOOK = Object.freeze({
      skin: "medium",
      hair: "short",
      hairColor: "dark",
      outfit: "tactical",
      headgear: "helmet",
      accent: "olive",
      build: "standard"
    });
    const OPTIONS = Object.freeze({
      skin: [
        ["Light", "light", "#edc3a0"],
        ["Warm", "warm", "#d9a078"],
        ["Medium", "medium", "#b98060"],
        ["Brown", "brown", "#916149"],
        ["Deep", "deep", "#704735"],
        ["Dark", "dark", "#4f3027"]
      ],
      hair: [["Buzz", "buzz"], ["Short", "short"], ["Curls", "curls"], ["Braids", "braids"], ["Bun", "bun"], ["Bald", "bald"]],
      hairColor: [["Black", "dark", "#171514"], ["Brown", "brown", "#4a3024"], ["Auburn", "auburn", "#713f2d"], ["Blond", "blond", "#b89858"], ["Gray", "gray", "#777b78"]],
      outfit: [["Tactical", "tactical"], ["Ranger", "ranger"], ["Sheriff", "sheriff"], ["Medic", "medic"], ["Scavenger", "scavenger"]],
      headgear: [["Helmet", "helmet"], ["Cap", "cap"], ["Beanie", "beanie"], ["None", "none"]],
      accent: [["Olive", "olive", "#9ba875"], ["Blue", "blue", "#6e9db4"], ["Red", "red", "#b64e49"], ["Tan", "tan", "#bd9d66"], ["Purple", "purple", "#8f78a5"]],
      build: [["Slim", "slim"], ["Standard", "standard"], ["Sturdy", "sturdy"]]
    });
    const SKINS = Object.freeze({
      light: ["#edc3a0", "#bd8c6e"],
      warm: ["#d9a078", "#a87355"],
      medium: ["#b98060", "#845640"],
      brown: ["#916149", "#674232"],
      deep: ["#704735", "#4e3026"],
      dark: ["#4f3027", "#351f1a"]
    });
    const HAIR = Object.freeze({ dark: "#171514", brown: "#4a3024", auburn: "#713f2d", blond: "#b89858", gray: "#777b78" });
    const ACCENTS = Object.freeze({ olive: "#9ba875", blue: "#6e9db4", red: "#b64e49", tan: "#bd9d66", purple: "#8f78a5" });
    const OUTFITS = Object.freeze({
      tactical: { shirt: "#343b3d", dark: "#202628", vest: "#151a1c", pants: "#3a4143", armor: "#62696b", boot: "#171a1b" },
      ranger: { shirt: "#4e6250", dark: "#314035", vest: "#38483a", pants: "#343c37", armor: "#6c765e", boot: "#1d211e" },
      sheriff: { shirt: "#3f5667", dark: "#293a47", vest: "#303d46", pants: "#303b43", armor: "#70808a", boot: "#191d20" },
      medic: { shirt: "#697773", dark: "#46524f", vest: "#d2d7d2", pants: "#414a48", armor: "#89938f", boot: "#1b201f" },
      scavenger: { shirt: "#625245", dark: "#40352d", vest: "#493d34", pants: "#403b37", armor: "#796959", boot: "#211d1a" }
    });
    const WEAPONS = Object.freeze({
      fists: { mode: "melee", range: 12 },
      knife: { mode: "melee", range: 20 },
      hammer: { mode: "melee", range: 22 },
      bat: { mode: "melee", range: 26 },
      axe: { mode: "melee", range: 26 },
      machete: { mode: "melee", range: 27 },
      katana: { mode: "melee", range: 31 },
      crowbar: { mode: "melee", range: 26 },
      spear: { mode: "melee", range: 36 },
      sledgehammer: { mode: "melee", range: 29 },
      pistol: { mode: "ranged" },
      revolver: { mode: "ranged" },
      machine_pistol: { mode: "ranged" },
      smg: { mode: "ranged" },
      shotgun: { mode: "ranged" },
      double_barrel: { mode: "ranged" },
      rifle: { mode: "ranged" },
      carbine: { mode: "ranged" },
      assault_rifle: { mode: "ranged" },
      lever_rifle: { mode: "ranged" }
    });
    const LONG_GUNS = /* @__PURE__ */ new Set(["smg", "shotgun", "double_barrel", "rifle", "carbine", "assault_rifle", "lever_rifle"]);
    const TWO_HANDED = /* @__PURE__ */ new Set(["bat", "axe", "machete", "katana", "crowbar", "spear", "sledgehammer"]);
    const THRUSTING = /* @__PURE__ */ new Set(["knife", "spear"]);
    const clamp2 = (value, min, max) => Math.max(min, Math.min(max, value));
    const distance2 = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
    const ease = (value) => 1 - (1 - clamp2(value, 0, 1)) ** 3;
    function hash(value) {
      const text = String(value ?? "look");
      let result = 2166136261;
      for (let i = 0; i < text.length; i += 1) {
        result ^= text.charCodeAt(i);
        result = Math.imul(result, 16777619);
      }
      return (result >>> 0) / 4294967295;
    }
    function savedAppearance() {
      if (typeof localStorage === "undefined") return { ...DEFAULT_LOOK };
      try {
        const parsed = JSON.parse(localStorage.getItem(APPEARANCE_KEY));
        return { ...DEFAULT_LOOK, ...parsed || {} };
      } catch {
        return { ...DEFAULT_LOOK };
      }
    }
    function ensurePlayerLook(player) {
      if (!player) return null;
      player.appearance = { ...DEFAULT_LOOK, ...savedAppearance(), ...player.appearance || {} };
      return player.appearance;
    }
    function saveAppearance(appearance) {
      if (typeof localStorage === "undefined") return;
      try {
        localStorage.setItem(APPEARANCE_KEY, JSON.stringify(appearance));
      } catch {
      }
    }
    function weapon(id) {
      return WEAPONS[id] || WEAPONS.knife;
    }
    function bar(ctx, x1, y1, x2, y2, width, color, outline = "#111415") {
      const dx = x2 - x1;
      const dy = y2 - y1;
      const length = Math.hypot(dx, dy) || 1;
      ctx.save();
      ctx.translate(Math.round(x1), Math.round(y1));
      ctx.rotate(Math.atan2(dy, dx));
      ctx.fillStyle = outline;
      ctx.fillRect(-1, -Math.ceil(width / 2) - 1, Math.ceil(length) + 2, Math.ceil(width) + 2);
      ctx.fillStyle = color;
      ctx.fillRect(0, -Math.ceil(width / 2), Math.ceil(length), Math.ceil(width));
      ctx.restore();
    }
    function drawGun(ctx, id, x, y, dx, dy, firing = false) {
      const angle = Math.atan2(dy, dx);
      const long = LONG_GUNS.has(id);
      const rifle = id === "rifle" || id === "lever_rifle";
      const barrel = long ? rifle ? 28 : 24 : 14;
      ctx.save();
      ctx.translate(Math.round(x), Math.round(y));
      ctx.rotate(angle);
      ctx.fillStyle = "#0e1112";
      ctx.fillRect(-5, -4, barrel + 10, 8);
      ctx.fillStyle = ["lever_rifle", "shotgun", "double_barrel"].includes(id) ? "#765035" : "#333a3d";
      ctx.fillRect(-4, -3, long ? 14 : 10, 6);
      ctx.fillStyle = "#161a1c";
      ctx.fillRect(8, -2, barrel - 5, 4);
      ctx.fillStyle = "#798083";
      ctx.fillRect(10, -1, barrel - 7, 1);
      ctx.fillStyle = "#141718";
      ctx.fillRect(long ? 5 : 2, 3, 5, 6);
      if (long) {
        ctx.fillStyle = "#242a2c";
        ctx.fillRect(-10, -3, 7, 6);
      }
      if (firing) {
        ctx.fillStyle = "rgba(255,216,126,.94)";
        ctx.beginPath();
        ctx.moveTo(barrel + 5, 0);
        ctx.lineTo(barrel + 13, -5);
        ctx.lineTo(barrel + 10, 0);
        ctx.lineTo(barrel + 13, 5);
        ctx.closePath();
        ctx.fill();
      }
      ctx.restore();
    }
    function drawMelee(ctx, id, x, y, dx, dy) {
      const angle = Math.atan2(dy, dx);
      const length = id === "spear" ? 35 : id === "katana" ? 30 : id === "machete" ? 25 : 22;
      ctx.save();
      ctx.translate(Math.round(x), Math.round(y));
      ctx.rotate(angle);
      ctx.fillStyle = "#151311";
      ctx.fillRect(-7, -3, length + 9, 6);
      ctx.fillStyle = id === "bat" ? "#765035" : "#65462f";
      ctx.fillRect(-5, -2, id === "bat" ? length : 13, 4);
      if (["axe", "sledgehammer", "hammer"].includes(id)) {
        ctx.fillStyle = "#8a9294";
        ctx.fillRect(length - 6, -7, 8, 14);
        ctx.fillStyle = "#c5cccb";
        ctx.fillRect(length - 5, -6, 2, 12);
      } else if (id === "crowbar") {
        ctx.fillStyle = "#934239";
        ctx.fillRect(4, -2, length - 3, 4);
        ctx.fillRect(length - 1, -6, 3, 7);
      } else if (id !== "bat") {
        ctx.fillStyle = "#b6bebe";
        if (id === "spear") {
          ctx.beginPath();
          ctx.moveTo(length + 5, 0);
          ctx.lineTo(length - 1, -5);
          ctx.lineTo(length - 1, 5);
          ctx.closePath();
          ctx.fill();
        } else {
          ctx.fillRect(10, -2, length - 8, 4);
          ctx.fillStyle = "#e0e3df";
          ctx.fillRect(12, -2, length - 10, 1);
        }
      }
      ctx.restore();
    }
    function hairShape(ctx, style, color, headX, headY, side) {
      ctx.fillStyle = color;
      if (style === "bald") return;
      if (style === "buzz") {
        ctx.fillRect(headX - 6, headY - 7, 12, 3);
      } else if (style === "short") {
        ctx.fillRect(headX - 7, headY - 8, 13, 4);
        ctx.fillRect(headX - (side > 0 ? 7 : -4), headY - 5, 3, 6);
      } else if (style === "curls") {
        for (const [x, y] of [[-5, -6], [-2, -8], [2, -8], [5, -6], [-6, -3]]) {
          ctx.beginPath();
          ctx.arc(headX + x, headY + y, 3, 0, Math.PI * 2);
          ctx.fill();
        }
      } else if (style === "braids") {
        ctx.fillRect(headX - 7, headY - 8, 13, 4);
        const back = side > 0 ? -7 : 5;
        ctx.fillRect(headX + back, headY - 4, 3, 13);
        ctx.fillRect(headX + back - 2, headY + 7, 3, 6);
      } else if (style === "bun") {
        ctx.fillRect(headX - 6, headY - 7, 12, 4);
        ctx.beginPath();
        ctx.arc(headX - side * 6, headY - 7, 4, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    function headgearShape(ctx, kind, color, accent, x, y, side) {
      if (kind === "helmet") {
        ctx.fillStyle = "#111516";
        ctx.fillRect(x - 9, y - 10, 18, 8);
        ctx.fillStyle = color;
        ctx.fillRect(x - 7, y - 10, 14, 6);
        ctx.fillStyle = "#6a7273";
        ctx.fillRect(x - 4, y - 9, 7, 2);
        ctx.fillStyle = "#101314";
        ctx.fillRect(x - 9 + side * 2, y - 4, 18, 3);
        ctx.fillStyle = accent;
        ctx.fillRect(x + side * 4 - 1, y - 7, 3, 2);
      } else if (kind === "cap") {
        ctx.fillStyle = color;
        ctx.fillRect(x - 7, y - 8, 14, 5);
        ctx.fillStyle = "#111516";
        ctx.fillRect(x - 8, y - 4, 12 + side * 4, 3);
        ctx.fillStyle = accent;
        ctx.fillRect(x - 2, y - 7, 4, 2);
      } else if (kind === "beanie") {
        ctx.fillStyle = "#121516";
        ctx.fillRect(x - 7, y - 8, 14, 7);
        ctx.fillStyle = color;
        ctx.fillRect(x - 6, y - 8, 12, 5);
        ctx.fillStyle = accent;
        ctx.fillRect(x - 6, y - 3, 12, 2);
      }
    }
    function outfitMark(ctx, outfit, x, y, accent) {
      ctx.fillStyle = accent;
      if (outfit === "medic") {
        ctx.fillRect(x - 1, y - 5, 3, 10);
        ctx.fillRect(x - 5, y - 1, 11, 3);
      } else if (outfit === "sheriff") {
        ctx.beginPath();
        ctx.arc(x + 4, y - 3, 2.5, 0, Math.PI * 2);
        ctx.fill();
      } else if (outfit === "scavenger") {
        ctx.fillRect(x - 7, y - 5, 3, 13);
        ctx.fillRect(x + 4, y - 5, 3, 13);
      } else {
        ctx.fillRect(x + 4, y - 4, 3, 3);
      }
    }
    function combatPose(entity, weaponId, fx, fy, bodyX, bodyY, duration) {
      const item = weapon(weaponId);
      const remaining = clamp2((entity.attackAnim || 0) / duration, 0, 1);
      const progress = remaining > 0 ? 1 - remaining : 0;
      const recoil = remaining > 0 ? Math.sin(progress * Math.PI) : 0;
      let left = { x: bodyX - 10, y: bodyY + 8 };
      let right = { x: bodyX + 10, y: bodyY + 8 };
      let dx = fx;
      let dy = fy * 0.78;
      let swingAngle = null;
      if (item.mode === "ranged") {
        const reach = 13 - recoil * (LONG_GUNS.has(weaponId) ? 5 : 3);
        left = { x: bodyX - 2 + fx * reach, y: bodyY + fy * reach * 0.58 };
        right = { x: bodyX + 2 + fx * (reach + 2), y: bodyY + 2 + fy * (reach + 2) * 0.58 };
      } else if (remaining > 0) {
        const base = Math.atan2(fy, fx);
        if (THRUSTING.has(weaponId) || weaponId === "fists") {
          const thrust = Math.sin(progress * Math.PI);
          right = { x: bodyX + fx * (11 + thrust * 12), y: bodyY + fy * (8 + thrust * 9) };
          if (weaponId === "spear") left = { x: bodyX + fx * (6 + thrust * 5), y: bodyY + fy * (5 + thrust * 4) };
        } else {
          const overhead = ["axe", "hammer", "sledgehammer"].includes(weaponId);
          swingAngle = base + (overhead ? -2.05 : -1.55) + (overhead ? 2.5 : 2.7) * ease(progress);
          dx = Math.cos(swingAngle);
          dy = Math.sin(swingAngle);
          right = { x: bodyX + dx * 15, y: bodyY + dy * 12 };
          if (TWO_HANDED.has(weaponId)) left = { x: bodyX + dx * 8, y: bodyY + dy * 6 + 1 };
        }
      } else if (weaponId !== "fists") {
        right = { x: bodyX + (fx >= 0 ? 1 : -1) * 8 + fx * 6, y: bodyY + 5 + fy * 5 };
      }
      return { item, remaining, progress, recoil, left, right, dx, dy, swingAngle };
    }
    function attackTrail(ctx, pose, x, y, range) {
      if (pose.swingAngle === null || pose.progress < 0.24 || pose.progress > 0.74) return;
      const alpha = Math.sin((pose.progress - 0.24) / 0.5 * Math.PI) * 0.28;
      ctx.strokeStyle = `rgba(235,239,229,${alpha})`;
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.arc(x, y, range, pose.swingAngle - 0.58, pose.swingAngle + 0.18);
      ctx.stroke();
    }
    function drawPlayerModel(ctx, player, screen, appearance, requestedScale = 0.82) {
      const look = { ...DEFAULT_LOOK, ...appearance || {} };
      const skin = SKINS[look.skin] || SKINS.medium;
      const clothes = OUTFITS[look.outfit] || OUTFITS.tactical;
      const accent = ACCENTS[look.accent] || ACCENTS.olive;
      const hair = HAIR[look.hairColor] || HAIR.dark;
      const fx = player.renderFacingX ?? player.facingX ?? 1;
      const fy = player.renderFacingY ?? player.facingY ?? 0;
      const side = fx >= 0 ? 1 : -1;
      const phase = player.animTime || 0;
      const moving = clamp2(player.moveBlend || 0, 0, 1);
      const crouch = Boolean(player.crouching);
      const sprint = Boolean(player.sprintingNow);
      const bodyWidth = look.build === "slim" ? 0.9 : look.build === "sturdy" ? 1.09 : 1;
      const scale = requestedScale;
      const stride = Math.sin(phase) * moving * (sprint ? 6 : crouch ? 2.5 : 4.2);
      const bob = Math.abs(Math.cos(phase)) * moving * 1.1;
      const compress = crouch ? 5 : 0;
      const hurt = clamp2((player.hurtAnim || 0) / 0.3, 0, 1);
      const flash = hurt > 0 && Math.floor(hurt * 22) % 2 === 0;
      const weaponId = player.equipped || "fists";
      ctx.save();
      ctx.translate(Math.round(screen.x), Math.round(screen.y));
      ctx.rotate((player.turnLean || 0) * 0.08);
      ctx.scale(scale * bodyWidth, scale);
      ctx.imageSmoothingEnabled = false;
      ctx.fillStyle = "rgba(2,5,3,.44)";
      ctx.beginPath();
      ctx.ellipse(2, 2, 14, crouch ? 6 : 5, 0, 0, Math.PI * 2);
      ctx.fill();
      const hipY = -11 + compress;
      const leftFoot = { x: -5 + fx * stride, y: -1 + fy * stride * 0.4 };
      const rightFoot = { x: 5 - fx * stride, y: -1 - fy * stride * 0.4 };
      const pants = flash ? "#ece7df" : clothes.pants;
      bar(ctx, -5, hipY, leftFoot.x, leftFoot.y, 6, pants);
      bar(ctx, 5, hipY, rightFoot.x, rightFoot.y, 6, pants);
      ctx.fillStyle = flash ? "#efeae3" : clothes.armor;
      ctx.fillRect(Math.round((-5 + leftFoot.x) / 2) - 3, -7 + compress, 6, 5);
      ctx.fillRect(Math.round((5 + rightFoot.x) / 2) - 3, -7 + compress, 6, 5);
      ctx.fillStyle = clothes.boot;
      ctx.fillRect(Math.round(leftFoot.x - 5 + side), Math.round(leftFoot.y - 2), 9, 5);
      ctx.fillRect(Math.round(rightFoot.x - 5 + side), Math.round(rightFoot.y - 2), 9, 5);
      const bodyX = sprint ? fx * 2.5 : 0;
      const bodyY = -22 + compress + bob;
      const hasPack = player.inventory?.some((entry) => entry.id === "backpack" && entry.qty > 0);
      if (hasPack) {
        ctx.fillStyle = "#171b18";
        ctx.fillRect(bodyX - 11 - fx, bodyY - 7, 22, 20);
        ctx.fillStyle = "#4d5944";
        ctx.fillRect(bodyX - 9 - fx, bodyY - 5, 18, 16);
        ctx.fillStyle = "#aa8b4d";
        ctx.fillRect(bodyX - 2 - fx, bodyY + 7, 4, 3);
      }
      const pose = combatPose(player, weaponId, fx, fy, bodyX, bodyY, player.attackDuration || 0.3);
      attackTrail(ctx, pose, bodyX, bodyY + 2, weaponId === "katana" ? 31 : 27);
      bar(ctx, bodyX - 8, bodyY - 1, pose.left.x, pose.left.y, 6, flash ? "#eee8df" : clothes.dark);
      ctx.fillStyle = "#101415";
      ctx.fillRect(bodyX - 11, bodyY - 10, 22, 22);
      ctx.fillStyle = flash ? "#eee8df" : clothes.shirt;
      ctx.fillRect(bodyX - 9, bodyY - 8, 18, 18);
      ctx.fillStyle = flash ? "#ded8d0" : clothes.vest;
      ctx.fillRect(bodyX - 8, bodyY - 6, 16, 16);
      ctx.fillStyle = flash ? "#f2eee7" : clothes.armor;
      ctx.fillRect(bodyX - 6, bodyY - 5, 12, 5);
      ctx.fillStyle = clothes.dark;
      ctx.fillRect(bodyX - 1, bodyY - 5, 2, 15);
      outfitMark(ctx, look.outfit, bodyX, bodyY, accent);
      bar(ctx, bodyX + 8, bodyY - 1, pose.right.x, pose.right.y, 6, flash ? "#eee8df" : clothes.dark);
      ctx.fillStyle = flash ? "#fff2e7" : skin[0];
      ctx.fillRect(pose.left.x - 3, pose.left.y - 3, 6, 6);
      ctx.fillRect(pose.right.x - 3, pose.right.y - 3, 6, 6);
      if (pose.item.mode === "ranged") {
        drawGun(ctx, weaponId, (pose.left.x + pose.right.x) / 2, (pose.left.y + pose.right.y) / 2, fx, fy * 0.78, pose.remaining > 0.42);
      } else if (weaponId !== "fists") drawMelee(ctx, weaponId, pose.right.x, pose.right.y, pose.dx, pose.dy);
      const headX = bodyX + fx * 2;
      const headY = bodyY - 15 + fy;
      ctx.fillStyle = "#101415";
      ctx.fillRect(headX - 8, headY - 8, 16, 15);
      ctx.fillStyle = flash ? "#fff2e7" : skin[0];
      ctx.fillRect(headX - 6, headY - 5, 12, 11);
      ctx.fillStyle = flash ? "#e2d7cf" : skin[1];
      ctx.fillRect(headX - (side > 0 ? 6 : -3), headY + 1, 3, 5);
      hairShape(ctx, look.hair, hair, headX, headY, side);
      headgearShape(ctx, look.headgear, clothes.dark, accent, headX, headY, side);
      ctx.fillStyle = "#231f1c";
      ctx.fillRect(headX + side * 2 - 1, headY - 1, 2, 2);
      ctx.fillStyle = "#80503e";
      ctx.fillRect(headX - 1 + side, headY + 4, 4, 1);
      ctx.restore();
    }
    const NPC_SKINS = ["light", "warm", "medium", "brown", "deep", "dark"];
    const NPC_HAIR = ["buzz", "short", "curls", "braids", "bun", "bald"];
    const NPC_HAIR_COLORS = ["dark", "brown", "auburn", "blond", "gray"];
    const NPC_OUTFITS = Object.freeze({
      passive: ["hoodie", "medic", "worker", "civilian", "raincoat"],
      neutral: ["hunter", "mechanic", "sheriff", "ranger", "drifter"],
      aggressive: ["raider", "leather", "enforcer", "bandit"]
    });
    const NPC_PALETTES = Object.freeze({
      hoodie: ["#526d69", "#344b48", "#3a4745"],
      medic: ["#c6ceca", "#687773", "#46534f"],
      worker: ["#987241", "#4d4f48", "#3b3e3b"],
      civilian: ["#665b71", "#413a49", "#3b3c41"],
      raincoat: ["#8d8750", "#565334", "#45463e"],
      hunter: ["#53634b", "#34402f", "#3b4039"],
      mechanic: ["#485d68", "#2e3c43", "#343b3e"],
      sheriff: ["#405a6b", "#293d49", "#303b43"],
      ranger: ["#59634a", "#394031", "#383d36"],
      drifter: ["#6b5848", "#44382f", "#3c3936"],
      raider: ["#3b3839", "#211f20", "#343236"],
      leather: ["#342d2a", "#1f1a18", "#302b2a"],
      enforcer: ["#30383b", "#1c2224", "#303538"],
      bandit: ["#4d3738", "#2c2021", "#343035"]
    });
    function npcLook(survivor) {
      const seed = `${survivor.id}:${Math.floor(survivor.x || 0)}:${Math.floor(survivor.y || 0)}`;
      const attitude = survivor.attitude || (hash(`${seed}:a`) < 0.42 ? "passive" : hash(`${seed}:b`) < 0.72 ? "neutral" : "aggressive");
      const choose = (array, salt) => array[Math.floor(hash(`${seed}:${salt}`) * array.length) % array.length];
      const outfit = choose(NPC_OUTFITS[attitude] || NPC_OUTFITS.neutral, "outfit");
      return {
        attitude,
        skin: choose(NPC_SKINS, "skin"),
        hair: choose(NPC_HAIR, "hair"),
        hairColor: choose(NPC_HAIR_COLORS, "hair-color"),
        outfit,
        headgear: attitude === "aggressive" ? choose(["none", "beanie", "cap"], "hat") : choose(["none", "none", "cap", "beanie"], "hat"),
        build: choose(["slim", "standard", "standard", "sturdy"], "build"),
        accent: attitude === "aggressive" ? "#b44440" : attitude === "passive" ? "#83baaa" : "#c5ad67"
      };
    }
    function drawNpcOutfit(ctx, look, x, y) {
      ctx.fillStyle = look.accent;
      if (look.outfit === "medic") {
        ctx.fillRect(x - 1, y - 4, 3, 9);
        ctx.fillRect(x - 4, y - 1, 9, 3);
      } else if (look.outfit === "sheriff") {
        ctx.beginPath();
        ctx.arc(x + 4, y - 3, 2.4, 0, Math.PI * 2);
        ctx.fill();
      } else if (["worker", "mechanic"].includes(look.outfit)) {
        ctx.fillRect(x - 6, y - 5, 2, 13);
        ctx.fillRect(x + 4, y - 5, 2, 13);
      } else if (["raider", "leather", "enforcer", "bandit"].includes(look.outfit)) {
        ctx.fillRect(x - 7, y + 4, 14, 3);
        ctx.fillRect(x + 4, y - 4, 3, 3);
      } else {
        ctx.fillRect(x - 5, y + 5, 10, 2);
      }
    }
    function drawSurvivorModel(ctx, survivor, screen) {
      const look = npcLook(survivor);
      const skin = SKINS[look.skin];
      const hair = HAIR[look.hairColor];
      const colors = NPC_PALETTES[look.outfit];
      const fx = Math.cos(survivor.angle || 0);
      const fy = Math.sin(survivor.angle || 0);
      const side = fx >= 0 ? 1 : -1;
      const phase = survivor.animTime || 0;
      const moving = clamp2(survivor.moveBlend || 0, 0, 1);
      const stride = Math.sin(phase) * moving * (survivor.state === "flee" ? 5.8 : 3.8);
      const buildX = look.build === "slim" ? 0.88 : look.build === "sturdy" ? 1.1 : 1;
      const height = hash(`${survivor.id}:height`) * 0.12 + 0.82;
      const weaponId = survivor.weapon || "knife";
      const hurt = clamp2((survivor.hurtAnim || 0) / 0.3, 0, 1);
      const flash = hurt > 0 && Math.floor(hurt * 20) % 2 === 0;
      ctx.save();
      ctx.translate(Math.round(screen.x), Math.round(screen.y));
      ctx.scale(height * buildX, height);
      ctx.imageSmoothingEnabled = false;
      if (survivor.dead) {
        ctx.rotate(side * 1.3);
        ctx.translate(3, 6);
        ctx.globalAlpha = 0.7;
      }
      ctx.fillStyle = "rgba(2,5,3,.4)";
      ctx.beginPath();
      ctx.ellipse(2, 2, 13, 5, 0, 0, Math.PI * 2);
      ctx.fill();
      const leftFoot = { x: -4 + fx * stride, y: -1 + fy * stride * 0.4 };
      const rightFoot = { x: 4 - fx * stride, y: -1 - fy * stride * 0.4 };
      bar(ctx, -4, -10, leftFoot.x, leftFoot.y, 5, flash ? "#eae5df" : colors[2]);
      bar(ctx, 4, -10, rightFoot.x, rightFoot.y, 5, flash ? "#eae5df" : colors[2]);
      ctx.fillStyle = "#1a1d1c";
      ctx.fillRect(leftFoot.x - 4 + side, leftFoot.y - 2, 8, 4);
      ctx.fillRect(rightFoot.x - 4 + side, rightFoot.y - 2, 8, 4);
      const bodyY = -20 + Math.abs(Math.cos(phase)) * moving;
      const pose = combatPose(survivor, weaponId, fx, fy, 0, bodyY, weapon(weaponId).mode === "ranged" ? 0.24 : 0.38);
      attackTrail(ctx, pose, 0, bodyY + 2, 25);
      bar(ctx, -7, bodyY - 1, pose.left.x, pose.left.y, 5, flash ? "#eee8df" : colors[1]);
      ctx.fillStyle = "#121514";
      ctx.fillRect(-10, bodyY - 9, 20, ["raincoat", "leather"].includes(look.outfit) ? 24 : 20);
      ctx.fillStyle = flash ? "#eee8df" : colors[0];
      ctx.fillRect(-8, bodyY - 7, 16, ["raincoat", "leather"].includes(look.outfit) ? 20 : 16);
      if (["hoodie", "raincoat"].includes(look.outfit)) {
        ctx.fillStyle = colors[1];
        ctx.fillRect(-9, bodyY - 8, 18, 5);
      }
      if (["hunter", "ranger", "enforcer"].includes(look.outfit)) {
        ctx.fillStyle = colors[1];
        ctx.fillRect(-7, bodyY - 5, 14, 13);
      }
      drawNpcOutfit(ctx, look, 0, bodyY);
      bar(ctx, 7, bodyY - 1, pose.right.x, pose.right.y, 5, flash ? "#eee8df" : colors[1]);
      ctx.fillStyle = flash ? "#fff1e7" : skin[0];
      ctx.fillRect(pose.left.x - 2, pose.left.y - 2, 5, 5);
      ctx.fillRect(pose.right.x - 2, pose.right.y - 2, 5, 5);
      if (!survivor.dead) {
        if (pose.item.mode === "ranged") drawGun(ctx, weaponId, (pose.left.x + pose.right.x) / 2, (pose.left.y + pose.right.y) / 2, fx, fy * 0.78, pose.remaining > 0.42);
        else drawMelee(ctx, weaponId, pose.right.x, pose.right.y, pose.dx, pose.dy);
      }
      const headX = fx * 2;
      const headY = bodyY - 13 + fy;
      ctx.fillStyle = "#141717";
      ctx.fillRect(headX - 7, headY - 7, 14, 14);
      ctx.fillStyle = flash ? "#fff1e7" : skin[0];
      ctx.fillRect(headX - 5, headY - 5, 10, 10);
      hairShape(ctx, look.hair, hair, headX, headY, side);
      headgearShape(ctx, look.headgear, colors[1], look.accent, headX, headY, side);
      ctx.fillStyle = "#201d1a";
      ctx.fillRect(headX + side * 2 - 1, headY - 1, 2, 2);
      if (look.attitude === "aggressive") {
        ctx.fillStyle = "#a33b38";
        ctx.fillRect(headX - 5, headY + 3, 10, 3);
      }
      ctx.restore();
    }
    function injectStyles() {
      if (typeof document === "undefined" || document.getElementById("hcCharacterStyles")) return;
      const style = document.createElement("style");
      style.id = "hcCharacterStyles";
      style.textContent = `
      .hc-pack-tabs{display:grid;grid-template-columns:1fr 1fr;gap:7px;padding:0 18px 12px}
      .hc-pack-tabs button{min-height:38px;border:1px solid rgba(188,201,187,.23);background:#111714;color:#89958d;font:900 11px system-ui;letter-spacing:.13em}
      .hc-pack-tabs button.active{border-color:#a9b989;color:#e3e8dd;background:#1d261f}
      .hc-loadout-card{display:grid;grid-template-columns:82px 1fr;gap:12px;margin:0 18px 12px;padding:10px;border:1px solid rgba(188,201,187,.18);background:rgba(8,12,10,.7)}
      .hc-loadout-card canvas{width:82px;height:82px;background:#121916;border:1px solid rgba(188,201,187,.14)}
      .hc-loadout-copy{display:flex;flex-direction:column;justify-content:center;min-width:0}.hc-loadout-copy span{font:800 9px system-ui;color:#7f8c84;letter-spacing:.14em}
      .hc-loadout-copy b{font:900 14px system-ui;color:#e1e5dd;margin:4px 0;text-transform:uppercase}.hc-loadout-copy small{font:700 10px system-ui;color:#a4afa7}
      #hcAppearanceCustomizer{display:none;overflow:auto;padding:0 18px 24px}.hc-show-appearance #hcAppearanceCustomizer{display:block}
      #inventoryPanel.hc-show-appearance>.weight,#inventoryPanel.hc-show-appearance>#inventoryList,#inventoryPanel.hc-show-appearance>footer,#inventoryPanel.hc-show-appearance>.hc-loadout-card{display:none!important}
      .hc-look-preview{display:grid;place-items:center;margin-bottom:13px;border:1px solid rgba(188,201,187,.18);background:linear-gradient(#151d19,#0c110f)}
      .hc-look-preview canvas{width:180px;height:172px;max-width:100%}.hc-look-title{padding:9px 0 4px;color:#87948b;font:900 10px system-ui;letter-spacing:.15em}
      .hc-option-group{margin:0 0 13px}.hc-option-group>span{display:block;margin:0 0 6px;color:#a8b2aa;font:900 9px system-ui;letter-spacing:.14em;text-transform:uppercase}
      .hc-options{display:flex;flex-wrap:wrap;gap:6px}.hc-look-option{min-height:34px;padding:7px 10px;border:1px solid rgba(188,201,187,.18);background:#111714;color:#99a59d;font:800 10px system-ui}
      .hc-look-option.selected{border-color:#acbd8b;background:#253027;color:#eef1e9;box-shadow:inset 0 0 0 1px rgba(172,189,139,.24)}
      .hc-swatch{display:inline-block;width:11px;height:11px;margin-right:6px;border:1px solid rgba(255,255,255,.28);vertical-align:-2px}
      .hc-save-look{width:100%;min-height:43px;margin-top:3px;border:1px solid #788864;background:#33422f;color:#edf2e8;font:900 11px system-ui;letter-spacing:.13em}
      @media(max-width:600px){.hc-pack-tabs{padding-left:13px;padding-right:13px}.hc-loadout-card,#hcAppearanceCustomizer{margin-left:0;margin-right:0}.hc-loadout-card{margin-left:13px;margin-right:13px}#hcAppearanceCustomizer{padding-left:13px;padding-right:13px}}
    `;
      document.head.append(style);
    }
    function buildOptionGroup(category, label, onChange) {
      const group = document.createElement("div");
      group.className = "hc-option-group";
      const title = document.createElement("span");
      title.textContent = label;
      const choices = document.createElement("div");
      choices.className = "hc-options";
      choices.dataset.category = category;
      for (const option of OPTIONS[category]) {
        const [name, value, color] = option;
        const button = document.createElement("button");
        button.type = "button";
        button.className = "hc-look-option";
        button.dataset.value = value;
        if (color) {
          const swatch = document.createElement("i");
          swatch.className = "hc-swatch";
          swatch.style.background = color;
          button.append(swatch);
        }
        button.append(document.createTextNode(name));
        button.addEventListener("click", () => onChange(category, value));
        choices.append(button);
      }
      group.append(title, choices);
      return group;
    }
    function installInventoryCreator(game) {
      if (typeof document === "undefined") return;
      injectStyles();
      const panel = document.getElementById("inventoryPanel");
      if (!panel || document.getElementById("hcAppearanceCustomizer")) return;
      const header = panel.querySelector("header");
      const weight = panel.querySelector(".weight");
      const tabs = document.createElement("div");
      tabs.className = "hc-pack-tabs";
      const gearTab = document.createElement("button");
      gearTab.type = "button";
      gearTab.textContent = "GEAR";
      gearTab.className = "active";
      const lookTab = document.createElement("button");
      lookTab.type = "button";
      lookTab.textContent = "APPEARANCE";
      tabs.append(gearTab, lookTab);
      header.after(tabs);
      const loadout = document.createElement("div");
      loadout.className = "hc-loadout-card";
      loadout.id = "hcLoadoutCard";
      const paper = document.createElement("canvas");
      paper.width = 164;
      paper.height = 164;
      const loadoutCopy = document.createElement("div");
      loadoutCopy.className = "hc-loadout-copy";
      const overline = document.createElement("span");
      overline.textContent = "CURRENT LOADOUT";
      const equipped = document.createElement("b");
      equipped.id = "hcEquippedName";
      const details = document.createElement("small");
      details.id = "hcInventoryDetails";
      loadoutCopy.append(overline, equipped, details);
      loadout.append(paper, loadoutCopy);
      weight.after(loadout);
      const creator = document.createElement("div");
      creator.id = "hcAppearanceCustomizer";
      const previewWrap = document.createElement("div");
      previewWrap.className = "hc-look-preview";
      const previewTitle = document.createElement("div");
      previewTitle.className = "hc-look-title";
      previewTitle.textContent = "SURVIVOR PREVIEW";
      const preview = document.createElement("canvas");
      preview.width = 360;
      preview.height = 344;
      previewWrap.append(previewTitle, preview);
      creator.append(previewWrap);
      const updateSelected = () => {
        const look = ensurePlayerLook(game.player) || savedAppearance();
        creator.querySelectorAll(".hc-options").forEach((row) => {
          row.querySelectorAll("button").forEach((button) => button.classList.toggle("selected", button.dataset.value === look[row.dataset.category]));
        });
      };
      const renderPaper = (canvas, large = false) => {
        const context = canvas.getContext("2d");
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = large ? "#121916" : "#101613";
        context.fillRect(0, 0, canvas.width, canvas.height);
        const source = game.player || { inventory: [], equipped: "knife" };
        const model = { ...source, x: 0, y: 0, facingX: 1, facingY: 0.05, animTime: performance.now() / 700, moveBlend: large ? 0.38 : 0.18, attackAnim: 0, crouching: false, sprintingNow: false };
        drawPlayerModel(context, model, { x: canvas.width / 2, y: canvas.height * 0.72 }, ensurePlayerLook(game.player) || savedAppearance(), large ? 2.05 : 1.35);
        context.textAlign = "center";
        context.fillStyle = "#7e8b82";
        context.font = `${large ? 18 : 12}px system-ui`;
        context.fillText((ensurePlayerLook(game.player) || savedAppearance()).outfit.toUpperCase(), canvas.width / 2, canvas.height - (large ? 18 : 8));
      };
      const updateLoadout = () => {
        if (!game.player) return;
        const name = game.player.equipped ? String(game.player.equipped).replaceAll("_", " ") : "BARE HANDS";
        equipped.textContent = name;
        const entries = game.player.inventory?.reduce((sum, entry) => sum + (entry.qty || 0), 0) || 0;
        details.textContent = `${entries} ITEMS \u2022 ${game.player.hotbar?.filter(Boolean).length || 0}/5 QUICK SLOTS`;
        renderPaper(paper, false);
      };
      const changeLook = (category, value) => {
        const look = game.player ? ensurePlayerLook(game.player) : savedAppearance();
        look[category] = value;
        if (game.player) game.player.appearance = look;
        saveAppearance(look);
        updateSelected();
        renderPaper(preview, true);
        updateLoadout();
      };
      creator.append(
        buildOptionGroup("skin", "Skin tone", changeLook),
        buildOptionGroup("hair", "Hairstyle", changeLook),
        buildOptionGroup("hairColor", "Hair color", changeLook),
        buildOptionGroup("outfit", "Outfit", changeLook),
        buildOptionGroup("headgear", "Headgear", changeLook),
        buildOptionGroup("accent", "Accent color", changeLook),
        buildOptionGroup("build", "Body build", changeLook)
      );
      const saveButton = document.createElement("button");
      saveButton.type = "button";
      saveButton.className = "hc-save-look";
      saveButton.textContent = "SAVE APPEARANCE";
      saveButton.addEventListener("click", () => {
        saveAppearance(ensurePlayerLook(game.player) || savedAppearance());
        game.saveGame?.();
        game.toast?.("Survivor appearance saved.");
        gearTab.click();
      });
      creator.append(saveButton);
      panel.append(creator);
      const showGear = () => {
        panel.classList.remove("hc-show-appearance");
        gearTab.classList.add("active");
        lookTab.classList.remove("active");
        updateLoadout();
      };
      const showLook = () => {
        panel.classList.add("hc-show-appearance");
        lookTab.classList.add("active");
        gearTab.classList.remove("active");
        updateSelected();
        renderPaper(preview, true);
      };
      gearTab.addEventListener("click", showGear);
      lookTab.addEventListener("click", showLook);
      game.__updateCharacterInventory = () => {
        updateLoadout();
        if (panel.classList.contains("hc-show-appearance")) renderPaper(preview, true);
      };
      updateSelected();
      updateLoadout();
    }
    function install(game) {
      if (!game || game.__characterCreatorInventoryInstalled) return;
      game.__characterCreatorInventoryInstalled = true;
      const originalMakePlayer = typeof game.makePlayer === "function" ? game.makePlayer.bind(game) : null;
      if (originalMakePlayer) game.makePlayer = function customizedPlayer(...args) {
        const player = originalMakePlayer(...args);
        ensurePlayerLook(player);
        return player;
      };
      ensurePlayerLook(game.player);
      const originalMakeSurvivor = typeof game.makeSurvivor === "function" ? game.makeSurvivor.bind(game) : null;
      if (originalMakeSurvivor) game.makeSurvivor = function variedSurvivor(spawn) {
        const survivor = originalMakeSurvivor(spawn);
        survivor.visualSeed = survivor.visualSeed ?? hash(`${survivor.id}:visual`);
        return survivor;
      };
      game.drawPlayer = function smallerCustomPlayer(ctx, shakeX = 0, shakeY = 0) {
        if (!this.player) return;
        ensurePlayerLook(this.player);
        const screen = this.worldToScreen(this.player.x, this.player.y, shakeX, shakeY);
        drawPlayerModel(ctx, this.player, screen, this.player.appearance, 0.82);
      };
      game.drawSurvivors = function variedNpcSurvivors(ctx, shakeX = 0, shakeY = 0) {
        for (const survivor of this.survivors || []) {
          if (this.isHiddenInside?.(survivor)) continue;
          const screen = this.worldToScreen(survivor.x, survivor.y, shakeX, shakeY);
          if (screen.x < -85 || screen.y < -85 || screen.x > this.viewWidth + 85 || screen.y > this.viewHeight + 85) continue;
          drawSurvivorModel(ctx, survivor, screen);
          if (survivor.dead) continue;
          const attitude = survivor.attitude || "neutral";
          const range = attitude === "aggressive" ? 620 : 275;
          if (!this.player || distance2(survivor, this.player) > range) continue;
          const color = attitude === "aggressive" ? "#e35f59" : attitude === "passive" ? "#8dc9ba" : "#d5bd72";
          const label = `${survivor.name || "Survivor"} \u2022 ${attitude === "aggressive" ? "HOSTILE" : attitude.toUpperCase()}`;
          ctx.save();
          ctx.font = "900 8px system-ui, sans-serif";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          const width = clamp2(ctx.measureText(label).width + 15, 64, 144);
          ctx.fillStyle = "rgba(7,10,9,.86)";
          ctx.fillRect(Math.round(screen.x - width / 2), Math.round(screen.y - 52), Math.round(width), 14);
          ctx.fillStyle = color;
          ctx.fillRect(Math.round(screen.x - width / 2), Math.round(screen.y - 52), 3, 14);
          ctx.fillText(label, screen.x, screen.y - 45);
          if (survivor.speech && survivor.speechTimer > 2.4) {
            const speechWidth = clamp2(survivor.speech.length * 5.3 + 14, 70, 166);
            ctx.fillStyle = "rgba(232,228,211,.94)";
            ctx.fillRect(Math.round(screen.x - speechWidth / 2), Math.round(screen.y - 73), Math.round(speechWidth), 16);
            ctx.fillStyle = "#17201b";
            ctx.fillText(survivor.speech, screen.x, screen.y - 65);
          }
          ctx.restore();
        }
      };
      const originalRenderInventory = typeof game.renderInventory === "function" ? game.renderInventory.bind(game) : null;
      if (originalRenderInventory) game.renderInventory = function upgradedInventory(...args) {
        const result = originalRenderInventory(...args);
        this.__updateCharacterInventory?.();
        return result;
      };
      const originalStartNew = typeof game.startNew === "function" ? game.startNew.bind(game) : null;
      if (originalStartNew) game.startNew = function characterStart(...args) {
        const result = originalStartNew(...args);
        ensurePlayerLook(this.player);
        this.__updateCharacterInventory?.();
        this.toast?.("Open PACK \u2192 APPEARANCE to customize your survivor.");
        return result;
      };
      const originalLoadSaved = typeof game.loadSaved === "function" ? game.loadSaved.bind(game) : null;
      if (originalLoadSaved) game.loadSaved = function characterLoad(...args) {
        const result = originalLoadSaved(...args);
        ensurePlayerLook(this.player);
        this.__updateCharacterInventory?.();
        return result;
      };
      installInventoryCreator(game);
      game.toast?.("Character creator and survivor variety installed.");
    }
    if (window.__walkers) install(window.__walkers);
    else window.addEventListener("load", () => install(window.__walkers), { once: true });
  })();

  // Walkers-Player-Building-Access-Fix.js
  (() => {
    "use strict";
    const TILE2 = Object.freeze({ GRASS: 0, ROAD: 1, FLOOR: 2, WALL: 3, WATER: 4, TREE: 5 });
    const DIR = Object.freeze({ north: [0, -1], south: [0, 1], west: [-1, 0], east: [1, 0] });
    const OPPOSITE = Object.freeze({ north: "south", south: "north", west: "east", east: "west" });
    const MAJOR = /* @__PURE__ */ new Set(["hospital", "grocery", "sheriff", "prison", "warehouse"]);
    const REPAIR_VERSION = 4;
    const WEAPONS = Object.freeze({
      fists: ["melee", 7, 40],
      knife: ["melee", 14, 46],
      hammer: ["melee", 20, 51],
      bat: ["melee", 22, 58],
      axe: ["melee", 36, 62],
      machete: ["melee", 28, 66],
      katana: ["melee", 38, 74],
      crowbar: ["melee", 24, 63],
      spear: ["melee", 30, 88],
      sledgehammer: ["melee", 44, 68],
      pistol: ["ranged", 42, 560],
      revolver: ["ranged", 58, 650],
      machine_pistol: ["ranged", 18, 430],
      smg: ["ranged", 21, 460],
      shotgun: ["ranged", 55, 390],
      double_barrel: ["ranged", 68, 360],
      rifle: ["ranged", 72, 830],
      carbine: ["ranged", 46, 690],
      assault_rifle: ["ranged", 35, 760],
      lever_rifle: ["ranged", 66, 810]
    });
    const clamp2 = (value, min, max) => Math.max(min, Math.min(max, value));
    const distance2 = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
    const keyOf = (x, y) => `${x},${y}`;
    function inBounds2(world, x, y) {
      return x >= 0 && y >= 0 && x < world.width && y < world.height;
    }
    function getTile2(world, x, y) {
      if (!inBounds2(world, x, y)) return TILE2.WALL;
      if (world.chunked) {
        const size = world.chunkSize || 48;
        const cx = Math.floor(x / size);
        const cy = Math.floor(y / size);
        const chunk = world.chunks?.get(`${cx},${cy}`);
        if (!chunk) return TILE2.GRASS;
        const lx = x - cx * size;
        const ly = y - cy * size;
        return chunk.tiles[ly * size + lx];
      }
      return world.tiles[y * world.width + x];
    }
    function setTile2(world, x, y, value) {
      if (!inBounds2(world, x, y)) return false;
      if (world.chunked) {
        const size = world.chunkSize || 48;
        const cx = Math.floor(x / size);
        const cy = Math.floor(y / size);
        const chunk = world.chunks?.get(`${cx},${cy}`);
        if (!chunk) return false;
        const lx = x - cx * size;
        const ly = y - cy * size;
        chunk.tiles[ly * size + lx] = value;
        return true;
      }
      world.tiles[y * world.width + x] = value;
      return true;
    }
    function solid(tile) {
      return tile === TILE2.WALL || tile === TILE2.WATER || tile === TILE2.TREE;
    }
    function buildingSet(building) {
      return new Set((building.cells || []).map((cell) => keyOf(cell.x, cell.y)));
    }
    function boundarySides(cell, cells, outerOnly = false, building = null) {
      const sides = [];
      for (const [side, [dx, dy]] of Object.entries(DIR)) {
        if (outerOnly && building) {
          const outer = side === "north" ? cell.y === building.y : side === "south" ? cell.y === building.y + building.h - 1 : side === "west" ? cell.x === building.x : cell.x === building.x + building.w - 1;
          if (!outer) continue;
        }
        if (!cells.has(keyOf(cell.x + dx, cell.y + dy))) sides.push(side);
      }
      return sides;
    }
    function doorStyle(building, service = false) {
      if (service) return building.type === "prison" ? "steel" : "wood";
      if (building.type === "hospital") return "glass";
      if (building.type === "grocery") return "automatic";
      if (building.type === "prison") return "steel";
      return "wood";
    }
    function persistedDoorState(world, building, id) {
      const state = building.chunkKey ? world.chunkStates?.get(building.chunkKey) : null;
      return state?.doors?.find((door) => door.id === id) || null;
    }
    function makeDoor(world, building, cell, side, exterior, style) {
      const suffix = exterior ? "access" : "room";
      let index = 0;
      let id = `${building.id}-${suffix}-${index}`;
      const used = new Set((building.doors || []).map((door2) => door2.id));
      while (used.has(id)) {
        index += 1;
        id = `${building.id}-${suffix}-${index}`;
      }
      const maxHp = style === "steel" || style === "barred" ? 190 : style === "glass" || style === "automatic" ? 75 : 110;
      const door = {
        id,
        buildingId: building.id,
        chunkKey: building.chunkKey || null,
        x: cell.x,
        y: cell.y,
        side,
        orientation: side === "north" || side === "south" ? "horizontal" : "vertical",
        exterior,
        style,
        defaultOpen: !exterior,
        open: !exterior,
        broken: false,
        hp: maxHp,
        maxHp,
        repairedAccess: true
      };
      Object.assign(door, persistedDoorState(world, building, id) || {});
      building.doors || (building.doors = []);
      building.doors.push(door);
      building.windows = (building.windows || []).filter((window2) => window2.x !== cell.x || window2.y !== cell.y);
      building.barTiles = (building.barTiles || []).filter((bar) => bar.x !== cell.x || bar.y !== cell.y);
      setTile2(world, cell.x, cell.y, TILE2.FLOOR);
      return door;
    }
    function entranceScore(world, building, cell, side, existingDoors, service) {
      const [dx, dy] = DIR[side];
      let obstruction = 0;
      let roadDistance = 14;
      for (let step = 1; step <= 14; step += 1) {
        const tile = getTile2(world, cell.x + dx * step, cell.y + dy * step);
        if (tile === TILE2.ROAD) {
          roadDistance = step;
          break;
        }
        if (solid(tile)) obstruction += tile === TILE2.WALL ? 8 : 1;
      }
      const nearestDoor = existingDoors.length ? Math.min(...existingDoors.map((door) => Math.hypot(door.x - cell.x, door.y - cell.y))) : 0;
      return service ? obstruction * 5 + roadDistance - nearestDoor * 1.8 : obstruction * 6 + roadDistance;
    }
    function addBestExteriorDoor(world, building, cells, service = false) {
      const existing = (building.doors || []).filter((door) => door.exterior);
      let candidates = [];
      for (const cell of building.cells || []) {
        if (getTile2(world, cell.x, cell.y) !== TILE2.WALL) continue;
        for (const side of boundarySides(cell, cells, true, building)) candidates.push({ cell, side });
      }
      if (!candidates.length) {
        for (const cell of building.cells || []) {
          if (getTile2(world, cell.x, cell.y) !== TILE2.WALL) continue;
          for (const side of boundarySides(cell, cells)) candidates.push({ cell, side });
        }
      }
      candidates = candidates.filter(({ cell }) => existing.every((door) => Math.hypot(door.x - cell.x, door.y - cell.y) > (service ? 5 : 2)));
      if (!candidates.length) return null;
      candidates.sort((a, b) => entranceScore(world, building, a.cell, a.side, existing, service) - entranceScore(world, building, b.cell, b.side, existing, service));
      const picked = candidates[0];
      return makeDoor(world, building, picked.cell, picked.side, true, doorStyle(building, service));
    }
    function ownerIndex(world) {
      const owners = /* @__PURE__ */ new Map();
      for (const building of world.buildings || []) {
        for (const cell of building.cells || []) owners.set(keyOf(cell.x, cell.y), building.id);
      }
      return owners;
    }
    function repairExteriorDoor(world, building, door, cells, owners) {
      const cell = { x: door.x, y: door.y };
      let sides = boundarySides(cell, cells, true, building);
      if (!sides.length) sides = boundarySides(cell, cells);
      if (sides.length && !sides.includes(door.side)) door.side = sides[0];
      const [dx, dy] = DIR[door.side] || DIR.north;
      door.orientation = door.side === "north" || door.side === "south" ? "horizontal" : "vertical";
      door.exterior = true;
      setTile2(world, door.x, door.y, TILE2.FLOOR);
      const corridor = [{ x: door.x, y: door.y }];
      const insideX = door.x - dx;
      const insideY = door.y - dy;
      if (cells.has(keyOf(insideX, insideY))) setTile2(world, insideX, insideY, TILE2.FLOOR);
      const tangentX = -dy;
      const tangentY = dx;
      for (let step = 1; step <= 14; step += 1) {
        const x = door.x + dx * step;
        const y = door.y + dy * step;
        if (!inBounds2(world, x, y)) break;
        const owner = owners.get(keyOf(x, y));
        if (owner && owner !== building.id) break;
        const tile = getTile2(world, x, y);
        corridor.push({ x, y });
        if (tile === TILE2.ROAD) break;
        if (step === 1) setTile2(world, x, y, TILE2.FLOOR);
        else if (tile === TILE2.TREE || tile === TILE2.WATER) setTile2(world, x, y, TILE2.GRASS);
        for (const offset of [-1, 1]) {
          const sx = x + tangentX * offset;
          const sy = y + tangentY * offset;
          if (owners.has(keyOf(sx, sy))) continue;
          const sideTile = getTile2(world, sx, sy);
          if (sideTile === TILE2.TREE || sideTile === TILE2.WATER) setTile2(world, sx, sy, TILE2.GRASS);
        }
      }
      return corridor;
    }
    function floodFloors(world, cells, startKeys) {
      const reached = /* @__PURE__ */ new Set();
      const queue = [];
      for (const key2 of startKeys) {
        if (!cells.has(key2)) continue;
        const [x, y] = key2.split(",").map(Number);
        if (getTile2(world, x, y) !== TILE2.FLOOR) continue;
        reached.add(key2);
        queue.push({ x, y });
      }
      while (queue.length) {
        const cell = queue.shift();
        for (const [dx, dy] of Object.values(DIR)) {
          const x = cell.x + dx;
          const y = cell.y + dy;
          const key2 = keyOf(x, y);
          if (reached.has(key2) || !cells.has(key2) || getTile2(world, x, y) !== TILE2.FLOOR) continue;
          reached.add(key2);
          queue.push({ x, y });
        }
      }
      return reached;
    }
    function connectInteriorRooms(world, building, cells, report) {
      const floors = () => (building.cells || []).filter((cell) => getTile2(world, cell.x, cell.y) === TILE2.FLOOR);
      const exterior = (building.doors || []).filter((door) => door.exterior);
      const starts = exterior.length ? [keyOf(exterior[0].x, exterior[0].y)] : floors().slice(0, 1).map((cell) => keyOf(cell.x, cell.y));
      let reached = floodFloors(world, cells, starts);
      for (let pass = 0; pass < 8; pass += 1) {
        const allFloors = floors();
        const unreachable = new Set(allFloors.map((cell) => keyOf(cell.x, cell.y)).filter((key2) => !reached.has(key2)));
        if (!unreachable.size) break;
        let bridge = null;
        for (const wall of building.cells || []) {
          if (getTile2(world, wall.x, wall.y) !== TILE2.WALL) continue;
          let touchesReached = false;
          let touchesUnreachable = false;
          let reachedNeighbor = null;
          for (const [side, [dx, dy]] of Object.entries(DIR)) {
            const neighbor = keyOf(wall.x + dx, wall.y + dy);
            if (reached.has(neighbor)) {
              touchesReached = true;
              reachedNeighbor = side;
            }
            if (unreachable.has(neighbor)) touchesUnreachable = true;
          }
          if (touchesReached && touchesUnreachable) {
            bridge = { wall, side: reachedNeighbor || "north" };
            break;
          }
        }
        if (!bridge) break;
        makeDoor(world, building, bridge.wall, bridge.side, false, "interior");
        report.interiorDoors += 1;
        reached = floodFloors(world, cells, starts);
      }
    }
    function relocateBlockedContainers(world, building, report) {
      const tileSize = world.tileSize || 32;
      const doors = building.doors || [];
      const containers = (world.containers || []).filter((container) => container.buildingId === building.id);
      const occupied = new Set(containers.map((container) => keyOf(Math.floor(container.x / tileSize), Math.floor(container.y / tileSize))));
      for (const container of containers) {
        const tx = Math.floor(container.x / tileSize);
        const ty = Math.floor(container.y / tileSize);
        const blocked = doors.some((door) => Math.abs(door.x - tx) + Math.abs(door.y - ty) <= 1);
        if (!blocked) continue;
        occupied.delete(keyOf(tx, ty));
        const target = (building.cells || []).find(
          (cell) => getTile2(world, cell.x, cell.y) === TILE2.FLOOR && doors.every((door) => Math.abs(door.x - cell.x) + Math.abs(door.y - cell.y) >= 3) && !occupied.has(keyOf(cell.x, cell.y))
        );
        if (!target) {
          occupied.add(keyOf(tx, ty));
          continue;
        }
        container.x = (target.x + 0.5) * tileSize;
        container.y = (target.y + 0.5) * tileSize;
        occupied.add(keyOf(target.x, target.y));
        report.furnitureMoved += 1;
      }
    }
    function carOverlapsCell(car, cell, tileSize) {
      const x = (cell.x + 0.5) * tileSize;
      const y = (cell.y + 0.5) * tileSize;
      return Math.abs(car.x - x) < car.w / 2 + tileSize * 0.55 && Math.abs(car.y - y) < car.h / 2 + tileSize * 0.55;
    }
    function relocateBlockedCars(world, corridors, report) {
      const tileSize = world.tileSize || 32;
      for (const car of world.cars || []) {
        if (!corridors.some((cell) => carOverlapsCell(car, cell, tileSize))) continue;
        const originX = Math.floor(car.x / tileSize);
        const originY = Math.floor(car.y / tileSize);
        let target = null;
        for (let radius = 2; radius <= 9 && !target; radius += 1) {
          for (let oy = -radius; oy <= radius && !target; oy += 1) {
            for (let ox = -radius; ox <= radius; ox += 1) {
              if (Math.abs(ox) !== radius && Math.abs(oy) !== radius) continue;
              const tx = originX + ox;
              const ty = originY + oy;
              if (getTile2(world, tx, ty) !== TILE2.ROAD) continue;
              if (corridors.some((cell) => Math.hypot(cell.x - tx, cell.y - ty) < 2.5)) continue;
              const x = (tx + 0.5) * tileSize;
              const y = (ty + 0.5) * tileSize;
              const occupied = (world.cars || []).some((other) => other !== car && Math.abs(other.x - x) < (other.w + car.w) / 2 && Math.abs(other.y - y) < (other.h + car.h) / 2);
              if (!occupied) {
                target = { x, y };
                break;
              }
            }
          }
        }
        if (!target) continue;
        car.x = target.x;
        car.y = target.y;
        report.carsMoved += 1;
      }
    }
    function repairBuilding(world, building, owners, report) {
      if (!building?.cells?.length || building.__accessRepairVersion === REPAIR_VERSION) return false;
      building.doors || (building.doors = []);
      const cells = buildingSet(building);
      let changed = false;
      let exterior = building.doors.filter((door) => door.exterior);
      if (!exterior.length) {
        const added = addBestExteriorDoor(world, building, cells, false);
        if (added) {
          exterior.push(added);
          report.exteriorDoors += 1;
          changed = true;
        }
      }
      if (MAJOR.has(building.type) && exterior.length < 2 && building.w >= 7 && building.h >= 7) {
        const added = addBestExteriorDoor(world, building, cells, true);
        if (added) {
          exterior.push(added);
          report.serviceDoors += 1;
          changed = true;
        }
      }
      const corridors = [];
      for (const door of exterior) {
        const oldSide = door.side;
        corridors.push(...repairExteriorDoor(world, building, door, cells, owners));
        if (door.side !== oldSide) {
          report.doorSidesFixed += 1;
          changed = true;
        }
      }
      const beforeDoors = building.doors.length;
      connectInteriorRooms(world, building, cells, report);
      if (building.doors.length !== beforeDoors) changed = true;
      relocateBlockedContainers(world, building, report);
      building.__entranceCorridors = corridors;
      building.__accessRepairVersion = REPAIR_VERSION;
      report.buildings += 1;
      return changed;
    }
    function repairWorld(game, announce = false) {
      const world = game.world;
      if (!world?.buildings) return null;
      const report = { buildings: 0, exteriorDoors: 0, serviceDoors: 0, interiorDoors: 0, doorSidesFixed: 0, furnitureMoved: 0, carsMoved: 0 };
      const owners = ownerIndex(world);
      let reindex = false;
      const allCorridors = [];
      for (const building of world.buildings) {
        reindex = repairBuilding(world, building, owners, report) || reindex;
        if (building.__entranceCorridors) allCorridors.push(...building.__entranceCorridors);
      }
      relocateBlockedCars(world, allCorridors, report);
      if (reindex && typeof game.indexWorld === "function") game.indexWorld();
      game.__buildingAccessReport = report;
      if (announce && report.buildings) {
        game.toast?.(`Access repaired: ${report.buildings} buildings, ${report.serviceDoors + report.exteriorDoors} new exits.`, "");
      }
      return report;
    }
    function findSafePlayerSpot(game, maxRadius = 72) {
      const player = game.player;
      if (!player || typeof game.circleBlocked !== "function") return false;
      if (!game.circleBlocked(player.x, player.y, player.radius, true)) return false;
      const originX = player.x;
      const originY = player.y;
      for (let radius = 4; radius <= maxRadius; radius += 4) {
        const samples = Math.max(12, Math.ceil(radius / 3));
        for (let index = 0; index < samples; index += 1) {
          const angle = index / samples * Math.PI * 2;
          const x = originX + Math.cos(angle) * radius;
          const y = originY + Math.sin(angle) * radius;
          if (!game.circleBlocked(x, y, player.radius, true)) {
            player.x = x;
            player.y = y;
            if (game.camera) {
              game.camera.x = x;
              game.camera.y = y;
            }
            return true;
          }
        }
      }
      return false;
    }
    function install(game) {
      if (!game || game.__playerBuildingAccessFixInstalled) return;
      game.__playerBuildingAccessFixInstalled = true;
      const priorNpcCombat = Boolean(game.__npcCharacterUpgradeInstalled);
      const originalMakePlayer = typeof game.makePlayer === "function" ? game.makePlayer.bind(game) : null;
      if (originalMakePlayer) game.makePlayer = function smallerPlayerBody(...args) {
        const player = originalMakePlayer(...args);
        player.radius = 7.5;
        return player;
      };
      if (game.player) game.player.radius = 7.5;
      const previousDrawPlayer = typeof game.drawPlayer === "function" ? game.drawPlayer.bind(game) : null;
      if (previousDrawPlayer) game.drawPlayer = function slightlySmallerPlayer(ctx, shakeX = 0, shakeY = 0) {
        const screen = this.worldToScreen(this.player.x, this.player.y, shakeX, shakeY);
        ctx.save();
        ctx.translate(screen.x, screen.y);
        ctx.scale(0.9, 0.9);
        ctx.translate(-screen.x, -screen.y);
        previousDrawPlayer(ctx, shakeX, shakeY);
        ctx.restore();
      };
      const originalMoveCircle = typeof game.moveCircle === "function" ? game.moveCircle.bind(game) : null;
      if (originalMoveCircle) game.moveCircle = function cornerSlidingMove(entity, amountX, amountY, includeStructures = false) {
        if (entity !== this.player) return originalMoveCircle(entity, amountX, amountY, includeStructures);
        const oldX = entity.x;
        const oldY = entity.y;
        originalMoveCircle(entity, amountX, amountY, includeStructures);
        const expected = Math.hypot(amountX, amountY);
        let moved = Math.hypot(entity.x - oldX, entity.y - oldY);
        if (expected < 0.25 || moved >= expected * 0.28) return;
        const length = expected || 1;
        const perpendicularX = -amountY / length;
        const perpendicularY = amountX / length;
        for (const nudge of [3, -3, 6, -6]) {
          const x = oldX + perpendicularX * nudge;
          const y = oldY + perpendicularY * nudge;
          if (this.circleBlocked?.(x, y, entity.radius, includeStructures)) continue;
          entity.x = x;
          entity.y = y;
          originalMoveCircle(entity, amountX, amountY, includeStructures);
          moved = Math.hypot(entity.x - oldX, entity.y - oldY);
          if (moved >= expected * 0.28) return;
        }
        entity.x = oldX;
        entity.y = oldY;
        originalMoveCircle(entity, amountX, amountY, includeStructures);
      };
      const originalUpdatePlayer = typeof game.updatePlayer === "function" ? game.updatePlayer.bind(game) : null;
      if (originalUpdatePlayer) game.updatePlayer = function playerUnstuckUpdate(dt) {
        const oldX = this.player?.x;
        const oldY = this.player?.y;
        originalUpdatePlayer(dt);
        if (!this.player) return;
        this.player.radius = 7.5;
        const moved = Math.hypot(this.player.x - oldX, this.player.y - oldY);
        if (this.player.movingNow && moved < 0.035) this.player.__stuckTime = (this.player.__stuckTime || 0) + dt;
        else this.player.__stuckTime = Math.max(0, (this.player.__stuckTime || 0) - dt * 2);
        if (this.circleBlocked?.(this.player.x, this.player.y, this.player.radius, true) || this.player.__stuckTime > 0.55) {
          const fixed = findSafePlayerSpot(this, this.player.__stuckTime > 0.55 ? 18 : 72);
          if (fixed) this.player.__stuckTime = 0;
        }
      };
      const originalStreaming = typeof game.updateWorldStreaming === "function" ? game.updateWorldStreaming.bind(game) : null;
      if (originalStreaming) game.updateWorldStreaming = function repairedStreaming(force = false) {
        const previousChunk = this.lastStreamChunk;
        const result = originalStreaming(force);
        if (force || previousChunk !== this.lastStreamChunk) repairWorld(this, false);
        return result;
      };
      game.repairBuildingAccess = (announce = true) => repairWorld(game, announce);
      const originalAimVector = typeof game.aimVector === "function" ? game.aimVector.bind(game) : null;
      if (originalAimVector) game.aimVector = function neutralCapableAim() {
        const baseAim = originalAimVector();
        const pointerFine = this.input?.pointer?.active && typeof matchMedia === "function" && !matchMedia("(pointer: coarse)").matches;
        if (pointerFine || !this.player) return baseAim;
        const equipped = WEAPONS[this.player.equipped || "fists"] || WEAPONS.fists;
        const maxRange = equipped[0] === "ranged" ? equipped[2] : equipped[2] + 24;
        let threatDistance = Infinity;
        for (const zombie of this.zombies || []) if (!zombie.dead) threatDistance = Math.min(threatDistance, distance2(zombie, this.player));
        for (const survivor of this.survivors || []) {
          if (!survivor.dead && (survivor.attitude === "aggressive" || survivor.provoked)) threatDistance = Math.min(threatDistance, distance2(survivor, this.player));
        }
        let target = null;
        let best = maxRange;
        for (const survivor of this.survivors || []) {
          if (survivor.dead || survivor.attitude !== "neutral" || survivor.provoked) continue;
          const dx2 = survivor.x - this.player.x;
          const dy2 = survivor.y - this.player.y;
          const d = Math.hypot(dx2, dy2) || 1;
          const facingDot = dx2 / d * (this.player.facingX || 1) + dy2 / d * (this.player.facingY || 0);
          if (d < best && d < threatDistance && facingDot > 0.28 && (!this.hasVision || this.hasVision(this.player, survivor))) {
            best = d;
            target = survivor;
          }
        }
        if (!target) return baseAim;
        const dx = target.x - this.player.x;
        const dy = target.y - this.player.y;
        const length = Math.hypot(dx, dy) || 1;
        return { x: dx / length, y: dy / length };
      };
      const originalDamageSurvivor = typeof game.damageSurvivor === "function" ? game.damageSurvivor.bind(game) : null;
      const originalAttack = typeof game.attack === "function" ? game.attack.bind(game) : null;
      if (originalAttack && originalDamageSurvivor) game.attack = function survivorFriendlyFire(...args) {
        const oldCooldown = this.player.attackCooldown || 0;
        const oldAnim = this.player.attackAnim || 0;
        originalAttack(...args);
        if (oldCooldown > 0 || (this.player.attackAnim || 0) <= oldAnim) return;
        const equipped = WEAPONS[this.player.equipped || "fists"] || WEAPONS.fists;
        const [mode, damage, range] = equipped;
        const aimX = this.player.facingX || 1;
        const aimY = this.player.facingY || 0;
        let target = null;
        let best = range + 22;
        for (const survivor of this.survivors || []) {
          if (survivor.dead) continue;
          const firstNeutralHit = survivor.attitude === "neutral" && !survivor.provoked;
          const fallbackHostileHit = !priorNpcCombat && (survivor.attitude === "aggressive" || survivor.provoked);
          if (!firstNeutralHit && !fallbackHostileHit) continue;
          const dx = survivor.x - this.player.x;
          const dy = survivor.y - this.player.y;
          const d = Math.hypot(dx, dy) || 1;
          if (d > best) continue;
          const dot = dx / d * aimX + dy / d * aimY;
          if (dot < (mode === "ranged" ? 0.975 : 0.18) || this.hasVision && !this.hasVision(this.player, survivor)) continue;
          target = survivor;
          best = d;
        }
        if (!target) return;
        if (mode === "ranged") {
          for (const zombie of this.zombies || []) {
            if (zombie.dead) continue;
            const dx = zombie.x - this.player.x;
            const dy = zombie.y - this.player.y;
            const d = Math.hypot(dx, dy) || 1;
            if (d < best && dx / d * aimX + dy / d * aimY > 0.975) return;
          }
        }
        originalDamageSurvivor(target, damage * (mode === "ranged" ? 0.9 : 1), null);
        if (!target.dead) {
          target.provoked = true;
          target.hostile = true;
          target.state = "hostile";
          target.__targetKind = "player";
          target.__decision = 0.3;
          target.speech = "That was your last warning.";
          target.speechTimer = 6;
          this.toast?.(`${target.name || "The survivor"} is now hostile.`, "danger");
        }
      };
      const originalUpdateSurvivors = typeof game.updateSurvivors === "function" ? game.updateSurvivors.bind(game) : null;
      if (originalUpdateSurvivors && priorNpcCombat) game.updateSurvivors = function provokedNeutralUpdate(dt) {
        for (const survivor of this.survivors || []) {
          if (!survivor.dead && survivor.attitude === "neutral" && survivor.provoked) {
            survivor.__targetKind = "player";
            survivor.state = "hostile";
            survivor.__decision = Math.max(0.22, survivor.__decision || 0);
          }
        }
        const result = originalUpdateSurvivors(dt);
        for (const survivor of this.survivors || []) {
          if (!survivor.dead && survivor.attitude === "neutral" && survivor.provoked) {
            survivor.__targetKind = "player";
            survivor.state = "hostile";
            survivor.__decision = Math.max(0.22, survivor.__decision || 0);
          }
        }
        return result;
      };
      const originalStartNew = typeof game.startNew === "function" ? game.startNew.bind(game) : null;
      if (originalStartNew) game.startNew = function accessFixedStart(...args) {
        const result = originalStartNew(...args);
        if (this.player) this.player.radius = 7.5;
        repairWorld(this, true);
        findSafePlayerSpot(this, 72);
        return result;
      };
      const originalLoadSaved = typeof game.loadSaved === "function" ? game.loadSaved.bind(game) : null;
      if (originalLoadSaved) game.loadSaved = function accessFixedLoad(...args) {
        const result = originalLoadSaved(...args);
        if (this.player) this.player.radius = 7.5;
        repairWorld(this, true);
        findSafePlayerSpot(this, 72);
        return result;
      };
      if (game.world) repairWorld(game, false);
      game.toast?.("Player collision and building-access repair installed.");
    }
    if (window.__walkers) install(window.__walkers);
    else window.addEventListener("load", () => install(window.__walkers), { once: true });
  })();
})();
