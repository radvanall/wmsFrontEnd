import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useGetData from "../../hooks/useGetData";
import getFormatedDate from "../../functions/getFormatedDate";
import CustomerCard from "../../components/CustomerCard/CustomerCard";
import "./SingleCustomer.css";
const SingleCustomer = () => {
  const { customerId } = useParams();
  const [invoices, setInvoices] = useState([]);
  const [customer, setCustomer] = useState({});
  console.log(customerId);
  const { data, loading, error, getData } = useGetData(
    "http://localhost:8080/api/customer/read/"
  );

  useEffect(() => {
    if (data) {
      console.log("data:", data);
      const { invoices, ...customerData } = data;
      setCustomer(customerData);

      const newArray = invoices.map((invoice) => ({
        id: invoice.id,
        Data: getFormatedDate(invoice.date, "RO-ro"),
        Adresa: invoice.address,
        Operatorul: invoice.operatorName,
        ["Preț total lei."]: invoice.totalPrice,
        Validat: invoice.shipped,
      }));
      setInvoices(newArray);
    }
  }, [data]);
  useEffect(() => {
    getData(customerId);
  }, [customerId]);

  return (
    <div className="single__customer__wrapper">
      {data && (
        <>
          {customer && (
            <div className="card">
              <CustomerCard customer={customer} />{" "}
            </div>
          )}
        </>
      )}
      <div className="lineChart">lineChart</div>
      <div className="invoices">invoices</div>
      <div className="products">products</div>
    </div>
  );
};

export default SingleCustomer;
