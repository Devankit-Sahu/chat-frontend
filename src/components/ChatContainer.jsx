import { ChatBox, ChatHeader } from "../components";
import SendMessageForm from "../components/SendMessageForm";
import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useSocket } from "../context/socketContext";
import { getAllMessagesAction } from "../redux/features/chat/chatAction";

const ChatContainer = () => {
  const { chats } = useSelector((state) => state.chats);
  const { messages, isLoading } = useSelector((state) => state.allMessages);
  const user = useSelector((state) => state.currUser.user);
  const [chatMessages, setChatMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const isMobile = useMediaQuery("(max-width: 800px)");
  const { chatId } = useParams();
  const dispatch = useDispatch();
  const socket = useSocket();
  let typingTimeout = null;

  const messageChangeHandler = (e) => {
    setMessage(e.target.value);
    const chat = chats.filter((c) => c._id === chatId);
    socket.emit("TYPING_START", { members: chat[0].members });
    // Clear the previous typing timeout
    clearTimeout(typingTimeout);

    // Set a new typing timeout
    typingTimeout = setTimeout(() => {
      setIsTyping(false);
    }, 500); // Typing stops after 2 seconds of inactivity
  };

  const messageSubmitHandler = async (e) => {
    e.preventDefault();
    const chat = chats.filter((c) => c._id === chatId);
    if (message) {
      socket.emit("NEW_MESSAGE", {
        senderId: user._id,
        chatId: chat[0]._id,
        message,
        members: chat[0].members,
      });
      const messageObj = {
        senderId: user._id,
        chatId: chat[0]._id,
        message,
        members: chat[0]._id,
        createdAt: new Date().toISOString(),
      };
      setChatMessages((prevMessages) => [...prevMessages, messageObj]);
    }
  };

  useEffect(() => {
    dispatch(getAllMessagesAction({ chatId }));
  }, [dispatch, chatId]);

  useEffect(() => {
    setChatMessages(messages);
  }, [messages]);

  useEffect(() => {
    // Clear the typing timeout when component unmounts
    return () => {
      clearTimeout(typingTimeout);
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("TYPING_START", () => {
        setIsTyping(true);

        // Reset the typing timeout
        clearTimeout(typingTimeout);
        typingTimeout = setTimeout(() => {
          setIsTyping(false);
        }, 500); // Typing stops after 2 seconds of inactivity
      });
    }
  }, [socket]);

  useEffect(() => {
    if (socket) {
      socket.on("NEW_MESSAGE_RECIEVED", (data) => {
        setChatMessages((prevMessages) => [...prevMessages, data]);
      });
    }
  }, [socket]);

  useEffect(() => {
    const notifications = JSON.parse(localStorage.getItem("notifications"));

    if (notifications) {
      localStorage.setItem(
        "notifications",
        JSON.stringify(notifications.filter((notif) => notif.chatId !== chatId))
      );
    }
  }, [chatId]);

  return (
    <Box
      height={isMobile ? "calc(100% - 70px)" : "inherit"}
      width={isMobile ? "100%" : "calc(100% - 400px)"}
      className="bg-white dark:bg-inherit"
    >
      <ChatHeader />
      <ChatBox
        chatMessages={chatMessages}
        isLoading={isLoading}
        isTyping={isTyping}
      />
      <SendMessageForm
        message={message}
        messageChangeHandler={messageChangeHandler}
        messageSubmitHandler={messageSubmitHandler}
      />
    </Box>
  );
};

export default ChatContainer;
