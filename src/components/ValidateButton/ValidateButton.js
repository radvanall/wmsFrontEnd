import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import "./ValidateButton.css";
const ValidateButton = ({ validated, toggleDeleteInvoice }) => {
  return validated ? (
    <></>
  ) : (
    <div className="delete__invoce__wrapper">
      <button className="invoice__table__button" onClick={toggleDeleteInvoice}>
        <RiDeleteBin6Line className="search_menu_button menu__opened" />
      </button>
    </div>
  );
};

export default ValidateButton;
