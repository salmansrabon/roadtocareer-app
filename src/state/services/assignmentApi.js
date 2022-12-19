import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { api } from "../../variables";

export const assignmentApi = createApi({
  reducerPath: "assignmentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: api,
    prepareHeaders: (headers, { getState }) => {
      const { token } = getState().userReducer;
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Assignment"],
  endpoints: (builder) => ({
    getAssignment: builder.query({
      query: ({ id }) => ({
        url: `v1/assignments/${id}`,
        method: "GET",
      }),
      transformResponse: (response) => response.data,
      providesTags: [`Assignment-id`],
    }),
    getAssignments: builder.query({
      query: (filters) => ({
        url: "v1/assignments",
        method: "GET",
        params: {
          ...filters,
        },
      }),
      transformResponse: (response) => response.data.rows,
      providesTags: ["Assignment"],
    }),
    addAssignment: builder.mutation({
      query: (body) => ({
        url: "v1/assignments",
        method: "POST",
        body,
      }),
      transformResponse: (response) => response.data,
      invalidatesTags: ["Assignment"],
    }),
    editAssignment: builder.mutation({
      query: ({ id, body }) => ({
        url: `v1/assignments/${id}`,
        method: "PUT",
        body,
      }),
      transformResponse: (response) => response.data,
      invalidatesTags: ["Assignment"],
    }),
    deleteAssignment: builder.mutation({
      query: ({ id }) => ({
        url: `v1/assignment/${id}`,
        method: "DELETE",
      }),
      transformResponse: (response) => response.data,
      invalidatesTags: ["Assignment"],
    }),
  }),
});

export const {
  useGetAssignmentQuery,
  useGetAssignmentsQuery,
  useAddAssignmentMutation,
  useEditAssignmentMutation,
  useDeleteAssignmentMutation,
  util: {},
} = assignmentApi;
