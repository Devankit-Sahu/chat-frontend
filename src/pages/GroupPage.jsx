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
  const [limit, setLimit] = useState(5);
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


  const createGroupHandler = async () => {
    dispatch(
      newGroupAction({
        groupName,
        groupCreater: user?._id,
        limit,
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
                    placeholder="Enter group name"
                    className="outline-none border-b-[1px] border-b-[#bab9b9] placeholder:text-gray-600"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                  />
                </div>
                <div className="flex gap-x-4">
                  <p className="text-black font-medium">Limit :</p>
                  <div className="mb-5">
                    <InputBox
                      type="number"
                      id="group-limit"
                      name="group-limit"
                      placeholder="Enter limit"
                      className="outline-none placeholder:text-gray-600"
                      value={limit}
                      onChange={(e) => setLimit(e.target.value)}
                    />
                  </div>
                </div>
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
