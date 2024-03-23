import { createSlice } from "@reduxjs/toolkit";
import {
  allMyFriendsAction,
  currentUserDetailsAction,
  sendRequestAction,
  acceptRequestAction,
  searchUserAction,
} from "./userActions";

export const allMyFriendsSlice = createSlice({
  name: "alluser",
  initialState: {
    isLoading: false,
    myFriends: [],
    isError: null,
  },
  extraReducers: (builder) => {
    builder.addCase(allMyFriendsAction.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(allMyFriendsAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.myFriends = action.payload;
    });
    builder.addCase(allMyFriendsAction.rejected, (state, action) => {
      state.isLoading = false;
      state.myFriends = [];
      state.isError = action.payload;
    });
  },
});
export const allMyFriendsReducer = allMyFriendsSlice.reducer;

export const currentUserSlice = createSlice({
  name: "currentUser",
  initialState: {
    loading: false,
    error: null,
    user: null,
  },
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
export const currentUserReducer = currentUserSlice.reducer;

export const sendRequestSlice = createSlice({
  name: "sendRequest",
  initialState: {
    message: null,
    isError: null,
  },
  extraReducers: (builder) => {
    builder.addCase(sendRequestAction.fulfilled, (state, action) => {
      state.message = action.payload;
    });
    builder.addCase(sendRequestAction.rejected, (state, action) => {
      state.message = null;
      state.isError = action.payload;
    });
  },
});
export const sendRequestReducer = sendRequestSlice.reducer;

export const acceptRequestSlice = createSlice({
  name: "acceptRequest",
  initialState: {
    message: null,
    isError: null,
  },
  extraReducers: (builder) => {
    builder.addCase(acceptRequestAction.fulfilled, (state, action) => {
      state.message = action.payload;
    });
    builder.addCase(acceptRequestAction.rejected, (state, action) => {
      state.message = null;
      state.isError = action.payload;
    });
  },
});
export const acceptRequestReducer = acceptRequestSlice.reducer;

export const searchUserSlice = createSlice({
  name: "searchuser",
  initialState: {
    searchedUser: null,
    isError: null,
  },
  extraReducers: (builder) => {
    builder.addCase(searchUserAction.fulfilled, (state, action) => {
      state.searchedUser = action.payload;
    });
    builder.addCase(searchUserAction.rejected, (state, action) => {
      state.searchedUser = null;
      state.isError = action.payload;
    });
  },
});
export const searchUserReducer = searchUserSlice.reducer;
