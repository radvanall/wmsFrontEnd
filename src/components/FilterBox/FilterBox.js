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
  return (
    <div className="filter__box_container">
      <p>{label}</p>
      <select
        className="filter__box"
        name={keyName}
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
