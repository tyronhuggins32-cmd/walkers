# Walkers — Hollow County

An original procedural top-down zombie survival game for desktop and mobile browsers.

## Play

https://tyronhuggins32-cmd.github.io/walkers/

## Build 3.0 — Living County

- Six original zombie archetypes: walkers, runners, crawlers, bloaters, brutes, and howlers
- Smarter pack AI with sight, hearing, curiosity, target memory, light attraction, sound investigation, and howler alerts
- Zombies hunt both the player and NPC survivors, follow gunfire, and smash through closed doors
- Armed survivor NPCs scavenge, group up, speak, fight, retreat, and open doors
- Survivor spawn rate is 30% of each chunk's zombie spawn count
- Working exterior and interior doors open, close, block sight/movement, take damage, and persist after saving
- Roof concealment hides rooms, furniture, zombies, and survivors while the player is outside
- Machine pistol, 5.56 assault rifle, and lever-action rifle join the expanded 19-weapon arsenal
- Original models and animations for every new zombie, survivor, door, and firearm—no external art files
- Ambient distant gunshots, car alarms, glass breaking, flashlight lures, and survivor callouts
- The 4,608×4,608-tile county still uses deterministic 48×48 streaming chunks for phone performance

## Required repository files

Keep exactly these four files together at the top level of the GitHub repository:

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
| Aim | Mouse | Auto-target nearest visible zombie |
| Attack | Click | ATTACK button |
| Search/open/close | E | Context button |
| Inventory | Tab | PACK button |
| Craft/build | B | BUILD button |
| Equip | 1–5 | Tap a hotbar slot |
| Pause | Escape | II button |

GitHub Pages should be set to deploy the `main` branch from `/ (root)`. If an older build appears, refresh the page once after the new commit finishes deploying.
