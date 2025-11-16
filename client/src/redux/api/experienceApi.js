import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const experienceApi = createApi({
    reducerPath: "experienceApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api` }),
    endpoints: (builder) => ({
        getExperiences: builder.query({
            query: () => "/experiences",
        }),
        addExperience: builder.mutation({
            query: (newExperience) => ({
                url: "/experiences/add",
                method: "POST",
                body: newExperience,
            }),
        }),
    }),
});

export const { useGetExperiencesQuery, useAddExperienceMutation } = experienceApi;
