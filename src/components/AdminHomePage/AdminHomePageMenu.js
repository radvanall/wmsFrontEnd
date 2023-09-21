import React, { useState } from "react";
import { TiEdit } from "react-icons/ti";
import { AiOutlineKey } from "react-icons/ai";
import { BsCalendar2Week } from "react-icons/bs";
import { useToggle } from "../../hooks/useToggle";
import Modal from "../Modal/Modal";
import CloseModal from "../CloseModal/CloseModal";
import Calendar from "../Calendar/Calendar";
import EditAdmin from "../EditAdmin/EditAdmin";
import ChangePasswordModal from "../ChangePasswordModal/ChangePasswordModal";

const AdminHomePageMenu = ({ admin, workedDays, fetchData }) => {
  const { status: isOpenModify, toggleStatus: toggleModify } = useToggle(false);
  const { status: isOpenCalendar, toggleStatus: toggleCalendar } =
    useToggle(false);
  const { status: isOpenChangePassword, toggleStatus: toggleChangePassword } =
    useToggle(false);
  const handleModify = () => {
    toggleModify();
  };
  const handleClosePasswordForm = () => {
    toggleChangePassword();
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
      <AiOutlineKey
        className={
          isOpenChangePassword
            ? "search_menu_button menu__opened"
            : "search_menu_button menu__closed"
        }
        onClick={handleClosePasswordForm}
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
        <>
          <EditAdmin
            active={isOpenModify}
            setActive={toggleModify}
            administrator={admin}
            fetchData={fetchData}
          />

          <ChangePasswordModal
            active={isOpenChangePassword}
            handleCloseForm={handleClosePasswordForm}
            id={admin.id}
            endpoint="http://localhost:8080/api/administrator/changePassword/"
            fetchData={fetchData}
          />
        </>
      )}
    </div>
  );
};

export default AdminHomePageMenu;
