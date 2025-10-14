import { HeroUIProvider } from "@heroui/react";
import { Provider } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";

import { AppLayout } from "@/components";
import { TaskCreatePage, TaskPage, TasksPage } from "@/pages";
import { store } from "@/store";

export const App = () => {
  return (
    <HeroUIProvider>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AppLayout />}>
              <Route index element={<TasksPage />} />
              <Route path="task/:id" element={<TaskPage />} />
              <Route path="task/create" element={<TaskCreatePage />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </HeroUIProvider>
  );
};
