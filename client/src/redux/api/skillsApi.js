import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const skillsApi = createApi({
    reducerPath: "skillsApi",
    baseQuery: fetchBaseQuery({baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api`}),
    endpoints: (builder) => ({
        getSkills: builder.query({
            query: () => '/technologies'
        })
    })
})

export const { useGetSkillsQuery } = skillsApi;