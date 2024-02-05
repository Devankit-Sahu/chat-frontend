import React, { useEffect, useState } from "react";
import InputBox from "../input/InputBox";
import backgroundImage from "../../assets/bg.jpg";
import { FaFacebookMessenger } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerAction } from "../../redux/features/auth/authAction";
import { Avatar } from "@mui/material";
import Loader from "../loader/Loader";

function Signup() {
  const { isAuth, loading } = useSelector((state) => state.auth);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    avatar: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
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
      navigate("/dashboard");
    }
  }, [isAuth]);

  return (
    <div className="h-screen w-screen flex">
      <div
        className="hidden sm:block sm:w-[50%] bg-cover bg-center bg-no-repeat h-full"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      ></div>
      <div className="w-full sm:w-[50%] bg-[#ffffff50] flex items-center justify-center">
        <form method="post" className="w-[80%]" onSubmit={handleSignup}>
          <div className="flex justify-center items-center my-2">
            <FaFacebookMessenger className="text-[4rem] text-[#6A21E2]" />
          </div>
          <h2 className="text-xl text-[#274BF4] md:text-3xl font-semibold text-center mb-6 capitalize my-5">
            create an account
          </h2>
          <div className="flex justify-center">
            <label htmlFor="avatar">
              <Avatar
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
          <div className="my-5">
            <InputBox
              labelName="Username"
              labelClassName="mb-3 text-sm"
              type="text"
              id="username"
              name="username"
              value={user.username}
              onChange={handleChange}
              placeholder="username"
              className="w-full h-10 border-b-[1px] border-solid border-b-[#878484] outline-none placeholder:text-gray-600"
            />
          </div>
          <div className="my-5">
            <InputBox
              labelName="Email"
              labelClassName="mb-3 text-sm"
              type="email"
              id="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              placeholder="example@gmail.com"
              className="w-full h-10 border-b-[1px] border-solid border-b-[#878484] outline-none placeholder:text-gray-600"
            />
          </div>
          <div className="my-5">
            <InputBox
              labelName="Password"
              labelClassName="mb-3 text-sm"
              type="password"
              id="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full h-10 border-b-[1px] border-solid border-b-[#878484] outline-none placeholder:text-gray-600"
            />
          </div>
          <button className="w-full bg-blue-500 text-white font-semibold py-3 rounded hover:bg-blue-600 active:scale-[.9]">
            {loading ? (
              <Loader className="border-t-2 border-t-[#fff] w-[22px] h-[22px]" />
            ) : (
              "Sign Up"
            )}
          </button>
          <div className="mt-4 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500">
              Sign In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
