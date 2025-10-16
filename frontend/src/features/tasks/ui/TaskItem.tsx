import { Button, Card, CardBody, CardFooter, CardHeader, Chip, useDisclosure } from "@heroui/react";
import { memo, useCallback } from "react";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBinLine } from "react-icons/ri";
import { useNavigate } from "react-router";

import { ModalDeleteTask } from "@/features/tasks";
import { categoryColor, priorityColor, statusColor } from "@/shared/lib/constants";
import type { Task } from "@/shared/lib/types";
import { formatToClientDate } from "@/shared/lib/utils";

type Props = {
  task: Task;
};

export const TaskItem = memo(({ task }: Props) => {
  const navigate = useNavigate();
  const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure();

  const handleNavigateToTask = useCallback(() => {
    navigate(`/task/${task.id}`);
  }, [navigate, task.id]);

  return (
    <>
      <Card className="w-full min-h-64">
        <CardHeader>
          <div className="w-full flex justify-between gap-1 items-center">
            <h3 className="text-xl font-medium line-clamp-1" title={task.title}>
              {task.title}
            </h3>
            <Button isIconOnly aria-label="Удалить задачу" color="danger" variant="flat" onPress={onOpen}>
              <RiDeleteBinLine />
            </Button>
          </div>
        </CardHeader>

        <CardBody>
          {task.description && (
            <p className="text-lg text-default-500 line-clamp-2" title={task.description}>
              {task.description}
            </p>
          )}
        </CardBody>

        <CardFooter className="flex flex-col gap-4 items-start">
          <div className="flex gap-2 flex-wrap">
            <Chip color={categoryColor[task.category]}>{task.category}</Chip>
            <Chip color={statusColor[task.status]}>{task.status}</Chip>
            <Chip color={priorityColor[task.priority]}>{task.priority}</Chip>
          </div>

          <p className="font-base text-default-600 text-lg">Создана: {formatToClientDate(task.createdAt)}</p>

          <Button
            onPress={handleNavigateToTask}
            color="primary"
            size="md"
            variant="flat"
            endContent={<CiEdit />}
            fullWidth
          >
            Редактировать
          </Button>
        </CardFooter>
      </Card>
      <ModalDeleteTask isOpen={isOpen} onOpenChange={onOpenChange} onClose={onClose} taskId={task.id} />
    </>
  );
});
