import { useState } from "react";

function TaskForm({ projectNames, onAddTask }) {
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newDueDate, setNewDueDate] = useState("");
  const [selectedProject, setSelectedProject] = useState(projectNames[0] ?? "");
  const [formError, setFormError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const trimmedTitle = newTitle.trim();

    if (!trimmedTitle) {
      setFormError("Task title cannot be empty.");
      return;
    }

    setFormError("");
    onAddTask({
      title: trimmedTitle,
      description: newDescription.trim(),
      dueDate: newDueDate,
      project: selectedProject,
    });
    setNewTitle("");
    setNewDescription("");
    setNewDueDate("");
  }

  return (
    <section className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
      <form
        onSubmit={handleSubmit}
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
          <label htmlFor="new-task-description" className="text-sm font-medium text-slate-700">
            Description:
          </label>
          <textarea
            id="new-task-description"
            value={newDescription}
            onChange={(event) => setNewDescription(event.target.value)}
            className="w-full resize-y rounded-lg border border-slate-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
            rows={3}
          />
        </div>

        <div className="grid gap-1.5">
          <label htmlFor="new-task-project" className="text-sm font-medium text-slate-700">
            Project:
          </label>
          <select
            id="new-task-project"
            value={selectedProject}
            onChange={(event) => setSelectedProject(event.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
            required
          >
            {projectNames.map((projectName) => (
              <option key={projectName} value={projectName}>
                {projectName}
              </option>
            ))}
          </select>
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
  );
}

export default TaskForm;
