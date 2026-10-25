# Repository guidance

## Commands

Run these from the repository root:

| Goal                                    | Command                |
| --------------------------------------- | ---------------------- |
| Start the Vite dev server               | `npm run dev`          |
| Create a production build               | `npm run build`        |
| Lint with Oxlint                        | `npm run lint`         |
| Format with Oxfmt                       | `npm run format`       |
| Check formatting without changing files | `npm run format:check` |

In PowerShell on this Windows setup, use `npm.cmd` if the execution policy
blocks `npm.ps1` (for example, `npm.cmd run build`).

There is currently no test script, test runner, or test file in the repository,
so there is no single-test command yet.

## Application structure

`index.html` provides the document shell and `#root` mount point. Vite loads
`src/main.jsx`, which imports the global stylesheet, mounts `App` with React
`createRoot`, and wraps it in `StrictMode`.

`vite.config.js` enables the React plugin and Tailwind CSS v4 Vite plugin.
`src/index.css` imports Tailwind and contains only global page defaults;
component styling is currently expressed with Tailwind utility classes in JSX.

The current product UI and task behavior live in `src/App.jsx`. The sample task
array initializes component state; task cards are rendered from that state,
status changes use a functional state update, and the completed count is
derived from the current task list. The task form uses controlled inputs and
adds tasks to the same local state. Data is currently local and in-memory:
Supabase is planned, but is not yet installed or connected.

Keep the current small structure while it fits. If features grow, organize
around actual app concerns (such as projects, tasks, and account flows) rather
than introducing folders or abstractions before they are needed.

## Repository conventions

- The app is authored in JavaScript/JSX. TypeScript is deferred until the
  learner has studied it; do not convert files to TypeScript without agreement.
- Format with Oxfmt and lint with Oxlint. Follow the formatter's existing
  double-quote, semicolon, and JSX formatting output.
- Use Tailwind utilities for component styling; keep `src/index.css` for
  Tailwind import and global defaults.
- Task updates must preserve React state immutably. Prefer functional setters
  when the next value depends on the previous value, and use the task's stable
  `id` as the React list key.
- Form inputs are controlled by React state. Submit handlers should prevent
  native page navigation before applying application behavior.
- Explain a dependency's purpose and get the learner's approval before asking
  them to install it. The learner prefers incremental, explained
  pair-programming rather than having lessons implemented wholesale.
- Keep secrets in ignored environment files. `.env.example` is allowed to be
  tracked; never put actual credentials in source or examples.
- Consult the local `QUESTBOARD.md` project guide for the current lesson,
  learning preferences, milestones, architecture decisions, and dependency
  status. Update it after milestones are implemented and verified.
- `QUESTBOARD.md` is intentionally ignored and serves as a local-only project
  and milestone tracker. Do not add it to commits unless explicitly requested.
- After each implementation step is complete and its applicable checks pass,
  update `README.md` to reflect the current app and next planned work, then
  commit and push the successful step to `origin` before starting another.
  Keep local-only `QUESTBOARD.md`, `.env` files, and other ignored files out of
  commits. If publishing is blocked, report the exact blocker instead of
  implying the changes were pushed.
- Do not introduce Vercel products. Supabase is the planned backend; add its
  client and configuration only when the app reaches data integration.
