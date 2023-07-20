import React from "react";
import "./BasicButton.css";
const BasicButton = ({ type = "button", text, handleClick }) => {
  return (
    <button type={type} onClick={handleClick} className="basic__button">
      {text}
    </button>
  );
};

export default BasicButton;
