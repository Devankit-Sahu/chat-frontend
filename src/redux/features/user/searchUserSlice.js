import { createSlice } from "@reduxjs/toolkit";
import { allUsersAction, searchUserAction } from "./alluserAction";

const initialState = {
  searchedUsers: [],
  error: null,
};

export const searchUserSlice = createSlice({
  name: "searchuser",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(searchUserAction.fulfilled, (state, action) => {
      state.searchedUsers = action.payload;
    });
    builder.addCase(searchUserAction.rejected, (state, action) => {
      state.searchedUsers = [];
      state.error = action.payload;
    });
  },
});

export default searchUserSlice.reducer;
