# Monster Roulette Project for Computação Gráfica using Three.js

A playful, small interactive demo built with Three.js. The scene presents a stylized "monster" roulette character composed from primitives, with draggable arm interaction, collisions, wheel physics, simple emotes and a POV camera mode.

Live demo

- Open `html/index.html` in a modern browser. For best results, serve the `html/` folder over HTTP (browsers block some module/asset loads when opened via `file://`).

Quick run (recommended)

With Python 3 installed:

```bash
cd html
python -m http.server 8000
# open http://localhost:8000 in your browser
```

What you'll find

- `html/index.html` — Minimal entry that loads the app and sets an import map for Three.js via CDN.
- `js/main.js` — The entire scene: camera, renderer, textured geometry, GLTF background loader, input handlers, GUI, and the render loop.
- `assets/` — External binary assets (GLB) referenced by the app (e.g. casino scene).
- `images/` — Texture assets used by the model (skin, slots, icon).

Controls

- Keyboard:
  - `1` — Standing
  - `2` — Walking
  - `3` — Running
  - `W` — Wave
  - `P` — Toggle POV (press again to exit)
  - `Space` — Jump
  - `Backspace` — Resets the character's position
- Mouse:
  - Click & drag the right arm to interact with the stoppers and influence the wheel.

Notes & tips

- Three.js is loaded from the unpkg CDN (see `index.html` import map). If you prefer offline use, replace the import map with local copies.
- If models or textures fail to load, confirm relative paths (`../assets/` and `../images/`) from `html/index.html` and an HTTP server is being used.

— Project made by Miguel Machado - https://github.com/Miguyy
