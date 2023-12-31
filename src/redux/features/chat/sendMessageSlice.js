import { createSlice } from "@reduxjs/toolkit";
import {
  deleteChatsAction,
  deleteSingleChatAction,
  sendMessageAction,
} from "./sendMessageAction";

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

// const initialState1 = {
//   att: null,
//   error: null,
// };

// export const addAttachmentSlice = createSlice({
//   name: "addattachment",
//   initialState: initialState1,
//   extraReducers: (builder) => {
//     builder.addCase(addAttachmentAction.fulfilled, (state, action) => {
//       state.att = action.payload;
//     });
//     builder.addCase(addAttachmentAction.rejected, (state, action) => {
//       state.att = null;
//       state.error = action.payload;
//     });
//   },
// });

// export const addAttachmentReducer = addAttachmentSlice.reducer;

const initialState3 = {
  message: null,
  error: null,
};

export const deleteChatsSlice = createSlice({
  name: "deleteChats",
  initialState: initialState3,
  extraReducers: (builder) => {
    builder.addCase(deleteChatsAction.fulfilled, (state, action) => {
      state.message = action.payload;
    });
    builder.addCase(deleteChatsAction.rejected, (state, action) => {
      state.message = null;
      state.error = action.payload;
    });
  },
});

export const deleteChatsReducer = deleteChatsSlice.reducer;

const initialState4 = {
  message: null,
  error: null,
};

export const deleteSingleChatSlice = createSlice({
  name: "deleteSingle",
  initialState: initialState4,
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
