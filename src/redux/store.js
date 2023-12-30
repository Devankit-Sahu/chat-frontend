import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import currentUserReducer from "./features/auth/currentUserSlice";
import alluserReducer from "./features/auth/alluserSlice";
import chatReducer from "./features/chat/chatSlice";
import sendMessageReducer from "./features/chat/sendMessageSlice";
import newGroupReducer from "./features/group/newGroupSlice";
import allGroupsReducer from "./features/group/allGroupsSlice";
import groupDetailsReducer from "./features/group/groupDetailsSlice";
import searchUserReducer from "./features/auth/searchUserSlice";
import changePasswordReducer from "./features/auth/changePasswordSlice";
import changeAvatarReducer from "./features/auth/changeAvatarSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    currUser: currentUserReducer,
    alluser: alluserReducer,
    chat: chatReducer,
    sendMessage: sendMessageReducer,
    newGroup: newGroupReducer,
    allGroups: allGroupsReducer,
    groupDetails: groupDetailsReducer,
    searchUser: searchUserReducer,
    changePass: changePasswordReducer,
    changeAvt: changeAvatarReducer,
  },
});
