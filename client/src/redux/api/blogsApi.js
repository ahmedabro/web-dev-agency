import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const blogsApi = createApi({
    reducerPath: 'blogsApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api` }),
    endpoints: (builder) => ({
        getBlogs: builder.query({
            query: () => '/blogs'
        }),
        getBlogById: builder.query({
            query: (id) => `/blogs/${id}`
        }),
        createBlog: builder.mutation({
            query: (newBlog) => ({
                url: '/blogs/add',
                method: 'POST',
                body: newBlog
            })
        })
    })
})

export const { useGetBlogsQuery, useGetBlogByIdQuery, useCreateBlogMutation } = blogsApi;