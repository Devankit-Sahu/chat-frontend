import React, { useState, useEffect, useRef } from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { Avatar, IconButton } from "@mui/material";
import Loader from "../loader/Loader";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

const ChatBox = ({ selectedChat, chatMessage, loading, isTyping }) => {
  const chatContainerRef = useRef(null);
  const [showScrollToBottom, setShowScrollToBottom] = useState(false);
  const scrollToBottom = () => {
    const container = chatContainerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessage]);

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
  }, [chatMessage]);

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

  return (
    <div className="relative h-[80vh] w-full overflow-hidden bg-[#f1f8ff]">
      {loading ? (
        <div className="px-8 py-3 h-full flex items-center justify-center">
          <Loader className="border-t-2 border-t-[#000] w-[60px] h-[60px]" />
        </div>
      ) : (
        <div
          className="px-8 py-3 overflow-auto h-full  transition-all duration-300 ease-in-out"
          ref={chatContainerRef}
          onScroll={handleScroll}
        >
          {showScrollToBottom && (
            <div className="absolute z-[100] bottom-[20px] right-[30px] flex justify-center mt-2">
              <IconButton
                onClick={handleScrollToBottom}
                sx={{
                  backgroundColor: "#3094e8",
                  color: "white",
                  ":hover": {
                    backgroundColor: "#5bb4fe",
                  },
                }}
              >
                <ArrowDownwardIcon />
              </IconButton>
            </div>
          )}
          {chatMessage?.map((chat, index) => (
            <div
              key={index}
              className={`p-4 max-w-[60%] flex items-start gap-2 ${
                selectedChat._id !== chat?.sender_id
                  ? "ml-auto justify-end"
                  : "mr-auto"
              }`}
            >
              <div
                className={`${
                  selectedChat._id !== chat?.sender_id ? "hidden" : "visible"
                }`}
              >
                <Avatar sx={{ height: "30px", width: "30px" }} />
              </div>
              <div
                className={`relative max-w-[90%] text-white rounded-lg  ${
                  selectedChat._id !== chat?.sender_id
                    ? "bg-[rgb(114,105,239)] rounded-tr-none"
                    : "bg-[rgb(88,195,238)] rounded-tl-none"
                } py-[10px] px-[8px]`}
              >
                <p className="w-full overflow-hidden break-words ">
                  {chat?.message}
                  {selectedChat._id !== chat?.sender_id && isTyping && (
                    <div className="visible">
                      {/* Typing indicator (you can customize this part) */}
                      <p>Typing...</p>
                    </div>
                  )}
                </p>
                <p className="text-xs text-black/80 flex items-center justify-end">
                  <AccessTimeIcon
                    sx={{ fontSize: "12px", marginRight: "3px" }}
                  />
                  <span>
                    {new Date(chat.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </p>
                <div
                  className={`absolute z-[10] border-[5px] border-transparent ${
                    selectedChat._id !== chat?.sender_id
                      ? "top-0 right-[-8px] border-t-[rgb(114,105,239)] border-l-[rgb(114,105,239)]"
                      : "top-0 left-[-8px] border-t-[rgb(88,195,238)] border-r-[rgb(88,195,238)]"
                  } `}
                ></div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChatBox;
