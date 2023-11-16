import "./Table.css";
import { Link } from "react-router-dom";
import React from "react";
import Pagination from "../Pagination/Pagination";
import { FaSortNumericDown, FaSortNumericUp } from "react-icons/fa";
import useTableSettings from "./useTableSettings";
import imgLink from "../../googleAPI";

export default function Table({ data, page, coloredCell }) {
  console.log(data);
  const {
    tableHeader,
    sortColumnsState,
    currentPosts,
    postsPerPage,
    currentPage,
    dataLength,
    setCurrentPage,
    handleSorting,
  } = useTableSettings(data);

  return (
    <div className="table__wrapper basic__table">
      <div>
        <table>
          <thead>
            <tr>
              {tableHeader.map((item) => (
                <th className={item} key={item}>
                  {item}
                  <button
                    className="sort__button"
                    onClick={() => handleSorting(item)}
                  >
                    {sortColumnsState[item] === "DSC" ? (
                      <FaSortNumericUp className="sort__img" />
                    ) : (
                      <FaSortNumericDown className="sort__img" />
                    )}
                  </button>
                </th>
              ))}
              <th>Actiuni</th>
            </tr>
          </thead>
          <tbody>
            {currentPosts.map((item) => (
              <tr key={item.id}>
                {Object.keys(item).map((key, index) => (
                  <td key={index} className={key}>
                    <div
                      className={`${key} ${
                        key === coloredCell ? item[key].state : "cell"
                      } container`}
                    >
                      {key === "img" ? (
                        <img src={imgLink + item[key]} alt="" />
                      ) : key === coloredCell ? (
                        item[key].text
                      ) : (
                        item[key]
                      )}
                    </div>
                  </td>
                ))}
                <td>
                  <Link to={`/${page}/${item.id}`} className="table__details">
                    Detalii
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          paginate={setCurrentPage}
          postsPerPage={postsPerPage}
          totalPosts={dataLength}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
}
