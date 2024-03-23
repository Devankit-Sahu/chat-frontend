import React, { useEffect, useState } from "react";
import { ChatSidebar,  Sidebar } from ".";
import { Outlet, useNavigate } from "react-router-dom";
import { Stack, useMediaQuery } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { SocketProvider } from "../context/socketContext";
import { io } from "socket.io-client";
import { currentUserDetailsAction } from "../redux/features/user/userActions";
import { getChatsAction } from "../redux/features/chat/chatAction";

const Layout = () => {
  const isAuth = JSON.parse(localStorage.getItem("isAuthenticated")) || false;
  const user = useSelector((state) => state.currUser.user);
  const isMobile = useMediaQuery("(max-width: 800px)");
  const [socket, setSocket] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, [isAuth, navigate]);

  useEffect(() => {
    if (isAuth) {
      dispatch(currentUserDetailsAction());
      dispatch(getChatsAction());
    }
  }, [dispatch, isAuth]);

  useEffect(() => {
    if (isAuth && user) {
      const newSocket = io("http://localhost:8080", {
        auth: { id: user?._id },
      });
      setSocket(newSocket);

      return () => {
        newSocket.disconnect();
      };
    }
  }, [user, isAuth]);

  return (
    <SocketProvider socket={socket}>
      <Stack
        direction={"row"}
        height={"100vh"}
        width={"100vw"}
        className="bg-white text-black dark:text-white dark:bg-[#1a2236]"
      >
        <Sidebar />
        <ChatSidebar isMobile={isMobile} location={location} />
        {location.pathname === "/" ? (
          <Stack
            height={"100%"}
            sx={{ width: "calc(100% - 400px)" }}
            justifyContent={"center"}
            alignItems={"center"}
            display={isMobile ? "none" : "flex"}
          >
            <p className="text-xl font-semibold">Select chat to message</p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi, in!
            </p>
          </Stack>
        ) : (
          <Outlet />
        )}
      </Stack>
    </SocketProvider>
  );
};

export default Layout;
