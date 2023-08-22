import React from "react";
import { useEffect, useState } from "react";
import useGetData from "../../hooks/useGetData";
import { useSelector } from "react-redux";
// import "./SingleOperator.css";
import usePostData from "../../hooks/usePostData";
import moment from "moment";
import getFormatedDate from "../../functions/getFormatedDate";
import Calendar from "../../components/Calendar/Calendar";
import OperatorInvoice from "../../components/OperatorInvoice/OperatorInvoice";
import { useNavigate } from "react-router-dom";
import Operator from "../operator/Operator";
import { useToggle } from "../../hooks/useToggle";
import { BiPlusMedical } from "react-icons/bi";
import CustomerPurchasesChart from "../../components/CustomersPurchasesChart/CustomerPurchasesChart";
const OperatorHomePage = () => {
  const navigate = useNavigate();
  const { status: isOpenCreate, toggleStatus: toggleCreate } = useToggle(false);
  const operatorId = useSelector((state) => state.userSlice.userData?.id);
  const [invoices, setInvoices] = useState([]);
  const [orders, setOrders] = useState([]);
  const [operator, setOperator] = useState({});
  const [workedDays, setWorkedDays] = useState([]);
  const {
    message,
    loading: postLoading,
    error: postError,
    resetMessage,
    postData,
  } = usePostData();
  const { data, loading, error, getData } = useGetData(
    "http://localhost:8080/api/operator/read/"
  );
  const getField = (invoice) => ({
    id: invoice.id,
    Client: invoice.customer,
    Data: getFormatedDate(invoice.date, "RO-ro"),
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
  });
  useEffect(() => {
    if (data) {
      console.log("data:", data);
      const { invoices, workedDays, ...operatorData } = data;

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
      console.log("workedHours;", hoursWorkedThisMonth);
      setOperator({ ...operatorData, hoursThisMonth: hoursWorkedThisMonth });
      console.log("single operator:", today);
      setWorkedDays(workedDays);
      const newArray = invoices
        .filter((item) => item.shipped)
        .map((invoice) => getField(invoice));
      setInvoices(newArray);
      const newOrders = invoices
        .filter((item) => !item.shipped)
        .map((invoice) => getField(invoice));
      setOrders(newOrders);
    }
  }, [data]);
  useEffect(() => {
    getData(operatorId);
  }, [operatorId]);

  return (
    <div className="Single">
      <div className="menu__buttons">
        {toggleCreate && (
          <BiPlusMedical
            className={
              isOpenCreate
                ? "search_menu_button menu__opened"
                : "search_menu_button menu__closed"
            }
            onClick={() => {
              navigate("/orders/newOrder");
            }}
          />
        )}
      </div>
      {operator && data && <Operator operator={operator} />}
      {data && <Calendar operator={operator} workedDays={workedDays} />}
      {/* <Chart /> */}
      {/* <div className="chart">
        <CustomerPurchasesChart
          id={operatorId}
          url="http://localhost:8080/api/operator/getSales"
          label="Vânzări"
        />
      </div> */}
      <OperatorInvoice invoices={orders} title="Comenzi" />

      <OperatorInvoice invoices={invoices} title="Facturi" />
    </div>
  );
};

export default OperatorHomePage;
