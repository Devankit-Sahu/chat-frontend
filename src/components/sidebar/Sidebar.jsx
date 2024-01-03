import React, { useEffect, useState } from "react";
import logo from "../../assets/logo.jpeg";
import { useDispatch, useSelector } from "react-redux";
import {
  changeAvatarAction,
  currentUserDetailsAction,
  logoutAction,
} from "../../redux/features/auth/authAction";
import { useNavigate } from "react-router-dom";
import { Avatar, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import Profile from "../profile/Profile";

const Sidebar = ({ socket }) => {
  const isAuth = JSON.parse(localStorage.getItem("isAuthenticated"));
  const user = useSelector((state) => state.currUser.user);
  const { message, loading, error } = useSelector((state) => state.changeAvt);
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [about, setAbout] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const updateAboutHandler = async () => {};
  const updateAvatarHandler = async () => {
    dispatch(changeAvatarAction({ avatar }));
  };

  const handleFileChange = (e) => {
    setAvatar(e.target.files[0]);
  };

  useEffect(() => {
    if (user) {
      setAbout(user.about);
    }
    if (message) {
      dispatch(currentUserDetailsAction());
    }
  }, [user]);

  return (
    <>
      <div className="w-full flex flex-row justify-between items-center fixed z-40 bottom-0 bg-white shadow border-t-2 border-t-gray-300 lg:w-[5%] lg:flex lg:flex-col lg:relative lg:h-full">
        <div className="flex gap-x-2 lg:block">
          <Link to="/dashboard">
            <img src={logo} alt="" className=" mix-blend-darken w-14 h-14" />
          </Link>
          <Tooltip title="chats" placement="right-end">
            <Link
              to="/dashboard"
              className="flex-grow lg:flex-grow-0 cursor-pointer"
            >
              <p className="flex justify-center items-center mx-auto h-14 w-14 leading-[14px] rounded-lg text-[rgb(116,120,141)] hover:bg-[#7269ef1a] hover:text-[rgb(114,105,139)]">
                <MessageOutlinedIcon />
              </p>
            </Link>
          </Tooltip>
        </div>
        <div className="w-20 my-5">
          <div
            className="cursor-pointer flex items-center justify-center"
            onClick={() => setToggleDropdown((prev) => !prev)}
          >
            <Avatar src={user && user?.avatar?.url} alt="profile" />
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
              <Link to="/auth/change-password">
                <p className="cursor-pointer block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/30 dark:text-gray-100 dark:hover:bg-zinc-600/50 ltr:text-left rtl:text-right">
                  Change Password
                </p>
              </Link>
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

      {showProfile && (
        <Profile
          showProfile={showProfile}
          setShowProfile={setShowProfile}
          user={user}
          handleFileChange={handleFileChange}
          isEditable={isEditable}
          setIsEditable={setIsEditable}
          about={about}
          updateAboutHandler={updateAboutHandler}
          avatar={avatar}
          updateAvatarHandler={updateAvatarHandler}
        />
      )}
    </>
  );
};

export default Sidebar;
