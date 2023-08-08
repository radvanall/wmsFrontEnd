import React from "react";
import "./RadioButton.css";
const RadioButton = ({
  id,
  name,
  label,
  border,
  value,
  checked,
  attribute,
  handleChange,
  padding,
  borderRadius,
  backgroundColor,
  width,
}) => {
  return (
    <div
      style={{
        backgroundColor,
        padding,
        borderRadius,
        width,
      }}
      className={border ? "radio__container border" : "radio__container"}
    >
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={checked}
        data-custom-attribute={attribute}
        onChange={handleChange}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

export default RadioButton;
