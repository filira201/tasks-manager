import { describe, expect, test } from "vitest";

import {
  TASK_CATEGORY,
  TASK_STATUS,
  TASK_PRIORITY,
  ITEMS_PER_PAGE,
  statusColor,
  categoryColor,
  priorityColor,
} from "../tasks";

describe("константы задач", () => {
  test("если обратиться к TASK_CATEGORY, то массив должен содержать все возможные категории", () => {
    // Проверка
    expect(TASK_CATEGORY).toHaveLength(5);
    expect(TASK_CATEGORY).toContain("Bug");
    expect(TASK_CATEGORY).toContain("Feature");
    expect(TASK_CATEGORY).toContain("Documentation");
    expect(TASK_CATEGORY).toContain("Refactor");
    expect(TASK_CATEGORY).toContain("Test");
  });

  test("если обратиться к TASK_STATUS, то массив должен содержать все возможные статусы", () => {
    // Проверка
    expect(TASK_STATUS).toHaveLength(3);
    expect(TASK_STATUS).toContain("To Do");
    expect(TASK_STATUS).toContain("In Progress");
    expect(TASK_STATUS).toContain("Done");
  });

  test("если обратиться к TASK_PRIORITY, то массив должен содержать все возможные приоритеты", () => {
    // Проверка
    expect(TASK_PRIORITY).toHaveLength(3);
    expect(TASK_PRIORITY).toContain("Low");
    expect(TASK_PRIORITY).toContain("Medium");
    expect(TASK_PRIORITY).toContain("High");
  });

  test("если обратиться к ITEMS_PER_PAGE, то значение должно быть положительным числом", () => {
    // Проверка
    expect(ITEMS_PER_PAGE).toBeGreaterThan(0);
    expect(typeof ITEMS_PER_PAGE).toBe("number");
  });
});

describe("цветовые схемы для статусов", () => {
  test("если получить цвет для каждого статуса, то должен быть правильный маппинг", () => {
    // Проверка
    expect(statusColor["To Do"]).toBe("primary");
    expect(statusColor["In Progress"]).toBe("secondary");
    expect(statusColor["Done"]).toBe("success");
  });

  test("если проверить маппинг цветов статусов, то все статусы должны быть покрыты", () => {
    // Подготовка
    const statusKeys = Object.keys(statusColor);

    // Проверка
    expect(statusKeys).toHaveLength(TASK_STATUS.length);

    TASK_STATUS.forEach((status) => {
      expect(statusKeys).toContain(status);
    });
  });

  test("если проверить значения цветов статусов, то все должны быть валидными", () => {
    // Подготовка
    const validColors = ["default", "primary", "secondary", "success", "warning", "danger"];

    // Проверка
    Object.values(statusColor).forEach((color) => {
      expect(validColors).toContain(color);
    });
  });
});

describe("цветовые схемы для категорий", () => {
  test("если получить цвет для каждой категории, то должен быть правильный маппинг", () => {
    // Проверка
    expect(categoryColor["Bug"]).toBe("danger");
    expect(categoryColor["Feature"]).toBe("primary");
    expect(categoryColor["Documentation"]).toBe("secondary");
    expect(categoryColor["Refactor"]).toBe("warning");
    expect(categoryColor["Test"]).toBe("default");
  });

  test("если проверить маппинг цветов категорий, то все категории должны быть покрыты", () => {
    // Подготовка
    const categoryKeys = Object.keys(categoryColor);

    // Проверка
    expect(categoryKeys).toHaveLength(TASK_CATEGORY.length);

    TASK_CATEGORY.forEach((category) => {
      expect(categoryKeys).toContain(category);
    });
  });
});

describe("цветовые схемы для приоритетов", () => {
  test("если получить цвет для каждого приоритета, то должен быть правильный маппинг", () => {
    // Проверка
    expect(priorityColor["Low"]).toBe("default");
    expect(priorityColor["Medium"]).toBe("primary");
    expect(priorityColor["High"]).toBe("danger");
  });

  test("если проверить маппинг цветов приоритетов, то все приоритеты должны быть покрыты", () => {
    // Подготовка
    const priorityKeys = Object.keys(priorityColor);

    // Проверка
    expect(priorityKeys).toHaveLength(TASK_PRIORITY.length);

    TASK_PRIORITY.forEach((priority) => {
      expect(priorityKeys).toContain(priority);
    });
  });
});
