import React, { useCallback, useEffect, useState } from "react";
import { ChatSidebar, Sidebar } from ".";
import { Box, Stack, useMediaQuery } from "@mui/material";
import { useMyChatsQuery } from "../redux/api/api";
import { useErrors } from "../hooks/useErrorsHook";
import { useSocket } from "../context/socketContext";
import { useSocketEvent } from "../hooks/useSocketEventHook";
import {
  NEW_MESSAGE_NOTIFICATION,
  NEW_REQUEST,
  ONLINEUSERS,
  REFETCH_CHATS,
} from "../constants/constants";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  incrementRequestNotification,
  setNewMessageNotification,
} from "../redux/features/notification/notificationSlice";
import MobileNav from "./MobileNav";

const Layout = () => (WrappedComponent) => {
  return (props) => {
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

    useEffect(() => {
      localStorage.setItem(
        NEW_MESSAGE_NOTIFICATION,
        JSON.stringify(newMessageNotification)
      );
    }, [newMessageNotification]);

    const refetchHandler = useCallback(() => {
      refetch();
      navigate("/");
    }, [refetch, navigate]);

    const newMessageNotificationHandler = (data) => {
      dispatch(setNewMessageNotification(data));
    };

    const requestNotificationHandler = () => {
      dispatch(incrementRequestNotification());
    };

    const onlineUsersHandler = (data) => {
      setOnlineUsers(data);
    };

    useSocketEvent(socket, {
      [REFETCH_CHATS]: refetchHandler,
      [NEW_MESSAGE_NOTIFICATION]: newMessageNotificationHandler,
      [NEW_REQUEST]: requestNotificationHandler,
      [ONLINEUSERS]: onlineUsersHandler,
    });

    return (
      <Stack
        direction={"row"}
        height={"100vh"}
        width={"100vw"}
        className="bg-white text-black dark:text-white dark:bg-[#1a2236] overscroll-x-hidden overflow-y-hidden"
      >
        <Sidebar requestNotification={requestNotification} />
        {/* for mobile screen */}
        <MobileNav requestNotification={requestNotification} />

        <ChatSidebar
          isMobile={isMobile}
          isLoading={isLoading}
          data={data}
          onlineUsers={onlineUsers}
          newMessageNotification={newMessageNotification}
        />

        <Box
          height={"100%"}
          width={isMobile ? "100%" : "calc(100% - 360px)"}
          display={isMobile && location.pathname === "/" ? "none" : "block"}
          className="bg-white dark:bg-inherit relative z-10"
        >
          <WrappedComponent {...props} />
        </Box>
      </Stack>
    );
  };
};

export default Layout;
