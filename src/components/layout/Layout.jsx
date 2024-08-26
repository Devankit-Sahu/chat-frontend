import React, { useCallback, useState } from "react";
import { ChatSidebar, Sidebar, MobileNav } from "../";
import { useMediaQuery } from "@mui/material";
import { useMyChatsQuery } from "../../redux/api/api";
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
    ({ count }) => {
      dispatch(incrementNotification(count));
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

  const renderLeftSidebar = () => {
    const isGroupChat = location.pathname.startsWith("/group");
    const isChatView = location.pathname.startsWith("/chat");

    if (location.pathname === "/" || isChatView || isGroupChat) {
      return (
        <ChatSidebar
          isGroup={isGroupChat}
          isMobile={isMobile}
          isLoading={isLoading}
          data={data}
          onlineUsers={onlineUsers}
          newMessageNotification={newMessageNotification}
        />
      );
    }

    return null;
  };

  const isChatDetailView = location.pathname.startsWith("/chat/");

  return (
    <div className="flex h-screen w-screen bg-white text-black dark:text-white dark:bg-[#1a2236] overscroll-x-hidden overflow-y-hidden">
      <Sidebar notificationCount={notificationCount} />
      {/* for mobile screen */}
      <MobileNav notificationCount={notificationCount} />
      {isMobile ? (
        isChatDetailView ? (
          <div className="w-full">
            <Outlet />
          </div>
        ) : (
          <div className="w-full">{renderLeftSidebar()}</div>
        )
      ) : (
        <>
          <div className="w-[330px]">{renderLeftSidebar()}</div>
          <div className="w-[calc(100%-330px)]">
            <Outlet />
          </div>
        </>
      )}
    </div>
  );
};

export default Layout;
