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
  test("если пользователь на главной странице, то должен быть заголовок h1 с текстом 'Задачи'", () => {
    //Подготовка
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Providers>
          <AppRouter />
        </Providers>
      </MemoryRouter>
    );

    //Проверка
    const title = screen.getByTestId("tasks-page-title");
    expect(title).toBeInTheDocument();
    expect(title.tagName).toBe("H1");
    expect(title).toHaveTextContent("Задачи");
  });
});
