import { addToast } from "@heroui/react";
import { useNavigate, useParams } from "react-router";

import { useGetTaskByIdQuery, useUpdateTaskMutation } from "@/api";
import { Loader, QueryError, TaskForm } from "@/components";
import type { Task } from "@/lib";

export const TaskPageContent = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [updateTask, { isLoading: isUpdating }] = useUpdateTaskMutation();
  const { data: task, isLoading, isFetching, error, refetch } = useGetTaskByIdQuery(id ?? "");

  if (isLoading || isFetching) {
    return <Loader />;
  }

  if (error || !task) {
    return <QueryError error={error} onRetry={() => refetch()} />;
  }

  const handleUpdate = async (taskData: Task) => {
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
  };

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
