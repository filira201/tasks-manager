import { addToast } from "@heroui/react";
import { useCallback } from "react";
import { useNavigate } from "react-router";

import { TaskForm, useCreateTaskMutation } from "@/features/tasks";
import type { Task } from "@/shared/lib/types";

export const TaskCreatePageContent = () => {
  const navigate = useNavigate();
  const [createTask, { isLoading }] = useCreateTaskMutation();

  const handleCancel = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const handleCreate = useCallback(
    async (taskData: Task) => {
      const task = { ...taskData, createdAt: new Date().toISOString() };

      await createTask(task).unwrap();
      navigate(-1);

      addToast({
        title: "Задача",
        description: "Вы создали новую задачу",
        color: "success",
      });
    },
    [createTask, navigate]
  );

  return <TaskForm onSubmit={handleCreate} isLoading={isLoading} submitText="Создать" onCancel={handleCancel} />;
};
