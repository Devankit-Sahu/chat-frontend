import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SendIcon from "@mui/icons-material/Send";
import { Avatar } from "@mui/material";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import { useSocket } from "../../context/socketContext";
import ChatBox from "./ChatBox";
import InputBox from "../input/InputBox";
import { sendMessageAction } from "../../redux/features/chat/sendMessageAction";
import { useParams } from "react-router-dom";
import axios from "axios";

const ChatContainer = () => {
  const user = useSelector((state) => state.currUser.user);
  const { chat } = useSelector((state) => state.sendMessage);
  const [message, setMessage] = useState("");
  const [chatMessage, setChatMessage] = useState([]);
  const [selectedChat, setSelectedChat] = useState();
  const [loading, setLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const dispatch = useDispatch();
  const socket = useSocket();
  const { id } = useParams();

  useEffect(() => {
    const getUser = async () => {
      const { data } = await axios.get(`/api/v1/users/${id}`);
      console.log(data.user);
      setSelectedChat(data.user);
    };
    getUser();
  }, [id]);

  useEffect(() => {
    if (socket) {
      if (chat) {
        setChatMessage((prevChatMessages) => [...prevChatMessages, chat]);
        socket.emit("newMessage", chat);
      }
    }
  }, [socket, chat]);

  useEffect(() => {
    if (socket) {
      socket.on("receiveMessage", function (data) {
        setChatMessage((prevChatMessages) => [...prevChatMessages, data]);
      });
    }
  }, [socket]);

  useEffect(() => {
    if (socket) {
      setLoading(true);
      socket.emit("getAllChats", {
        sender_id: user?._id,
        reciever_id: selectedChat?._id,
      });
    }
  }, [socket, user, selectedChat]);

  useEffect(() => {
    if (socket) {
      socket.on("loadAllChats", function (data) {
        setChatMessage(data.chats);
        setLoading(false);
      });
    }
  }, [socket]);

  const messageSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(
      sendMessageAction({
        message,
        sender_id: user?._id,
        reciever_id: selectedChat._id,
      })
    );
    setMessage("");
  };

  let typingTimer;

  const startTyping = () => {
    console.log("typing start");

    socket.emit("typing", {
      sender_id: user?._id,
      reciever_id: selectedChat._id,
    });
  };

  const stopTyping = () => {
    console.log("typing stop");
    socket.emit("stopTyping", {
      sender_id: user?._id,
      reciever_id: selectedChat._id,
    });
  };

  const messageChangeHandler = (e) => {
    setMessage(e.target.value);
    startTyping();

    // Clear the previous typing timer
    clearTimeout(typingTimer);

    // Set a new timer for 1 second
    typingTimer = setTimeout(() => {
      stopTyping();
    }, 1000);
  };

  useEffect(() => {
    return () => {
      // Clear the typing timer when the component unmounts
      clearTimeout(typingTimer);
    };
  }, [typingTimer]);

  useEffect(() => {
    if (socket) {
      socket.on("userTyping", function (data) {
        // Handle user typing event, e.g., display a typing indicator
        setIsTyping(true);
        console.log(`User ${data.id} is typing...`);
      });

      socket.on("userStoppedTyping", function (data) {
        // Handle user stopped typing event, e.g., remove typing indicator
        setIsTyping(false);
        console.log(`User ${data.id} stopped typing.`);
      });
    }
  }, [socket]);

  // const selectChatHandler = (selectedUser) => {
  //   setSelectedChat(selectedUser);

  // };

  return (
    <div className="w-full lg:w-[70%] h-full">
      <div className="p-4 border-b border-zinc-300 lg:py-4 lg:px-6 bg-[#dce6ef]">
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
                <Avatar />
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
        isTyping={isTyping}
      />
      <form
        method="post"
        onSubmit={messageSubmitHandler}
        onFocus={startTyping}
        onBlur={stopTyping}
      >
        <div className="flex items-center justify-between h-[10vh] px-10 border-t border-zinc-400 bg-[aliceblue]">
          <div className="w-[90%] bg-[rgb(230,235,245)] h-[6vh] rounded-md">
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
            className="bg-[rgb(114,105,239)] p-2 text-white rounded cursor-pointer"
          >
            <SendIcon />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatContainer;
