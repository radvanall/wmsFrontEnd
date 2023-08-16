import React from "react";
import ResponsiveTable from "../ResponsiveTable/ResponsiveTable";
import { useNavigate } from "react-router-dom";
import "./OperatorInvoice.css";
const OperatorInvoice = ({ invoices }) => {
  const navigate = useNavigate();
  const handleDetails = (id) => {
    navigate(`/orders/${id}`);
  };
  return (
    <div className="operator__invoice__wrapper">
      {invoices.length && (
        <ResponsiveTable
          data={invoices}
          title="Facturile operatorului:"
          handleDetails={handleDetails}
        />
      )}
    </div>
  );
};

export default OperatorInvoice;
