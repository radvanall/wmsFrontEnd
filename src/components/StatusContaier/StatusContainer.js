import React from "react";
import "./StatusContainer.css";
import { AiOutlineCheck } from "react-icons/ai";

const StatusContainer = ({ validated, setActive }) => {
  return (
    <div className="status__container">
      {validated ? (
        <span className="status_v">validat</span>
      ) : (
        <div className="status__unvalidated">
          <span className="status_n">nevalidat</span>
          <button
            className="invoice__table__button"
            onClick={() => setActive(true)}
          >
            <AiOutlineCheck className="search_menu_button validate__button" />
          </button>
        </div>
      )}
    </div>
  );
};

export default StatusContainer;
