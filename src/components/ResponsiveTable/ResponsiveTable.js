import React, { useEffect, useState } from "react";
import { TiEdit } from "react-icons/ti";
import { RiDeleteBin6Line } from "react-icons/ri";
import "./ResponsiveTable.css";
const ResponsiveTable = ({
  data,
  title,
  checkEdit,
  isModifying,
  changingRowId,
  handleEdit,
  handleDelete,
  handleDatails,
}) => {
  const [header, setHeader] = useState([]);
  const [cellWidth, setCellWidth] = useState(0);

  useEffect(() => {
    if (Array.isArray(data) && data.length > 0) {
      const header = Object.keys(data[0]).filter((key) => key !== "last");
      setHeader(header);
      const columns =
        handleEdit || handleDelete || handleDatails
          ? header.length
          : header.length - 1;
      console.log("array lenght:", header.length);
      setCellWidth(95 / columns);
    }
  }, [data]);

  return data?.length ? (
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
                {columnName === "image" ? "Imagine" : columnName}
              </th>
            ))}
          {(handleEdit || handleDelete || handleDatails) && (
            <th style={{ width: `${cellWidth}%` }}>Acțiuni</th>
          )}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr
            key={row.id}
            className={
              isModifying && parseInt(changingRowId) === parseInt(row.id)
                ? "modified"
                : row.id
            }
          >
            {Object.keys(row)
              .filter((field) => field !== "last")
              .map((cell, index) => (
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
              <td className="buttons__cell" style={{ width: `${cellWidth}%` }}>
                {checkEdit
                  ? handleEdit &&
                    row.last && (
                      <button
                        className="invoice__table__button"
                        onClick={() => {
                          handleEdit(row.id);
                        }}
                      >
                        <TiEdit className="search_menu_button menu__opened" />
                      </button>
                    )
                  : handleEdit && (
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
  ) : (
    <p>Tabelul e gol</p>
  );
};

export default ResponsiveTable;
