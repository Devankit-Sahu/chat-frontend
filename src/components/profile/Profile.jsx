import React from "react";
import { Avatar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import { Alert, Button, Tooltip } from "@mui/material";

const Profile = ({
  showProfile,
  setShowProfile,
  user,
  handleFileChange,
  isEditable,
  setIsEditable,
  about,
  updateAboutHandler,
  avatar,
  updateAvatarHandler,
}) => {
  return (
    <div
      className="absolute z-[100] top-0 left-0 w-[100%] h-screen bg-[rgba(0,0,0,0.2)]"
      onClick={() => setShowProfile(false)}
    >
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
            <p className="text-center mt-5 capitalize text-green-400 text-xl font-semibold">
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
            <textarea
              type="text"
              value={about}
              disabled={isEditable ? false : true}
              rows="4"
              onChange={(e) => setAbout(e.target.value)}
              placeholder="write your about here..."
              className="text-[#6c757d] w-full outline-none border-none"
            />
          </div>
          {isEditable && (
            <div className="mt-10 flex items-center justify-center gap-x-5">
              <Button
                color="error"
                variant="outlined"
                onClick={() => setIsEditable(false)}
              >
                cancel
              </Button>
              <Button
                color="success"
                variant="contained"
                onClick={updateAboutHandler}
              >
                update
              </Button>
            </div>
          )}
          {avatar && (
            <div className="mt-10 flex items-center justify-center gap-x-5">
              <Button
                color="error"
                variant="outlined"
                onClick={() => setIsEditable(false)}
              >
                cancel
              </Button>
              <Button
                color="success"
                variant="contained"
                onClick={updateAvatarHandler}
              >
                update avatar
              </Button>
            </div>
          )}
        </div>
        <Alert className="absolute bottom-0 w-full" severity="error"></Alert>
      </div>
    </div>
  );
};

export default Profile;
