import React from "react";
import "./ProductsMenu.css";
import SearchBar from "../SearchBar/SearchBar";
import { BiSearchAlt } from "react-icons/bi";
import { FiFilter } from "react-icons/fi";
import { MdRefresh } from "react-icons/md";
import { BiPlusMedical } from "react-icons/bi";
import { useState } from "react";
import FilterBar from "../FilterBar/FilterBar";
import CreateProduct from "../CreateProduct/CreateProduct";
import { useToggle } from "../../hooks/useToggle";
import DeleteMessage from "../DeleteMessage/DeleteMessage";

// const SearchMenu = ({ info, changeProducts }) => {
const ProductsMenu = () => {
  const { status: isOpenSearch, toggleStatus: toggleSearch } = useToggle(false);
  const { status: isOpenFilter, toggleStatus: toggleFilter } = useToggle(false);
  const { status: isOpenCreate, toggleStatus: toggleCreate } = useToggle(false);

  // const [isOpenSearch, setIsOpenSearch] = useState(false);
  // const [isOpenFilter, setIsOpenFilter] = useState(false);
  // const [isOpenCreate, setIsOpenCreate] = useState(false);

  // const toggleSearch = () => {
  //   setIsOpenSearch(!isOpenSearch);
  // };
  // const toggleFilter = () => {
  //   setIsOpenFilter(!isOpenFilter);
  // };
  // const toggleCreate = () => {
  //   setIsOpenCreate(!isOpenCreate);
  // };
  return (
    <div>
      <div className="menu__buttons">
        <BiPlusMedical
          className={
            isOpenCreate
              ? "search_menu_button menu__opened"
              : "search_menu_button menu__closed"
          }
          onClick={toggleCreate}
        />
        <BiSearchAlt
          className={
            isOpenSearch
              ? "search_menu_button menu__opened"
              : "search_menu_button menu__closed"
          }
          onClick={toggleSearch}
        />
        <FiFilter
          className={
            isOpenFilter
              ? "search_menu_button menu__opened"
              : "search_menu_button menu__closed"
          }
          onClick={toggleFilter}
        />
      </div>{" "}
      {/* <SearchBar info={info} changeProducts={changeProducts} /> */}
      <SearchBar isOpenSearch={isOpenSearch} />
      <FilterBar isOpenFilter={isOpenFilter} />
      <CreateProduct active={isOpenCreate} setActive={toggleCreate} />
      <DeleteMessage />
    </div>
  );
};

export default ProductsMenu;
