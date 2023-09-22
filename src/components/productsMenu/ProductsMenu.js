import React from "react";
import "./ProductsMenu.css";
import SearchBar from "../SearchBar/SearchBar";
import { BiSearchAlt } from "react-icons/bi";
import { FiFilter } from "react-icons/fi";
import { BiPlusMedical } from "react-icons/bi";
import FilterBar from "../FilterBar/FilterBar";
import CreateProduct from "../CreateProduct/CreateProduct";
import { useToggle } from "../../hooks/useToggle";
import DeleteMessage from "../DeleteMessage/DeleteMessage";
import CreateCategory from "../CreateCategory/CreateCategory";

const ProductsMenu = () => {
  const { status: isOpenSearch, toggleStatus: toggleSearch } = useToggle(false);
  const { status: isOpenFilter, toggleStatus: toggleFilter } = useToggle(false);
  const { status: isOpenCreate, toggleStatus: toggleCreate } = useToggle(false);
  const { status: isOpenProductCreate, toggleStatus: toggleProductCreate } =
    useToggle(false);
  const { status: isOpenCategoryCreate, toggleStatus: toggleCategoryCreate } =
    useToggle(false);
  const {
    status: isOpenSubcategoryCreate,
    toggleStatus: toggleSubcategoryCreate,
  } = useToggle(false);

  return (
    <div>
      <div className="menu__buttons">
        <div className="create__popup">
          <BiPlusMedical
            className={
              isOpenCreate
                ? "search_menu_button menu__opened"
                : "search_menu_button menu__closed"
            }
            onClick={toggleCreate}
          />
          <ul className={isOpenCreate ? "popup__opened" : "popup__closed"}>
            <li
              onClick={() => {
                toggleProductCreate();
                toggleCreate();
              }}
            >
              Crează produs
            </li>
            <li
              onClick={() => {
                toggleCategoryCreate();
                toggleCreate();
              }}
            >
              Crează categorie
            </li>
            <li
              onClick={() => {
                toggleSubcategoryCreate();
                toggleCreate();
              }}
            >
              Crează subcategorie
            </li>
          </ul>
        </div>
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
      <SearchBar isOpenSearch={isOpenSearch} />
      <FilterBar isOpenFilter={isOpenFilter} />
      <CreateProduct
        active={isOpenProductCreate}
        setActive={toggleProductCreate}
      />
      <CreateCategory
        label="Introduceți categoria nouă"
        active={isOpenCategoryCreate}
        close={toggleCategoryCreate}
        endpoint="http://localhost:8080/api/category/create"
      />
      <CreateCategory
        label="Introduceți subcategoria nouă"
        active={isOpenSubcategoryCreate}
        close={toggleSubcategoryCreate}
        endpoint="http://localhost:8080/api/subcategory/create"
      />
      <DeleteMessage />
    </div>
  );
};

export default ProductsMenu;
