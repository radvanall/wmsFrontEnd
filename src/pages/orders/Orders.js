import React from "react";
import "./Orders.css";
import { BiPlusMedical } from "react-icons/bi";
import BasicButton from "../../components/BasicButton/BasicButton";
import { useNavigate } from "react-router-dom";
const Orders = () => {
  const navigate = useNavigate();

  return (
    <div className="Orders">
      <BiPlusMedical
        className={"search_menu_button menu__opened"}
        onClick={() => navigate("/orders/newOrder")}
      />
      Orders
    </div>
  );
};

export default Orders;
