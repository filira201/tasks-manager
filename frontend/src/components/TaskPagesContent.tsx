import { useEffect } from "react";
import { useSearchParams } from "react-router";

import { useGetAllTasksQuery } from "@/api";
import { Loader, MyPagination, QueryError, TaskList } from "@/components";
import { ITEMS_PER_PAGE } from "@/lib";

export const TaskPagesContent = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page") || "1");
  const { data, isFetching, isLoading, error, refetch } = useGetAllTasksQuery({
    page: currentPage,
    perPage: ITEMS_PER_PAGE,
  });

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [currentPage]);

  if (isLoading || isFetching) {
    return <Loader />;
  }

  if (error) {
    return <QueryError error={error} onRetry={() => refetch()} />;
  }

  if (!data || !data.data || !data.data.length) {
    return <h2 className="text-xl font-medium text-center">У вас пока что нет задач</h2>;
  }

  const handlePageChange = (page: number) => {
    if (page < 1 || page > data.pages) {
      return;
    }

    searchParams.set("page", page.toString());
    setSearchParams(searchParams);
  };

  return (
    <>
      <TaskList tasks={data.data} />

      <div className="flex justify-center mt-6">
        <MyPagination currentPage={currentPage} handlePageChange={handlePageChange} total={data.pages} />
      </div>
    </>
  );
};
