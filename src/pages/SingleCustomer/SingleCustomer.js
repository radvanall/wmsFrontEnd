import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useGetData from "../../hooks/useGetData";
import getFormatedDate from "../../functions/getFormatedDate";
import CustomerCard from "../../components/CustomerCard/CustomerCard";
import Card from "../../components/Card/Card";
import CustomerPurchasesChart from "../../components/CustomersPurchasesChart/CustomerPurchasesChart";
import FavoriteProducts from "../../components/FavoriteProducts/FavoriteProducts";
import ResponsiveTable from "../../components/ResponsiveTable/ResponsiveTable";
import "./SingleCustomer.css";
import { useNavigate } from "react-router-dom";
const SingleCustomer = () => {
  const navigate = useNavigate();
  const { customerId } = useParams();
  const [invoices, setInvoices] = useState([]);
  const [customer, setCustomer] = useState({});
  console.log(customerId);
  const { data, loading, error, getData } = useGetData(
    "http://localhost:8080/api/customer/read/"
  );
  const fetchData = () => getData(customerId);
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
        Validat: invoice.shipped ? (
          <div
            style={{
              backgroundColor: "#b4f8c8",
              padding: "5px",
              borderRadius: "5px",
            }}
          >
            Validat
          </div>
        ) : (
          <div
            style={{
              backgroundColor: "#ffaebc",
              padding: "5px",
              borderRadius: "5px",
            }}
          >
            Nevalidat
          </div>
        ),
      }));
      setInvoices(newArray);
    }
  }, [data]);
  useEffect(() => {
    getData(customerId);
  }, [customerId]);
  const handleDetails = (id) => {
    navigate(`/orders/${id}`);
  };
  return (
    <div className="single__customer__wrapper">
      {data && (
        <>
          {customer && (
            <div className="card">
              <CustomerCard customer={customer} fetchData={fetchData} />{" "}
            </div>
          )}
          <div className="lineChart">
            <CustomerPurchasesChart
              id={customerId}
              url="http://localhost:8080/api/invoice/getWeeklySales"
              label="Cumpărături"
            />
          </div>
          <div className="invoices">
            <Card>
              {invoices.length && (
                <ResponsiveTable
                  data={invoices}
                  title="Facturi"
                  handleDetails={handleDetails}
                />
              )}{" "}
            </Card>
          </div>
          <div className="products">
            <FavoriteProducts id={customerId} />
          </div>
        </>
      )}
    </div>
  );
};

export default SingleCustomer;
