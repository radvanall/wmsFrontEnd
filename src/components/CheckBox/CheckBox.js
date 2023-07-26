import { borderRadius, padding } from "@mui/system";
import React from "react";
import "./CheckBox.css";
const CheckBox = ({
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
      className={border ? "checkbox__container border" : "checkbox__container"}
    >
      <input
        type="checkbox"
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

export default CheckBox;
