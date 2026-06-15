# Md. Abdullah Al Hossain — Portfolio

A React + Vite portfolio for an Electrical & Electronics Engineer
specializing in Power Electronics and Renewable Energy Technologies.
Built with a custom "circuit / datasheet" visual theme, scroll reveal
animations, and lucide-react icons throughout.

## Quick start (local)

```bash
npm install
npm run dev
```

Open the printed local URL (usually `http://localhost:5173`).

## Replace photos

All images live in `public/photos/`. Placeholder images are already in
place so the site looks correct immediately — just drop your real files
into `public/photos/` using the **same filenames** (see
`public/photos/README.md` for the full list and what each image is for).

No code changes are needed if you keep the filenames. If you want
different filenames, update the paths in `src/data/content.js`.

## Edit content

All text — bio, education, experience, grants, publications, thesis stats,
and project descriptions — lives in one file: `src/data/content.js`. Edit
that file to update anything on the site.

## Build for production

```bash
npm run build
```

This outputs a static site to `dist/`.

## Deploy to Netlify

**Option A — drag and drop**
1. Run `npm run build`.
2. Go to [app.netlify.com/drop](https://app.netlify.com/drop) and drag the
   `dist/` folder onto the page.

**Option B — connect a Git repo**
1. Push this project to GitHub/GitLab/Bitbucket.
2. In Netlify, click "Add new site" → "Import an existing project".
3. Build command: `npm run build`
4. Publish directory: `dist`

A `netlify.toml` is already included with these settings, so Netlify
should detect them automatically.

## Project structure

```
src/
├── App.jsx                 # Assembles all sections
├── main.jsx                # React entry point
├── index.css               # Design tokens & global styles
├── data/content.js         # ALL site text/content — edit here
├── hooks/useReveal.js       # Scroll-reveal animation hook
└── components/
    ├── Header.jsx           # Sticky nav
    ├── Hero.jsx             # Landing section
    ├── About.jsx
    ├── Education.jsx
    ├── Experience.jsx
    ├── GrantsResearch.jsx
    ├── Publications.jsx
    ├── Thesis.jsx           # Featured thesis with spec sheet
    ├── Projects.jsx         # Project grid
    ├── SkillsAchievements.jsx
    ├── Contact.jsx
    └── Footer.jsx
```

## Design notes

- **Palette**: deep navy/graphite background with a copper accent — a nod
  to circuit traces and soldered components.
- **Type**: Space Grotesk (display), Inter (body), IBM Plex Mono (labels,
  dates, technical data).
- **Signature element**: the thesis "datasheet" spec card and the
  oscilloscope-trace hero graphic.
