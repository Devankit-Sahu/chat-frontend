import React from "react";
import { Stack } from "@mui/material";
import { SearchOutlined as SearchOutlinedIcon } from "@mui/icons-material";

const Search = ({ search, setSearch }) => {
  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      paddingY={"10px"}
      paddingX={"5px"}
      marginTop={5}
      className="bg-[rgba(241,241,241,1)] dark:bg-inherit dark:border-[1px] dark:border-solid dark:border-[#293145]"
    >
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search here..."
        className="w-full outline-none border-none bg-transparent placeholder:text-zinc-500 dark:placeholder:text-white px-2"
      />

      <SearchOutlinedIcon className="text-zinc-500 dark:text-white" />
    </Stack>
  );
};

export default Search;
