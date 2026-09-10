# bhavya-portfolio

Personal portfolio of **Bhavyashree Putta** — Software Engineer · Full-Stack & AI — built as an IDE.

Live: deployed on Vercel from this repo.

## What's in here

- **IDE shell** — explorer, tabs, breadcrumbs, status bar, command palette (`Ctrl/⌘ K`), integrated terminal (`` Ctrl ` ``), four themes (`theme night|dracula|matrix|paper` in the terminal).
- **Every section is a "file"** — `README.md`, `experience.ts`, `skills.yaml`, `projects/*.{cpp,py,java,…}`, `polyglot/` (the same event consumer in Python, Java and C#), `achievements.md`, `resume.pdf`, `contact.sh`.
- **View source** — experience, skills and achievements views can flip to the actual data file they render from.

## Stack

Vite · React 19 · TypeScript · Tailwind v4 · Framer Motion · prism-react-renderer · react-router

## Develop

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # outputs dist/
npm run preview
```

## Editing content

All content lives in `src/data/`:

| file | what |
|---|---|
| `profile.ts` | name, title, summary, stats, pillars, links, education |
| `experience.ts` | roles and bullets (each bullet can carry a `metric`) |
| `projects.ts` | projects — `file` sets the filename/language shown in the explorer |
| `skills.ts` | skill groups rated by depth (3 = production, 2 = deep, 1 = working) |
| `polyglot.ts` | the three code samples |
| `achievements.ts` | press, awards, publications |

Replace `public/Bhavyashree_Putta_Resume.pdf` to update the resume; `public/profile.jpg` for the photo.

## Deploy

Vercel: framework preset **Vite**, build `npm run build`, output `dist`. `vercel.json` rewrites all routes to `index.html` so deep links like `/projects/raft` work.
