import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const newGroupAction = createAsyncThunk(
  "group/newGroup",
  async ({ groupName, groupCreater, members }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        "/api/v1/group/newgroup",
        {
          groupName,
          groupCreater,
          members,
        },
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

export const allGroupsAction = createAsyncThunk(
  "group/allgroups",
  async (arg, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/api/v1/group/allgroups", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return data.allGroups;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const groupDetailsAction = createAsyncThunk(
  "group/groupDetails",
  async ({ group_id }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/v1/group/group-id/${group_id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
