import "./Table.css";
import { Link } from "react-router-dom";
import React from "react";
import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../Pagination/Pagination";
import { FaSortNumericDown, FaSortNumericUp } from "react-icons/fa";
import useTableSettings from "./useTableSettings";

// export default function Table({ info }) {
export default function Table({ data, page, coloredCell }) {
  // const info = useSelector((state) => state.productsSlice.displaiedData);
  // const data2 = useSelector((state) => state.productsSlice.data);
  // const [info, setInfo] = useState(data);
  // useEffect(() => {
  //   setInfo([...data]);
  // }, [data]);
  // console.log("infortdata=", data);
  // console.log("infort=", info);

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
      {/* {data.length === 0 ? (
        <h2>Nu exista rezultate</h2>
      ) : ( */}
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
                      // className={`${key} ${
                      //   key === "status" ? item[key] : "cell"
                      // } container`}
                      className={`${key} ${
                        key === coloredCell ? item[key].state : "cell"
                      } container`}
                    >
                      {key === "img" ? (
                        <img src={item[key]} alt="" />
                      ) : // item[key]
                      key === coloredCell ? (
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
