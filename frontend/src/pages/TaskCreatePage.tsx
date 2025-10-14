import { TaskCreatePageContent } from "@/components";

export const TaskCreatePage = () => {
  return (
    <div className="min-h-screen h-full">
      <h1 className="mb-10 font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl">Создать задачу</h1>
      <TaskCreatePageContent />
    </div>
  );
};
