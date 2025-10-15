import { configureStore } from "@reduxjs/toolkit";

import { themeMiddleware, themeSlice } from "@/features/theme";
import { api } from "@/shared/api";
import { applyThemeClasses } from "@/shared/lib/utils";

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
