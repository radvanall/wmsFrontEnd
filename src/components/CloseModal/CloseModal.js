import React from "react";
import { CgCloseR } from "react-icons/cg";
import "./CloseModal.css";
const CloseModal = ({ handleCloseModal }) => {
  return (
    <div className="close__modal__button">
      <CgCloseR onClick={handleCloseModal} className="close__svg" />
    </div>
  );
};

export default CloseModal;
