import { addToast } from "@heroui/react";
import { useNavigate } from "react-router";

import { useCreateTaskMutation } from "@/api";
import { TaskForm } from "@/components";
import type { Task } from "@/lib";

export const TaskCreatePageContent = () => {
  const navigate = useNavigate();
  const [createTask, { isLoading }] = useCreateTaskMutation();

  const handleCreate = async (taskData: Task) => {
    const task = { ...taskData, createdAt: new Date().toISOString() };

    await createTask(task).unwrap();
    navigate(-1);

    addToast({
      title: "Задача",
      description: "Вы создали новую задачу",
      color: "success",
    });
  };

  return <TaskForm onSubmit={handleCreate} isLoading={isLoading} submitText="Создать" onCancel={() => navigate(-1)} />;
};
