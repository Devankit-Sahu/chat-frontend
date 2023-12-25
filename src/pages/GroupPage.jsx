import React, { useEffect, useState } from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import AddIcon from "@mui/icons-material/Add";
import Slide from "@mui/material/Slide";
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
import { InputBox } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { allUsersAction } from "../redux/features/user/alluserAction";
import {
  allGroupsAction,
  newGroupAction,
} from "../redux/features/group/groupAction";
import { ChatBox } from "../components";
import { Link, Outlet } from "react-router-dom";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const GroupPage = () => {
  const { users } = useSelector((state) => state.alluser);
  const { user } = useSelector((state) => state.currUser);
  const { allGroups } = useSelector((state) => state.allGroups);
  const [open, setOpen] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(allUsersAction());
  }, [dispatch]);

  const selectUserHandler = (value) => {
    const isSelected = selectedUsers.some((user) => user.member_id === value);
    if (!isSelected) {
      setSelectedUsers((prevUsers) => [...prevUsers, { member_id: value }]);
    }
  };

  const createGroupHandler = async () => {
    dispatch(
      newGroupAction({
        groupName,
        groupCreater: user?._id,
        members: selectedUsers,
      })
    );
    setOpen(false);
  };

  useEffect(() => {
    dispatch(allGroupsAction());
  }, [dispatch]);

  return (
    <>
      <div className="w-full h-full lg:w-[380px] lg:max-w-[380px] bg-[rgb(245,247,251)]">
        <div className="px-6 pt-6">
          <div className="flex justify-between">
            <h4 className="mb-0 text-gray-700">Groups</h4>
            <div className="cursor-pointer" onClick={handleClickOpen}>
              <AddIcon />
            </div>
            <Dialog
              open={open}
              TransitionComponent={Transition}
              keepMounted
              onClose={handleClose}
              aria-describedby="alert-dialog-slide-description"
            >
              <DialogTitle>Create group</DialogTitle>
              <DialogContent>
                <div className="mb-5">
                  <InputBox
                    id="group"
                    name="group"
                    placeholder="Group name"
                    className="focus:outline-none placeholder:text-gray-600"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                  />
                </div>
                <p className="mb-3 capitalize text-black font-medium">
                  Select members
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
                              // checked={selectedUsers.includes(user._id)}
                              onChange={(e) =>
                                selectUserHandler(e.target.value)
                              }
                              className="w-5"
                            />
                          </TableCell>
                          <TableCell>{user.username}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </DialogContent>
              <DialogActions>
                <Button variant="outlined" color="error" onClick={handleClose}>
                  cancel
                </Button>
                <Button
                  variant="outlined"
                  color="success"
                  onClick={createGroupHandler}
                >
                  create
                </Button>
              </DialogActions>
            </Dialog>
          </div>
          <div className="py-1 mt-5 mb-5 rounded bg-[rgb(230,235,245)] h-[3rem] flex items-center">
            <SearchOutlinedIcon className="text-lg text-gray-400 ml-5" />
            <input
              type="text"
              className="border-none bg-transparent outline-none w-[80%] ml-3"
              placeholder="Search groups"
            />
          </div>
        </div>
        <div className="w-full h-[80%]">
          <h5 className="px-6 mb-4">Recent</h5>
          <div className="h-[calc(100%-7%)] overflow-auto">
            <ul className="flex flex-col">
              {allGroups?.map((group, index) => (
                <Link key={index} to={`/group/${group._id}`}>
                  <li
                    className="flex items-center cursor-pointer hover:bg-[#7269ef1a] px-4 py-3"
                    key={index}
                  >
                    <div className="w-12 h-12 mr-3 flex items-center">
                      <Avatar className="w-full h-full" />
                    </div>
                    <div className="flex w-[73%] flex-col">
                      <h4 className="text-black font-medium text-md tracking-[.2px]">
                        {group.groupName}
                      </h4>
                      <p className="text-gray-800 truncate w-full pr-3">
                        fdfdf
                      </p>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-gray-500">05:13</span>
                      <span className=" flex justify-center items-center text-right border border-red-300 w-7 bg-red-200 rounded-[50%]">
                        10
                      </span>
                    </div>
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default GroupPage;
