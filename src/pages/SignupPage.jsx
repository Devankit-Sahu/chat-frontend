import React, { useState } from "react";
import { InputBox, Loader } from "../components";
import backgroundImage from "../assets/bg.jpg";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Avatar, Box, Stack } from "@mui/material";
import {
  EmailOutlined as EmailOutlinedIcon,
  LockOutlined as LockOutlinedIcon,
  AccountCircleOutlined as AccountCircleOutlinedIcon,
  Info as InfoIcon,
} from "@mui/icons-material";
import toast from "react-hot-toast";
import axios from "axios";
import { server } from "../config/config";
import { userExists } from "../redux/features/auth/authSlice";

const SignupPage = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    avatar: "",
    about: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
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

  const handleSignup = async (e) => {
    e.preventDefault();
    const userData = new FormData();
    userData.append("username", user.username);
    userData.append("email", user.email);
    userData.append("password", user.password);
    userData.append("about", user.about);
    if (user.avatar) {
      userData.append("avatar", user.avatar);
    }
    setIsLoading(true);

    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const loadingToastId = toast.loading(
      `Creating account please wait for a while`
    );

    try {
      const { data } = await axios.post(
        `${server}/api/v1/auth/register`,
        userData,
        config
      );
      dispatch(userExists(data.user));
      toast.success(data.message, { id: loadingToastId });
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something Went Wrong", {
        id: loadingToastId,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Stack
      direction={"row"}
      height={"100vh"}
      width={"100vw"}
      className=" overflow-x-hidden"
    >
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
            <InfoIcon className="text-gray-500" />
            <InputBox
              type="text"
              id="about"
              name="about"
              value={user.about}
              onChange={handleUserChange}
              placeholder="about yourself"
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
              placeholder="password"
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
};

export default SignupPage;
