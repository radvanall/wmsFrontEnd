import React, { useEffect } from "react";
import "./FilterBar.css";
import useFilterFields from "./useFilterFields";
import FilterBox from "../FilterBox/FilterBox";
import useFetch from "../../hooks/useFetch";
const FilterBar = ({ isOpenFilter }) => {
  const initialCriterias = {
    category: "toate",
    subcategory: "toate",
    unity: "toate",
    manufacturer: "toate",
    minPrice: "0",
    maxPrice: "0",
    minQuantity: "0",
    maxQuantity: "0",
  };
  const { data: filterBox, fetchData } = useFetch(
    "http://localhost:8080/api/productcriteria/get"
  );
  useEffect(() => {
    fetchData();
  }, [isOpenFilter]);
  const { filterCriterias, filterData, resetData, handleFilterSettings } =
    useFilterFields(initialCriterias);

  return (
    <div
      className={isOpenFilter ? "filter__bar_container" : "filter__bar_closed"}
    >
      <div className="filter__bar">
        {filterBox &&
          filterBox.map((item) => (
            <FilterBox
              key={item.keyName}
              options={item.options}
              label={item.label}
              keyName={item.keyName}
              defaultValue={item.defaultValue}
              filterCriterias={filterCriterias}
              handleFilterSettings={handleFilterSettings}
            />
          ))}
      </div>
      <div className="filter__bottons_container">
        <button onClick={filterData}>Search</button>
        <button onClick={resetData}>Reset</button>
      </div>
    </div>
  );
};

export default FilterBar;
