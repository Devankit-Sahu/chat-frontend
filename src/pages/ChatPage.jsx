import { useEffect, useState } from "react";
import { FaFacebookMessenger } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  allUsersAction,
  searchUserAction,
} from "../redux/features/auth/authAction";
import { useSocket } from "../context/socketContext";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { ChatContainer, ChatList } from "../components";

const ChatPage = () => {
  const isAuth = JSON.parse(localStorage.getItem("isAuthenticated")) || false;
  const user = useSelector((state) => state.currUser.user);
  const { users } = useSelector((state) => state.alluser);
  const { searchedUsers } = useSelector((state) => state.searchUser);
  const { chat } = useSelector((state) => state.sendMessage);
  const [isChatSelected, setIsChatSelected] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const [selectedChatIndex, setSelectedChatIndex] = useState(null);
  const [chatMessage, setChatMessage] = useState([]);
  const [isloading, setisLoading] = useState(false);
  const [search, setSearch] = useState("");
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
      socket.on("receiveMessage", function (data) {
        setChatMessage((prevChatMessages) => [...prevChatMessages, data]);
      });
    }
  }, [socket, chat]);

  const selectChatHandler = (selUser, index) => {
    setIsChatSelected(true);
    setSelectedUser(selUser);
    setSelectedChatIndex(index);
    if (socket) {
      setisLoading(true);
      socket.emit("getAllChats", {
        sender_id: user?._id,
        reciever_id: selUser._id,
      });
    }
  };

  useEffect(() => {
    if (socket) {
      socket.on("loadAllChats", function (data) {
        setChatMessage(data.chats);
        setisLoading(false);
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
      <div
        className={`w-full md:w-[330px] h-full bg-[#fff] border-r border-zinc-300 ${
          isChatSelected && "hidden md:block"
        }`}
      >
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
      {isChatSelected ? (
        <ChatContainer
          setIsChatSelected={setIsChatSelected}
          selectedUser={selectedUser}
          loading={isloading}
          chatMessage={chatMessage}
          user={user}
        />
      ) : (
        <div className="w-[calc(100%-400px)] hidden bg-[#fff] h-full md:flex md:flex-col md:items-center md:justify-center">
          <FaFacebookMessenger className="text-5xl text-[#274BF4]" />
          <p className="text-xl my-3 font-serif">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Repellendus, laborum?
          </p>
          <p className="text-xl my-3 font-serif text-gray-500">
            select chats to read messages
          </p>
        </div>
      )}
    </>
  );
};

export default ChatPage;
