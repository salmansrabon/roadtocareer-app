import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { api } from "../../variables";

export const modulesApi = createApi({
  reducerPath: "modulesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: api,
    prepareHeaders: (headers, { getState }) => {
      const { token } = getState().userReducer;
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Modules"],
  endpoints: (builder) => ({
    getModule: builder.query({
      query: ({ id }) => ({
        url: `v1/modules/${id}`,
        method: "GET",
      }),
      transformResponse: (response) => response.data,
      providesTags: ["Modules"],
    }),
    getModules: builder.query({
      query: (filters) => ({
        url: "v1/modules",
        method: "GET",
        params: {
          ...filters,
        },
      }),
      transformResponse: (response) => response.data.rows,
      providesTags: ["Modules"],
    }),
    addModule: builder.mutation({
      query: (body) => ({
        url: "v1/modules",
        method: "POST",
        body,
      }),
      transformResponse: (response) => response.data,
      invalidatesTags: ["Modules"],
    }),
    editModule: builder.mutation({
      query: ({ id, body }) => ({
        url: `v1/modules/${id}`,
        method: "PUT",
        body,
      }),
      transformResponse: (response) => response.data,
      invalidatesTags: ["Modules"],
    }),
    deleteModule: builder.mutation({
      query: ({ id}) => ({
        url: `v1/module/${id}`,
        method: "DELETE",
      }),
      transformResponse: (response) => response.data,
      invalidatesTags: ["Modules"],
    }),
  }),
});

export const {
  useGetModuleQuery,
  useGetModulesQuery,
  useAddModuleMutation,
  useEditModuleMutation,
  useDeleteModuleMutation,
  util: {},
} = modulesApi;
