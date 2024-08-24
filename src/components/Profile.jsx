import React from "react";
import { Avatar, Chip, Drawer, IconButton } from "@mui/material";
import { Logout as LogoutIcon, Close as CloseIcon } from "@mui/icons-material";
import { Button } from "@mui/material";
import moment from "moment";
import { useTheme } from "../context/themeContext";

const Profile = ({
  isProfileDialogOpen,
  profileDialogClose,
  user,
  logoutHandler,
}) => {
  const { mode } = useTheme();

  return (
    <Drawer
      anchor="right"
      open={isProfileDialogOpen}
      onClose={profileDialogClose}
    >
      <div className="flex flex-col bg-black w-full sm:w-[350px] items-center h-full text-white pt-2 px-6">
        <div className="ml-auto">
          <IconButton onClick={profileDialogClose}>
            <CloseIcon
              className={`${mode === "light" ? "text-black" : "text-white"}`}
            />
          </IconButton>
        </div>
        <Avatar
          src={user?.avatar?.url}
          sx={{
            width: 100,
            height: 100,
          }}
        />
        <div className="flex flex-col items-center my-[10px] gap-[10px]">
          <h1 className="text-center text-xl capitalize">{user.username}</h1>
          <Chip variant="outlined" label="Username" color="info" />
        </div>
        <div className="flex flex-col items-center my-[10px] gap-[10px]">
          <p className="text-center text-xl capitalize">
            {user && user?.about}
          </p>
          <Chip variant="outlined" label="About" color="info" />
        </div>
        <div className="flex flex-col items-center my-[10px] gap-[10px]">
          <p className="text-center text-xl">{user && user.email}</p>
          <Chip variant="outlined" label="Email" color="info" />
        </div>
        <div className="flex flex-col items-center my-[10px] gap-[10px]">
          <p className="text-center text-xl">
            {moment(user?.createdAt).fromNow()}
          </p>
          <Chip variant="outlined" label="Created On" color="info" />
        </div>
        <Button
          sx={{ marginTop: "auto", width: "100%" }}
          variant="contained"
          color="info"
          onClick={logoutHandler}
        >
          <LogoutIcon />
          <span className="ml-3">Logout</span>
        </Button>
      </div>
    </Drawer>
  );
};

export default Profile;
