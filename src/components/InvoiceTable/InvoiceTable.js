import React from "react";
import { useState, useEffect } from "react";
import "./InvoiceTable.css";
import { TiEdit } from "react-icons/ti";
import { RiDeleteBin6Line } from "react-icons/ri";
import imgLink from "../../googleAPI";
const InvoiceTable = ({
  data,
  header,
  handleEdit,
  handleDelete,
  invoiceModified,
  invoiceId,
}) => {
  const [dataHeader, setDataHeader] = useState("");
  useEffect(() => {
    if (Array.isArray(data) && data.length > 0) {
      setDataHeader(
        Object.keys(data[0]).filter((field) => field !== "productId")
      );
    }
  }, [data]);
  return (
    <div className="invoice__table__wrapper">
      <h2>{header}</h2>
      {data.length > 0 ? (
        <div className="invoice__table">
          <table>
            <thead className="invoice__table__header">
              <tr>
                {dataHeader &&
                  dataHeader.map((item) => (
                    <th key={item} className={item}>
                      {item}
                    </th>
                  ))}

                {handleEdit && <th>Editează</th>}
                {handleDelete && <th>Șterge</th>}
              </tr>
            </thead>
            <tbody className="invoice__table__body">
              {data.map((row) => (
                <tr
                  key={row.id}
                  className={
                    invoiceModified && parseInt(invoiceId) === parseInt(row.id)
                      ? "modified"
                      : row.id
                  }
                >
                  {Object.keys(row)
                    .filter((item) => item !== "productId")
                    .map((key, index) => (
                      <td key={index} className={key}>
                        {key === "productImg" ? (
                          <img
                            className="invoice__table__img"
                            src={imgLink + row[key]}
                            alt=""
                          />
                        ) : (
                          row[key]
                        )}
                      </td>
                    ))}

                  {handleEdit && (
                    <td>
                      <button
                        className="invoice__table__button"
                        onClick={() => {
                          handleEdit(row.id);
                        }}
                      >
                        <TiEdit className="search_menu_button menu__opened" />
                      </button>
                    </td>
                  )}
                  {handleDelete && (
                    <td>
                      <button
                        className="invoice__table__button"
                        onClick={() => {
                          handleDelete(row.id);
                        }}
                      >
                        <RiDeleteBin6Line className="search_menu_button menu__opened" />
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <h2>Nu exista rezultate</h2>
      )}
    </div>
  );
};

export default InvoiceTable;
