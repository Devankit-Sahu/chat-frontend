import React, { useState } from "react";
import { Avatar, Tooltip } from "@mui/material";
import { ChatBox, InputBox } from "../";
import SendIcon from "@mui/icons-material/Send";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useDispatch } from "react-redux";
import {
  deleteChatsAction,
  sendMessageAction,
} from "../../redux/features/chat/sendMessageAction";
import DeleteIcon from "@mui/icons-material/Delete";

const ChatContainer = ({
  setIsChatSelected,
  selectedUser,
  loading,
  chatMessage,
  user,
}) => {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  const messageChangeHandler = (e) => {
    setMessage(e.target.value);
  };

  const messageSubmitHandler = (e) => {
    e.preventDefault();
    if (message) {
      dispatch(
        sendMessageAction({
          message,
          sender_id: user?._id,
          reciever_id: selectedUser?._id,
        })
      );
      setMessage("");
    }
  };

  const deleteChatHandler = () => {
    dispatch(
      deleteChatsAction({
        sender_id: user?._id,
        reciever_id: selectedUser?._id,
      })
    );
  };

  return (
    <div className="w-full md:w-[calc(100%-400px)] h-full relative">
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
                <KeyboardArrowLeftOutlinedIcon />
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
        selectedUser={selectedUser}
        loading={loading}
        chatMessage={chatMessage}
      />
      <form method="post" onSubmit={messageSubmitHandler}>
        <div className="flex items-center justify-between h-[10vh] px-10 border-t border-zinc-400 bg-[#fff]">
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
