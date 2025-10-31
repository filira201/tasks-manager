import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { beforeEach, describe, expect, test, vi } from "vitest";

import { AppRouter } from "../AppRouter";

import { Providers } from "@/app/providers";

beforeEach(() => {
  // Мокаем window.scrollTo, так как jsdom не реализует этот метод
  // Пока что это просто мок
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

    const titles = await screen.findAllByText("Задачи");
    expect(titles.length).toBeGreaterThan(0);
  });
});
