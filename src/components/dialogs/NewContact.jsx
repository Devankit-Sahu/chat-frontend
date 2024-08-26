import React, { useEffect, useRef, useState } from "react";
import { InputBox } from "../";
import { Avatar, Button, Dialog, IconButton } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { useTheme } from "../../context/themeContext";
import {
  useLazySearchUserQuery,
  useSendFriendRequestMutation,
} from "../../redux/api/api";
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
          .unwrap()
          .then((res) => setUsers(res?.users))
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
        "& .MuiDialog-paper": {
          bgcolor: mode === "light" ? "white" : "#1a2236",
        },
      }}
    >
      <div className="p-4 w-[300px] sm:w-[400px]">
        <div className="flex items-center justify-between">
          <h1 className="capitalize font-[700] text-base sm:text-xl text-[#0a80ff]">
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
        </div>
        <InputBox
          value={member}
          onChange={handleInputChange}
          placeholder="Search member"
          ref={inputRef}
          className="w-full outline-none bg-[rgba(241,241,241,1)] p-2 my-6 dark:bg-inherit placeholder:text-black dark:text-white dark:border-[1px] dark:border-solid dark:border-[#293145] dark:placeholder:text-white/50"
        />
        {users.length > 0 &&
          users?.map((user, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-2 dark:text-white cursor-pointer hover:bg-[#262b3c]"
            >
              <div className="flex gap-6 items-center">
                <Avatar
                  src={user?.avatar}
                  sx={{
                    width: {
                      xs: 30,
                      sm: "40px",
                    },
                    height: {
                      xs: 30,
                      sm: "40px",
                    },
                  }}
                />
                <p>{user.username}</p>
              </div>
              {user.isFreindRequestExist ? (
                <Button onClick={() => deleteRequestHandler()}>Pending</Button>
              ) : (
                <Button onClick={() => sendRequestHandler(user._id)}>
                  send
                </Button>
              )}
            </div>
          ))}
      </div>
    </Dialog>
  );
};

export default NewContact;
