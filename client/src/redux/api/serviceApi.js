import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const serviceApi = createApi({
  reducerPath: "serviceApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BACKEND_URL + "/api" }),
  endpoints: (builder) => ({
    getServices: builder.query({
      query: () => "/services",
    }),
    getServiceById: builder.query({
      query: (id) => `/services/${id}`,
    }),
  }),
})

export const { useGetServicesQuery, useGetServiceByIdQuery } = serviceApi