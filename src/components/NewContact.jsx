import React, { useEffect, useRef, useState } from "react";
import InputBox from "./InputBox";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Dialog,
  Divider,
  IconButton,
  Stack,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { useTheme } from "../context/themeContext";
import { useDispatch, useSelector } from "react-redux";
import { sendRequestAction } from "../redux/features/user/userActions";
import { useSocket } from "../context/socketContext";

const NewContact = ({ open, onclose, member, setMember }) => {
  const { searchedUser, isError } = useSelector((state) => state.searchUser);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);
  const { mode } = useTheme();
  const dispatch = useDispatch();
  const socket = useSocket();

  const handleInputChange = (e) => {
    // setError(null);
    setMember(e.target.value);
  };

  const sendRequest = () => {
    // dispatch(sendRequestAction({ reciever_id: searchedUser._id }));
    socket.emit("REQUEST", { reciever_id: searchedUser._id });
    onclose();
  };

  const deleteRequest = () => {
    // dispatching sendRequest action
  };

  useEffect(() => {
    if (isError) setError(isError);
  }, [isError]);

  return (
    <Dialog
      open={open}
      onClose={onclose}
      sx={{
        ".css-1t1j96h-MuiPaper-root-MuiDialog-paper": {
          backgroundColor: mode === "light" ? "white" : "#1a2236",
        },
      }}
    >
      <Box width={400} padding={2}>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <h1 className="capitalize font-[700] text-xl text-[#0a80ff]">
            add new contact
          </h1>
          <IconButton
            onClick={onclose}
            sx={{
              ":hover": {
                backgroundColor: mode === "light" ? "#e5e5e5" : "#252d43",
              },
            }}
          >
            <CloseIcon
              className={`${mode === "light" ? "text-black" : "text-white"}`}
            />
          </IconButton>
        </Stack>
        <Divider
          sx={{
            borderColor: mode === "dark" && "#293145",
            marginTop: "5px",
          }}
        />
        <InputBox
          value={member}
          onChange={handleInputChange}
          placeholder="Search contact"
          ref={inputRef}
          className="w-full outline-none bg-[rgba(241,241,241,1)] p-2 my-6 dark:bg-inherit placeholder:text-black dark:text-white dark:border-[1px] dark:border-solid dark:border-[#293145] dark:placeholder:text-white"
        />
        {searchedUser && (
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
            className="dark:text-white"
          >
            <Stack direction={"row"} gap={3} alignItems={"center"}>
              <Avatar />
              <p>{searchedUser.username}</p>
            </Stack>
            {searchedUser?.isFriend ? (
              <Button onClick={deleteRequest}>Unfriend</Button>
            ) : (
              <Button onClick={sendRequest}>Add friend</Button>
            )}
          </Stack>
        )}
        {error && <Alert severity="error">{error}</Alert>}
      </Box>
    </Dialog>
  );
};

export default NewContact;
