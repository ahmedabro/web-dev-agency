import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const blogsApi = createApi({
    reducerPath: 'blogsApi',
    tagTypes: ['Blogs'],

    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api`
    }),

    endpoints: (builder) => ({
        getBlogs: builder.query({
            query: () => '/blogs',
            providesTags: ['Blogs']
        }),

        getBlogById: builder.query({
            query: (id) => `/blogs/${id}`
        }),

        createBlog: builder.mutation({
            // newBlog is a multipart/form data with text and images
            query: (newBlog) => ({
                url: '/blogs/add',
                method: 'POST',
                body: newBlog
            }),
            invalidatesTags: ['Blogs']
        })
    })
});

export const {
    useGetBlogsQuery,
    useGetBlogByIdQuery,
    useCreateBlogMutation
} = blogsApi;