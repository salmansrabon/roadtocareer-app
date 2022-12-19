import { createAsyncThunk } from "@reduxjs/toolkit";
import { publicPost, privateGet } from "../../helpers";

export const signup = createAsyncThunk("user/signup", async ({ data }) => {
  try {
    const response = await publicPost("signup", data);
    return response;
  } catch (error) {
    const message =
      error.response?.data?.error?.[0]?.message || error.response?.data?.message || error.message;
    throw new Error(message);
  }
});

export const login = createAsyncThunk("user/login", async ({ data }) => {
  try {
    const response = await publicPost("signin", data);

    return response.token;
  } catch (error) {
    const message =
      error.response?.data?.error?.[0]?.message || error.response?.data?.message || error.message;
    throw new Error(message);
  }
});

export const authenticate = createAsyncThunk("user/authenticate", async (_, { getState }) => {
  try {
    const {
      userReducer: { token },
    } = getState();

    const response = await privateGet("v1/auth", token);
    return response;
  } catch (error) {
    const message =
      error.response?.data?.error?.[0]?.message || error.response?.data?.message || error.message;
    throw new Error(message);
  }
});
