import React from "react";
import { Button } from "@mui/material";
import { Error as ErrorIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  const navigateToHome = () => {
    navigate("/");
  };
  return (
    <section className="not-found flex flex-col h-screen gap-4 items-center justify-center bg-white dark:bg-[#1a2236] text-black dark:text-white">
      <ErrorIcon sx={{ fontSize: "3rem" }} />
      <p className="uppercase font-bold">page you are looking for not found</p>
      <Button
        onClick={navigateToHome}
        color="warning"
        variant="contained"
        className="capitalize"
      >
        go to home
      </Button>
    </section>
  );
};

export default NotFound;
