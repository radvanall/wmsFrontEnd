import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useGetData from "../../hooks/useGetData";
import InvoiceReceptionCard from "../../components/InvoiceReceptionCard/InvoiceReceptionCard";
import ResponsiveTable from "../../components/ResponsiveTable/ResponsiveTable";
import InvoiceTable from "../../components/InvoiceTable/InvoiceTable";
import "./SingleInvoice.css";
import Card from "../../components/Card/Card";
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
        image: stock.position.image,
        Produs: stock.position.name,
        ["Preț de cumpărare"]: stock.buyingPrice,
        ["Preț de vînzare"]: stock.sellingPrice,
        ["Cantitate"]: stock.stockQuantity,
        Unitate: stock.position.unity,
      }));
      setStocks(newArray);
    }
  }, [data]);
  const deleteStock = (id = {});
  console.log("invoiceId:", invoiceId);
  return (
    <div className="single__invoice">
      SingleInvoice
      {invoice && <InvoiceReceptionCard invoice={invoice} getData={getData} />}
      <br />
      {stocks && (
        <Card>
          <ResponsiveTable
            data={stocks}
            title="Stocuri:"
            handleEdit={
              invoice.validated
                ? null
                : (id) => {
                    console.log(id);
                  }
            }
            handleDelete={
              invoice.validated
                ? null
                : (id) => {
                    console.log(id);
                  }
            }
          />
        </Card>
      )}
    </div>
  );
};

export default SingleInvoice;
