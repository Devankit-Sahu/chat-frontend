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
  incrementRequestNotification,
  setNewMessageNotification,
} from "../../redux/features/notification/notificationSlice";

const Layout = () => {
  const { isLoading, data, isError, error, refetch } = useMyChatsQuery("");
  const { newMessageNotification, requestNotification } = useSelector(
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

  const newMessageNotificationHandler = (data) => {
    if (location.pathname.startsWith("/chat")) return;
    localStorage.setItem(
      NEW_MESSAGE_NOTIFICATION,
      JSON.stringify(newMessageNotification)
    );
    dispatch(setNewMessageNotification(data));
  };

  const requestNotificationHandler = () => {
    dispatch(incrementRequestNotification());
  };

  const onlineUsersHandler = (data) => {
    setOnlineUsers(data);
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
    if (location.pathname === "/" || location.pathname.startsWith("/chat")) {
      return (
        <ChatSidebar
          isGroup={false}
          isMobile={isMobile}
          isLoading={isLoading}
          data={data}
          onlineUsers={onlineUsers}
          newMessageNotification={newMessageNotification}
        />
      );
    } else if (location.pathname.startsWith("/group")) {
      return (
        <ChatSidebar
          isGroup={true}
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
      <Sidebar requestNotification={requestNotification} />
      {/* for mobile screen */}
      <MobileNav requestNotification={requestNotification} />
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
