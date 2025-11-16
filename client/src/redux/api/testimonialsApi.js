import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const testimonialsApi = createApi({
    reducerPath: "testimonialsApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api` }),
    endpoints: (builder) => ({
        getTestimonials: builder.query({
            query: () => `/testimonials`
        }),
        createTestimonial: builder.mutation({
            query: (testimonial) => ({
                url: `/testimonials/add`,
                method: "POST",
                body: testimonial
            })
        })
    })
})

export const { useGetTestimonialsQuery, useCreateTestimonialMutation } = testimonialsApi;