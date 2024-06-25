import React, { useState } from "react";
import { InputBox, Loader } from "../components";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Box, Stack } from "@mui/material";
import {
  EmailOutlined as EmailOutlinedIcon,
  LockOutlined as LockOutlinedIcon,
} from "@mui/icons-material";
import axios from "axios";
import { userExists } from "../redux/features/auth/authSlice";
import { server } from "../config/config";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("All fields required");
      return;
    }

    setIsLoading(true);

    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        `${server}/api/v1/auth/login`,
        {
          email,
          password,
        },
        config
      );
      dispatch(userExists(data.user));
      toast.success(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something Went Wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Stack direction={"row"} height={"100vh"} width={"100vw"}>
      <Box className="hidden sm:flex items-center justify-center w-1/2 bg-blue-400 bg-gradient-to-b from-[#68e7de] via-[#7b90d0] to-[#587be4]">
        <Box className="flex items-center flex-col gap-3">
          <img className="w-20" src="/logo.svg" alt="logo" />
          <h1 className="text-3xl font-semibold text-white">ChatEase</h1>
          <p className="text-base text-gray-300">Welcome to ChatEase.</p>
        </Box>
      </Box>
      <Stack
        alignItems={"center"}
        className="w-full sm:w-[50%]"
        bgcolor={"white"}
        padding={"40px"}
      >
        <h2 className="text-3xl font-bold text-center mb-6 my-5">
          Log in<span className="text-[#274BF4]">.</span>
        </h2>
        <form method="post" className="w-[80%] mt-14" onSubmit={handleLogin}>
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@gmail.com"
              className="w-full h-10 outline-none placeholder:text-gray-600"
            />
          </Stack>
          <Stack
            gap={1}
            direction={"row"}
            alignItems={"center"}
            className="my-5 border-b-[1px] border-solid border-b-[#878484]"
          >
            <LockOutlinedIcon className="text-gray-500" />
            <InputBox
              type="password"
              id="password"
              name="password"
              value={password}
              autoComplete="off"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
              className="w-full h-10  outline-none placeholder:text-gray-600"
            />
          </Stack>
          <button
            disabled={isLoading}
            className="w-full bg-blue-400 bg-gradient-to-r from-[#68e7de] via-[#7b90d0] to-[#587be4] text-white font-semibold mt-3 py-3 rounded hover:bg-blue-600 active:scale-[.9]"
          >
            {isLoading ? (
              <Loader className="border-t-2 border-t-[#fff] w-[22px] h-[22px]" />
            ) : (
              "Sign In"
            )}
          </button>
          <Box marginTop={3}>
            Don't have an account?
            <Link to="/signup" className="text-cyan-600 underline">
              Sign-Up
            </Link>
          </Box>
        </form>
      </Stack>
    </Stack>
  );
};

export default LoginPage;
