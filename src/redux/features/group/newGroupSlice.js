import { createSlice } from "@reduxjs/toolkit";
import { newGroupAction } from "./groupAction";

const initialState = {
  success: false,
  error: null,
};

export const newGroupSlice = createSlice({
  name: "newGroup",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(newGroupAction.fulfilled, (state, action) => {
      state.success = action.payload;
    });
    builder.addCase(newGroupAction.rejected, (state, action) => {
      state.success = false;
      state.error = action.payload;
    });
  },
});

export default newGroupSlice.reducer;
