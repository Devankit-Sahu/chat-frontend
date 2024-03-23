import React, { useEffect, useState } from "react";
import { InputBox, Loader } from "./";
import backgroundImage from "../assets/bg.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerAction } from "../redux/features/auth/authAction";
import { Alert, Avatar, Box, Stack } from "@mui/material";
import {
  EmailOutlined as EmailOutlinedIcon,
  LockOutlined as LockOutlinedIcon,
  AccountCircleOutlined as AccountCircleOutlinedIcon,
} from "@mui/icons-material";

function Signup() {
  const { isAuth, isLoading, isError } = useSelector((state) => state.auth);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    avatar: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleUserChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    setUser({
      ...user,
      avatar: selectedFile,
    });

    // Display the image preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    if (selectedFile) {
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    const userData = new FormData();
    userData.append("username", user.username);
    userData.append("email", user.email);
    userData.append("password", user.password);
    if (user.avatar) {
      userData.append("avatar", user.avatar);
    }
    if (userData) {
      dispatch(registerAction(userData));
    }
  };

  useEffect(() => {
    if (isAuth) {
      localStorage.setItem("isAuth", JSON.stringify(isAuth));
      navigate("/");
    }
    if (isError) {
      setError(isError);
    }
  }, [isAuth, navigate, isError]);

  return (
    <Stack direction={"row"} height={"100vh"} width={"100vw"}>
      <Box
        className="hidden sm:block sm:w-[50vw] bg-cover bg-center bg-no-repeat h-full"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      ></Box>
      <Stack
        alignItems={"center"}
        className="w-full sm:w-[50%]"
        bgcolor={"white"}
        padding={"40px"}
      >
        <h2 className="text-3xl font-bold text-center mb-6 my-5">
          Sign up<span className="text-[#274BF4]">.</span>
        </h2>
        {error && <Alert severity="error">{error}</Alert>}
        <form method="post" className="w-[80%] mt-14" onSubmit={handleSignup}>
          <div className="flex justify-center">
            <label htmlFor="avatar">
              <Avatar
                className="cursor-pointer"
                src={imagePreview || ""}
                sx={{ width: "80px", height: "80px" }}
              />
            </label>
            <input
              name="avatar"
              id="avatar"
              type="file"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
          <Stack
            direction={"row"}
            alignItems={"center"}
            gap={1}
            className="my-5 border-b-[1px] border-solid border-b-[#878484]"
          >
            <AccountCircleOutlinedIcon className="text-gray-500" />
            <InputBox
              type="text"
              id="username"
              name="username"
              value={user.username}
              onChange={handleUserChange}
              placeholder="username"
              className="w-full h-10 outline-none placeholder:text-gray-600"
            />
          </Stack>
          <Stack
            direction={"row"}
            alignItems={"center"}
            gap={1}
            className="my-5 border-b-[1px] border-solid border-b-[#878484]"
          >
            <EmailOutlinedIcon className="text-gray-500" />
            <InputBox
              type="email"
              id="email"
              name="email"
              value={user.email}
              onChange={handleUserChange}
              placeholder="example@gmail.com"
              className="w-full h-10 outline-none placeholder:text-gray-600"
            />
          </Stack>
          <Stack
            direction={"row"}
            alignItems={"center"}
            gap={1}
            className="my-5 border-b-[1px] border-solid border-b-[#878484]"
          >
            <LockOutlinedIcon className="text-gray-500" />
            <InputBox
              type="password"
              id="password"
              name="password"
              value={user.password}
              onChange={handleUserChange}
              autoComplete="off"
              placeholder="Enter your password"
              className="w-full h-10 outline-none placeholder:text-gray-600"
            />
          </Stack>
          <button className="w-full bg-blue-500 text-white font-semibold py-3 rounded hover:bg-blue-600 active:scale-[.9]">
            {isLoading ? (
              <Loader className="border-t-2 border-t-[#fff] w-[22px] h-[22px]" />
            ) : (
              "Sign Up"
            )}
          </button>
          <Box marginTop={2}>
            Already have an account?{" "}
            <Link to="/login" className="text-cyan-500 underline">
              Sign In
            </Link>
          </Box>
        </form>
      </Stack>
    </Stack>
  );
}

export default Signup;
