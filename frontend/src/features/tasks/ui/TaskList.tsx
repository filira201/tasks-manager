import { TaskItem } from "./TaskItem";

import type { Task } from "@/shared/lib/types";

type Props = {
  tasks: Task[];
};

export const TaskList = ({ tasks }: Props) => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </div>
    </>
  );
};
