import React, { useState } from "react";
import { TiEdit } from "react-icons/ti";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useToggle } from "../../hooks/useToggle";
import EditOperator from "../EditOperator/EditOperator";
import DeleteItem from "../DeleteItem/DeleteItem";
// import useGetData from "../../hooks/useGetData";

const SingleOperatorMenu = ({ operator, fetchData }) => {
  const { status: isOpenModify, toggleStatus: toggleModify } = useToggle(false);
  const { status: isOpenDelete, toggleStatus: toggleDelete } = useToggle(false);
  //   const { data, loading, error, getData } = useGetData(
  //     `http://localhost:8080/api/position/readoperator/`
  //   );
  const handleModify = () => {
    toggleModify();
    // getData(id);
    // console.log(data);
  };
  return (
    <div className="single_menu__buttons">
      <TiEdit
        className={
          isOpenModify
            ? "search_menu_button menu__opened"
            : "search_menu_button menu__closed"
        }
        onClick={handleModify}
      />
      <RiDeleteBin6Line
        className={
          isOpenDelete
            ? "search_menu_button menu__opened"
            : "search_menu_button menu__closed"
        }
        onClick={toggleDelete}
      />

      {operator && (
        <EditOperator
          active={isOpenModify}
          setActive={toggleModify}
          operator={operator}
          fetchData={fetchData}
        />
      )}

      <DeleteItem
        active={isOpenDelete}
        setActive={toggleDelete}
        endpoint="operator"
        id={operator.id}
        title="Sunteți siguri că doriți să ștergeți operatorul ales?"
        navigateTo="/operators"
      />
    </div>
  );
};

export default SingleOperatorMenu;
