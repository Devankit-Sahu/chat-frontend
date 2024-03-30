import React from "react";
import { Button, Stack } from "@mui/material";
import { Error as ErrorIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  const navigateToHome = () => {
    navigate("/");
  };
  return (
    <Stack
      height={"100vh"}
      justifyContent={"center"}
      alignItems={"center"}
      gap={2}
    >
      <ErrorIcon sx={{ fontSize: "3rem" }} />
      <p className="uppercase font-bold">page not found</p>
      <Button
        onClick={navigateToHome}
        color="warning"
        variant="contained"
        className="capitalize"
      >
        go to home
      </Button>
    </Stack>
  );
};

export default NotFound;
