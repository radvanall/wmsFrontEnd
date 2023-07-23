import React from "react";
import Modal from "../Modal/Modal";
import CloseModal from "../CloseModal/CloseModal";

const StocksFilterModal = ({ active, handleModal }) => {
  return (
    <Modal active={active}>
      <CloseModal handleCloseModal={handleModal} />
    </Modal>
  );
};

export default StocksFilterModal;
