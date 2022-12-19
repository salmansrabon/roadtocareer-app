import { createSlice } from "@reduxjs/toolkit";
import { signup, login, authenticate } from "./action";

const initialState = {
  isFetching: false,
  isSuccess: false,
  isError: false,
  isAuthenticated: false,
  token: null,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => ({
      ...state,
      ...initialState,
    }),
  },
  extraReducers: {
    [signup.pending]: (state) => ({
      ...state,
      isFetching: true,
      isSuccess: false,
      isError: false,
    }),
    [signup.fulfilled]: (state, action) => ({
      ...state,
      isFetching: false,
      isSuccess: true,
      isError: false,
    }),
    [signup.rejected]: (state, action) => ({
      ...state,
      isFetching: false,
      isSuccess: false,
      isError: true,
      error: action.error.message,
    }),

    [login.pending]: (state) => ({
      ...state,
      isFetching: true,
      isSuccess: false,
      isError: false,
    }),
    [login.fulfilled]: (state, action) => ({
      ...state,
      isFetching: false,
      isSuccess: true,
      isError: false,
      isAuthenticated: true,
      token: action.payload,
    }),
    [login.rejected]: (state, action) => ({
      ...state,
      isFetching: false,
      isSuccess: false,
      isError: true,
      error: action.error.message,
    }),

    [authenticate.pending]: (state) => ({
      ...state,
      isFetching: true,
      isSuccess: false,
      isError: false,
    }),
    [authenticate.fulfilled]: (state) => ({
      ...state,
      isFetching: false,
      isSuccess: true,
      isError: false,
      isAuthenticated: true,
      // token: state,
      // isAuthenticated: state,
    }),
    [authenticate.rejected]: (state, action) => ({
      ...state,
      isFetching: false,
      isSuccess: false,
      isError: true,
      error: action.error.message,
    }),
  },
});

export const { logout } = userSlice.actions;
export default userSlice;
