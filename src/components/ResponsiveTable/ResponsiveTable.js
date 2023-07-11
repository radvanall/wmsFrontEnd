import React, { useEffect, useState } from "react";
import { TiEdit } from "react-icons/ti";
import { RiDeleteBin6Line } from "react-icons/ri";
import "./ResponsiveTable.css";
const ResponsiveTable = ({
  data,
  title,
  handleEdit,
  handleDelete,
  handleDatails,
}) => {
  const [header, setHeader] = useState([]);
  const [cellWidth, setCellWidth] = useState(0);

  useEffect(() => {
    if (Array.isArray(data) && data.length > 0) {
      setHeader(Object.keys(data[0]));
      const columns =
        handleEdit || handleDelete || handleDatails
          ? Object.keys(data[0]).length
          : Object.keys(data[0]).length - 1;
      console.log("array lenght:", Object.keys(data[0]).length);
      setCellWidth(95 / columns);
    }
  }, [data]);
  console.log(data.id);
  return (
    <table className="responsive__table">
      {title && <caption>{title}</caption>}
      <thead>
        <tr>
          {header &&
            header.map((columnName) => (
              <th
                key={columnName}
                style={
                  columnName === "id"
                    ? { width: "5%" }
                    : { width: `${cellWidth}%` }
                }
              >
                {columnName}
              </th>
            ))}
          {(handleEdit || handleDelete || handleDatails) && (
            <th style={{ width: `${cellWidth}%` }}>Acțiuni</th>
          )}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.id}>
            {Object.keys(row).map((cell, index) => (
              <td
                key={index}
                className={cell}
                style={
                  cell === "id" ? { width: "5%" } : { width: `${cellWidth}%` }
                }
              >
                {cell === "image" ? <img src={row[cell]} /> : row[cell]}
              </td>
            ))}
            {(handleEdit || handleDelete || handleDatails) && (
              <td className="buttons__cell">
                {handleEdit && (
                  <button
                    className="invoice__table__button"
                    onClick={() => {
                      handleEdit(row.id);
                    }}
                  >
                    <TiEdit className="search_menu_button menu__opened" />
                  </button>
                )}
                {handleDelete && (
                  <button
                    className="invoice__table__button"
                    onClick={() => {
                      handleDelete(row.id);
                    }}
                  >
                    <RiDeleteBin6Line className="search_menu_button menu__opened" />
                  </button>
                )}
                {handleDatails && (
                  <button
                    className="invoice__table__button"
                    onClick={() => {
                      handleDatails(row.id);
                    }}
                  >
                    Detalii
                  </button>
                )}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ResponsiveTable;
