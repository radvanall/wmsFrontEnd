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
}) => {
  return (
    <div className="basic__input__wrapper">
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
