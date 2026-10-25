import { Temporal } from "@js-temporal/polyfill";
import { useState } from "react";

const tasks = [
  {
    id: 1,
    title: "Outline the project roadmap",
    dueDate: "2026-10-24",
    project: "Questboard",
    status: "In progress",
  },
  {
    id: 2,
    title: "Sketch the dashboard",
    dueDate: "2026-10-28",
    project: "Questboard",
    status: "To do",
  },
];

function App() {
  const [taskList, setTaskList] = useState(tasks);
  const [newTitle, setNewTitle] = useState("");
  const [newDueDate, setNewDueDate] = useState("");
  const [formError, setFormError] = useState("");
  const completedCount = taskList.filter((task) => task.status === "Completed").length;

  function handleAddTask(event) {
    event.preventDefault();
    const trimmedTitle = newTitle.trim();
    if (!trimmedTitle) {
      setFormError("Task title cannot be empty.");
      return;
    }

    setFormError("");

    const newTask = {
      id: crypto.randomUUID(),
      title: trimmedTitle,
      dueDate: newDueDate,
      project: "Questboard",
      status: "To do",
    };

    setTaskList((prevTasks) => [...prevTasks, newTask]);
    setNewTitle("");
    setNewDueDate("");
  }

  const toggleStatus = (id) => {
    setTaskList((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id !== id) return task;

        const current = task.status.toLowerCase();
        let nextStatus = "To do";

        if (current === "to do") {
          nextStatus = "In progress";
        } else if (current === "in progress") {
          nextStatus = "Completed";
        }

        return { ...task, status: nextStatus };
      }),
    );
  };

  function removeTask(id) {
    setTaskList((prevTasks) => prevTasks.filter((task) => task.id !== id));
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
          <a className="flex items-center gap-3" href="/" aria-label="QuestBoard home">
            <span className="grid size-10 place-items-center rounded-xl bg-emerald-950/80 text-lg font-bold text-white">
              Qb
            </span>
            <span className="text-xl font-bold tracking-tight">QuestBoard</span>
          </a>
          <span className="hidden rounded-full bg-indigo-50 px-3 py-1.5 text-sm font-medium text-indigo-700 sm:inline-flex">
            Personal workspace
          </span>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-14">
        <section className="flex flex-col gap-3">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-indigo-600">
            Your workspace
          </p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Make progress, one task at a time.
          </h1>
          <p className="max-w-2xl leading-7 text-slate-600">
            Keep your projects organized, know what needs attention, and make steady progress.
          </p>
        </section>

        <section aria-label="Task summary" className="mt-8 grid gap-4 sm:grid-cols-2">
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Total tasks</p>
            <p className="mt-2 text-3xl font-bold">{taskList.length}</p>
          </article>
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Completed</p>
            <p className="mt-2 text-3xl font-bold text-emerald-700">{completedCount}</p>
          </article>
        </section>

        <section className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
          <form
            onSubmit={handleAddTask}
            className="grid w-full max-w-xl gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
          >
            <div className="grid gap-1.5">
              <label htmlFor="new-task-title" className="text-sm font-medium text-slate-700">
                Task title:
              </label>
              <input
                aria-invalid={Boolean(formError)}
                aria-describedby={formError ? "task-title-error" : undefined}
                type="text"
                id="new-task-title"
                value={newTitle}
                onChange={(event) => {
                  setNewTitle(event.target.value);
                  if (event.target.value.trim()) {
                    setFormError("");
                  }
                }}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                required
              />
              {formError && (
                <p id="task-title-error" className="text-sm text-red-600" role="alert">
                  {formError}
                </p>
              )}
            </div>

            <div className="grid gap-1.5">
              <label htmlFor="new-task-date" className="text-sm font-medium text-slate-700">
                Due date:
              </label>
              <input
                type="date"
                id="new-task-date"
                value={newDueDate}
                onChange={(event) => setNewDueDate(event.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                required
              />
            </div>

            <button
              type="submit"
              className="rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white transition hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add task
            </button>
          </form>
        </section>

        <section aria-labelledby="tasks-heading" className="mt-12" id="tasks">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold tracking-tight" id="tasks-heading">
                Your tasks
              </h2>
              <p className="mt-1 text-sm text-slate-600">A little progress adds up.</p>
            </div>
            <p className="text-sm font-medium text-slate-500">
              {taskList.length} {taskList.length === 1 ? "task" : "tasks"}
            </p>
          </div>
          {taskList.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {taskList.map((task) => {
                const statusStyles = {
                  "To do": "bg-slate-100 text-slate-700",
                  "In progress": "bg-indigo-50 text-indigo-700",
                  Completed: "bg-emerald-50 text-emerald-700",
                };

                return (
                  <article
                    key={task.id}
                    className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:p-6"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm font-medium text-slate-500">{task.project}</p>
                        <h3 className="mt-1 text-lg font-semibold tracking-tight">{task.title}</h3>
                      </div>
                      <span
                        className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[task.status]}`}
                      >
                        {task.status}
                      </span>
                    </div>

                    <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
                      <p className="text-sm text-slate-600">
                        Due{" "}
                        <time dateTime={task.dueDate}>
                          {Temporal.PlainDate.from(task.dueDate).toLocaleString("en", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </time>
                      </p>
                      <button
                        type="button"
                        className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={() => toggleStatus(task.id)}
                        aria-label={`Advance status for ${task.title}`}
                      >
                        Advance status
                      </button>
                      <button
                        type="button"
                        className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                        onClick={() => removeTask(task.id)}
                        aria-label={`Remove ${task.title}`}
                      >
                        Remove
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
              <p className="font-medium text-slate-800">No tasks yet</p>
              <p className="mt-1 text-sm text-slate-600">Add a task above to get started.</p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default App;
