import React, { useState } from "react";
import { useToggle } from "../../hooks/useToggle";
import CreateProvider from "../CreateProvider/CreateProvider";
import MenuWrapper from "../MenuWrapper/MenuWrapper";

const ProvidersMenu = ({ data, setProviders, fetchData }) => {
  // const { status: isOpenSearch, toggleStatus: toggleSearch } = useToggle(false);
  const { status: isOpenCreate, toggleStatus: toggleCreate } = useToggle(false);
  const [searchValue, setSearchValue] = useState("");
  const handleChange = (event) => {
    const newWord = event.target.value;
    const newData = data
      .filter((value) =>
        value.providerName.toLowerCase().includes(newWord.toLowerCase())
      )
      .map((value) => ({
        id: value.id,
        img: value.image,
        providerName: value.providerName,
        email: value.email,
        ["Nr. of positions"]: value.positions.length,
      }));
    // changeProducts([...newData]);
    setSearchValue(newWord);
    setProviders(newData);
    console.log("newData=", newData);
  };
  const handleClick = () => {
    setSearchValue("");
    const newArray = data.map((provider) => {
      return {
        id: provider.id,
        img: provider.image,
        providerName: provider.providerName,
        email: provider.email,
        ["Nr. of positions"]: provider.positions.length,
      };
    });
    setProviders(newArray);
  };
  return (
    <MenuWrapper
      searchValue={searchValue}
      isOpenCreate={isOpenCreate}
      toggleCreate={toggleCreate}
      handleChange={handleChange}
      handleClick={handleClick}
    >
      <CreateProvider
        active={isOpenCreate}
        setActive={toggleCreate}
        fetchData={fetchData}
      />
    </MenuWrapper>
    // <div>
    //   <div className="menu__buttons">
    //     <BiPlusMedical
    //       className={
    //         isOpenCreate
    //           ? "search_menu_button menu__opened"
    //           : "search_menu_button menu__closed"
    //       }
    //       onClick={toggleCreate}
    //     />
    //     <BiSearchAlt
    //       className={
    //         isOpenSearch
    //           ? "search_menu_button menu__opened"
    //           : "search_menu_button menu__closed"
    //       }
    //       onClick={toggleSearch}
    //     />
    //   </div>
    //   <CreateProvider
    //     active={isOpenCreate}
    //     setActive={toggleCreate}
    //     fetchData={fetchData}
    //   />
    //   <SearchBarView
    //     isOpenSearch={isOpenSearch}
    //     searchValue={searchValue}
    //     handleChange={handleChange}
    //     handleClick={handleClick}
    //   />
    // </div>
  );
};

export default ProvidersMenu;
