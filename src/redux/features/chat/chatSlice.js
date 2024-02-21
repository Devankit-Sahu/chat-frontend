import { createSlice } from "@reduxjs/toolkit";
import {
  allChatsAction,
  deleteChatsAction,
  deleteSingleChatAction,
  sendMessageAction,
} from "./chatAction";

export const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chats: [],
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(allChatsAction.fulfilled, (state, action) => {
      state.chats = action.payload;
    });
    builder.addCase(allChatsAction.rejected, (state, action) => {
      state.chats = [];
      state.error = action.payload;
    });
  },
});

export default chatSlice.reducer;

export const sendMessageSlice = createSlice({
  name: "message",
  initialState: {
    chat: null,
    error: null,
  },
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

export const deleteChatsSlice = createSlice({
  name: "deleteChats",
  initialState: {
    ischatDeleted: false,
    message: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(deleteChatsAction.fulfilled, (state, action) => {
      state.message = action.payload;
      state.ischatDeleted = true;
    });
    builder.addCase(deleteChatsAction.rejected, (state, action) => {
      state.message = null;
      state.error = action.payload;
      state.ischatDeleted = false;
    });
  },
});

export const deleteChatsReducer = deleteChatsSlice.reducer;

export const deleteSingleChatSlice = createSlice({
  name: "deleteSingle",
  initialState: {
    message: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(deleteSingleChatAction.fulfilled, (state, action) => {
      state.message = action.payload;
    });
    builder.addCase(deleteSingleChatAction.rejected, (state, action) => {
      state.message = null;
      state.error = action.payload;
    });
  },
});

export const deleteSingleChatReducer = deleteSingleChatSlice.reducer;
