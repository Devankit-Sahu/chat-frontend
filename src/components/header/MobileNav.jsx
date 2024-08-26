import React, { lazy, useState } from "react";
const Profile = lazy(() => import("../Profile"));
const Notification = lazy(() => import("../dialogs/Notification"));
import { Link } from "react-router-dom";
import { Avatar, Badge } from "@mui/material";
import {
  Chat as ChatIcon,
  NotificationsOutlined as NotificationsOutlinedIcon,
  DarkModeOutlined as DarkModeOutlinedIcon,
  LightModeOutlined as LightModeOutlinedIcon,
  Group as GroupIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import { useTheme } from "../../context/themeContext";
import { useDispatch, useSelector } from "react-redux";
import { useLazySignOutQuery } from "../../redux/api/api";
import { userNotExists } from "../../redux/features/auth/authSlice";
import { useSocket } from "../../context/socketContext";

const MobileNav = ({ notificationCount }) => {
  const { user } = useSelector((state) => state.auth);
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);
  const [isNotificationDialogOpen, setIsNotificationDialogOpen] =
    useState(false);
  const socket = useSocket();
  const { mode, toggleMode } = useTheme();
  const [singoutQuery] = useLazySignOutQuery();
  const dispatch = useDispatch();

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
    <div className="flex items-center justify-between h-[60px] fixed z-0 sm:hidden bottom-0 w-full border-t border-solid border-zinc-300 dark:border-[#293145]">
      <div className="flex items-center justify-between w-full h-full px-4">
        <div className="flex items-center gap-5">
          <Link to={"/"}>
            <ChatIcon />
          </Link>
          <Link to={"/groups"}>
            <GroupIcon />
          </Link>
          <div onClick={() => setIsNotificationDialogOpen(true)}>
            <Badge badgeContent={notificationCount} color="success">
              <NotificationsOutlinedIcon />
            </Badge>
          </div>
        </div>
        <div className="flex items-center gap-5">
          <div onClick={logoutHandler}>
            <LogoutIcon />
          </div>
          <div
            onClick={handleModeToggle}
            className="cursor-pointer dark:hover:bg-[#293145] p-3 rounded-md"
          >
            {mode === "light" ? (
              <DarkModeOutlinedIcon />
            ) : (
              <LightModeOutlinedIcon />
            )}
          </div>
          <div
            onClick={() => setIsProfileDialogOpen(true)}
            className="cursor-pointer"
          >
            <Avatar sx={{ width: "30px", height: "30px" }} />
          </div>
        </div>
      </div>

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
    </div>
  );
};

export default MobileNav;
