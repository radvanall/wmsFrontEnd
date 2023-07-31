import React from "react";
import "./ItemTable.css";
import { Link } from "react-router-dom";
import BasicButton from "../BasicButton/BasicButton";
const ItemTable = ({ data, header, handleFooterClick, children }) => {
  let dataHeader = "";
  if (data.length > 0) {
    dataHeader = Object.keys(data[0]);
  }

  return (
    <div className="item__table__wrapper">
      <h2>{header}</h2>
      {children}
      {data.length > 0 ? (
        <div className="item__table">
          <table>
            <thead className="item__table__header">
              <tr>
                {dataHeader.map((item) => (
                  <th key={item} className={item}>
                    {item}
                  </th>
                ))}
                <th>Actiuni</th>
              </tr>
            </thead>
            <tbody className="item__table__body">
              {data.map((row) => (
                <tr key={row.id}>
                  {Object.keys(row).map((key, index) => (
                    <td key={index} className={key}>
                      <div
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
                      </div>
                    </td>
                  ))}
                  <td>
                    <button className="item__table__details">Detalii</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="all__item__table">
            <BasicButton text="Vezi toate" handleClick={handleFooterClick} />
            {/* <Link to={`/${itemLink}`} className="link__to__item">
              Vezi toate
            </Link> */}
          </div>
        </div>
      ) : (
        <h2>Nu exista rezultate</h2>
      )}
    </div>
  );
};

export default ItemTable;
