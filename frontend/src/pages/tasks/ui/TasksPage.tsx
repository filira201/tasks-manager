import { TasksPageContent } from "@/widgets/Tasks";

export const TasksPage = () => {
  return (
    <div className="min-h-screen h-full">
      <h1 data-testid="tasks-page-title" className="mb-10 font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl">
        Задачи
      </h1>
      <TasksPageContent />
    </div>
  );
};
