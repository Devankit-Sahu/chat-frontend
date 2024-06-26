import React, { lazy, useState } from "react";
const Profile = lazy(() => import("./Profile"));
const Notification = lazy(() => import("./Notification"));
import { Link } from "react-router-dom";
import { Avatar, Badge, Box, Stack, Tooltip } from "@mui/material";
import {
  Chat as ChatIcon,
  NotificationsOutlined as NotificationsOutlinedIcon,
  DarkModeOutlined as DarkModeOutlinedIcon,
  LightModeOutlined as LightModeOutlinedIcon,
} from "@mui/icons-material";
import { useTheme } from "../context/themeContext";
import { useSelector } from "react-redux";

const Sidebar = ({ requestNotification }) => {
  const { user } = useSelector((state) => state.auth);
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);
  const [isNotificationDialogOpen, setIsNotificationDialogOpen] =
    useState(false);
  const { mode, toggleMode } = useTheme();

  const profileDialogClose = () => {
    setIsProfileDialogOpen(false);
  };

  const notificationDialogClose = () => {
    setIsNotificationDialogOpen(false);
  };

  const handleModeToggle = () => {
    toggleMode();
  };

  return (
    <Box
      width={"80px"}
      height={"100%"}
      paddingY={"20px"}
      className="hidden sm:flex sm:flex-col sm:items-center sm:justify-between border-r-[1px] border-solid border-[rgba(209,213,219,1)] dark:text-[#acacac] dark:border-[#293145]"
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
        <Box onClick={() => setIsNotificationDialogOpen(true)}>
          <Tooltip
            title="Notifications"
            arrow
            placement="right-start"
            className="cursor-pointer"
          >
            <Badge badgeContent={requestNotification} color="success">
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
        <Box
          onClick={() => setIsProfileDialogOpen(true)}
          className="cursor-pointer"
        >
          <Avatar />
        </Box>
      </Stack>
      {isProfileDialogOpen && (
        <Profile
          isProfileDialogOpen={isProfileDialogOpen}
          profileDialogClose={profileDialogClose}
          user={user}
        />
      )}
      {isNotificationDialogOpen && (
        <Notification
          isNotificationDialogOpen={isNotificationDialogOpen}
          notificationDialogClose={notificationDialogClose}
          user={user}
        />
      )}
    </Box>
  );
};

export default Sidebar;
