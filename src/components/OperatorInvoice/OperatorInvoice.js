import React from "react";
import ResponsiveTable from "../ResponsiveTable/ResponsiveTable";
import { useNavigate } from "react-router-dom";
import "./OperatorInvoice.css";
const OperatorInvoice = ({ invoices, title }) => {
  const navigate = useNavigate();
  const handleDetails = (id) => {
    navigate(`/orders/${id}`);
  };
  return (
    <div className="operator__invoice__wrapper">
      {invoices.length && (
        <ResponsiveTable
          data={invoices}
          title={title}
          handleDetails={handleDetails}
        />
      )}
    </div>
  );
};

export default OperatorInvoice;
