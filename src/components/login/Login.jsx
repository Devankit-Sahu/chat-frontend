import React, { useState, useEffect } from "react";
import backgroundImage from "../../assets/bg.jpg";
import logoImage from "../../assets/logo.png";
import InputBox from "../input/InputBox";
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
      localStorage.setItem("isAuthenticated", JSON.stringify(isAuth));
      navigate("/");
    }
  }, [isAuth, navigate]);

  return (
    <div
      className="bg-cover bg-center min-h-screen flex items-center justify-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <form method="post" onSubmit={handleLogin}>
        <div className="bg-[#ffffff59] bg-opacity-90 rounded-lg shadow-lg w-96 p-8">
          <img
            src={logoImage}
            alt="Logo"
            className="w-20 h-20 mx-auto mix-blend-darken"
          />
          <h2 className="text-2xl font-bold text-center mb-6 uppercase">
            Log in
          </h2>
          <div className="mb-4">
            <InputBox
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="px-4 py-3 w-full rounded-[25px] outline-none bg-[#80808066] placeholder:text-black"
            />
          </div>
          <div className="mb-4">
            <InputBox
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="px-4 py-3 w-full rounded-[25px] outline-none bg-[#80808066] placeholder:text-black"
            />
          </div>
          <div className="mb-4">
            <p className="text-red-500">{error}</p>
          </div>
          <button
            onClick={handleLogin}
            className="w-full bg-blue-500 text-white font-semibold py-3 rounded hover:bg-blue-600 active:scale-[.9]"
          >
            {loading ? (
              <Loader className="border-t-2 border-t-[#fff] w-[22px] h-[22px]" />
            ) : (
              "Log In"
            )}
          </button>
          <div className="mt-4 text-center text-orange-900">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-500">
              register
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
