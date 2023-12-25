import { createSlice } from "@reduxjs/toolkit";
import { allUsersAction } from "./alluserAction";

const initialState = {
  users: [],
  error: null,
};

export const alluserSlice = createSlice({
  name: "alluser",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(allUsersAction.fulfilled, (state, action) => {
      state.users = action.payload;
    });
    builder.addCase(allUsersAction.rejected, (state, action) => {
      state.users = [];
      state.error = action.payload;
    });
  },
});

export default alluserSlice.reducer;
