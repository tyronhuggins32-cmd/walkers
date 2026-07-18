(() => {
  "use strict";

  /*
   * Hollow County — Grit & Steel visual overhaul
   *
   * Everything in this pass is generated with Canvas and CSS so the game stays
   * self-contained. The detail level automatically backs off on touch devices.
   */

  const INSTALL_FLAG = "__hcGritAndSteelVisualsV1";
  const VERSION = "1.0.0";

  const TILE = Object.freeze({
    GRASS: 0,
    ROAD: 1,
    FLOOR: 2,
    WALL: 3,
    WATER: 4,
    TREE: 5,
    SIDEWALK: 6
  });

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

  const MELEE = new Set([
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

  const WEAPONS = new Set([...FIREARMS, ...MELEE]);

  const state = {
    mobile: false,
    reducedMotion: false,
    seed: "",
    seedHash: 0,
    grainCanvas: null,
    grainPattern: null
  };

  function clamp(value, minimum, maximum) {
    return Math.max(minimum, Math.min(maximum, value));
  }

  function hashString(value) {
    const text = String(value ?? "HOLLOW");
    let hash = 2166136261;

    for (let index = 0; index < text.length; index += 1) {
      hash ^= text.charCodeAt(index);
      hash = Math.imul(hash, 16777619);
    }

    return hash >>> 0;
  }

  function setSeed(seed) {
    const next = String(seed ?? "HOLLOW");
    if (state.seed === next) return;
    state.seed = next;
    state.seedHash = hashString(next);
  }

  function hash2D(x, y, salt = 0) {
    let value =
      state.seedHash ^
      Math.imul((x | 0) + 374761393, 668265263) ^
      Math.imul((y | 0) + 1442695041, 2246822519) ^
      Math.imul((salt | 0) + 1013904223, 3266489917);

    value ^= value >>> 15;
    value = Math.imul(value, 2246822519);
    value ^= value >>> 13;
    value = Math.imul(value, 3266489917);
    value ^= value >>> 16;
    return (value >>> 0) / 4294967295;
  }

  function tileAt(world, tx, ty) {
    if (!world || tx < 0 || ty < 0 || tx >= world.width || ty >= world.height) {
      return TILE.WALL;
    }

    if (world.chunked) {
      const chunkSize = world.chunkSize || 96;
      const cx = Math.floor(tx / chunkSize);
      const cy = Math.floor(ty / chunkSize);
      const chunk = world.chunks?.get?.(`${cx},${cy}`);
      if (!chunk?.tiles) return null;
      const localX = tx - cx * chunkSize;
      const localY = ty - cy * chunkSize;
      return chunk.tiles[localY * chunkSize + localX];
    }

    return world.tiles?.[ty * world.width + tx] ?? null;
  }

  function roundedPath(ctx, x, y, width, height, radius) {
    const safeRadius = Math.min(
      Math.abs(width) / 2,
      Math.abs(height) / 2,
      Math.max(0, radius)
    );

    ctx.beginPath();

    if (typeof ctx.roundRect === "function") {
      ctx.roundRect(x, y, width, height, safeRadius);
      return;
    }

    ctx.moveTo(x + safeRadius, y);
    ctx.lineTo(x + width - safeRadius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + safeRadius);
    ctx.lineTo(x + width, y + height - safeRadius);
    ctx.quadraticCurveTo(
      x + width,
      y + height,
      x + width - safeRadius,
      y + height
    );
    ctx.lineTo(x + safeRadius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - safeRadius);
    ctx.lineTo(x, y + safeRadius);
    ctx.quadraticCurveTo(x, y, x + safeRadius, y);
    ctx.closePath();
  }

  function polygon(ctx, points) {
    if (!points.length) return;
    ctx.beginPath();
    ctx.moveTo(points[0][0], points[0][1]);
    for (let index = 1; index < points.length; index += 1) {
      ctx.lineTo(points[index][0], points[index][1]);
    }
    ctx.closePath();
  }

  function roofCoversTile(game, tx, ty, tile) {
    const key = `${tx},${ty}`;
    const courtyard = game.courtyardLookup?.get?.(key);
    if (courtyard && courtyard.id !== game.playerBuildingId) return true;

    const building = game.buildingLookup?.get?.(key);
    if (!building || building.id === game.playerBuildingId) return false;

    const door = game.doorTiles?.get?.(key);
    const exteriorBoundary = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1]
    ].some(([dx, dy]) => !building.cellSet?.has?.(`${tx + dx},${ty + dy}`));

    return (
      (tile === TILE.FLOOR && !door?.exterior) ||
      (tile === TILE.WALL && !exteriorBoundary)
    );
  }

  function drawRoofWear(ctx, p, size, tx, ty, variation) {
    ctx.save();
    ctx.globalCompositeOperation = "multiply";

    if (variation < 0.18) {
      ctx.fillStyle = "rgba(20,24,20,.24)";
      ctx.beginPath();
      ctx.ellipse(
        p.x + 8 + hash2D(tx, ty, 41) * 15,
        p.y + 8 + hash2D(tx, ty, 42) * 15,
        4 + hash2D(tx, ty, 43) * 6,
        2 + hash2D(tx, ty, 44) * 3,
        hash2D(tx, ty, 45),
        0,
        Math.PI * 2
      );
      ctx.fill();
    }

    if (variation > 0.68) {
      ctx.strokeStyle = "rgba(16,20,18,.28)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(p.x + 3, p.y + 7);
      ctx.lineTo(p.x + 13, p.y + 11);
      ctx.lineTo(p.x + 18, p.y + 22);
      ctx.lineTo(p.x + size - 3, p.y + 25);
      ctx.stroke();
    }

    if (variation > 0.84) {
      ctx.fillStyle = "rgba(82,55,38,.32)";
      ctx.fillRect(p.x + size - 3, p.y + 4, 2, size - 8);
      ctx.fillStyle = "rgba(136,99,60,.2)";
      ctx.fillRect(p.x + size - 2, p.y + 8, 1, size - 14);
    }

    ctx.restore();
  }

  function drawGroundDetail(game, ctx, tx, ty, shakeX, shakeY) {
    const world = game.world;
    const tile = tileAt(world, tx, ty);
    if (tile === null) return;

    setSeed(world.seed);

    const size = world.tileSize || 32;
    const p = game.worldToScreen(tx * size, ty * size, shakeX, shakeY);
    const variation = hash2D(tx, ty, 1);
    const detail = hash2D(tx, ty, 2);

    if (roofCoversTile(game, tx, ty, tile)) {
      drawRoofWear(ctx, p, size, tx, ty, variation);
      return;
    }

    ctx.save();
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    if (tile === TILE.GRASS) {
      if (variation > (state.mobile ? 0.58 : 0.42)) {
        const originX = p.x + 5 + detail * 21;
        const originY = p.y + 20 + hash2D(tx, ty, 3) * 8;
        ctx.strokeStyle = "rgba(154,162,115,.22)";
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(originX, originY);
        ctx.lineTo(originX - 2, originY - 6);
        ctx.moveTo(originX + 1, originY);
        ctx.lineTo(originX + 4, originY - 7);
        ctx.moveTo(originX + 3, originY);
        ctx.lineTo(originX + 7, originY - 4);
        ctx.stroke();
      }

      if (variation < 0.075) {
        ctx.fillStyle = "rgba(95,91,74,.38)";
        ctx.beginPath();
        ctx.ellipse(p.x + 8 + detail * 17, p.y + 21, 3.2, 1.8, -0.3, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "rgba(194,190,154,.13)";
        ctx.fillRect(p.x + 9 + detail * 17, p.y + 20, 2, 1);
      } else if (variation > 0.19 && variation < 0.25) {
        ctx.fillStyle = "rgba(116,78,43,.35)";
        ctx.beginPath();
        ctx.ellipse(p.x + 9, p.y + 12, 3.5, 1.5, 0.5, 0, Math.PI * 2);
        ctx.ellipse(p.x + 15, p.y + 18, 2.8, 1.3, -0.4, 0, Math.PI * 2);
        ctx.fill();
      }
    } else if (tile === TILE.ROAD) {
      ctx.globalCompositeOperation = "multiply";

      if (variation < 0.09) {
        const stainX = p.x + 8 + detail * 16;
        const stainY = p.y + 9 + hash2D(tx, ty, 4) * 15;
        const stain = ctx.createRadialGradient(
          stainX,
          stainY,
          1,
          stainX,
          stainY,
          8
        );
        stain.addColorStop(0, "rgba(7,10,9,.5)");
        stain.addColorStop(0.62, "rgba(24,29,26,.24)");
        stain.addColorStop(1, "rgba(24,29,26,0)");
        ctx.fillStyle = stain;
        ctx.fillRect(stainX - 8, stainY - 8, 16, 16);
      }

      if (variation > (state.mobile ? 0.87 : 0.82)) {
        const crackX = p.x + 3 + detail * 17;
        const crackY = p.y + 2 + hash2D(tx, ty, 5) * 12;
        ctx.strokeStyle = "rgba(8,11,10,.39)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(crackX, crackY);
        ctx.lineTo(crackX + 5, crackY + 6);
        ctx.lineTo(crackX + 2, crackY + 11);
        ctx.lineTo(crackX + 10, crackY + 18);
        ctx.lineTo(crackX + 14, crackY + 27);
        ctx.moveTo(crackX + 5, crackY + 6);
        ctx.lineTo(crackX + 11, crackY + 5);
        ctx.moveTo(crackX + 3, crackY + 12);
        ctx.lineTo(crackX - 1, crackY + 16);
        ctx.stroke();
      }

      ctx.globalCompositeOperation = "source-over";

      if (variation > 0.23 && variation < 0.28) {
        const litterX = p.x + 7 + detail * 17;
        const litterY = p.y + 7 + hash2D(tx, ty, 6) * 17;
        ctx.save();
        ctx.translate(litterX, litterY);
        ctx.rotate(detail * 2.2 - 1.1);
        ctx.fillStyle = "rgba(198,190,159,.48)";
        ctx.fillRect(-3, -2, 7, 4);
        ctx.strokeStyle = "rgba(79,70,57,.3)";
        ctx.strokeRect(-2.5, -1.5, 6, 3);
        ctx.restore();
      } else if (variation > 0.31 && variation < 0.345) {
        ctx.strokeStyle = "rgba(100,126,119,.56)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(p.x + 9, p.y + 23);
        ctx.lineTo(p.x + 17, p.y + 18);
        ctx.stroke();
        ctx.fillStyle = "rgba(180,207,190,.22)";
        ctx.fillRect(p.x + 10, p.y + 21, 4, 1);
      }
    } else if (tile === TILE.SIDEWALK) {
      if (variation > 0.82) {
        ctx.strokeStyle = "rgba(28,32,30,.38)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(p.x + 3 + detail * 10, p.y + 2);
        ctx.lineTo(p.x + 9 + detail * 10, p.y + 9);
        ctx.lineTo(p.x + 7 + detail * 10, p.y + 17);
        ctx.lineTo(p.x + 13 + detail * 10, p.y + 25);
        ctx.stroke();
      }

      if (variation < 0.13) {
        ctx.strokeStyle = "rgba(73,112,67,.62)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        const weedX = p.x + (detail > 0.5 ? size - 3 : 3);
        ctx.moveTo(weedX, p.y + 25);
        ctx.lineTo(weedX - 2, p.y + 18);
        ctx.moveTo(weedX, p.y + 25);
        ctx.lineTo(weedX + 3, p.y + 19);
        ctx.stroke();
      }
    } else if (tile === TILE.FLOOR) {
      if (variation < 0.085) {
        ctx.fillStyle = "rgba(39,31,24,.2)";
        ctx.beginPath();
        ctx.ellipse(p.x + 9 + detail * 14, p.y + 19, 6, 2.8, detail - 0.5, 0, Math.PI * 2);
        ctx.fill();
      } else if (variation > 0.81) {
        ctx.strokeStyle = "rgba(235,226,196,.1)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(p.x + 5, p.y + 7);
        ctx.lineTo(p.x + 25, p.y + 22);
        ctx.stroke();
      }
    } else if (tile === TILE.WALL) {
      if (variation < 0.16) {
        const dripX = p.x + 4 + detail * 22;
        ctx.fillStyle = "rgba(31,45,34,.26)";
        ctx.fillRect(dripX, p.y + 5, 2, 14);
        ctx.fillRect(dripX + 3, p.y + 8, 1, 8);
      }

      if (variation > 0.76) {
        ctx.strokeStyle = "rgba(31,29,24,.45)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(p.x + 6, p.y + 4);
        ctx.lineTo(p.x + 13, p.y + 12);
        ctx.lineTo(p.x + 10, p.y + 20);
        ctx.lineTo(p.x + 20, p.y + 27);
        ctx.stroke();
      }
    } else if (tile === TILE.WATER) {
      const motion = state.reducedMotion ? 0 : performance.now() * 0.00045;
      const offset = Math.sin(motion + tx * 0.7 + ty) * 2;
      ctx.strokeStyle = "rgba(171,201,194,.16)";
      ctx.lineWidth = 0.9;
      ctx.beginPath();
      ctx.moveTo(p.x + 5 + offset, p.y + 22);
      ctx.quadraticCurveTo(p.x + 14, p.y + 19, p.x + 27 + offset, p.y + 21);
      ctx.stroke();
    } else if (tile === TILE.TREE) {
      if (variation > 0.38) {
        ctx.fillStyle = "rgba(207,193,114,.19)";
        for (let index = 0; index < (state.mobile ? 1 : 2); index += 1) {
          const leafX = p.x + 4 + hash2D(tx, ty, 20 + index) * 24;
          const leafY = p.y + 21 + hash2D(tx, ty, 25 + index) * 8;
          ctx.save();
          ctx.translate(leafX, leafY);
          ctx.rotate(hash2D(tx, ty, 30 + index) * Math.PI);
          ctx.beginPath();
          ctx.ellipse(0, 0, 2.6, 1.1, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }
    }

    ctx.restore();
  }

  function carAngle(car) {
    const movingAngle = car?.deepVehicle?.angle;
    if (Number.isFinite(movingAngle)) return movingAngle;
    return (car?.h || 0) > (car?.w || 0) ? Math.PI / 2 : 0;
  }

  function visibleCar(game, car, margin = 120) {
    const p = game.worldToScreen(car.x, car.y);
    return !(
      p.x < -margin ||
      p.y < -margin ||
      p.x > game.viewWidth + margin ||
      p.y > game.viewHeight + margin
    );
  }

  function drawCarShadows(game, ctx, shakeX, shakeY) {
    for (const car of game.world?.cars || []) {
      if (!visibleCar(game, car)) continue;
      const p = game.worldToScreen(car.x, car.y, shakeX, shakeY);
      const length = Math.max(car.w || 70, car.h || 36);
      const width = Math.min(car.w || 70, car.h || 36);
      ctx.save();
      ctx.translate(p.x + 8, p.y + 11);
      ctx.rotate(carAngle(car));
      ctx.fillStyle = "rgba(1,4,3,.32)";
      ctx.shadowColor = "rgba(0,0,0,.35)";
      ctx.shadowBlur = 8;
      roundedPath(ctx, -length / 2, -width / 2, length, width, Math.min(9, width * 0.24));
      ctx.fill();
      ctx.restore();
    }
  }

  function drawCarWeathering(game, ctx, shakeX, shakeY) {
    setSeed(game.world?.seed);

    for (const car of game.world?.cars || []) {
      if (!visibleCar(game, car)) continue;

      const p = game.worldToScreen(car.x, car.y, shakeX, shakeY);
      const length = Math.max(car.w || 70, car.h || 36);
      const width = Math.min(car.w || 70, car.h || 36);
      const halfLength = length / 2;
      const halfWidth = width / 2;
      const identity = hashString(car.id || `${Math.round(car.x)}:${Math.round(car.y)}`);
      const rust = ((identity >>> 8) & 255) / 255;
      const damage = Math.max(
        Number(car.damageVariant || 0) / 3,
        1 - Number(car.deepVehicle?.condition ?? 100) / 100
      );

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(carAngle(car));

      ctx.strokeStyle = "rgba(4,7,6,.46)";
      ctx.lineWidth = 1;
      roundedPath(
        ctx,
        -halfLength + 0.5,
        -halfWidth + 0.5,
        length - 1,
        width - 1,
        Math.min(8, width * 0.24)
      );
      ctx.stroke();

      ctx.strokeStyle = "rgba(230,226,199,.13)";
      ctx.beginPath();
      ctx.moveTo(-halfLength + 6, -halfWidth + 3);
      ctx.lineTo(halfLength - 7, -halfWidth + 3);
      ctx.stroke();

      ctx.strokeStyle = "rgba(236,221,188,.31)";
      ctx.lineWidth = 0.8;
      const scratchY = -halfWidth + 7 + rust * Math.max(5, width - 14);
      ctx.beginPath();
      ctx.moveTo(-halfLength + 11, scratchY);
      ctx.lineTo(-halfLength + 25 + rust * 17, scratchY + 2);
      ctx.moveTo(halfLength - 28, scratchY - 5);
      ctx.lineTo(halfLength - 9, scratchY - 2);
      ctx.stroke();

      ctx.fillStyle = "rgba(111,58,31,.34)";
      ctx.beginPath();
      ctx.ellipse(
        -halfLength + 10 + rust * 12,
        halfWidth - 3,
        4 + rust * 4,
        1.5 + rust * 1.4,
        0.14,
        0,
        Math.PI * 2
      );
      ctx.fill();
      ctx.fillStyle = "rgba(193,113,58,.2)";
      ctx.fillRect(-halfLength + 10 + rust * 11, halfWidth - 4, 5, 1);

      if (damage > 0.28 || rust > 0.78) {
        const glassX = -halfLength + length * 0.38;
        ctx.strokeStyle = "rgba(202,226,222,.35)";
        ctx.lineWidth = 0.7;
        ctx.beginPath();
        ctx.moveTo(glassX, -3);
        ctx.lineTo(glassX + 6, -8);
        ctx.moveTo(glassX, -3);
        ctx.lineTo(glassX + 8, 2);
        ctx.moveTo(glassX, -3);
        ctx.lineTo(glassX - 4, 5);
        ctx.stroke();
      }

      if ((car.kind || "") === "pickup") {
        ctx.strokeStyle = "rgba(168,130,79,.24)";
        for (let line = -1; line <= 1; line += 1) {
          ctx.beginPath();
          ctx.moveTo(halfLength * 0.49, line * 4);
          ctx.lineTo(halfLength - 7, line * 4);
          ctx.stroke();
        }
      }

      ctx.restore();
    }
  }

  function createGrainCanvas() {
    try {
      const canvas = document.createElement("canvas");
      canvas.width = state.mobile ? 48 : 64;
      canvas.height = canvas.width;
      const ctx = canvas.getContext("2d");
      if (!ctx) return null;

      let random = 0x7f4a7c15;
      const points = state.mobile ? 92 : 180;

      for (let index = 0; index < points; index += 1) {
        random = Math.imul(random ^ (random >>> 15), 2246822519);
        random ^= random >>> 13;
        const x = (random >>> 0) % canvas.width;
        random = Math.imul(random ^ (random >>> 16), 3266489917);
        const y = (random >>> 0) % canvas.height;
        const bright = (random & 1) === 0;
        ctx.fillStyle = bright ? "rgba(255,255,235,.16)" : "rgba(0,0,0,.22)";
        ctx.fillRect(x, y, 1, 1);
      }

      return canvas;
    } catch (_error) {
      return null;
    }
  }

  function drawScreenGrade(game) {
    const ctx = game.ctx;
    if (!ctx || !game.player) return;

    const width = game.viewWidth;
    const height = game.viewHeight;
    const dpr = game.dpr || 1;
    const now = performance.now();
    const night = clamp(Number(game.nightStrength?.() || 0), 0, 1);
    const twilight = clamp(Number(game.twilightStrength?.() || 0), 0, 1);

    ctx.save();
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const skyWash = ctx.createLinearGradient(0, 0, width, height);
    skyWash.addColorStop(
      0,
      night > 0.2
        ? `rgba(39,61,75,${0.06 + night * 0.08})`
        : `rgba(123,112,78,${0.035 + twilight * 0.05})`
    );
    skyWash.addColorStop(0.48, "rgba(74,82,66,.02)");
    skyWash.addColorStop(
      1,
      night > 0.2
        ? `rgba(4,10,14,${0.08 + night * 0.1})`
        : "rgba(42,47,37,.055)"
    );
    ctx.globalCompositeOperation = "soft-light";
    ctx.fillStyle = skyWash;
    ctx.fillRect(0, 0, width, height);

    if (["OVERCAST", "COLD WIND", "LIGHT RAIN"].includes(game.weather)) {
      const haze = ctx.createLinearGradient(0, height * 0.08, 0, height);
      haze.addColorStop(0, "rgba(164,177,163,.025)");
      haze.addColorStop(0.52, "rgba(115,132,120,.045)");
      haze.addColorStop(1, "rgba(43,54,47,.08)");
      ctx.globalCompositeOperation = "screen";
      ctx.fillStyle = haze;
      ctx.fillRect(0, 0, width, height);
    }

    if (game.weather === "LIGHT RAIN") {
      ctx.globalCompositeOperation = "source-over";
      const rainMist = ctx.createLinearGradient(0, 0, 0, height);
      rainMist.addColorStop(0, "rgba(128,151,153,.02)");
      rainMist.addColorStop(1, "rgba(74,94,94,.085)");
      ctx.fillStyle = rainMist;
      ctx.fillRect(0, 0, width, height);

      if (!state.reducedMotion && !state.mobile) {
        ctx.strokeStyle = "rgba(205,221,219,.09)";
        ctx.lineWidth = 0.7;
        const motion = now * 0.31;
        for (let index = 0; index < 18; index += 1) {
          const x = (index * 137 + motion) % (width + 60) - 30;
          const y = (index * 89 + motion * 1.7) % (height + 60) - 30;
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x - 5, y + 13);
          ctx.stroke();
        }
      }
    }

    if (state.grainCanvas) {
      try {
        state.grainPattern ||= ctx.createPattern(state.grainCanvas, "repeat");
        if (state.grainPattern) {
          ctx.save();
          ctx.globalCompositeOperation = "overlay";
          ctx.globalAlpha = state.mobile ? 0.14 : 0.19;
          if (!state.reducedMotion) {
            const offset = Math.floor(now / 110) % state.grainCanvas.width;
            ctx.translate(-offset, offset * 0.37);
          }
          ctx.fillStyle = state.grainPattern;
          ctx.fillRect(-80, -80, width + 160, height + 160);
          ctx.restore();
        }
      } catch (_error) {
        state.grainPattern = null;
      }
    }

    ctx.globalCompositeOperation = "source-over";
    const vignette = ctx.createRadialGradient(
      width * 0.5,
      height * 0.48,
      Math.min(width, height) * 0.18,
      width * 0.5,
      height * 0.5,
      Math.max(width, height) * 0.72
    );
    vignette.addColorStop(0, "rgba(0,0,0,0)");
    vignette.addColorStop(0.62, "rgba(1,4,3,.025)");
    vignette.addColorStop(1, `rgba(1,4,3,${0.26 + night * 0.11})`);
    ctx.fillStyle = vignette;
    ctx.fillRect(0, 0, width, height);

    const health = clamp(Number(game.player.health ?? 100), 0, 100);
    if (health < 45) {
      const danger = (45 - health) / 45;
      const pulse = state.reducedMotion ? 0.65 : 0.58 + Math.sin(now * 0.004) * 0.12;
      const woundEdge = ctx.createRadialGradient(
        width / 2,
        height / 2,
        Math.min(width, height) * 0.28,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.7
      );
      woundEdge.addColorStop(0, "rgba(70,4,4,0)");
      woundEdge.addColorStop(1, `rgba(105,16,13,${danger * pulse * 0.42})`);
      ctx.fillStyle = woundEdge;
      ctx.fillRect(0, 0, width, height);
    }

    if (!state.mobile) {
      ctx.fillStyle = "rgba(215,203,160,.055)";
      const drift = state.reducedMotion ? 0 : now * 0.000018;
      for (let index = 0; index < 11; index += 1) {
        const x = (hash2D(index, 71, 50) * width + drift * width * (index + 1)) % width;
        const y = hash2D(index, 91, 51) * height;
        ctx.beginPath();
        ctx.arc(x, y, 0.55 + hash2D(index, 18, 52), 0, Math.PI * 2);
        ctx.fill();
      }
    }

    ctx.restore();
  }

  function weaponGradient(ctx, y1 = 6, y2 = 20) {
    if (typeof ctx.createLinearGradient !== "function") return "#7d8787";
    const gradient = ctx.createLinearGradient(0, y1, 0, y2);
    gradient.addColorStop(0, "#aab2ae");
    gradient.addColorStop(0.25, "#626d6d");
    gradient.addColorStop(0.72, "#30393a");
    gradient.addColorStop(1, "#171d1e");
    return gradient;
  }

  function drawWeaponIcon(canvas, weaponId) {
    const ctx = canvas?.getContext?.("2d");
    if (!ctx || !WEAPONS.has(weaponId)) return false;

    const logicalWidth = 76;
    const logicalHeight = 28;
    const dpr = 2;
    canvas.width = logicalWidth * dpr;
    canvas.height = logicalHeight * dpr;
    canvas.dataset.weaponId = weaponId;
    canvas.className = "hc-weapon-icon";
    canvas.setAttribute("aria-hidden", "true");

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, logicalWidth, logicalHeight);
    ctx.save();
    ctx.translate(3, 2);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.shadowColor = "rgba(0,0,0,.75)";
    ctx.shadowBlur = 2;
    ctx.shadowOffsetY = 1;

    const steel = weaponGradient(ctx);
    const dark = "#151b1c";
    const black = "#080b0c";
    const wood = "#885c3e";
    const woodLight = "#bc8052";
    const polymer = "#293234";
    const accent = "#b8c2bd";

    const fillRound = (x, y, width, height, radius, color) => {
      ctx.fillStyle = color;
      roundedPath(ctx, x, y, width, height, radius);
      ctx.fill();
    };

    const fillPoly = (points, color) => {
      ctx.fillStyle = color;
      polygon(ctx, points);
      ctx.fill();
    };

    const line = (x1, y1, x2, y2, width, color) => {
      ctx.strokeStyle = color;
      ctx.lineWidth = width;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    };

    const bore = x => {
      ctx.fillStyle = black;
      ctx.beginPath();
      ctx.arc(x, 12, 1.5, 0, Math.PI * 2);
      ctx.fill();
    };

    if (weaponId === "pistol" || weaponId === "suppressed_pistol") {
      fillRound(21, 7, weaponId === "suppressed_pistol" ? 28 : 23, 7, 2, steel);
      fillPoly([[24, 13], [34, 13], [31, 25], [25, 24]], polymer);
      fillRound(24, 14, 7, 9, 1.5, "#394245");
      line(24, 9, 39, 9, 1, accent);
      ctx.fillStyle = dark;
      ctx.fillRect(30, 13, 7, 2);
      if (weaponId === "suppressed_pistol") {
        fillRound(43, 8, 27, 6, 3, "#263b39");
        for (let x = 49; x < 68; x += 5) line(x, 9, x, 13, 0.7, "#71968e");
        bore(70);
      } else {
        bore(45);
      }
    } else if (weaponId === "revolver") {
      fillRound(18, 8, 34, 6, 2, steel);
      ctx.fillStyle = "#596264";
      ctx.beginPath();
      ctx.arc(29, 14, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = dark;
      for (let index = 0; index < 6; index += 1) {
        const angle = index / 6 * Math.PI * 2;
        ctx.beginPath();
        ctx.arc(29 + Math.cos(angle) * 3, 14 + Math.sin(angle) * 3, 0.7, 0, Math.PI * 2);
        ctx.fill();
      }
      fillPoly([[20, 15], [28, 16], [25, 26], [18, 24]], wood);
      line(20, 19, 25, 21, 1, woodLight);
      bore(52);
    } else if (weaponId === "machine_pistol") {
      fillRound(17, 7, 32, 8, 2, steel);
      fillPoly([[21, 14], [31, 14], [28, 25], [22, 24]], polymer);
      fillRound(36, 14, 6, 12, 1.5, "#252d30");
      line(21, 9, 44, 9, 1, accent);
      bore(49);
    } else if (weaponId === "smg") {
      fillPoly([[5, 10], [17, 8], [17, 16], [5, 14]], "#353f41");
      line(5, 10, 1, 6, 2, "#778082");
      line(5, 14, 1, 20, 2, "#778082");
      line(1, 6, 1, 20, 2, "#3b4445");
      fillRound(16, 7, 34, 10, 2, polymer);
      fillRound(49, 9, 20, 5, 2, steel);
      fillPoly([[28, 16], [35, 16], [34, 26], [29, 26]], "#252c2e");
      fillPoly([[39, 16], [45, 16], [47, 25], [41, 25]], "#4d5758");
      for (let x = 53; x < 67; x += 5) {
        ctx.fillStyle = black;
        ctx.beginPath();
        ctx.arc(x, 11.5, 1, 0, Math.PI * 2);
        ctx.fill();
      }
      bore(70);
    } else if (["shotgun", "double_barrel", "lever_rifle"].includes(weaponId)) {
      fillPoly([[3, 10], [17, 7], [27, 9], [27, 16], [16, 17], [3, 15]], wood);
      line(7, 11, 20, 12, 1.3, woodLight);
      fillRound(24, 8, 19, 9, 2, steel);

      if (weaponId === "double_barrel") {
        fillRound(42, 8, 31, 4, 2, "#4b5557");
        fillRound(42, 13, 31, 4, 2, "#30393b");
        ctx.fillStyle = black;
        ctx.fillRect(72, 9, 2, 2);
        ctx.fillRect(72, 14, 2, 2);
      } else {
        fillRound(41, 9, 32, 5, 2, steel);
        if (weaponId === "shotgun") {
          fillRound(45, 14, 14, 6, 2, wood);
          for (let x = 47; x < 58; x += 3) line(x, 15, x - 1, 19, 0.7, woodLight);
        } else {
          fillRound(44, 14, 18, 5, 2, wood);
          ctx.strokeStyle = "#a9b0ad";
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.ellipse(34, 20, 8, 4.5, 0, 0, Math.PI * 2);
          ctx.stroke();
        }
        bore(74);
      }
    } else if (["rifle", "sniper_rifle"].includes(weaponId)) {
      fillPoly([[2, 11], [18, 7], [29, 10], [29, 16], [16, 18], [2, 15]], weaponId === "rifle" ? wood : "#364b5a");
      fillRound(25, 8, 25, 9, 2, polymer);
      fillRound(48, 10, 27, 4, 2, steel);
      fillRound(27, 3, 29, 5, 2, dark);
      fillRound(31, 4, 21, 3, 1, weaponId === "rifle" ? "#667174" : "#66849a");
      ctx.fillStyle = "#263236";
      ctx.beginPath();
      ctx.arc(30, 5.5, 2.5, 0, Math.PI * 2);
      ctx.arc(53, 5.5, 2.5, 0, Math.PI * 2);
      ctx.fill();
      fillPoly([[32, 16], [39, 16], [38, 23], [33, 23]], "#3a4548");
      if (weaponId === "sniper_rifle") {
        line(56, 14, 52, 26, 1.5, "#6f797a");
        line(66, 14, 71, 26, 1.5, "#6f797a");
      }
      bore(75);
    } else if (["carbine", "assault_rifle", "auto_shotgun", "lmg"].includes(weaponId)) {
      const body = weaponId === "auto_shotgun" ? "#3d3745" : polymer;
      const stock = weaponId === "assault_rifle" ? wood : "#354042";
      fillPoly([[2, 10], [17, 7], [24, 9], [24, 17], [15, 17], [2, 15]], stock);
      fillRound(20, 7, weaponId === "lmg" ? 35 : 31, 11, 2, body);
      fillRound(48, 9, 27, 5, 2, steel);
      fillPoly([[27, 17], [34, 17], [33, 26], [28, 25]], "#293234");

      if (weaponId === "lmg") {
        fillRound(37, 16, 14, 10, 2, "#6f6335");
        for (let x = 40; x < 49; x += 3) ctx.fillRect(x, 18, 1, 5);
        line(57, 14, 53, 26, 1.5, "#707975");
        line(67, 14, 72, 26, 1.5, "#707975");
      } else {
        fillPoly([[38, 17], [46, 17], [49, 26], [41, 25]], weaponId === "auto_shotgun" ? "#4b4054" : "#4c5758");
      }

      if (weaponId === "carbine" || weaponId === "auto_shotgun") {
        fillRound(28, 3, 22, 4, 1.5, dark);
        ctx.fillStyle = weaponId === "auto_shotgun" ? "#a683bd" : "#6e9c9a";
        ctx.beginPath();
        ctx.arc(42, 5, 1.2, 0, Math.PI * 2);
        ctx.fill();
      } else {
        line(21, 5, 48, 5, 1.3, "#737c7d");
      }

      for (let x = 54; x < 72; x += 5) {
        ctx.fillStyle = black;
        ctx.beginPath();
        ctx.arc(x, 11.5, 0.9, 0, Math.PI * 2);
        ctx.fill();
      }
      bore(75);
    } else if (weaponId === "hand_cannon") {
      fillRound(10, 6, 48, 10, 2, steel);
      line(17, 9, 50, 9, 2, "#a57d5f");
      fillPoly([[19, 15], [32, 15], [28, 27], [20, 25]], "#3b2b29");
      fillRound(51, 8, 9, 7, 2, "#727c7d");
      for (let x = 40; x < 54; x += 4) ctx.fillRect(x, 6, 2, 3);
      bore(60);
    }

    if (MELEE.has(weaponId)) {
      ctx.shadowBlur = 1.5;
      const centerY = 14;

      if (weaponId === "knife") {
        fillRound(3, 11, 21, 7, 3, "#4f382a");
        line(7, 13, 20, 13, 1, "#a67855");
        fillPoly([[23, 10], [70, 12], [73, 14], [68, 17], [23, 18]], steel);
        line(29, 12, 67, 13, 1, accent);
      } else if (weaponId === "hammer") {
        line(9, 23, 52, 8, 7, "#704a31");
        line(11, 21, 49, 8, 2.5, "#b17a4e");
        fillRound(45, 4, 23, 10, 2, steel);
        fillPoly([[45, 5], [37, 1], [39, 7], [45, 10]], "#566064");
      } else if (weaponId === "bat") {
        line(6, 20, 65, 9, 10, "#69462f");
        line(9, 18, 63, 8, 5, woodLight);
        line(7, 19, 19, 17, 6, "#29221e");
        line(11, 17, 17, 19, 0.8, "#b29a79");
      } else if (weaponId === "axe") {
        line(6, 23, 57, 7, 7, "#69462f");
        line(9, 21, 52, 7, 2, woodLight);
        fillPoly([[50, 3], [67, 1], [73, 8], [66, 15], [51, 13]], steel);
        fillPoly([[63, 2], [74, 7], [67, 9]], "#c9d0cc");
      } else if (weaponId === "machete") {
        fillRound(3, 11, 22, 7, 3, "#303739");
        for (let x = 7; x < 20; x += 4) line(x, 12, x + 2, 17, 0.8, "#788183");
        fillPoly([[23, 9], [67, 6], [74, 10], [69, 16], [25, 18]], steel);
        line(29, 11, 66, 9, 1, accent);
      } else if (weaponId === "katana") {
        fillRound(3, 11, 25, 6, 3, "#24292b");
        for (let x = 7; x < 26; x += 4) line(x, 11, x + 3, 17, 0.8, "#9b7654");
        ctx.fillStyle = "#c5a55f";
        ctx.fillRect(26, 8, 3, 12);
        ctx.strokeStyle = steel;
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(29, 14);
        ctx.quadraticCurveTo(54, 15, 74, 7);
        ctx.stroke();
        ctx.strokeStyle = "#dbe0dc";
        ctx.lineWidth = 1;
        ctx.stroke();
      } else if (weaponId === "crowbar") {
        ctx.strokeStyle = "#6f7b7e";
        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.moveTo(8, 21);
        ctx.lineTo(62, 7);
        ctx.quadraticCurveTo(72, 4, 74, 12);
        ctx.stroke();
        line(9, 19, 60, 6, 1.2, "#b8c0bd");
        line(8, 21, 3, 15, 5, "#566164");
      } else if (weaponId === "spear") {
        line(4, 22, 64, 8, 5, "#6c4b31");
        line(8, 20, 61, 8, 1.2, woodLight);
        fillPoly([[59, 5], [75, 6], [66, 14]], "#c7cfcc");
        line(60, 7, 70, 7, 1, "#f0f2e9");
        line(58, 10, 65, 14, 2, "#4d3830");
      } else if (weaponId === "sledgehammer") {
        line(6, 23, 55, 8, 8, "#62432d");
        line(10, 21, 51, 8, 2.4, woodLight);
        fillRound(47, 3, 27, 12, 2, steel);
        ctx.fillStyle = "#333c3e";
        ctx.fillRect(49, 5, 4, 8);
        ctx.fillRect(68, 5, 4, 8);
      }
    }

    ctx.restore();
    return true;
  }

  function decorateInventory(game) {
    const list = document.getElementById("inventoryList");
    if (!list || !game.player?.inventory) return;

    const rows = [...list.children].filter(element => element.classList?.contains("item-row"));

    rows.forEach((row, index) => {
      const weaponId = game.player.inventory[index]?.id;
      if (!WEAPONS.has(weaponId)) return;

      row.dataset.hcWeapon = "true";
      row.dataset.weaponId = weaponId;
      const holder = row.querySelector(".item-icon");
      if (!holder) return;

      holder.classList.add("hc-weapon-icon-wrap");
      let canvas = holder.querySelector("canvas.hc-weapon-icon");
      if (!canvas) {
        canvas = document.createElement("canvas");
        holder.replaceChildren(canvas);
      }
      drawWeaponIcon(canvas, weaponId);
    });
  }

  function decorateHotbar(game) {
    const hotbar = document.getElementById("hotbar");
    if (!hotbar || !game.player?.hotbar) return;

    [...hotbar.children].forEach((slot, index) => {
      const weaponId = game.player.hotbar[index];
      if (!WEAPONS.has(weaponId)) return;

      slot.dataset.hcWeapon = "true";
      slot.dataset.weaponId = weaponId;
      const holder = slot.querySelector(".item-icon");
      if (!holder) return;

      holder.classList.add("hc-weapon-icon-wrap");
      let canvas = holder.querySelector("canvas.hc-weapon-icon");
      if (!canvas) {
        canvas = document.createElement("canvas");
        holder.replaceChildren(canvas);
      }
      drawWeaponIcon(canvas, weaponId);
    });
  }

  function injectStyles() {
    if (document.getElementById("hcGritAndSteelStyles")) return;

    const style = document.createElement("style");
    style.id = "hcGritAndSteelStyles";
    style.textContent = `
      :root {
        --hc-iron: #111816;
        --hc-iron-2: #070c0a;
        --hc-paper: #d8d8c8;
        --hc-rust: #9a5d3c;
        --hc-moss-bright: #a9b989;
      }

      body {
        background: #050806;
      }

      #game {
        isolation: isolate;
        background: #080c09;
      }

      #gameCanvas {
        z-index: 0;
        filter: saturate(.84) contrast(1.095) brightness(.955) sepia(.035);
      }

      #game::before {
        content: "";
        position: absolute;
        z-index: 1;
        inset: 0;
        pointer-events: none;
        opacity: .13;
        background:
          repeating-linear-gradient(0deg, rgba(255,255,255,.012) 0 1px, transparent 1px 4px),
          radial-gradient(circle at 18% 11%, rgba(209,202,154,.08), transparent 28%),
          radial-gradient(circle at 88% 87%, rgba(15,28,21,.2), transparent 36%);
        mix-blend-mode: soft-light;
      }

      #menu.menu-screen {
        background:
          linear-gradient(112deg, rgba(3,7,5,.97) 0 43%, rgba(10,16,12,.91) 64%, rgba(4,8,6,.98)),
          repeating-linear-gradient(104deg, rgba(177,189,159,.018) 0 1px, transparent 1px 13px);
      }

      #menu.menu-screen::after {
        opacity: .7;
        background:
          linear-gradient(102deg, transparent 0 48%, rgba(176,189,157,.04) 48.1% 48.25%, transparent 48.4%),
          radial-gradient(ellipse at 73% 27%, rgba(118,135,98,.12), transparent 37%),
          repeating-linear-gradient(0deg, rgba(255,255,255,.013) 0 1px, transparent 1px 4px);
      }

      #menu .title-block h1 {
        color: #e1e2d4;
        text-shadow: 0 3px 0 #090d0b, 0 16px 40px rgba(0,0,0,.72);
        letter-spacing: -.045em;
      }

      #menu .title-block h1 span {
        color: #95a77c;
        text-shadow: 0 2px 0 #162018, 0 15px 34px rgba(0,0,0,.72);
      }

      #menu .start-card {
        border-color: rgba(185,200,164,.2);
        background:
          linear-gradient(145deg, rgba(25,34,28,.96), rgba(6,10,8,.985)),
          repeating-linear-gradient(111deg, transparent 0 17px, rgba(255,255,255,.015) 17px 18px);
        box-shadow: 0 30px 90px rgba(0,0,0,.58), inset 0 1px rgba(229,229,205,.055);
      }

      #game .hud-top,
      #game .day-readout,
      #game .location-readout,
      #game .minimap-wrap,
      #game .vitals,
      #game .hotbar,
      #game .side-panel,
      #game .modal-card,
      #game .death-card,
      #gunHud,
      #hcConditionWidget,
      #hcVehicleHud {
        border-color: rgba(183,198,164,.17) !important;
        background-color: rgba(5,10,7,.86) !important;
        box-shadow: 0 14px 38px rgba(0,0,0,.32), inset 0 1px rgba(255,255,240,.025) !important;
      }

      #game .hud-top {
        background:
          linear-gradient(180deg, rgba(8,14,10,.94), rgba(5,9,7,.77) 72%, transparent) !important;
      }

      #game .hot-slot {
        overflow: hidden;
        border-color: rgba(190,204,175,.12) !important;
        background:
          linear-gradient(150deg, rgba(31,41,34,.8), rgba(7,11,9,.94)) !important;
      }

      #game .hot-slot.selected {
        border-color: rgba(190,207,157,.52) !important;
        background:
          radial-gradient(circle at 50% 25%, rgba(167,186,132,.18), transparent 68%),
          linear-gradient(150deg, rgba(39,51,40,.92), rgba(8,13,10,.97)) !important;
        box-shadow: 0 0 22px rgba(126,150,101,.16), inset 0 -2px #a7b783 !important;
      }

      #game .item-row[data-hc-weapon="true"] {
        grid-template-columns: 70px minmax(0,1fr) auto !important;
        border-color: rgba(182,198,164,.14) !important;
        background:
          linear-gradient(145deg, rgba(30,40,33,.76), rgba(7,12,9,.91)) !important;
      }

      #game .item-row[data-hc-weapon="true"]:hover,
      #game .item-row[data-hc-weapon="true"].selected {
        border-color: rgba(183,203,151,.42) !important;
        background:
          linear-gradient(145deg, rgba(47,61,47,.79), rgba(10,16,12,.94)) !important;
      }

      #game .item-row .item-icon.hc-weapon-icon-wrap {
        width: 66px !important;
        min-width: 66px;
        height: 34px !important;
        overflow: hidden;
        border-color: rgba(192,205,183,.13) !important;
        background:
          radial-gradient(circle at 50% 30%, rgba(184,196,170,.08), transparent 70%),
          #080d0a !important;
      }

      canvas.hc-weapon-icon {
        display: block;
        width: 66px;
        height: 25px;
        image-rendering: auto;
        pointer-events: none;
      }

      #game .hot-slot .item-icon.hc-weapon-icon-wrap {
        display: grid;
        width: 42px !important;
        height: 24px !important;
        place-items: center;
        transform: translateY(-1px);
      }

      #game .hot-slot canvas.hc-weapon-icon {
        width: 41px;
        height: 16px;
      }

      #inventoryPanel,
      #craftPanel,
      #lootPanel {
        background:
          radial-gradient(circle at 100% 0, rgba(119,139,97,.1), transparent 35%),
          repeating-linear-gradient(115deg, transparent 0 21px, rgba(255,255,255,.009) 21px 22px),
          linear-gradient(180deg, rgba(14,22,17,.985), rgba(5,9,7,.995)) !important;
      }

      #game .toast {
        border-left: 2px solid #8ea174 !important;
      }

      @media (pointer: coarse), (max-width: 760px) {
        #gameCanvas {
          filter: saturate(.88) contrast(1.075) brightness(.97) sepia(.025);
        }

        #game::before {
          opacity: .075;
        }

        #game .item-row[data-hc-weapon="true"] {
          grid-template-columns: 62px minmax(0,1fr) auto !important;
        }

        #game .item-row .item-icon.hc-weapon-icon-wrap {
          width: 58px !important;
          min-width: 58px;
        }

        #game .item-row canvas.hc-weapon-icon {
          width: 58px;
          height: 22px;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        #gameCanvas { transition: none !important; }
      }
    `;

    document.head.append(style);
  }

  function installWorldHooks(game) {
    if (typeof game.drawTile === "function") {
      const originalDrawTile = game.drawTile.bind(game);
      game.drawTile = function gritDrawTile(ctx, tx, ty, shakeX = 0, shakeY = 0) {
        const result = originalDrawTile(ctx, tx, ty, shakeX, shakeY);
        drawGroundDetail(this, ctx, tx, ty, shakeX, shakeY);
        return result;
      };
    }

    if (typeof game.drawCars === "function") {
      const originalDrawCars = game.drawCars.bind(game);
      game.drawCars = function gritDrawCars(ctx, shakeX = 0, shakeY = 0) {
        drawCarShadows(this, ctx, shakeX, shakeY);
        const result = originalDrawCars(ctx, shakeX, shakeY);
        drawCarWeathering(this, ctx, shakeX, shakeY);
        return result;
      };
    }

    if (typeof game.render === "function") {
      const originalRender = game.render.bind(game);
      game.render = function gritRender(...args) {
        const result = originalRender(...args);
        drawScreenGrade(this);
        return result;
      };
    }
  }

  function installUiHooks(game) {
    if (typeof game.renderInventory === "function") {
      const originalRenderInventory = game.renderInventory.bind(game);
      game.renderInventory = function gritInventory(...args) {
        const result = originalRenderInventory(...args);
        decorateInventory(this);
        return result;
      };
    }

    if (typeof game.updateHotbar === "function") {
      const originalUpdateHotbar = game.updateHotbar.bind(game);
      game.updateHotbar = function gritHotbar(...args) {
        const result = originalUpdateHotbar(...args);
        decorateHotbar(this);
        return result;
      };
    }

    for (const methodName of ["startNew", "loadSaved"]) {
      if (typeof game[methodName] !== "function") continue;
      const original = game[methodName].bind(game);
      game[methodName] = function gritRunSetup(...args) {
        const result = original(...args);
        setSeed(this.world?.seed);
        decorateInventory(this);
        decorateHotbar(this);
        return result;
      };
    }
  }

  function updateDeviceProfile(game) {
    state.mobile = Boolean(
      window.matchMedia?.("(pointer: coarse)")?.matches ||
      window.innerWidth < 760 ||
      (navigator.deviceMemory && navigator.deviceMemory <= 4)
    );
    state.reducedMotion = Boolean(
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches
    );
    state.grainCanvas = createGrainCanvas();
    state.grainPattern = null;
    game.__hcVisualQuality = state.mobile ? "mobile-balanced" : "full";
  }

  function install(game) {
    if (!game || game[INSTALL_FLAG]) return;

    game[INSTALL_FLAG] = true;
    updateDeviceProfile(game);
    injectStyles();
    installWorldHooks(game);
    installUiHooks(game);
    setSeed(game.world?.seed);
    decorateInventory(game);
    decorateHotbar(game);

    let resizeTimer = 0;
    window.addEventListener("resize", () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => updateDeviceProfile(game), 180);
    });

    window.__hcWeaponIconRenderer = drawWeaponIcon;
    game.__hcVisualOverhaulVersion = VERSION;
  }

  if (typeof window === "undefined") return;

  if (window.__walkers) {
    install(window.__walkers);
  } else {
    window.addEventListener("load", () => install(window.__walkers), { once: true });
  }
})();
