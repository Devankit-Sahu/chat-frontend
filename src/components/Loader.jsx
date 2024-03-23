import React from "react";

const Loader = ({className}) => {
  return (
    <div className="w-full flex justify-center">
      <div className={`rounded-[50%] ${className} loader`}></div>
    </div>
  );
};

export default Loader;
