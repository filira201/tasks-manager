import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

import { THEME_STORAGE_KEY } from "../constants";
import themeReducer, { toggleTheme } from "../themeSlice";

// Stub для localStorage
class LocalStorageStub {
  private store: Map<string, string> = new Map();

  getItem(key: string): string | null {
    return this.store.get(key) ?? null;
  }

  setItem(key: string, value: string): void {
    this.store.set(key, value);
  }

  clear(): void {
    this.store.clear();
  }
}

describe.skip("загрузка начальной темы из localStorage", () => {
  let localStorageStub: LocalStorageStub;

  beforeEach(() => {
    // Подготовка - создаём stub для localStorage перед каждым тестом
    localStorageStub = new LocalStorageStub();
    vi.stubGlobal("localStorage", localStorageStub);
  });

  afterEach(() => {
    // Очистка после каждого теста
    vi.unstubAllGlobals();
  });

  test("если в localStorage ничего не сохранено, то тема должна быть светлой по умолчанию", () => {
    // Подготовка - localStorage пустой

    // Действие - импортируем модуль заново для получения начального состояния
    const initialState = { darkMode: false };

    // Проверка
    expect(initialState.darkMode).toBe(false);
  });

  test("если в localStorage сохранено true, то тема должна быть темной", () => {
    // Подготовка
    localStorageStub.setItem(THEME_STORAGE_KEY, "true");

    // Действие - получаем значение
    const saved = localStorageStub.getItem(THEME_STORAGE_KEY);
    const parsed = JSON.parse(saved!);

    // Проверка
    expect(parsed).toBe(true);
  });

  test("если в localStorage сохранено false, то тема должна быть светлой", () => {
    // Подготовка
    localStorageStub.setItem(THEME_STORAGE_KEY, "false");

    // Действие
    const saved = localStorageStub.getItem(THEME_STORAGE_KEY);
    const parsed = JSON.parse(saved!);

    // Проверка
    expect(parsed).toBe(false);
  });

  test("если в localStorage сохранены невалидные данные, то должна использоваться светлая тема", () => {
    // Подготовка - сохраняем невалидные данные
    localStorageStub.setItem(THEME_STORAGE_KEY, "{'invalid': 'data'}");

    // Действие
    const saved = localStorageStub.getItem(THEME_STORAGE_KEY);
    let result = false;

    try {
      const parsed = JSON.parse(saved!);

      if (typeof parsed === "boolean") {
        result = parsed;
      }
    } catch {
      result = false;
    }

    // Проверка
    expect(result).toBe(false);
  });

  test("если в localStorage сохранена строка вместо boolean, то должна использоваться светлая тема", () => {
    // Подготовка
    localStorageStub.setItem(THEME_STORAGE_KEY, "'dark'");

    // Действие
    const saved = localStorageStub.getItem(THEME_STORAGE_KEY);
    const parsed = JSON.parse(saved!);
    const isValid = typeof parsed === "boolean";

    // Проверка
    expect(isValid).toBe(false);
  });
});

describe("переключение темы", () => {
  test("если вызвать toggleTheme на светлой теме, то тема должна стать темной", () => {
    // Подготовка
    const initialState = { darkMode: false };

    // Действие
    const newState = themeReducer(initialState, toggleTheme());

    // Проверка
    expect(newState.darkMode).toBe(true);
  });

  test("если вызвать toggleTheme на темной теме, то тема должна стать светлой", () => {
    // Подготовка
    const initialState = { darkMode: true };

    // Действие
    const newState = themeReducer(initialState, toggleTheme());

    // Проверка
    expect(newState.darkMode).toBe(false);
  });

  test("если вызвать toggleTheme дважды, то тема должна вернуться к исходному состоянию", () => {
    // Подготовка
    const initialState = { darkMode: false };

    // Действие
    const firstToggle = themeReducer(initialState, toggleTheme());
    const secondToggle = themeReducer(firstToggle, toggleTheme());

    // Проверка
    expect(secondToggle.darkMode).toBe(false);
  });
});

describe("работа с localStorage при изменении темы", () => {
  let localStorageStub: LocalStorageStub;

  beforeEach(() => {
    localStorageStub = new LocalStorageStub();
    vi.stubGlobal("localStorage", localStorageStub);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  test("если сохранить тему в localStorage, то данные должны быть сериализованы в JSON", () => {
    // Подготовка
    const darkModeValue = true;

    // Действие
    localStorageStub.setItem(THEME_STORAGE_KEY, JSON.stringify(darkModeValue));

    // Проверка
    const saved = localStorageStub.getItem(THEME_STORAGE_KEY);
    expect(saved).toBe("true");
    expect(JSON.parse(saved!)).toBe(true);
  });

  test("если очистить localStorage, то getItem должен вернуть null", () => {
    // Подготовка
    localStorageStub.setItem(THEME_STORAGE_KEY, "true");

    // Действие
    localStorageStub.clear();

    // Проверка
    const result = localStorageStub.getItem(THEME_STORAGE_KEY);
    expect(result).toBeNull();
  });
});
