import React from "react";
import { Avatar } from "@mui/material";

const ChatList = ({ users, selectedChatIndex, onSelectChat }) => {
  return (
    <ul className="flex flex-col px-5 md:px-0">
      {users?.map((user, index) => (
        <li
          onClick={() => onSelectChat(user, index)}
          key={index}
          className={`flex items-center cursor-pointer ${
            selectedChatIndex === index ? "bg-[#7269ef1a]" : "bg-[#fff]"
          } hover:bg-[#7269ef1a] px-4 py-3 border-b border-[#ebebeb]`}
        >
          <div className="w-12 h-12 mr-3 flex items-center relative">
            <Avatar src={user && user?.avatar?.url} className="w-full h-full" />
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
            <span className="flex justify-center items-center text-right text-orange-400 font-bold">
              0
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ChatList;
