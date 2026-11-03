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
- Filter tasks by project with a controlled selector.
- Customize the native project selector and its option picker in supported
  browsers, with a fallback for other browsers.

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

The sample data includes two projects, and the controlled selector filters
tasks by project. Its closed control, keyboard focus ring, popup, and selected
option are styled, with customizable-select styling progressively enhanced
where supported. The task toolbar adapts to narrow and wide layouts. Next, add
task descriptions and project assignment to task creation, then continue
collaborative visual polish. The local
`QUESTBOARD.md` tracks the learner-led React and Tailwind lesson sequence.
Later milestones include Supabase data and authentication, accessibility and
focused tests, and deployment to a non-Vercel host.
