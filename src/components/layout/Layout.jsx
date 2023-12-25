import React, { useEffect, useState } from "react";
import Sidebar from "../sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { currentUserDetailsAction } from "../../redux/features/auth/currentUserAction";
import { allUsersAction } from "../../redux/features/user/alluserAction";
import { SocketProvider } from "../../context/socketContext";
import { io } from "socket.io-client";

const Layout = () => {
  const isAuth = JSON.parse(localStorage.getItem("isAuthenticated")) || false;
  const user = useSelector((state) => state.currUser.user);
  const [socket, setsocket] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuth) {
      dispatch(currentUserDetailsAction());
      dispatch(allUsersAction());
    }
  }, [dispatch, isAuth]);

  useEffect(() => {
    if (isAuth) {
      if (user) {
        const newSocket = io("http://localhost:8080", {
          auth: { id: user?._id },
        });
        setsocket(newSocket);
      }
    }
  }, [user, isAuth]);

  return (
    <SocketProvider socket={socket}>
      <div className="flex h-screen bg-[#dfdfdf]">
        <Sidebar />
        <Outlet />
      </div>
    </SocketProvider>
  );
};

export default Layout;
