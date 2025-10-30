import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { describe, expect, test } from "vitest";

import { TaskItem } from "../TaskItem";

import type { Task } from "@/shared/lib/types";

// Мок-данные
const mockTask: Task = {
  id: "test-task-1",
  title: "Тестовая задача",
  description: "Это описание тестовой задачи",
  category: "Feature",
  status: "To Do",
  priority: "High",
  createdAt: "2024-01-15T10:30:00.000Z",
};

describe.only("тестирование отображения отдельной карточки задачи", () => {
  test("если передана задача, то должен отобразиться заголовок", () => {
    // Действие
    const { container } = render(
      <MemoryRouter>
        <TaskItem task={mockTask} />
      </MemoryRouter>
    );
    screen.debug(container);

    // Проверка
    expect(screen.getByText("Тестовая задача")).toBeTruthy();
  });

  test("если у задачи есть описание, то оно должно отобразиться", () => {
    // Подготовка
    const task = mockTask;

    // Действие
    render(
      <MemoryRouter>
        <TaskItem task={task} />
      </MemoryRouter>
    );

    // Проверка
    expect(screen.getByText("Это описание тестовой задачи")).toBeTruthy();
  });

  test("если у задачи нет описания, то параграф описания не должен отображаться", () => {
    // Подготовка
    const taskWithoutDescription = { ...mockTask, description: undefined };

    // Действие
    const { container } = render(
      <MemoryRouter>
        <TaskItem task={taskWithoutDescription} />
      </MemoryRouter>
    );

    // Проверка - параграф с описанием не существует
    const description = container.querySelector(".text-default-500");
    expect(description).toBeNull();
  });

  test("если передана задача, то должны отобразиться категория, статус и приоритет", () => {
    // Подготовка
    const task = mockTask;

    // Действие
    render(
      <MemoryRouter>
        <TaskItem task={task} />
      </MemoryRouter>
    );

    // Проверка
    expect(screen.getByText("Feature")).toBeTruthy();
    expect(screen.getByText("To Do")).toBeTruthy();
    expect(screen.getByText("High")).toBeTruthy();
  });

  test("если передана задача, то должна отобразиться дата создания", () => {
    // Подготовка
    const task = mockTask;

    // Действие
    render(
      <MemoryRouter>
        <TaskItem task={task} />
      </MemoryRouter>
    );

    // Проверка - есть текст "Создана:"
    expect(screen.getByText(/Создана:/)).toBeTruthy();
  });

  test("если отрендерить карточку задачи, то должна быть кнопка редактирования", () => {
    // Подготовка
    const task = mockTask;

    // Действие
    render(
      <MemoryRouter>
        <TaskItem task={task} />
      </MemoryRouter>
    );

    // Проверка
    const editButton = screen.getByText("Редактировать");
    expect(editButton).toBeTruthy();
  });

  test("если отрендерить карточку задачи, то должна быть кнопка удаления", () => {
    // Подготовка
    const task = mockTask;

    // Действие
    render(
      <MemoryRouter>
        <TaskItem task={task} />
      </MemoryRouter>
    );

    // Проверка
    const deleteButton = screen.getByLabelText("Удалить задачу");
    expect(deleteButton).toBeTruthy();
  });

  test("если кликнуть на кнопку удаления, то должно открыться модальное окно", async () => {
    // Подготовка
    const user = userEvent.setup();
    const task = mockTask;

    // Действие
    render(
      <MemoryRouter>
        <TaskItem task={task} />
      </MemoryRouter>
    );

    const deleteButton = screen.getByLabelText("Удалить задачу");
    await user.click(deleteButton);

    // Проверка - модальное окно появилось
    const modal = await screen.findByRole("dialog");
    expect(modal).toBeTruthy();
  });

  test("если заголовок длинный, то должен применяться класс line-clamp-1", () => {
    // Подготовка
    const taskWithLongTitle = {
      ...mockTask,
      title: "Очень длинный заголовок задачи который должен быть обрезан",
    };

    // Действие
    const { container } = render(
      <MemoryRouter>
        <TaskItem task={taskWithLongTitle} />
      </MemoryRouter>
    );

    // Проверка
    const titleElement = container.querySelector(".line-clamp-1");
    expect(titleElement).toBeTruthy();
    expect(titleElement?.textContent).toContain("Очень длинный заголовок");
  });

  test("если описание длинное, то должен применяться класс line-clamp-2", () => {
    // Подготовка
    const taskWithLongDescription = {
      ...mockTask,
      description:
        "Очень длинное описание задачи которое должно быть обрезано до двух строк для улучшения отображения в списке задач",
    };

    // Действие
    const { container } = render(
      <MemoryRouter>
        <TaskItem task={taskWithLongDescription} />
      </MemoryRouter>
    );

    // Проверка
    const descriptionElement = container.querySelector(".line-clamp-2");
    expect(descriptionElement).toBeTruthy();
  });

  test("если отрендерить карточку, то она должна иметь минимальную высоту", () => {
    // Подготовка
    const task = mockTask;

    // Действие
    const { container } = render(
      <MemoryRouter>
        <TaskItem task={task} />
      </MemoryRouter>
    );

    // Проверка
    const card = container.querySelector(".min-h-64");
    expect(card).toBeTruthy();
  });

  test("если у задачи нет описания, то карточка всё равно должна отображаться корректно", () => {
    // Подготовка
    const taskWithoutDesc: Task = {
      id: "2",
      title: "Задача без описания",
      category: "Bug",
      status: "Done",
      priority: "Low",
      createdAt: "2024-02-20T12:00:00.000Z",
    };

    // Действие
    render(
      <MemoryRouter>
        <TaskItem task={taskWithoutDesc} />
      </MemoryRouter>
    );

    // Проверка
    expect(screen.getByText("Задача без описания")).toBeTruthy();
    expect(screen.getByText("Bug")).toBeTruthy();
    expect(screen.getByText("Done")).toBeTruthy();
    expect(screen.getByText("Low")).toBeTruthy();
  });

  test("если кнопка удаления, то она должна иметь цвет danger", () => {
    // Подготовка
    const task = mockTask;

    // Действие
    render(
      <MemoryRouter>
        <TaskItem task={task} />
      </MemoryRouter>
    );

    // Проверка
    const deleteButton = screen.getByLabelText("Удалить задачу");
    expect(deleteButton.getAttribute("data-color")).toBe("danger");
  });

  test("если кнопка редактирования, то она должна иметь цвет primary", () => {
    // Подготовка
    const task = mockTask;

    // Действие
    render(
      <MemoryRouter>
        <TaskItem task={task} />
      </MemoryRouter>
    );

    // Проверка
    const editButton = screen.getByText("Редактировать");
    expect(editButton.getAttribute("data-color")).toBe("primary");
  });
});
