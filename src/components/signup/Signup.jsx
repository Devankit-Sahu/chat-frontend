import React, { useEffect, useState } from "react";
import backgroundImage from "../../assets/bg2.jpg";
import logoImage from "../../assets/logo.jpeg";
import { Link, useNavigate } from "react-router-dom";
import InputBox from "../input/InputBox";
import { useDispatch, useSelector } from "react-redux";
import { registerAction } from "../../redux/features/auth/authAction";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";
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
      navigate("/dashboard/chat");
    }
  }, [isAuth]);

  return (
    <div
      className="bg-cover bg-center min-h-screen flex items-center justify-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <form method="post">
        <div className="bg-[#fff] bg-opacity-90 rounded-lg shadow-md w-96 p-8">
          <img
            src={logoImage}
            alt="Logo"
            className="w-20 h-20 mx-auto mix-blend-darken"
          />
          <h2 className="text-2xl font-bold text-center mb-6 uppercase">
            Welcome to ChatBuddy
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
          <div className="mb-4 flex border-b-2 border-gray-400 py-1">
            <InputBox
              type="text"
              id="username"
              name="username"
              value={user.username}
              onChange={handleChange}
              placeholder="Enter your username"
              className="flex-[.9] bg-transparent outline-none placeholder:text-gray-600"
            />
            <span className="flex-[.1] text-gray-600">
              <PersonIcon />
            </span>
          </div>
          <div className="mb-4 flex border-b-2 border-gray-400 py-1">
            <InputBox
              type="email"
              id="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="flex-[.9] bg-transparent outline-none placeholder:text-gray-600"
            />
            <span className="flex-[.1] text-gray-600">
              <EmailIcon />
            </span>
          </div>
          <div className="mb-4 flex border-b-2 border-gray-400 py-1">
            <InputBox
              type="password"
              id="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="flex-[.9] bg-transparent outline-none placeholder:text-gray-600"
            />
            <span className="flex-[.1] text-gray-600">
              <LockIcon />
            </span>
          </div>
          <button
            onClick={handleSignup}
            className="w-full bg-blue-500 text-white font-semibold py-3 rounded hover:bg-blue-600 active:scale-[.9]"
          >
            {loading ? (
              <Loader className="border-t-2 border-t-[#fff] w-[22px] h-[22px]" />
            ) : (
              "Sign Up"
            )}
          </button>
          <div className="mt-4 text-center text-orange-900">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500">
              Log in
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Signup;
