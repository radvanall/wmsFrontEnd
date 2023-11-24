import React, { useState, useEffect } from "react";
import InvoiceMenu from "../../components/InvoiceMenu/InvoiceMenu";
import useFetch from "../../hooks/useFetch";
import Table from "../../components/Table/Table";
import DeleteMessage from "../../components/DeleteMessage/DeleteMessage";
const Invoice = () => {
  const { data, loading, error, fetchData } = useFetch(
    "http://localhost:8080/api/invoiceReception/readInvoiceReceptionTable"
  );
  const [invoices, setInvoices] = useState(null);
  useEffect(() => {
    if (data) {
      const options = { day: "numeric", month: "long", year: "numeric" };
      const newArray = data.map((invoice) => {
        const dateOfCreation = new Date(invoice.dateOfCreation)
          .toLocaleDateString("ro-RO", options)
          .toUpperCase();
        const dateOfValidation = invoice.dateOfValidation
          ? new Date(invoice.dateOfValidation)
              .toLocaleDateString("ro-RO", options)
              .toUpperCase()
          : "none";
        return {
          id: invoice.id,
          Furnizor: invoice.provider,
          ["Creată de"]: invoice.createdBy,
          ["Data creării"]: dateOfCreation,
          ["Validată de"]: invoice.validatedBy,
          ["Data validării"]: dateOfValidation,
          ["Prețul total de cumpărare"]: invoice.totalBuyingPrice,
          ["Prețul total de vînzare"]: invoice.totalSellingPrice,
          Validat: {
            text: invoice.validated ? "validat" : "nevalidat",
            state: invoice.validated ? "activ" : "inactiv",
          },
        };
      });
      setInvoices(newArray);
    }
  }, [data]);
  return (
    <div>
      <InvoiceMenu fetchData={fetchData} />
      {invoices &&
        (invoices.length !== 0 ? (
          <Table data={invoices} page="invoices" coloredCell="Validat" />
        ) : (
          <h2>Nu exista rezultate</h2>
        ))}
      <DeleteMessage />
    </div>
  );
};

export default Invoice;
