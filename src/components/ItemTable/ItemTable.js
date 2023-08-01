import React, { useEffect, useState } from "react";
import "./ItemTable.css";
import { Link } from "react-router-dom";
import BasicButton from "../BasicButton/BasicButton";
import getState from "../../functions/getState";
const ItemTable = ({
  data,
  header,
  handleFooterClick,
  handleEdit,
  handleDelete,
  handleDatails,
  children,
}) => {
  // let dataHeader = "";
  // if (data.length > 0) {
  //   dataHeader = Object.keys(data[0]);
  // }
  const [dataHeader, setDataHeader] = useState([]);
  const [cellWidth, setCellWidth] = useState(0);

  useEffect(() => {
    if (Array.isArray(data) && data.length > 0) {
      setDataHeader(Object.keys(data[0]));
      const columns =
        handleEdit || handleDelete || handleDatails
          ? Object.keys(data[0]).length
          : Object.keys(data[0]).length - 1;
      console.log("array lenght:", Object.keys(data[0]).length);
      setCellWidth(90 / columns);
    }
  }, [data]);

  return (
    <div className="item__table__wrapper">
      {/* <h2>{header}</h2> */}
      {children}
      {data.length > 0 ? (
        // <div className="item__table">
        <>
          <table className="item__table">
            {header && <caption>{header}</caption>}
            <thead className="item__table__header">
              <tr>
                {dataHeader.map((item) => (
                  <th
                    key={item}
                    className={item}
                    style={
                      item === "id"
                        ? { width: "10%" }
                        : { width: `${cellWidth}%` }
                    }
                  >
                    {item}
                  </th>
                ))}
                {handleDatails && <th>Actiuni</th>}
              </tr>
            </thead>
            <tbody className="item__table__body">
              {data.map((row) => (
                <tr key={row.id}>
                  {Object.keys(row).map((key, index) => (
                    <td
                      key={index}
                      className={key}
                      style={
                        key === "id"
                          ? { width: "10%" }
                          : { width: `${cellWidth}%` }
                      }
                    >
                      {key !== "Starea" ? (
                        <div className="cell">{row[key]}</div>
                      ) : (
                        <div className="cell">{getState(row[key])}</div>
                      )}
                      {/* <div
                      className={
                        key !== "state"
                          ? "cell"
                          : row[key] === "in sale"
                          ? "in__sale"
                          : "in__waiting"
                      }
                    >
                      {" "}
                      {row[key]}
                    </div> */}
                    </td>
                  ))}
                  {handleDatails && (
                    <td>
                      <button
                        className="item__table__details"
                        onClick={() => handleDatails(row.id)}
                      >
                        Detalii
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>

          {/* <Link to={`/${itemLink}`} className="link__to__item">
      Vezi toate
    </Link> */}
        </>
      ) : (
        <h2>Nu exista rezultate</h2>
      )}
      <div className="all__item__table">
        <BasicButton text="Vezi toate" handleClick={handleFooterClick} />
      </div>
    </div>
  );
};

export default ItemTable;
