import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../config/axios-config";

// user login action
export const loginAction = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        "/api/v1/auth/login",
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
// user register action
export const registerAction = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/api/v1/auth/register", userData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
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
// user logout action
export const logoutAction = createAsyncThunk("auth/logoutUser", async (arg) => {
  await axios.get("/api/v1/auth/logout");
  return;
});

