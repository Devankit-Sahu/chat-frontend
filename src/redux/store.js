import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import currentUserReducer from "./features/auth/currentUserSlice";
import alluserReducer from "./features/auth/alluserSlice";
import chatReducer from "./features/chat/chatSlice";
import {
  sendMessageReducer,
  deleteChatsReducer,
  deleteSingleChatReducer,
} from "./features/chat/sendMessageSlice";
import searchUserReducer from "./features/auth/searchUserSlice";
import changePasswordReducer from "./features/auth/changePasswordSlice";
import {
  changeAboutReducer,
  changeAvatarReducer,
} from "./features/auth/changeAvatarSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    currUser: currentUserReducer,
    alluser: alluserReducer,
    chat: chatReducer,
    sendMessage: sendMessageReducer,
    searchUser: searchUserReducer,
    changePass: changePasswordReducer,
    changeAbout: changeAboutReducer,
    changeAvt: changeAvatarReducer,
    delChats: deleteChatsReducer,
    delSingleChat: deleteSingleChatReducer,
    // addAtt: addAttachmentReducer,
  },
});
  