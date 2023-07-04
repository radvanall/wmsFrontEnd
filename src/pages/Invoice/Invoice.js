import React, { useState, useEffect } from "react";
import InvoiceMenu from "../../components/InvoiceMenu/InvoiceMenu";
import useFetch from "../../hooks/useFetch";
import Table from "../../components/Table/Table";

const Invoice = () => {
  const { data, loading, error, fetchData } = useFetch(
    "http://localhost:8080/api/invoiceReception/readInvoiceReceptionTable"
  );
  const [invoices, setInvoices] = useState(null);
  useEffect(() => {
    console.log(data);
    if (data) {
      const newArray = data.map((invoice) => {
        return {
          id: invoice.id,
          Furnizor: invoice.provider,
          ["Creată de"]: invoice.createdBy,
          ["Data creării"]: invoice.dateOfCreation.slice(0, 10),
          ["Validată de"]: invoice.validatedBy,
          ["Data validării"]: invoice.dateOfValidation?.slice(0, 10) ?? "none",
          ["Prețul total de cumpărare"]: invoice.totalBuyingPrice,
          ["Prețul total de vînzare"]: invoice.totalSellingPrice,
          Validat: invoice.validated ? "validat" : "nevalidat",
        };
      });
      setInvoices(newArray);
    }
  }, [data]);
  return (
    <div>
      <InvoiceMenu />

      {invoices &&
        (invoices.length !== 0 ? (
          <Table data={invoices} page="invoices" />
        ) : (
          <h2>Nu exista rezultate</h2>
        ))}
    </div>
  );
};

export default Invoice;
