import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../config/axios-config";

// user login action
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
// user register action
export const registerAction = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/api/v1/users/register", userData, {
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
  await axios.get("/api/v1/users/logout");
  return;
});

// current user action
export const currentUserDetailsAction = createAsyncThunk(
  "auth/currentUserDetails",
  async (arg, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/api/v1/users/me", {
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

// all users action
export const allUsersAction = createAsyncThunk(
  "auth/allUsers",
  async (arg, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/api/v1/users/all", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
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
// search users action
export const searchUserAction = createAsyncThunk(
  "auth/searchUser",
  async ({ username }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/v1/users/username/${username}`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
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
// change password action
export const changePasswordAction = createAsyncThunk(
  "auth/changePassword",
  async ({ oldPassword, newPassword }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        "/api/v1/users/change/password",
        { oldPassword, newPassword },
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
export const changeDetailsAction = createAsyncThunk(
  "auth/changeAbout",
  async ({ about, username }, { rejectWithValue }) => {
    try {
      const { data } = await axios.patch(
        "/api/v1/users/update/details",
        { about, username },
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
// change avatar action
export const changeAvatarAction = createAsyncThunk(
  "auth/changeAvatar",
  async ({ avatar }, { rejectWithValue }) => {
    try {
      const { data } = await axios.patch(
        "/api/v1/users/update/avatar",
        { avatar },
        {
          headers: {
            "Content-Type": "multipart/form-data",
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
