import React from "react";
import "./ProgressBar.css";

const ProgressBar = ({ max, value, additionalLabel }) => {
  return (
    <div className="progress__bar__wrapper">
      <progress max={max} value={value} className="progress__bar" />
      <label>{additionalLabel ? `${value}  ${additionalLabel}` : value}</label>
    </div>
  );
};

export default ProgressBar;
