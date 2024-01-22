import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../config/axios-config";

export const allChatsAction = createAsyncThunk(
  "chat/allChats",
  async ({ sender_id, reciever_id }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `/api/v1/chats/chats/sender=${sender_id}/reciever=${reciever_id}`,
        { sender_id, reciever_id },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
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
