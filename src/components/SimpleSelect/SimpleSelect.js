import React from "react";
import "./SimpleSelect.css";
const SimpleSelect = ({
  name,
  id,
  options,
  defaultValue,
  handleChange,
  height,
}) => {
  return (
    <select
      style={{ height: height }}
      className="simple__select"
      name={name}
      id={id}
      defaultValue={defaultValue}
      onChange={handleChange}
    >
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default SimpleSelect;
