import type { TASK_CATEGORY, TASK_PRIORITY, TASK_STATUS } from "@/lib";

export type TaskData = {
  data: Task[];
  first: number;
  items: number;
  last: number;
  next: number | null;
  pages: number;
  prev: number | null;
};

export type Task = {
  id: string;
  title: string;
  description?: string;
  category: TaskCategory;
  status: TaskStatus;
  priority: TaskPriority;
  createdAt: string;
};

export type TaskCategory = (typeof TASK_CATEGORY)[number];
export type TaskStatus = (typeof TASK_STATUS)[number];
export type TaskPriority = (typeof TASK_PRIORITY)[number];
