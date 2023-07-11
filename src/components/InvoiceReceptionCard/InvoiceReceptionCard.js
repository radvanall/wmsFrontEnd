import { isBefore } from "date-fns";
import { AiOutlineCheck } from "react-icons/ai";
import React from "react";
import Card from "../Card/Card";
import "./InvoiceReceptionCard.css";

const InvoiceReceptionCard = ({ invoice }) => {
  console.log("invoice:", invoice);
  const options = { day: "numeric", month: "long", year: "numeric" };
  const dateOfCreation = new Date(invoice.dateOfCreation)
    .toLocaleDateString("ro-RO", options)
    .toLowerCase();
  const dateOfValidation = invoice.dateOfValidation
    ? new Date(invoice.dateOfValidation)
        .toLocaleDateString("ro-RO", options)
        .toLowerCase()
    : "none";
  return (
    <Card>
      <div className="status__container">
        {invoice.validated ? (
          <span className="status">validat</span>
        ) : (
          <div className="status__unvalidated">
            <span className="status">nevalidat</span>
            <button className="invoice__table__button">
              <AiOutlineCheck className="search_menu_button validate__button" />
            </button>
          </div>
        )}
      </div>
      <div className="invoice__reception__wrapper">
        <div className="invoice__reception__block">
          <img src={invoice.image} alt="" />
          <p className="provider">{invoice.provider}</p>
        </div>
        <div className="invoice__reception__block">
          <p>
            <span>Creat de:</span>
            <span>{invoice.createdBy}</span>
          </p>
          <p>
            <span>Data creării:</span>
            <span>{dateOfCreation}</span>
          </p>
          <p>
            <span>Validat de:</span>
            <span>{invoice.validatedBy}</span>
          </p>
          <p>
            <span>Data validării:</span>
            <span>{dateOfValidation}</span>
          </p>
        </div>
        <div className="invoice__reception__block">
          <p>
            <span>Prețul total de cumpărare:</span>
            <span>{invoice.totalBuyingPrice}</span>
          </p>
          <p>
            <span>Prețul total de vînzare:</span>
            <span>{invoice.totalSellingPrice}</span>
          </p>
          <p>
            <span>Numărul de stocuri:</span>
            <span>{invoice.numberOfStocks}</span>
          </p>
          <p>
            <span>Numărul de produse:</span>
            <span>{invoice.numberOfProducts}</span>
          </p>
        </div>
      </div>
    </Card>
  );
};

export default InvoiceReceptionCard;
