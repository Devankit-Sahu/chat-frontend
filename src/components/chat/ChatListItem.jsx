import React, { memo } from "react";
import { Avatar, AvatarGroup, Box, Stack } from "@mui/material";
import { Link } from "react-router-dom";

const ChatListItem = ({ chat, isOnline, isGroup, newMessageNotifi }) => {
  return (
    <Link to={`${isGroup ? `/group/${chat._id}` : `/chat/${chat._id}`}`}>
      <Stack
        direction={"row"}
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
          {isOnline && !chat?.groupChat && (
            <div className="absolute z-50 w-2 h-2 bg-green-600 rounded-full bottom-0 right-[6px]"></div>
          )}
        </Box>
        <Box className="flex items-center justify-between w-full">
          <div>
            <h4 className="text-black dark:text-white font-medium text-md tracking-[.2px] capitalize">
              {chat.name}
            </h4>
            <p>{chat.latestMessage}</p>
          </div>
          {newMessageNotifi && (
            <span className="text-xs bg-[#0a80ff] w-7 h-7 rounded-full flex items-center justify-center">
              {newMessageNotifi.count > 99 ? "99+" : newMessageNotifi.count}
            </span>
          )}
        </Box>
      </Stack>
    </Link>
  );
};

export default memo(ChatListItem);
