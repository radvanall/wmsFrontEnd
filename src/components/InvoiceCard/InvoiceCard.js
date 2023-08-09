import React from "react";
import "./InvoiceCard.css";
import Card from "../Card/Card";
import getFormatedDate from "../../functions/getFormatedDate";
const InvoiceCard = ({ invoice }) => {
  console.log("invoice:", invoice);
  return (
    <div className="single__order__card__wrapper">
      <Card>
        <div className="order__card">
          <div className="client__block">
            <h3>Client</h3>
            <img src={invoice.image} alt="" />
            <p>{invoice.clientName}</p>
          </div>
          <div className="invoice__block">
            <p>
              <span>Factura nr.:</span>
              <span>{invoice.id}</span>
            </p>
            <p>
              <span>Data:</span>
              <span>{getFormatedDate(invoice.date, "RO-ro")}</span>
            </p>
            <p>
              <span>Operatorul:</span>
              <span>{invoice.operatorName}</span>
            </p>
            <p>
              <span>Prețul total:</span>
              <span>{invoice.totalPrice} lei</span>
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default InvoiceCard;
