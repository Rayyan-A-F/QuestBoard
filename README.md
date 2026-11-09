# Questboard

Questboard is a small project-planning app built as a hands-on React learning
project. It helps organize tasks and track progress.

## Current features

- View sample tasks with project, due date, and status.
- Read descriptions on the sample task cards.
- Add tasks with a title, optional description, due date, and project assignment.
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

## Source organization

- `src/App.jsx` owns shared task state and passes task data and callbacks to
  child components.
- `src/components/TaskForm.jsx` contains task input state, validation, and
  submission.
- `src/components/TaskList.jsx` renders the project filter, task count, list,
  and empty state.
- `src/components/TaskCard.jsx` renders one task, including its description
  and task actions.

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
where supported. The task toolbar adapts to narrow and wide layouts. Sample
cards display descriptions, and new tasks can be assigned to an existing
project with an optional description. Next, continue collaborative visual
polish. A future Questboard website addition may use Astro for a public-facing
site; the app itself remains React/Vite for now. The local
`QUESTBOARD.md` tracks the learner-led React and Tailwind lesson sequence.
Later milestones include Supabase data and authentication, accessibility and
focused tests, and deployment to a non-Vercel host.
