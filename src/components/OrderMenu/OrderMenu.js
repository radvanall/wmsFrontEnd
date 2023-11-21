import React, { useState } from "react";
import "./OrderMenu.css";
import { useNavigate } from "react-router-dom";
import { BiPlusMedical } from "react-icons/bi";
import RadioButton from "../RadioButton/RadioButton";
import { useSelector } from "react-redux";
const OrderMenu = ({ filterInvoicesByStatus }) => {
  const role = useSelector((state) => state.userSlice.userData?.authority);
  const navigate = useNavigate();
  const [selectedStatus, setSelectedStatus] = useState("all");
  const handleStatusClick = (e) => {
    setSelectedStatus(e.currentTarget.value);
    filterInvoicesByStatus(e.currentTarget.value);
  };
  const isStatusSelected = (value) => selectedStatus === value;
  return (
    <div className="order__menu__wrapper">
      {role === "ROLE_OPERATOR" && (
        <div className="order__menu__buttons">
          <BiPlusMedical
            className={"search_menu_button menu__opened"}
            onClick={() => navigate("/orders/newOrder")}
          />
        </div>
      )}
      <div className="status__checkbuttons">
        <RadioButton
          id="radio1"
          name="shipped"
          value="validated"
          label="Validat"
          checked={isStatusSelected("validated")}
          handleChange={handleStatusClick}
          backgroundColor="#b4f8c8"
          borderRadius="5px"
          width="100px"
        />
        <RadioButton
          id="radio2"
          name="shipped"
          value="unvalidated"
          label="Nevalidat"
          checked={isStatusSelected("unvalidated")}
          handleChange={handleStatusClick}
          backgroundColor="#ffaebc"
          borderRadius="5px"
          width="100px"
        />
        <RadioButton
          id="radio3"
          name="shipped"
          value="all"
          label="Toate"
          checked={isStatusSelected("all")}
          handleChange={handleStatusClick}
          backgroundColor="#b4f8f5"
          borderRadius="5px"
          width="100px"
        />
      </div>
    </div>
  );
};

export default OrderMenu;
