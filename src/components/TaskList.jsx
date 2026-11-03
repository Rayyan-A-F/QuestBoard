import TaskCard from "./TaskCard";

function TaskList({
  visibleTasks,
  projectNames,
  selectedProject,
  onProjectChange,
  onToggleStatus,
  onRemoveTask,
}) {
  return (
    <section aria-labelledby="tasks-heading" className="mt-12" id="tasks">
      <div className="mb-5 grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
        <div>
          <h2 className="text-xl font-bold tracking-tight" id="tasks-heading">
            Your tasks
          </h2>
          <p className="mt-1 text-sm text-slate-600">A little progress adds up.</p>
        </div>

        <div className="flex flex-wrap items-end gap-3 sm:justify-end">
          <div className="grid gap-1">
            <label htmlFor="project-filter" className="text-sm font-medium text-slate-700">
              Filter by project
            </label>
            <select
              id="project-filter"
              name="project"
              value={selectedProject}
              onChange={(event) => onProjectChange(event.target.value)}
              className="project-select w-full sm:w-auto"
            >
              <option value="All projects">All projects</option>
              {projectNames.map((projectName) => (
                <option key={projectName} value={projectName}>
                  {projectName}
                </option>
              ))}
            </select>
          </div>
          <p className="text-sm font-medium text-slate-500">
            {visibleTasks.length} {visibleTasks.length === 1 ? "task" : "tasks"}
          </p>
        </div>
      </div>

      {visibleTasks.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2">
          {visibleTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onToggleStatus={onToggleStatus}
              onRemoveTask={onRemoveTask}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
          <p className="font-medium text-slate-800">
            {selectedProject === "All projects" ? "No tasks yet" : "No tasks in this project"}
          </p>
          <p className="mt-1 text-sm text-slate-600">
            {selectedProject === "All projects"
              ? "Add a task above to get started."
              : "Choose another project or add a task to this one."}
          </p>
        </div>
      )}
    </section>
  );
}

export default TaskList;
