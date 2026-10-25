# Questboard

Questboard is a small project-planning app built as a hands-on React learning
project. It helps organize tasks and track progress.

## Current features

- View sample tasks with project, due date, and status.
- Add tasks with a title and due date.
- Advance a task through To do, In progress, and Completed.
- Remove tasks and see an empty-state message when none remain.
- See total and completed task counts.
- Validate blank task titles with accessible inline feedback.

Tasks currently live in React state, so changes are temporary and reset when
the page reloads. Supabase persistence and accounts are planned, not connected.

## Tech stack

- React 19 and JavaScript
- Vite 8
- Tailwind CSS 4
- Temporal polyfill (`@js-temporal/polyfill`) for date-only task deadlines
- Oxlint and Oxfmt

TypeScript is deferred until it has been covered in the learning path. Vercel
products are not used.

## Getting started

Requires Node.js and npm.

```sh
npm install
npm run dev
```

## Project commands

```sh
npm run build
npm run lint
npm run format
npm run format:check
```

There is not yet a test runner or test script.

## Next

Next, add project organization and navigation, starting with a way to view and
filter tasks by project. Later milestones include Supabase data and
authentication, accessibility and focused tests, and deployment to a
non-Vercel host.
