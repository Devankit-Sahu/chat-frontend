import { createSlice } from "@reduxjs/toolkit";
import { loginAction, logoutAction, registerAction } from "./authAction";

const initialState = {
  isLoading: false,
  isAuth: false,
  isError: null,
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(loginAction.pending, (state, action) => {
      state.isLoading = true;
      state.isAuth = false;
    });
    builder.addCase(loginAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isAuth = action.payload;
    });
    builder.addCase(loginAction.rejected, (state, action) => {
      state.isLoading = false;
      state.isAuth = false;
      state.isError = action.payload;
    });

    builder.addCase(registerAction.pending, (state, action) => {
      state.isLoading = true;
      state.isAuth = false;
    });
    builder.addCase(registerAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isAuth = action.payload;
    });
    builder.addCase(registerAction.rejected, (state, action) => {
      state.isLoading = false;
      state.isAuth = false;
      state.isError = action.payload;
    });

    builder.addCase(logoutAction.pending, (state, action) => {
      state.isLoading = true;
      state.isAuth = false;
    });
    builder.addCase(logoutAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isAuth = false;
    });
    builder.addCase(logoutAction.rejected, (state, action) => {
      state.isLoading = false;
      state.isAuth = false;
      state.isError = action.payload;
    });
  },
});

export default authSlice.reducer;
