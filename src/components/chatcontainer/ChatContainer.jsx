import React, { useEffect, useState } from "react";
import { ChatBox, InputBox } from "../";
import SendIcon from "@mui/icons-material/Send";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteChatsAction,
  sendMessageAction,
} from "../../redux/features/chat/sendMessageAction";
import { useSocket } from "../../context/socketContext";
import ChatHeader from "../chatheader/ChatHeader";

const ChatContainer = ({
  setIsChatSelected,
  selectedUser,
  loading,
  chatMessage,
  setChatMessage,
  user,
}) => {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const socket = useSocket();

  const messageChangeHandler = (e) => {
    setMessage(e.target.value);
  };

  const messageSubmitHandler = async (e) => {
    e.preventDefault();
    if (message) {
      const { payload } = await dispatch(
        sendMessageAction({
          message,
          sender_id: user?._id,
          reciever_id: selectedUser?._id,
        })
      );
      setChatMessage((prevChatMessages) => [...prevChatMessages, payload]);
      if (socket) {
        socket.emit("newMessage", payload);
      }
      setMessage("");
    }
  };

  useEffect(() => {
    if (socket) {
      socket.on("receiveMessage", function (data) {
        console.log(data);
        setChatMessage((prevChatMessages) => [...prevChatMessages, data]);
      });
    }
  }, [socket]);

  return (
    <div className="w-full md:w-[calc(100%-400px)] h-full relative">
      <ChatHeader
        selectedUser={selectedUser}
        setIsChatSelected={setIsChatSelected}
        user={user}
      />
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
