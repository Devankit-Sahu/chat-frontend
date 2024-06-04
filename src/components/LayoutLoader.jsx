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
      <p className="text-base sm:text-xl text-center px-3 text-black dark:text-white">
        Content is loading...Please wait for while!!!
      </p>
    </div>
  );
};

export default LayoutLoader;
