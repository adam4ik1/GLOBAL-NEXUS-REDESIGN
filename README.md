# The Diplomatic Table — Global Affairs 2035

A fully interactive 3D educational environment for International Relations & Diplomacy. This redesign intentionally replaces the previous cyberpunk dashboard with an editorial, cartographic institute aesthetic: warm paper tones, serif typography, a field-guide rail, an institutional directory and a diplomatic brief.

## Features
- 3D diplomatic campus built with Three.js
- Orbit, pan and zoom controls (mouse/touch)
- Nine clickable diplomatic institutions
- Directory selection and contextual institutional briefs
- Policy-domain filters: governance, security, economy and society
- Day/night palette toggle and reset camera
- Responsive desktop/tablet/mobile layout

## Deploy on Render
1. Upload `index.html`, `styles.css`, and `main.js` to the root of a GitHub repository.
2. In Render choose **New → Static Site** and connect the repository.
3. Build Command: leave blank.
4. Publish Directory: `.`
5. Deploy. The site uses Three.js via jsDelivr CDN and Google Fonts, so the deployed page needs internet access.

## Local preview
Run a local static server from this folder, for example `python3 -m http.server 8000`, then open `http://localhost:8000`. ES modules should be served over HTTP rather than opened as a `file://` URL.

All metrics and institutions are presented as an educational model; no live diplomatic data feed is connected.
