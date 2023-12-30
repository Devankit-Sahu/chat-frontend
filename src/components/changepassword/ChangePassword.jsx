import React, { useRef, useState } from "react";
import InputBox from "../input/InputBox";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Alert, Button, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { changePasswordAction } from "../../redux/features/auth/authAction";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../loader/Loader";

const ChangePassword = () => {
  const { loading, message, error } = useSelector((state) => state.changePass);
  const [istypeChange, setIsTypeChange] = useState(false);
  const oldPassRef = useRef(null);
  const newPassRef = useRef(null);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeIcon = (inputRef) => {
    if (inputRef.current.type === "password") {
      setIsTypeChange(true);
      inputRef.current.type = "text";
    } else {
      setIsTypeChange(false);
      inputRef.current.type = "password";
    }
  };

  const changePasswordHandler = () => {
    if (oldPassword && newPassword) {
      dispatch(changePasswordAction({ oldPassword, newPassword }));
      setOldPassword("");
      setNewPassword("");
    }
  };

  return (
    <div className="w-screen h-screen bg-gray-300 relative">
      {loading && (
        <div className="absolute top-0 left-0 bottom-0 w-full bg-[rgba(0,0,0,0.2)] flex flex-col items-center justify-center">
          <Loader className="border-t-4 border-t-[#000] w-40 h-40" />
          <p className="mt-4">please wait for a while...</p>
        </div>
      )}
      <div className="flex items-center h-full w-full justify-center">
        <div className="w-[500px] p-10 flex flex-col bg-[#fff]">
          <h1 className="mb-5 text-3xl uppercase text-center">
            Change password
          </h1>
          {error && <Alert severity="error">{error}</Alert>}
          {message && <Alert severity="success">{message}</Alert>}
          <div className="mb-3">
            <label htmlFor="oldPassword" className="text-black font-[500]">
              Old password
            </label>
            <div className="bg-gray-300 flex mt-2">
              <InputBox
                ref={oldPassRef}
                type="password"
                id="oldPassword"
                name="oldPassword"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="flex-[.9] w-full bg-transparent outline-none border-none px-3"
              />
              <IconButton
                sx={{
                  color: "black",
                  flex: ".1",
                }}
                onClick={() => changeIcon(oldPassRef)}
              >
                {istypeChange ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </IconButton>
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="newPassword" className="text-black font-[500]">
              New password
            </label>
            <div className="bg-gray-300 flex mt-2">
              <InputBox
                ref={newPassRef}
                type="password"
                id="newPassword"
                name="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="flex-[.9] w-full bg-transparent outline-none border-none px-3"
              />
              <IconButton
                sx={{
                  flex: ".1",
                  color: "black",
                }}
                onClick={() => changeIcon(newPassRef)}
              >
                {istypeChange ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </IconButton>
            </div>
          </div>
          <p className="cursor-pointer text-blue-400 hover:underline mb-3">
            Forget password ?
          </p>
          <div className="flex justify-end">
            <Button
              color="error"
              onClick={() => {
                navigate("/dashboard");
              }}
            >
              Cancel
            </Button>
            <Button color="success" onClick={changePasswordHandler}>
              Change
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
