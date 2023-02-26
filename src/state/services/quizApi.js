import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { api } from "../../variables";

export const quizApi = createApi({
  reducerPath: "quizApi",
  baseQuery: fetchBaseQuery({
    baseUrl: api,
    prepareHeaders: (headers, { getState }) => {
      const { token } = getState().userReducer;
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Quiz"],
  endpoints: (builder) => ({
    getQuiz: builder.query({
      query: ({ id }) => ({
        url: `v1/quizes/${id}`,
        method: "GET",
      }),
      transformResponse: (response) => response.data,
      providesTags: [`Quiz-id`],
    }),
    getAnswers: builder.query({
      query: ({ id, studentId }) => ({
        url: `v1/quizes/getSecretAnswers365/${id}/?studentId=${studentId}`,
        method: "GET",
      }),
      transformResponse: (response) => response.data,
      providesTags: [`Quiz-id`],
    }),
    getQuestions: builder.query({
      query: ({ id }) => ({
        url: `v1/quizes/getQuestions/${id}`,
        method: "GET",
      }),
      transformResponse: (response) => response.data,
      providesTags: [`Quiz-id`],
    }),
    getMarks: builder.query({
      query: ({ id }) => ({
        url: `v1/quizes/getMarks/${id}`,
        method: "GET",
      }),
      transformResponse: (response) => response.data,
      providesTags: [`Quiz-id`],
    }),
    getRandomQuiz: builder.query({
      query: ({ id, studentId }) => ({
        url: `v1/quizes/getRandomQuestions/${id}`,
        method: "GET",
        params: {
          studentId,
        },
      }),
      transformResponse: (response) => response.data,
      providesTags: [`Quiz-id`],
    }),
    getQuizzes: builder.query({
      query: (filters) => ({
        url: "v1/quizes",
        method: "GET",
        params: {
          ...filters,
        },
      }),
      transformResponse: (response) => response.data.rows,
      providesTags: ["Quiz"],
    }),
    addQuiz: builder.mutation({
      query: (body) => ({
        url: "v1/quizes",
        method: "POST",
        body,
      }),
      transformResponse: (response) => response.data,
      invalidatesTags: ["Quiz"],
    }),
    editQuiz: builder.mutation({
      query: ({ id, body }) => ({
        url: `v1/quizes/${id}`,
        method: "PUT",
        body,
      }),
      transformResponse: (response) => response.data,
      invalidatesTags: ["Quiz"],
    }),
    deleteQuiz: builder.mutation({
      query: ({ id }) => ({
        url: `v1/quizes/${id}`,
        method: "DELETE",
      }),
      transformResponse: (response) => response.data,
      invalidatesTags: ["Quiz"],
    }),
  }),
});

export const {
  useGetQuizQuery,
  useGetQuizzesQuery,
  useAddQuizMutation,
  useEditQuizMutation,
  useDeleteQuizMutation,
  useGetRandomQuizQuery,
  useGetAnswersQuery,
  useGetQuestionsQuery,
  useGetMarksQuery,
  util: {},
} = quizApi;
