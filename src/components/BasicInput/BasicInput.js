import React from "react";
import "./BasicInput.css";
const BasicInput = ({
  type,
  placeholder,
  value,
  handleChange,
  label,
  inputName,
}) => {
  return (
    <div className="basic__input__wrapper">
      <label htmlFor="basic__input_id" className="basic__input__label">
        {label}
      </label>
      <input
        className="basic__input"
        type={type}
        placeholder={placeholder}
        value={type === "number" ? (value != 0 ? value : "") : value}
        onChange={handleChange}
        id="basic__input_id"
        name={inputName}
      />
    </div>
  );
};

export default BasicInput;
