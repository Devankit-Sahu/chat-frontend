import React from "react";
import { Avatar, Box, Chip, Drawer, IconButton, Stack } from "@mui/material";
import { Logout as LogoutIcon, Close as CloseIcon } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { userNotExists } from "../redux/features/auth/authSlice";
import axios from "axios";
import { server } from "../config/config";
import toast from "react-hot-toast";
import moment from "moment";
import { useSocket } from "../context/socketContext";
import { useTheme } from "../context/themeContext";

const Profile = ({ isProfileDialogOpen, profileDialogClose, user }) => {
  const dispatch = useDispatch();
  const socket = useSocket();
  const { mode } = useTheme();

  const logoutHandler = async () => {
    try {
      const { data } = await axios.get(`${server}/api/v1/auth/logout`, {
        withCredentials: true,
      });
      dispatch(userNotExists());
      toast.success(data.message);
      socket.disconnect();
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <Drawer
      anchor="right"
      open={isProfileDialogOpen}
      onClose={profileDialogClose}
    >
      <Stack
        bgcolor={"black"}
        height={"100%"}
        color={"white"}
        width={"350px"}
        alignItems={"center"}
        paddingTop={1}
        paddingX={3}
      >
        <Box marginLeft={"auto"}>
          <IconButton onClick={profileDialogClose}>
            <CloseIcon
              className={`${mode === "light" ? "text-black" : "text-white"}`}
            />
          </IconButton>
        </Box>
        <Avatar
          src={user?.avatar?.url}
          sx={{
            width: 100,
            height: 100,
          }}
        />
        <Stack alignItems={"center"} marginY={"10px"} gap={"10px"}>
          <h1 className="text-center text-xl capitalize">{user.username}</h1>
          <Chip variant="outlined" label="Username" color="info" />
        </Stack>
        <Stack alignItems={"center"} marginY={"10px"} gap={"10px"}>
          <p className="text-center text-xl capitalize">
            {user && user?.about}
          </p>
          <Chip variant="outlined" label="About" color="info" />
        </Stack>
        <Stack alignItems={"center"} marginY={"10px"} gap={"10px"}>
          <p className="text-center text-xl">{user && user.email}</p>
          <Chip variant="outlined" label="Email" color="info" />
        </Stack>
        <Stack alignItems={"center"} marginY={"10px"} gap={"10px"}>
          <p className="text-center text-xl">
            {moment(user?.createdAt).fromNow()}
          </p>
          <Chip variant="outlined" label="Created On" color="info" />
        </Stack>
        <Button
          sx={{ marginTop: "auto", width: "100%" }}
          variant="contained"
          color="info"
          onClick={logoutHandler}
        >
          <LogoutIcon />
          <span className="ml-3">Logout</span>
        </Button>
      </Stack>
    </Drawer>
  );
};

export default Profile;
