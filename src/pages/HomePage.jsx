import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import welcomeScreenBg from "../assets/welcome-screen-bg.jpg";
import { Button } from "@mui/material";

const HomePage = () => {
  const isAuth = JSON.parse(localStorage.getItem("isAuthenticated")) || false;
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuth) {
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  }, [isAuth, navigate]);

  return (
    <div
      className="w-full h-screen bg-no-repeat bg-cover bg-center"
      style={{ backgroundImage: `url(${welcomeScreenBg})` }}
    >
      <div className="grid grid-cols-2 h-full">
        <div className="flex flex-col items-center justify-center mx-40">
          <p className="text-5xl mb-10">
            Welcome to <span className="text-[blue] font-[600]">ChatBuddy</span>
          </p>
          <p className="text-sm mb-10">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit
            expedita, nihil odit optio accusamus placeat? Quas vitae similique
            ad laudantium.
          </p>
          <Button onClick={() => navigate("/login")} variant="contained">
            Get started
          </Button>
        </div>
        <div className="flex items-center justify-center">
          <img src={logo} alt="" className="object-cover" />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
