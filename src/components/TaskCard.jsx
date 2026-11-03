import { Temporal } from "@js-temporal/polyfill";

const statusStyles = {
  "To do": "bg-slate-100 text-slate-700",
  "In progress": "bg-indigo-50 text-indigo-700",
  Completed: "bg-emerald-50 text-emerald-700",
};

function TaskCard({ task, onToggleStatus, onRemoveTask }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">{task.project}</p>
          <h3 className="mt-1 text-lg font-semibold tracking-tight">{task.title}</h3>
          {task.description && (
            <p className="mt-2 text-sm leading-6 text-slate-600">{task.description}</p>
          )}
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
          onClick={() => onToggleStatus(task.id)}
          aria-label={`Advance status for ${task.title}`}
        >
          Advance status
        </button>
        <button
          type="button"
          className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
          onClick={() => onRemoveTask(task.id)}
          aria-label={`Remove ${task.title}`}
        >
          Remove
        </button>
      </div>
    </article>
  );
}

export default TaskCard;
