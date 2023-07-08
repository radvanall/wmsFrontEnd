import React from "react";
import { useState, useEffect } from "react";
import "./InvoiceTable.css";
import { TiEdit } from "react-icons/ti";
import { RiDeleteBin6Line } from "react-icons/ri";
const InvoiceTable = ({
  data,
  header,
  handleEdit,
  handleDelete,
  invoiceModified,
  invoiceId,
}) => {
  const [dataHeader, setDataHeader] = useState("");
  //let dataHeader = "";
  //   if (data.length > 0) {
  //     setDataHeader(Object.keys(data[0]));
  //     // dataHeader = Object.keys(data[0]);
  //     console.log(Object.keys(data[0]));
  //   }
  useEffect(() => {
    if (Array.isArray(data) && data.length > 0) {
      setDataHeader(
        Object.keys(data[0]).filter((field) => field !== "productId")
      );
      console.log(Object.keys(data[0]));
      console.log(data);
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
                            src={row[key]}
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
                  {handleEdit && (
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
          {/* <div className="all__invoice__table">
            <Link to={`/${itemLink}`} className="link__to__item">
              Vezi toate
            </Link>
          </div> */}
        </div>
      ) : (
        <h2>Nu exista rezultate</h2>
      )}
    </div>
  );
};

export default InvoiceTable;
