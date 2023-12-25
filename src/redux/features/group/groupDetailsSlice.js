import { createSlice } from "@reduxjs/toolkit";
import { groupDetailsAction } from "./groupAction";

const initialState = {
  group: null,
  error: null,
};

export const groupDetailsSlice = createSlice({
  name: "groupDetails",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(groupDetailsAction.fulfilled, (state, action) => {
      state.group = action.payload;
    });
    builder.addCase(groupDetailsAction.rejected, (state, action) => {
      state.group = null;
      state.error = action.payload;
    });
  },
});

export default groupDetailsSlice.reducer;
