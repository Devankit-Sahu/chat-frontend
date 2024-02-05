import React, { useState, useEffect } from "react";
import InputBox from "../input/InputBox";
import { FaFacebookMessenger } from "react-icons/fa6";
import backgroundImage from "../../assets/bg.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../../redux/features/auth/authAction";
import Loader from "../loader/Loader";

function Login() {
  const { loading, isAuth, error } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
  }, [isAuth, navigate]);

  return (
    <div className="h-screen w-screen flex">
      <div
        className="hidden sm:block sm:w-[50%] bg-cover bg-center bg-no-repeat h-full"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      ></div>
      <div className="w-full sm:w-[50%] p-10 bg-[#ffffff50] flex items-center justify-center">
        <form method="post" className="w-[80%]" onSubmit={handleLogin}>
          <div className="flex justify-center items-center my-2">
            <FaFacebookMessenger className="text-[4rem] text-[#6A21E2]" />
          </div>
          <h2 className="text-xl md:text-3xl font-semibold text-center mb-6 capitalize my-5">
            Welcome to <span className="text-[#274BF4]">ChatBuddy</span>
          </h2>
          <div className="my-5">
            <InputBox
              labelName="Email"
              labelClassName="mb-3 text-sm"
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-10 border-b-[1px] border-solid border-b-[#878484] outline-none placeholder:text-gray-600"
            />
          </div>
          <div className="mb-4">
            <p className="text-red-500">{error}</p>
          </div>
          <button className="w-full bg-blue-500 text-white font-semibold mt-3 py-3 rounded hover:bg-blue-600 active:scale-[.9]">
            {loading ? (
              <Loader className="border-t-2 border-t-[#fff] w-[22px] h-[22px]" />
            ) : (
              "Sign In"
            )}
          </button>
          <div className="mt-4 text-center">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-500">
              Sign-Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
