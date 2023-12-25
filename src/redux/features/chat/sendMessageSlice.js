import { createSlice } from "@reduxjs/toolkit";
import { sendMessageAction } from "./sendMessageAction";

const initialState = {
  chat: null,
  error: null,
};

export const sendMessageSlice = createSlice({
  name: "message",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(sendMessageAction.fulfilled, (state, action) => {
      state.chat = action.payload;
    });
    builder.addCase(sendMessageAction.rejected, (state, action) => {
      state.chat = null;
      state.error = action.payload;
    });
  },
});

export default sendMessageSlice.reducer;
