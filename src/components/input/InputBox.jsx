import React from "react";

const InputBox = ({
  type = "text",
  id,
  name,
  onChange,
  value,
  placeholder,
  className = "",
  ...rest
}) => {
  return (
    <input
      type={type}
      id={id}
      name={name}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
      className={` ${className}`}
      {...rest}
    />
  );
};

export default InputBox;
