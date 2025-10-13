import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { TaskCreatePage, TaskPage, TasksPage } from "@/pages";
import { AppLayout } from "@/components";

export const App = () => {
  return (
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
  );
};
