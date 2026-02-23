import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({ 
        baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api`, 
        credentials: "include" 
    }),
    tagTypes: ["Auth"],
    endpoints: (builder) => ({
        getUser: builder.query({
            query: () => `/auth/current`,
            providesTags: ["Auth"]
        }),
        createUser: builder.mutation({
            query: (user) => ({
                url: `/auth/register`,
                method: "POST",
                body: user
            })
        }),
        signinUser: builder.mutation({
            query: (credentials) => ({
                url: `/auth/signin`,
                method: "POST", 
                body: credentials
            }),
            invalidatesTags: ["Auth"]
        }),
        logoutUser: builder.mutation({
            query: () => ({
                url: `/auth/logout`,
                method: "POST"
            }),
            invalidatesTags: ["Auth"]
        })
    })
})

export const { useGetUserQuery, useCreateUserMutation, useSigninUserMutation, useLogoutUserMutation } = userApi;