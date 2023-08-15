import React from "react";
import { useEffect, useState } from "react";
import useGetData from "../../hooks/useGetData";
import { useParams } from "react-router-dom";
import "./SingleOperator.css";
import usePostData from "../../hooks/usePostData";
import moment from "moment";
import getFormatedDate from "../../functions/getFormatedDate";
import Calendar from "../../components/Calendar/Calendar";
import Chart from "../../components/Chart/Chart";
import OperatorInvoice from "../../components/OperatorInvoice/OperatorInvoice";
import Operator from "../operator/Operator";

const SingleOperator = () => {
  const { operatorId } = useParams();
  const [invoices, setInvoices] = useState([]);
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
  useEffect(() => {
    if (data) {
      console.log("data:", data);
      const { invoices, workedDays, ...operatorData } = data;
      setOperator(operatorData);
      //  const workDayArray=workedDays.map(day=>{

      //  })
      setWorkedDays(workedDays);
      const newArray = invoices.map((invoice) => ({
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
      }));
      setInvoices(newArray);
    }
  }, [data]);
  useEffect(() => {
    getData(operatorId);
  }, [operatorId]);

  const handleHours = async (hours, selectedDay) => {
    console.log("hours=", hours);
    console.log("selectedDay=", selectedDay);
    const queryParams = `?id=${operatorId}&date=${selectedDay.toLocaleDateString(
      "RO-ro"
    )}&workedHours=${hours}`;
    await postData(
      {},
      "http://localhost:8080/api/operator/setWorkedHours" + queryParams
    );
    getData(operatorId);
  };
  return (
    <div className="Single">
      {operator && data && <Operator operator={operator} />}
      {data && (
        <Calendar
          operator={operator}
          workedDays={workedDays}
          handleHours={handleHours}
        />
      )}
      <Chart />
      <OperatorInvoice />
    </div>
  );
};

export default SingleOperator;
