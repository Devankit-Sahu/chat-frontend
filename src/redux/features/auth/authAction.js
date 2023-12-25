import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loginAction = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        "/api/v1/users/login",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return data.success;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const registerAction = createAsyncThunk(
  "auth/registerUser",
  async ({ username, email, password }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        "/api/v1/users/register",
        { username, email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return data.success;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const logoutAction = createAsyncThunk("auth/logoutUser", async (arg) => {
  await axios.get("/api/v1/users/logout");
  return;
});

