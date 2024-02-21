import React, { useState } from "react";
import DialogBox from "../dialog/DialogBox";
import { Avatar, Tooltip } from "@mui/material";
import { KeyboardArrowLeftOutlined, SearchOutlined } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";

const ChatHeader = ({
  selectedUser,
  setIsChatSelected,
  deleteChatHandler,
  open,
  handleClickOpen,
  handleClose,
}) => {
  return (
    <>
      <div className="p-4 border-b border-[#e6e6e6] lg:py-4 lg:px-6 bg-[#fff]">
        <div className="grid items-center grid-cols-12">
          <div className="col-span-8 sm:col-span-4">
            <div className="flex items-center">
              <div
                className="mr-2 lg:hidden"
                onClick={() => {
                  setIsChatSelected(false);
                }}
              >
                <KeyboardArrowLeftOutlined />
              </div>
              <div className="h-9 w-9 mr-3">
                <Avatar src={selectedUser && selectedUser?.avatar?.url} />
              </div>
              <h5 className="text-[#000] font-semibold text-[1.2rem]">
                {selectedUser?.username}
              </h5>
            </div>
          </div>
          <div className="col-span-4 sm:col-span-8">
            <ul className="flex items-center justify-end lg:gap-4">
              <li className="text-gray-500 ml-4 cursor-pointer">
                <SearchOutlined />
              </li>
              <li
                onClick={handleClickOpen}
                className=" ml-4 px-2 py-1 text-purple-600 border border-purple-400 cursor-pointer"
              >
                <Tooltip title="Delete all chats ?">
                  <DeleteIcon />
                </Tooltip>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <DialogBox
        open={open}
        handleClose={handleClose}
        dialogactionOnSuccess={deleteChatHandler}
        dialogtitle="Are you sure you want to delete this message?"
        dialogcontentText="This action can't be undone"
        dialogactionText1="Cancel"
        dialogactionText2="Delete"
      />
    </>
  );
};

export default ChatHeader;
