import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL || "").replace(/\/$/, "");

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL || "https://jsonplaceholder.typicode.com",
    prepareHeaders: (headers) => {
      // Optional: send bearer token from non-httpOnly cookie for client-side calls
      // For production, prefer using server-side route handlers that attach the token securely.
      if (typeof document !== "undefined") {
        const match = document.cookie.match(/(?:^|; )auth_token=([^;]*)/);
        const token = match ? decodeURIComponent(match[1]) : "";
        if (token) headers.set("Authorization", token);
      }
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
