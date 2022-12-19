import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDashboardOpen: true,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    toggleDashboard: (state) => ({
      isDashboardOpen: !state.isDashboardOpen,
    }),
  },
});

export const { toggleDashboard } = dashboardSlice.actions;
export default dashboardSlice;
