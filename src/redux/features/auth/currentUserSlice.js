import { createSlice } from "@reduxjs/toolkit";
import { currentUserDetailsAction } from "./authAction";

const initialState = {
  loading: false,
  error: null,
  user: null,
};

export const currentUserSlice = createSlice({
  name: "currentUser",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(currentUserDetailsAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(currentUserDetailsAction.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    });
    builder.addCase(currentUserDetailsAction.rejected, (state, action) => {
      state.loading = false;
      state.user = null;
      state.error = action.payload;
    });
  },
});

export default currentUserSlice.reducer;
