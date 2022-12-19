import { createAsyncThunk } from "@reduxjs/toolkit";
import { publicGet } from "../../helpers";

// Public APIs
export const getCourse = createAsyncThunk("course/getCourse", async ({ id }) => {
  try {
    const response = await publicGet(`course?id=${id}`);
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.error?.[0]?.message || error.response?.data?.message || error.message;
    throw new Error(message);
  }
});

export const getCourses = createAsyncThunk("course/getCourses", async () => {
  try {
    const response = await publicGet("courses");
    return response.data.rows;
  } catch (error) {
    const message =
      error.response?.data?.error?.[0]?.message || error.response?.data?.message || error.message;
    throw new Error(message);
  }
});
