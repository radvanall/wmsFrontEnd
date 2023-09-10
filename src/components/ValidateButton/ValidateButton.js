import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import "./ValidateButton.css";
import { AiOutlineDownload } from "react-icons/ai";
import PDFFile from "../PDFFile/PDFFile";
import { PDFDownloadLink } from "@react-pdf/renderer";
const ValidateButton = ({
  validated,
  toggleDeleteInvoice,
  invoiceHeader,
  pdfStocks,
}) => {
  return (
    <div className="delete__invoce__wrapper">
      {!validated && (
        <button
          className="invoice__table__button"
          onClick={toggleDeleteInvoice}
        >
          <RiDeleteBin6Line className="search_menu_button menu__opened" />
        </button>
      )}
      <PDFDownloadLink
        document={<PDFFile invoiceHeader={invoiceHeader} data={pdfStocks} />}
        fileName="factura"
      >
        {({ loading }) =>
          loading ? (
            "loading>>"
          ) : (
            <AiOutlineDownload className={"search_menu_button menu__opened"} />
          )
        }
      </PDFDownloadLink>
    </div>
  );
};

export default ValidateButton;
