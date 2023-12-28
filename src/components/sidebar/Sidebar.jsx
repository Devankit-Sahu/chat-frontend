import React, { useEffect, useState } from "react";
import logo from "../../assets/logo.jpeg";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../../redux/features/auth/authAction";
import { useNavigate } from "react-router-dom";
import { Avatar, Button, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";

const Sidebar = ({ socket }) => {
  const isAuth = JSON.parse(localStorage.getItem("isAuthenticated"));
  const user = useSelector((state) => state.currUser.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [about, setAbout] = useState(user?.about || "");
  const [isEditable, setIsEditable] = useState(false);

  const handleLogout = () => {
    if (isAuth) {
      dispatch(logoutAction());
      localStorage.setItem("isAuthenticated", false);
      if (socket) {
        socket.disconnect();
      }
      navigate("/login");
    }
  };

  return (
    <>
      <div className="w-full flex flex-row justify-between items-center fixed z-40 bottom-0 bg-white shadow border-t-2 border-t-gray-300 lg:w-[5%] lg:flex lg:flex-col lg:relative lg:h-full">
        <Link to="/">
          <img src={logo} alt="" className=" mix-blend-darken w-14 h-14" />
        </Link>
        <div className="w-full">
          <ul className="flex flex-row justify-center w-full lg:flex-col lg:flex">
            <Tooltip title="chats" placement="right-end">
              <Link to="/" className="flex-grow lg:flex-grow-0 cursor-pointer">
                <p className="flex justify-center items-center mx-auto h-14 w-14 leading-[14px] rounded-lg text-[rgb(116,120,141)] hover:bg-[#7269ef1a] hover:text-[rgb(114,105,139)]">
                  <MessageOutlinedIcon />
                </p>
              </Link>
            </Tooltip>
            <Tooltip title="groups" placement="right-end">
              <Link
                to="/group"
                className="flex-grow lg:flex-grow-0 cursor-pointer"
              >
                <p className="flex justify-center items-center mx-auto h-14 w-14 leading-[14px] rounded-lg text-[rgb(116,120,141)] hover:bg-[#7269ef1a] hover:text-[rgb(114,105,139)]">
                  <GroupOutlinedIcon />
                </p>
              </Link>
            </Tooltip>
            <Tooltip title="settings" placement="right-end">
              <li className="flex-grow lg:flex-grow-0 cursor-pointer">
                <p className="flex justify-center items-center mx-auto h-14 w-14 leading-[14px] rounded-lg text-[rgb(116,120,141)] hover:bg-[#7269ef1a] hover:text-[rgb(114,105,139)]">
                  <SettingsOutlinedIcon />
                </p>
              </li>
            </Tooltip>
          </ul>
        </div>
        <div className="w-20 my-5">
          <div
            className="cursor-pointer"
            onClick={() => setToggleDropdown((prev) => !prev)}
          >
            <img
              src={logo}
              alt=""
              className="w-10 h-10 p-1 mx-auto rounded-full border-[3px] border-gray-400"
            />
          </div>

          <div
            className={`${
              toggleDropdown
                ? "absolute top-0 bottom-0 left-0 w-screen bg-transparent"
                : "hidden"
            }`}
            onClick={() => setToggleDropdown(false)}
          ></div>
          <ul
            className={`absolute left-[-116px] lg:left-[6px] translate-y-[-180px] w-40 py-2 mx-4 mb-12 text-left list-none bg-zinc-600 border-none rounded-lg shadow-lg ${
              toggleDropdown ? " scale-[1]" : " scale-0"
            } transition-all ease-in duration-[200ms]`}
          >
            <li
              onClick={() => {
                setShowProfile(true);
                setToggleDropdown(false);
              }}
            >
              <p className="cursor-pointer block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/30 dark:text-gray-100 dark:hover:bg-zinc-600/50 ltr:text-left rtl:text-right">
                Profile
              </p>
            </li>
            <li>
              <p className="cursor-pointer block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/30 dark:text-gray-100 dark:hover:bg-zinc-600/50 ltr:text-left rtl:text-right">
                Change Password
              </p>
            </li>

            <li className="my-1 border-b border-gray-100/20"></li>
            <li onClick={handleLogout}>
              <p className="cursor-pointer block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/30 dark:text-gray-100 dark:hover:bg-zinc-600/50 ltr:text-left rtl:text-right">
                Log out
              </p>
            </li>
          </ul>
        </div>
      </div>

      <div
        className={`${
          showProfile
            ? "absolute z-[100] top-0 left-0 w-[100%] h-screen bg-[rgba(0,0,0,0.2)]"
            : "hidden"
        }`}
        onClick={() => setShowProfile(false)}
      >
        ssdfdsf
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute top-0 left-0 z-[1000] w-[25%] h-screen bg-[#fff]"
        >
          <div className="flex justify-between p-5 relative">
            <h1 className="text-2xl font-bold">Profile</h1>
            <span
              onClick={() => setShowProfile(false)}
              className="cursor-pointer bg-gray-300 rounded-md flex items-center justify-center px-2"
            >
              <CloseIcon sx={{ fontSize: "20px", color: "red" }} />
            </span>
          </div>
          <div className="flex flex-col px-10">
            <div className="flex flex-col items-center justify-center border-b border-b-gray-400 pb-4">
              <div>
                <label htmlFor="avatar">
                  <Avatar
                    sx={{
                      width: "100px",
                      height: "100px",
                    }}
                    alt="profile"
                  />
                </label>
                <input
                  type="file"
                  name="avatar"
                  id="avatar"
                  className="hidden"
                />
              </div>
              <p className="text-center mt-5 capitalize text-green-400 text-xl font-semibold">
                {" "}
                {user?.username}
              </p>
            </div>
            <div className="about mt-3">
              <h6 className="mb-2">Email</h6>
              <p className="text-[#6c757d]">{user?.email}</p>
            </div>
            <div className="about mt-3">
              <div className="flex justify-between">
                <h6 className="mb-2">About</h6>
                <span onClick={() => setIsEditable((prev) => !prev)}>
                  <CreateOutlinedIcon
                    sx={{ color: "#6c757d", cursor: "pointer" }}
                  />
                </span>
              </div>
              <input
                type="text"
                value={about}
                readOnly={isEditable ? false : true}
                onChange={(e) => setAbout(e.target.value)}
                placeholder="write your about here..."
                className="text-[#6c757d] w-full outline-none border-none"
              />
            </div>
            {isEditable && (
              <div className="mt-10 flex items-center justify-center gap-x-5">
                <Button color="error" variant="outlined">
                  cancel
                </Button>
                <Button color="success" variant="contained">
                  update
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
