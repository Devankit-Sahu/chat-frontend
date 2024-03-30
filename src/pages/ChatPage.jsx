import { ChatBox, ChatHeader } from "../components";
import SendMessageForm from "../components/SendMessageForm";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useSocket } from "../context/socketContext";
import { Layout, FileMenu } from "../components";
import {
  useGetAllMessagesQuery,
  useGetChatDetailsQuery,
} from "../redux/api/api";
import {
  NEW_MESSAGE,
  NEW_MESSAGE_RECIEVED,
  TYPING_START,
  TYPING_STOP,
} from "../constants/constants";
import { useSocketEvent } from "../hooks/useSocketEventHook";
import { removeNewMessageNotification } from "../redux/features/notification/notificationSlice";

const ChatPage = () => {
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
    }, 1000);
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
    <>
      <ChatHeader chatId={chatId} chatDetails={chatDetails} />
      <ChatBox
        chatMessages={[...(data?.messages || []), ...chatMessages]}
        isLoading={isLoading}
        userTyping={userTyping}
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
    </>
  );
};

export default Layout()(ChatPage);
