import { type Middleware } from "@reduxjs/toolkit";

import { THEME_STORAGE_KEY } from "../constants";
import { toggleTheme } from "../reducers/themeSlice";
import { applyThemeClasses } from "../utils";

export const themeMiddleware: Middleware = (store) => (next) => (action) => {
  const result = next(action);

  // Сохраняем в localStorage и применяем классы только при изменении темы
  if (toggleTheme.match(action)) {
    const state = store.getState();

    try {
      localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(state.theme.darkMode));
      // Применяем классы к body после изменения темы
      applyThemeClasses(state.theme.darkMode);
    } catch (error) {
      console.warn("Failed to save theme to localStorage:", error);
    }
  }

  return result;
};
