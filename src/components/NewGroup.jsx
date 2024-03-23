import React, { memo, useEffect, useState } from "react";
import {
  Box,
  Dialog,
  Divider,
  Stack,
  Typography,
  Checkbox,
  Avatar,
  IconButton,
  Button,
} from "@mui/material";
import {
  AddBox as AddBoxIcon,
  IndeterminateCheckBox as IndeterminateCheckBoxIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { InputBox, Loader } from ".";
import { useTheme } from "../context/themeContext";
import { useDispatch, useSelector } from "react-redux";
import { allMyFriendsAction } from "../redux/features/user/userActions";
import { newGroupChatAction } from "../redux/features/chat/chatAction";
import { toast, Bounce } from "react-toastify";

const NewGroup = ({ open, onclose }) => {
  const { myFriends } = useSelector((state) => state.allMyFriends);
  const { isLoading, isError, message } = useSelector(
    (state) => state.newGroup
  );
  const [members, setMembers] = useState([]);
  const [checkedIndices, setCheckedIndices] = useState([]);
  const [groupName, setGroupName] = useState("");
  const { mode } = useTheme();
  const dispatch = useDispatch();

  const handleMembers = (index, item) => {
    setMembers((prev) => {
      if (prev.includes(item)) {
        return prev.filter((i) => i !== item);
      } else {
        return [...prev, item];
      }
    });
    setCheckedIndices((prev) => {
      if (prev.includes(index)) {
        return prev.filter((i) => i !== index);
      } else {
        return [...prev, index];
      }
    });
  };

  const createGroupHandler = () => {
    if (!members.length) return;
    dispatch(newGroupChatAction({ name: groupName, members }));
    onclose();
  };

  useEffect(() => {
    dispatch(allMyFriendsAction());
  }, [dispatch]);

  useEffect(() => {
    if (message)
      toast.success(message, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
  }, [message]);

  useEffect(() => {
    if (isError)
      toast.error(isError, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
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
      <Box padding={"10px"} width={"350px"}>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <h1 className="capitalize font-[700] text-xl text-[#0a80ff]">
            new group
          </h1>
          <IconButton
            onClick={onclose}
            sx={{
              ":hover": {
                backgroundColor: mode === "light" ? "black" : "#252d43",
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
          id="groupName"
          name="groupName"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          className="w-full outline-none bg-[#f1f0ed] p-2 my-2 placeholder:text-black/80 text-black dark:bg-inherit dark:border-[1px] dark:border-solid dark:border-[#293145] dark:placeholder:text-white dark:text-white"
          placeholder="Enter group name"
        />
        <Typography
          textTransform={"capitalize"}
          margin={"10px"}
          fontWeight={600}
          className="text-black dark:text-white"
        >
          members
        </Typography>
        <Divider
          sx={{
            borderColor: mode === "dark" && "#293145",
            marginTop: "5px",
          }}
        />
        <Box sx={{ overflowY: "auto", maxHeight: "380px" }}>
          {myFriends?.map((item, index) => (
            <Box paddingY={"10px"} key={index}>
              <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Stack direction={"row"} gap={1} alignItems={"center"}>
                  <Avatar src={item?.avatar?.url} />
                  <p className="text-black dark:text-white">{item.username}</p>
                </Stack>
                <Checkbox
                  id={`member-${index}`}
                  className="cursor-pointer"
                  checked={checkedIndices.includes(index)}
                  onChange={() => handleMembers(index, item._id)}
                  icon={<IndeterminateCheckBoxIcon />}
                  checkedIcon={<AddBoxIcon />}
                  sx={{
                    color: "#008394",
                    "&.Mui-checked": {
                      color: "#a31545",
                    },
                  }}
                />
              </Stack>
            </Box>
          ))}
        </Box>
        <Box>
          <Button
            onClick={createGroupHandler}
            className="w-full"
            disabled={isLoading ? true : false}
            color="success"
            variant="contained"
          >
            {isLoading ? (
              <Loader className="border-t-2 border-t-[#fff] w-[30px] h-[30px]" />
            ) : (
              "Create"
            )}
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};

export default memo(NewGroup);
