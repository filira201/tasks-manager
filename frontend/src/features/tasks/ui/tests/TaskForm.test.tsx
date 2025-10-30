import { render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";

import { TaskForm } from "../TaskForm";

import type { Task } from "@/shared/lib/types";

describe.skip("форма создания/редактирования задачи", () => {
  test("если отрендерить форму, то должны отобразиться все поля", () => {
    // Подготовка
    const mockSubmit = vi.fn();

    // Действие
    render(<TaskForm onSubmit={mockSubmit} submitText="Создать" />);

    // Проверка
    expect(screen.getByLabelText(/Заголовок/)).toBeTruthy();
    expect(screen.getByLabelText(/Описание/)).toBeTruthy();
    expect(screen.getByLabelText(/Категория/)).toBeTruthy();
    expect(screen.getByLabelText(/Статус/)).toBeTruthy();
    expect(screen.getByLabelText(/Приоритет/)).toBeTruthy();
  });

  test("если передан submitText, то кнопка должна отображать этот текст", () => {
    // Подготовка
    const mockSubmit = vi.fn();

    // Действие
    render(<TaskForm onSubmit={mockSubmit} submitText="Создать задачу" />);

    // Проверка
    expect(screen.getByText("Создать задачу")).toBeTruthy();
  });

  test("если передан cancelText, то кнопка отмены должна отображать этот текст", () => {
    // Подготовка
    const mockSubmit = vi.fn();
    const mockCancel = vi.fn();

    // Действие
    render(<TaskForm onSubmit={mockSubmit} submitText="Создать" cancelText="Назад" onCancel={mockCancel} />);

    // Проверка
    expect(screen.getByText("Назад")).toBeTruthy();
  });

  test("если не передан cancelText, то должен использоваться текст по умолчанию", () => {
    // Подготовка
    const mockSubmit = vi.fn();
    const mockCancel = vi.fn();

    // Действие
    render(<TaskForm onSubmit={mockSubmit} submitText="Создать" onCancel={mockCancel} />);

    // Проверка
    expect(screen.getByText("Отмена")).toBeTruthy();
  });

  test("если кликнуть на кнопку отмены, то должен вызваться onCancel", async () => {
    // Подготовка
    const user = userEvent.setup();
    const mockSubmit = vi.fn();
    const mockCancel = vi.fn();

    // Действие
    render(<TaskForm onSubmit={mockSubmit} submitText="Создать" onCancel={mockCancel} />);

    const cancelButton = screen.getByText("Отмена");
    await user.click(cancelButton);

    // Проверка
    expect(mockCancel).toHaveBeenCalledTimes(1);
  });

  test("если переданы начальные значения, то форма должна быть заполнена", () => {
    // Подготовка
    const mockSubmit = vi.fn();
    const initialValues: Partial<Task> = {
      title: "Тестовая задача",
      description: "Описание задачи",
      category: "Bug",
      status: "In Progress",
      priority: "High",
    };

    // Действие
    render(<TaskForm onSubmit={mockSubmit} submitText="Обновить" initialValues={initialValues} />);

    // Проверка
    const titleInput = screen.getByLabelText(/Заголовок/) as HTMLInputElement;
    const descriptionInput = screen.getByLabelText(/Описание/) as HTMLTextAreaElement;

    expect(titleInput.value).toBe("Тестовая задача");
    expect(descriptionInput.value).toBe("Описание задачи");
  });

  test("если ввести текст в поле заголовка, то значение должно обновиться", async () => {
    // Подготовка
    const user = userEvent.setup();
    const mockSubmit = vi.fn();

    // Действие
    render(<TaskForm onSubmit={mockSubmit} submitText="Создать" />);

    const titleInput = screen.getByLabelText(/Заголовок/);
    await user.type(titleInput, "Новая задача");

    // Проверка
    expect(titleInput).toHaveValue("Новая задача");
  });

  test("если ввести текст в поле описания, то значение должно обновиться", async () => {
    // Подготовка
    const user = userEvent.setup();
    const mockSubmit = vi.fn();

    // Действие
    render(<TaskForm onSubmit={mockSubmit} submitText="Создать" />);

    const descriptionInput = screen.getByLabelText(/Описание/);
    await user.type(descriptionInput, "Описание новой задачи");

    // Проверка
    expect(descriptionInput).toHaveValue("Описание новой задачи");
  });

  test("если форма в состоянии загрузки, то кнопка должна показывать индикатор", () => {
    // Подготовка
    const mockSubmit = vi.fn();

    // Действие
    render(<TaskForm onSubmit={mockSubmit} submitText="Создать" isLoading={true} />);

    // Проверка
    const submitButton = screen.getByText("Создать");
    expect(submitButton.getAttribute("data-loading")).toBe("true");
  });

  test("если поле заголовка обязательное, то у него должен быть атрибут required", () => {
    // Подготовка
    const mockSubmit = vi.fn();

    // Действие
    render(<TaskForm onSubmit={mockSubmit} submitText="Создать" />);

    // Проверка
    const titleInput = screen.getByLabelText(/Заголовок/);
    expect(titleInput).toHaveAttribute("required");
  });

  test("если поле описания не обязательное, то у него не должно быть атрибута required", () => {
    // Подготовка
    const mockSubmit = vi.fn();

    // Действие
    render(<TaskForm onSubmit={mockSubmit} submitText="Создать" />);

    // Проверка
    const descriptionInput = screen.getByLabelText(/Описание/);
    expect(descriptionInput).not.toHaveAttribute("required");
  });

  test("если отправить форму с пустым заголовком, то должна показаться ошибка валидации", async () => {
    // Подготовка
    const user = userEvent.setup();
    const mockSubmit = vi.fn();

    // Действие
    render(<TaskForm onSubmit={mockSubmit} submitText="Создать" />);

    const submitButton = screen.getByText("Создать");
    await user.click(submitButton);

    // Проверка
    await waitFor(() => {
      const errorMessage = screen.queryByText(/Поле Заголовок обязательно/);
      expect(errorMessage).toBeTruthy();
    });

    expect(mockSubmit).not.toHaveBeenCalled();
  });

  test("если отправить форму без выбора категории, то должна показаться ошибка", async () => {
    // Подготовка
    const user = userEvent.setup();
    const mockSubmit = vi.fn();

    // Действие
    render(<TaskForm onSubmit={mockSubmit} submitText="Создать" />);

    const titleInput = screen.getByLabelText(/Заголовок/);
    await user.type(titleInput, "Задача с заголовком");

    const submitButton = screen.getByText("Создать");
    await user.click(submitButton);

    // Проверка
    await waitFor(() => {
      const errorMessage = screen.queryByText(/Поле Категория обязательно/);
      expect(errorMessage).toBeTruthy();
    });

    expect(mockSubmit).not.toHaveBeenCalled();
  });

  test("если отправить форму с валидными данными, то должен вызваться onSubmit", async () => {
    // Подготовка
    const user = userEvent.setup();
    const mockSubmit = vi.fn();

    const initialValues: Partial<Task> = {
      title: "Задача",
      description: "Описание",
      category: "Feature",
      status: "To Do",
      priority: "Medium",
    };

    // Действие
    render(<TaskForm onSubmit={mockSubmit} submitText="Создать" initialValues={initialValues} />);

    const submitButton = screen.getByText("Создать");
    await user.click(submitButton);

    // Проверка
    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledTimes(1);
    });
  });

  test("если при отправке формы произошла ошибка, то должно показаться сообщение об ошибке", async () => {
    // Подготовка
    const user = userEvent.setup();
    const mockSubmit = vi.fn().mockRejectedValue(new Error("Ошибка сервера"));

    const initialValues: Partial<Task> = {
      title: "Задача",
      category: "Feature",
      status: "To Do",
      priority: "Medium",
    };

    // Действие
    render(<TaskForm onSubmit={mockSubmit} submitText="Создать" initialValues={initialValues} />);

    const submitButton = screen.getByText("Создать");
    await user.click(submitButton);

    // Проверка
    await waitFor(() => {
      const errorMessage = screen.queryByText(/Что-то пошло не так, попробуйте снова/);
      expect(errorMessage).toBeTruthy();
    });
  });

  test("если изменить значение при редактировании, то новое значение должно сохраниться", async () => {
    // Подготовка
    const user = userEvent.setup();
    const mockSubmit = vi.fn();

    const initialValues: Partial<Task> = {
      title: "Старый заголовок",
      category: "Feature",
      status: "To Do",
      priority: "Low",
    };

    // Действие
    render(<TaskForm onSubmit={mockSubmit} submitText="Обновить" initialValues={initialValues} />);

    const titleInput = screen.getByLabelText(/Заголовок/);
    await user.clear(titleInput);
    await user.type(titleInput, "Новый заголовок");

    // Проверка
    expect(titleInput).toHaveValue("Новый заголовок");
  });

  test("если отправить форму без описания, то валидация должна пройти", async () => {
    // Подготовка
    const user = userEvent.setup();
    const mockSubmit = vi.fn();

    const initialValues: Partial<Task> = {
      title: "Задача без описания",
      category: "Bug",
      status: "Done",
      priority: "High",
    };

    // Действие
    render(<TaskForm onSubmit={mockSubmit} submitText="Создать" initialValues={initialValues} />);

    const submitButton = screen.getByText("Создать");
    await user.click(submitButton);

    // Проверка
    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledTimes(1);
    });
  });
});

