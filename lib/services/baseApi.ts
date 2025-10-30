import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Frontend-only separation: no implicit auth cookies/tokens are read here.
// Consumers should inject any headers explicitly per-request if needed.
const API_BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL || "").replace(/\/$/, "");

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL || "https://jsonplaceholder.typicode.com",
    prepareHeaders: (headers) => {
      headers.set("Accept", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getPosts: builder.query<any[], void>({
      query: () => "/posts",
    }),
  }),
});

export const { useGetPostsQuery } = baseApi;
