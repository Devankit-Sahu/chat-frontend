import { createSlice } from "@reduxjs/toolkit";
import { changePasswordAction } from "./authAction";

const initialState = {
  error: null,
  message: null,
  loading: false,
};

export const changePasswordSlice = createSlice({
  name: "changePassword",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(changePasswordAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(changePasswordAction.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload;
    });
    builder.addCase(changePasswordAction.rejected, (state, action) => {
      state.loading = false;
      state.message = null;
      state.error = action.payload;
    });
  },
});

export default changePasswordSlice.reducer;
