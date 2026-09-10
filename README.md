# kael. — Portfolio

Personal portfolio for Muhammad Haikal bin Ismail (kael.), solo product developer in Kuala Lumpur.

Vite + React + TypeScript + Tailwind CSS v4 + Lenis smooth scroll.

## Local dev

```bash
npm install
npm run dev
```

## Content

All content is editable without touching code:

- `src/content/projects.json` — the showcase projects
- `src/content/site.json` — identity, contact, and portrait path

`src/data/site.ts` is a thin typed wrapper around those files. The animation derives everything from
the project count, so adding a project just works.

## CMS (`/admin`)

A [Decap CMS](https://decapcms.org) editor is included at `/admin`.

### Edit locally (no login)

```bash
npm run dev      # terminal 1
npm run cms      # terminal 2 (decap-server)
```

Open http://localhost:5173/admin/ and edit. Saving writes straight to the JSON files.

### Edit on the live site

1. Create a GitHub OAuth App (Settings > Developer settings > OAuth Apps):
   - Homepage URL: `https://YOUR-SITE.vercel.app`
   - Authorization callback URL: `https://YOUR-SITE.vercel.app/api/callback`
2. In Vercel, add environment variables:
   - `OAUTH_GITHUB_CLIENT_ID`
   - `OAUTH_GITHUB_CLIENT_SECRET`
3. In `public/admin/config.yml`, set `base_url` to `https://YOUR-SITE.vercel.app`.
4. Redeploy. Visit `https://YOUR-SITE.vercel.app/admin`, log in with GitHub, edit, save.
   Changes commit to `main` and Vercel rebuilds (~1 min).

### Videos

Videos are managed by hand: drop the file in `public/videos/`, then set the project's `video` field
in `/admin` to e.g. `/videos/name.webm`. Keep files small (muted webm, a few MB).

## Photo

Set the portrait in `/admin` > Site Settings, or drop it at `public/images/` and set the `photo`
field. It renders in the About section with a looping 45° shine sweep.

## Deploy

Push to GitHub, import into Vercel. Build command `npm run build`, output directory `dist`.
