import { createSlice } from "@reduxjs/toolkit";
import { NEW_MESSAGE_NOTIFICATION } from "../../../constants/constants";

// notification slice
export const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    newMessageNotification: localStorage.getItem(NEW_MESSAGE_NOTIFICATION)
      ? JSON.parse(localStorage.getItem(NEW_MESSAGE_NOTIFICATION))
      : [],
    notificationCount: localStorage.getItem("notificationCount")
      ? JSON.parse(localStorage.getItem("notificationCount"))
      : 0,
  },
  reducers: {
    incrementNotification: (state, action) => {
      state.notificationCount += action.payload;
      localStorage.setItem("notificationCount", state.notificationCount);
    },
    decrementNotification: (state) => {
      if (state.notificationCount > 0) {
        state.notificationCount -= 1;
        localStorage.setItem("notificationCount", state.notificationCount);
      }
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
      localStorage.setItem(
        NEW_MESSAGE_NOTIFICATION,
        JSON.stringify(state.newMessageNotification)
      );
    },
    removeNewMessageNotification: (state, action) => {
      state.newMessageNotification = state.newMessageNotification.filter(
        (item) => item.chatId !== action.payload
      );
      localStorage.setItem(
        NEW_MESSAGE_NOTIFICATION,
        JSON.stringify(state.newMessageNotification)
      );
    },
  },
});

export default notificationSlice;
export const {
  incrementNotification,
  decrementNotification,
  setNewMessageNotification,
  removeNewMessageNotification,
} = notificationSlice.actions;
