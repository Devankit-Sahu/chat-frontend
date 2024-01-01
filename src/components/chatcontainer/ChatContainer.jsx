import React, { useState, useEffect } from "react";
import { Avatar } from "@mui/material";
import { ChatBox, DialogBox, InputBox } from "../";
import SendIcon from "@mui/icons-material/Send";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import AttachmentIcon from "@mui/icons-material/Attachment";
import { useDispatch } from "react-redux";
import {
  addAttachmentAction,
  sendMessageAction,
} from "../../redux/features/chat/sendMessageAction";

const ChatContainer = ({
  selectedChat,
  loading,
  chatMessage,
  user,
  // isTyping,
  // startTyping,
  // stopTyping,
}) => {
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [attachment, setAttachment] = useState(null);
  const [caption, setCaption] = useState("");
  const dispatch = useDispatch();

  const messageChangeHandler = (e) => {
    setMessage(e.target.value);
    // startTyping();
    // clearTimeout(typingTimer);
    // typingTimer = setTimeout(() => {
    //   stopTyping();
    // }, 1000);
  };

  const messageSubmitHandler = (e) => {
    e.preventDefault();
    if (message) {
      dispatch(
        sendMessageAction({
          message,
          sender_id: user?._id,
          reciever_id: selectedChat?._id,
        })
      );
      setMessage("");
    }
    if (attachment) {
      dispatch(
        addAttachmentAction({
          caption,
          sender_id: user?._id,
          reciever_id: selectedChat?._id,
          attachment,
        })
      );
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    // Display the image preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setAttachment(reader.result);
    };
    if (selectedFile) {
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleClickOpen = () => {
    // event.stopPropagation();
    setOpen(true);
  };

  const handleClose = (event) => {
    event.stopPropagation();
    setOpen(false);
  };

  const handleCloseFileChange = (event) => {
    event.stopPropagation();
    setOpen(false);
    setAttachment("");
    setCaption("");
  };

  return (
    <div className="w-full lg:w-[70%] h-full relative">
      <div className="p-4 border-b border-[#e6e6e6] lg:py-4 lg:px-6 bg-[#fff]">
        <div className="grid items-center grid-cols-12">
          <div className="col-span-8 sm:col-span-4">
            <div className="flex items-center">
              <div
                className="mr-2 lg:hidden"
                // onClick={() => {
                //   setIsOpenChat(false);
                // }}
              >
                <KeyboardArrowLeftOutlinedIcon />
              </div>
              <div className="h-9 w-9 mr-3">
                <Avatar src="" />
                {/* <Avatar src={selectedChat && selectedChat?.avatar?.url} /> */}
              </div>
              <h5 className="text-[#000] font-semibold text-[1.2rem]">
                temp
                {/* {selectedChat?.username} */}
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
        // isTyping={isTyping}
      />

      <form
        method="post"
        onSubmit={messageSubmitHandler}
        // onFocus={startTyping}
        // onBlur={stopTyping}
      >
        {/* attachment selector */}
        {attachment && (
          <DialogBox
            open={open}
            handleClickOpen={handleClickOpen}
            handleClose={handleClose}
            attachment={attachment}
            caption={caption}
            setCaption={setCaption}
            handleCloseFileChange={handleCloseFileChange}
          />
        )}
        <div className="flex items-center justify-between h-[10vh] px-10 border-t border-zinc-400 bg-[#fff]">
          <div className="flex-[.01] cursor-pointer text-zinc-500">
            <label htmlFor="attachment" className="flex gap-x-2 cursor-pointer">
              <AttachmentIcon />
            </label>
            <input
              type="file"
              name="attachment"
              id="attachment"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
          <div className="flex-[.90] w-[90%] bg-[rgb(230,235,245)] h-[6vh] rounded-md">
            <InputBox
              type="text"
              id="message-send-input"
              name="message-send-input"
              value={message}
              onChange={messageChangeHandler}
              className="w-full bg-transparent outline-none h-full px-5 placeholder:text-gray-500 focus:border focus:border-purple-500 focus:rounded-md"
              placeholder="Enter your message"
            />
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
