import React, { useState } from "react";
import { useToggle } from "../../hooks/useToggle";
import MenuWrapper from "../MenuWrapper/MenuWrapper";
import CreateOperator from "../CreateOperator/CreateOperator";
// import CreateCustomer from "../CreateCustomer/CreateCustomer";
const OperatorMenu = ({ data, setOperators, fetchData }) => {
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
      toggleCreate={toggleCreate}
      handleChange={handleChange}
      handleClick={handleClick}
    >
      <CreateOperator
        active={isOpenCreate}
        setActive={toggleCreate}
        fetchData={fetchData}
      />
    </MenuWrapper>
  );
};

export default OperatorMenu;
