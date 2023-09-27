import React from "react";
import SearchBarView from "../SearchBarView/SearchBarView";
import { useToggle } from "../../hooks/useToggle";
import { BiSearchAlt, BiPlusMedical } from "react-icons/bi";
const MenuWrapper = ({
  searchValue,
  isAllowed,
  handleChange,
  handleClick,
  isOpenCreate,
  toggleCreate,
  children,
}) => {
  const { status: isOpenSearch, toggleStatus: toggleSearch } = useToggle(false);

  return (
    <div>
      <div className="menu__buttons">
        {toggleCreate && isAllowed && (
          <BiPlusMedical
            className={
              isOpenCreate
                ? "search_menu_button menu__opened"
                : "search_menu_button menu__closed"
            }
            onClick={toggleCreate}
          />
        )}
        <BiSearchAlt
          className={
            isOpenSearch
              ? "search_menu_button menu__opened"
              : "search_menu_button menu__closed"
          }
          onClick={toggleSearch}
        />
      </div>
      {children && children}
      <SearchBarView
        isOpenSearch={isOpenSearch}
        searchValue={searchValue}
        handleChange={handleChange}
        handleClick={handleClick}
      />
    </div>
  );
};

export default MenuWrapper;
