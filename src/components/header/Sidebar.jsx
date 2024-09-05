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
} from "@mui/icons-material";
import { useTheme } from "../../context/themeContext";
import { useDispatch, useSelector } from "react-redux";
import { useSocket } from "../../context/socketContext";
import toast from "react-hot-toast";
import { userNotExists } from "../../redux/features/auth/authSlice";
import { useLazySignOutQuery } from "../../redux/api/api";

const Sidebar = ({ notificationCount, allNotifications }) => {
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
        toast.error(error?.data?.message || "Something Went Wrong");
      });
  };

  return (
    <div className="fixed z-0 bottom-0 w-full h-[60px] sm:w-[80px] sm:h-full sm:relative p-5 flex flex-row sm:flex-col items-center justify-between border-t sm:border-r border-solid border-zinc-300 dark:border-[#293145]">
      <div className="flex flex-row sm:flex-col items-center gap-2 sm:gap-6">
        <Link to={"/"}>
          <Tooltip title="Chats" arrow placement="right-start">
            <span className="cursor-pointer text-gray-500 dark:text-white dark:hover:bg-[#293145] p-3 rounded-md">
              <ChatIcon />
            </span>
          </Tooltip>
        </Link>
        <div onClick={() => setIsNotificationDialogOpen(true)}>
          <Tooltip
            title="Notifications"
            arrow
            placement="right-start"
            className="cursor-pointer text-gray-500 dark:text-white dark:hover:bg-[#293145] rounded-md"
          >
            <Badge badgeContent={notificationCount} color="success">
              <NotificationsOutlinedIcon />
            </Badge>
          </Tooltip>
        </div>
      </div>
      <div className="flex flex-row sm:flex-col items-center gap-2 sm:gap-4">
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
          <Avatar sx={{ width: "30px", height: "30px" }} />
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
          allNotifications={allNotifications}
        />
      )}
    </div>
  );
};

export default Sidebar;
