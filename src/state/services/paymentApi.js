import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { api } from "../../variables";

export const paymentApi = createApi({
  reducerPath: "paymentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: api,
    prepareHeaders: (headers, { getState }) => {
      const { token } = getState().userReducer;
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Payment"],
  endpoints: (builder) => ({
    getPayments: builder.query({
      query: ({ studentId, courseId }) => ({
        url: `v1/payments/${studentId}/${courseId}`,
        method: "GET",
      }),
      transformResponse: (response) => response.data.rows,
      providesTags: ["Payment"],
    }),
    getPayment: builder.query({
      query: ({ studentId }) => ({
        url: `v1/payments/${studentId}`,
        method: "GET",
      }),
      transformResponse: (response) => response.data.rows,
      providesTags: ["Payment"],
    }),
    getAllPayments: builder.query({
      query: (filters = {}) => ({
        url: `v1/payments`,
        method: "GET",
        params: filters,
      }),
      transformResponse: (response) => response.data.rows,
    }),
    addPayment: builder.mutation({
      query: ({ id, courseId, installmentNo, installmentAmount, discount, due, paidAmount, comment }) => ({
        url: `v1/payment/${id}`,
        method: "POST",
        body: {
          courseId,
          installmentNo,
          installmentAmount,
          discount,
          due,
          paidAmount, 
          comment,
        },
      }),
      transformResponse: (response) => response.data,
      invalidatesTags: ["Payment"],
    }),
    editPayment: builder.mutation({
      query: ({ id, student }) => ({
        url: `v1/payment/${id}`,
        method: "PUT",
        body: student,
      }),
      transformResponse: (response) => response.data,
      invalidatesTags: ["Payment"],
    }),
    deletePayment: builder.mutation({
      query: ({ id }) => ({
        url: `v1/payment/${id}`,
        method: "DELETE",
      }),
      transformResponse: (response) => response.data,
      invalidatesTags: ["Payment"],
    }),
  }),
});

export const {
  useGetPaymentsQuery,
  useGetPaymentQuery,
  useGetAllPaymentsQuery,
  useAddPaymentMutation,
  useEditPaymentMutation,
  useDeletePaymentMutation,
  util: { getRunningOperationPromises },
} = paymentApi;
