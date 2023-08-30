import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useGetData from "../../hooks/useGetData";
import InvoiceReceptionCard from "../../components/InvoiceReceptionCard/InvoiceReceptionCard";
import { AiOutlineDownload } from "react-icons/ai";
import AlertMessage from "../../components/AlertMessage/AlertMessage";
import ResponsiveTable from "../../components/ResponsiveTable/ResponsiveTable";
import EditStock from "../../components/EditStock/EditStock";
import "./SingleInvoice.css";
import Card from "../../components/Card/Card";
import usePostData from "../../hooks/usePostData";
import { BiPlusMedical } from "react-icons/bi";
import { useToggle } from "../../hooks/useToggle";
import AddStock from "../../components/AddStock/AddStock";
import BasicButton from "../../components/BasicButton/BasicButton";
import DeleteItem from "../../components/DeleteItem/DeleteItem";
import InvoiceContentTable from "../../components/InvoiceContentTable/InvoiceContentTable";
import ValidateButton from "../../components/ValidateButton/ValidateButton";
// import PDFFile from "../../components/PDFFile/PDFFile";
// import { PDFDownloadLink } from "@react-pdf/renderer";
const SingleInvoice = () => {
  const { invoiceId } = useParams();
  const { status: isOpenCreate, toggleStatus: toggleCreate } = useToggle(false);
  const { status: isOpenEdit, toggleStatus: toggleEdit } = useToggle(false);
  const { status: isOpenDelete, toggleStatus: toggleDelete } = useToggle(false);
  const { status: isOpenDeleteInvoice, toggleStatus: toggleDeleteInvoice } =
    useToggle(false);
  const [invoice, setInvoice] = useState();
  const [stocks, setStocks] = useState();
  const [pdfStocks, setPdfStocks] = useState([]);
  const [selectedStock, setSelectedStock] = useState();
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
  const refetch = () => getData(invoiceId);

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
      const newPdfStocks = newStocks.map((stock) => ({
        Produs: stock.position.name,
        ["Preț de cumpărare /lei"]: stock.buyingPrice,
        ["Cantitate"]: stock.stockQuantity,
        Unitate: stock.position.unity,
        ["Preț total /lei"]: stock.stockQuantity * stock.buyingPrice,
      }));
      setStocks(newArray);
      setPdfStocks(newPdfStocks);
    }
  }, [data]);
  const deleteStock = async () => {
    console.log(selectedStock.id);
    await postData(
      { id: selectedStock.id },
      `http://localhost:8080/api/stock/delete`
    );
    getData(invoiceId);
    toggleDelete();
  };
  const openEdit = (id) => {
    const stock = stocks.find((item) => item.id === id);
    setSelectedStock(stock);
    toggleEdit();
  };
  const openDelete = (id) => {
    const stock = stocks.find((item) => item.id === id);
    setSelectedStock(stock);
    console.log("stock", stock);
    toggleDelete();
  };

  console.log("invoiceId:", invoiceId);

  return (
    <div className="single__invoice">
      {invoice && pdfStocks && (
        <ValidateButton
          validated={invoice.validated}
          toggleDeleteInvoice={toggleDeleteInvoice}
          invoiceHeader={{
            id: invoice.id,
            date: invoice.dateOfCreation,
            provider: invoice.provider,
            totalBuyingPrice: invoice.totalBuyingPrice,
            customer: "Firma srl",
          }}
          pdfStocks={pdfStocks}
        />
      )}
      {/* {invoice && pdfStocks && (
        <PDFDownloadLink
          document={
            <PDFFile
              invoiceHeader={{
                id: invoice.id,
                date: invoice.dateOfCreation,
                provider: invoice.provider,
                totalBuyingPrice: invoice.totalBuyingPrice,
                customer: "Firma srl",
              }}
              data={pdfStocks}
            />
          }
          fileName="factura"
        >
          {({ loading }) =>
            loading ? (
              "loading>>"
            ) : (
              <AiOutlineDownload
                className={"search_menu_button menu__opened"}
              />
            )
          }
        </PDFDownloadLink>
      )} */}

      {invoice && <InvoiceReceptionCard invoice={invoice} getData={getData} />}
      <br />
      {stocks && (
        <InvoiceContentTable
          validated={invoice.validated}
          data={stocks}
          title="Stocuri:"
          isOpenCreate={isOpenCreate}
          toggleCreate={toggleCreate}
          openEdit={openEdit}
          openDelete={openDelete}
        />
      )}
      {stocks && selectedStock && (
        <EditStock
          active={isOpenEdit}
          handleCloseModal={toggleEdit}
          stock={selectedStock}
          refetch={refetch}
        />
      )}
      {invoice && (
        <AddStock
          active={isOpenCreate}
          handleCloseModal={toggleCreate}
          image={invoice.image}
          provider={invoice.provider}
          providerId={invoice.providerId}
          invoiceId={invoice.id}
          refetch={refetch}
        />
      )}
      <AlertMessage
        active={isOpenDelete}
        message="Sunteți siguri că doriți să ștergeți stocul dat?"
      >
        <BasicButton type="button" text="Șterge" handleClick={deleteStock} />
        <BasicButton type="button" text="Anulează" handleClick={toggleDelete} />
      </AlertMessage>
      <DeleteItem
        active={isOpenDeleteInvoice}
        setActive={toggleDeleteInvoice}
        endpoint="invoiceReception"
        id={invoiceId}
        title="Sunteți siguri că doriți să ștergeți factura dată?"
        navigateTo="/invoices"
      />
    </div>
  );
};

export default SingleInvoice;
