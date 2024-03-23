import React, { forwardRef } from "react";

const InputBox = forwardRef((props, ref) => {
  const {
    labelName,
    labelClassName = "",
    type = "text",
    id,
    name,
    onChange,
    value,
    placeholder,
    className = "",
    ...rest
  } = props;
  return (
    <>
      {labelName && (
        <label htmlFor={id} className={labelClassName}>
          {labelName}
        </label>
      )}
      <input
        ref={ref}
        type={type}
        id={id}
        name={name}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        className={` ${className}`}
        {...rest}
      />
    </>
  );
});

export default InputBox;
