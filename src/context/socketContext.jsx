import React, { createContext, useContext, useEffect, useMemo } from "react";
import { io } from "socket.io-client";
import { backend_url } from "../config/config";

const SocketContext = createContext(null);

let socketInstance = null;

const getSocket = () => {
  if (!socketInstance) {
    socketInstance = io(backend_url, { withCredentials: true });
  }
  return socketInstance;
};

export const SocketProvider = ({ children, user }) => {
  const socket = useMemo(() => getSocket(), []);

  useEffect(() => {
    if (!socket) {
      socket.connect();
    }

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [socket]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export const useSocket = () => {
  return useContext(SocketContext);
};
