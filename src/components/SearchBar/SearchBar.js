import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDisplaiedData } from "../../toolkitRedux/productsSlice";
import SearchBarView from "../SearchBarView/SearchBarView";
const SearchBar = ({ isOpenSearch }) => {
  const info = useSelector((state) => state.productsSlice.data);

  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();
  const handleChange = (event) => {
    const newWord = event.target.value;
    const newData = info.filter((value) => {
      return value.name.toLowerCase().includes(newWord.toLowerCase());
    });
    setSearchValue(newWord);
    dispatch(setDisplaiedData(newData));
  };
  const handleClick = () => {
    setSearchValue("");
    dispatch(setDisplaiedData(info));
  };
  return (
    <SearchBarView
      isOpenSearch={isOpenSearch}
      searchValue={searchValue}
      handleChange={handleChange}
      handleClick={handleClick}
    />
  );
};

export default SearchBar;
