(() => {
  "use strict";

  /*
   * Hollow County — Articulated Survivor & Undead renderer
   *
   * Original procedural character art with an eight-direction, three-quarter
   * survival-game presentation. No external sprites or third-party assets.
   */

  const INSTALL_FLAG = "__hcArticulatedCharactersV1";
  const VERSION = "1.0.0";

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

  const LONG_GUNS = new Set([
    "smg",
    "shotgun",
    "double_barrel",
    "rifle",
    "carbine",
    "assault_rifle",
    "lever_rifle",
    "auto_shotgun",
    "sniper_rifle",
    "lmg"
  ]);

  const TWO_HANDED = new Set([
    "bat",
    "axe",
    "machete",
    "katana",
    "crowbar",
    "spear",
    "sledgehammer"
  ]);

  const THRUSTING = new Set(["knife", "spear"]);

  const SKINS = Object.freeze({
    light: ["#efc5a3", "#c48e6d", "#8d5f4c"],
    warm: ["#dba27b", "#aa7355", "#754936"],
    medium: ["#ba8161", "#875740", "#5d392d"],
    brown: ["#94634a", "#684331", "#472c24"],
    deep: ["#724937", "#503126", "#351f1a"],
    dark: ["#533328", "#382119", "#241410"]
  });

  const HAIR = Object.freeze({
    dark: "#171514",
    brown: "#4a3024",
    auburn: "#713f2d",
    blond: "#b89858",
    gray: "#777b78"
  });

  const ACCENTS = Object.freeze({
    olive: "#9baa78",
    blue: "#6e9db4",
    red: "#b64e49",
    tan: "#bd9d66",
    purple: "#8f78a5"
  });

  const PLAYER_OUTFITS = Object.freeze({
    tactical: {
      shirt: "#3c4546",
      shirtLight: "#566062",
      dark: "#242b2d",
      vest: "#181d1f",
      pants: "#3b4344",
      pantsLight: "#535c5c",
      boot: "#15191a"
    },
    ranger: {
      shirt: "#536955",
      shirtLight: "#71826b",
      dark: "#334338",
      vest: "#39493b",
      pants: "#353f39",
      pantsLight: "#536057",
      boot: "#1c211e"
    },
    sheriff: {
      shirt: "#425d70",
      shirtLight: "#668097",
      dark: "#293c49",
      vest: "#303e47",
      pants: "#303b43",
      pantsLight: "#53616b",
      boot: "#171c1f"
    },
    medic: {
      shirt: "#74847f",
      shirtLight: "#a2afaa",
      dark: "#485651",
      vest: "#d1d7d2",
      pants: "#424d49",
      pantsLight: "#65716c",
      boot: "#1a201d"
    },
    scavenger: {
      shirt: "#685747",
      shirtLight: "#8a755f",
      dark: "#42372f",
      vest: "#4c4036",
      pants: "#403b37",
      pantsLight: "#645b53",
      boot: "#201c19"
    }
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
    raider: ["#443a3a", "#292223", "#383233"],
    leather: ["#3a302d", "#211b19", "#332c2a"],
    enforcer: ["#354043", "#202629", "#333a3d"],
    bandit: ["#533b3d", "#302224", "#383235"]
  });

  const ZOMBIE_LOOKS = Object.freeze([
    { skin: "#87906f", skinDark: "#5d664d", shirt: "#5a6451", dark: "#343d32", pants: "#343b37", accent: "#7b3b36", hair: "#292820" },
    { skin: "#9b8c6e", skinDark: "#6f624d", shirt: "#4f5c64", dark: "#303a40", pants: "#3b3a38", accent: "#8a413a", hair: "#32271f" },
    { skin: "#79896a", skinDark: "#526048", shirt: "#6e5848", dark: "#45372e", pants: "#38403a", accent: "#6e302d", hair: "#211f1c" },
    { skin: "#a08f71", skinDark: "#71634d", shirt: "#605469", dark: "#3d3544", pants: "#343941", accent: "#913f3a", hair: "#3a3128" },
    { skin: "#71836d", skinDark: "#4c5b4b", shirt: "#8a7f52", dark: "#504b32", pants: "#42433c", accent: "#78332f", hair: "#25281f" }
  ]);

  const state = {
    dt: 1 / 60,
    pose: new WeakMap(),
    previewTimer: 0
  };

  function clamp(value, minimum, maximum) {
    return Math.max(minimum, Math.min(maximum, value));
  }

  function lerp(from, to, amount) {
    return from + (to - from) * amount;
  }

  function normalize(x, y) {
    const length = Math.hypot(x, y) || 1;
    return { x: x / length, y: y / length };
  }

  function hash(value) {
    const text = String(value ?? "HOLLOW");
    let result = 2166136261;
    for (let index = 0; index < text.length; index += 1) {
      result ^= text.charCodeAt(index);
      result = Math.imul(result, 16777619);
    }
    return (result >>> 0) / 4294967295;
  }

  function roundedPath(ctx, x, y, width, height, radius) {
    const safeRadius = Math.max(0, Math.min(radius, width / 2, height / 2));
    ctx.beginPath();
    if (typeof ctx.roundRect === "function") {
      ctx.roundRect(x, y, width, height, safeRadius);
      return;
    }
    ctx.moveTo(x + safeRadius, y);
    ctx.lineTo(x + width - safeRadius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + safeRadius);
    ctx.lineTo(x + width, y + height - safeRadius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - safeRadius, y + height);
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

  function verticalGradient(ctx, top, bottom, y1, y2) {
    const gradient = ctx.createLinearGradient(0, y1, 0, y2);
    gradient.addColorStop(0, top);
    gradient.addColorStop(1, bottom);
    return gradient;
  }

  function poseFor(entity, targetX, targetY, move) {
    const target = normalize(targetX, targetY);
    let visual = state.pose.get(entity);

    if (!visual) {
      visual = {
        fx: target.x,
        fy: target.y,
        move: clamp(move || 0, 0, 1),
        death: 0,
        seed: hash(`${entity?.id || entity?.name || "entity"}:pose`) * Math.PI * 2
      };
      state.pose.set(entity, visual);
      return visual;
    }

    const facingSpeed = 1 - Math.exp(-state.dt * 13);
    const motionSpeed = 1 - Math.exp(-state.dt * 10);
    visual.fx = lerp(visual.fx, target.x, facingSpeed);
    visual.fy = lerp(visual.fy, target.y, facingSpeed);
    const corrected = normalize(visual.fx, visual.fy);
    visual.fx = corrected.x;
    visual.fy = corrected.y;
    visual.move = lerp(visual.move, clamp(move || 0, 0, 1), motionSpeed);
    return visual;
  }

  function strokeSegment(ctx, from, to, width, color, outline = "#111615", highlight = null) {
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = outline;
    ctx.lineWidth = width + 1.6;
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.stroke();

    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.stroke();

    if (highlight) {
      ctx.strokeStyle = highlight;
      ctx.lineWidth = Math.max(0.7, width * 0.18);
      ctx.beginPath();
      ctx.moveTo(from.x - 0.6, from.y - 0.6);
      ctx.lineTo(to.x - 0.6, to.y - 0.6);
      ctx.stroke();
    }
  }

  function jointedLimb(ctx, root, joint, end, width, color, highlight = null, endColor = null) {
    strokeSegment(ctx, root, joint, width, color, "#111615", highlight);
    strokeSegment(ctx, joint, end, width * 0.9, color, "#111615", highlight);
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(joint.x, joint.y, width * 0.48, 0, Math.PI * 2);
    ctx.fill();
    if (endColor) {
      ctx.fillStyle = "#111514";
      ctx.beginPath();
      ctx.arc(end.x, end.y, width * 0.52 + 1, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = endColor;
      ctx.beginPath();
      ctx.arc(end.x, end.y, width * 0.48, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function drawShoe(ctx, foot, facing, color, size = 1) {
    const angle = Math.atan2(facing.y * 0.45, facing.x || 0.001);
    ctx.save();
    ctx.translate(foot.x + facing.x * 1.3, foot.y);
    ctx.rotate(angle);
    ctx.fillStyle = "#0b0e0d";
    ctx.beginPath();
    ctx.ellipse(0, 0, 5.2 * size, 2.8 * size, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.ellipse(0.4, -0.5, 4.2 * size, 1.8 * size, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function drawGroundShadow(ctx, moving, crouching = false, dead = false, scale = 1) {
    const radius = dead ? 23 : 14 + moving * 2;
    ctx.save();
    ctx.scale(scale, 1);
    const shadow = ctx.createRadialGradient(2, 2, 1, 2, 2, radius);
    shadow.addColorStop(0, "rgba(0,2,1,.47)");
    shadow.addColorStop(0.7, "rgba(0,2,1,.25)");
    shadow.addColorStop(1, "rgba(0,2,1,0)");
    ctx.fillStyle = shadow;
    ctx.beginPath();
    ctx.ellipse(2, 2, radius, dead ? 8 : crouching ? 7 : 5.8, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function drawHair(ctx, style, color, headX, headY, side) {
    if (style === "bald") return;
    ctx.fillStyle = color;

    if (style === "buzz") {
      ctx.beginPath();
      ctx.ellipse(headX - side * 0.8, headY - 3.7, 6.5, 4.1, side * 0.08, Math.PI, Math.PI * 2);
      ctx.fill();
    } else if (style === "curls") {
      for (const [x, y, radius] of [[-5, -4, 3.2], [-2, -6, 3.3], [2, -6, 3.4], [5, -4, 3], [-6, -1, 2.6]]) {
        ctx.beginPath();
        ctx.arc(headX + x, headY + y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
    } else if (style === "braids") {
      ctx.beginPath();
      ctx.ellipse(headX - side, headY - 4, 6.7, 4.3, 0, Math.PI, Math.PI * 2);
      ctx.fill();
      const backX = headX - side * 6;
      for (let index = 0; index < 4; index += 1) {
        ctx.beginPath();
        ctx.arc(backX - side * index * 0.5, headY + index * 3, 2.2 - index * 0.18, 0, Math.PI * 2);
        ctx.fill();
      }
    } else if (style === "bun") {
      ctx.beginPath();
      ctx.ellipse(headX - side, headY - 4, 6.5, 4.2, 0, Math.PI, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(headX - side * 6, headY - 5, 4, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.beginPath();
      ctx.ellipse(headX - side, headY - 4, 6.8, 4.5, side * 0.08, Math.PI, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(headX - side * 5.4, headY - 0.5, 2.2, 5.1, 0, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function drawHeadgear(ctx, kind, color, accent, headX, headY, side) {
    if (!kind || kind === "none") return;

    if (kind === "helmet") {
      ctx.fillStyle = "#101413";
      ctx.beginPath();
      ctx.ellipse(headX, headY - 4.7, 8.7, 6.3, 0, Math.PI, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.ellipse(headX, headY - 4.8, 7.5, 5.2, 0, Math.PI, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "rgba(221,226,212,.2)";
      ctx.beginPath();
      ctx.ellipse(headX - 2, headY - 6.3, 3.2, 1.4, -0.2, Math.PI, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#151a19";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(headX - 7, headY - 2);
      ctx.lineTo(headX + 7, headY - 2);
      ctx.stroke();
      ctx.fillStyle = accent;
      ctx.fillRect(headX + side * 3 - 1.5, headY - 6, 3, 2);
    } else if (kind === "cap") {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.ellipse(headX - side, headY - 4.8, 7, 4.2, 0, Math.PI, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#151918";
      ctx.lineWidth = 2.3;
      ctx.beginPath();
      ctx.moveTo(headX - side * 1, headY - 2);
      ctx.lineTo(headX + side * 9, headY - 1);
      ctx.stroke();
      ctx.fillStyle = accent;
      ctx.beginPath();
      ctx.arc(headX, headY - 6, 1.3, 0, Math.PI * 2);
      ctx.fill();
    } else if (kind === "beanie") {
      ctx.fillStyle = "#111514";
      ctx.beginPath();
      ctx.ellipse(headX, headY - 4.2, 7.7, 5.8, 0, Math.PI, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.ellipse(headX, headY - 4.2, 6.7, 4.8, 0, Math.PI, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = accent;
      roundedPath(ctx, headX - 6.5, headY - 3.4, 13, 2.6, 1);
      ctx.fill();
    }
  }

  function drawFace(ctx, look, head, facing, flash = false, zombie = false, jawOpen = 0) {
    const side = facing.x >= 0 ? 1 : -1;
    const frontness = clamp((facing.y + 1) / 2, 0, 1);
    const skin = look.skin;
    const headX = head.x + facing.x * 1.7;
    const headY = head.y + facing.y * 0.8;

    ctx.fillStyle = "#111514";
    ctx.beginPath();
    ctx.ellipse(headX, headY, 7.7, 8.4, side * 0.04, 0, Math.PI * 2);
    ctx.fill();

    const faceGradient = verticalGradient(
      ctx,
      flash ? "#fff6ec" : skin[0],
      flash ? "#e8ddd3" : skin[1],
      headY - 7,
      headY + 7
    );
    ctx.fillStyle = faceGradient;
    ctx.beginPath();
    ctx.ellipse(headX, headY - 0.4, 6.5, 7.2, side * 0.04, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = flash ? "#f2e8df" : skin[1];
    ctx.beginPath();
    ctx.ellipse(headX - side * 6.1, headY + 0.3, 1.8, 2.8, 0, 0, Math.PI * 2);
    ctx.fill();

    if (facing.y > -0.72) {
      const eyeY = headY - 1.4 + Math.max(0, facing.y) * 1.2;
      ctx.fillStyle = zombie ? "#c9d18a" : "#231f1b";
      if (Math.abs(facing.x) > 0.58) {
        ctx.beginPath();
        ctx.ellipse(headX + side * 2.1, eyeY, 1.2, 0.9, 0, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.beginPath();
        ctx.ellipse(headX - 2.4, eyeY, 1.1, 0.8, 0, 0, Math.PI * 2);
        ctx.ellipse(headX + 2.4, eyeY, 1.1, 0.8, 0, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.fillStyle = flash ? "#f2e5db" : skin[2];
      ctx.beginPath();
      ctx.ellipse(headX + side * 5.2, headY + 0.7, 1.7 + frontness * 0.4, 1.25, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = zombie ? "#4d1716" : "#6d3d32";
      if (zombie && jawOpen > 0.2) {
        roundedPath(ctx, headX - 2 + side, headY + 3.2, 5, 2.2 + jawOpen * 4.5, 1.2);
        ctx.fill();
        ctx.fillStyle = "#ddd3b3";
        for (let tooth = 0; tooth < 3; tooth += 1) {
          ctx.fillRect(headX - 1 + side + tooth * 1.4, headY + 3.5, 0.7, 1.4);
        }
      } else {
        ctx.beginPath();
        ctx.ellipse(headX + side, headY + 4.2, zombie ? 2.6 : 2.1, zombie ? 1.2 : 0.7, 0, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    if (!zombie) {
      drawHair(ctx, look.hair, look.hairColor, headX, headY, side);
      drawHeadgear(ctx, look.headgear, look.headgearColor, look.accent, headX, headY, side);
    } else {
      ctx.fillStyle = look.hair;
      ctx.beginPath();
      ctx.ellipse(headX - side * 1.2, headY - 4.7, 6.2, 3.8, 0, Math.PI, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = look.accent;
      ctx.beginPath();
      ctx.ellipse(headX - side * 3, headY + 1, 1.8, 3.2, 0.4, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function drawHumanTorso(ctx, body, look, flash, crouching, hasPack, role) {
    const width = look.build === "slim" ? 9 : look.build === "sturdy" ? 11 : 10;
    const shoulderY = body.y - 7;
    const waistY = body.y + (crouching ? 8 : 10);

    if (hasPack) {
      ctx.fillStyle = "#111613";
      roundedPath(ctx, body.x - width - 2 - body.facingX, body.y - 6, width * 2 + 4, 20, 5);
      ctx.fill();
      ctx.fillStyle = "#46523e";
      roundedPath(ctx, body.x - width - body.facingX, body.y - 4, width * 2, 16, 4);
      ctx.fill();
      ctx.fillStyle = "#a4874d";
      roundedPath(ctx, body.x - 3 - body.facingX, body.y + 7, 6, 3, 1);
      ctx.fill();
    }

    ctx.fillStyle = "#101514";
    polygon(ctx, [
      [body.x - width - 2, shoulderY],
      [body.x + width + 2, shoulderY],
      [body.x + width - 1, waistY],
      [body.x - width + 1, waistY]
    ]);
    ctx.fill();

    ctx.fillStyle = verticalGradient(ctx, flash ? "#f2ece4" : look.shirtLight, flash ? "#ddd6ce" : look.shirt, shoulderY, waistY);
    polygon(ctx, [
      [body.x - width, shoulderY + 1],
      [body.x + width, shoulderY + 1],
      [body.x + width - 2, waistY - 1],
      [body.x - width + 2, waistY - 1]
    ]);
    ctx.fill();

    ctx.fillStyle = flash ? "#ddd6ce" : look.vest;
    roundedPath(ctx, body.x - width + 2, body.y - 4, width * 2 - 4, 13, 3);
    ctx.fill();

    ctx.fillStyle = "rgba(227,232,218,.12)";
    roundedPath(ctx, body.x - width + 3, body.y - 3, width * 2 - 6, 2, 1);
    ctx.fill();

    ctx.strokeStyle = flash ? "#c9c3bc" : look.dark;
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.moveTo(body.x, body.y - 3);
    ctx.lineTo(body.x, waistY - 2);
    ctx.stroke();

    ctx.fillStyle = look.accent;
    if (look.outfit === "medic" || role === "medic") {
      ctx.fillRect(body.x - 1.2, body.y - 1, 2.4, 8);
      ctx.fillRect(body.x - 4, body.y + 1.6, 8, 2.4);
    } else if (look.outfit === "sheriff" || role === "guard") {
      ctx.beginPath();
      ctx.arc(body.x + 5, body.y - 1, 2, 0, Math.PI * 2);
      ctx.fill();
    } else if (look.outfit === "scavenger" || ["worker", "mechanic"].includes(look.outfit)) {
      ctx.fillRect(body.x - 6, body.y - 3, 2, 12);
      ctx.fillRect(body.x + 4, body.y - 3, 2, 12);
    } else {
      roundedPath(ctx, body.x + 3.5, body.y - 2, 3.5, 3.5, 1);
      ctx.fill();
    }

    ctx.fillStyle = "rgba(8,12,10,.35)";
    roundedPath(ctx, body.x - width + 3, body.y + 5, 5, 4, 1);
    ctx.fill();
    roundedPath(ctx, body.x + width - 8, body.y + 5, 5, 4, 1);
    ctx.fill();
  }

  function drawMeleeWeapon(ctx, id, x, y, dx, dy) {
    const direction = normalize(dx, dy);
    const angle = Math.atan2(direction.y, direction.x);
    const lengths = {
      knife: 19,
      hammer: 25,
      bat: 35,
      axe: 35,
      machete: 38,
      katana: 46,
      crowbar: 37,
      spear: 55,
      sledgehammer: 41
    };
    const length = lengths[id] || 26;

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.shadowColor = "rgba(0,0,0,.65)";
    ctx.shadowBlur = 2.5;
    ctx.shadowOffsetX = 1.5;
    ctx.shadowOffsetY = 2;

    const steel = verticalGradient(ctx, "#e0e6e2", "#4f5a5c", -7, 7);
    const wood = verticalGradient(ctx, "#a8754f", "#442a1e", -5, 5);
    const line = (x1, y1, x2, y2, width, color) => {
      ctx.strokeStyle = "#111514";
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
    };

    if (id === "knife") {
      line(-7, 0, 5, 0, 6, "#6a4633");
      ctx.fillStyle = steel;
      polygon(ctx, [[4, -3], [length + 4, -2], [length + 8, 0], [length + 3, 2.5], [4, 2.7]]);
      ctx.fill();
      ctx.strokeStyle = "rgba(255,255,245,.72)";
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.moveTo(7, -1.6);
      ctx.lineTo(length + 3, -1.2);
      ctx.stroke();
    } else if (id === "hammer") {
      line(-8, 0, length - 4, 0, 5, wood);
      ctx.fillStyle = steel;
      roundedPath(ctx, length - 8, -6, 14, 12, 2);
      ctx.fill();
      ctx.fillStyle = "#586264";
      polygon(ctx, [[length - 8, -4], [length - 15, -7], [length - 12, 0], [length - 8, 2]]);
      ctx.fill();
    } else if (id === "bat") {
      ctx.fillStyle = "#1f1712";
      polygon(ctx, [[-9, -4], [length - 5, -6], [length + 4, -4], [length + 6, 0], [length + 4, 4], [length - 5, 6], [-9, 4]]);
      ctx.fill();
      ctx.fillStyle = wood;
      polygon(ctx, [[-8, -2.8], [length - 5, -4.5], [length + 3, -3], [length + 4, 0], [length + 3, 3], [length - 5, 4.5], [-8, 2.8]]);
      ctx.fill();
      for (let wrap = -6; wrap < 4; wrap += 3) line(wrap, -2.5, wrap - 1, 2.5, 0.7, "#b8a28a");
    } else if (id === "axe") {
      line(-9, 0, length, 0, 5.5, wood);
      ctx.fillStyle = "#8d3732";
      polygon(ctx, [[length - 7, -9], [length + 5, -7], [length + 9, 0], [length + 5, 7], [length - 7, 9], [length - 4, 0]]);
      ctx.fill();
      ctx.fillStyle = steel;
      polygon(ctx, [[length + 3, -7], [length + 10, -2], [length + 10, 2], [length + 3, 7], [length + 5, 1], [length + 5, -1]]);
      ctx.fill();
    } else if (id === "machete") {
      line(-8, 0, 6, 0, 7, "#35322d");
      ctx.fillStyle = steel;
      ctx.beginPath();
      ctx.moveTo(5, -3);
      ctx.quadraticCurveTo(length - 5, -7, length + 5, -3);
      ctx.quadraticCurveTo(length + 8, 0, length + 1, 4);
      ctx.lineTo(5, 2.5);
      ctx.closePath();
      ctx.fill();
    } else if (id === "katana") {
      line(-11, 0, 7, 0, 6, "#242526");
      for (let wrap = -9; wrap < 5; wrap += 3) line(wrap, -2.4, wrap + 2, 2.4, 0.8, "#9d4c43");
      ctx.fillStyle = "#b49b57";
      roundedPath(ctx, 5, -6, 3, 12, 1);
      ctx.fill();
      ctx.strokeStyle = "#202728";
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.moveTo(7, 0);
      ctx.quadraticCurveTo(length * 0.7, 1, length + 5, -4);
      ctx.stroke();
      ctx.strokeStyle = steel;
      ctx.lineWidth = 4;
      ctx.stroke();
      ctx.strokeStyle = "rgba(255,255,248,.78)";
      ctx.lineWidth = 0.9;
      ctx.stroke();
    } else if (id === "crowbar") {
      ctx.strokeStyle = "#281313";
      ctx.lineWidth = 7;
      ctx.beginPath();
      ctx.moveTo(-8, 6);
      ctx.quadraticCurveTo(-12, 0, -5, -3);
      ctx.lineTo(length - 4, -1);
      ctx.quadraticCurveTo(length + 5, -1, length + 4, -9);
      ctx.stroke();
      ctx.strokeStyle = "#a94640";
      ctx.lineWidth = 4.2;
      ctx.stroke();
    } else if (id === "spear") {
      line(-13, 0, length - 2, 0, 4.8, wood);
      ctx.fillStyle = steel;
      polygon(ctx, [[length - 3, -6], [length + 12, 0], [length - 3, 6], [length + 1, 0]]);
      ctx.fill();
      for (let wrap = length - 10; wrap < length - 2; wrap += 2.5) line(wrap, -2.7, wrap - 1, 2.7, 0.8, "#9a7657");
    } else if (id === "sledgehammer") {
      line(-11, 0, length - 3, 0, 6, wood);
      ctx.fillStyle = steel;
      roundedPath(ctx, length - 9, -10, 18, 20, 2.5);
      ctx.fill();
      ctx.fillStyle = "#4f595b";
      roundedPath(ctx, length - 11, -8, 5, 16, 1.5);
      ctx.fill();
      roundedPath(ctx, length + 6, -8, 5, 16, 1.5);
      ctx.fill();
    }

    ctx.restore();
  }

  function drawActionProp(ctx, kind, itemId, hand, progress) {
    if (!kind) return;
    const lift = Math.sin(clamp(progress, 0, 1) * Math.PI);
    ctx.save();
    ctx.translate(hand.x, hand.y - lift * 2);
    ctx.rotate(-0.45 + lift * 0.85);
    ctx.fillStyle = "#111514";

    if (kind === "drink") {
      roundedPath(ctx, -3, -8, 6, 13, 2);
      ctx.fill();
      ctx.fillStyle = itemId === "soda" ? "#a9473f" : "#6b9bad";
      roundedPath(ctx, -2, -6, 4, 9, 1);
      ctx.fill();
      ctx.fillStyle = "#d7ded6";
      ctx.fillRect(-1.5, -10, 3, 3);
    } else if (kind === "medical") {
      ctx.fillStyle = "#d8d8ca";
      roundedPath(ctx, -6, -4, 12, 8, 1.5);
      ctx.fill();
      ctx.fillStyle = "#a8433f";
      ctx.fillRect(-1, -3, 2, 6);
      ctx.fillRect(-4, -1, 8, 2);
    } else {
      ctx.fillStyle = itemId === "jerky" ? "#914f34" : "#b49b5c";
      roundedPath(ctx, -5, -4, 10, 8, 2);
      ctx.fill();
      ctx.fillStyle = "#e0d6b8";
      ctx.fillRect(-3, -1, 6, 2);
    }

    ctx.restore();
  }

  function humanLook(entity, npc = false) {
    if (!npc) {
      const appearance = entity.appearance || {};
      const outfit = appearance.outfit || "tactical";
      const colors = PLAYER_OUTFITS[outfit] || PLAYER_OUTFITS.tactical;
      return {
        ...colors,
        skin: SKINS[appearance.skin] || SKINS.medium,
        hair: appearance.hair || "short",
        hairColor: HAIR[appearance.hairColor] || HAIR.dark,
        headgear: appearance.headgear || "none",
        headgearColor: colors.dark,
        accent: ACCENTS[appearance.accent] || ACCENTS.olive,
        build: appearance.build || "standard",
        outfit
      };
    }

    const fixed = entity.__fixedNpcLook || {};
    const seed = `${entity.id || entity.name || "npc"}:${entity.visualSeed || 0}`;
    const outfits = entity.attitude === "aggressive"
      ? ["raider", "leather", "enforcer", "bandit"]
      : entity.attitude === "passive"
        ? ["hoodie", "medic", "worker", "civilian", "raincoat"]
        : ["hunter", "mechanic", "sheriff", "ranger", "drifter"];
    const outfit = fixed.outfit || outfits[Math.floor(hash(`${seed}:outfit`) * outfits.length) % outfits.length];
    const palette = NPC_PALETTES[outfit] || NPC_PALETTES.drifter;
    const skinId = fixed.skin || Object.keys(SKINS)[Math.floor(hash(`${seed}:skin`) * Object.keys(SKINS).length) % Object.keys(SKINS).length];
    const hairId = fixed.hair || ["buzz", "short", "curls", "braids", "bun", "bald"][Math.floor(hash(`${seed}:hair`) * 6) % 6];
    const hairColorId = fixed.hairColor || ["dark", "brown", "auburn", "blond", "gray"][Math.floor(hash(`${seed}:hair-color`) * 5) % 5];
    const attitude = fixed.attitude || entity.attitude || "neutral";

    return {
      shirt: palette[0],
      shirtLight: palette[0],
      dark: palette[1],
      vest: palette[1],
      pants: palette[2],
      pantsLight: palette[0],
      boot: "#171b19",
      skin: SKINS[skinId] || SKINS.medium,
      hair: hairId,
      hairColor: HAIR[hairColorId] || HAIR.dark,
      headgear: fixed.headgear || (hash(`${seed}:hat`) > 0.66 ? "cap" : "none"),
      headgearColor: palette[1],
      accent: fixed.accent || (attitude === "aggressive" ? "#bc4d47" : attitude === "passive" ? "#82bbaa" : "#c0aa68"),
      build: fixed.build || (hash(`${seed}:build`) > 0.78 ? "sturdy" : hash(`${seed}:build`) < 0.22 ? "slim" : "standard"),
      outfit,
      attitude
    };
  }

  function combatPose(entity, weaponId, facing, body, phase, npc = false) {
    const firearm = FIREARMS.has(weaponId);
    const remaining = clamp((entity.attackAnim || 0) / (entity.attackDuration || (firearm ? 0.24 : 0.42)), 0, 1);
    const progress = remaining > 0 ? 1 - remaining : 0;
    const attackCurve = remaining > 0 ? Math.sin(progress * Math.PI) : 0;
    const aim = normalize(facing.x, facing.y * 0.68);
    const perpendicular = { x: -aim.y, y: aim.x };
    const shoulderY = body.y - 2;
    const walkSwing = Math.cos(phase) * (entity.moveBlend || 0) * 3;
    let left = { x: body.x - 10 - facing.x * walkSwing, y: body.y + 8 - facing.y * walkSwing * 0.3 };
    let right = { x: body.x + 10 + facing.x * walkSwing, y: body.y + 8 + facing.y * walkSwing * 0.3 };
    let weaponDirection = { ...aim };
    let gunAnchor = { x: aim.x * (npc ? 9 : 10), y: (npc ? -16 : -18) + aim.y * 5 };

    if (firearm) {
      const reload = npc ? entity.__gunState?.reload : entity.gunReload;
      if (reload) {
        gunAnchor = { x: aim.x * 5, y: body.y + 3 };
        left = { x: gunAnchor.x - perpendicular.x * 3, y: gunAnchor.y - perpendicular.y * 3 + 3 };
        right = { x: gunAnchor.x - aim.x * 5 + perpendicular.x * 2, y: gunAnchor.y - aim.y * 5 + perpendicular.y * 2 };
      } else {
        left = { x: gunAnchor.x + aim.x * 5 - perpendicular.x * 2.6, y: gunAnchor.y + aim.y * 5 - perpendicular.y * 2.6 };
        right = { x: gunAnchor.x - aim.x * 4 + perpendicular.x * 2.4, y: gunAnchor.y - aim.y * 4 + perpendicular.y * 2.4 };
      }
    } else if (remaining > 0) {
      const baseAngle = Math.atan2(aim.y, aim.x);
      if (THRUSTING.has(weaponId) || weaponId === "fists") {
        const reach = 10 + attackCurve * (weaponId === "spear" ? 16 : 10);
        weaponDirection = aim;
        right = { x: body.x + aim.x * reach, y: body.y + aim.y * reach * 0.75 + 2 };
        if (weaponId === "spear") {
          left = { x: body.x + aim.x * (reach * 0.58) - perpendicular.x * 2, y: body.y + aim.y * (reach * 0.45) + 1 };
        }
      } else {
        const overhead = ["axe", "hammer", "sledgehammer"].includes(weaponId);
        const arcWidth = overhead ? 2.65 : weaponId === "katana" ? 3.2 : 2.75;
        const start = overhead ? -2.05 : -1.55;
        const swing = baseAngle + start + progress * arcWidth;
        weaponDirection = { x: Math.cos(swing), y: Math.sin(swing) };
        const reach = overhead ? 16 : 14;
        right = { x: body.x + weaponDirection.x * reach, y: body.y + weaponDirection.y * reach * 0.72 + 1 };
        if (TWO_HANDED.has(weaponId)) {
          left = { x: body.x + weaponDirection.x * 8 - perpendicular.x * 2, y: body.y + weaponDirection.y * 6 + 2 };
        }
      }
    } else if (weaponId && weaponId !== "fists") {
      weaponDirection = normalize(facing.x, facing.y * 0.7 + 0.15);
      right = { x: body.x + facing.x * 8 + (facing.x >= 0 ? 5 : -5), y: body.y + 7 + facing.y * 4 };
      if (TWO_HANDED.has(weaponId)) {
        left = { x: body.x + facing.x * 5 - (facing.x >= 0 ? 2 : -2), y: body.y + 5 + facing.y * 3 };
      }
    }

    return {
      firearm,
      remaining,
      progress,
      attackCurve,
      aim,
      left,
      right,
      shoulderY,
      weaponDirection,
      gunAnchor
    };
  }

  function drawDetailedGun(ctx, entity, weaponId, pose, npc = false) {
    const drawGun = window.__hcDrawDetailedGunModelV5;
    if (typeof drawGun !== "function") return;
    const animation = window.__hcGunModelAnimationsV5?.[weaponId] || { scale: 0.76 };
    const reload = npc ? entity.__gunState?.reload : entity.gunReload;
    const reloadProgress = reload
      ? 1 - clamp(reload.timer / Math.max(0.001, reload.total), 0, 1)
      : 0;

    drawGun(
      ctx,
      weaponId,
      pose.gunAnchor.x,
      pose.gunAnchor.y,
      pose.aim.x,
      pose.aim.y,
      pose.remaining > 0,
      animation.scale * (npc ? 0.92 : 1),
      1 - pose.remaining,
      reloadProgress
    );
  }

  function renderHuman(ctx, entity, screen, options = {}) {
    const npc = Boolean(options.npc);
    const preview = Boolean(options.preview);
    const look = humanLook(entity, npc);
    const rawFacing = npc
      ? { x: Math.cos(entity.angle || 0), y: Math.sin(entity.angle || 0) }
      : {
          x: entity.renderFacingX ?? entity.facingX ?? 1,
          y: entity.renderFacingY ?? entity.facingY ?? 0
        };
    const visual = preview
      ? { ...normalize(rawFacing.x, rawFacing.y), move: clamp(entity.moveBlend || 0, 0, 1), seed: 0 }
      : poseFor(entity, rawFacing.x, rawFacing.y, entity.moveBlend || 0);
    const facing = normalize(visual.fx ?? visual.x, visual.fy ?? visual.y);
    const side = facing.x >= 0 ? 1 : -1;
    const moving = preview ? clamp(entity.moveBlend || 0, 0, 1) : visual.move;
    const sprinting = Boolean(entity.sprintingNow || entity.state === "flee");
    const crouching = Boolean(entity.crouching);
    const exhausted = Boolean(entity.exhausted);
    const dead = Boolean(entity.dead || entity.health <= 0);
    const hurt = clamp((entity.hurtAnim || 0) / 0.3, 0, 1);
    const flash = hurt > 0 && Math.floor(hurt * 24) % 2 === 0;
    const phase = (entity.animTime || performance.now() * 0.0015) + (visual.seed || 0);
    const buildX = look.build === "slim" ? 0.92 : look.build === "sturdy" ? 1.11 : 1;
    const requestedScale = options.scale || (npc ? 0.98 : 1.04);
    const gaitLength = sprinting ? 7.4 : crouching ? 3.1 : exhausted ? 3.2 : 5.1;
    const stride = Math.sin(phase) * moving * gaitLength;
    const bob = Math.abs(Math.cos(phase)) * moving * (sprinting ? 1.8 : 1.15);
    const breathing = Math.sin(phase * 0.54) * (1 - moving) * (exhausted ? 1.15 : 0.45);
    const compression = crouching ? 6 : exhausted ? 2.5 : 0;
    const knockback = clamp((entity.knockbackTime || 0) / Math.max(0.01, entity.knockbackDuration || 0.32), 0, 1);
    const weaponId = npc ? entity.weapon || "knife" : entity.equipped || "fists";
    const direction = normalize(facing.x, facing.y * 0.46);
    const perpendicular = { x: -direction.y, y: direction.x };
    visual.death ??= 0;
    visual.death = preview
      ? 0
      : lerp(visual.death, dead ? 1 : 0, 1 - Math.exp(-state.dt * 4.2));
    const fallProgress = dead ? clamp(visual.death, 0, 1) : 0;

    ctx.save();
    ctx.translate(Math.round(screen.x), Math.round(screen.y));
    ctx.scale(requestedScale * buildX, requestedScale);
    ctx.imageSmoothingEnabled = true;
    drawGroundShadow(ctx, moving, crouching, dead, buildX);

    if (dead) {
      ctx.rotate(side * (0.12 + fallProgress * 1.18));
      ctx.translate(side * fallProgress * 4, fallProgress * 7);
      ctx.globalAlpha = 0.92 - fallProgress * 0.18;
    } else {
      ctx.translate(-facing.x * knockback * 4 + hurt * -side * 2.5, knockback * 2 + hurt * 1.5);
      ctx.rotate((entity.turnLean || 0) * 0.06 - side * knockback * 0.18);
    }

    const hipCenter = {
      x: sprinting ? facing.x * 2.2 : exhausted ? -facing.x * 1.2 : 0,
      y: -12 + compression + bob
    };
    const hipSpread = 3.8;
    const leftHip = { x: hipCenter.x - hipSpread, y: hipCenter.y };
    const rightHip = { x: hipCenter.x + hipSpread, y: hipCenter.y };
    const leftFoot = {
      x: -4 + direction.x * stride,
      y: direction.y * stride * 0.58
    };
    const rightFoot = {
      x: 4 - direction.x * stride,
      y: -direction.y * stride * 0.58
    };
    const leftKnee = {
      x: lerp(leftHip.x, leftFoot.x, 0.54) - perpendicular.x * Math.abs(stride) * 0.12,
      y: lerp(leftHip.y, leftFoot.y, 0.5) + 1.2
    };
    const rightKnee = {
      x: lerp(rightHip.x, rightFoot.x, 0.54) + perpendicular.x * Math.abs(stride) * 0.12,
      y: lerp(rightHip.y, rightFoot.y, 0.5) + 1.2
    };
    const pants = flash ? "#e9e4dc" : look.pants;
    const pantsHighlight = flash ? "#ffffff" : look.pantsLight;

    const leftNear = side < 0;
    const drawLeg = (hip, knee, foot) => {
      jointedLimb(ctx, hip, knee, foot, 6.2, pants, pantsHighlight);
      ctx.fillStyle = "rgba(8,12,10,.3)";
      roundedPath(ctx, knee.x - 2.5, knee.y - 2, 5, 4, 1.5);
      ctx.fill();
      drawShoe(ctx, foot, direction, look.boot, sprinting ? 1.08 : 1);
    };

    if (leftNear) {
      drawLeg(rightHip, rightKnee, rightFoot);
      drawLeg(leftHip, leftKnee, leftFoot);
    } else {
      drawLeg(leftHip, leftKnee, leftFoot);
      drawLeg(rightHip, rightKnee, rightFoot);
    }

    const body = {
      x: hipCenter.x + (sprinting ? facing.x * 2.2 : 0),
      y: -25 + compression + bob + breathing + (exhausted ? 2 : 0),
      facingX: facing.x
    };
    const pose = combatPose(entity, weaponId, facing, body, phase, npc);
    const actionDuration = entity.actionDuration || 1;
    const actionRemaining = clamp((entity.actionAnim || 0) / actionDuration, 0, 1);
    const actionProgress = actionRemaining > 0 ? 1 - actionRemaining : 0;

    if (!npc && actionRemaining > 0 && entity.actionKind) {
      const lift = Math.sin(actionProgress * Math.PI);
      pose.left = {
        x: body.x - side * (4 - lift),
        y: body.y + 5 - lift * 5
      };
      pose.right = {
        x: body.x + facing.x * (5 + lift * 3),
        y: body.y - 4 - lift * 8 + facing.y * 2
      };
    } else if (knockback > 0) {
      pose.left = { x: body.x - 14 - facing.x * 4, y: body.y - 5 - facing.y * 3 };
      pose.right = { x: body.x + 14 - facing.x * 4, y: body.y - 4 - facing.y * 3 };
    } else if (exhausted && pose.remaining <= 0 && !pose.firearm) {
      pose.left = { x: body.x - 9 + breathing, y: body.y + 14 };
      pose.right = { x: body.x + 9 - breathing, y: body.y + 14 };
    }
    const shoulderSpread = look.build === "sturdy" ? 9.5 : look.build === "slim" ? 7.5 : 8.5;
    const leftShoulder = { x: body.x - shoulderSpread, y: pose.shoulderY };
    const rightShoulder = { x: body.x + shoulderSpread, y: pose.shoulderY };
    const leftElbow = {
      x: lerp(leftShoulder.x, pose.left.x, 0.54) - perpendicular.x * (pose.firearm ? 1.8 : 2.8),
      y: lerp(leftShoulder.y, pose.left.y, 0.54) + (pose.firearm ? 1 : 2)
    };
    const rightElbow = {
      x: lerp(rightShoulder.x, pose.right.x, 0.54) + perpendicular.x * (pose.firearm ? 1.8 : 2.8),
      y: lerp(rightShoulder.y, pose.right.y, 0.54) + (pose.firearm ? 1 : 2)
    };
    const sleeve = flash ? "#eee8df" : look.dark;
    const sleeveHighlight = flash ? "#ffffff" : look.shirtLight;

    jointedLimb(ctx, leftShoulder, leftElbow, pose.left, 5.4, sleeve, sleeveHighlight, flash ? "#fff3e8" : look.skin[0]);
    drawHumanTorso(
      ctx,
      body,
      look,
      flash,
      crouching,
      entity.inventory?.some?.(entry => entry.id === "backpack" && entry.qty > 0),
      entity.role
    );
    jointedLimb(ctx, rightShoulder, rightElbow, pose.right, 5.4, sleeve, sleeveHighlight, flash ? "#fff3e8" : look.skin[0]);

    if (!npc && actionRemaining > 0 && entity.actionKind) {
      drawActionProp(ctx, entity.actionKind, entity.actionItem, pose.right, actionProgress);
    } else if (!dead && pose.firearm) {
      drawDetailedGun(ctx, entity, weaponId, pose, npc);
    } else if (!dead && weaponId !== "fists") {
      drawMeleeWeapon(ctx, weaponId, pose.right.x, pose.right.y, pose.weaponDirection.x, pose.weaponDirection.y);
    }

    const head = {
      x: body.x + facing.x * 2.2,
      y: body.y - 16 + facing.y * 1.2
    };
    drawFace(ctx, look, head, facing, flash, false, 0);

    if (exhausted && !dead) {
      const sweat = Math.sin((entity.exhaustionTime || phase) * 4.8);
      ctx.fillStyle = "rgba(118,179,190,.72)";
      ctx.beginPath();
      ctx.ellipse(head.x - side * 7.2, head.y + 1 + sweat, 1.2, 2.3, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();

    return { pose, look, facing, weaponId };
  }

  function drawReloadIndicator(ctx, entity, screen, npc = false) {
    const reload = npc ? entity.__gunState?.reload : entity.gunReload;
    if (!reload) return;
    const progress = 1 - clamp(reload.timer / Math.max(0.001, reload.total), 0, 1);
    ctx.save();
    ctx.translate(Math.round(screen.x), Math.round(screen.y - (npc ? 43 : 48)));
    ctx.lineWidth = 3;
    ctx.strokeStyle = "rgba(0,0,0,.72)";
    ctx.beginPath();
    ctx.arc(0, 0, 10, 0, Math.PI * 2);
    ctx.stroke();
    ctx.strokeStyle = "#d1c77d";
    ctx.beginPath();
    ctx.arc(0, 0, 10, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * progress);
    ctx.stroke();
    ctx.fillStyle = "#e7e7d9";
    ctx.font = "900 6px system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("RELOAD", 0, -14);
    ctx.restore();
  }

  function drawCrawler(ctx, zombie, screen, look, facing, phase, move, flash) {
    const pull = Math.sin(phase) * move;
    ctx.save();
    ctx.translate(screen.x, screen.y);
    ctx.rotate(Math.atan2(facing.y * 0.55, facing.x));
    if (zombie.dead) ctx.globalAlpha = 0.58;
    drawGroundShadow(ctx, move, true, zombie.dead, 1.4);

    const hip = { x: -11, y: 0 };
    const leftKnee = { x: -18, y: -4 + pull * 3 };
    const rightKnee = { x: -19, y: 6 - pull * 2 };
    jointedLimb(ctx, hip, leftKnee, { x: -26, y: -5 + pull * 4 }, 5.2, look.pants, "#4e554f");
    jointedLimb(ctx, hip, rightKnee, { x: -27, y: 8 - pull * 3 }, 5.2, look.pants, "#4e554f");

    ctx.fillStyle = "#111514";
    roundedPath(ctx, -12, -8, 26, 17, 7);
    ctx.fill();
    ctx.fillStyle = verticalGradient(ctx, flash ? "#eee5dc" : look.shirt, flash ? "#d9d0c7" : look.dark, -7, 9);
    roundedPath(ctx, -10, -7, 23, 15, 6);
    ctx.fill();

    const shoulder = { x: 6, y: 0 };
    const hand1 = { x: 24 + pull * 5, y: -9 };
    const hand2 = { x: 25 - pull * 4, y: 9 };
    jointedLimb(ctx, { x: 4, y: -5 }, { x: 13, y: -7 }, hand1, 4.8, look.dark, look.shirt, look.skinDark);
    jointedLimb(ctx, { x: 4, y: 5 }, { x: 14, y: 7 }, hand2, 4.8, look.dark, look.shirt, look.skinDark);
    drawFace(
      ctx,
      { skin: [look.skin, look.skinDark, look.accent], hair: look.hair, accent: look.accent },
      { x: shoulder.x + 8, y: 0 },
      { x: 1, y: 0 },
      flash,
      true,
      zombie.state === "chase" ? 0.8 : 0.25
    );
    ctx.restore();
  }

  function renderZombie(ctx, zombie, screen) {
    const baseLook = ZOMBIE_LOOKS[(zombie.variant || 0) % ZOMBIE_LOOKS.length];
    const rawFacing = { x: Math.cos(zombie.angle || 0), y: Math.sin(zombie.angle || 0) };
    const visual = poseFor(zombie, rawFacing.x, rawFacing.y, zombie.moveBlend || 0);
    const facing = normalize(visual.fx, visual.fy);
    const side = facing.x >= 0 ? 1 : -1;
    const phase = (zombie.animTime || 0) + visual.seed;
    const move = visual.move;
    const chasing = ["chase", "bash"].includes(zombie.state);
    const flash = zombie.hitFlash > 0;
    const hurt = clamp((zombie.hurtAnim || 0) / 0.28, 0, 1);
    const attackRemaining = clamp((zombie.attackAnim || 0) / 0.42, 0, 1);
    const attackProgress = attackRemaining > 0 ? 1 - attackRemaining : 0;
    const attackReach = attackRemaining > 0 ? Math.sin(attackProgress * Math.PI) : 0;
    const dead = Boolean(zombie.dead);
    const deathProgress = dead ? 1 - clamp(zombie.deathAnim || 0, 0, 1) : 0;
    const deathSide = zombie.deathSide || (hash(`${zombie.id}:fall`) > 0.5 ? 1 : -1);

    if (zombie.archetype === "crawler") {
      drawCrawler(ctx, zombie, screen, baseLook, facing, phase, move, flash);
      return;
    }

    const scaleX = zombie.archetype === "brute" ? 1.32 : zombie.archetype === "bloater" ? 1.22 : zombie.archetype === "runner" ? 0.92 : 1.05;
    const scaleY = zombie.archetype === "brute" ? 1.17 : zombie.archetype === "bloater" ? 1.1 : zombie.archetype === "runner" ? 1.08 : 1.05;
    const direction = normalize(facing.x, facing.y * 0.46);
    const perpendicular = { x: -direction.y, y: direction.x };
    const strideBase = zombie.archetype === "runner" ? 7.5 : chasing ? 5.4 : 3.8;
    const limpLeft = (zombie.limpSide || -1) < 0;
    const gait = Math.sin(phase) * move * strideBase;
    const leftStride = gait * (limpLeft ? 0.42 : 1);
    const rightStride = -gait * (limpLeft ? 1 : 0.42);
    const hunch = zombie.archetype === "runner" ? 4.5 : chasing ? 3.2 : 2;
    const sway = Math.sin(phase * 0.5) * move * 1.8 + Math.sin(phase * 0.23) * (1 - move) * 1.2;

    ctx.save();
    ctx.translate(screen.x, screen.y);
    ctx.scale(scaleX, scaleY);
    drawGroundShadow(ctx, move, false, dead, scaleX);

    if (dead) {
      ctx.rotate(deathSide * deathProgress * 1.32);
      ctx.translate(deathSide * deathProgress * 5, deathProgress * 7);
      ctx.globalAlpha = 0.9 - deathProgress * 0.23;
    } else {
      ctx.translate(-facing.x * attackReach * 5 + deathSide * hurt * 3, hurt * 2);
      ctx.rotate(deathSide * hurt * 0.13);
    }

    const hip = { x: sway * 0.35, y: -12 };
    const leftHip = { x: hip.x - 4, y: hip.y };
    const rightHip = { x: hip.x + 4, y: hip.y };
    const leftFoot = { x: -4 + direction.x * leftStride, y: direction.y * leftStride * 0.52 };
    const rightFoot = { x: 4 + direction.x * rightStride, y: direction.y * rightStride * 0.52 };
    const leftKnee = { x: lerp(leftHip.x, leftFoot.x, 0.52) - perpendicular.x * 1.6, y: lerp(leftHip.y, leftFoot.y, 0.5) + 1.5 };
    const rightKnee = { x: lerp(rightHip.x, rightFoot.x, 0.52) + perpendicular.x * 1.6, y: lerp(rightHip.y, rightFoot.y, 0.5) + 1.5 };
    const pants = flash ? "#e9dfd4" : baseLook.pants;
    jointedLimb(ctx, leftHip, leftKnee, leftFoot, 5.8, pants, "rgba(190,200,184,.16)");
    jointedLimb(ctx, rightHip, rightKnee, rightFoot, 5.8, pants, "rgba(190,200,184,.16)");
    drawShoe(ctx, leftFoot, direction, "#171c1a", 0.95);
    drawShoe(ctx, rightFoot, direction, "#171c1a", 0.95);

    const body = {
      x: sway + facing.x * hunch,
      y: -25 + Math.abs(Math.cos(phase)) * move * 1.15 + hunch * 0.4
    };
    let leftHand;
    let rightHand;

    if (chasing || attackRemaining > 0) {
      const reach = 12 + attackReach * 12;
      leftHand = { x: body.x + facing.x * reach - perpendicular.x * 5, y: body.y + 5 + facing.y * reach * 0.5 - perpendicular.y * 3 };
      rightHand = { x: body.x + facing.x * (reach + 2) + perpendicular.x * 5, y: body.y + 6 + facing.y * (reach + 2) * 0.5 + perpendicular.y * 3 };
    } else {
      leftHand = { x: body.x - 10 - side + Math.sin(phase) * move * 2, y: body.y + 13 + Math.cos(phase) * move * 3 };
      rightHand = { x: body.x + 11 - Math.sin(phase) * move * 2, y: body.y + 15 - Math.cos(phase) * move * 2 };
    }

    const leftShoulder = { x: body.x - 9, y: body.y - 2 };
    const rightShoulder = { x: body.x + 9, y: body.y - 1 };
    const leftElbow = { x: lerp(leftShoulder.x, leftHand.x, 0.52) - perpendicular.x * 3, y: lerp(leftShoulder.y, leftHand.y, 0.52) + 2 };
    const rightElbow = { x: lerp(rightShoulder.x, rightHand.x, 0.52) + perpendicular.x * 3, y: lerp(rightShoulder.y, rightHand.y, 0.52) + 2 };
    const shirt = flash ? "#efe4da" : baseLook.shirt;
    const shirtDark = flash ? "#d8cec4" : baseLook.dark;
    jointedLimb(ctx, leftShoulder, leftElbow, leftHand, 5.2, shirtDark, shirt, flash ? "#fff1e5" : baseLook.skinDark);

    ctx.fillStyle = "#111514";
    polygon(ctx, [[body.x - 11, body.y - 8], [body.x + 11, body.y - 8], [body.x + 9, body.y + 12], [body.x - 9, body.y + 12]]);
    ctx.fill();
    ctx.fillStyle = verticalGradient(ctx, shirt, shirtDark, body.y - 7, body.y + 12);
    polygon(ctx, [[body.x - 9, body.y - 7], [body.x + 9, body.y - 7], [body.x + 7.5, body.y + 10], [body.x - 7.5, body.y + 10]]);
    ctx.fill();

    if (zombie.archetype === "bloater") {
      ctx.fillStyle = flash ? "#eee3d8" : "#6f865f";
      ctx.beginPath();
      ctx.ellipse(body.x, body.y + 7, 12, 11, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "rgba(174,151,91,.47)";
      ctx.beginPath();
      ctx.ellipse(body.x - 4, body.y + 5, 3, 4, 0.3, 0, Math.PI * 2);
      ctx.ellipse(body.x + 5, body.y + 2, 2.5, 3.5, -0.3, 0, Math.PI * 2);
      ctx.fill();
    } else if (zombie.archetype === "brute") {
      ctx.fillStyle = "rgba(31,43,35,.72)";
      roundedPath(ctx, body.x - 10, body.y - 4, 20, 6, 2);
      ctx.fill();
    }

    ctx.fillStyle = baseLook.accent;
    ctx.beginPath();
    ctx.ellipse(body.x - 5, body.y + 3, 3.5, 2.2, 0.4, 0, Math.PI * 2);
    ctx.ellipse(body.x + 4, body.y - 3, 2.3, 3.6, -0.3, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "rgba(19,13,11,.5)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(body.x - 7, body.y - 1);
    ctx.lineTo(body.x + 1, body.y + 7);
    ctx.lineTo(body.x + 6, body.y + 4);
    ctx.stroke();

    jointedLimb(ctx, rightShoulder, rightElbow, rightHand, 5.2, shirtDark, shirt, flash ? "#fff1e5" : baseLook.skinDark);
    const head = { x: body.x + facing.x * 3 + sway * 0.18, y: body.y - 15 + facing.y * 1.4 };
    const jaw = zombie.archetype === "howler"
      ? 0.75 + Math.abs(Math.sin(phase * 0.65)) * 0.25
      : chasing
        ? 0.35 + Math.abs(Math.sin(phase * 0.7)) * 0.35
        : 0.15;
    drawFace(
      ctx,
      { skin: [baseLook.skin, baseLook.skinDark, baseLook.accent], hair: baseLook.hair, accent: baseLook.accent },
      head,
      facing,
      flash,
      true,
      jaw
    );

    if (chasing && !dead) {
      const health = clamp(zombie.health / Math.max(1, zombie.maxHealth), 0, 1);
      ctx.fillStyle = "rgba(12,8,7,.72)";
      roundedPath(ctx, head.x - 11, head.y - 15, 22, 3.5, 1.5);
      ctx.fill();
      ctx.fillStyle = "#a94e48";
      roundedPath(ctx, head.x - 10, head.y - 14, 20 * health, 1.5, 0.7);
      ctx.fill();
    }

    ctx.restore();
  }

  function drawNpcLabel(ctx, game, survivor, screen) {
    if (survivor.dead || !game.player) return;
    const attitude = survivor.attitude || survivor.__fixedNpcLook?.attitude || "neutral";
    const range = attitude === "aggressive" ? 620 : 275;
    if (Math.hypot(survivor.x - game.player.x, survivor.y - game.player.y) > range) return;
    const color = attitude === "aggressive" ? "#e35f59" : attitude === "passive" ? "#8dc9ba" : "#d5bd72";
    const label = `${survivor.name || "Survivor"} • ${attitude === "aggressive" ? "HOSTILE" : attitude.toUpperCase()}`;
    ctx.save();
    ctx.font = "900 8px system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    const width = clamp(ctx.measureText(label).width + 15, 64, 144);
    ctx.fillStyle = "rgba(7,10,9,.86)";
    roundedPath(ctx, screen.x - width / 2, screen.y - 58, width, 14, 4);
    ctx.fill();
    ctx.fillStyle = color;
    roundedPath(ctx, screen.x - width / 2, screen.y - 58, 3, 14, 1.5);
    ctx.fill();
    ctx.fillStyle = "#e3e9df";
    ctx.fillText(label, screen.x, screen.y - 51);

    if (survivor.speech && survivor.speechTimer > 2.4) {
      const speechWidth = clamp(survivor.speech.length * 5.3 + 14, 70, 166);
      ctx.fillStyle = "rgba(232,228,211,.95)";
      roundedPath(ctx, screen.x - speechWidth / 2, screen.y - 79, speechWidth, 16, 5);
      ctx.fill();
      ctx.fillStyle = "#17201b";
      ctx.fillText(survivor.speech, screen.x, screen.y - 71);
    }
    ctx.restore();
  }

  function drawPreviewCanvas(canvas, game, large = false) {
    if (!canvas?.getContext) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const width = canvas.width;
    const height = canvas.height;
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, width, height);
    const background = ctx.createLinearGradient(0, 0, 0, height);
    background.addColorStop(0, "#1b2520");
    background.addColorStop(1, "#090e0b");
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, width, height);
    ctx.strokeStyle = "rgba(181,197,164,.06)";
    ctx.lineWidth = 1;
    const grid = large ? 32 : 18;
    for (let x = 0; x < width; x += grid) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += grid) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    const source = game.player || {
      inventory: [],
      equipped: "knife",
      appearance: {
        skin: "medium",
        hair: "short",
        hairColor: "dark",
        outfit: "tactical",
        headgear: "helmet",
        accent: "olive",
        build: "standard"
      }
    };
    const model = {
      ...source,
      facingX: 0.9,
      facingY: 0.35,
      renderFacingX: 0.9,
      renderFacingY: 0.35,
      animTime: performance.now() / 470,
      moveBlend: large ? 0.58 : 0.32,
      attackAnim: 0,
      crouching: false,
      sprintingNow: false,
      dead: false,
      health: 100
    };
    renderHuman(
      ctx,
      model,
      { x: width / 2, y: height * (large ? 0.72 : 0.74) },
      { preview: true, scale: large ? 2.45 : 1.75 }
    );
    ctx.fillStyle = "#93a18f";
    ctx.font = `${large ? 17 : 10}px system-ui, sans-serif`;
    ctx.textAlign = "center";
    ctx.fillText("ARTICULATED SURVIVOR", width / 2, height - (large ? 18 : 7));
    ctx.restore();
  }

  function refreshPreviews(game) {
    const loadout = document.querySelector("#hcLoadoutCard canvas");
    const appearance = document.querySelector(".hc-look-preview canvas");
    if (loadout) drawPreviewCanvas(loadout, game, false);
    if (appearance) drawPreviewCanvas(appearance, game, true);
  }

  function installPreviewHooks(game) {
    if (typeof game.__updateCharacterInventory === "function") {
      const original = game.__updateCharacterInventory;
      game.__updateCharacterInventory = (...args) => {
        const result = original(...args);
        refreshPreviews(game);
        return result;
      };
    }

    const panel = document.getElementById("hcAppearanceCustomizer");
    panel?.addEventListener("click", () => {
      window.clearTimeout(state.previewTimer);
      state.previewTimer = window.setTimeout(() => refreshPreviews(game), 0);
    });

    refreshPreviews(game);
  }

  function install(game) {
    if (!game || game[INSTALL_FLAG]) return;
    game[INSTALL_FLAG] = true;

    game.drawPlayer = function articulatedPlayer(ctx, shakeX = 0, shakeY = 0) {
      if (!this.player) return;
      const screen = this.worldToScreen(this.player.x, this.player.y, shakeX, shakeY);
      renderHuman(ctx, this.player, screen, { scale: 1.04 });
      drawReloadIndicator(ctx, this.player, screen, false);
    };

    game.drawSurvivors = function articulatedSurvivors(ctx, shakeX = 0, shakeY = 0) {
      for (const survivor of this.survivors || []) {
        if (this.isHiddenInside?.(survivor)) continue;
        const screen = this.worldToScreen(survivor.x, survivor.y, shakeX, shakeY);
        if (screen.x < -95 || screen.y < -95 || screen.x > this.viewWidth + 95 || screen.y > this.viewHeight + 95) continue;
        renderHuman(ctx, survivor, screen, { npc: true, scale: 0.98 });
        drawReloadIndicator(ctx, survivor, screen, true);
        drawNpcLabel(ctx, this, survivor, screen);
      }
    };

    game.drawZombies = function articulatedZombies(ctx, shakeX = 0, shakeY = 0) {
      for (const zombie of this.zombies || []) {
        if (this.isHiddenInside?.(zombie)) continue;
        const screen = this.worldToScreen(zombie.x, zombie.y, shakeX, shakeY);
        if (screen.x < -90 || screen.y < -90 || screen.x > this.viewWidth + 90 || screen.y > this.viewHeight + 90) continue;
        renderZombie(ctx, zombie, screen);
      }
    };

    if (typeof game.update === "function") {
      const originalUpdate = game.update.bind(game);
      game.update = function articulatedUpdate(dt) {
        state.dt = clamp(Number(dt) || 1 / 60, 1 / 240, 0.08);
        return originalUpdate(dt);
      };
    }

    for (const methodName of ["startNew", "loadSaved"]) {
      if (typeof game[methodName] !== "function") continue;
      const original = game[methodName].bind(game);
      game[methodName] = function articulatedRunSetup(...args) {
        const result = original(...args);
        state.pose = new WeakMap();
        refreshPreviews(this);
        return result;
      };
    }

    installPreviewHooks(game);
    game.__hcArticulatedCharacterVersion = VERSION;
    game.__hcRenderArticulatedHuman = (ctx, entity, screen, options) => renderHuman(ctx, entity, screen, options);
    game.__hcRenderArticulatedZombie = (ctx, zombie, screen) => renderZombie(ctx, zombie, screen);
  }

  if (typeof window === "undefined") return;
  if (window.__walkers) {
    install(window.__walkers);
  } else {
    window.addEventListener("load", () => install(window.__walkers), { once: true });
  }
})();
