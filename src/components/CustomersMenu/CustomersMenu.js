import React, { useState } from "react";
import { useToggle } from "../../hooks/useToggle";
import MenuWrapper from "../MenuWrapper/MenuWrapper";
import CreateCustomer from "../CreateCustomer/CreateCustomer";
import { useSelector } from "react-redux";
const CustomersMenu = ({ data, setCustomers, fetchData }) => {
  const role = useSelector((state) => state.userSlice.userData?.authority);
  const isAllowed = role === "ROLE_ADMIN" || role === "ROLE_MAIN";
  const { status: isOpenCreate, toggleStatus: toggleCreate } = useToggle(false);
  const [searchValue, setSearchValue] = useState("");
  const handleChange = (event) => {
    const newWord = event.target.value;
    const newData = data
      .filter((value) =>
        value.nickname.toLowerCase().includes(newWord.toLowerCase())
      )
      .map((customer) => ({
        id: customer.id,
        img: customer.avatar,
        Nickname: customer.nickname,
        Email: customer.email,
        Tel: customer.phone,
        Adresa: customer.address,
      }));
    setSearchValue(newWord);
    setCustomers(newData);
    console.log("newData=", newData);
  };
  const handleClick = () => {
    setSearchValue("");
    const newArray = data.map((customer) => {
      return {
        id: customer.id,
        img: customer.avatar,
        Nickname: customer.nickname,
        Email: customer.email,
        Tel: customer.phone,
        Adresa: customer.address,
      };
    });
    setCustomers(newArray);
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
      <CreateCustomer
        active={isOpenCreate}
        setActive={toggleCreate}
        fetchData={fetchData}
      />
    </MenuWrapper>
  );
};

export default CustomersMenu;
