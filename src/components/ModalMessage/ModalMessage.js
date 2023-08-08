import React from "react";
import Modal from "../Modal/Modal";
import CloseModal from "../CloseModal/CloseModal";
import BasicButton from "../BasicButton/BasicButton";
import "./ModalMessage.css";
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
      {text && <p className="modal__text">{text}</p>}
      {children && <div className="modal__children">{children}</div>}
      <div className="modal__message__buttons">
        {handleOk && <BasicButton text="Confirmă" handleClick={handleOk} />}
        {handleCancel && (
          <BasicButton text="Anulează" handleClick={handleCancel} />
        )}
      </div>
    </Modal>
  );
};

export default ModalMessage;
