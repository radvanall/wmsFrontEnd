import React from "react";
import Modal from "../Modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import CloseModal from "../CloseModal/CloseModal";
import { close } from "../../toolkitRedux/sessionExpiredSlice";
import "../DeleteItem/DeleteItem.css";
const SessionExpiredMessage = () => {
  const dispatch = useDispatch();
  const active = useSelector((state) => state.sessionExpiredSlice.opened);
  const setActive = () => {
    dispatch(close());
  };
  return (
    <Modal active={active}>
      <CloseModal handleCloseModal={setActive} />
      <div className="message_session_container">
        <h2>Sesiunea a expirat. Autentificați-vă din nou.</h2>
      </div>
    </Modal>
  );
};

export default SessionExpiredMessage;
