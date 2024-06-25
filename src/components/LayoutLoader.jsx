import React from "react";
import Loader from "./Loader";

const LayoutLoader = () => {
  return (
    <div className="h-screen bg-white dark:bg-[#1a2236] flex flex-col gap-10 items-center justify-center">
      <Loader
        className={
          "w-[100px] h-[100px] border-t-2 border-black dark:border-white"
        }
      />
    </div>
  );
};

export default LayoutLoader;
