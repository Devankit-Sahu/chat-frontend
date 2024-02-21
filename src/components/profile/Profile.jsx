import React, { useEffect, useState } from "react";
import { Avatar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import { Button, Tooltip } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  changeDetailsAction,
  currentUserDetailsAction,
} from "../../redux/features/auth/authAction";

const Profile = ({
  showProfile,
  setShowProfile,
  user,
  isEditable,
  setIsEditable,
}) => {
  const { isChanged } = useSelector((state) => state.changeDetails);
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [about, setAbout] = useState("");
  const dispatch = useDispatch();

  const updateDetailsHandler = async () => {
    dispatch(changeDetailsAction({ about, username }));
  };

  const handleFileChange = (e) => {
    setAvatar(e.target.files[0]);
  };

  useEffect(() => {
    if (isChanged) {
      dispatch(currentUserDetailsAction());
      setIsEditable(false);
    }
  }, [dispatch, isChanged]);

  useEffect(() => {
    if (user) {
      setAbout(user.about);
      setUsername(user.username);
    }
  }, [user]);

  return (
    <div
      className={`absolute top-0 z-10 h-full w-screen transition-all duration-300 ease-in-out bg-[rgba(0,0,0,0.2)] ${
        showProfile ? "left-0" : "-left-[100rem]"
      }`}
      onClick={() => setShowProfile(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full md:w-[350px] bg-white h-full"
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
            <div className="relative">
              <Avatar
                src={user && user?.avatar?.url}
                sx={{
                  width: "100px",
                  height: "100px",
                  cursor: "pointer",
                }}
                alt="profile"
              />
              <label htmlFor="avatar" className="absolute top-0 right-[-25px]">
                <Tooltip title="wanna update avatar ?">
                  <CreateOutlinedIcon
                    sx={{ color: "#6c757d", cursor: "pointer" }}
                  />
                </Tooltip>
              </label>
              <input
                type="file"
                name="avatar"
                id="avatar"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
            <input
              disabled={isEditable ? false : true}
              className={`text-center mt-5 capitalize text-green-400 text-xl font-semibold outline-none ${
                isEditable
                  ? "border-[1px] border-solid border-green-400"
                  : "border-none"
              }`}
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="about mt-3">
            <h6 className="mb-2">Email</h6>
            <p className="text-[#6c757d]">{user?.email}</p>
          </div>
          <div className="about mt-3">
            <h6 className="mb-2">About</h6>
            <textarea
              type="text"
              value={about}
              disabled={isEditable ? false : true}
              rows="4"
              onChange={(e) => setAbout(e.target.value)}
              placeholder="write your about here..."
              className={`text-[#6c757d] w-full outline-none ${
                isEditable
                  ? "border-[1px] border-solid border-green-400"
                  : "border-none"
              }`}
            />
          </div>
          {isEditable ? (
            <>
              <Button
                onClick={updateDetailsHandler}
                color="success"
                variant="outlined"
              >
                update
              </Button>
              <Button
                onClick={() => {
                  setIsEditable(false);
                  setUsername(user.username);
                  setAbout(user.about);
                }}
                color="success"
                variant="outlined"
              >
                cancel
              </Button>
            </>
          ) : (
            <Button
              color="success"
              variant="outlined"
              onClick={() => setIsEditable(true)}
            >
              Edit Details
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
