import React, { lazy, memo, useCallback, useEffect, useState } from "react";
const NewGroup = lazy(() => import("../dialogs/NewGroup"));
const NewContact = lazy(() => import("../dialogs/NewContact"));
import { Skeleton, Tooltip } from "@mui/material";
import {
  EditNoteOutlined as EditNoteOutlinedIcon,
  GroupOutlined as GroupOutlinedIcon,
} from "@mui/icons-material";
import { Search, ChatListItem } from "../";
import { useLazySearchChatQuery } from "../../redux/api/api";
import toast from "react-hot-toast";

const ChatSidebar = ({
  isMobile,
  isLoading,
  data,
  onlineUsers,
  newMessageNotification = [],
}) => {
  const [isNewGroupDialogOpen, setIsNewGroupDialogOpen] = useState(false);
  const [isNewContactDialogOpen, setIsNewContactDialogOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [searchChatQuery] = useLazySearchChatQuery();
  const [searchResults, setSearchResults] = useState([]);

  const handleNewGroupDialogClose = () => {
    setIsNewGroupDialogOpen(false);
  };

  const handleNewChatDialogClose = () => {
    setIsNewContactDialogOpen(false);
  };

  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };

  const searchResultsHandler = useCallback(() => {
    if (search) {
      searchChatQuery({ name: search })
        .unwrap()
        .then((res) => setSearchResults(res.searchedChats))
        .catch((error) => {
          toast.error(error.data.message);
          setSearchResults([]);
        });
    } else {
      setSearchResults([]);
    }
  }, [search, searchChatQuery]);

  useEffect(() => {
    let timeOut = setTimeout(searchResultsHandler, 200);
    return () => clearTimeout(timeOut);
  }, [search]);

  const chats = searchResults.length > 0 ? searchResults : data?.chats;

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
            <h4 className="mb-0 text-zinc-800 text-xl dark:text-white font-bold capitalize">
              Chats
            </h4>
            <div className="flex gap-2 items-center">
              <div
                className="cursor-pointer text-zinc-500 rounded-[5px] dark:text-white hover:bg-[#eeeeee] dark:hover:bg-[#293145] dark:border dark:border-solid dark:border-[#293145] px-2 py-1"
                onClick={() => setIsNewGroupDialogOpen(true)}
              >
                <Tooltip arrow title="Create New Group" placement="bottom">
                  <GroupOutlinedIcon />
                </Tooltip>
              </div>
              <div
                className="cursor-pointer text-zinc-500 rounded-[5px] dark:text-white hover:bg-[#eeeeee] dark:hover:bg-[#293145] dark:border dark:border-solid dark:border-[#293145] px-2 py-1"
                onClick={() => setIsNewContactDialogOpen(true)}
              >
                <Tooltip arrow title="Create New Chat" placement="bottom">
                  <EditNoteOutlinedIcon />
                </Tooltip>
              </div>
            </div>
          </div>
          <div className="mt-3">
            <Search search={search} handleInputChange={handleInputChange} />
          </div>
        </div>
        {/* users list */}
        {isLoading ? (
          <div className="flex flex-col gap-1">
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
            {chats?.map((chat, index) => {
              const { _id, members } = chat;

              const newMessageNotifi = newMessageNotification?.find(
                ({ chatId }) => chatId === _id
              );

              const isOnline = members?.some((member) =>
                onlineUsers.includes(member._id)
              );

              return (
                <ChatListItem
                  key={index}
                  chat={chat}
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
