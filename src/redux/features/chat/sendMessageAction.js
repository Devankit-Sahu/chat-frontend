import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const sendMessageAction = createAsyncThunk(
  "chat/sendMessage",
  async ({ message, sender_id, reciever_id }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        "/api/v1/chats/message",
        { message, sender_id, reciever_id },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return data.chat;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const addAttachmentAction = createAsyncThunk(
  "chat/addAttachment",
  async (
    { caption, sender_id, reciever_id, attachment },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.post(
        "/api/v1/chats/add/attachments",
        { caption, sender_id, reciever_id, attachment },
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
