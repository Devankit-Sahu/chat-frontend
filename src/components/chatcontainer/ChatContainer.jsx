import React, { useState, useEffect } from "react";
import { Avatar, Tooltip } from "@mui/material";
import { ChatBox, DialogBox, InputBox } from "../";
import SendIcon from "@mui/icons-material/Send";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import AttachmentIcon from "@mui/icons-material/Attachment";
import { useDispatch } from "react-redux";
import {
  deleteChatsAction,
  sendMessageAction,
} from "../../redux/features/chat/sendMessageAction";
import DeleteIcon from "@mui/icons-material/Delete";

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
  const [attachmentPreview, setAttachmentPreview] = useState(null);
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
    // if (attachment) {
    //   dispatch(
    //     addAttachmentAction({
    //       caption,
    //       sender_id: user?._id,
    //       reciever_id: selectedChat?._id,
    //       attachment,
    //     })
    //   );
    // }
  };

  // const handleFileChange = (e) => {
  //   const selectedFile = e.target.files[0];
  //   setAttachment(selectedFile);
  //   // Display the image preview
  //   const reader = new FileReader();
  //   reader.onloadend = () => {
  //     setAttachmentPreview(reader.result);
  //   };
  //   if (selectedFile) {
  //     reader.readAsDataURL(selectedFile);
  //   }
  // };

  // const handleClickOpen = () => {
  //   // event.stopPropagation();
  //   setOpen(true);
  // };

  // const handleClose = (event) => {
  //   event.stopPropagation();
  //   setOpen(false);
  // };

  // const handleCloseFileChange = (event) => {
  //   event.stopPropagation();
  //   setOpen(false);
  //   setAttachment("");
  //   setCaption("");
  // };
  const deleteChatHandler = () => {
    dispatch(
      deleteChatsAction({
        sender_id: user?._id,
        reciever_id: selectedChat?._id,
      })
    );
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
              <li
                onClick={deleteChatHandler}
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
        {/* {attachmentPreview && (
          <>
            <div
              className="absolute left-0 top-0 z-[1000] bottom-0 w-full "
              onClick={handleClickOpen}
            >
              <div
                className="w-[25vw] rounded-md absolute left-[30px] bottom-[10px] bg-[aliceblue]"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="w-[23vw] h-[320px] mx-auto ">
                  <img
                    src={attachmentPreview}
                    className="w-full h-full object-cover"
                  />
                </div>
                <InputBox
                  type="text"
                  className="w-full py-3 border-none outline-none px-3"
                  placeholder="Write caption (optional)"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                />
                <div className="flex items-center px-4 justify-between py-2">
                  <span className="text-zinc-600 cursor-pointer">
                    <SentimentSatisfiedAltOutlinedIcon />
                  </span>
                  <button
                    type="submit"
                    className=" bg-[rgb(114,105,239)] px-2 py-1 text-white rounded cursor-pointer"
                  >
                    <SendIcon />
                  </button>
                </div>
              </div>
            </div>

            <DialogBox
              open={open}
              handleClose={handleClose}
              handleCloseFileChange={handleCloseFileChange}
              title={"Discard unsent message?"}
              contentText={Your message, including attached media, will not be sent if you leave this screen.}
              actionText1={" Discard changes"}
              actionText2={Return to media}
            />
          </>
        )} */}
        <div className="flex items-center justify-between h-[10vh] px-10 border-t border-zinc-400 bg-[#fff]">
          {/* <div className="flex-[.01] cursor-pointer text-zinc-500">
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
          </div> */}
          <div className="flex-[.92] w-[90%] bg-[rgb(230,235,245)] h-[6vh] rounded-md">
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
