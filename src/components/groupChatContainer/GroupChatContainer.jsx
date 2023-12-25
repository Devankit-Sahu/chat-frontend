import React, { useEffect, useRef, useState } from "react";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { groupDetailsAction } from "../../redux/features/group/groupAction";
import SendIcon from "@mui/icons-material/Send";
import InputBox from "../input/InputBox";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Avatar,
} from "@mui/material";
import Slide from "@mui/material/Slide";
import axios from "axios";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const GroupChatContainer = () => {
  const { group } = useSelector((state) => state.groupDetails);
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [chatMessage, setChatMessage] = useState([
    {
      message:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. At, rem! dsdsdsdsdsnkdjkfdkfnjknnjknjknnsjdnsdnsjdnajdndnjdsmkmkmkkmskdskdmkm sdskdsdkjkjkjkjksdjskjdkasjdksjdksajklsjdksldjskldjskldskjdksjdk",
    },
    {
      message: "Lorem ",
    },
    {
      message: ".",
    },
  ]);
  const [open, setOpen] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  const chatContainerRef = useRef(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const selectUserHandler = (value) => {
    const isSelected = selectedUsers.some((user) => user.member_id === value);
    if (!isSelected) {
      setSelectedUsers((prevUsers) => [...prevUsers, { member_id: value }]);
    }
  };

  const messageSubmitHandler = (e) => {
    e.preventDefault();
    setMessage("");
  };

  const scrollToBottom = () => {
    const container = chatContainerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessage]);

  useEffect(() => {
    dispatch(groupDetailsAction({ group_id: id }));
  }, [dispatch, id]);

  // const getMem = async () => {
  //   const { data } = await axios.post("/api/v1/group/getmembers", {
  //     group_id: group.group._id,
  //   });
  //   setUsers(data.users);
  // };

  return (
    <div className="hidden lg:block lg:w-[calc(100%-455px)] h-full">
      <div className="p-4 border-b border-zinc-300 lg:p-6">
        <div className="grid items-center grid-cols-12">
          <div className="col-span-8 sm:col-span-4">
            <div className="flex items-center">
              <div className="mr-2 lg:hidden">
                <KeyboardArrowLeftOutlinedIcon />
              </div>
              <div className="h-9 w-9 mr-3">
                <Avatar />
              </div>
              <div className="">
                <h5 className="text-[#000] font-semibold text-[1.2rem] capitalize">
                  {group?.group?.groupName}
                </h5>
              </div>
              <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
              >
                <DialogTitle>Group Details</DialogTitle>
                <DialogContent>
                  <div className="mb-5">
                    <InputBox
                      id="group"
                      name="group"
                      placeholder="Group name"
                      className="focus:outline-none placeholder:text-gray-600"
                      value={group?.group?.groupName}
                      onChange={(e) => setGroupName(e.target.value)}
                    />
                  </div>
                  <p className="mb-3 capitalize text-black font-medium">
                    Group members
                  </p>
                  <TableContainer
                    sx={{
                      maxHeight: 200,
                      width: 450,
                      border: "1px solid",
                      borderColor: "rgba(224, 224, 224, 1)",
                    }}
                  >
                    <Table aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Select</TableCell>
                          <TableCell>Admin</TableCell>
                          <TableCell>Name</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {users?.map((user, index) => (
                          <TableRow
                            key={index}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell>
                              <InputBox
                                type="checkbox"
                                id="select-box"
                                name="select-box"
                                value={user._id}
                                checked={
                                  user?.member?.groupId === group?.group?._id
                                    ? true
                                    : false
                                }
                                onChange={(e) =>
                                  selectUserHandler(e.target.value)
                                }
                                className=""
                              />
                            </TableCell>
                            <TableCell>
                              <InputBox
                                type="checkbox"
                                id="select-box"
                                name="select-box"
                                value={user?.member[0]?.isAdmin}
                                checked={user?.member[0]?.isAdmin}
                                onChange={handleClickOpen}
                                className=""
                              />
                            </TableCell>
                            <TableCell>{u.username}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </DialogContent>
                {/* <DialogActions>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={handleClose}
                  >
                    cancel
                  </Button>
                  <Button
                    variant="outlined"
                    color="success"
                    // onClick={createGroupHandler}
                  >
                    create
                  </Button>
                </DialogActions> */}
              </Dialog>
            </div>
          </div>
          <div className="col-span-4 sm:col-span-8">
            <ul className="flex items-center justify-end lg:gap-4">
              <li className="text-gray-500 ml-4 cursor-pointer">
                <SearchOutlinedIcon />
              </li>
              <li className="text-gray-500 ml-4 cursor-pointer">
                <CallOutlinedIcon />
              </li>
              <li className="text-gray-500 ml-4 cursor-pointer">
                <VideocamOutlinedIcon />
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className=" h-[87.9vh] flex flex-col items-center justify-center">
        <h2 onClick={handleClickOpen}>No members yet</h2>
        <p onClick={getMem} className="cursor-pointer">
          Add
        </p>
      </div>

      {/* <div className="h-[76vh] w-full overflow-hidden">
        <div
          className="px-8 py-3 overflow-auto h-full  transition-all duration-300 ease-in-out"
          ref={chatContainerRef}
        >
          {chatMessage?.map((chat, index) => (
            <div
              key={index}
              className={`p-4 max-w-[60%] flex items-start gap-2 ${
                selectedChat._id !== chat?.sender_id
                  ? "ml-auto justify-end"
                  : "mr-auto"
              }`}
            >
              <div
                className={`${
                  selectedChat._id !== chat?.sender_id ? "hidden" : "visible"
                }`}
              >
                <Avatar sx={{ height: "30px", width: "30px" }} />
              </div>
              <div
                className={`relative max-w-[90%] text-white rounded-lg  ${
                  selectedChat._id !== chat?.sender_id
                    ? "bg-[rgb(114,105,239)] rounded-tr-none"
                    : "bg-[rgb(88,195,238)] rounded-tl-none"
                } py-[10px] px-[8px]`}
              >
                <p className="font-bold">Mohan</p>
                <p className="w-full overflow-hidden break-words ">
                  {chat?.message}
                </p>
                <p className="text-xs text-white/50 flex items-center justify-end">
                  <AccessTimeIcon
                    sx={{ fontSize: "12px", marginRight: "3px" }}
                  />
                  <span>
                    {new Date(chat.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </p>
                <div
                  className={`absolute z-[1000] border-[5px] border-transparent ${
                    selectedChat._id !== chat?.sender_id
                      ? "top-0 right-[-8px] border-t-[rgb(114,105,239)] border-l-[rgb(114,105,239)]"
                      : "top-0 left-[-8px] border-t-[rgb(88,195,238)] border-r-[rgb(88,195,238)]"
                  } `}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <form method="post" onSubmit={messageSubmitHandler}>
        <div className="flex items-center justify-between h-[10vh] px-10 border-t border-t-gray-400">
          <div className="w-[90%] bg-[rgb(230,235,245)] h-[6vh] rounded-md">
            <InputBox
              type="text"
              id="message-send-input"
              name="message-send-input"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="bg-transparent outline-none h-full px-5 placeholder:text-gray-500 focus:border focus:border-purple-500 focus:rounded-md"
              placeholder="Enter your message"
            />
          </div>
          <button
            type="submit"
            className="bg-[rgb(114,105,239)] p-2 text-white rounded cursor-pointer"
          >
            <SendIcon />
          </button>
        </div>
      </form> */}
    </div>
  );
};

export default GroupChatContainer;
