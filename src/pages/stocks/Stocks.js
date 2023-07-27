import React, { useEffect, useState } from "react";
import "./Stocks.css";
import getFormatedDate from "../../functions/getFormatedDate";
import CardHolder from "../../components/CardHolder/CardHolder";
import Pagination from "../../components/Pagination/Pagination";
import SortButton from "../../components/SortButton/SortButton";
import StocksFilterModal from "../../components/StocksFileterModal/StocksFilterModal";
import { useToggle } from "../../hooks/useToggle";
import BasicButton from "../../components/BasicButton/BasicButton";
import useGetPage from "../../hooks/useGetPage";
const Stocks = () => {
  const [dates, setDates] = useState([]);
  const { status: isOpenFilter, toggleStatus: toggleFilter } = useToggle(false);
  const {
    data,
    loading,
    error,
    size,
    sortDirection,
    getPage,
    setSize,
    toggleSortDirection,
  } = useGetPage("http://localhost:8080/api/stock/readAll");

  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    if (!data) return;
    const newDates = [];
    data.content.forEach((stock) => {
      const dateOfCreation = getFormatedDate(stock.dateOfCreation, "ro-RO");
      console.log(dateOfCreation);
      if (!newDates.includes(dateOfCreation)) {
        newDates.push(dateOfCreation);
      }
    });
    setDates(newDates);
    console.log(newDates);
  }, [data]);

  // allStocks.forEach((value) => {
  //   if (!unique.includes(value.name)) {
  //     unique.push(value.name);
  //   }
  // });
  // console.log(unique);
  const handlePageChange = (page) => {
    getPage(page - 1);
  };
  const refetchPage = () => {
    getPage(data.number);
  };
  const filterStocks = (filterCriteria) => {
    getPage(0, filterCriteria);
  };
  return (
    <div className="stocks__wrapper">
      {data && (
        <>
          <div className="stock__menu">
            <SortButton
              sortDirection={sortDirection}
              toggleSortDirection={toggleSortDirection}
            />
          </div>
          <BasicButton text="Filter" handleClick={toggleFilter} />
          {dates?.map((item) => (
            <CardHolder
              stockName={item}
              stocks={data.content}
              key={item}
              refetchPage={refetchPage}
            />
          ))}
          <Pagination
            paginate={handlePageChange}
            postsPerPage={size}
            totalPosts={data.totalElements}
            currentPage={data.number + 1}
          />
          <StocksFilterModal
            active={isOpenFilter}
            handleModal={toggleFilter}
            filterStocks={filterStocks}
          />
        </>
      )}
    </div>
  );
};

export default Stocks;
