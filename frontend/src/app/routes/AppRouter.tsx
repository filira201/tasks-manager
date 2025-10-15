import { BrowserRouter, Navigate, Route, Routes } from "react-router";

import { AppLayout } from "../layout";

import { TaskPage } from "@/pages/task";
import { TaskCreatePage } from "@/pages/taskCreate";
import { TasksPage } from "@/pages/tasks";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<TasksPage />} />
          <Route path="task/:id" element={<TaskPage />} />
          <Route path="task/new" element={<TaskCreatePage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};
