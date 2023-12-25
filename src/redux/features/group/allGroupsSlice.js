import { createSlice } from "@reduxjs/toolkit";
import { allGroupsAction } from "./groupAction";

const initialState = {
  allGroups: [],
  error: null,
};

export const allGroupsSlice = createSlice({
  name: "allGroups",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(allGroupsAction.fulfilled, (state, action) => {
      state.allGroups = action.payload;
    });
    builder.addCase(allGroupsAction.rejected, (state, action) => {
      state.allGroups = [];
      state.error = action.payload;
    });
  },
});

export default allGroupsSlice.reducer;
