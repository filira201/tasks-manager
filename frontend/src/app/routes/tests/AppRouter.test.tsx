import { cleanup, render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { beforeEach, describe, expect, test, vi } from "vitest";

import { AppRouter } from "../AppRouter";

import { Providers } from "@/app/providers";
import type { Task } from "@/shared/lib/types";

// Мокаем API
vi.mock("@/features/tasks/api/tasksApi", () => ({
  useGetAllTasksQuery: vi.fn(() => ({
    data: { data: [], pages: 0 },
    isLoading: false,
    isFetching: false,
    error: null,
    refetch: vi.fn(),
  })),
  useGetTaskByIdQuery: vi.fn(() => ({
    data: null,
    isLoading: false,
    error: null,
  })),
  useDeleteTaskMutation: vi.fn(() => [vi.fn(), { isLoading: false }]),
  useUpdateTaskMutation: vi.fn(() => [vi.fn(), { isLoading: false }]),
  useCreateTaskMutation: vi.fn(() => [vi.fn(), { isLoading: false }]),
}));

beforeEach(() => {
  // Мокаем window.scrollTo, так как jsdom не реализует этот метод
  // Пока что это просто мок
  cleanup(); // очищаем DOM после каждого теста
  vi.stubGlobal("scrollTo", vi.fn());
});

describe("тестирование страниц (AppRouter)", () => {
  test("если пользователь на главной странице (/), то должен быть заголовок h1 с текстом 'Задачи'", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Providers>
          <AppRouter />
        </Providers>
      </MemoryRouter>
    );

    const title = screen.getByTestId("tasks-page-title");
    expect(title).toBeInTheDocument();
    expect(title.tagName).toBe("H1");
    expect(title).toHaveTextContent("Задачи");
  });

  test("если пользователь на странице задачи (/task/1), то должен быть заголовок h1 с текстом 'Редактирование задачи'", () => {
    render(
      <MemoryRouter initialEntries={["/task/1"]}>
        <Providers>
          <AppRouter />
        </Providers>
      </MemoryRouter>
    );

    const title = screen.getByTestId("task-page-title");
    expect(title).toBeInTheDocument();
    expect(title.tagName).toBe("H1");
    expect(title).toHaveTextContent("Редактирование задачи");
  });

  test("если пользователь на странице создания задачи (/task/new), то должен быть заголовок h1 с текстом 'Создать задачу'", () => {
    render(
      <MemoryRouter initialEntries={["/task/new"]}>
        <Providers>
          <AppRouter />
        </Providers>
      </MemoryRouter>
    );

    const title = screen.getByTestId("task-create-page-title");
    expect(title).toBeInTheDocument();
    expect(title.tagName).toBe("H1");
    expect(title).toHaveTextContent("Создать задачу");
  });

  test("если пользователь переходит на неизвестный маршрут, то должен быть редирект на '/'", async () => {
    render(
      <MemoryRouter initialEntries={["/unknown"]}>
        <Providers>
          <AppRouter />
        </Providers>
      </MemoryRouter>
    );

    const title = screen.getByTestId("tasks-page-title");
    expect(title).toBeInTheDocument();
    expect(title.tagName).toBe("H1");
    expect(title).toHaveTextContent("Задачи");
  });
});

describe("тестирование навигации между страницами", () => {
  test("если кликнуть на кнопку 'Редактировать' задачи, то должен произойти переход на страницу редактирования этой задачи", async () => {
    const user = userEvent.setup();
    const mockTasks: Task[] = [
      {
        id: "task-123",
        title: "Тестовая задача для редактирования",
        description: "Описание задачи",
        category: "Feature",
        status: "To Do",
        priority: "High",
        createdAt: "2024-01-15T10:30:00.000Z",
      },
    ];

    // Переопределяем мок для этого теста
    const { useGetAllTasksQuery } = await import("@/features/tasks/api/tasksApi");
    vi.mocked(useGetAllTasksQuery).mockReturnValue({
      data: { data: mockTasks, pages: 1, first: 1, last: 1, next: null, prev: null, items: 1 },
      isLoading: false,
      isFetching: false,
      error: null,
      refetch: vi.fn(),
    });

    render(
      <MemoryRouter initialEntries={["/"]}>
        <Providers>
          <AppRouter />
        </Providers>
      </MemoryRouter>
    );

    const taskTitle = await screen.findByText("Тестовая задача для редактирования");
    expect(taskTitle).toBeInTheDocument();

    const editButton = screen.getByTestId("task-item-edit-button");
    expect(editButton).toBeInTheDocument();

    await user.click(editButton);

    const editPageTitle = await screen.findByTestId("task-page-title");
    expect(editPageTitle).toBeInTheDocument();
    expect(editPageTitle).toHaveTextContent("Редактирование задачи");
  });

  test("если кликнуть на ссылку 'Создать задачу', то должен произойти переход на страницу создания задачи", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Providers>
          <AppRouter />
        </Providers>
      </MemoryRouter>
    );

    const link = screen.getByTestId("nav-link-create-task");
    expect(link).toBeInTheDocument();

    await user.click(link);

    const createPageTitle = screen.getByTestId("task-create-page-title");
    expect(createPageTitle).toBeInTheDocument();
    expect(createPageTitle.tagName).toBe("H1");
    expect(createPageTitle).toHaveTextContent("Создать задачу");
  });
});
