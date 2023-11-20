import React from "react";
import "./Modal.css";
const Modal = ({ active, children, width, minWidth }) => {
  return (
    <div className={active ? "modal active" : "modal"}>
      <div
        className={active ? "modal__content active" : "modal__content"}
        style={{
          width: width ? width : "",
          minWidth: minWidth ? minWidth : "",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
