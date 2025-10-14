import { createSlice } from "@reduxjs/toolkit";

import { applyThemeClasses } from "../utils";

import { LOCAL_STORAGE_KEY } from "@/lib";

type ThemeState = {
  darkMode: boolean;
};

const getInitialTheme = (): boolean => {
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    const darkMode = saved ? JSON.parse(saved) : false;

    // Применяем классы при инициализации
    applyThemeClasses(darkMode);

    return darkMode;
  } catch (error) {
    console.warn("Error with getInitialTheme " + error);
    applyThemeClasses(false); // Применяем светлую тему по умолчанию

    return false;
  }
};

const initialState: ThemeState = {
  darkMode: getInitialTheme(),
};

const themeSlice = createSlice({
  name: "theme",
  initialState,

  reducers: {
    toggleTheme: (state) => {
      state.darkMode = !state.darkMode;
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
