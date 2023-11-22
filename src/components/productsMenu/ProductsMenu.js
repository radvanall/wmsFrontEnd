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
import CategoryModal from "../CategoryModal/CategoryModal";
import { useSelector } from "react-redux";

const ProductsMenu = () => {
  const role = useSelector((state) => state.userSlice.userData?.authority);
  const isAllowed = role === "ROLE_ADMIN" || role === "ROLE_MAIN";
  const { status: isOpenSearch, toggleStatus: toggleSearch } = useToggle(false);
  const { status: isOpenFilter, toggleStatus: toggleFilter } = useToggle(false);
  const { status: isOpenCreate, toggleStatus: toggleCreate } = useToggle(false);
  const { status: isOpenProductCreate, toggleStatus: toggleProductCreate } =
    useToggle(false);
  const { status: isOpenCategoryModal, toggleStatus: toggleCategoryModal } =
    useToggle(false);

  return (
    <div>
      <div className="menu__buttons">
        <div className="create__popup">
          {isAllowed && (
            <BiPlusMedical
              className={
                isOpenCreate
                  ? "search_menu_button menu__opened"
                  : "search_menu_button menu__closed"
              }
              onClick={toggleCreate}
            />
          )}
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
                toggleCategoryModal();
                toggleCreate();
              }}
            >
              Categorii/Subcategorii
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
      <CategoryModal
        active={isOpenCategoryModal}
        closeModal={toggleCategoryModal}
      />
      <DeleteMessage />
    </div>
  );
};

export default ProductsMenu;
