import React, { useState } from "react";
import { useToggle } from "../../hooks/useToggle";
import CreateProvider from "../CreateProvider/CreateProvider";
import MenuWrapper from "../MenuWrapper/MenuWrapper";
import { useSelector } from "react-redux";
const ProvidersMenu = ({ data, setProviders, fetchData }) => {
  const role = useSelector((state) => state.userSlice.userData?.authority);
  const isAllowed = role === "ROLE_ADMIN" || role === "ROLE_MAIN";
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
      isAllowed={isAllowed}
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
  );
};

export default ProvidersMenu;
