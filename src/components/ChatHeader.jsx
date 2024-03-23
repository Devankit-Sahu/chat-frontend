import React, { lazy } from "react";
const DialogBox = lazy(() => import("./"));
import { Avatar, Box, Stack, Tooltip, Typography } from "@mui/material";
import {
  KeyboardArrowLeftOutlined as KeyboardArrowLeftOutlinedIcon,
  SearchOutlined as SearchOutlinedIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const ChatHeader = () => {
  const navigate = useNavigate();
  const deleteChatHandler = () => {};
  const navigateToHome = () => {
    navigate("/");
  };
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
              <Avatar />
              {/* <Avatar src={selectedUser && selectedUser?.avatar?.url} /> */}
            </Box>
            <h2 className="cursor-pointer">
              {/* {selectedUser?.username} */}
              fdfdfs
            </h2>
          </Stack>
          <Stack direction={"row"} alignItems={"center"}>
            <Box className="text-gray-500 ml-4 cursor-pointer">
              <SearchOutlinedIcon />
            </Box>
            <Box
              // onClick={handleClickOpen}
              className=" ml-4 px-2 py-1 text-orange-600 cursor-pointer"
            >
              <Tooltip title="Delete all chats ?" arrow>
                <DeleteIcon />
              </Tooltip>
            </Box>
          </Stack>
        </Stack>
      </Box>
      {/* <DialogBox
        open={open}
        handleClose={handleClose}
        dialogactionOnSuccess={deleteChatHandler}
        dialogtitle="Are you sure you want to delete this message?"
        dialogcontentText="This action can't be undone"
        dialogactionText1="Cancel"
        dialogactionText2="Delete"
      /> */}
    </>
  );
};

export default ChatHeader;
