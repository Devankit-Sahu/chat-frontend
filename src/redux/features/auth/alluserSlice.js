import { createSlice } from "@reduxjs/toolkit";
import { allUsersAction } from "./authAction";

const initialState = {
  loading: false,
  users: [],
  error: null,
};

export const alluserSlice = createSlice({
  name: "alluser",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(allUsersAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(allUsersAction.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
    });
    builder.addCase(allUsersAction.rejected, (state, action) => {
      state.loading = false;
      state.users = [];
      state.error = action.payload;
    });
  },
});

export default alluserSlice.reducer;
