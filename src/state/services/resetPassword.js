import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { api } from "../../variables";

export const resetPasseordApi = createApi({
  reducerPath: "resetPasseordApi",
  baseQuery: fetchBaseQuery({
    baseUrl: api,
    prepareHeaders: (headers, { getState }) => {
      const { token } = getState().userReducer;
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["resetPasseord"],
  endpoints: (builder) => ({
    sendResetLink: builder.mutation({
      query: ({ id }) => ({
        url: "sendResetLink",
        method: "PUT",
        body: { id },
      }),
      transformResponse: (response) => response.data,
    }),
    validatePCToken: builder.mutation({
      query: ({ id, token }) => ({
        url: "validatePCToken",
        method: "PUT",
        body: { id, pcToken: token },
      }),
      transformResponse: (response) => response.data,
    }),
    resetPassword: builder.mutation({
      query: ({ token, password, id }) => ({
        url: `resetPassword/${token}`,
        method: "PUT",
        body: { id, password },
      }),
      transformResponse: (response) => response.data,
    }),
    changePassword: builder.mutation({
      query: ({ password, id, curPassword }) => ({
        url: "v1/changePassword",
        method: "PUT",
        body: { id, password, curPassword },
      }),
      transformResponse: (response) => response.data,
    }),
  }),
});

export const {
  useSendResetLinkMutation,
  useValidatePCTokenMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
  util: {},
} = resetPasseordApi;
