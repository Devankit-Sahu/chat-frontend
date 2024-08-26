import React, { useState } from "react";
import { InputBox, Loader } from "../components";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  EmailOutlined as EmailOutlinedIcon,
  LockOutlined as LockOutlinedIcon,
} from "@mui/icons-material";
import { userExists } from "../redux/features/auth/authSlice";
import toast from "react-hot-toast";
import { useSignInMutation } from "../redux/api/api";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signinMutation, { isLoading }] = useSignInMutation();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("All fields required");
      return;
    }

    await signinMutation({ email, password })
      .unwrap()
      .then((res) => {
        dispatch(userExists(res?.user));
        toast.success(res?.message);
      })
      .catch((error) => {
        toast.error(error?.data?.message || "Something Went Wrong");
      });
  };

  return (
    <section className="flex h-screen w-screen">
      <div className="hidden sm:flex items-center justify-center w-1/2 bg-blue-400 bg-gradient-to-b from-[#68e7de] via-[#7b90d0] to-[#587be4]">
        <div className="flex items-center flex-col gap-3">
          <img className="w-20" src="/logo.svg" alt="logo" />
          <h1 className="text-3xl font-semibold text-white">ChatEase</h1>
          <h2 className="text-base text-gray-300">Welcome to ChatEase.</h2>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center p-10 w-full sm:w-[50%] bg-white dark:bg-[#1a2236] text-black dark:text-white">
        <h2 className="text-center block text-2xl text-gray-300 my-2 sm:hidden">
          Welcome to <span className="text-[#274BF4]">ChatEase.</span>
        </h2>
        <h2 className="text-2xl font-medium text-center mb-3">Log in</h2>
        <form method="post" className="w-[80%]" onSubmit={handleLogin}>
          <div className="flex items-center gap-2 my-5 border-b-[1px] border-solid border-b-[#878484]">
            <EmailOutlinedIcon className="text-gray-500 dark:text-gray-300" />
            <InputBox
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@gmail.com"
              className="w-full h-10 outline-none placeholder:text-gray-600 dark:placeholder:text-gray-300 bg-transparent"
            />
          </div>
          <div className="flex items-center gap-2 my-5 border-b-[1px] border-solid border-b-[#878484]">
            <LockOutlinedIcon className="text-gray-500 dark:text-gray-300" />
            <InputBox
              type="password"
              id="password"
              name="password"
              value={password}
              autoComplete="off"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
              className="w-full h-10  outline-none placeholder:text-gray-600 dark:placeholder:text-gray-300 bg-transparent"
            />
          </div>
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
          <div className="mt-6">
            Don't have an account?
            <Link to="/signup" className="text-cyan-600 underline">
              Sign-Up
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default LoginPage;
