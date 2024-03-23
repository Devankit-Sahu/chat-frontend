import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import {
  allMyFriendsReducer,
  currentUserReducer,
  sendRequestReducer,
  acceptRequestReducer,
  searchUserReducer,
} from "./features/user/userSlice";
import {
  addMembersToGroupChatReducer,
  deleteAllMessagesReducer,
  getAllMessagesReducer,
  getChatsReducer,
  leaveGroupChatReducer,
  newGroupReducer,
  removeMembersFromGroupChatReducer,
  searchChatReducer,
  sendMessageReducer,
} from "./features/chat/chatSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    allMyFriends: allMyFriendsReducer,
    currUser: currentUserReducer,
    sendReq: sendRequestReducer,
    acceptReq: acceptRequestReducer,
    searchUser: searchUserReducer,
    newGroup: newGroupReducer,
    addMembers: addMembersToGroupChatReducer,
    removeMembers: removeMembersFromGroupChatReducer,
    leaveGroup: leaveGroupChatReducer,
    chats: getChatsReducer,
    searchChat: searchChatReducer,
    newMessage: sendMessageReducer,
    allMessages: getAllMessagesReducer,
    delMessages: deleteAllMessagesReducer,
  },
});
