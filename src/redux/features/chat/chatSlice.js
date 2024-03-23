import { createSlice } from "@reduxjs/toolkit";
import {
  addMembersToGroupChatAction,
  deleteAllMessagesAction,
  getAllMessagesAction,
  getChatsAction,
  leaveGroupChatAction,
  newGroupChatAction,
  removeMembersFromGroupChatAction,
  searchChatAction,
  sendMessageAction,
} from "./chatAction";

export const newGroupSlice = createSlice({
  name: "newgroup",
  initialState: {
    isLoading: false,
    message: null,
    isError: null,
  },
  extraReducers: (builder) => {
    builder.addCase(newGroupChatAction.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(newGroupChatAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
    });
    builder.addCase(newGroupChatAction.rejected, (state, action) => {
      state.isLoading = false;
      state.message = null;
      state.isError = action.payload;
    });
  },
});
export const newGroupReducer = newGroupSlice.reducer;

export const sendMessageSlice = createSlice({
  name: "message",
  initialState: {
    message: null,
    isError: null,
  },
  extraReducers: (builder) => {
    builder.addCase(sendMessageAction.fulfilled, (state, action) => {
      state.message = action.payload;
    });
    builder.addCase(sendMessageAction.rejected, (state, action) => {
      state.message = null;
      state.isError = action.payload;
    });
  },
});
export const sendMessageReducer = sendMessageSlice.reducer;

export const getChatsSlice = createSlice({
  name: "getChats",
  initialState: {
    isLoading: false,
    chats: [],
    isError: null,
  },
  extraReducers: (builder) => {
    builder.addCase(getChatsAction.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getChatsAction.fulfilled, (state, action) => {
      state.chats = action.payload;
      state.isLoading = false;
      state.isError = null;
    });
    builder.addCase(getChatsAction.rejected, (state, action) => {
      state.chats = [];
      state.isError = action.payload;
      state.isLoading = false;
    });
  },
});
export const getChatsReducer = getChatsSlice.reducer;

export const addMembersToGroupChatSlice = createSlice({
  name: "addMembersToGroup",
  initialState: {
    message: null,
    isError: null,
  },
  extraReducers: (builder) => {
    builder.addCase(addMembersToGroupChatAction.fulfilled, (state, action) => {
      state.message = action.payload;
    });
    builder.addCase(addMembersToGroupChatAction.rejected, (state, action) => {
      state.message = null;
      state.isError = action.payload;
    });
  },
});
export const addMembersToGroupChatReducer = addMembersToGroupChatSlice.reducer;

export const removeMembersFromGroupChatSlice = createSlice({
  name: "removeMembersFromGroup",
  initialState: {
    message: null,
    isError: null,
  },
  extraReducers: (builder) => {
    builder.addCase(
      removeMembersFromGroupChatAction.fulfilled,
      (state, action) => {
        state.message = action.payload;
      }
    );
    builder.addCase(
      removeMembersFromGroupChatAction.rejected,
      (state, action) => {
        state.message = null;
        state.isError = action.payload;
      }
    );
  },
});
export const removeMembersFromGroupChatReducer =
  removeMembersFromGroupChatSlice.reducer;

export const leaveGroupChatSlice = createSlice({
  name: "leaveGroup",
  initialState: {
    message: null,
    isError: null,
  },
  extraReducers: (builder) => {
    builder.addCase(leaveGroupChatAction.fulfilled, (state, action) => {
      state.message = action.payload;
    });
    builder.addCase(leaveGroupChatAction.rejected, (state, action) => {
      state.message = null;
      state.isError = action.payload;
    });
  },
});
export const leaveGroupChatReducer = leaveGroupChatSlice.reducer;

export const searchChatSlice = createSlice({
  name: "searchChat",
  initialState: {
    chat: null,
    isError: null,
  },
  extraReducers: (builder) => {
    builder.addCase(searchChatAction.fulfilled, (state, action) => {
      state.chat = action.payload;
    });
    builder.addCase(searchChatAction.rejected, (state, action) => {
      state.chat = null;
      state.isError = action.payload;
    });
  },
});
export const searchChatReducer = searchChatSlice.reducer;

export const getAllMessagesSlice = createSlice({
  name: "getAllMessages",
  initialState: {
    isLoading: false,
    messages: [],
    isError: null,
  },
  extraReducers: (builder) => {
    builder.addCase(getAllMessagesAction.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getAllMessagesAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.messages = action.payload;
    });
    builder.addCase(getAllMessagesAction.rejected, (state, action) => {
      state.messages = [];
      state.isError = action.payload;
    });
  },
});
export const getAllMessagesReducer = getAllMessagesSlice.reducer;

export const deleteAllMessagesSlice = createSlice({
  name: "addMembersToGroup",
  initialState: {
    message: null,
    isError: null,
  },
  extraReducers: (builder) => {
    builder.addCase(deleteAllMessagesAction.fulfilled, (state, action) => {
      state.message = action.payload;
    });
    builder.addCase(deleteAllMessagesAction.rejected, (state, action) => {
      state.message = null;
      state.isError = action.payload;
    });
  },
});
export const deleteAllMessagesReducer = deleteAllMessagesSlice.reducer;

export const incommingMessage = createSlice({
  name: "incommingmessage",
  initialState: { message: null, isMsgSeen: false },
  reducers: {
    storeMessageInLc: (state, action) => {
      state.message = action.payload;
    },
  },
});
