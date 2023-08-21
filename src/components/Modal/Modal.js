import React from "react";
import "./Modal.css";
const Modal = ({ active, children, width, minWidth }) => {
  return (
    <div
      className={active ? "modal active" : "modal"}

      // onClick={() => setActive(false)}
    >
      <div
        className={active ? "modal__content active" : "modal__content"}
        style={{
          width: width ? width : "",
          minWidth: minWidth ? minWidth : "",
        }}
        // onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
