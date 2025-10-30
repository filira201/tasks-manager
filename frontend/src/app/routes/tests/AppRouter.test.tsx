import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, test, vi } from "vitest";

import { AppRouter } from "../AppRouter";

// Мокаем API запросы
vi.mock("@/features/tasks/api/tasksApi", () => ({
  useGetAllTasksQuery: vi.fn(() => ({
    data: { data: [], pages: 0 },
    isLoading: false,
    isError: false,
  })),
  useGetTaskByIdQuery: vi.fn(() => ({
    data: null,
    isLoading: false,
    isError: false,
  })),
  useUpdateTaskMutation: vi.fn(() => [vi.fn(), { isLoading: false }]),
  useDeleteTaskMutation: vi.fn(() => [vi.fn(), { isLoading: false }]),
  useCreateTaskMutation: vi.fn(() => [vi.fn(), { isLoading: false }]),
}));

describe.skip("роутинг приложения", () => {
  test("если перейти на главную страницу, то должен отобразиться заголовок 'Задачи'", () => {
    // Подготовка - нет

    // Действие
    render(
      <MemoryRouter initialEntries={["/"]}>
        <AppRouter />
      </MemoryRouter>
    );

    // Проверка
    expect(screen.getByText("Задачи")).toBeTruthy();
  });

  test("если перейти на '/task/new', то должен отобразиться заголовок 'Создать задачу'", () => {
    // Подготовка - нет

    // Действие
    render(
      <MemoryRouter initialEntries={["/task/new"]}>
        <AppRouter />
      </MemoryRouter>
    );

    // Проверка
    expect(screen.getByText("Создать задачу")).toBeTruthy();
  });

  test("если перейти на '/task/:id', то должен отобразиться заголовок 'Редактирование Задачи'", () => {
    // Подготовка - нет

    // Действие
    render(
      <MemoryRouter initialEntries={["/task/123"]}>
        <AppRouter />
      </MemoryRouter>
    );

    // Проверка
    expect(screen.getByText("Редактирование Задачи")).toBeTruthy();
  });

  test("если перейти на несуществующий маршрут, то должен произойти редирект на главную", () => {
    // Подготовка - нет

    // Действие
    render(
      <MemoryRouter initialEntries={["/non-existent-route"]}>
        <AppRouter />
      </MemoryRouter>
    );

    // Проверка - должна отобразиться главная страница
    expect(screen.getByText("Задачи")).toBeTruthy();
  });

  test("если перейти на '/about', то должен произойти редирект на главную", () => {
    // Подготовка - нет

    // Действие
    render(
      <MemoryRouter initialEntries={["/about"]}>
        <AppRouter />
      </MemoryRouter>
    );

    // Проверка
    expect(screen.getByText("Задачи")).toBeTruthy();
  });

  test("если перейти на '/random-page', то должен произойти редирект на главную", () => {
    // Подготовка - нет

    // Действие
    render(
      <MemoryRouter initialEntries={["/random-page"]}>
        <AppRouter />
      </MemoryRouter>
    );

    // Проверка
    expect(screen.getByText("Задачи")).toBeTruthy();
  });
});

describe.skip("навигация между страницами", () => {
  test("если открыть страницу создания задачи, то должна быть форма", () => {
    // Подготовка - нет

    // Действие
    const { container } = render(
      <MemoryRouter initialEntries={["/task/new"]}>
        <AppRouter />
      </MemoryRouter>
    );

    // Проверка - есть форма на странице
    const form = container.querySelector("form");
    expect(form).toBeTruthy();
  });

  test("если открыть страницу редактирования задачи с ID, то URL должен содержать этот ID", () => {
    // Подготовка
    const taskId = "test-task-123";

    // Действие
    render(
      <MemoryRouter initialEntries={[`/task/${taskId}`]}>
        <AppRouter />
      </MemoryRouter>
    );

    // Проверка - страница редактирования отобразилась
    expect(screen.getByText("Редактирование Задачи")).toBeTruthy();
  });
});

describe.skip("структура маршрутов", () => {
  test("если отрендерить главную страницу, то должен быть контейнер с min-h-screen", () => {
    // Подготовка - нет

    // Действие
    const { container } = render(
      <MemoryRouter initialEntries={["/"]}>
        <AppRouter />
      </MemoryRouter>
    );

    // Проверка
    const mainContainer = container.querySelector(".min-h-screen");
    expect(mainContainer).toBeTruthy();
  });

  test("если отрендерить страницу создания задачи, то должен быть контейнер с min-h-screen", () => {
    // Подготовка - нет

    // Действие
    const { container } = render(
      <MemoryRouter initialEntries={["/task/new"]}>
        <AppRouter />
      </MemoryRouter>
    );

    // Проверка
    const mainContainer = container.querySelector(".min-h-screen");
    expect(mainContainer).toBeTruthy();
  });

  test("если отрендерить страницу редактирования, то должен быть контейнер с min-h-screen", () => {
    // Подготовка - нет

    // Действие
    const { container } = render(
      <MemoryRouter initialEntries={["/task/456"]}>
        <AppRouter />
      </MemoryRouter>
    );

    // Проверка
    const mainContainer = container.querySelector(".min-h-screen");
    expect(mainContainer).toBeTruthy();
  });
});
