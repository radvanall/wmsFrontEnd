import React from "react";

import "./FilterBox.css";

const FilterBox = ({
  options,
  label,
  defaultValue,
  handleFilterSettings,
  filterCriterias,
  keyName,
}) => {
  console.log("options=", options);
  console.log("label=", label);
  console.log("key=", keyName);
  //   const handleChange = (event) => {
  //     console.log("key=", key);
  //     handleFilterSettings(key, event.target.value);
  //   };
  return (
    <div className="filter__box_container">
      <p>{label}</p>
      <select
        className="filter__box"
        name={keyName}
        // defaultValue={defaultValue}
        value={filterCriterias[keyName]}
        onChange={(e) => handleFilterSettings(keyName, e.target.value)}
      >
        <option value={defaultValue}>{defaultValue}</option>
        {options.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterBox;
