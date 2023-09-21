import React, { useState } from "react";
import "./BasicInput.css";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
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
  eyeIcon,
}) => {
  const [pass, setPass] = useState(true);
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
        type={pass ? type : "text"}
        placeholder={placeholder}
        value={type === "number" ? (value != 0 ? value : "") : value}
        onChange={handleChange}
        id="basic__input_id"
        name={inputName}
        onKeyDown={handleKeyDown}
      />
      {eyeIcon &&
        (pass ? (
          <AiFillEyeInvisible
            className="password__eye"
            onClick={() => {
              setPass((prev) => !prev);
            }}
          />
        ) : (
          <AiFillEye
            className="password__eye"
            onClick={() => {
              setPass((prev) => !prev);
            }}
          />
        ))}
    </div>
  );
};

export default BasicInput;
