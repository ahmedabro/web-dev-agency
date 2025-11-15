import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const statsApi = createApi({
    reducerPath: "statsApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api` }),
    endpoints: (builder) => ({
        getStats: builder.query({
            query: () => '/stats',
        }),
    }),
});

export const { useGetStatsQuery } = statsApi;