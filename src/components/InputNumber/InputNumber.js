import React from "react";
import "./InputNumber.css";

const InputNumber = ({
  label,
  keyName,
  filterCriterias,
  handleFilterSettings,
  inputValue,
  minValue,
}) => {
  const handleBlur = (e) => {
    console.log("minTarget=", e.target.min);
    if (
      keyName === "maxQuantity" &&
      filterCriterias[keyName] < filterCriterias.minQuantity &&
      filterCriterias[keyName] !== "0"
    ) {
      handleFilterSettings(keyName, filterCriterias.minQuantity);
      return;
    }
    if (
      keyName === "maxPrice" &&
      filterCriterias[keyName] < filterCriterias.minPrice &&
      filterCriterias[keyName] !== "0"
    ) {
      handleFilterSettings(keyName, filterCriterias.minPrice);
      return;
    }
  };

  return (
    <div className="input__number_container">
      <p>{label}</p>
      <input
        className="input__number"
        value={inputValue === "0" ? "" : inputValue}
        min={minValue}
        type="number"
        placeholder={"zero"}
        onChange={(e) =>
          handleFilterSettings(
            keyName,
            e.target.value === "" ? "0" : e.target.value
          )
        }
        onBlur={(e) => {
          handleBlur(e);
        }}
      />
    </div>
  );
};

export default InputNumber;
