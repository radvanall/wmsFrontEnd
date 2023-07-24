import React from "react";
import "./CheckBox.css";
const CheckBox = ({ id, name, label, border }) => {
  return (
    <div
      className={border ? "checkbox__container border" : "checkbox__container"}
    >
      <input type="checkbox" id={id} name={name} />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

export default CheckBox;
