import { configureStore } from "@reduxjs/toolkit";

import { themeMiddleware } from "./middlewares/themeMiddleware";
import themeSlice from "./reducers/themeSlice";

export const store = configureStore({
  reducer: {
    theme: themeSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(themeMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
