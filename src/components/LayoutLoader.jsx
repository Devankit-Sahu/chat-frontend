import React from "react";
import { Box, Skeleton } from "@mui/material";
import { useTheme } from "../context/themeContext";

const LayoutLoader = () => {
  const { mode } = useTheme();
  return (
    <Box
      height={"100vh"}
      width={"100vw"}
      bgcolor={mode === "light" ? "white" : "#1a2236"}
    >
      <Skeleton height={"100%"} width={"100%"} variant="rectangular" />
    </Box>
  );
};

export default LayoutLoader;
