import { createSlice } from "@reduxjs/toolkit";

import { THEME_STORAGE_KEY } from "../constants";

type ThemeState = {
  darkMode: boolean;
};

const getInitialTheme = (): boolean => {
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);

    if (saved === null) {
      return false;
    }

    const parsed = JSON.parse(saved);

    if (typeof parsed !== "boolean") {
      console.warn("Invalid theme value in localStorage, expected boolean");

      return false;
    }

    return parsed;
  } catch (error) {
    console.warn("Error reading theme from localStorage:", error);

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
