import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../config/axios-config";

export const newGroupChatAction = createAsyncThunk(
  "chat/newGroupChat",
  async ({ name, members, profile="" }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        "/api/v1/chat/new-group",
        { name, members, profile },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return data.message;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const sendMessageAction = createAsyncThunk(
  "chat/sendMessage",
  async ({ chatId, files }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        "/api/v1/chat/message",
        { chatId, files },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return data.message;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getChatsAction = createAsyncThunk(
  "chat/getChats",
  async (arg, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/api/v1/chat/allchats");
      return data.chats;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const addMembersToGroupChatAction = createAsyncThunk(
  "chat/addMembersToGroup",
  async ({ chatId, members }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        "/api/v1/chat/add-members",
        {
          chatId,
          members,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return data.message;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const removeMembersFromGroupChatAction = createAsyncThunk(
  "chat/removeMembersFromGroup",
  async ({ chatId, userId }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        "/api/v1/chat/remove-member",
        {
          chatId,
          userId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return data.message;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const leaveGroupChatAction = createAsyncThunk(
  "chat/leaveGroup",
  async ({ chatId }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        "/api/v1/chat/leave-group",
        {
          chatId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return data.message;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const searchChatAction = createAsyncThunk(
  "chat/searchChat",
  async ({ name }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        "/api/v1/chat/search",
        {
          name,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return data.searchedChat;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getAllMessagesAction = createAsyncThunk(
  "chat/getAllMessages",
  async ({ chatId }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/v1/chat/${chatId}`);
      return data.messages;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const deleteAllMessagesAction = createAsyncThunk(
  "chat/deleteAllMessages",
  async ({ chatId }, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`/api/v1/chat/${chatId}`);
      return data.message;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
