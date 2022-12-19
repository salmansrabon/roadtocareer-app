import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { api } from "../../variables";

export const studentApi = createApi({
  reducerPath: "studentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: api,
    prepareHeaders: (headers, { getState }) => {
      const { token } = getState().userReducer;
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Student"],
  endpoints: (builder) => ({
    getStudent: builder.query({
      query: ({ id }) => ({
        url: `v1/student?id=${id}`,
        method: "GET",
      }),
      transformResponse: (response) => response.data,
      providesTags: ["Student"],
    }),
    getStudents: builder.query({
      query: (filters) => ({
        url: "v1/students",
        method: "GET",
        params: {
          ...filters,
        },
      }),
      transformResponse: (response) => response.data.rows,
      providesTags: ["Student"],
    }),
    addStudent: builder.mutation({
      query: ({ student }) => ({
        url: "v1/student",
        method: "POST",
        body: student,
      }),
      transformResponse: (response) => response.data,
      invalidatesTags: ["Student"],
    }),
    editStudent: builder.mutation({
      query: ({ id, student }) => ({
        url: `v1/student/${id}`,
        method: "PUT",
        body: student,
      }),
      transformResponse: (response) => response.data,
      invalidatesTags: ["Student"],
    }),
    deleteStudent: builder.mutation({
      query: ({ id }) => ({
        url: `v1/student/${id}`,
        method: "DELETE",
      }),
      transformResponse: (response) => response.data,
      invalidatesTags: ["Student"],
    }),
  }),
});

export const {
  useGetStudentQuery,
  useGetStudentsQuery,
  useAddStudentMutation,
  useEditStudentMutation,
  useDeleteStudentMutation,
  util: {},
} = studentApi;
