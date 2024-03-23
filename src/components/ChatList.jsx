import React from "react";
import ChatListItem from "./ChatListItem";
import { Skeleton, Stack } from "@mui/material";
import { useSelector } from "react-redux";

const ChatList = () => {
  const { chats, isLoading } = useSelector((state) => state.chats);

  return (
    <>
      {isLoading ? (
        <Stack gap={1}>
          {Array.from([1, 2, 3, 4]).map((i, index) => (
            <Skeleton
              key={index}
              variant="rectangular"
              width={"100%"}
              height={"75px"}
            />
          ))}
        </Stack>
      ) : (
        <Stack className="overflow-y-auto h-[calc(100%-170px)]">
          {chats?.map((chat, index) => (
            <ChatListItem key={index} chat={chat} />
          ))}
        </Stack>
      )}
    </>
  );
};

export default ChatList;
