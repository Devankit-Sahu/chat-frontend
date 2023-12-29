import { useEffect, useState } from "react";
import logo from "../assets/logo.jpeg";
import { InputBox, ChatBox } from "../components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  allUsersAction,
  searchUserAction,
} from "../redux/features/auth/authAction";
import { sendMessageAction } from "../redux/features/chat/sendMessageAction";
import { useSocket } from "../context/socketContext";
import { Avatar, Button, Tooltip } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import AttachmentIcon from "@mui/icons-material/Attachment";
import SentimentSatisfiedAltOutlinedIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import CropOriginalOutlinedIcon from "@mui/icons-material/CropOriginalOutlined";
import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";

const ChatPage = () => {
  const isAuth = JSON.parse(localStorage.getItem("isAuthenticated")) || false;
  const user = useSelector((state) => state.currUser.user);
  const { users } = useSelector((state) => state.alluser);
  const { searchedUsers } = useSelector((state) => state.searchUser);
  const { chat } = useSelector((state) => state.sendMessage);
  const [selectedChat, setSelectedChat] = useState();
  const [selectedChatIndex, setSelectedChatIndex] = useState(null);
  const [message, setMessage] = useState("");
  const [chatMessage, setChatMessage] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const socket = useSocket();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  let typingTimer;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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

  const selectChatHandler = (selectedUser, index) => {
    setSelectedChat(selectedUser);
    setSelectedChatIndex(index);
    if (socket) {
      setLoading(true);
      socket.emit("getAllChats", {
        sender_id: user?._id,
        reciever_id: selectedUser._id,
      });
    }
  };

  const messageSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(
      sendMessageAction({
        message,
        sender_id: user?._id,
        reciever_id: selectedChat?._id,
      })
    );
    setMessage("");
  };

  const startTyping = () => {
    console.log("typing start");

    socket.emit("typing", {
      sender_id: user?._id,
      reciever_id: selectedChat?._id,
    });
  };

  const stopTyping = () => {
    console.log("typing stop");
    socket.emit("stopTyping", {
      sender_id: user?._id,
      reciever_id: selectedChat?._id,
    });
  };

  const messageChangeHandler = (e) => {
    setMessage(e.target.value);
    startTyping();
    clearTimeout(typingTimer);
    typingTimer = setTimeout(() => {
      stopTyping();
    }, 1000);
  };

  useEffect(() => {
    return () => {
      clearTimeout(typingTimer);
    };
  }, [typingTimer]);

  useEffect(() => {
    if (socket) {
      socket.on("userTyping", function (data) {
        setIsTyping(true);
      });

      socket.on("userStoppedTyping", function (data) {
        setIsTyping(false);
      });
    }
  }, [socket]);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      if (search !== "") {
        dispatch(searchUserAction({ username: search }));
      }
    }, 100);
    return () => {
      clearTimeout(timeOut);
    };
  }, [dispatch, search]);

  return (
    <>
      <div className="w-full h-full lg:w-[25%]  bg-[#fff] border-r border-zinc-300">
        <div className="px-6 pt-6 border-b border-zinc-200">
          <h4 className="mb-0 text-zinc-800">Chats</h4>
          <div className="py-3 mt-5 mb-5 rounded border border-[#e6e6e6] flex items-center">
            <SearchOutlinedIcon className="text-lg text-gray-400 ml-5" />
            <input
              type="text"
              className="border-none bg-transparent outline-none w-[80%] ml-3"
              placeholder="Search user"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="w-full h-[80%]">
          <div className="h-full overflow-auto">
            {search ? (
              <ul className="flex flex-col">
                {searchedUsers.length > 0 ? (
                  searchedUsers?.map((user, index) => (
                    <li
                      onClick={() => selectChatHandler(user, index)}
                      key={index}
                      className={`flex items-center cursor-pointer ${
                        selectedChatIndex === index
                          ? "bg-[#7269ef1a]"
                          : "bg-[#fff]"
                      } hover:bg-[#7269ef1a] px-4 py-3 border-b border-[#ebebeb]`}
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
                        <p className="text-gray-800 truncate w-full pr-3">
                          fdfdf
                        </p>
                      </div>
                      <div className="flex flex-col items-end ml-auto lg:ml-0">
                        <span className="text-gray-500">05:13</span>
                        <span className="flex justify-center items-center text-right text-orange-400 font-bold">
                          0
                        </span>
                      </div>
                    </li>
                  ))
                ) : (
                  <li className="flex justify-center">No users found</li>
                )}
              </ul>
            ) : (
              <ul className="flex flex-col">
                {users?.map((user, index) => (
                  <li
                    onClick={() => selectChatHandler(user, index)}
                    key={index}
                    className={`flex  -center cursor-pointer ${
                      selectedChatIndex === index
                        ? "bg-[#7269ef1a]"
                        : "bg-[#fff]"
                    } hover:bg-[#7269ef1a] px-4 py-3 border-b border-[#ebebeb]`}
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
                      <p className="text-gray-800 truncate w-full pr-3">
                        fdfdf
                      </p>
                    </div>
                    <div className="flex flex-col items-end ml-auto lg:ml-0">
                      <span className="text-gray-500">05:13</span>
                      <span className="flex justify-center items-center text-right text-orange-400 font-bold">
                        0
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
      {selectedChat ? (
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
                  onChange={messageChangeHandler}
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
      ) : (
        <div className="w-full lg:w-[70%] bg-[#fff] h-full flex flex-col items-center justify-center">
          <img src={logo} alt="" className="mix-blend-darken w-60 h-60" />
          <p className="text-xl mb-3 font-serif">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Repellendus, laborum?
          </p>
          <p className="text-xl mb-3 font-serif text-gray-500">
            select chats to read messages
          </p>
        </div>
      )}
    </>
  );
};

export default ChatPage;
