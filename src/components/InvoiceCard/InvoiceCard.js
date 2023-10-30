import React from "react";
import "./InvoiceCard.css";
import Card from "../Card/Card";
import { TiEdit } from "react-icons/ti";
import getFormatedDate from "../../functions/getFormatedDate";
import CardModal from "../CardModal/CardModal";
import { useToggle } from "../../hooks/useToggle";
import imgLink from "../../googleAPI";
const InvoiceCard = ({ invoice, refetch, isAllowed }) => {
  console.log("invoice:", invoice);
  const { status: isOpenAddressModal, toggleStatus: toggleAddressModal } =
    useToggle(false);
  return (
    <div className="single__order__card__wrapper">
      <Card>
        <div className="order__card">
          <div className="client__block">
            <h3>Client</h3>
            <img src={imgLink + invoice.image} alt="" />
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
            <div className="address__container">
              <span>Adresa:</span>
              <div>
                {invoice.address === "inStore" ? "Pe loc" : invoice.address}
                {/* Chisinau sarmisegetusa 23 ap 3 */}
                {!invoice.shipped && isAllowed && (
                  <button
                    className="address__button"
                    onClick={() => {
                      toggleAddressModal();
                    }}
                  >
                    <TiEdit className="edit__address__button menu__opened" />
                  </button>
                )}
              </div>
            </div>
            <p>
              <span>Prețul total:</span>
              <span>{invoice.totalPrice} lei</span>
            </p>
          </div>
        </div>
        <CardModal
          active={isOpenAddressModal}
          handleCloseModal={toggleAddressModal}
          clientAddress={invoice.clientAddress}
          address={invoice.address}
          refetch={refetch}
          invoiceId={invoice.id}
        />
      </Card>
    </div>
  );
};

export default InvoiceCard;
