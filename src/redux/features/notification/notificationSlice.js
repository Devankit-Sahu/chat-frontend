import { createSlice } from "@reduxjs/toolkit";
import { NEW_MESSAGE_NOTIFICATION } from "../../../constants/constants";

// notification slice
export const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    newMessageNotification: localStorage.getItem(NEW_MESSAGE_NOTIFICATION)
      ? JSON.parse(localStorage.getItem(NEW_MESSAGE_NOTIFICATION))
      : [],
    requestNotification: 0,
  },
  reducers: {
    incrementRequestNotification: (state) => {
      state.requestNotification += 1;
    },
    resetRequestNotification: (state) => {
      state.requestNotification = 0;
    },
    setNewMessageNotification: (state, action) => {
      const { chatId } = action.payload;
      const existingIndex = state.newMessageNotification.findIndex(
        (item) => item.chatId === chatId
      );

      if (existingIndex !== -1) {
        state.newMessageNotification[existingIndex].count += 1;
      } else {
        state.newMessageNotification.push({ chatId, count: 1 });
      }
    },
    removeNewMessageNotification: (state, action) => {
      state.newMessageNotification = state.newMessageNotification.filter(
        (item) => item.chatId !== action.payload
      );
    },
  },
});

export default notificationSlice;
export const {
  incrementRequestNotification,
  resetRequestNotification,
  setNewMessageNotification,
  removeNewMessageNotification,
} = notificationSlice.actions;
