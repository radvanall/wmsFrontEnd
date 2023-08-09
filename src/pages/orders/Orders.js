import React, { useState, useEffect } from "react";
import "./Orders.css";
import OrderMenu from "../../components/OrderMenu/OrderMenu";
import useFetch from "../../hooks/useFetch";
import Table from "../../components/Table/Table";

const Orders = () => {
  const { data, loading, error, fetchData } = useFetch(
    "http://localhost:8080/api/invoice/readAll"
  );
  const [invoices, setInvoices] = useState(null);
  const filterInvoicesByStatus = (status) => {
    const options = { day: "numeric", month: "long", year: "numeric" };

    // if(status==="all"){
    //   newArray = data.map((invoice) => {
    //     const date = new Date(invoice.date)
    //       .toLocaleDateString("ro-RO", options)
    //       .toUpperCase();

    //     return {
    //       id: invoice.id,
    //       img: invoice.image,
    //       Client: invoice.customer,
    //       Data: date,
    //       Operator: invoice.operator,
    //       ["Prețul facturii"]: invoice.price,
    //       Validat: {
    //         text: invoice.shipped ? "validat" : "nevalidat",
    //         state: invoice.shipped ? "activ" : "inactiv",
    //       },
    //     };
    //   });
    //   setInvoices(newArray);
    //   return;
    // }
    const newArray = data
      .filter((item) => {
        if (status === "validated") {
          return item.shipped;
        } else if (status === "unvalidated") {
          return !item.shipped;
        } else return true;
      })
      .map((invoice) => {
        const date = new Date(invoice.date)
          .toLocaleDateString("ro-RO", options)
          .toUpperCase();

        return {
          id: invoice.id,
          img: invoice.image,
          Client: invoice.customer,
          Data: date,
          Operator: invoice.operator,
          ["Prețul facturii"]: invoice.price,
          Validat: {
            text: invoice.shipped ? "validat" : "nevalidat",
            state: invoice.shipped ? "activ" : "inactiv",
          },
        };
      });
    setInvoices(newArray);
  };
  useEffect(() => {
    console.log(data);
    if (data) {
      filterInvoicesByStatus("all");
    }
  }, [data]);
  return (
    <div className="Orders">
      {invoices &&
        (invoices.length !== 0 ? (
          <>
            <OrderMenu filterInvoicesByStatus={filterInvoicesByStatus} />
            <Table data={invoices} page="orders" coloredCell="Validat" />
          </>
        ) : (
          <h2>Nu exista rezultate</h2>
        ))}
    </div>
  );
};

export default Orders;
