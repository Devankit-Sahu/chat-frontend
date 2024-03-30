import { configureStore } from "@reduxjs/toolkit";
import api from "./api/api";
import authSlice from "./features/auth/authSlice";
import notificationSlice from "./features/notification/notificationSlice";

export const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
    [api.reducerPath]: api.reducer,
    [notificationSlice.name]: notificationSlice.reducer,
  },
  middleware: (defaultMiddleWare) => [...defaultMiddleWare(), api.middleware],
});
