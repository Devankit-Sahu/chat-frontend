import React, { memo, useState } from "react";
import {
  Dialog,
  Divider,
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
import { InputBox, Loader } from "..";
import { useTheme } from "../../context/themeContext";
import toast from "react-hot-toast";
import { useMyFriendsQuery, useNewGroupMutation } from "../../redux/api/api";
import { useNavigate } from "react-router-dom";

const NewGroup = ({ open, onclose }) => {
  const [members, setMembers] = useState([]);
  const [checkedIndices, setCheckedIndices] = useState([]);
  const [groupName, setGroupName] = useState("");
  const { mode } = useTheme();
  const navigate = useNavigate();
  const { data } = useMyFriendsQuery();
  const [newGroupMutation, { isLoading }] = useNewGroupMutation();

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

  const createGroupHandler = async () => {
    if (members.length < 1) {
      toast.error("Atleast one member is required");
      return;
    }

    await newGroupMutation({
      name: groupName,
      members,
    })
      .unwrap()
      .then((res) => {
        toast.success(res?.message);
        navigate("/groups");
      })
      .catch((error) => {
        error?.data?.message.forEach((err) =>
          toast.error(err || "Something Went Wrong")
        );
      });
    onclose();
  };

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
        <div className="flex justify-between items-center">
          <h1 className="capitalize font-[700] text-base sm:text-xl text-[#0a80ff]">
            create new group
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
          id="groupName"
          name="groupName"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          className="w-full outline-none bg-[#f1f0ed] p-2 my-2 placeholder:text-black/80 text-black dark:bg-inherit dark:border-[1px] dark:border-solid dark:border-[#293145] dark:placeholder:text-white/50 dark:text-white"
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
        <div style={{ overflowY: "auto", maxHeight: "380px" }}>
          {data?.myFriends?.map((item, index) => (
            <div className="py-[10px]" key={index}>
              <div className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                  <Avatar src={item?.avatar?.url} />
                  <p className="text-black dark:text-white">{item.username}</p>
                </div>
                <Checkbox
                  id={`member-${index}`}
                  className="cursor-pointer"
                  checked={checkedIndices.includes(index)}
                  onChange={() => handleMembers(index, item._id)}
                  icon={<AddBoxIcon />}
                  checkedIcon={<IndeterminateCheckBoxIcon />}
                  sx={{
                    color: "#008394",
                    "&.Mui-checked": {
                      color: "#a31545",
                    },
                  }}
                />
              </div>
            </div>
          ))}
        </div>
        <div>
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
        </div>
      </div>
    </Dialog>
  );
};

export default memo(NewGroup);
