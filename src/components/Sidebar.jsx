import React, { lazy, useEffect, useState } from "react";
const Profile = lazy(() => import("./Profile"));
const Notification = lazy(() => import("./Notification"));
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../redux/features/auth/authAction";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, Badge, Box, Stack, Tooltip } from "@mui/material";
import {
  Chat as ChatIcon,
  NotificationsOutlined as NotificationsOutlinedIcon,
  DarkModeOutlined as DarkModeOutlinedIcon,
  LightModeOutlined as LightModeOutlinedIcon,
} from "@mui/icons-material";
import { useSocket } from "../context/socketContext";
import { useTheme } from "../context/themeContext";

const Sidebar = () => {
  const isAuth = JSON.parse(localStorage.getItem("isAuthenticated"));
  const user = useSelector((state) => state.currUser.user);
  const [isShowProfile, setIsShowProfile] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [notification, setNotification] = useState([]);
  const socket = useSocket();
  const { mode, toggleMode } = useTheme();

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const notificationHandler = () => {
    setIsShowProfile((prev) => !prev);
  };

  const handleLogout = () => {
    if (isAuth) {
      dispatch(logoutAction());
      localStorage.setItem("isAuthenticated", false);
      if (socket) {
        socket.disconnect();
      }
      navigate("/login");
    }
  };

  const handleModeToggle = () => {
    toggleMode();
  };

  useEffect(() => {
    if (socket) {
      socket.on("NEW_MESSAGE_RECEIVED_NOTIFICATION", (data) => {
        setNotification((prevNotification) => {
          // Check if notification from the same user already exists
          const existingNotificationIndex = prevNotification.findIndex(
            (notif) => notif.name === data.name
          );

          if (existingNotificationIndex !== -1) {
            // If exists, update the count
            const updatedNotification = [...prevNotification];
            updatedNotification[existingNotificationIndex].count += 1;

            // Update localStorage with updated notifications
            localStorage.setItem(
              "notifications",
              JSON.stringify(updatedNotification)
            );
            return updatedNotification;
          } else {
            // If not exists, add the new notification
            const updatedNotification = [
              ...prevNotification,
              {
                name: data.name,
                count: 1,
                date: data.createdAt,
                chatId: data.chatId,
              },
            ];

            // Update localStorage with updated notifications
            localStorage.setItem(
              "notifications",
              JSON.stringify(updatedNotification)
            );
            return updatedNotification;
          }
        });
      });

      // Retrieve notifications from localStorage when component mounts
      const storedNotifications = JSON.parse(
        localStorage.getItem("notifications")
      );
      if (storedNotifications) {
        setNotification(storedNotifications);
      }
    }
  }, [socket]);

  return (
    <>
      <Stack
        width={"80px"}
        height={"100%"}
        justifyContent={"space-between"}
        alignItems={"center"}
        paddingY={"20px"}
        className="border-r-[1px] border-solid border-[rgba(209,213,219,1)] dark:text-[#acacac] dark:border-[#293145]"
      >
        <Stack spacing={3}>
          <Link to={"/"}>
            <Tooltip
              title="Chats"
              arrow
              placement="right-start"
              className="cursor-pointer"
            >
              <ChatIcon />
            </Tooltip>
          </Link>
          <Box onClick={notificationHandler}>
            <Tooltip
              title="Notifications"
              arrow
              placement="right-start"
              className="cursor-pointer"
            >
              <Badge badgeContent={notification.length} color="success">
                <NotificationsOutlinedIcon />
              </Badge>
            </Tooltip>
          </Box>
        </Stack>
        <Stack alignItems={"center"} gap={4}>
          <Tooltip
            arrow
            title={
              mode === "light" ? "switch to dark mode" : "switch to light mode"
            }
            placement="right"
          >
            <Box
              onClick={handleModeToggle}
              className="cursor-pointer dark:hover:bg-[#293145] p-3 rounded-md"
            >
              {mode === "light" ? (
                <DarkModeOutlinedIcon />
              ) : (
                <LightModeOutlinedIcon />
              )}
            </Box>
          </Tooltip>
          <Box onClick={toggleDrawer(true)} className="cursor-pointer">
            <Avatar />
          </Box>
        </Stack>
      </Stack>
      <Profile
        open={open}
        toggleDrawer={toggleDrawer}
        logout={handleLogout}
        user={user}
      />
      <Notification
        open={isShowProfile}
        notificationHandler={notificationHandler}
        notification={notification}
      />
    </>
  );
};

export default Sidebar;
