import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useSocket } from "../../context/socketContext";
import FileMenu from "../FileMenu";
import { removeNewMessageNotification } from "../../redux/features/notification/notificationSlice";
import ChatHeader from "./ChatHeader";
import ChatBox from "./ChatBox";
import SendMessageForm from "./SendMessageForm";
import {
  useGetAllMessagesQuery,
  useGetChatDetailsQuery,
} from "../../redux/api/api";
import { useSocketEvent } from "../../hooks/useSocketEventHook";
import {
  NEW_MESSAGE,
  NEW_MESSAGE_RECIEVED,
  TYPING_START,
  TYPING_STOP,
} from "../../constants/constants";

const ChatContainer = () => {
  const { user } = useSelector((state) => state.auth);
  const { chatId } = useParams();
  const { isLoading, data } = useGetAllMessagesQuery({ chatId });
  const { data: chatDetails } = useGetChatDetailsQuery(
    {
      chatId,
    },
    { skip: !chatId }
  );
  const [chatMessages, setChatMessages] = useState([]);
  const [fileMenuAnchor, setFileMenuAnchor] = useState(null);
  const isFileMenu = Boolean(fileMenuAnchor);
  const [content, setContent] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [userTyping, setUserTyping] = useState(false);
  const socket = useSocket();
  let typingTimeout;
  const dispatch = useDispatch();

  const messageChangeHandler = (e) => {
    setContent(e.target.value);
    if (!isTyping) {
      setIsTyping(true);
      socket.emit(TYPING_START, {
        members: chatDetails?.chat?.members
          .filter((m) => m._id !== user?._id)
          .map((m) => m._id),
        chatId,
      });
    }
    clearTimeout(typingTimeout);
    typingTimeout = setTimeout(() => {
      setIsTyping(false);
      socket.emit(TYPING_STOP, {
        members: chatDetails?.chat?.members
          .filter((m) => m._id !== user?._id)
          .map((m) => m._id),
        chatId,
      });
    }, 2000);
  };

  const messageSubmitHandler = async (e) => {
    e.preventDefault();
    if (!content) return;
    socket.emit(NEW_MESSAGE, {
      senderId: user?._id,
      chatId,
      content,
      members: chatDetails?.chat?.members.map((m) => m._id),
      createdAt: Date.now(),
    });
    setContent("");
  };

  const newMessageHandler = useCallback((data) => {
    setChatMessages((prevMessages) => [...prevMessages, data]);
  }, []);

  const typingStartHandler = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;
      setUserTyping(true);
    },
    [chatId]
  );

  const typingStopHandler = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;
      setUserTyping(false);
    },
    [chatId]
  );

  useSocketEvent(socket, {
    [NEW_MESSAGE_RECIEVED]: newMessageHandler,
    [TYPING_START]: typingStartHandler,
    [TYPING_STOP]: typingStopHandler,
  });

  const handleFileOpen = (e) => {
    setFileMenuAnchor(e.currentTarget);
  };

  const handleFileClose = () => {
    setFileMenuAnchor(null);
  };

  useEffect(() => {
    dispatch(removeNewMessageNotification(chatId));
  }, [chatId]);

  return (
    <div className="relative z-10">
      <ChatHeader
        userTyping={userTyping}
        chatId={chatId}
        chatDetails={chatDetails}
      />
      <ChatBox
        chatMessages={[...(data?.messages || []), ...chatMessages]}
        isLoading={isLoading}
      />
      <SendMessageForm
        content={content}
        messageChangeHandler={messageChangeHandler}
        messageSubmitHandler={messageSubmitHandler}
        handleFileOpen={handleFileOpen}
      />
      <FileMenu
        anchorE1={fileMenuAnchor}
        isFileMenu={isFileMenu}
        handleFileClose={handleFileClose}
        chatId={chatId}
      />
    </div>
  );
};

export default ChatContainer;
