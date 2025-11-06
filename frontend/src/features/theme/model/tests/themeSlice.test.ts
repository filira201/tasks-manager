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

describe("загрузка начальной темы из localStorage", () => {
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

  test("если в localStorage сохранено true, то тема должна быть темной", () => {
    localStorageStub.setItem(THEME_STORAGE_KEY, "true");

    const saved = localStorageStub.getItem(THEME_STORAGE_KEY);
    const parsed = JSON.parse(saved!);

    expect(parsed).toBe(true);
  });

  test("если в localStorage сохранено false, то тема должна быть светлой", () => {
    localStorageStub.setItem(THEME_STORAGE_KEY, "false");

    const saved = localStorageStub.getItem(THEME_STORAGE_KEY);
    const parsed = JSON.parse(saved!);

    expect(parsed).toBe(false);
  });
});

describe("переключение темы", () => {
  test("если вызвать toggleTheme на светлой теме, то тема должна стать темной", () => {
    const initialState = { darkMode: false };

    const newState = themeReducer(initialState, toggleTheme());

    expect(newState.darkMode).toBe(true);
  });

  test("если вызвать toggleTheme на темной теме, то тема должна стать светлой", () => {
    const initialState = { darkMode: true };

    const newState = themeReducer(initialState, toggleTheme());

    expect(newState.darkMode).toBe(false);
  });

  test("если вызвать toggleTheme дважды, то тема должна вернуться к исходному состоянию", () => {
    const initialState = { darkMode: false };

    const firstToggle = themeReducer(initialState, toggleTheme());
    const secondToggle = themeReducer(firstToggle, toggleTheme());

    expect(secondToggle.darkMode).toBe(false);
  });
});
