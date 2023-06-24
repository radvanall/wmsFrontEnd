import React from "react";
import "./AlertMessage.css";

const AlertMessage = ({ message, active, children }) => {
  return (
    <div
      className={
        active
          ? "active alert__message__container"
          : "alert__message__container"
      }
    >
      <div
        className={
          active ? "active alert__message__box" : "alert__message__box"
        }
      >
        <h2>{message}</h2>
        <div className="alert__message__buttons">{children}</div>
      </div>
    </div>
  );
};

export default AlertMessage;
