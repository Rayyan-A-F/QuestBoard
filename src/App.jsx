import { useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

const tasks = [
  {
    id: 1,
    title: "Outline the project roadmap",
    description:
      "Create a detailed roadmap for the Questboard project, including milestones and deadlines.",
    dueDate: "2026-10-24",
    project: "Questboard",
    status: "In progress",
  },
  {
    id: 2,
    title: "Sketch the dashboard",
    description:
      "Design the initial sketches for the Questboard dashboard, focusing on user experience and layout.",
    dueDate: "2026-10-28",
    project: "Website Redesign",
    status: "To do",
  },
];

function App() {
  const [taskList, setTaskList] = useState(tasks);
  const [selectedProject, setSelectedProject] = useState("All projects");
  const completedCount = taskList.filter((task) => task.status === "Completed").length;
  const projectNames = [
    ...new Set([...tasks.map((task) => task.project), ...taskList.map((task) => task.project)]),
  ];
  const visibleTasks =
    selectedProject === "All projects"
      ? taskList
      : taskList.filter((task) => task.project === selectedProject);

  function handleAddTask({ title, dueDate, project }) {
    const newTask = {
      id: crypto.randomUUID(),
      title,
      description: "",
      dueDate,
      project,
      status: "To do",
    };

    setTaskList((prevTasks) => [...prevTasks, newTask]);
  }

  function toggleStatus(id) {
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
  }

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

        <TaskForm projectNames={projectNames} onAddTask={handleAddTask} />
        <TaskList
          visibleTasks={visibleTasks}
          projectNames={projectNames}
          selectedProject={selectedProject}
          onProjectChange={setSelectedProject}
          onToggleStatus={toggleStatus}
          onRemoveTask={removeTask}
        />
      </div>
    </main>
  );
}

export default App;
