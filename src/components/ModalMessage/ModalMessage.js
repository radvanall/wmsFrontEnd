import React from "react";
import Modal from "../Modal/Modal";
import CloseModal from "../CloseModal/CloseModal";
import BasicButton from "../BasicButton/BasicButton";
const ModalMessage = ({
  isOpened,
  close,
  text,
  handleOk,
  handleCancel,
  children,
}) => {
  return (
    <Modal active={isOpened}>
      <CloseModal handleCloseModal={close} />
      <p>{text && text}</p>
      <div>{children && children}</div>
      <div>
        <BasicButton text="Confirmă" handleClick={handleOk} />
        <BasicButton text="Anulează" handleClick={handleCancel} />
      </div>
    </Modal>
  );
};

export default ModalMessage;
