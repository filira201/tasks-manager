import { configureStore } from "@reduxjs/toolkit";

import { themeMiddleware } from "./middlewares/themeMiddleware";
import themeSlice from "./reducers/themeSlice";
import { applyThemeClasses } from "./utils";

export const store = configureStore({
  reducer: {
    theme: themeSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(themeMiddleware),
});

// Применяем начальную тему при инициализации store
applyThemeClasses(store.getState().theme.darkMode);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
