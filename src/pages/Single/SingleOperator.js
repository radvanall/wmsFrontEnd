import React from "react";
import { useParams } from "react-router-dom";
import "./SingleOperator.css";
import data from "../../data";
import Calendar from "../../components/Calendar/Calendar";
import Chart from "../../components/Chart/Chart";
import OperatorInvoice from "../../components/OperatorInvoice/OperatorInvoice";
import Operator from "../operator/Operator";

const SingleOperator = () => {
  const { operatorId } = useParams();
  const operator = data.find((item) => item.id === Number(operatorId));
  console.log(operator.img);

  return (
    <div className="Single">
      <Operator operator={operator} />
      <Calendar operator={operator} />
      <Chart />
      <OperatorInvoice />
    </div>
  );
};

export default SingleOperator;
