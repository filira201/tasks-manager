import type { TaskCategory, TaskPriority, TaskStatus } from "../types";

export const TASK_CATEGORY = ["Bug", "Feature", "Documentation", "Refactor", "Test"] as const;
export const TASK_STATUS = ["To Do", "In Progress", "Done"] as const;
export const TASK_PRIORITY = ["Low", "Medium", "High"] as const;
export const ITEMS_PER_PAGE = 5;
export const CHIP_COLORS = ["default", "primary", "secondary", "success", "warning", "danger"] as const;

export const statusColor: Record<TaskStatus, (typeof CHIP_COLORS)[number]> = {
  "To Do": "primary",
  "In Progress": "secondary",
  Done: "success",
};

export const categoryColor: Record<TaskCategory, (typeof CHIP_COLORS)[number]> = {
  Bug: "danger",
  Feature: "primary",
  Documentation: "secondary",
  Refactor: "warning",
  Test: "default",
};

export const priorityColor: Record<TaskPriority, (typeof CHIP_COLORS)[number]> = {
  Low: "default",
  Medium: "primary",
  High: "danger",
};
