import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { afterEach, describe, expect, test, vi } from "vitest";

import { TaskItem } from "../TaskItem";

import { Providers } from "@/app/providers";
import type { Task } from "@/shared/lib/types";
import { formatToClientDate } from "@/shared/lib/utils";

// Мокаем API хуки
const mockDeleteTask = vi.fn();

vi.mock("@/features/tasks/api/tasksApi", () => ({
  useDeleteTaskMutation: vi.fn(() => [mockDeleteTask, { isLoading: false }]),
}));

// Мок-данные
const createMockTask = (id: string, title: string, description?: string): Task => ({
  id,
  title,
  description,
  category: "Feature",
  status: "To Do",
  priority: "Medium",
  createdAt: "2024-01-15T10:30:00.000Z",
});

const renderTask = (task: Task) => {
  render(
    <MemoryRouter>
      <Providers>
        <TaskItem task={task} />
      </Providers>
    </MemoryRouter>
  );
};

afterEach(() => {
  cleanup(); // очищаем DOM после каждого теста
  vi.clearAllMocks(); // очищаем все моки после каждого теста
});

describe("тестирование отображения отдельной карточки задачи", () => {
  test("если передана задача, то должен отобразиться заголовок с текстом заголовка задачи", () => {
    const task = createMockTask("1", "Тестовая задача", "Описание тестовой задачи");

    renderTask(task);

    const title = screen.getByTestId("task-item-title");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(task.title);
  });

  test("если у задачи есть описание, то оно должно отобразиться с текстом описания задачи", () => {
    const task = createMockTask("1", "Тестовая задача", "Описание тестовой задачи");

    renderTask(task);

    const description = screen.getByTestId("task-item-description");
    expect(description).toBeInTheDocument();
    expect(description).toHaveTextContent(task.description!);
  });

  test("если у задачи нет описания, то оно не должно отображаться", () => {
    const task = createMockTask("1", "Тестовая задача");

    renderTask(task);

    const description = screen.queryByTestId("task-item-description");
    expect(description).not.toBeInTheDocument();
  });

  test("если передана задача, то должны отобразиться категории, статус и приоритет задачи", () => {
    const task = createMockTask("1", "Тестовая задача", "Описание тестовой задачи");

    renderTask(task);

    const category = screen.getByTestId("task-item-category");
    expect(category).toBeInTheDocument();
    expect(category).toHaveTextContent(task.category);

    const status = screen.getByTestId("task-item-status");
    expect(status).toBeInTheDocument();
    expect(status).toHaveTextContent(task.status);

    const priority = screen.getByTestId("task-item-priority");
    expect(priority).toBeInTheDocument();
    expect(priority).toHaveTextContent(task.priority);
  });

  test("если передана задача, то должна отобразиться дата создания задачи", () => {
    const task = createMockTask("1", "Тестовая задача", "Описание тестовой задачи");
    const formattedDate = formatToClientDate(task.createdAt);

    renderTask(task);

    const createdAt = screen.getByTestId("task-item-created-at");
    expect(createdAt).toBeInTheDocument();
    expect(createdAt).toHaveTextContent(formattedDate);
  });

  test("если передана задача, то должна отобразиться кнопка редактирования задачи с текстом 'Редактировать'", () => {
    const task = createMockTask("1", "Тестовая задача", "Описание тестовой задачи");

    renderTask(task);

    const editButton = screen.getByTestId("task-item-edit-button");
    expect(editButton).toBeInTheDocument();
    expect(editButton).toHaveTextContent("Редактировать");
  });

  test("если передана задача, то должна отобразиться кнопка удаления задачи с атрибутом aria-label", () => {
    const task = createMockTask("1", "Тестовая задача", "Описание тестовой задачи");

    renderTask(task);

    const deleteButton = screen.getByTestId("task-item-delete-button");
    expect(deleteButton).toBeInTheDocument();
    expect(deleteButton).toHaveAttribute("aria-label", "Удалить задачу");
  });
});

describe("тестирование удаления задачи", () => {
  test("если кликнуть на кнопку удаления, то должна открыться модалка с подтверждением", async () => {
    const user = userEvent.setup();
    const task = createMockTask("1", "Тестовая задача", "Описание тестовой задачи");

    renderTask(task);

    const deleteButton = screen.getByTestId("task-item-delete-button");
    await user.click(deleteButton);

    const modalTitle = screen.getByTestId("modal-delete-task-title");
    expect(modalTitle).toBeInTheDocument();
  });

  test("если кликнуть на кнопку 'Отмена' в модалке, то модалка должна закрыться без удаления", async () => {
    const user = userEvent.setup();
    const task = createMockTask("1", "Тестовая задача", "Описание тестовой задачи");
    renderTask(task);

    const deleteButton = screen.getByTestId("task-item-delete-button");
    await user.click(deleteButton);

    const modalTitle = screen.getByTestId("modal-delete-task-title");
    expect(modalTitle).toBeInTheDocument();

    const cancelButton = screen.getByTestId("modal-delete-task-cancel-button");
    await user.click(cancelButton);

    await waitFor(() => {
      expect(modalTitle).not.toBeInTheDocument();
    });

    expect(mockDeleteTask).not.toHaveBeenCalled();
  });

  test("если кликнуть на кнопку 'Удалить' в модалке, то должна вызваться функция удаления задачи с правильным id", async () => {
    const user = userEvent.setup();
    const task = createMockTask("test-task-123", "Тестовая задача", "Описание тестовой задачи");
    renderTask(task);

    // Мокаем успешное удаление
    mockDeleteTask.mockReturnValue({
      unwrap: vi.fn().mockRejectedValue(undefined),
    });

    const deleteButton = screen.getByTestId("task-item-delete-button");
    await user.click(deleteButton);

    const modalTitle = screen.getByTestId("modal-delete-task-title");
    expect(modalTitle).toBeInTheDocument();

    const confirmButton = screen.getByTestId("modal-delete-task-delete-button");
    await user.click(confirmButton);

    await waitFor(() => {
      expect(mockDeleteTask).toHaveBeenCalledWith("test-task-123");
    });
  });
});
