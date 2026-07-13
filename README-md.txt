# Walkers — Hollow County

An original procedural top-down zombie survival game for desktop and mobile browsers.

## Play

https://tyronhuggins32-cmd.github.io/walkers/

## Build 2.0 overhaul

- 4,608×4,608-tile logical county: over 1,000× the original land area
- Minecraft-style 48×48 seeded chunks load near the player and unload at a distance
- Looted furniture, searched cars, and killed walkers remain changed after chunk reloads
- L-shaped homes, grocery stores, hospital wings, sheriff departments, prison courtyards/cell blocks, and warehouse bays
- Every building has visible exterior doors, interior rooms, windows, property signage, and themed furniture
- 16 lootable weapons with distinct in-hand models
- New claw hammer, katana, double-barrel shotgun, and patrol carbine
- Weapon-specific thrust, sweep, overhead, recoil, muzzle-flash, and casing animations
- Upgraded survivor breathing/sprinting/hurt poses and walker limp/lunge/hurt/death animation
- Smooth day, dawn, dusk, and night lighting with weather and flashlight
- Automatic migration from older saves while preserving survivor gear

## Required repository files

Keep these four files together at the top level of the GitHub repository:

```text
index.html
styles.css
game.js
README.md
```

## Controls

| Action | Desktop | Phone/tablet |
| --- | --- | --- |
| Move | WASD | Left joystick |
| Sprint | Shift | Push joystick to its edge |
| Sneak | C | SNEAK button |
| Aim | Mouse | Auto-target nearby walker |
| Attack | Click | ATTACK button |
| Search/open | E | SEARCH button |
| Inventory | Tab | PACK button |
| Craft/build | B | BUILD button |
| Equip | 1–5 | Tap a hotbar slot |
| Pause | Escape | II button |

The game uses original code-drawn Canvas graphics and requires no external artwork or asset downloads.
