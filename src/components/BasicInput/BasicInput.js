import React from "react";
import "./BasicInput.css";
const BasicInput = ({
  type,
  placeholder,
  value,
  handleChange,
  label,
  inputName,
  handleKeyDown,
  fullBorder,
  padding,
  borderRadius,
}) => {
  return (
    <div
      className="basic__input__wrapper"
      style={padding ? { padding: padding } : { padding: "5px" }}
    >
      {label && (
        <label htmlFor="basic__input_id" className="basic__input__label">
          {label}
        </label>
      )}
      <input
        className={
          fullBorder
            ? "basic__input full__border"
            : "basic__input bottom__border"
        }
        style={
          borderRadius
            ? { borderRadius: borderRadius }
            : { borderRadius: "5px" }
        }
        type={type}
        placeholder={placeholder}
        value={type === "number" ? (value != 0 ? value : "") : value}
        onChange={handleChange}
        id="basic__input_id"
        name={inputName}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default BasicInput;
