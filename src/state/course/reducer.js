import { createSlice } from "@reduxjs/toolkit";
import { getCourse, getCourses } from "./action";

const initialState = {
  isFetching: false,
  isSuccess: false,
  isError: false,
  course: {},
  courseList: [],
  error: null,
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  extraReducers: {
    [getCourse.pending]: (state) => ({
      ...state,
      isFetching: true,
      isSuccess: false,
      isError: false,
    }),
    [getCourse.fulfilled]: (state, action) => ({
      ...state,
      isFetching: false,
      isSuccess: true,
      isError: false,
      course: action.payload,
    }),
    [getCourse.rejected]: (state, action) => ({
      ...state,
      isFetching: false,
      isSuccess: false,
      isError: true,
      error: action.error.message,
    }),

    [getCourses.pending]: (state) => ({
      ...state,
      isFetching: true,
      isSuccess: false,
      isError: false,
    }),
    [getCourses.fulfilled]: (state, action) => ({
      ...state,
      isFetching: false,
      isSuccess: true,
      isError: false,
      courseList: action.payload,
    }),
    [getCourses.rejected]: (state, action) => ({
      ...state,
      isFetching: false,
      isSuccess: false,
      isError: true,
      error: action.error.message,
    }),
  },
});

export default courseSlice;
