import React from "react";
import "./SearchBarView.css";
import { BiSearchAlt } from "react-icons/bi";
import { MdClose } from "react-icons/md";

const SearchBarView = ({
  isOpenSearch,
  searchValue,
  handleChange,
  handleClick,
}) => {
  return (
    <div className={isOpenSearch ? "search__bar" : "search__bar_closed"}>
      <input
        value={searchValue}
        type="text"
        className="search__bar__input"
        onChange={handleChange}
      />
      <button className="search__bar__button" onClick={handleClick}>
        {searchValue === "" ? <BiSearchAlt /> : <MdClose />}
      </button>
    </div>
  );
};

export default SearchBarView;
