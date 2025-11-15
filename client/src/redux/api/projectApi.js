import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const projectApi = createApi({
    reducerPath: "projectApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api` }),
    endpoints: (builder) => ({
        getProjects: builder.query({
            query: () => "/projects",
        }),
        getProjectById: builder.query({
            query: (id) => `/projects/${id}`,
        }),
    }),
});

export const { useGetProjectsQuery, useGetProjectByIdQuery } = projectApi;