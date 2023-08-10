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
import "./SingleOrder.css";

const SingleOrder = () => {
  const { status: isOpenCreate, toggleStatus: toggleCreate } = useToggle(false);
  //   const { status: isOpenEdit, toggleStatus: toggleEdit } = useToggle(false);
  const { status: isOpenDelete, toggleStatus: toggleDelete } = useToggle(false);
  const [selectedOrderId, setSelectedOrderId] = useState();
  const { orderId } = useParams();
  const { data, loading, error, getData } = useGetData(
    "http://localhost:8080/api/invoice/read/"
  );
  const {
    message,
    loading: load,
    error: errorMessage,
    resetMessage,
    postData,
  } = usePostData();
  const {
    message: deleteMessage,
    error: deleteError,
    error: deleteErrorMessage,
    deleteData,
  } = useDelete();
  const [invoice, setInvoice] = useState(null);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    getData(orderId);
  }, [orderId]);
  useEffect(() => {
    if (data) {
      console.log("data:", data);
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
      setOrders(newArray);
    }
  }, [data]);
  console.log(orderId);
  //   const openEdit = (id) => {
  //     console.log("edit-", id);
  //     setSelectedOrderId(id);
  //     toggleEdit();
  //   };
  const openDelete = (id) => {
    setSelectedOrderId(id);
    toggleDelete();
  };
  const deleteItem = async () => {
    console.log("delete-", selectedOrderId);
    await deleteData(
      `http://localhost:8080/api/invoice/deleteOrder/${selectedOrderId}`
    );
    getData(orderId);
    setSelectedOrderId(null);
    toggleDelete();
  };
  return (
    <div className="page__wrapper single__order__page">
      {data && (
        <>
          {invoice && (
            <InvoiceCard invoice={invoice} refetch={() => getData(orderId)} />
          )}
          {orders && invoice && (
            <InvoiceContentTable
              validated={invoice.shipped}
              data={orders}
              title="Cumpărături:"
              isOpenCreate={isOpenCreate}
              toggleCreate={toggleCreate}
              //   openEdit={openEdit}
              openDelete={openDelete}
            />
          )}
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
    </div>
  );
};

export default SingleOrder;
