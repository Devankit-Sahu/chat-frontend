import { useEffect, useState } from "react";
import { InputBox, ChatBox } from "../components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { allUsersAction } from "../redux/features/user/alluserAction";
import SendIcon from "@mui/icons-material/Send";
import { Avatar } from "@mui/material";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import { sendMessageAction } from "../redux/features/chat/sendMessageAction";
import { useSocket } from "../context/socketContext";
import logo from "../assets/logo.png";

const ChatPage = () => {
  const isAuth = JSON.parse(localStorage.getItem("isAuthenticated")) || false;
  const user = useSelector((state) => state.currUser.user);
  const { users } = useSelector((state) => state.alluser);
  const { chat } = useSelector((state) => state.sendMessage);
  const [selectedChat, setSelectedChat] = useState();
  const [message, setMessage] = useState("");
  const [chatMessage, setChatMessage] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const socket = useSocket();

  useEffect(() => {
    if (isAuth === false) {
      navigate("/login");
    }
  }, [isAuth, navigate]);

  useEffect(() => {
    if (socket) {
      socket.on("online", function (data) {
        dispatch(allUsersAction());
      });

      socket.on("offline", function (data) {
        dispatch(allUsersAction());
      });
    }
  }, [socket, dispatch]);

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

  const selectChatHandler = (selectedUser) => {
    if (window.innerWidth < 1024) {
      setIsOpenChat(true);
    }
    setSelectedChat(selectedUser);
    if (socket) {
      setLoading(true);
      socket.emit("getAllChats", {
        sender_id: user?._id,
        reciever_id: selectedUser._id,
      });
    }
  };

  return (
    <>
      <div className="w-full h-full lg:w-[31%]  bg-[rgb(245,247,251)] border-r border-zinc-300">
        <div className="px-6 pt-6">
          <h4 className="mb-0 text-gray-700">Chats</h4>
          <div className="py-1 mt-5 mb-5 rounded bg-[rgb(230,235,245)] h-[3rem] flex items-center">
            <SearchOutlinedIcon className="text-lg text-gray-400 ml-5" />
            <input
              type="text"
              className="border-none bg-transparent outline-none w-[80%] ml-3"
              placeholder="Search user"
            />
          </div>
        </div>
        <div className="w-full h-[80%]">
          <h5 className="px-6 mb-4">Recent</h5>
          <div className="h-[calc(100%-7%)] overflow-auto">
            <ul className="flex flex-col">
              {users?.map((user, index) => (
                <li
                  className="flex items-center cursor-pointer hover:bg-[#7269ef1a] px-4 py-3"
                  key={index}
                  onClick={() => selectChatHandler(user)}
                >
                  <div className="w-12 h-12 mr-3 flex items-center relative">
                    <Avatar className="w-full h-full" />
                    {user.isOnline && (
                      <div className="absolute z-50 w-2 h-2 bg-green-600 rounded-full bottom-0 right-[6px]"></div>
                    )}
                  </div>
                  <div className="flex w-[73%] flex-col">
                    <h4 className="text-black font-medium text-md tracking-[.2px]">
                      {user.username}
                    </h4>
                    <p className="text-gray-800 truncate w-full pr-3">fdfdf</p>
                  </div>
                  <div className="flex flex-col items-end ml-auto lg:ml-0">
                    <span className="text-gray-500">05:13</span>
                    <span className=" flex justify-center items-center text-right border border-red-300 w-7 bg-red-200 rounded-[50%]">
                      10
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {selectedChat ? (
        <div className="w-full lg:w-[63%] lg:max-w-[65%] h-full">
          <div className="p-4 border-b border-zinc-300 lg:p-6 bg-[aliceblue] h-[14vh]">
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
                  <div className="flex items-center flex-col">
                    <h5 className="text-[#000] font-semibold text-[1.2rem]">
                      {selectedChat?.username}
                    </h5>
                    {selectedChat.isOnline ? (
                      <p className="text-xs font-serif mr-auto capitalize">
                        Active now
                      </p>
                    ) : (
                      <p className="text-xs font-serif mr-auto capitalize">
                        offline
                      </p>
                    )}
                  </div>
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
          />
          <form method="post" onSubmit={messageSubmitHandler}>
            <div className="flex items-center justify-between h-[10vh] px-10 border-t border-zinc-400 bg-[aliceblue]">
              <div className="w-[90%] bg-[rgb(230,235,245)] h-[6vh] rounded-md">
                <InputBox
                  type="text"
                  id="message-send-input"
                  name="message-send-input"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="bg-transparent outline-none h-full px-5 placeholder:text-gray-500 focus:border focus:border-purple-500 focus:rounded-md"
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
      ) : (
        <div className="w-full hidden lg:w-[63%] lg:h-full lg:flex lg:flex-col lg:items-center lg:justify-center">
          <img src={logo} alt="" className=" mix-blend-darken w-16 h-16" />
          <p>select a chat</p>
        </div>
      )}
    </>
  );
};

export default ChatPage;
