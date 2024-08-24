import React, { lazy, memo, useState } from "react";
const NewGroup = lazy(() => import("../dialogs/NewGroup"));
const NewContact = lazy(() => import("../dialogs/NewContact"));
import { Skeleton, Tooltip } from "@mui/material";
import {
  EditNoteOutlined as EditNoteOutlinedIcon,
  GroupOutlined as GroupOutlinedIcon,
} from "@mui/icons-material";
import { Search, ChatListItem } from "../";

const ChatSidebar = ({
  isGroup,
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

  const filteredChats = data?.chats?.filter((chat) =>
    isGroup ? chat.groupChat === true : chat.groupChat === false
  );

  return (
    <>
      <div
        className={`${
          isMobile
            ? "h-[calc(100vh - 70px)]"
            : " h-full border-r border-solid border-zinc-300 bg-white dark:bg-inherit dark:border-[#293145]"
        }`}
      >
        <div className="border-b border-zinc-200 dark:border-[#293145] p-5">
          <div className="flex justify-between items-center">
            <h4 className="mb-0 text-zinc-800 text-xl dark:text-white font-bold">
              {isGroup ? "Groups" : "Chats"}
            </h4>
            <div className="flex gap-2 items-center">
              <div
                className="cursor-pointer text-zinc-500 rounded-[5px] dark:text-white hover:bg-[#eeeeee] dark:hover:bg-[#293145] dark:border dark:border-solid dark:border-[#293145] px-2 py-1"
                onClick={() => setIsNewGroupDialogOpen(true)}
              >
                <Tooltip arrow title="New Group" placement="bottom">
                  <GroupOutlinedIcon />
                </Tooltip>
              </div>
              <div
                className="cursor-pointer text-zinc-500 rounded-[5px] dark:text-white hover:bg-[#eeeeee] dark:hover:bg-[#293145] dark:border dark:border-solid dark:border-[#293145] px-2 py-1"
                onClick={() => setIsNewContactDialogOpen(true)}
              >
                <Tooltip arrow title="New Chat" placement="bottom">
                  <EditNoteOutlinedIcon />
                </Tooltip>
              </div>
            </div>
          </div>
          <div className="mt-3">
            <Search />
          </div>
        </div>
        {/* users list */}
        {isLoading ? (
          <div className="flex gap-1">
            {Array.from([1, 2, 3, 4]).map((i, index) => (
              <Skeleton
                key={index}
                variant="rectangular"
                width={"100%"}
                height={"75px"}
              />
            ))}
          </div>
        ) : (
          <div className="overflow-y-auto h-[calc(100%-170px)]">
            {filteredChats?.map((chat, index) => {
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
                  isGroup={isGroup}
                  isOnline={isOnline && !chat.groupChat}
                  newMessageNotifi={newMessageNotifi}
                />
              );
            })}
          </div>
        )}
        {/* new group component */}
      </div>
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

export default memo(ChatSidebar);
