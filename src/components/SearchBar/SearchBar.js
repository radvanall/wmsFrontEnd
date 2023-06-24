import React from "react";
import "./SearchBar.css";
import { useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { setData, setDisplaiedData } from "../../toolkitRedux/productsSlice";
import { MdClose } from "react-icons/md";
// const SearchBar = ({ info, changeProducts }) => {
const SearchBar = ({ isOpenSearch }) => {
  const info = useSelector((state) => state.productsSlice.data);

  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();
  console.log("names=", info);
  const handleChange = (event) => {
    const newWord = event.target.value;
    const newData = info.filter((value) => {
      return value.name.toLowerCase().includes(newWord.toLowerCase());
    });
    // changeProducts([...newData]);
    setSearchValue(newWord);
    dispatch(setDisplaiedData(newData));
    console.log("newData=", newData);
  };
  const handleClick = () => {
    setSearchValue("");
    dispatch(setDisplaiedData(info));
  };
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

export default SearchBar;
