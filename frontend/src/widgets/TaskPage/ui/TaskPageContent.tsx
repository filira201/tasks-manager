import { addToast } from "@heroui/react";
import { useCallback } from "react";
import { useNavigate, useParams } from "react-router";

import { TaskForm, useGetTaskByIdQuery, useUpdateTaskMutation } from "@/features/tasks";
import type { Task } from "@/shared/lib/types";
import { Loader } from "@/shared/ui/Loader";
import { QueryError } from "@/shared/ui/QueryError";

export const TaskPageContent = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [updateTask, { isLoading: isUpdating }] = useUpdateTaskMutation();
  const { data: task, isLoading, isFetching, error, refetch } = useGetTaskByIdQuery(id ?? "");

  const handleUpdate = useCallback(
    async (taskData: Task) => {
      if (!id) {
        return;
      }

      await updateTask({ taskData, id: id }).unwrap();
      navigate(-1);
      addToast({
        title: "Задача",
        description: "Вы обновили задачу",
        color: "success",
      });
    },
    [id, updateTask, navigate]
  );

  if (isLoading || isFetching) {
    return <Loader />;
  }

  const handleRetry = () => refetch();

  if (error || !task) {
    return <QueryError error={error} onRetry={handleRetry} />;
  }

  return (
    <TaskForm
      initialValues={task}
      onSubmit={handleUpdate}
      isLoading={isUpdating}
      onCancel={() => navigate(-1)}
      submitText="Редактировать"
    />
  );
};
