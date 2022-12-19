import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { api } from "../../variables";

export const teachersApi = createApi({
  reducerPath: "teachersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: api,
    prepareHeaders: (headers, { getState }) => {
      const { token } = getState().userReducer;
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Teacher"],
  endpoints: (builder) => ({
    getTeacher: builder.query({
      query: ({ id }) => ({
        url: `v1/teachers?id=${id}`,
        method: "GET",
      }),
      transformResponse: (response) => response.data,
      providesTags: ["Teacher"],
    }),
    getTeachers: builder.query({
      query: (filters) => ({
        url: "v1/teachers",
        method: "GET",
        params: {
          ...filters,
        },
      }),
      transformResponse: (response) => response.data.rows,
      providesTags: ["Teacher"],
    }),
    addTeacher: builder.mutation({
      query: ({ student }) => ({
        url: "v1/teachers",
        method: "POST",
        body: student,
      }),
      transformResponse: (response) => response.data,
      invalidatesTags: ["Teacher"],
    }),
    editTeacher: builder.mutation({
      query: ({ id, student }) => ({
        url: `v1/teachers/${id}`,
        method: "PUT",
        body: student,
      }),
      transformResponse: (response) => response.data,
      invalidatesTags: ["Teacher"],
    }),
    deleteTeacher: builder.mutation({
      query: ({ id }) => ({
        url: `v1/teachers/${id}`,
        method: "DELETE",
      }),
      transformResponse: (response) => response.data,
      invalidatesTags: ["Teacher"],
    }),
  }),
});

export const {
  useGetTeacherQuery,
  useGetTeachersQuery,
  useAddTeacherMutation,
  useEditTeacherMutation,
  useDeleteTeacherMutation,
  util: {},
} = teachersApi;
