import { useEffect, useState } from "react";
import logo from "../assets/logo.jpeg";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  allUsersAction,
  searchUserAction,
} from "../redux/features/auth/authAction";
import { sendMessageAction } from "../redux/features/chat/sendMessageAction";
import { useSocket } from "../context/socketContext";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { ChatContainer, ChatList } from "../components";

const ChatPage = () => {
  const isAuth = JSON.parse(localStorage.getItem("isAuthenticated")) || false;
  const user = useSelector((state) => state.currUser.user);
  const { loading, users } = useSelector((state) => state.alluser);
  const { searchedUsers } = useSelector((state) => state.searchUser);
  const { chat } = useSelector((state) => state.sendMessage);
  const [selectedChat, setSelectedChat] = useState();
  const [selectedChatIndex, setSelectedChatIndex] = useState(null);
  const [message, setMessage] = useState("");
  const [chatMessage, setChatMessage] = useState([]);
  const [isloading, setisLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const socket = useSocket();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  // let typingTimer;

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
        setisLoading(false);
      });
    }
  }, [socket]);

  const selectChatHandler = (selectedUser, index) => {
    setSelectedChat(selectedUser);
    setSelectedChatIndex(index);
    if (socket) {
      setisLoading(true);
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

  // const startTyping = () => {
  //   console.log("typing start");

  //   socket.emit("typing", {
  //     sender_id: user?._id,
  //     reciever_id: selectedChat?._id,
  //   });
  // };

  // const stopTyping = () => {
  //   console.log("typing stop");
  //   socket.emit("stopTyping", {
  //     sender_id: user?._id,
  //     reciever_id: selectedChat?._id,
  //   });
  // };

  const messageChangeHandler = (e) => {
    setMessage(e.target.value);
    // startTyping();
    // clearTimeout(typingTimer);
    // typingTimer = setTimeout(() => {
    //   stopTyping();
    // }, 1000);
  };

  // useEffect(() => {
  //   return () => {
  //     clearTimeout(typingTimer);
  //   };
  // }, [typingTimer]);

  // useEffect(() => {
  //   if (socket) {
  //     socket.on("userTyping", function (data) {
  //       setIsTyping(true);
  //     });

  //     socket.on("userStoppedTyping", function (data) {
  //       setIsTyping(false);
  //     });
  //   }
  // }, [socket]);

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
        <ChatList
          users={search ? searchedUsers : users}
          selectedChatIndex={selectedChatIndex}
          onSelectChat={selectChatHandler}
        />
      </div>
      {selectedChat ? (
        <ChatContainer
          selectedChat={selectedChat}
          loading={isloading}
          chatMessage={chatMessage}
          socket={socket}
          // isTyping={isTyping}
          message={message}
          onMessageChange={messageChangeHandler}
          onMessageSubmit={messageSubmitHandler}
          // startTyping={startTyping}
          // stopTyping={stopTyping}
          handleClick={handleClick}
          handleClose={handleClose}
          anchorEl={anchorEl}
          open={open}
        />
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
