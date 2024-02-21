import { createSlice } from "@reduxjs/toolkit";
import { changeDetailsAction, changeAvatarAction } from "./authAction";

const initialState = {
  isChanged: false,
  error: null,
  message: null,
  loading: false,
};

export const changeDetailsSlice = createSlice({
  name: "changeAbout",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(changeDetailsAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(changeDetailsAction.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload;
      state.isChanged = true;
    });
    builder.addCase(changeDetailsAction.rejected, (state, action) => {
      state.loading = false;
      state.message = null;
      state.error = action.payload;
      state.isChanged = false;
    });
  },
});

export const changeDetailsReducer = changeDetailsSlice.reducer;

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
