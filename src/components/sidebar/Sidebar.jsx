import React, { useState } from "react";
import { FaFacebookMessenger } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../../redux/features/auth/authAction";
import { useNavigate } from "react-router-dom";
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import Profile from "../profile/Profile";

const Sidebar = ({ socket }) => {
  const isAuth = JSON.parse(localStorage.getItem("isAuthenticated"));
  const user = useSelector((state) => state.currUser.user);
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
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

  return (
    <div className="w-full fixed bottom-0 h-12 flex flex-row justify-between border-t-[1px] border-solid border-t-gray-300 sm:relative sm:w-[70px] sm:h-full sm:flex-col sm:border-r-[1px] sm:border-solid sm:border-r-gray-300">
      <div className="flex items-center justify-center px-5 sm:py-5 cursor-pointer">
        <FaFacebookMessenger className="text-3xl text-[#274BF4]" />
      </div>
      <div
        className="cursor-pointer flex items-center justify-center pr-5 sm:my-5"
        onClick={() => setToggleDropdown((prev) => !prev)}
      >
        <Avatar src={user && user?.avatar?.url} alt="profile" />
      </div>
      <div
        className={`absolute top-0 h-full w-screen transition-all duration-300 ease-in-out flex items-end ${
          toggleDropdown ? "left-0" : "-left-[100rem]"
        }`}
        onClick={() => setToggleDropdown(false)}
      >
        <ul className="w-40 py-2 text-left list-none bg-zinc-600 border-none rounded-lg rounded-bl-none relative down-arrow shadow-lg mb-[74px] ml-5">
          <li
            onClick={() => {
              setShowProfile(true);
            }}
          >
            <p className="cursor-pointer block w-full px-4 py-2 text-sm hover:bg-zinc-500/60 text-gray-100 ">
              Profile
            </p>
          </li>
          <li>
            <Link to="/auth/change-password">
              <p className="cursor-pointer block w-full px-4 py-2 text-sm hover:bg-zinc-500/60 text-gray-100 ">
                Change Password
              </p>
            </Link>
          </li>

          <li className="my-1 border-b border-gray-100/20"></li>
          <li onClick={handleLogout}>
            <p className="cursor-pointer block w-full px-4 py-2 text-sm hover:bg-zinc-500/60 text-gray-100 ">
              Log out
            </p>
          </li>
        </ul>
      </div>

      {showProfile && (
        <Profile
          showProfile={showProfile}
          setShowProfile={setShowProfile}
          user={user}
          isEditable={isEditable}
          setIsEditable={setIsEditable}
        />
      )}
    </div>
  );
};

export default Sidebar;
