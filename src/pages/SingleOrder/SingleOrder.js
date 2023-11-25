import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useGetData from "../../hooks/useGetData";
import InvoiceCard from "../../components/InvoiceCard/InvoiceCard";
import InvoiceContentTable from "../../components/InvoiceContentTable/InvoiceContentTable";
import { useToggle } from "../../hooks/useToggle";
import AlertMessage from "../../components/AlertMessage/AlertMessage";
import BasicButton from "../../components/BasicButton/BasicButton";
import usePostData from "../../hooks/usePostData";
import useDelete from "../../hooks/useDelete";
import OrderForm from "../../components/OrderForm/OrderForm";
import DeleteItem from "../../components/DeleteItem/DeleteItem";
import ValidateButton from "../../components/ValidateButton/ValidateButton";
import StatusContainer from "../../components/StatusContaier/StatusContainer";
import { useSelector } from "react-redux";
import "./SingleOrder.css";

const SingleOrder = () => {
  const role = useSelector((state) => state.userSlice.userData?.authority);
  const isAllowed = role === "ROLE_OPERATOR";
  const { status: isOpenCreate, toggleStatus: toggleCreate } = useToggle(false);
  const { status: isOpenDelete, toggleStatus: toggleDelete } = useToggle(false);
  const { status: isOpenDeleteInvoice, toggleStatus: toggleDeleteInvoice } =
    useToggle(false);
  const { status, toggleStatus } = useToggle(false);
  const [selectedOrderId, setSelectedOrderId] = useState();
  const { orderId } = useParams();
  const { data, loading, error, getData } = useGetData(
    "http://localhost:8080/api/invoice/read/"
  );
  const { message, resetMessage, postData } = usePostData();
  const {
    message: deleteMessage,
    error: deleteError,
    error: deleteErrorMessage,
    deleteData,
  } = useDelete();
  const [invoice, setInvoice] = useState(null);
  const [orders, setOrders] = useState([]);
  const [pdfOrders, setPdfOrders] = useState([]);
  useEffect(() => {
    getData(orderId);
  }, [orderId]);
  useEffect(() => {
    if (data) {
      const { orderDTOS, ...invoiceData } = data;
      setInvoice(invoiceData);
      const newArray = orderDTOS.map((order) => ({
        id: order.id,
        image: order.productImg,
        Produs: order.productName,
        ["Preț/ buc"]: order.price,
        [`Cantitate/ buc.`]: order.quantity,
        ["Preț total"]: order.totalPrice,
        Unitate: order.unity,
      }));
      const newPdfArray = orderDTOS.map((order) => ({
        Produs: order.productName,
        ["Preț unitar /lei"]: order.price,
        Unitate: order.unity,
        [`Cantitate/ buc.`]: order.quantity,
        ["Preț total /lei"]: order.totalPrice,
      }));
      setOrders(newArray);
      setPdfOrders(newPdfArray);
    }
  }, [data]);
  const openDelete = (id) => {
    setSelectedOrderId(id);
    toggleDelete();
  };
  const deleteItem = async () => {
    await deleteData(
      `http://localhost:8080/api/invoice/deleteOrder/${selectedOrderId}`
    );
    getData(orderId);
    setSelectedOrderId(null);
    toggleDelete();
  };
  const setActive = (value) => {
    if (value) toggleStatus();
  };
  const validateInvoice = async () => {
    await postData(
      { id: invoice.id },
      `http://localhost:8080/api/invoice/validateInvoice`
    );
    getData(orderId);
    setTimeout(() => {
      resetMessage();
    }, 2000);
  };
  return (
    <div className="page__wrapper">
      {data && (
        <>
          {invoice && pdfOrders && (
            <div className="single__order__menu">
              <StatusContainer
                validated={invoice.shipped}
                setActive={setActive}
                isAllowed={isAllowed}
              />

              <ValidateButton
                validated={invoice.shipped}
                toggleDeleteInvoice={toggleDeleteInvoice}
                isAllowed={isAllowed}
                invoiceHeader={{
                  id: invoice.id,
                  date: invoice.date,
                  provider: "Firma srl",
                  totalBuyingPrice: invoice.totalPrice,
                  customer: invoice.clientName,
                }}
                pdfStocks={pdfOrders}
              />
            </div>
          )}
          <div className="single__order__page">
            {invoice && (
              <>
                <InvoiceCard
                  invoice={invoice}
                  refetch={() => getData(orderId)}
                  isAllowed={isAllowed}
                />
              </>
            )}
            {orders && invoice && (
              <InvoiceContentTable
                validated={invoice.shipped}
                data={orders}
                title="Cumpărături:"
                isAllowed={isAllowed}
                isOpenCreate={isOpenCreate}
                toggleCreate={toggleCreate}
                openDelete={openDelete}
              />
            )}
          </div>
        </>
      )}

      {isOpenCreate && (
        <OrderForm
          active={isOpenCreate}
          handleCloseModal={toggleCreate}
          invoiceId={invoice.id}
          refetch={() => getData(orderId)}
        />
      )}

      <AlertMessage
        active={isOpenDelete}
        message="Sunteți siguri că doriți să ștergeți produsul dat?"
      >
        <BasicButton type="button" text="Șterge" handleClick={deleteItem} />
        <BasicButton type="button" text="Anulează" handleClick={toggleDelete} />
      </AlertMessage>
      <AlertMessage
        active={status}
        message="Sunteți siguri că doriți să validați factura? Dacă o validați nu veți
        putea face modificări."
      >
        {message && <p style={{ color: "red" }}>{message}</p>}
        <BasicButton
          type="button"
          text="Validează"
          handleClick={validateInvoice}
        />
        <BasicButton type="button" text="Închide" handleClick={toggleStatus} />
      </AlertMessage>
      <DeleteItem
        active={isOpenDeleteInvoice}
        setActive={toggleDeleteInvoice}
        endpoint="invoice"
        id={orderId}
        title="Sunteți siguri că doriți să ștergeți factura dată?"
        navigateTo="/orders"
      />
    </div>
  );
};

export default SingleOrder;
