# Partner Atlas

Vite + React + react-router + vite-react-ssg (prerendered HTML). Languages: en (/), es (/es), vi (/vi).

## Run
    npm install
    npm run dev        # local
    npm run build      # output in dist/ (prerendered)

## Deploy on Netlify
Push to Git (or drag the project into Netlify). Build command `npm run build`, publish dir `dist`, Node 20 (already in netlify.toml).

## Edit before launch
src/site.js: SITE.name / url / publisher / email, and replace the example.com sponsored link in src/content.js (`cta`).

## Add things later
- New post: copy an object in src/content.js (en + es + vi).
- New topic: add a key in src/site.js TOPICS, then set `topic` on posts. The Blogs page shows topic filters automatically once there are 2+ topics.
- New program: add a line to PROGRAMS in src/site.js.
- New language: add to LANGS and a UI block in src/i18n.js.
