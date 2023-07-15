import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useGetData from "../../hooks/useGetData";
import InvoiceReceptionCard from "../../components/InvoiceReceptionCard/InvoiceReceptionCard";
import ResponsiveTable from "../../components/ResponsiveTable/ResponsiveTable";
import InvoiceTable from "../../components/InvoiceTable/InvoiceTable";
import "./SingleInvoice.css";
import Card from "../../components/Card/Card";
import usePostData from "../../hooks/usePostData";
import { BiPlusMedical } from "react-icons/bi";
import { useToggle } from "../../hooks/useToggle";
const SingleInvoice = () => {
  const { invoiceId } = useParams();
  const { status: isOpenCreate, toggleStatus: toggleCreate } = useToggle(false);
  const [invoice, setInvoice] = useState();
  const [stocks, setStocks] = useState();
  const { data, loading, error, getData } = useGetData(
    "http://localhost:8080/api/invoiceReception/read/"
  );
  const {
    message,
    loading: load,
    error: errorMessage,
    resetMessage,
    postData,
  } = usePostData();

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
  const deleteStock = async (id) => {
    console.log(id);
    await postData({ id: id }, `http://localhost:8080/api/stock/delete`);
    getData(invoiceId);
  };
  console.log("invoiceId:", invoiceId);
  return (
    <div className="single__invoice">
      SingleInvoice
      {invoice && <InvoiceReceptionCard invoice={invoice} getData={getData} />}
      <br />
      {stocks && (
        <Card>
          {invoice.validated ? null : (
            <div className="stock__button__wrapper">
              <BiPlusMedical
                className={
                  isOpenCreate
                    ? "search_menu_button menu__opened"
                    : "search_menu_button menu__closed"
                }
                // onClick={toggleCreate}
              />
            </div>
          )}

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
            handleDelete={invoice.validated ? null : deleteStock}
          />
        </Card>
      )}
    </div>
  );
};

export default SingleInvoice;
