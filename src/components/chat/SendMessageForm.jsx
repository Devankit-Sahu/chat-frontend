import React from "react";
import { Button, IconButton } from "@mui/material";
import InputBox from "../InputBox";
import {
  Send as SendIcon,
  AttachFile as AttachFileIcon,
} from "@mui/icons-material";

const SendMessageForm = ({
  content,
  messageChangeHandler,
  messageSubmitHandler,
  handleFileOpen,
}) => {
  return (
    <form method="post" onSubmit={messageSubmitHandler}>
      <div className="flex items-center justify-between h-[10vh] bg-white dark:bg-[#1a2236] border-t-[1px] border-solid border-[rgba(161,161,170,1)] dark:border-[#293145] px-4">
        <IconButton onClick={handleFileOpen}>
          <AttachFileIcon color="info" />
        </IconButton>
        <div className="mx-5 w-[90%] bg-[rgb(230,235,245)] dark:bg-inherit h-[6vh] rounded-md">
          <InputBox
            type="text"
            id="message-send-input"
            name="message-send-input"
            value={content}
            onChange={messageChangeHandler}
            className="w-full bg-transparent outline-none h-full px-5 placeholder:text-gray-500  dark:border dark:border-solid dark:border-[#293145] placeholder:text-xs sm:placeholder:text-[14px]"
            placeholder="Enter your message"
          />
        </div>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#3094e8" }}
          type="submit"
        >
          <SendIcon />
        </Button>
      </div>
    </form>
  );
};

export default SendMessageForm;
