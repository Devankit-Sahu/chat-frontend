import { createSlice } from "@reduxjs/toolkit";
import { allChatsAction } from "./chatAction";

const initialState = {
  chats: [],
  error: null,
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
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
