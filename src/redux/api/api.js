import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { server } from "../../config/config";

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: `${server}/api/v1/` }),
  tagTypes: ["Chat", "User"],
  endpoints: (builder) => ({
    signIn: builder.mutation({
      query: (data) => ({
        url: "auth/login",
        method: "POST",
        credentials: "include",
        body: data,
      }),
    }),
    signUp: builder.mutation({
      query: (data) => ({
        url: "auth/register",
        method: "POST",
        credentials: "include",
        body: data,
      }),
    }),
    signOut: builder.query({
      query: () => ({
        url: "auth/logout",
        credentials: "include",
      }),
    }),
    myChats: builder.query({
      query: () => ({
        url: "chat/mychats",
        credentials: "include",
      }),
      providesTags: ["Chat"],
    }),
    getAllMessages: builder.query({
      query: ({ chatId }) => ({
        url: `chat/message/${chatId}`,
        credentials: "include",
      }),
      providesTags: ["Chat"],
    }),
    getChatDetails: builder.query({
      query: ({ chatId }) => ({
        url: `chat/${chatId}`,
        credentials: "include",
      }),
      providesTags: ["Chat"],
    }),
    sendAttachments: builder.mutation({
      query: (data) => ({
        url: "chat/message",
        method: "POST",
        credentials: "include",
        body: data,
      }),
    }),
    deleteAllMessages: builder.mutation({
      query: (chatId) => ({
        url: `chat/${chatId}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Chat"],
    }),
    searchUser: builder.query({
      query: (username) => ({
        url: `user/search?username=${username}`,
        credentials: "include",
      }),
      providesTags: ["User"],
    }),
    sendFriendRequest: builder.mutation({
      query: (data) => ({
        url: "user/send-friend-request",
        method: "POST",
        credentials: "include",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    acceptFriendRequest: builder.mutation({
      query: (data) => ({
        url: "user/accept-friend-request",
        method: "PUT",
        credentials: "include",
        body: data,
      }),
      invalidatesTags: ["Chat"],
    }),
    getNotificaton: builder.query({
      query: () => ({
        url: "user/notification",
        credentials: "include",
      }),
      providesTags: ["User"],
    }),
    myFriends: builder.query({
      query: (chatId = "") => {
        let url = "user/my-friends";
        if (chatId) url += `?chatId=${chatId}`;
        return {
          url,
          credentials: "include",
        };
      },
      providesTags: ["Chat"],
    }),
    newGroup: builder.mutation({
      query: (data) => ({
        url: "chat/new-group",
        method: "POST",
        credentials: "include",
        body: data,
      }),
    }),
    myGroups: builder.query({
      query: () => ({
        url: "chat/all-groups",
        credentials: "include",
      }),
      providesTags: ["Chat"],
    }),
    addMembersToGroup: builder.mutation({
      query: (data) => ({
        url: "chat/add-members",
        method: "PUT",
        credentials: "include",
        body: data,
      }),
    }),
    removeMembersFromGroup: builder.mutation({
      query: (data) => ({
        url: "chat/remove-member",
        method: "PUT",
        credentials: "include",
        body: data,
      }),
    }),
    leaveGroup: builder.mutation({
      query: (data) => ({
        url: "chat/leave-group",
        method: "PUT",
        credentials: "include",
        body: data,
      }),
    }),
  }),
});

export default api;
export const {
  useSignInMutation,
  useSignUpMutation,
  useLazySignOutQuery,
  useMyChatsQuery,
  useGetAllMessagesQuery,
  useGetChatDetailsQuery,
  useSendAttachmentsMutation,
  useDeleteAllMessagesMutation,
  useLazySearchUserQuery,
  useSendFriendRequestMutation,
  useAcceptFriendRequestMutation,
  useGetNotificatonQuery,
  useMyFriendsQuery,
  useNewGroupMutation,
  useMyGroupsQuery,
  useAddMembersToGroupMutation,
  useRemoveMembersFromGroupMutation,
  useLeaveGroupMutation,
} = api;
