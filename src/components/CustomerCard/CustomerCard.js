import React from "react";
import Card from "../Card/Card";
import "./CustomerCard.css";
import { TiEdit } from "react-icons/ti";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useToggle } from "../../hooks/useToggle";
import EditCustomer from "../EditCustomer/EditCustomer";
const CustomerCard = ({ customer, fetchData }) => {
  const { status: isOpenModify, toggleStatus: toggleModify } = useToggle(false);
  const { status: isOpenDelete, toggleStatus: toggleDelete } = useToggle(false);
  return (
    <Card>
      <div className="single__order__card">
        <div className="client__block">
          <h3>Client</h3>
          <img src={customer.avatar} alt="" className="client__avatar" />
          <p>{customer.nickname}</p>
        </div>
        <div className="data__block">
          <p>
            <span>Id:</span>
            <span>{customer.id}</span>
          </p>
          <p>
            <span>Email:</span>
            <span>{customer.email}</span>
          </p>
          <p>
            <span>Tel:</span>
            <span>{customer.phone}</span>
          </p>
          <p>
            <span>Adresa:</span>
            <span>{customer.address}</span>
          </p>
          <p>
            <span>Statut:</span>
            {customer.active ? (
              <span
                style={{
                  backgroundColor: "#b4f8c8",
                  borderRadius: "5px",
                  padding: " 0 10px",
                }}
              >
                Activ
              </span>
            ) : (
              <span
                style={{
                  backgroundColor: "#ffaebc",
                  borderRadius: "5px",
                  padding: "0 10px",
                }}
              >
                Inactiv
              </span>
            )}
          </p>
          <div className="customer__actions">
            <TiEdit
              className={
                isOpenModify
                  ? "search_menu_button menu__opened"
                  : "search_menu_button menu__closed"
              }
              onClick={toggleModify}
            />
            <RiDeleteBin6Line
              className={
                isOpenDelete
                  ? "search_menu_button menu__opened"
                  : "search_menu_button menu__closed"
              }
              onClick={toggleDelete}
            />
          </div>
        </div>
      </div>
      <EditCustomer
        customer={customer}
        active={isOpenModify}
        setActive={toggleModify}
        fetchData={fetchData}
      />
    </Card>
  );
};

export default CustomerCard;
