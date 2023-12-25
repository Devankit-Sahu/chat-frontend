import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const currentUserDetailsAction = createAsyncThunk(
  "auth/currentUserDetails",
  async (arg, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/api/v1/users/me", {
        headers: {
          "Content-Type": "application/json",
        },
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
