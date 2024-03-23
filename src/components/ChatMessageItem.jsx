import React from "react";
import { Avatar, Stack } from "@mui/material";
import { useSelector } from "react-redux";

const ChatMessageItem = ({ chat }) => {
  const user = useSelector((state) => state.currUser.user);

  return (
    <Stack
      direction={"row"}
      marginY={"12px"}
      alignItems={"end"}
      justifyContent={chat.senderId === user?._id ? "end" : "start"}
    >
      <Stack
        gap={2}
        className={`${
          chat.senderId === user?._id ? "items-end" : "items-start"
        }`}
      >
        <Stack direction={"row"} alignItems={"center"} gap={2}>
          <Avatar sx={{ height: "35px", width: "35px" }} />
          <Stack className={`${chat.senderId === user?._id && "order-first"}`}>
            <h3 className="text-[15px] font-semibold capitalize">
            dfdfs
            </h3>
            <span className="text-[#828282]">
              {new Date(chat.createdAt).toLocaleTimeString([], {
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
              })}
            </span>
          </Stack>
        </Stack>
        <p
          className={`${
            chat.senderId === user?._id
              ? "bg-[#0a80ff] text-white"
              : "bg-[#ebebeb] dark:bg-[#293145] dark:text-[#FFFFFFBF]"
          } rounded-[5px] py-[10px] px-5 w-fit`}
        >
          {chat.message}
        </p>
      </Stack>
    </Stack>
  );
};

export default ChatMessageItem;
