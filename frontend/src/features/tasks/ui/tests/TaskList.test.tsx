import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, test } from "vitest";

import { TaskList } from "../TaskList";

import type { Task } from "@/shared/lib/types";

// Мок-данные для тестов
const createMockTask = (id: string, title: string): Task => ({
  id,
  title,
  description: `Описание для ${title}`,
  category: "Feature",
  status: "To Do",
  priority: "Medium",
  createdAt: "2024-01-15T10:30:00.000Z",
});

describe.skip("список задач", () => {
  test("если передан пустой массив задач, то должен отрендерить пустой список", () => {
    // Подготовка
    const tasks: Task[] = [];

    // Действие
    const { container } = render(
      <MemoryRouter>
        <TaskList tasks={tasks} />
      </MemoryRouter>
    );

    // Проверка
    const grid = container.querySelector(".grid");
    expect(grid).toBeTruthy();
    expect(grid?.children.length).toBe(0);
  });

  test("если передана одна задача, то должна отрендериться одна карточка", () => {
    // Подготовка
    const tasks = [createMockTask("1", "Первая задача")];

    // Действие
    render(
      <MemoryRouter>
        <TaskList tasks={tasks} />
      </MemoryRouter>
    );

    // Проверка
    expect(screen.getByText("Первая задача")).toBeTruthy();
  });

  test("если переданы три задачи, то все три должны отрендериться", () => {
    // Подготовка
    const tasks = [
      createMockTask("1", "Первая задача"),
      createMockTask("2", "Вторая задача"),
      createMockTask("3", "Третья задача"),
    ];

    // Действие
    render(
      <MemoryRouter>
        <TaskList tasks={tasks} />
      </MemoryRouter>
    );

    // Проверка
    expect(screen.getByText("Первая задача")).toBeTruthy();
    expect(screen.getByText("Вторая задача")).toBeTruthy();
    expect(screen.getByText("Третья задача")).toBeTruthy();
  });

  test("если переданы пять задач, то в grid должно быть пять элементов", () => {
    // Подготовка
    const tasks = [
      createMockTask("1", "Задача 1"),
      createMockTask("2", "Задача 2"),
      createMockTask("3", "Задача 3"),
      createMockTask("4", "Задача 4"),
      createMockTask("5", "Задача 5"),
    ];

    // Действие
    const { container } = render(
      <MemoryRouter>
        <TaskList tasks={tasks} />
      </MemoryRouter>
    );

    // Проверка
    const grid = container.querySelector(".grid");
    expect(grid?.children.length).toBe(5);
  });

  test("если отрендерить список задач, то grid должен иметь адаптивные классы", () => {
    // Подготовка
    const tasks = [createMockTask("1", "Тестовая задача")];

    // Действие
    const { container } = render(
      <MemoryRouter>
        <TaskList tasks={tasks} />
      </MemoryRouter>
    );

    // Проверка
    const grid = container.querySelector(".grid");
    expect(grid?.className).toContain("grid-cols-1");
    expect(grid?.className).toContain("sm:grid-cols-2");
    expect(grid?.className).toContain("xl:grid-cols-3");
  });

  test("если переданы задачи с разными категориями, то все категории должны отобразиться", () => {
    // Подготовка
    const tasks: Task[] = [
      { ...createMockTask("1", "Баг"), category: "Bug" },
      { ...createMockTask("2", "Фича"), category: "Feature" },
      { ...createMockTask("3", "Документация"), category: "Documentation" },
    ];

    // Действие
    render(
      <MemoryRouter>
        <TaskList tasks={tasks} />
      </MemoryRouter>
    );

    // Проверка
    expect(screen.getByText("Bug")).toBeTruthy();
    expect(screen.getByText("Feature")).toBeTruthy();
    expect(screen.getByText("Documentation")).toBeTruthy();
  });

  test("если переданы задачи с разными статусами, то все статусы должны отобразиться", () => {
    // Подготовка
    const tasks: Task[] = [
      { ...createMockTask("1", "Задача 1"), status: "To Do" },
      { ...createMockTask("2", "Задача 2"), status: "In Progress" },
      { ...createMockTask("3", "Задача 3"), status: "Done" },
    ];

    // Действие
    render(
      <MemoryRouter>
        <TaskList tasks={tasks} />
      </MemoryRouter>
    );

    // Проверка
    expect(screen.getByText("To Do")).toBeTruthy();
    expect(screen.getByText("In Progress")).toBeTruthy();
    expect(screen.getByText("Done")).toBeTruthy();
  });

  test("если переданы задачи с разными приоритетами, то все приоритеты должны отобразиться", () => {
    // Подготовка
    const tasks: Task[] = [
      { ...createMockTask("1", "Низкий приоритет"), priority: "Low" },
      { ...createMockTask("2", "Средний приоритет"), priority: "Medium" },
      { ...createMockTask("3", "Высокий приоритет"), priority: "High" },
    ];

    // Действие
    render(
      <MemoryRouter>
        <TaskList tasks={tasks} />
      </MemoryRouter>
    );

    // Проверка
    expect(screen.getByText("Low")).toBeTruthy();
    expect(screen.getByText("Medium")).toBeTruthy();
    expect(screen.getByText("High")).toBeTruthy();
  });
});
