import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";

const API_HOST = import.meta.env.VITE_API_HOST || "http://localhost:3000";

const baseQuery = fetchBaseQuery({
  baseUrl: API_HOST,
});

// Делаем 2 попытки запроса, если первая не удалась, дальше нет смысла пытаться
const baseQueryWithRetry = retry(baseQuery, { maxRetries: 2 });

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithRetry,
  tagTypes: ["Tasks", "Task"],
  endpoints: () => ({}),
});
