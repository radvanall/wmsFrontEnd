import React from "react";
import Modal from "../Modal/Modal";
import { CgCloseR } from "react-icons/cg";

const EditStock = ({ active, handleCloseModal }) => {
  return (
    <Modal active={active}>
      <CgCloseR onClick={handleCloseModal} />
      EditStock
    </Modal>
  );
};

export default EditStock;
