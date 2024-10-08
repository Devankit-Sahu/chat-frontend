import React, { useEffect, useState } from "react";
import { InputBox, Loader } from "../components";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Avatar } from "@mui/material";
import {
  EmailOutlined as EmailOutlinedIcon,
  LockOutlined as LockOutlinedIcon,
  AccountCircleOutlined as AccountCircleOutlinedIcon,
  Info as InfoIcon,
} from "@mui/icons-material";
import toast from "react-hot-toast";
import { userExists } from "../redux/features/auth/authSlice";
import { useSignUpMutation } from "../redux/api/api";

const SignupPage = () => {
  const { user } = useSelector((state) => state.auth);
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: "",
    avatar: "",
    about: "",
  });
  const [imagePreview, setImagePreview] = useState(null);
  const dispatch = useDispatch();
  const [sinupMutation, { isLoading }] = useSignUpMutation();
  const navigate = useNavigate();

  const handleUserChange = (e) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    setUserDetails({
      ...userDetails,
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
    userData.append("username", userDetails.username);
    userData.append("email", userDetails.email);
    userData.append("password", userDetails.password);
    userData.append("about", userDetails.about);
    if (userDetails.avatar) {
      userData.append("avatar", userDetails.avatar);
    }

    if (!userDetails.username || !userDetails.email || !userDetails.password) {
      toast.error("All fields are required");
      return;
    }

    const loadingToastId = toast.loading(
      `Creating account please wait for a while`
    );

    await sinupMutation(userData)
      .unwrap()
      .then((res) => {
        dispatch(userExists(res.user));
        toast.success(res.message, { id: loadingToastId });
      })
      .catch((error) => {
        toast.error(error?.data?.message || "Something Went Wrong");
      });
  };

  useEffect(() => {
    if (user) navigate("/");
  }, [user]);

  return (
    <section className="flex h-screen w-screen overflow-x-hidden">
      <div className="hidden sm:flex items-center justify-center w-1/2 bg-blue-400 bg-gradient-to-b from-[#68e7de] via-[#7b90d0] to-[#587be4]">
        <div className="flex items-center flex-col gap-3">
          <img className="w-20" src="/logo.svg" alt="logo" />
          <h1 className="text-3xl font-semibold text-white">ChatEase</h1>
          <h2 className="text-base text-gray-300">Welcome to ChatEase.</h2>
        </div>
      </div>
      <div className="flex flex-col p-10 items-center justify-center w-full sm:w-[50%] bg-white dark:bg-[#1a2236] text-black dark:text-white">
        <h2 className="text-center block text-2xl text-gray-300 my-2 sm:hidden">
          Welcome to <span className="text-[#274BF4]">ChatEase.</span>
        </h2>
        <h2 className="text-2xl font-medium text-center mb-3">Sign up</h2>
        <form method="post" className="w-[80%]" onSubmit={handleSignup}>
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
          <div className="flex gap-2 items-center my-5 border-b-[1px] border-solid border-b-[#878484]">
            <AccountCircleOutlinedIcon className="text-gray-500 dark:text-gray-300" />
            <InputBox
              type="text"
              id="username"
              name="username"
              value={userDetails.username}
              onChange={handleUserChange}
              placeholder="username"
              className="w-full h-10 outline-none placeholder:text-gray-600 dark:placeholder:text-gray-300 bg-transparent"
            />
          </div>
          <div className="flex gap-2 items-center my-5 border-b-[1px] border-solid border-b-[#878484]">
            <EmailOutlinedIcon className="text-gray-500 dark:text-gray-300" />
            <InputBox
              type="email"
              id="email"
              name="email"
              value={userDetails.email}
              onChange={handleUserChange}
              placeholder="example@gmail.com"
              className="w-full h-10 outline-none placeholder:text-gray-600 dark:placeholder:text-gray-300 bg-transparent"
            />
          </div>
          <div className="flex gap-2 items-center my-5 border-b-[1px] border-solid border-b-[#878484]">
            <InfoIcon className="text-gray-500 dark:text-gray-300" />
            <InputBox
              type="text"
              id="about"
              name="about"
              value={userDetails.about}
              onChange={handleUserChange}
              placeholder="about yourself"
              className="w-full h-10 outline-none placeholder:text-gray-600 dark:placeholder:text-gray-300 bg-transparent"
            />
          </div>
          <div className="flex gap-2 items-center my-5 border-b-[1px] border-solid border-b-[#878484]">
            <LockOutlinedIcon className="text-gray-500 dark:text-gray-300" />
            <InputBox
              type="password"
              id="password"
              name="password"
              value={userDetails.password}
              onChange={handleUserChange}
              autoComplete="off"
              placeholder="password"
              className="w-full h-10 outline-none placeholder:text-gray-600 dark:placeholder:text-gray-300 bg-transparent"
            />
          </div>
          <button
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-[#68e7de] via-[#7b90d0] to-[#587be4] text-white font-semibold py-3 rounded hover:bg-blue-600 active:scale-[.9]"
          >
            {isLoading ? (
              <Loader className="border-t-2 border-t-[#fff] w-[22px] h-[22px]" />
            ) : (
              "Sign Up"
            )}
          </button>
          <div className="mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-cyan-500 underline">
              Sign In
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default SignupPage;
