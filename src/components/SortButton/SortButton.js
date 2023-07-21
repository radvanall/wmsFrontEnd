import React from "react";
import { IoIosArrowUp } from "react-icons/io";
import "./SortButton.css";
const SortButton = ({ sortDirection, toggleSortDirection }) => {
  return (
    <button onClick={toggleSortDirection} className="sort__btn">
      {sortDirection}{" "}
      <IoIosArrowUp
        className={
          sortDirection === "ASC" ? "sort__btn__img asc" : "sort__btn__img"
        }
      />
    </button>
  );
};

export default SortButton;
