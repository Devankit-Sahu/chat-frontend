import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../config/axios-config";

// all my friends action
export const allMyFriendsAction = createAsyncThunk(
  "user/allMyFriends",
  async (arg, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/api/v1/user/my-friends", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      return data.myFriends;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
// current user action
export const currentUserDetailsAction = createAsyncThunk(
  "user/currentUserDetails",
  async (arg, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/api/v1/user/me", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      return data.user;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
// search users action
export const sendRequestAction = createAsyncThunk(
  "user/sendRequest",
  async ({ reciever_id }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        "/api/v1/user/send-friend-request",
        { reciever_id },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
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
// change password action
export const acceptRequestAction = createAsyncThunk(
  "user/acceptRequest",
  async ({ friendReqId }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        "/api/v1/user/accept-friend-request",
        { friendReqId },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
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
// change about action
export const searchUserAction = createAsyncThunk(
  "user/searchUser",
  async ({ username }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/api/v1/user/search/users", {
        params: { username },
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      return data.user;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
