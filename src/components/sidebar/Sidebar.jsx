import React, { useEffect, useState } from "react";
import logo from "../../assets/logo.jpeg";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../../redux/features/auth/authAction";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
  
const Sidebar = ({ socket }) => {
  const isAuth = JSON.parse(localStorage.getItem("isAuthenticated"));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [toggleDropdown, setToggleDropdown] = useState(false);

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
    <div className="w-full flex flex-row justify-between items-center fixed z-40 bottom-0 bg-white shadow border-t-2 border-t-gray-300 lg:w-[5%] lg:flex lg:flex-col lg:relative lg:h-full">
      <Link to="/">
        <img src={logo} alt="" className=" mix-blend-darken w-14 h-14" />
      </Link>
      <div className="w-full">
        <ul className="flex flex-row justify-center w-full lg:flex-col lg:flex">
          <Tooltip title="chats" placement="right-end">
            <Link to="/" className="flex-grow lg:flex-grow-0 cursor-pointer">
              <p className="flex justify-center items-center mx-auto h-14 w-14 leading-[14px] rounded-lg text-[rgb(116,120,141)] hover:bg-[#7269ef1a] hover:text-[rgb(114,105,139)]">
                <PersonOutlineOutlinedIcon />
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
        <ul className="lg:block">
          <li className="relative lg:mt-4">
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

            <ul
              className={`absolute left-[-116px] lg:left-[6px] translate-y-[-180px] w-40 py-2 mx-4 mb-12 text-left list-none bg-zinc-600 border-none rounded-lg shadow-lg ${
                toggleDropdown ? " scale-[1]" : " scale-0"
              } transition-all ease-in duration-[200ms]`}
            >
              <li>
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
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
