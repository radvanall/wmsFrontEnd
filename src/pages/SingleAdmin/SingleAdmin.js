import React from "react";
import { useEffect, useState } from "react";
import useGetData from "../../hooks/useGetData";
import { useParams } from "react-router-dom";
// import "./SingleOperator.css";
import usePostData from "../../hooks/usePostData";
import moment from "moment";
import getFormatedDate from "../../functions/getFormatedDate";
import Calendar from "../../components/Calendar/Calendar";
import Chart from "../../components/Chart/Chart";
import OperatorInvoice from "../../components/OperatorInvoice/OperatorInvoice";
import SingleOperatorMenu from "../../components/SingleOperatorMenu/SingleOperatorMenu";
import Operator from "../operator/Operator";
import AdminPageTable from "../../components/AdminPageTable/AdminPageTable";
import CustomerPurchasesChart from "../../components/CustomersPurchasesChart/CustomerPurchasesChart";

const SingleAdmin = () => {
  const { administratorId } = useParams();
  const [invoices, setInvoices] = useState([]);
  const [admin, setAdmin] = useState({});
  const [workedDays, setWorkedDays] = useState([]);
  const {
    message,
    loading: postLoading,
    error: postError,
    resetMessage,
    postData,
  } = usePostData();
  const { data, loading, error, getData } = useGetData(
    "http://localhost:8080/api/administrator/read/"
  );
  const getInvoices = (invoice) => ({
    id: invoice.id,
    Furnizor: invoice.provider,
    ["Creată de"]: invoice.createdBy,
    // ["Data creării"]: invoice.dateOfCreation.slice(0, 10),
    ["Data creării"]: getFormatedDate(invoice.dateOfCreation, "RO-ro"),

    ["Data validării"]: getFormatedDate(invoice.dateOfValidation, "RO-ro"),
    ["Prețul total de cumpărare"]: invoice.totalBuyingPrice,
    ["Prețul total de vînzare"]: invoice.totalSellingPrice,
    // Validat: invoice.validated ? "validat" : "nevalidat",
  });
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
    getData(administratorId);
  }, [administratorId]);

  const handleHours = async (hours, selectedDay) => {
    console.log("hours=", hours);
    console.log("selectedDay=", selectedDay);
    const queryParams = `?id=${administratorId}&date=${selectedDay.toLocaleDateString(
      "RO-ro"
    )}&workedHours=${hours}`;
    await postData(
      {},
      "http://localhost:8080/api/administrator/setWorkedHours" + queryParams
    );
    getData(administratorId);
  };
  return (
    <div className="Single">
      {admin && data && (
        <SingleOperatorMenu
          operator={admin}
          fetchData={() => getData(administratorId)}
          user="administrator"
          url="http://localhost:8080/api/administrator/updateAdmin/"
          navigateTo="/administrators"
          isEraseble={parseInt(administratorId) !== 1 ? true : false}
        />
      )}
      {admin && data && <Operator operator={admin} />}
      {data && (
        <Calendar
          operator={admin}
          workedDays={workedDays}
          handleHours={handleHours}
        />
      )}
      <AdminPageTable
        getId={administratorId}
        url={
          "http://localhost:8080/api/invoiceReception/readInvoiceReceptionTable/"
        }
        getFields={getInvoices}
        title="Facturi validate the administratorul dat:"
        navTo="invoices"
        width="95%"
      />
      {/* <Chart /> */}
      {/* <div className="chart">
        <CustomerPurchasesChart
          id={operatorId}
          url="http://localhost:8080/api/operator/getSales"
          label="Vânzări"
        />
      </div>

      <OperatorInvoice invoices={invoices} /> */}
    </div>
  );
};

export default SingleAdmin;
