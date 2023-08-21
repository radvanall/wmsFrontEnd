import React, { useState } from "react";
import { TiEdit } from "react-icons/ti";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BsCalendar2Week } from "react-icons/bs";
import { useToggle } from "../../hooks/useToggle";
import Modal from "../Modal/Modal";
import CloseModal from "../CloseModal/CloseModal";
import Calendar from "../Calendar/Calendar";
// import EditOperator from "../EditOperator/EditOperator";
import DeleteItem from "../DeleteItem/DeleteItem";

const AdminHomePageMenu = ({ admin, workedDays }) => {
  const { status: isOpenModify, toggleStatus: toggleModify } = useToggle(false);
  const { status: isOpenDelete, toggleStatus: toggleDelete } = useToggle(false);
  const { status: isOpenCalendar, toggleStatus: toggleCalendar } =
    useToggle(false);
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
      <BsCalendar2Week
        className={
          isOpenCalendar
            ? "search_menu_button menu__opened"
            : "search_menu_button menu__closed"
        }
        onClick={toggleCalendar}
      />
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
      <Modal active={isOpenCalendar} width="50%" minWidth="470px">
        <CloseModal handleCloseModal={toggleCalendar} />

        <Calendar
          operator={admin}
          workedDays={workedDays}
          minHeight="400px"
          minWidth="370px"
          width="100%"
          marginLeft="0px"
        />
      </Modal>

      {/* {operator && (
          <EditOperator
            active={isOpenModify}
            setActive={toggleModify}
            operator={operator}
            fetchData={fetchData}
          />
        )} */}

      {/* <DeleteItem
          active={isOpenDelete}
          setActive={toggleDelete}
          endpoint="operator"
          id={operator.id}
          title="Sunteți siguri că doriți să ștergeți operatorul ales?"
          navigateTo="/operators"
        /> */}
    </div>
  );
};

export default AdminHomePageMenu;
