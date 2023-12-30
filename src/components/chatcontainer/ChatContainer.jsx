import React from "react";
import { Avatar, Tooltip, Menu, MenuItem } from "@mui/material";
import { ChatBox, InputBox } from "../";
import SentimentSatisfiedAltOutlinedIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
import CropOriginalOutlinedIcon from "@mui/icons-material/CropOriginalOutlined";
import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";
import SendIcon from "@mui/icons-material/Send";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import AttachmentIcon from "@mui/icons-material/Attachment";

const ChatContainer = ({
  selectedChat,
  loading,
  chatMessage,
  socket,
  // isTyping,
  message,
  onMessageChange,
  onMessageSubmit,
  // startTyping,
  // stopTyping,
  handleClick,
  handleClose,
  anchorEl,
  open,
}) => {
  return (
    <div className="w-full lg:w-[70%] h-full">
      <div className="p-4 border-b border-[#e6e6e6] lg:py-4 lg:px-6 bg-[#fff]">
        <div className="grid items-center grid-cols-12">
          <div className="col-span-8 sm:col-span-4">
            <div className="flex items-center">
              <div
                className="mr-2 lg:hidden"
                onClick={() => {
                  setIsOpenChat(false);
                }}
              >
                <KeyboardArrowLeftOutlinedIcon />
              </div>
              <div className="h-9 w-9 mr-3">
                <Avatar src={selectedChat && selectedChat?.avatar?.url} />
              </div>
              <h5 className="text-[#000] font-semibold text-[1.2rem]">
                {selectedChat?.username}
              </h5>
            </div>
          </div>
          <div className="col-span-4 sm:col-span-8">
            <ul className="flex items-center justify-end lg:gap-4">
              <li className="text-gray-500 ml-4 cursor-pointer">
                <SearchOutlinedIcon />
              </li>
              <li className="text-gray-500 ml-4 cursor-pointer">
                <CallOutlinedIcon />
              </li>
              <li className="text-gray-500 ml-4 cursor-pointer">
                <VideocamOutlinedIcon />
              </li>
            </ul>
          </div>
        </div>
      </div>
      <ChatBox
        selectedChat={selectedChat}
        loading={loading}
        chatMessage={chatMessage}
        socket={socket}
        // isTyping={isTyping}
      />
      <form
        method="post"
        onSubmit={onMessageSubmit}
        // onFocus={startTyping}
        // onBlur={stopTyping}
      >
        <div className="flex items-center justify-between h-[10vh] px-10 border-t border-zinc-400 bg-[#fff]">
          <div className="flex-[.01] cursor-pointer text-zinc-500">
            <Tooltip
              title="Attachments"
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <AttachmentIcon />
            </Tooltip>
            <Menu
              style={{ top: "-40px" }}
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleClose}>
                <div className="flex gap-x-2 relative">
                  <label
                    htmlFor="attachment"
                    className="flex gap-x-2 cursor-pointer"
                  >
                    <span className="text-gray-600">
                      <CropOriginalOutlinedIcon />
                    </span>
                    <span>Photos & videos</span>
                  </label>
                  <input
                    type="file"
                    name="attachment"
                    id="attachment"
                    className="absolute top-0 left-0 w-full opacity-0 cursor-pointer"
                  />
                </div>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <div className="flex gap-x-2 relative">
                  <label
                    htmlFor="attachment"
                    className="flex gap-x-2 cursor-pointer"
                  >
                    <span className="text-gray-600">
                      <PictureAsPdfOutlinedIcon />
                    </span>
                    <span>Documents</span>
                  </label>
                  <input
                    type="file"
                    name="attachment"
                    id="attachment"
                    className="absolute top-0 left-0 w-full opacity-0 cursor-pointer"
                  />
                </div>
              </MenuItem>
            </Menu>
          </div>
          <div className="flex-[.88] w-[90%] bg-[rgb(230,235,245)] h-[6vh] rounded-md">
            <InputBox
              type="text"
              id="message-send-input"
              name="message-send-input"
              value={message}
              onChange={onMessageChange}
              className="w-full bg-transparent outline-none h-full px-5 placeholder:text-gray-500 focus:border focus:border-purple-500 focus:rounded-md"
              placeholder="Enter your message"
            />
          </div>
          <div className="flex-[.02] cursor-pointer text-zinc-500">
            <Tooltip title="Emojis">
              <SentimentSatisfiedAltOutlinedIcon />
            </Tooltip>
          </div>
          <button
            type="submit"
            className="flex-[.03] bg-[rgb(114,105,239)] p-2 text-white rounded cursor-pointer"
          >
            <SendIcon />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatContainer;
