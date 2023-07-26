import React from "react";
import "./Range.css";
const Range = ({
  name,
  id,
  value,
  min,
  max,
  unit,
  handleChange,
  labelWidth = "30%",
  rangeWidth = "65%",
}) => {
  return (
    <div className="range__container">
      <div className="range__wrapper" style={{ width: rangeWidth }}>
        <input
          type="range"
          name={name}
          id={id}
          value={value}
          min={min ?? 0}
          max={max ?? 10000}
          onChange={handleChange}
        />
        <progress value={value} max={max ?? 10000} />
      </div>
      <label style={{ width: labelWidth }}>{value + " " + unit}</label>
    </div>
  );
};

export default Range;
