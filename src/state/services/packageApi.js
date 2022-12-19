import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { api } from "../../variables";

export const packageApi = createApi({
  reducerPath: "packageApi",
  baseQuery: fetchBaseQuery({
    baseUrl: api,
    prepareHeaders: (headers, { getState }) => {
      const { token } = getState().userReducer;
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Package"],
  endpoints: (builder) => ({
    getPackage: builder.query({
      query: ({ id }) => ({
        url: `v1/packages/${id}`,
        method: "GET",
      }),
      transformResponse: (response) => response.data,
      providesTags: [`Package-id`],
    }),
    getPackages: builder.query({
      query: (filters) => ({
        url: "v1/packages",
        method: "GET",
        params: {
          ...filters,
        },
      }),
      transformResponse: (response) => response.data.rows,
      providesTags: ["Package"],
    }),
    addPackage: builder.mutation({
      query: (body) => ({
        url: "v1/packages",
        method: "POST",
        body,
      }),
      transformResponse: (response) => response.data,
      invalidatesTags: ["Package"],
    }),
    editPackage: builder.mutation({
      query: ({ id, body }) => ({
        url: `v1/packages/${id}`,
        method: "PUT",
        body,
      }),
      transformResponse: (response) => response.data,
      invalidatesTags: ["Package"],
    }),
    deletePackage: builder.mutation({
      query: ({ id }) => ({
        url: `v1/package/${id}`,
        method: "DELETE",
      }),
      transformResponse: (response) => response.data,
      invalidatesTags: ["Package"],
    }),
  }),
});

export const {
  useGetPackageQuery,
  useGetPackagesQuery,
  useAddPackageMutation,
  useEditPackageMutation,
  useDeletePackageMutation,
  util: {},
} = packageApi;
