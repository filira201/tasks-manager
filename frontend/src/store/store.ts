import { configureStore } from "@reduxjs/toolkit";

import { themeMiddleware } from "./middlewares/themeMiddleware";
import themeSlice from "./reducers/themeSlice";
import { applyThemeClasses } from "./utils";

import { api } from "@/api";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    theme: themeSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware, themeMiddleware),
});

// Применяем начальную тему при инициализации store
applyThemeClasses(store.getState().theme.darkMode);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
