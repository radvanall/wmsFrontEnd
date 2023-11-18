import { isBefore } from "date-fns";
import { AiOutlineCheck } from "react-icons/ai";
import React, { useState } from "react";
import usePostData from "../../hooks/usePostData";
import Card from "../Card/Card";
import Modal from "../Modal/Modal";
import StatusContainer from "../StatusContaier/StatusContainer";
import "./InvoiceReceptionCard.css";
import imgLink from "../../googleAPI";
import BasicButton from "../BasicButton/BasicButton";

const InvoiceReceptionCard = ({ invoice, getData, isAllowed }) => {
  const { message, loading, error, resetMessage, postData } = usePostData();
  const handleValidate = async () => {
    await postData(
      { id: invoice.id },
      `http://localhost:8080/api/invoiceReception/validate`
    );
    getData(invoice.id);
  };
  const [active, setActive] = useState(false);
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
      <StatusContainer
        validated={invoice.validated}
        setActive={setActive}
        isAllowed={isAllowed}
      />

      <div className="invoice__reception__wrapper">
        <div className="invoice__reception__block">
          <img src={imgLink + invoice.image} alt="" />
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
      <Modal active={active}>
        <div className="validation__modal">
          <p>Sunteți siguri că doriți să validați factura?</p>
          <p>
            După validare nu va fi posibil de editat sau șters această factură.
          </p>
          <div className="validation__modal__buttons">
            <BasicButton handleClick={handleValidate} text="Validează" />
            <BasicButton handleClick={() => setActive(false)} text="Anulează" />
          </div>
        </div>
      </Modal>
    </Card>
  );
};

export default InvoiceReceptionCard;
