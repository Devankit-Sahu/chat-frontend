import React, { useState } from "react";
import { DialogBox } from "./";
import { Avatar, Box, Stack, Tooltip } from "@mui/material";
import {
  KeyboardArrowLeftOutlined as KeyboardArrowLeftOutlinedIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDeleteAllMessagesMutation } from "../redux/api/api";
import toast from "react-hot-toast";
import ChatDetails from "./ChatDetails";

const ChatHeader = ({ chatId, chatDetails }) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isChatDetailDialogOpen, setIsChatDetailDialogOpen] = useState(false);
  const navigate = useNavigate();
  const [mutate] = useDeleteAllMessagesMutation();

  const handleClickOpen = () => {
    setIsDeleteDialogOpen(true);
  };

  const handleClose = () => {
    setIsDeleteDialogOpen(false);
  };

  const handleChatDetailClickOpen = () => {
    setIsChatDetailDialogOpen(true);
  };

  const handleChatDetailClose = () => {
    setIsChatDetailDialogOpen(false);
  };

  const deleteChatHandler = async () => {
    try {
      const res = await mutate(chatId);

      if (res.data) {
        toast.success(res.data.message);
        navigate(`/chat/${chatId}`);
      } else {
        toast.error(res?.error?.data?.message || "Something went wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      handleClose();
    }
  };

  const navigateToHome = () => navigate("/");

  return (
    <>
      <Box className="p-4 border-b border-[#e6e6e6] dark:border-[#293145] lg:py-4 lg:px-6">
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Stack direction={"row"} alignItems={"center"}>
            <Box className="mr-2 lg:hidden" onClick={navigateToHome}>
              <KeyboardArrowLeftOutlinedIcon />
            </Box>
            <Box className="h-9 w-9 mr-3">
              <Avatar src={chatDetails?.chat?.avatar?.url} />
            </Box>
            <Box>
              <h2
                className="cursor-pointer"
                onClick={handleChatDetailClickOpen}
              >
                {chatDetails?.chat?.name}
              </h2>
              {chatDetails?.chat?.groupChat && (
                <h6 className="text-xs">
                  {chatDetails?.chat?.members.length} members
                </h6>
              )}
            </Box>
          </Stack>
          <Box
            onClick={handleClickOpen}
            className=" ml-4 px-2 py-1 text-orange-600 cursor-pointer"
          >
            <Tooltip title="Delete all chats ?" arrow>
              <DeleteIcon />
            </Tooltip>
          </Box>
        </Stack>
      </Box>
      <DialogBox
        open={isDeleteDialogOpen}
        handleClose={handleClose}
        dialogactionOnSuccess={deleteChatHandler}
        dialogtitle="Are you sure you want to delete this message?"
        dialogcontentText="This action can't be undone"
        dialogactionText1="Cancel"
        dialogactionText2="Delete"
      />
      <ChatDetails
        chatId={chatId}
        chatDetails={chatDetails}
        isChatDetailDialogOpen={isChatDetailDialogOpen}
        handleChatDetailClose={handleChatDetailClose}
      />
    </>
  );
};

export default ChatHeader;
