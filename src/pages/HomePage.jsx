import { Stack, useMediaQuery } from "@mui/material";
import React from "react";
import { Layout } from "../components";

const HomePage = () => {
  const isMobile = useMediaQuery("(max-width: 800px)");

  return (
    <Stack
      height={"100%"}
      width={"100%"}
      display={isMobile ? "none" : "flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <p className="text-xl font-semibold">Select chat to message</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi, in!</p>
    </Stack>
  );
};

export default Layout()(HomePage);
