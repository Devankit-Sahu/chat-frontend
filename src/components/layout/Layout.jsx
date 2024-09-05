import React, { useCallback, useEffect, useState } from "react";
import { ChatSidebar, Sidebar } from "../";
import { useMediaQuery } from "@mui/material";
import { useGetNotificatonQuery, useMyChatsQuery } from "../../redux/api/api";
import { useErrors } from "../../hooks/useErrorsHook";
import { useSocket } from "../../context/socketContext";
import { useSocketEvent } from "../../hooks/useSocketEventHook";
import {
  NEW_MESSAGE_NOTIFICATION,
  NEW_MESSAGE_RECIEVED,
  NEW_REQUEST,
  ONLINEUSERS,
  REFETCH_CHATS,
} from "../../constants/constants";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  incrementNotification,
  setNewMessageNotification,
} from "../../redux/features/notification/notificationSlice";
import toast from "react-hot-toast";

const Layout = () => {
  const { user } = useSelector((state) => state.auth);
  const { isLoading, data, isError, error, refetch } = useMyChatsQuery("");
  const { newMessageNotification, notificationCount } = useSelector(
    (state) => state.notification
  );
  const socket = useSocket();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isMobile = useMediaQuery("(max-width: 800px)");
  const location = useLocation();
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { data: allNotifications, isLoading: loading } =
    useGetNotificatonQuery();

  useErrors([{ isError, error }]);

  const refetchHandler = useCallback(() => {
    refetch();
    navigate("/");
  }, [refetch, navigate]);

  const newMessageNotificationHandler = useCallback(
    (data) => {
      if (location.pathname.startsWith("/chat")) return;
      dispatch(setNewMessageNotification(data));
    },
    [dispatch, location.pathname]
  );

  const requestNotificationHandler = useCallback(
    ({ count, message }) => {
      dispatch(incrementNotification(count));
      toast.success(message);
    },
    [dispatch]
  );

  const onlineUsersHandler = (data) => {
    const filteredUsers = data.filter((u) => u !== user?._id);
    setOnlineUsers(filteredUsers);
  };

  const newMessageHandler = useCallback((data) => {
    refetch();
  }, []);

  useSocketEvent(socket, {
    [REFETCH_CHATS]: refetchHandler,
    [NEW_MESSAGE_NOTIFICATION]: newMessageNotificationHandler,
    [NEW_REQUEST]: requestNotificationHandler,
    [ONLINEUSERS]: onlineUsersHandler,
    [NEW_MESSAGE_RECIEVED]: newMessageHandler,
  });

  useEffect(() => {
    if (!loading) {
      const notificationCount = allNotifications?.requests?.length || 0;
      dispatch(incrementNotification(notificationCount));
    }
  }, [loading, dispatch, allNotifications]);

  return (
    <div className="flex h-screen w-screen bg-white text-black dark:text-white dark:bg-[#1a2236] overscroll-x-hidden overflow-y-hidden">
      <Sidebar
        notificationCount={notificationCount}
        allNotifications={allNotifications}
      />
      <div
        className={`${
          isMobile
            ? !location.pathname.startsWith("/chat")
              ? "w-full"
              : "hidden"
            : "w-[330px]"
        }`}
      >
        <ChatSidebar
          isMobile={isMobile}
          isLoading={isLoading}
          data={data}
          onlineUsers={onlineUsers}
          newMessageNotification={newMessageNotification}
        />
      </div>
      <div
        className={`${
          isMobile
            ? location.pathname.startsWith("/chat")
              ? "w-full"
              : "hidden"
            : "w-[calc(100%-330px)]"
        }`}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
