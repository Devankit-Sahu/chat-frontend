import React, { useState, useEffect, useRef } from "react";
import Loader from "../layout/Loader";
import ChatMessageItem from "./ChatMessageItem";
import { Box, Divider } from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

const ChatBox = ({ chatMessages, isLoading }) => {
  const chatContainerRef = useRef(null);
  const [showScrollToBottom, setShowScrollToBottom] = useState(false);
  let prevDate = null;

  const scrollToBottom = () => {
    const container = chatContainerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const handleScroll = () => {
    const container = chatContainerRef.current;
    if (container) {
      const isAtBottom =
        Math.floor(container.scrollHeight - container.scrollTop) ===
        container.clientHeight;
      setShowScrollToBottom(!isAtBottom);
    }
  };

  useEffect(() => {
    const container = chatContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, [chatMessages]);

  const handleScrollToBottom = () => {
    const container = chatContainerRef.current;
    if (container) {
      container.style.scrollBehavior = "smooth";
      scrollToBottom();
      setShowScrollToBottom(false);
      setTimeout(() => {
        container.style.scrollBehavior = "auto";
      }, 500);
    }
  };

  const getFormattedDate = (date) => {
    const today = new Date();
    const messageDate = new Date(date);

    if (
      messageDate.getDate() === today.getDate() &&
      messageDate.getMonth() === today.getMonth() &&
      messageDate.getFullYear() === today.getFullYear()
    ) {
      return "Today";
    }

    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    if (
      messageDate.getDate() === yesterday.getDate() &&
      messageDate.getMonth() === yesterday.getMonth() &&
      messageDate.getFullYear() === yesterday.getFullYear()
    ) {
      return "Yesterday";
    }

    return messageDate.toDateString();
  };

  return (
    <Box className="relative h-[80vh] w-full overflow-hidden">
      {isLoading ? (
        <div className="px-8 py-3 h-full flex items-center justify-center">
          <Loader className="border-t-2 border-t-[#000] w-[60px] h-[60px]" />
        </div>
      ) : (
        <Box
          paddingX={"32px"}
          paddingY={"12px"}
          overflow={"auto"}
          height={"100%"}
          className="transition-all duration-300 ease-in-out"
          ref={chatContainerRef}
          onScroll={handleScroll}
        >
          <>
            {chatMessages.map((message, index) => {
              const currentDate = getFormattedDate(message.createdAt);
              const showDate = prevDate !== currentDate;
              prevDate = currentDate;

              return (
                <React.Fragment key={index}>
                  {showDate && (
                    <Divider className="w-full">{currentDate}</Divider>
                  )}
                  <ChatMessageItem message={message} />
                </React.Fragment>
              );
            })}
          </>

          {showScrollToBottom && (
            <div
              onClick={handleScrollToBottom}
              className="cursor-pointer bg-[#3094e8] hover:bg-[#5bb4fe] absolute z-[100] bottom-5 right-6 flex justify-center items-center p-2 rounded-full"
            >
              <ArrowDownwardIcon />
            </div>
          )}
        </Box>
      )}
    </Box>
  );
};

export default ChatBox;
