import { Box, Skeleton, Stack } from "@mui/material";
import React from "react";
import { useTheme } from "../context/themeContext";

const LayoutLoader = () => {
  const { mode } = useTheme();
  return (
    <Stack
      direction={"row"}
      gap={"20px"}
      paddingX={"20px"}
      width={"100vw"}
      height={"100vh"}
      bgcolor={mode === "light" ? "white" : "#1a2236"}
    >
      <Box height={"100%"} width={"70px"}>
        <Skeleton height={"100%"} width={"100%"} variant="rectangular" />
      </Box>
      <Box height={"100%"} width={"330px"}>
        <Skeleton height={"100%"} width={"100%"} variant="rectangular" />
      </Box>
      <Box height={"100%"} sx={{ width: "calc(100% - 400px)" }}>
        <Skeleton height={"100%"} width={"100%"} variant="rectangular" />
      </Box>
    </Stack>
  );
};

export default LayoutLoader;
