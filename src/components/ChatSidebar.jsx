import React, { lazy, useEffect, useState } from "react";
const NewGroup = lazy(() => import("./NewGroup"));
const NewContact = lazy(() => import("./NewContact"));
import { ChatList, Search } from ".";
import { Box, Stack, Tooltip } from "@mui/material";
import {
  EditNoteOutlined as EditNoteOutlinedIcon,
  GroupOutlined as GroupOutlinedIcon,
} from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { searchUserAction } from "../redux/features/user/userActions";

const ChatSidebar = ({ isMobile, location }) => {
  const [isNewGroupDialogOpen, setIsNewGroupDialogOpen] = useState(false);
  const [isNewContactDialogOpen, setIsNewContactDialogOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [member, setMember] = useState("");
  const dispatch = useDispatch();

  const handleNewGroupDialogClose = () => {
    setIsNewGroupDialogOpen(false);
  };

  const handleNewChatDialogClose = () => {
    setIsNewContactDialogOpen(false);
  };

  useEffect(() => {
    const timeOut = setTimeout(() => {
      if (member) {
        console.log(member);
        dispatch(searchUserAction({ username: member }));
      }
    }, 500);
    return () => {
      clearTimeout(timeOut);
    };
  }, [member]);

  return (
    <>
      <Box
        height={isMobile ? "calc(100vh - 70px)" : "100%"}
        width={isMobile ? "100%" : "330px"}
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
          {/* search component */}
          <Search search={search} setSearch={setSearch} />
        </Box>
        {/* users list component */}
        <ChatList />
        {/* new group component */}
      </Box>
      <NewGroup
        open={isNewGroupDialogOpen}
        onclose={handleNewGroupDialogClose}
      />
      {/* new contact  */}
      <NewContact
        open={isNewContactDialogOpen}
        onclose={handleNewChatDialogClose}
        member={member}
        setMember={setMember}
      />
    </>
  );
};

export default ChatSidebar;
