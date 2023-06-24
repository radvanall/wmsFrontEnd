import React from "react";
import invoiceData from "../../invoiceData";
import { Link } from "react-router-dom";
import "./OperatorInvoice.css";
const OperatorInvoice = () => {
  const invoiceHeader = Object.keys(invoiceData[0]);
  return (
    <div className="operator__invoice__wrapper">
      <h2>Ultimile facturi:</h2>
      <div className="operator__invoice">
        <table>
          <thead className="invoice__header">
            <tr>
              {invoiceHeader.map((item) => (
                <th key={item}>{item}</th>
              ))}
              <th>Actiuni</th>
            </tr>
          </thead>
          <tbody className="invoice__table__body">
            {invoiceData.map((row) => (
              <tr key={row.id}>
                {Object.keys(row).map((key, index) => (
                  <td key={index} className={key}>
                    {row[key]}
                  </td>
                ))}
                <td>
                  <button className="invoice__table__details">Detalii</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="all__operators__invoice">
          <Link to={`/operatorsinvoice`} className="link__to__invoice">
            Vezi toate
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OperatorInvoice;
