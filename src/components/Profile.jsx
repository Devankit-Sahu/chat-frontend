import React from "react";
import {
  Avatar,
  Chip,
  Drawer,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { Logout as LogoutIcon, Close as CloseIcon } from "@mui/icons-material";
import { Button } from "@mui/material";

const Profile = ({ open, toggleDrawer, logout, user }) => {
  return (
    <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
      <Stack
        bgcolor={"black"}
        height={"100%"}
        color={"white"}
        width={"350px"}
        alignItems={"center"}
        position={"relative"}
      >
        <div className="relative w-full">
          <img src="/profilebg.jpg" alt="profile-bg" />
          <IconButton
            onClick={toggleDrawer(false)}
            sx={{
              position: "absolute",
              right: "10px",
              top: "10px",
            }}
          >
            <CloseIcon fontSize="large" className="text-black" />
          </IconButton>
          <Avatar
            // src={user ? user.avatar.url : "N"}
            className=" -bottom-[3rem] left-1/2 transform -translate-x-1/2"
            sx={{
              width: 100,
              height: 100,
              position: "absolute",
            }}
          />
        </div>
        <Typography marginY={"8px"}>user</Typography>
        {/* <Typography marginY={"8px"}>{user && user.username}</Typography> */}
        <Stack alignItems={"center"} marginY={"10px"} gap={"10px"}>
          <p className="text-center text-xs">about</p>
          {/* <p className="text-center text-xs">{user && user.about}</p> */}
          <Chip variant="outlined" label="Bio" color="info" />
        </Stack>
        <Stack alignItems={"center"} marginY={"10px"} gap={"10px"}>
          <p className="text-center text-xl">email</p>
          {/* <p className="text-center text-xl">{user && user.email}</p> */}
          <Chip variant="outlined" label="Email" color="info" />
        </Stack>
        <Stack alignItems={"center"} marginY={"10px"} gap={"10px"}>
          <p className="text-center text-xl">1 month ago</p>
          <Chip variant="outlined" label="Joined On" color="info" />
        </Stack>
        <Button
          sx={{ marginTop: "auto", width: "100%" }}
          variant="contained"
          color="info"
          onClick={logout}
        >
          <LogoutIcon />
          <span className="ml-3">Logout</span>
        </Button>
      </Stack>
    </Drawer>
    // <div></div>
  );
};

export default Profile;
