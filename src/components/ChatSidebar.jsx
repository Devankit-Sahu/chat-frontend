import React, { lazy, useState } from "react";
const NewGroup = lazy(() => import("./NewGroup"));
const NewContact = lazy(() => import("./NewContact"));
import { Box, Skeleton, Stack, Tooltip } from "@mui/material";
import {
  EditNoteOutlined as EditNoteOutlinedIcon,
  GroupOutlined as GroupOutlinedIcon,
} from "@mui/icons-material";
import ChatListItem from "./ChatListItem";

const ChatSidebar = ({
  isMobile,
  isLoading,
  data,
  onlineUsers,
  newMessageNotification = [
    {
      chatId: "",
      count: 0,
    },
  ],
}) => {
  const [isNewGroupDialogOpen, setIsNewGroupDialogOpen] = useState(false);
  const [isNewContactDialogOpen, setIsNewContactDialogOpen] = useState(false);

  const handleNewGroupDialogClose = () => {
    setIsNewGroupDialogOpen(false);
  };

  const handleNewChatDialogClose = () => {
    setIsNewContactDialogOpen(false);
  };

  return (
    <>
      <Box
        height={isMobile ? "calc(100vh - 70px)" : "100%"}
        width={isMobile ? "100%" : "280px"}
        display={
          (location.pathname !== "/" && !isMobile) ||
          (location.pathname === "/" && isMobile) ||
          (location.pathname === "/" && !isMobile)
            ? "block"
            : "none"
        }
        className={`${
          !isMobile &&
          "border-r border-solid border-zinc-300 bg-white dark:bg-inherit dark:border-[#293145]"
        }`}
      >
        <Box
          padding={"20px"}
          className="border-b border-zinc-200 dark:border-[#293145]"
        >
          <Stack
            marginBottom={"10px"}
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <h4 className="mb-0 text-zinc-800 text-xl dark:text-white font-bold">
              Chats
            </h4>
            <Stack direction={"row"} gap={2} alignItems={"center"}>
              <Box
                borderRadius={"5px"}
                className="cursor-pointer text-zinc-500 dark:text-white hover:bg-[#eeeeee] dark:hover:bg-[#293145] dark:border dark:border-solid dark:border-[#293145] px-2 py-1"
                onClick={() => setIsNewGroupDialogOpen(true)}
              >
                <Tooltip arrow title="New Group" placement="bottom">
                  <GroupOutlinedIcon />
                </Tooltip>
              </Box>
              <Box
                borderRadius={"5px"}
                className="cursor-pointer text-zinc-500 dark:text-white hover:bg-[#eeeeee] dark:hover:bg-[#293145] dark:border dark:border-solid dark:border-[#293145] px-2 py-1"
                onClick={() => setIsNewContactDialogOpen(true)}
              >
                <Tooltip arrow title="New Chat" placement="bottom">
                  <EditNoteOutlinedIcon />
                </Tooltip>
              </Box>
            </Stack>
          </Stack>
        </Box>
        {/* users list */}
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
            {data?.chats?.map((chat, index) => {
              const { _id, members } = chat;
              const newMessageNotifi = newMessageNotification.find(
                ({ chatId }) => chatId === _id
              );

              const isOnline = members?.some((member) =>
                onlineUsers.includes(member)
              );

              return (
                <ChatListItem
                  key={index}
                  chat={chat}
                  isOnline={isOnline}
                  newMessageNotifi={newMessageNotifi}
                />
              );
            })}
          </Stack>
        )}
        {/* new group component */}
      </Box>
      {isNewGroupDialogOpen && (
        <NewGroup
          open={isNewGroupDialogOpen}
          onclose={handleNewGroupDialogClose}
        />
      )}
      {/* new contact  */}
      {isNewContactDialogOpen && (
        <NewContact
          open={isNewContactDialogOpen}
          onclose={handleNewChatDialogClose}
        />
      )}
    </>
  );
};

export default ChatSidebar;
