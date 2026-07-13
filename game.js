(() => {
  // src/data.js
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
    bat: { name: "Baseball bat", icon: "BAT", kind: "weapon", mode: "melee", damage: 22, range: 58, cooldown: 0.62, noise: 42, staminaCost: 13, weight: 1.4, maxStack: 1, description: "Reliable blunt force." },
    axe: { name: "Fire axe", icon: "AXE", kind: "weapon", mode: "melee", damage: 36, range: 62, cooldown: 0.82, noise: 48, staminaCost: 17, weight: 2.2, maxStack: 1, description: "Heavy, exhausting, devastating." },
    pistol: { name: "9 mm pistol", icon: "9MM", kind: "weapon", mode: "ranged", damage: 42, range: 560, cooldown: 0.32, noise: 520, ammo: "ammo9", weight: 1.1, maxStack: 1, description: "Accurate enough. Every shot calls the dead." },
    shotgun: { name: "Pump shotgun", icon: "12G", kind: "weapon", mode: "ranged", damage: 32, pellets: 6, spread: 0.18, range: 390, cooldown: 0.95, noise: 760, ammo: "shell", weight: 3.2, maxStack: 1, description: "A room clearer and horde caller." },
    ammo9: { name: "9 mm rounds", icon: "9MM", kind: "ammo", weight: 0.03, maxStack: 30, description: "Pistol ammunition." },
    shell: { name: "12-gauge shells", icon: "12G", kind: "ammo", weight: 0.06, maxStack: 16, description: "Shotgun ammunition." },
    backpack: { name: "Hiking backpack", icon: "PACK", kind: "gear", capacity: 12, weight: 0.8, maxStack: 1, description: "Adds 12 kg of carrying capacity." },
    flashlight: { name: "Flashlight", icon: "LITE", kind: "gear", light: true, weight: 0.4, maxStack: 1, description: "A narrow beam for blacked-out rooms." }
  });
  var BUILDING_TYPES = Object.freeze({
    house: { name: "Residence", color: "#5a554b", loot: "home" },
    store: { name: "Market", color: "#585247", loot: "store" },
    clinic: { name: "Urgent Care", color: "#51605d", loot: "medical" },
    police: { name: "Sheriff Annex", color: "#4a525b", loot: "police" },
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
      ["bat", 1],
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
      ["shotgun", 0.8],
      ["ammo9", 8],
      ["shell", 4],
      ["bandage", 2],
      ["bat", 2],
      ["flashlight", 3]
    ],
    tools: [
      ["plank", 7],
      ["nails", 7],
      ["scrap", 5],
      ["axe", 1.4],
      ["bat", 2],
      ["rag", 2]
    ],
    car: [
      ["water", 2],
      ["jerky", 2],
      ["rag", 3],
      ["scrap", 4],
      ["bat", 0.8],
      ["ammo9", 0.5]
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

  // src/input.js
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

  // src/rng.js
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

  // src/world.js
  var TILE = Object.freeze({
    GRASS: 0,
    ROAD: 1,
    FLOOR: 2,
    WALL: 3,
    WATER: 4,
    TREE: 5
  });
  var DEFAULT_WORLD_SIZE = 144;
  var TILE_SIZE = 32;
  function tileIndex(world, x, y) {
    return y * world.width + x;
  }
  function inBounds(world, x, y) {
    return x >= 0 && y >= 0 && x < world.width && y < world.height;
  }
  function getTile(world, x, y) {
    if (!inBounds(world, x, y)) return TILE.WALL;
    return world.tiles[tileIndex(world, x, y)];
  }
  function setTile(world, x, y, tile) {
    if (inBounds(world, x, y)) world.tiles[tileIndex(world, x, y)] = tile;
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
  function chooseBuildingType(rng, distanceFromCenter) {
    const roll = rng.float();
    if (roll < 0.08 && distanceFromCenter < 0.55) return "clinic";
    if (roll < 0.15 && distanceFromCenter < 0.6) return "police";
    if (roll < 0.32) return "store";
    if (roll < 0.48 && distanceFromCenter > 0.35) return "warehouse";
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
      const stackable = ["ammo9", "shell", "nails", "rag", "plank", "scrap", "bandage"].includes(id);
      const qty = stackable ? rng.int(1, id === "ammo9" ? 9 : 3) : 1;
      const existing = entries.find((entry) => entry.id === id);
      if (existing) existing.qty += qty;
      else entries.push({ id, qty });
    }
    return entries;
  }
  function addBuilding(world, rng, rect, type) {
    const id = `b${world.buildings.length}`;
    const building = {
      id,
      type,
      name: BUILDING_TYPES[type].name,
      ...rect,
      doors: [],
      windows: []
    };
    for (let y = rect.y; y < rect.y + rect.h; y += 1) {
      for (let x = rect.x; x < rect.x + rect.w; x += 1) {
        const perimeter = x === rect.x || y === rect.y || x === rect.x + rect.w - 1 || y === rect.y + rect.h - 1;
        setTile(world, x, y, perimeter ? TILE.WALL : TILE.FLOOR);
      }
    }
    const side = rng.pick(["north", "south", "east", "west"]);
    let door;
    if (side === "north") door = { x: rect.x + Math.floor(rect.w / 2), y: rect.y };
    if (side === "south") door = { x: rect.x + Math.floor(rect.w / 2), y: rect.y + rect.h - 1 };
    if (side === "west") door = { x: rect.x, y: rect.y + Math.floor(rect.h / 2) };
    if (side === "east") door = { x: rect.x + rect.w - 1, y: rect.y + Math.floor(rect.h / 2) };
    setTile(world, door.x, door.y, TILE.FLOOR);
    building.doors.push(door);
    const windowCount = Math.max(2, Math.floor((rect.w + rect.h) / 5));
    for (let i = 0; i < windowCount; i += 1) {
      const windowSide = i % 2 ? "horizontal" : "vertical";
      let window2;
      if (windowSide === "horizontal") {
        window2 = { x: rng.int(rect.x + 1, rect.x + rect.w - 2), y: rng.chance(0.5) ? rect.y : rect.y + rect.h - 1 };
      } else {
        window2 = { x: rng.chance(0.5) ? rect.x : rect.x + rect.w - 1, y: rng.int(rect.y + 1, rect.y + rect.h - 2) };
      }
      if (window2.x !== door.x || window2.y !== door.y) building.windows.push(window2);
    }
    const containerCount = type === "warehouse" ? rng.int(3, 6) : rng.int(2, 4);
    for (let i = 0; i < containerCount; i += 1) {
      const tx = rng.int(rect.x + 1, rect.x + rect.w - 2);
      const ty = rng.int(rect.y + 1, rect.y + rect.h - 2);
      world.containers.push({
        id: `${id}-c${i}`,
        buildingId: id,
        x: (tx + 0.5) * world.tileSize,
        y: (ty + 0.5) * world.tileSize,
        kind: type === "house" && i === 0 ? "fridge" : type === "warehouse" ? "crate" : "cabinet",
        searched: false,
        loot: createLoot(rng, BUILDING_TYPES[type].loot, 1, type === "police" ? 5 : 4)
      });
    }
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
          addBuilding(world, rng, rect, chooseBuildingType(rng, distance2));
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
    const count = rng.int(18, 30);
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
      return {
        x: (building.x + Math.floor(building.w / 2) + 0.5) * world.tileSize,
        y: (building.y + Math.floor(building.h / 2) + 0.5) * world.tileSize,
        buildingId: building.id
      };
    }
    return { x: cx * world.tileSize, y: cy * world.tileSize, buildingId: null };
  }
  function spawnZombies(world, rng) {
    const total = Math.floor(world.width * world.height / 180);
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
        speed: rng.float(32, 49),
        health: rng.int(45, 68),
        hue: rng.int(-8, 8)
      });
    }
  }
  function generateWorld(seed, size = DEFAULT_WORLD_SIZE) {
    const safeSize = Math.max(72, Math.min(240, Math.floor(size)));
    const rng = new RNG(seed);
    const world = {
      version: 1,
      seed: rng.seed,
      width: safeSize,
      height: safeSize,
      tileSize: TILE_SIZE,
      tiles: new Uint8Array(safeSize * safeSize),
      buildings: [],
      containers: [],
      cars: [],
      zombieSpawns: [],
      spawn: null,
      roadX: [],
      roadY: []
    };
    for (let i = 0; i < rng.int(2, 4); i += 1) carvePond(world, rng);
    world.roadX = roadPositions(rng, safeSize);
    world.roadY = roadPositions(rng, safeSize);
    markRoads(world, world.roadX, world.roadY);
    generateBlocks(world, rng, world.roadX, world.roadY);
    scatterNature(world, rng);
    addCars(world, rng, world.roadX, world.roadY);
    world.spawn = findSpawn(world);
    spawnZombies(world, rng);
    return world;
  }

  // src/pathfinding.js
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
  function findPath(world, startX, startY, goalX, goalY, maxVisited = 1800) {
    const sx = Math.floor(startX);
    const sy = Math.floor(startY);
    const gx = Math.floor(goalX);
    const gy = Math.floor(goalY);
    if (!inBounds(world, sx, sy) || !inBounds(world, gx, gy) || isSolidTile(getTile(world, gx, gy))) return [];
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
        if (!inBounds(world, nx, ny) || closed.has(nextKey) || isSolidTile(getTile(world, nx, ny))) continue;
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
      const tile = getTile(world, Math.floor(x / world.tileSize), Math.floor(y / world.tileSize));
      if (blockingPredicate(tile)) return false;
    }
    return true;
  }

  // src/game.js
  var SAVE_KEY = "hollow-county-save-v1";
  var SAVE_VERSION = 1;
  var FISTS = { name: "Bare hands", mode: "melee", damage: 7, range: 40, cooldown: 0.48, noise: 25, staminaCost: 9 };
  var STREET_NAMES = ["Mercy", "Harrow", "Cinder", "Morrow", "Stillwater", "Rook", "Lantern", "Graves", "Hollow", "Ash"];
  var WEATHER = ["OVERCAST", "LIGHT RAIN", "COLD WIND", "LOW FOG", "CLEARING"];
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
      this.structures = [];
      this.noises = [];
      this.effects = [];
      this.blood = [];
      this.camera = { x: 0, y: 0, shake: 0 };
      this.timeMinutes = 8 * 60;
      this.day = 1;
      this.weather = "OVERCAST";
      this.lastFrame = performance.now();
      this.uiTimer = 0;
      this.mapTimer = 0;
      this.saveTimer = 0;
      this.spawnTimer = 32;
      this.nearestInteractable = null;
      this.openContainer = null;
      this.selectedInventoryIndex = -1;
      this.panelOpen = null;
      this.buildMode = null;
      this.attackHeld = false;
      this.windowTiles = /* @__PURE__ */ new Set();
      this.doorTiles = /* @__PURE__ */ new Set();
      this.buildingLookup = /* @__PURE__ */ new Map();
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
      $("#takeAllBtn").addEventListener("click", () => this.takeAllLoot());
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
      this.structures = [];
      this.noises = [];
      this.effects = [];
      this.blood = [];
      this.timeMinutes = 8 * 60;
      this.day = 1;
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
        radius: 11,
        facingX: 1,
        facingY: 0,
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
        kills: 0,
        distanceWalked: 0,
        flashlight: false
      };
    }
    makeZombie(spawn) {
      return {
        ...spawn,
        radius: 12,
        maxHealth: spawn.health,
        state: "wander",
        targetX: spawn.x,
        targetY: spawn.y,
        wanderTimer: Math.random() * 3,
        senseTimer: Math.random() * 0.25,
        pathTimer: 0,
        path: [],
        memory: 0,
        attackCooldown: 0,
        hitFlash: 0,
        dead: false,
        angle: Math.random() * Math.PI * 2
      };
    }
    indexWorld() {
      this.windowTiles.clear();
      this.doorTiles.clear();
      this.buildingLookup.clear();
      for (const building of this.world.buildings) {
        for (const window2 of building.windows) this.windowTiles.add(`${window2.x},${window2.y}`);
        for (const door of building.doors) this.doorTiles.add(`${door.x},${door.y}`);
        for (let y = building.y; y < building.y + building.h; y += 1) {
          for (let x = building.x; x < building.x + building.w; x += 1) {
            this.buildingLookup.set(`${x},${y}`, building);
          }
        }
      }
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
      this.updateSurvival(dt);
      this.updateZombies(dt);
      this.updateStructures(dt);
      this.updateEffects(dt);
      this.updateCamera(dt);
      this.uiTimer -= dt;
      this.mapTimer -= dt;
      this.saveTimer += dt;
      this.spawnTimer -= dt;
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
      if (this.player.health <= 0 || this.player.infection >= 100) this.die();
    }
    updatePlayer(dt) {
      const player = this.player;
      player.attackCooldown = Math.max(0, player.attackCooldown - dt);
      player.hurtCooldown = Math.max(0, player.hurtCooldown - dt);
      player.noiseCooldown = Math.max(0, player.noiseCooldown - dt);
      const move = this.input.movement();
      const moving = Math.hypot(move.x, move.y) > 0.05;
      const canSprint = this.input.sprinting && !player.crouching && player.stamina > 3 && moving;
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
      if (moving) {
        const beforeX = player.x;
        const beforeY = player.y;
        this.moveCircle(player, move.x * speed * dt, move.y * speed * dt, true);
        const moved = Math.hypot(player.x - beforeX, player.y - beforeY);
        player.distanceWalked += moved;
        if (!this.input.pointer.active || matchMedia("(pointer: coarse)").matches) {
          player.facingX = move.x;
          player.facingY = move.y;
        }
      }
      if (this.input.pointer.active && !matchMedia("(pointer: coarse)").matches) {
        const worldPoint = this.screenToWorld(this.input.pointer.x, this.input.pointer.y);
        const dx = worldPoint.x - player.x;
        const dy = worldPoint.y - player.y;
        const length = Math.hypot(dx, dy) || 1;
        player.facingX = dx / length;
        player.facingY = dy / length;
      }
      const equipped = ITEMS[player.equipped];
      if (this.attackHeld && equipped?.mode === "ranged" && player.attackCooldown <= 0) this.attack();
    }
    updateSurvival(dt) {
      const player = this.player;
      this.timeMinutes += dt * 3.25;
      if (this.timeMinutes >= 1440) {
        this.timeMinutes -= 1440;
        this.day += 1;
        this.toast(`Day ${this.day}. The county population is getting restless.`, "danger");
        this.updateObjective();
      }
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
    updateZombies(dt) {
      const player = this.player;
      const night = this.nightStrength();
      for (const zombie of this.zombies) {
        if (zombie.dead) continue;
        zombie.attackCooldown = Math.max(0, zombie.attackCooldown - dt);
        zombie.hitFlash = Math.max(0, zombie.hitFlash - dt);
        zombie.senseTimer -= dt;
        zombie.pathTimer -= dt;
        zombie.wanderTimer -= dt;
        zombie.memory = Math.max(0, zombie.memory - dt);
        const playerDistance = distance(zombie, player);
        if (zombie.senseTimer <= 0) {
          zombie.senseTimer = 0.18 + Math.random() * 0.16;
          const sightRange = (310 - night * 105) * (player.crouching ? 0.54 : 1) * (this.input.sprinting ? 1.18 : 1);
          const visible = playerDistance < sightRange && hasLineOfSight(this.world, zombie.x, zombie.y, player.x, player.y, blocksSight);
          if (visible) {
            zombie.state = "chase";
            zombie.targetX = player.x;
            zombie.targetY = player.y;
            zombie.memory = 6.5;
          } else if (zombie.state !== "chase" || zombie.memory <= 0) {
            const heard = this.loudestNoiseFor(zombie);
            if (heard) {
              zombie.state = "investigate";
              zombie.targetX = heard.x;
              zombie.targetY = heard.y;
              zombie.memory = 8;
            } else if (zombie.state !== "wander" && zombie.memory <= 0) {
              zombie.state = "wander";
              zombie.path = [];
            }
          }
        }
        if (zombie.state === "chase" && zombie.memory > 0) {
          if (playerDistance < 450 || hasLineOfSight(this.world, zombie.x, zombie.y, player.x, player.y, blocksSight)) {
            zombie.targetX = player.x;
            zombie.targetY = player.y;
          }
        }
        if (zombie.state === "wander" && zombie.wanderTimer <= 0) {
          zombie.wanderTimer = 2.5 + Math.random() * 4.5;
          zombie.angle += (Math.random() - 0.5) * Math.PI * 1.8;
          zombie.targetX = zombie.x + Math.cos(zombie.angle) * (80 + Math.random() * 130);
          zombie.targetY = zombie.y + Math.sin(zombie.angle) * (80 + Math.random() * 130);
        }
        if (playerDistance < 31) {
          zombie.state = "chase";
          zombie.memory = 7;
          if (zombie.attackCooldown <= 0) this.zombieAttack(zombie);
          continue;
        }
        if (playerDistance > 1250 && zombie.state === "wander") continue;
        let targetX = zombie.targetX;
        let targetY = zombie.targetY;
        const targetDistance = Math.hypot(targetX - zombie.x, targetY - zombie.y);
        if (targetDistance < 17 && zombie.state === "investigate") {
          zombie.state = "wander";
          zombie.memory = 0;
        }
        const direct = hasLineOfSight(this.world, zombie.x, zombie.y, targetX, targetY);
        if (!direct && zombie.pathTimer <= 0 && (zombie.state !== "wander" || playerDistance < 650)) {
          zombie.pathTimer = 1.25 + Math.random() * 0.8;
          zombie.path = findPath(
            this.world,
            zombie.x / TILE_SIZE,
            zombie.y / TILE_SIZE,
            targetX / TILE_SIZE,
            targetY / TILE_SIZE,
            950
          );
        }
        if (!direct && zombie.path.length) {
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
        const stateSpeed = zombie.state === "chase" ? 1.2 : zombie.state === "investigate" ? 1.04 : 0.58;
        const speed = zombie.speed * stateSpeed * (this.day > 2 ? 1.06 : 1);
        const oldX = zombie.x;
        const oldY = zombie.y;
        this.moveCircle(zombie, dx * speed * dt, dy * speed * dt, true);
        zombie.angle = Math.atan2(dy, dx);
        if (Math.hypot(zombie.x - oldX, zombie.y - oldY) < speed * dt * 0.18) {
          const barricade = this.structures.find((structure) => structure.type === "barricade" && this.circleRectOverlap(zombie.x, zombie.y, zombie.radius + 8, structure));
          if (barricade) {
            barricade.hp -= dt * (zombie.state === "chase" ? 15 : 5);
            if (Math.random() < dt * 2) this.emitNoise(barricade.x, barricade.y, 90, "wood impact");
          } else {
            const side = Math.random() < 0.5 ? -1 : 1;
            this.moveCircle(zombie, -dy * speed * dt * side, dx * speed * dt * side, true);
          }
        }
      }
      this.zombies = this.zombies.filter((zombie) => !zombie.remove);
    }
    zombieAttack(zombie) {
      zombie.attackCooldown = 0.9 + Math.random() * 0.4;
      if (this.player.hurtCooldown > 0) return;
      this.player.hurtCooldown = 0.48;
      const damage = 6 + Math.random() * 8;
      this.player.health = Math.max(0, this.player.health - damage);
      this.camera.shake = Math.max(this.camera.shake, 7);
      this.addBlood(this.player.x, this.player.y, 4);
      if (Math.random() < 0.28) {
        const infection = 4 + Math.random() * 13;
        const first = this.player.infection <= 0;
        this.player.infection = Math.min(100, this.player.infection + infection);
        if (first) this.toast("The bite broke skin. Infection risk detected.", "danger");
      } else {
        this.toast(`Zombie hit: -${Math.round(damage)} health`, "danger");
      }
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
          if (!isSolidTile(getTile(this.world, tx, ty))) continue;
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
        const reach = noise.radius * (1 - noise.age / noise.life);
        if (d > reach) continue;
        const candidate = reach - d;
        if (candidate > score) {
          score = candidate;
          best = noise;
        }
      }
      return best;
    }
    emitNoise(x, y, radius, type) {
      this.noises.push({ x, y, radius, type, age: 0, life: 1.8 });
      if (this.noises.length > 35) this.noises.shift();
    }
    aimVector() {
      if (!matchMedia("(pointer: coarse)").matches && this.input.pointer.active) {
        const target = this.screenToWorld(this.input.pointer.x, this.input.pointer.y);
        const dx = target.x - this.player.x;
        const dy = target.y - this.player.y;
        const length = Math.hypot(dx, dy) || 1;
        return { x: dx / length, y: dy / length };
      }
      const nearest = this.zombies.filter((zombie) => !zombie.dead && distance(zombie, this.player) < 560).sort((a, b) => distance(a, this.player) - distance(b, this.player))[0];
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
        const pellets = weapon.pellets || 1;
        for (let i = 0; i < pellets; i += 1) {
          const angle = Math.atan2(aim.y, aim.x) + (Math.random() - 0.5) * (weapon.spread || 0.035);
          this.traceShot(angle, weapon);
        }
        this.emitNoise(player.x, player.y, weapon.noise, weapon.name);
        this.camera.shake = weapon.pellets ? 10 : 5;
        this.effects.push({ type: "muzzle", x: player.x + aim.x * 18, y: player.y + aim.y * 18, life: 0.09, maxLife: 0.09 });
        this.updateHotbar();
      } else {
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
        this.effects.push({ type: "swing", x: player.x, y: player.y, angle: Math.atan2(aim.y, aim.x), life: 0.14, maxLife: 0.14, range: weapon.range });
      }
    }
    traceShot(angle, weapon) {
      const dx = Math.cos(angle);
      const dy = Math.sin(angle);
      let hit = null;
      let hitDistance = weapon.range;
      for (const zombie of this.zombies) {
        if (zombie.dead) continue;
        const zx = zombie.x - this.player.x;
        const zy = zombie.y - this.player.y;
        const along = zx * dx + zy * dy;
        if (along <= 0 || along > hitDistance) continue;
        const perpendicular = Math.abs(zx * dy - zy * dx);
        if (perpendicular <= zombie.radius + 4) {
          hit = zombie;
          hitDistance = along;
        }
      }
      const endX = this.player.x + dx * hitDistance;
      const endY = this.player.y + dy * hitDistance;
      this.effects.push({ type: "tracer", x: this.player.x, y: this.player.y, x2: endX, y2: endY, life: 0.08, maxLife: 0.08 });
      if (hit) {
        const falloff = 1 - hitDistance / weapon.range * 0.25;
        this.damageZombie(hit, weapon.damage * falloff, dx * 18, dy * 18);
      }
    }
    damageZombie(zombie, amount, knockX = 0, knockY = 0) {
      zombie.health -= amount;
      zombie.hitFlash = 0.1;
      zombie.x += knockX;
      zombie.y += knockY;
      zombie.state = "chase";
      zombie.targetX = this.player.x;
      zombie.targetY = this.player.y;
      zombie.memory = 9;
      this.addBlood(zombie.x, zombie.y, 3);
      if (zombie.health <= 0 && !zombie.dead) {
        zombie.dead = true;
        zombie.remove = false;
        this.player.kills += 1;
        this.addBlood(zombie.x, zombie.y, 8);
        this.effects.push({ type: "death", x: zombie.x, y: zombie.y, life: 8, maxLife: 8 });
        if (this.player.kills === 1) this.toast("First kill. The noise may bring more.");
        this.updateObjective();
      }
    }
    addBlood(x, y, count) {
      for (let i = 0; i < count; i += 1) {
        this.blood.push({ x: x + (Math.random() - 0.5) * 24, y: y + (Math.random() - 0.5) * 24, size: 2 + Math.random() * 6, alpha: 0.35 + Math.random() * 0.35 });
      }
      if (this.blood.length > 260) this.blood.splice(0, this.blood.length - 260);
    }
    nearestSearchable() {
      let closest = null;
      let best = 58;
      for (const container of this.world.containers) {
        const d = distance(container, this.player);
        if (d < best) {
          best = d;
          closest = { ...container, ref: container, source: "container" };
        }
      }
      for (const car of this.world.cars) {
        const d = distance(car, this.player);
        const edgeDistance = Math.max(0, d - Math.max(car.w, car.h) / 2);
        if (edgeDistance < best) {
          best = edgeDistance;
          closest = { ...car, ref: car, kind: "wrecked car", source: "car" };
        }
      }
      return closest;
    }
    interact() {
      if (this.mode !== "playing" || this.panelOpen) return;
      const searchable = this.nearestSearchable();
      if (!searchable) {
        this.toast("Nothing nearby to search.");
        return;
      }
      const ref = searchable.ref;
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
        row.addEventListener("click", () => this.takeLoot(index));
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
      for (let i = 0; i < count; i += 1) {
        const angle = Math.random() * Math.PI * 2;
        const radius = 650 + Math.random() * 340;
        const x = clamp(this.player.x + Math.cos(angle) * radius, 40, this.world.width * TILE_SIZE - 40);
        const y = clamp(this.player.y + Math.sin(angle) * radius, 40, this.world.height * TILE_SIZE - 40);
        if (isSolidTile(getTile(this.world, Math.floor(x / TILE_SIZE), Math.floor(y / TILE_SIZE)))) continue;
        this.zombies.push(this.makeZombie({ id: `h${Date.now()}-${i}`, x, y, speed: 35 + Math.random() * 17, health: 48 + Math.random() * 22, hue: 0 }));
      }
    }
    nightStrength() {
      const hour = this.timeMinutes / 60;
      if (hour >= 21 || hour < 5) return 0.88;
      if (hour >= 19) return (hour - 19) / 2 * 0.88;
      if (hour < 7) return (7 - hour) / 2 * 0.88;
      return 0;
    }
    updateHUD() {
      const player = this.player;
      const hour = Math.floor(this.timeMinutes / 60);
      const minute = Math.floor(this.timeMinutes % 60);
      $("#dayLabel").textContent = `DAY ${this.day}`;
      $("#timeLabel").textContent = `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
      $("#weatherLabel").textContent = this.weather;
      for (const [name, value] of Object.entries({ health: player.health, stamina: player.stamina, hunger: player.hunger, thirst: player.thirst, infection: player.infection })) {
        $(`#${name}Bar`).style.width = `${clamp(value, 0, 100)}%`;
        $(`#${name}Value`).textContent = String(Math.round(value));
      }
      $("#infectionVital").classList.toggle("hidden", player.infection <= 0.1);
    }
    updateInteractPrompt() {
      this.nearestInteractable = this.nearestSearchable();
      const prompt = $("#interactPrompt");
      if (!this.nearestInteractable || this.panelOpen || this.mode !== "playing") {
        prompt.classList.add("hidden");
        return;
      }
      prompt.classList.remove("hidden");
      prompt.querySelector("span").textContent = `${this.nearestInteractable.ref.searched ? "OPEN" : "SEARCH"} ${String(this.nearestInteractable.kind || "container").toUpperCase()}`;
    }
    updateLocation() {
      const tx = Math.floor(this.player.x / TILE_SIZE);
      const ty = Math.floor(this.player.y / TILE_SIZE);
      const building = this.buildingLookup.get(`${tx},${ty}`);
      if (building) {
        $("#locationLabel").textContent = building.name.toUpperCase();
        return;
      }
      let roadIndex = -1;
      let best = 4;
      this.world.roadX.forEach((road, index) => {
        const d = Math.abs(tx - road);
        if (d < best) {
          best = d;
          roadIndex = index;
        }
      });
      this.world.roadY.forEach((road, index) => {
        const d = Math.abs(ty - road);
        if (d < best) {
          best = d;
          roadIndex = index + 5;
        }
      });
      $("#locationLabel").textContent = roadIndex >= 0 ? `${STREET_NAMES[roadIndex % STREET_NAMES.length].toUpperCase()} ROAD` : "HOLLOW COUNTY";
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
      this.closeAllPanels();
      this.panelOpen = id;
      $(`#${id}`).classList.remove("hidden");
      if (id === "inventoryPanel") this.renderInventory();
      if (id === "craftPanel") this.renderRecipes();
    }
    closePanel(id) {
      $(`#${id}`).classList.add("hidden");
      if (this.panelOpen === id) this.panelOpen = null;
    }
    closeAllPanels() {
      ["inventoryPanel", "lootPanel", "craftPanel"].forEach((id) => $(`#${id}`).classList.add("hidden"));
      this.panelOpen = null;
      this.openContainer = null;
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
      const save = {
        version: SAVE_VERSION,
        savedAt: Date.now(),
        seed: this.world.seed,
        day: this.day,
        timeMinutes: this.timeMinutes,
        weather: this.weather,
        player: this.player,
        zombies: this.zombies.filter((zombie) => !zombie.dead).map(({ path, ...zombie }) => ({ ...zombie, path: [] })),
        structures: this.structures,
        containers: this.world.containers.map(({ id, searched, loot }) => ({ id, searched, loot })),
        cars: this.world.cars.map(({ id, searched, loot }) => ({ id, searched, loot })),
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
      if (!save || save.version !== SAVE_VERSION) {
        this.toastMenu("The save could not be loaded.");
        return;
      }
      this.world = generateWorld(save.seed);
      this.indexWorld();
      const containers = new Map(save.containers?.map((entry) => [entry.id, entry]) || []);
      for (const container of this.world.containers) Object.assign(container, containers.get(container.id) || {});
      const cars = new Map(save.cars?.map((entry) => [entry.id, entry]) || []);
      for (const car of this.world.cars) Object.assign(car, cars.get(car.id) || {});
      this.player = save.player;
      this.zombies = (save.zombies || []).map((zombie) => ({ ...this.makeZombie(zombie), ...zombie, path: [] }));
      this.structures = save.structures || [];
      this.blood = save.blood || [];
      this.noises = [];
      this.effects = [];
      this.day = save.day || 1;
      this.timeMinutes = save.timeMinutes ?? 480;
      this.weather = save.weather || "OVERCAST";
      this.stats = save.stats || { searched: 0 };
      this.camera.x = this.player.x;
      this.camera.y = this.player.y;
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
      this.toast(`Survivor loaded \u2014 Day ${this.day}.`);
    }
    refreshSaveSummary() {
      let save;
      try {
        save = JSON.parse(localStorage.getItem(SAVE_KEY));
      } catch {
        save = null;
      }
      const button = $("#continueBtn");
      if (!save || save.version !== SAVE_VERSION) {
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
      return { x: x + this.camera.x - this.viewWidth / 2, y: y + this.camera.y - this.viewHeight / 2 };
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
      ctx.save();
      ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
      ctx.fillStyle = "#111912";
      ctx.fillRect(0, 0, width, height);
      const minTileX = clamp(Math.floor((this.camera.x - width / 2) / TILE_SIZE) - 1, 0, this.world.width - 1);
      const maxTileX = clamp(Math.ceil((this.camera.x + width / 2) / TILE_SIZE) + 1, 0, this.world.width - 1);
      const minTileY = clamp(Math.floor((this.camera.y - height / 2) / TILE_SIZE) - 1, 0, this.world.height - 1);
      const maxTileY = clamp(Math.ceil((this.camera.y + height / 2) / TILE_SIZE) + 1, 0, this.world.height - 1);
      for (let ty = minTileY; ty <= maxTileY; ty += 1) {
        for (let tx = minTileX; tx <= maxTileX; tx += 1) this.drawTile(ctx, tx, ty, shakeX, shakeY);
      }
      for (const blood of this.blood) {
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
      this.drawPlayer(ctx, shakeX, shakeY);
      this.drawEffects(ctx, shakeX, shakeY, false);
      this.drawLighting(ctx);
      this.drawVignette(ctx);
      ctx.restore();
    }
    drawTile(ctx, tx, ty, shakeX, shakeY) {
      const tile = getTile(this.world, tx, ty);
      const p = this.worldToScreen(tx * TILE_SIZE, ty * TILE_SIZE, shakeX, shakeY);
      const variation = hash2D(tx, ty, this.world.seed);
      if (tile === TILE.GRASS) {
        ctx.fillStyle = variation > 0.62 ? "#263729" : variation > 0.28 ? "#223226" : "#1f2e22";
        ctx.fillRect(p.x, p.y, TILE_SIZE + 1, TILE_SIZE + 1);
        if (variation > 0.78) {
          ctx.strokeStyle = "rgba(123,145,108,.18)";
          ctx.beginPath();
          ctx.moveTo(p.x + 9, p.y + 23);
          ctx.lineTo(p.x + 7, p.y + 18);
          ctx.moveTo(p.x + 19, p.y + 12);
          ctx.lineTo(p.x + 21, p.y + 7);
          ctx.stroke();
        }
      } else if (tile === TILE.ROAD) {
        ctx.fillStyle = variation > 0.53 ? "#323735" : "#2e3431";
        ctx.fillRect(p.x, p.y, TILE_SIZE + 1, TILE_SIZE + 1);
        if ((tx + ty) % 11 === 0) {
          ctx.fillStyle = "rgba(8,10,9,.18)";
          ctx.fillRect(p.x + 3, p.y + 5, 17, 2);
        }
        if (this.world.roadX.includes(tx) && ty % 3 === 0) {
          ctx.fillStyle = "rgba(197,181,124,.25)";
          ctx.fillRect(p.x + 15, p.y + 4, 2, 16);
        }
        if (this.world.roadY.includes(ty) && tx % 3 === 0) {
          ctx.fillStyle = "rgba(197,181,124,.25)";
          ctx.fillRect(p.x + 4, p.y + 15, 16, 2);
        }
      } else if (tile === TILE.FLOOR) {
        ctx.fillStyle = variation > 0.5 ? "#6b675a" : "#625f54";
        ctx.fillRect(p.x, p.y, TILE_SIZE + 1, TILE_SIZE + 1);
        ctx.strokeStyle = "rgba(25,27,23,.2)";
        ctx.strokeRect(p.x, p.y, TILE_SIZE, TILE_SIZE);
        if (this.doorTiles.has(`${tx},${ty}`)) {
          ctx.fillStyle = "#4a3729";
          ctx.fillRect(p.x + 4, p.y + 12, 24, 8);
          ctx.fillStyle = "#b18b55";
          ctx.fillRect(p.x + 22, p.y + 14, 2, 2);
        }
      } else if (tile === TILE.WALL) {
        const building = this.buildingLookup.get(`${tx},${ty}`);
        ctx.fillStyle = building?.type === "clinic" ? "#53605d" : building?.type === "police" ? "#46515a" : building?.type === "warehouse" ? "#61584c" : "#554f46";
        ctx.fillRect(p.x, p.y, TILE_SIZE + 1, TILE_SIZE + 1);
        ctx.fillStyle = "rgba(232,228,207,.08)";
        ctx.fillRect(p.x, p.y, TILE_SIZE, 5);
        ctx.fillStyle = "rgba(0,0,0,.22)";
        ctx.fillRect(p.x, p.y + 25, TILE_SIZE, 7);
        if (this.windowTiles.has(`${tx},${ty}`)) {
          ctx.fillStyle = "#172429";
          ctx.fillRect(p.x + 7, p.y + 7, 18, 13);
          ctx.strokeStyle = "rgba(174,195,184,.28)";
          ctx.strokeRect(p.x + 7.5, p.y + 7.5, 17, 12);
          ctx.beginPath();
          ctx.moveTo(p.x + 16, p.y + 8);
          ctx.lineTo(p.x + 16, p.y + 19);
          ctx.stroke();
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
        ctx.fillStyle = "#1d2d20";
        ctx.fillRect(p.x, p.y, TILE_SIZE + 1, TILE_SIZE + 1);
        ctx.fillStyle = "#171b16";
        ctx.fillRect(p.x + 13, p.y + 17, 6, 15);
        ctx.fillStyle = variation > 0.5 ? "#29422d" : "#253b29";
        ctx.beginPath();
        ctx.arc(p.x + 16, p.y + 14, 15, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "rgba(102,132,91,.15)";
        ctx.beginPath();
        ctx.arc(p.x + 11, p.y + 9, 8, 0, Math.PI * 2);
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
        const p = this.worldToScreen(container.x, container.y, shakeX, shakeY);
        if (p.x < -30 || p.y < -30 || p.x > this.viewWidth + 30 || p.y > this.viewHeight + 30) continue;
        ctx.fillStyle = container.kind === "fridge" ? "#a4a699" : container.kind === "crate" ? "#604a34" : "#3d362e";
        ctx.fillRect(p.x - 9, p.y - 9, 18, 18);
        ctx.strokeStyle = container.searched ? "rgba(74,82,74,.6)" : "rgba(210,195,148,.34)";
        ctx.strokeRect(p.x - 8.5, p.y - 8.5, 17, 17);
        if (!container.searched) {
          ctx.fillStyle = "#c6b16b";
          ctx.fillRect(p.x - 1, p.y - 2, 2, 4);
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
    drawZombies(ctx, shakeX, shakeY) {
      for (const zombie of this.zombies) {
        const p = this.worldToScreen(zombie.x, zombie.y, shakeX, shakeY);
        if (p.x < -40 || p.y < -40 || p.x > this.viewWidth + 40 || p.y > this.viewHeight + 40) continue;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(zombie.angle + Math.PI / 2);
        if (zombie.dead) {
          ctx.rotate(1.2);
          ctx.globalAlpha = 0.65;
        }
        ctx.fillStyle = "rgba(0,0,0,.28)";
        ctx.beginPath();
        ctx.ellipse(3, 8, 13, 7, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = zombie.hitFlash > 0 ? "#f1ddd0" : "#5f6952";
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(-5, 6);
        ctx.lineTo(-8, 16);
        ctx.moveTo(5, 6);
        ctx.lineTo(8, 16);
        ctx.stroke();
        ctx.fillStyle = zombie.hitFlash > 0 ? "#e7d5c9" : `hsl(${62 + zombie.hue} 14% 32%)`;
        ctx.beginPath();
        ctx.ellipse(0, 2, 10, 13, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#91886c";
        ctx.beginPath();
        ctx.arc(0, -11, 7, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#241d18";
        ctx.fillRect(-4, -13, 2, 2);
        ctx.fillRect(3, -13, 2, 2);
        if (zombie.state === "chase" && !zombie.dead) {
          ctx.fillStyle = "rgba(175,64,57,.65)";
          ctx.fillRect(-8, -23, 16 * clamp(zombie.health / zombie.maxHealth, 0, 1), 2);
        }
        ctx.restore();
      }
    }
    drawPlayer(ctx, shakeX, shakeY) {
      const p = this.worldToScreen(this.player.x, this.player.y, shakeX, shakeY);
      const angle = Math.atan2(this.player.facingY, this.player.facingX) + Math.PI / 2;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(angle);
      ctx.fillStyle = "rgba(0,0,0,.3)";
      ctx.beginPath();
      ctx.ellipse(3, 8, 13, 7, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#252d29";
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(-5, 7);
      ctx.lineTo(-7, 17);
      ctx.moveTo(5, 7);
      ctx.lineTo(7, 17);
      ctx.stroke();
      ctx.fillStyle = this.player.crouching ? "#586a58" : "#667b65";
      ctx.beginPath();
      ctx.ellipse(0, 2, 10, this.player.crouching ? 10 : 13, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#bf9b7c";
      ctx.beginPath();
      ctx.arc(0, -11, 7, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#d6c2a2";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(0, -1);
      ctx.lineTo(0, -22);
      ctx.stroke();
      ctx.fillStyle = "#d6c2a2";
      ctx.beginPath();
      ctx.arc(0, -23, 2.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
    drawEffects(ctx, shakeX, shakeY, behind) {
      for (const effect of this.effects) {
        if (effect.type === "death" !== behind) continue;
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
        } else if (effect.type === "swing") {
          ctx.strokeStyle = `rgba(225,225,205,${alpha * 0.52})`;
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.arc(p.x, p.y, effect.range, effect.angle - 0.65, effect.angle + 0.65);
          ctx.stroke();
        }
      }
    }
    drawLighting(ctx) {
      const night = this.nightStrength();
      if (night <= 0.01) return;
      ctx.save();
      const player = this.worldToScreen(this.player.x, this.player.y);
      const radius = this.player.flashlight ? 290 : 155;
      const gradient = ctx.createRadialGradient(player.x, player.y, 20, player.x, player.y, radius);
      gradient.addColorStop(0, `rgba(3,7,11,${night * 0.06})`);
      gradient.addColorStop(0.52, `rgba(3,7,11,${night * 0.24})`);
      gradient.addColorStop(1, `rgba(3,7,11,${night * 0.76})`);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, this.viewWidth, this.viewHeight);
      if (this.player.flashlight) {
        const angle = Math.atan2(this.player.facingY, this.player.facingX);
        ctx.globalCompositeOperation = "screen";
        const beam = ctx.createRadialGradient(player.x, player.y, 20, player.x, player.y, 430);
        beam.addColorStop(0, "rgba(221,216,172,.1)");
        beam.addColorStop(1, "rgba(221,216,172,0)");
        ctx.fillStyle = beam;
        ctx.beginPath();
        ctx.moveTo(player.x, player.y);
        ctx.arc(player.x, player.y, 430, angle - 0.23, angle + 0.23);
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
      ctx.fillStyle = "#e3d8b6";
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, 3.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "rgba(221,226,212,.26)";
      ctx.strokeRect(0.5, 0.5, size - 1, size - 1);
    }
  };
  new HollowCountyGame();
})();
