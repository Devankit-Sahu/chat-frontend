import React, { createContext, useContext, useMemo } from "react";
import { io } from "socket.io-client";
import { deployed_backend_url } from "../config/config";

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const socket = useMemo(
    () => io(local_backend_url, { withCredentials: true }),
    []
  );
  return (
    <SocketContext.Provider value={deployed_backend_url}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  return useContext(SocketContext);
};
