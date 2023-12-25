import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const allUsersAction = createAsyncThunk(
  "user/allUsers",
  async (arg, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/api/v1/users/all", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return data.users;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

