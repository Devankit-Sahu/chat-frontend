import React, { lazy, useState } from "react";
const Profile = lazy(() => import("../Profile"));
const Notification = lazy(() => import("../dialogs/Notification"));
import { Link } from "react-router-dom";
import { Avatar, Badge, Tooltip } from "@mui/material";
import {
  Chat as ChatIcon,
  NotificationsOutlined as NotificationsOutlinedIcon,
  DarkModeOutlined as DarkModeOutlinedIcon,
  LightModeOutlined as LightModeOutlinedIcon,
  Logout as LogoutIcon,
  Group as GroupIcon,
} from "@mui/icons-material";
import { useTheme } from "../../context/themeContext";
import { useDispatch, useSelector } from "react-redux";
import { useSocket } from "../../context/socketContext";
import toast from "react-hot-toast";
import { userNotExists } from "../../redux/features/auth/authSlice";
import { useLazySignOutQuery } from "../../redux/api/api";

const Sidebar = ({ requestNotification }) => {
  const { user } = useSelector((state) => state.auth);
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);
  const [isNotificationDialogOpen, setIsNotificationDialogOpen] =
    useState(false);
  const { mode, toggleMode } = useTheme();
  const dispatch = useDispatch();
  const socket = useSocket();
  const [singoutQuery] = useLazySignOutQuery();
  const profileDialogClose = () => {
    setIsProfileDialogOpen(false);
  };

  const notificationDialogClose = () => {
    setIsNotificationDialogOpen(false);
  };

  const handleModeToggle = () => {
    toggleMode();
  };

  const logoutHandler = async () => {
    await singoutQuery()
      .unwrap()
      .then((res) => {
        dispatch(userNotExists());
        toast.success(res?.message);
        socket.disconnect();
      })
      .catch((error) => {
        error?.data?.message.forEach((err) =>
          toast.error(err || "Something Went Wrong")
        );
      });
  };

  return (
    <div className="hidden w-[80px] h-full p-5 sm:flex sm:flex-col sm:items-center sm:justify-between border-r-[1px] border-solid border-[rgba(209,213,219,1)] dark:text-[#acacac] dark:border-[#293145]">
      <div className="flex flex-col gap-6">
        <Link to={"/"}>
          <Tooltip title="Chats" arrow placement="right-start">
            <span className="cursor-pointer text-gray-500 dark:text-white dark:hover:bg-[#293145] p-3 rounded-md">
              <ChatIcon />
            </span>
          </Tooltip>
        </Link>
        <Link to={"/groups"}>
          <Tooltip title="Groups" arrow placement="right-start">
            <span className="cursor-pointer text-gray-500 dark:text-white dark:hover:bg-[#293145] p-3 rounded-md">
              <GroupIcon />
            </span>
          </Tooltip>
        </Link>
        <div onClick={() => setIsNotificationDialogOpen(true)}>
          <Tooltip
            title="Notifications"
            arrow
            placement="right-start"
            className="cursor-pointer text-gray-500 dark:text-white dark:hover:bg-[#293145] p-3 rounded-md"
          >
            <Badge badgeContent={requestNotification} color="success">
              <NotificationsOutlinedIcon />
            </Badge>
          </Tooltip>
        </div>
      </div>
      <div className="flex flex-col items-center gap-4">
        <Tooltip arrow title="Logout" placement="right">
          <span
            onClick={logoutHandler}
            className="cursor-pointer text-gray-500 dark:text-white dark:hover:bg-[#293145] p-3 rounded-md"
          >
            <LogoutIcon />
          </span>
        </Tooltip>
        <Tooltip
          arrow
          title={
            mode === "light" ? "switch to dark mode" : "switch to light mode"
          }
          placement="right"
        >
          <div
            onClick={handleModeToggle}
            className="cursor-pointer text-gray-500 dark:text-white dark:hover:bg-[#293145] p-3 rounded-md"
          >
            {mode === "light" ? (
              <DarkModeOutlinedIcon />
            ) : (
              <LightModeOutlinedIcon />
            )}
          </div>
        </Tooltip>
        <div
          onClick={() => setIsProfileDialogOpen(true)}
          className="cursor-pointer"
        >
          <Avatar />
        </div>
      </div>
      {isProfileDialogOpen && (
        <Profile
          isProfileDialogOpen={isProfileDialogOpen}
          profileDialogClose={profileDialogClose}
          user={user}
          logoutHandler={logoutHandler}
        />
      )}
      {isNotificationDialogOpen && (
        <Notification
          isNotificationDialogOpen={isNotificationDialogOpen}
          notificationDialogClose={notificationDialogClose}
          user={user}
        />
      )}
    </div>
  );
};

export default Sidebar;
