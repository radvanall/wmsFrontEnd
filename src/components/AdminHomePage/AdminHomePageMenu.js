import React, { useState } from "react";
import { TiEdit } from "react-icons/ti";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BsCalendar2Week } from "react-icons/bs";
import { useToggle } from "../../hooks/useToggle";
import Modal from "../Modal/Modal";
import CloseModal from "../CloseModal/CloseModal";
import Calendar from "../Calendar/Calendar";
import EditAdmin from "../EditAdmin/EditAdmin";

const AdminHomePageMenu = ({ admin, workedDays, fetchData }) => {
  const { status: isOpenModify, toggleStatus: toggleModify } = useToggle(false);
  const { status: isOpenCalendar, toggleStatus: toggleCalendar } =
    useToggle(false);
  const handleModify = () => {
    toggleModify();
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

      {admin && (
        <EditAdmin
          active={isOpenModify}
          setActive={toggleModify}
          administrator={admin}
          fetchData={fetchData}
        />
      )}
    </div>
  );
};

export default AdminHomePageMenu;
