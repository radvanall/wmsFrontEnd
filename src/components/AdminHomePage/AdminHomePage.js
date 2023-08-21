import React, { useEffect, useState } from "react";
import Operator from "../../pages/operator/Operator";
import useGetData from "../../hooks/useGetData";
import moment from "moment";
import AdminPageTable from "../AdminPageTable/AdminPageTable";
import { useSelector } from "react-redux";
import getFormatedDate from "../../functions/getFormatedDate";
import AdminHomePageMenu from "./AdminHomePageMenu";
const AdminHomePage = () => {
  const id = useSelector((state) => state.userSlice.userData?.id);
  console.log(id);
  const { data, loading, error, getData } = useGetData(
    "http://localhost:8080/api/administrator/read/"
  );
  const getStocks = (item) => ({
    id: item.id,
    image: item.image,
    Produs: item.name,
    Cantitate: item.quantity,
    Unitete: item.unit,
  });
  const getInvoiceReceptions = (item) => ({
    id: item.id,
    Furnizor: item.provider,
    ["Data creării"]: getFormatedDate(item.dateOfCreation, "RO-ro"),
    ["Creată de"]: item.createdBy,
    ["Preț total /cupărare"]: item.totalBuyingPrice,
    // ["Preț total /vânzare"]: item.totalSellingPrice,
  });
  const getInvoices = (item) => ({
    id: item.id,
    image: item.image,
    Client: item.customer,
    ["Data"]: getFormatedDate(item.date, "RO-ro"),
    ["Creată de"]: item.operator,
    ["Preț total /cupărare"]: item.price,
  });
  const [admin, setAdmin] = useState({});
  const [workedDays, setWorkedDays] = useState([]);
  useEffect(() => {
    if (data) {
      console.log("data:", data);

      const { workedDays, ...administratorData } = data;

      const today = moment();
      let hoursWorkedThisMonth = 0;
      if (workedDays.length > 0) {
        workedDays.forEach((day) => {
          const momentDay = moment(day.data, "YYYY-MM-DD HH:mm:ss.S");
          if (
            momentDay.isSame(today, "month") &&
            momentDay.isSame(today, "year")
          )
            hoursWorkedThisMonth += day.workedHours;
        });
      }
      setAdmin({ ...administratorData, hoursThisMonth: hoursWorkedThisMonth });
      setWorkedDays(workedDays);
      console.log("single operator:", today);
    }
  }, [data]);

  useEffect(() => {
    getData(id);
  }, [id]);

  return (
    // <div className="Single">
    <>
      <AdminHomePageMenu admin={admin} workedDays={workedDays} />
      {admin && data && <Operator operator={admin} />}
      <AdminPageTable
        getId={20}
        url={
          "http://localhost:8080/api/position/getRemainingStocks?maxQuantity="
        }
        getFields={getStocks}
        title="Stocuri limitate:"
        navTo="products"
      />
      <AdminPageTable
        getId={null}
        url={
          "http://localhost:8080/api/invoiceReception/readUnvalidatedInvoiceReceptionTable"
        }
        getFields={getInvoiceReceptions}
        title="Facturi de intrare nevalidate:"
        navTo="invoices"
      />
      <AdminPageTable
        getId={null}
        url={"http://localhost:8080/api/invoice/getPendingOrders"}
        getFields={getInvoices}
        title="Facturi în livrare:"
        navTo="orders"
      />
    </>

    // </div>
  );
};

export default AdminHomePage;
