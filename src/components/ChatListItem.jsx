import React, { memo, useEffect, useState } from "react";
import { Avatar, AvatarGroup, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { useSocket } from "../context/socketContext";
import { useSelector } from "react-redux";

const ChatListItem = ({ chat }) => {
  const user = useSelector((state) => state.currUser.user);
  const [newMessage, setNewMessage] = useState("");
  const [newMessageCount, setNewMessageCount] = useState(0);
  const [chatId, setChatId] = useState("");
  const [createdAt, setCreatedAt] = useState("");

  return (
    <Link to={`/${chat._id}`}>
      <Box
        display={"flex"}
        alignItems={"center"}
        gap={"10px"}
        className="cursor-pointer hover:bg-[#9d9da31a] border-b dark:border-[#293145]"
        paddingX={"16px"}
        paddingY={"12px"}
      >
        <Box position={"relative"}>
          {chat.groupChat ? (
            <AvatarGroup>
              <Avatar />
              <Avatar />
            </AvatarGroup>
          ) : (
            <Avatar src={chat?.profile?.url} className="w-full h-full" />
          )}
          {!chat.groupChat && user?.isOnline && (
            <div className="absolute z-50 w-2 h-2 bg-green-600 rounded-full bottom-0 right-[6px]"></div>
          )}
        </Box>
        <Box className="flex flex-col">
          <h4
            className={`${
              newMessageCount > 0 && chat._id === chatId
                ? "text-[#0a80ff]"
                : "text-black dark:text-white"
            } font-medium text-md tracking-[.2px] capitalize`}
          >
            {chat.name}
          </h4>
          <p className="text-[#969696] truncate w-full pr-3">{newMessage}</p>
        </Box>
        <Box className="flex flex-col items-end gap-2 ml-auto">
          <div
            className={`${
              newMessageCount > 0 && chat._id === chatId
                ? "w-[23px] h-[23px] flex items-center justify-center text-[15px] bg-[#0a80ff] text-white rounded-[50%]"
                : "hidden"
            }`}
          >
            {newMessageCount}
          </div>
          <span
            className={`${
              newMessageCount > 0 && chat._id === chatId
                ? "text-[#0a80ff] text-xs"
                : "hidden"
            }`}
          >
            {new Date(createdAt).toLocaleTimeString([], {
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            })}
          </span>
        </Box>
      </Box>
    </Link>
  );
};

export default memo(ChatListItem);
