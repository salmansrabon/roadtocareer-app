import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { api } from "../../variables";

export const courseApi = createApi({
  reducerPath: "courseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: api,
    prepareHeaders: (headers, { getState }) => {
      const { token } = getState().userReducer;
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Course"],
  endpoints: (builder) => ({
    getCourse: builder.query({
      query: ({ id }) => ({
        url: `/v1/course?id=${id}`,
        method: "GET",
      }),
      transformResponse: (response) => response.data,
      providesTags: ["Course"],
    }),
    getCourses: builder.query({
      query: (filter) => ({
        url: "/v1/courses",
        method: "GET",
        params: {
          ...filter,
        },
      }),
      transformResponse: (response) => response.data.rows,
      providesTags: ["Course"],
    }),
    addCourse: builder.mutation({
      query: ({ course }) => ({
        url: "/v1/course",
        method: "POST",
        body: course,
      }),
      transformResponse: (response) => response.data,
      invalidatesTags: ["Course"],
    }),
    editCourse: builder.mutation({
      query: ({ id, course }) => ({
        url: `/v1/course/${id}`,
        method: "PUT",
        body: course,
      }),
      transformResponse: (response) => response.data,
      invalidatesTags: ["Course"],
    }),
    deleteCourse: builder.mutation({
      query: ({id}) => ({
        url: `/v1/course/${id}`,
        method: "DELETE",
      }),
      transformResponse: (response) => response.data,
      invalidatesTags: ["Course"],
    }),
  }),
});

export const {
  useGetCourseQuery,
  useGetCoursesQuery,
  useAddCourseMutation,
  useEditCourseMutation,
  useDeleteCourseMutation,
  util: { getRunningOperationPromises },
} = courseApi;
