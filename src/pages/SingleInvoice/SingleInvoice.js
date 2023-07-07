import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useGetData from "../../hooks/useGetData";
import InvoiceReceptionCard from "../../components/InvoiceReceptionCard/InvoiceReceptionCard";
const SingleInvoice = () => {
  const { invoiceId } = useParams();
  const [invoice, setInvoice] = useState();
  const { data, loading, error, getData } = useGetData(
    "http://localhost:8080/api/invoiceReception/read/"
  );

  useEffect(() => {
    async function fetchData() {
      await getData(invoiceId);
    }
    fetchData();
  }, [invoiceId]);

  useEffect(() => {
    if (data) {
      const { stocks, ...newObject } = data;
      setInvoice(newObject);
    }
  }, [data]);

  console.log("invoiceId:", invoiceId);
  return (
    <div>
      SingleInvoice
      {invoice && <InvoiceReceptionCard invoice={invoice} />}
    </div>
  );
};

export default SingleInvoice;
