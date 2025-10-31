import { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router";

import { AppLayout } from "../layout";

import { TaskPage } from "@/pages/task";
import { TaskCreatePage } from "@/pages/taskCreate";
import { TasksPage } from "@/pages/tasks";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  return null;
};

export const AppRouter = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<TasksPage />} />
          <Route path="task/:id" element={<TaskPage />} />
          <Route path="task/new" element={<TaskCreatePage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};
