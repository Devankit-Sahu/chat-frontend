import React from "react";
import { Box, Button, Stack } from "@mui/material";
import InputBox from "./InputBox";
import {
  Send as SendIcon,
  AttachFile as AttachFileIcon,
} from "@mui/icons-material";

const SendMessageForm = ({
  message,
  messageChangeHandler,
  messageSubmitHandler,
}) => {
  return (
    <form method="post" onSubmit={messageSubmitHandler}>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        height={"10vh"}
        paddingX={"40px"}
        className="border-t-[1px] border-solid border-[rgba(161,161,170,1)] dark:border-[#293145]"
      >
        <InputBox
          type="file"
          labelName={<AttachFileIcon color="info" />}
          className="hidden"
          id="attachment"
        />
        <Box className="mx-5 w-[90%] bg-[rgb(230,235,245)] dark:bg-inherit h-[6vh] rounded-md">
          <InputBox
            type="text"
            id="message-send-input"
            name="message-send-input"
            value={message}
            onChange={messageChangeHandler}
            className="w-full bg-transparent outline-none h-full px-5 placeholder:text-gray-500  dark:border dark:border-solid dark:border-[#293145]"
            placeholder="Enter your message"
          />
        </Box>
        <Button variant="contained" color="secondary" type="submit">
          <SendIcon />
        </Button>
      </Stack>
    </form>
  );
};

export default SendMessageForm;
