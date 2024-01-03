import { createSlice } from "@reduxjs/toolkit";
import { changeAboutAction, changeAvatarAction } from "./authAction";

const initialState = {
  error: null,
  message: null,
  loading: false,
};

export const changeAboutSlice = createSlice({
  name: "changeAbout",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(changeAboutAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(changeAboutAction.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload;
    });
    builder.addCase(changeAboutAction.rejected, (state, action) => {
      state.loading = false;
      state.message = null;
      state.error = action.payload;
    });
  },
});

export const changeAboutReducer = changeAboutSlice.reducer;

const initialState1 = {
  error: null,
  message: null,
  loading: false,
};

export const changeAvatarSlice = createSlice({
  name: "changeAvatar",
  initialState: initialState1,
  extraReducers: (builder) => {
    builder.addCase(changeAvatarAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(changeAvatarAction.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload;
    });
    builder.addCase(changeAvatarAction.rejected, (state, action) => {
      state.loading = false;
      state.message = null;
      state.error = action.payload;
    });
  },
});

export const changeAvatarReducer = changeAvatarSlice.reducer;
