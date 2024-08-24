import React, { useRef, useState } from "react";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Alert, Button, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Loader, InputBox } from "../components";

const ChangePasswordPage = () => {
  const { loading, message, error } = useSelector((state) => state.changePass);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changePasswordHandler = () => {
    if (oldPassword && newPassword) {
      // dispatch(changePasswordAction({ oldPassword, newPassword }));
      setOldPassword("");
      setNewPassword("");
    }
  };

  return (
    <div className="w-screen h-screen bg-gray-300 relative">
      {loading && (
        <div className="absolute top-0 left-0 bottom-0 w-full bg-[rgba(0,0,0,0.2)] flex flex-col items-center justify-center">
          <Loader className="border-t-4 border-t-[#000] w-40 h-40" />
          <p className="mt-4">Please wait for a while...</p>
        </div>
      )}
      <div className="flex items-center h-full w-full justify-center">
        <div className="w-[500px] p-10 flex flex-col bg-[#fff]">
          <p
            onClick={() => {
              navigate("/");
            }}
            className="bg-[rgba(0,0,0,0.3)] w-8 h-8 rounded-[10px] flex items-center justify-center"
          >
            <IoArrowBackOutline size={23} />
          </p>
          <h1 className="mb-5 text-3xl uppercase text-center">
            Change password
          </h1>
          <p className="mb-2">
            {error && <Alert severity="error">{error}</Alert>}
          </p>
          <p className="mb-2">
            {message && <Alert severity="success">{message}</Alert>}
          </p>
          <PasswordInputWithToggle
            label="Old password"
            id="oldPassword"
            name="oldPassword"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <PasswordInputWithToggle
            label="New password"
            value={newPassword}
            id="newPassword"
            name="newPassword"
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <p className="cursor-pointer text-blue-400 hover:underline mb-3">
            Forget password ?
          </p>
          <div className="flex justify-end gap-5">
            <Button
              color="error"
              variant="contained"
              onClick={() => {
                navigate("/");
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={changePasswordHandler}
            >
              Change
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordPage;

const PasswordInputWithToggle = ({ label, id, name, value, onChange }) => {
  const inputRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (inputRef.current.type === "password") {
      setIsVisible(true);
      inputRef.current.type = "text";
    } else {
      setIsVisible(false);
      inputRef.current.type = "password";
    }
  };

  return (
    <div className="relative mb-3">
      <InputBox
        labelName={label}
        labelClassName="text-black font-[500]"
        id={id}
        name={name}
        ref={inputRef}
        type="password"
        value={value}
        onChange={onChange}
        className="w-full bg-transparent h-10 outline-none rounded-lg border-[1px] border-solid border-black/35 px-3 mt-2"
      />
      <IconButton
        sx={{
          flex: ".1",
          color: "black",
          position: "absolute",
          right: 0,
          top: 30,
        }}
        onClick={toggleVisibility}
      >
        {isVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
      </IconButton>
    </div>
  );
};
