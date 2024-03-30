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
import { useSocket } from "../context/socketContext";
import {
  useLazySearchUserQuery,
  useSendFriendRequestMutation,
} from "../redux/api/api";
import toast from "react-hot-toast";

const NewContact = ({ open, onclose }) => {
  const [users, setUsers] = useState([]);
  const [member, setMember] = useState("");
  const inputRef = useRef(null);
  const { mode } = useTheme();
  const [searchUser] = useLazySearchUserQuery();
  const [sendRequest] = useSendFriendRequestMutation();

  const handleInputChange = (e) => {
    setMember(e.target.value);
  };

  const sendRequestHandler = async (id) => {
    onclose();
    const { data } = await sendRequest({ reciever_id: id });
    toast.success(data?.message || "Friend request sent");
  };

  const deleteRequestHandler = () => {
    // dispatching sendRequest action
  };

  useEffect(() => {
    const timeOut = setTimeout(() => {
      if (member) {
        searchUser(member)
          .then((res) => setUsers(res?.data?.users))
          .catch((error) => console.log(error));
      }
    }, 500);
    return () => {
      clearTimeout(timeOut);
    };
  }, [member]);

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
          placeholder="Search member"
          ref={inputRef}
          className="w-full outline-none bg-[rgba(241,241,241,1)] p-2 my-6 dark:bg-inherit placeholder:text-black dark:text-white dark:border-[1px] dark:border-solid dark:border-[#293145] dark:placeholder:text-white"
        />
        {users.length > 0 &&
          users?.map((user, index) => (
            <Stack
              key={index}
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
              className="dark:text-white cursor-pointer hover:bg-[#262b3c]"
            >
              <Stack
                direction={"row"}
                gap={3}
                alignItems={"center"}
                padding={1}
              >
                <Avatar src={user?.avatar} />
                <p>{user.username}</p>
                {user.isFreindRequestExist ? (
                  <Button onClick={() => deleteRequestHandler()}>
                    Pending
                  </Button>
                ) : (
                  <Button onClick={() => sendRequestHandler(user._id)}>
                    Add Friend
                  </Button>
                )}
              </Stack>
            </Stack>
          ))}
      </Box>
    </Dialog>
  );
};

export default NewContact;
