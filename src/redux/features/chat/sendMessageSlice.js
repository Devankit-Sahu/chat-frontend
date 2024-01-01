import { createSlice } from "@reduxjs/toolkit";
import { addAttachmentAction, sendMessageAction } from "./sendMessageAction";

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

export const sendMessageReducer = sendMessageSlice.reducer;

const initialState1 = {
  message: null,
  error: null,
};

export const addAttachmentSlice = createSlice({
  name: "addattachment",
  initialState: initialState1,
  extraReducers: (builder) => {
    builder.addCase(addAttachmentAction.fulfilled, (state, action) => {
      state.message = action.payload;
    });
    builder.addCase(addAttachmentAction.rejected, (state, action) => {
      state.message = null;
      state.error = action.payload;
    });
  },
});

export const addAttachmentReducer = addAttachmentSlice.reducer;
