import React from "react";
import { Avatar, Box, Stack } from "@mui/material";
import { useSelector } from "react-redux";
import RenderAttachment from "./RenderAttachment";
import moment from "moment";

const ChatMessageItem = ({ message }) => {
  const { senderId, createdAt, content, attachments = [] } = message;
  const { user } = useSelector((state) => state.auth);
  const sameSender = senderId._id === user?._id;
  const fileFormat = (url = "") => {
    const fileExt = url.split(".").pop();

    if (fileExt === "mp4" || fileExt === "webm" || fileExt === "ogg")
      return "video";

    if (fileExt === "mp3" || fileExt === "wav") return "audio";
    if (
      fileExt === "png" ||
      fileExt === "jpg" ||
      fileExt === "jpeg" ||
      fileExt === "gif"
    )
      return "image";

    return "file";
  };

  return (
    <Stack
      direction={"row"}
      justifyContent={sameSender ? "end" : "start"}
      marginY={2}
    >
      <Stack direction={"row"} alignItems={"end"} gap={1}>
        {!sameSender && (
          <Avatar
            src={senderId?.avatar?.url}
            sx={{ width: "30px", height: "30px" }}
          />
        )}
        <Stack
          className={`${
            sameSender
              ? "bg-[#0a80ff] text-white"
              : "bg-[#ebebeb] dark:bg-[#293145] dark:text-[#FFFFFFBF]"
          } rounded-[5px] px-5 py-1 gap-1`}
        >
          <p className="max-w-[6rem] sm:max-w-[10rem] md:max-w-[15rem] lg:max-w-[30rem] break-words">
            {content}
          </p>
          {attachments.length > 0 &&
            attachments.map((attachment, index) => {
              const url = attachment.url;
              const file = fileFormat(url);
              return (
                <Box key={index}>
                  <a
                    href={url}
                    target="_blank"
                    download
                    style={{
                      color: "black",
                    }}
                  >
                    {RenderAttachment(file, url)}
                  </a>
                </Box>
              );
            })}
          <span className="text-xs ml-auto">{moment(createdAt).fromNow()}</span>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ChatMessageItem;
