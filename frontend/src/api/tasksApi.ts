import { api } from "@/api";
import type { Task, TaskData } from "@/lib";

export const tasksApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllTasks: builder.query<TaskData, { page: number; perPage: number }>({
      query: ({ page, perPage }) => ({
        url: "tasks",
        method: "GET",
        params: {
          _page: page,
          _per_page: perPage,
        },
      }),
      providesTags: (result) =>
        result
          ? [...result.data.map(({ id }) => ({ type: "Task" as const, id })), { type: "Tasks", id: "LIST" }]
          : [{ type: "Tasks", id: "LIST" }],
    }),

    getTaskById: builder.query<Task, string>({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: "GET",
      }),
      providesTags: (_, __, id) => [{ type: "Task", id }],
    }),

    updateTask: builder.mutation<Task, { taskData: Task; id: string }>({
      query: ({ taskData, id }) => ({
        url: `/tasks/${id}`,
        method: "PATCH",
        body: taskData,
      }),
      invalidatesTags: (_, __, { id }) => [
        { type: "Task", id },
        { type: "Tasks", id: "LIST" },
      ],
    }),

    createTask: builder.mutation<Task, Task>({
      query: (task) => ({
        url: "/tasks",
        method: "POST",
        body: task,
      }),
      invalidatesTags: [{ type: "Tasks", id: "LIST" }],
    }),

    deleteTask: builder.mutation<void, string>({
      query: (taskId) => ({
        url: `/tasks/${taskId}`,
        method: "DELETE",
      }),
      invalidatesTags: (_, __, id) => [
        { type: "Task", id },
        { type: "Tasks", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetAllTasksQuery,
  useGetTaskByIdQuery,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
  useCreateTaskMutation,
} = tasksApi;
