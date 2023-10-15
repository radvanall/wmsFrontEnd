import React, { useState } from "react";
import { useToggle } from "../../hooks/useToggle";
import MenuWrapper from "../MenuWrapper/MenuWrapper";
import CreateOperator from "../CreateOperator/CreateOperator";
// import CreateCustomer from "../CreateCustomer/CreateCustomer";
import { useSelector } from "react-redux";
const OperatorMenu = ({ data, setOperators, fetchData, url, user }) => {
  const role = useSelector((state) => state.userSlice.userData?.authority);
  const isAllowed = role === "ROLE_ADMIN" || role === "ROLE_MAIN";
  const { status: isOpenCreate, toggleStatus: toggleCreate } = useToggle(false);
  const [searchValue, setSearchValue] = useState("");
  const handleChange = (event) => {
    const newWord = event.target.value;
    const newData = data
      .filter(
        (value) =>
          value.nickname.toLowerCase().includes(newWord.toLowerCase()) ||
          value.name.toLowerCase().includes(newWord.toLowerCase()) ||
          value.surname.toLowerCase().includes(newWord.toLowerCase())
      )
      .map((operator) => ({
        id: operator.id,
        img: operator.img,
        Nickname: operator.nickname,
        Nume: operator.name,
        Prenume: operator.surname,
        Email: operator.email,
        Tel: operator.tel,
        Status: {
          text: operator.status,
          state: operator.status,
        },
      }));
    setSearchValue(newWord);
    setOperators(newData);
    console.log("newData=", newData);
  };
  const handleClick = () => {
    setSearchValue("");
    const newArray = data.map((operator) => {
      return {
        id: operator.id,
        img: operator.img,
        Nickname: operator.nickname,
        Nume: operator.name,
        Prenume: operator.surname,
        Email: operator.email,
        Tel: operator.tel,
        Status: {
          text: operator.status,
          state: operator.status,
        },
      };
    });
    setOperators(newArray);
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
      <CreateOperator
        active={isOpenCreate}
        setActive={toggleCreate}
        fetchData={fetchData}
        url={url}
        user={user}
      />
    </MenuWrapper>
  );
};

export default OperatorMenu;
