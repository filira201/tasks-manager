import { afterEach, beforeEach, vi, describe, expect, test } from "vitest";

import { applyThemeClasses } from "../theme";

describe("применение классов темы (applyThemeClasses)", () => {
  let mockBody: { className: string };

  beforeEach(() => {
    mockBody = { className: "" };
    vi.stubGlobal("document", { body: mockBody });
  });

  afterEach(() => {
    vi.unstubAllGlobals(); // очищаем глобальные моки после каждого теста
  });

  test("если передан флаг darkMode=true, то должны применить классы для темной темы", () => {
    // Действие
    applyThemeClasses(true);

    // Проверка
    expect(mockBody.className).toBe("dark text-foreground bg-background");
  });

  test("если передан флаг darkMode=false, то должны применить классы для светлой темы", () => {
    // Действие
    applyThemeClasses(false);

    // Проверка
    expect(mockBody.className).toBe("light text-foreground bg-background");
  });

  test("если переключаемся с темной темы на светлую, то классы должны обновиться корректно", () => {
    // Действие - сначала применяем темную тему
    applyThemeClasses(true);

    // Проверка промежуточного состояния
    expect(mockBody.className).toContain("dark");

    // Действие - затем переключаемся на светлую
    applyThemeClasses(false);
    // Проверка
    expect(mockBody.className).toContain("light");
    expect(mockBody.className).not.toContain("dark");
  });
});
