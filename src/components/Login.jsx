import React, { useState, useEffect } from "react";
import { InputBox, Loader } from "./";
import backgroundImage from "../assets/bg.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Box, Stack } from "@mui/material";
import {
  EmailOutlined as EmailOutlinedIcon,
  LockOutlined as LockOutlinedIcon,
} from "@mui/icons-material";
import { loginAction } from "../redux/features/auth/authAction";

function Login() {
  const { isLoading, isAuth, isError } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    if ((email, password)) {
      dispatch(loginAction({ email, password }));
    }
  };

  useEffect(() => {
    if (isAuth) {
      navigate("/");
      localStorage.setItem("isAuthenticated", JSON.stringify(isAuth));
    }
    if (isError) {
      setError(isError);
      setEmail("");
      setPassword("");
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
          Log in<span className="text-[#274BF4]">.</span>
        </h2>
        {error && <Alert severity="error">{error}</Alert>}
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
          <button className="w-full bg-blue-500 text-white font-semibold mt-3 py-3 rounded hover:bg-blue-600 active:scale-[.9]">
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
}

export default Login;
