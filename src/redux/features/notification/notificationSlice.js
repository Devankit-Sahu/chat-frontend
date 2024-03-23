import { createSlice } from "@reduxjs/toolkit";

// notification slice
export const notificationSlice = createSlice({
  name: "alluser",
  initialState: {
    notification: localStorage.getItem("notifications")
      ? JSON.parse(localStorage.getItem("notifications"))
      : [],
  },
  reducers: {
    notificationRecieved: (state, action) => {
      const notfi = action.payload;
      state.notification.push(notfi);
      localStorage.setItem("notifications", JSON.stringify(state.notification));
    },
  },
});

export const notificationReducer = notificationSlice.reducer;
