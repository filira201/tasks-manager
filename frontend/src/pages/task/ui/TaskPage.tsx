import { TaskPageContent } from "@/widgets/TaskPage";

export const TaskPage = () => {
  return (
    <div className="min-h-screen h-full">
      <h1 className="mb-10 font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl">Редактирование Задачи</h1>
      <TaskPageContent />
    </div>
  );
};
