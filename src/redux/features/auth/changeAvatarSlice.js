import { createSlice } from "@reduxjs/toolkit";
import { changeaAvatarAction } from "./authAction";

const initialState = {
  error: null,
  message: null,
  loading: false,
};

export const changeAvatarSlice = createSlice({
  name: "changeAvatar",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(changeaAvatarAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(changeaAvatarAction.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload;
    });
    builder.addCase(changeaAvatarAction.rejected, (state, action) => {
      state.loading = false;
      state.message = null;
      state.error = action.payload;
    });
  },
});

export default changeAvatarSlice.reducer;
