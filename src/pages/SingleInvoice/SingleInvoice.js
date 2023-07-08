import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useGetData from "../../hooks/useGetData";
import InvoiceReceptionCard from "../../components/InvoiceReceptionCard/InvoiceReceptionCard";
import InvoiceTable from "../../components/InvoiceTable/InvoiceTable";
const SingleInvoice = () => {
  const { invoiceId } = useParams();
  const [invoice, setInvoice] = useState();
  const [stocks, setStocks] = useState();
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
      const { stocks: newStocks, ...newObject } = data;
      setInvoice(newObject);
      const newArray = newStocks.map((stock) => ({
        id: stock.id,
        productImg: stock.position.image,
        Produs: stock.position.name,
        ["Preț de cumpărare"]: stock.buyingPrice,
        ["Preț de vînzare"]: stock.sellingPrice,
        ["Cantitate"]: stock.stockQuantity,
        Unitate: stock.position.unity,
      }));
      setStocks(newArray);
    }
  }, [data]);

  console.log("invoiceId:", invoiceId);
  return (
    <div>
      SingleInvoice
      {invoice && <InvoiceReceptionCard invoice={invoice} />}
      {/* {stocks && <InvoiceTable data={stocks} header="Stocuri:" />} */}
    </div>
  );
};

export default SingleInvoice;
