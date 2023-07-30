import React, { useEffect, useState } from "react";
import "./Stocks.css";
import getFormatedDate from "../../functions/getFormatedDate";
import CardHolder from "../../components/CardHolder/CardHolder";
import Pagination from "../../components/Pagination/Pagination";
import SortButton from "../../components/SortButton/SortButton";
import StocksFilterModal from "../../components/StocksFileterModal/StocksFilterModal";
import { useToggle } from "../../hooks/useToggle";
import useGetPage from "../../hooks/useGetPage";
import useFetch from "../../hooks/useFetch";
import { FiFilter } from "react-icons/fi";
import TagHolder from "../../components/TagHolder/TagHolder";
import { useDispatch, useSelector } from "react-redux";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import SimpleSelect from "../../components/SimpleSelect/SimpleSelect";
const pageSizeOptions = [
  {
    value: 10,
    label: "10",
  },
  {
    value: 20,
    label: "20",
  },
  {
    value: 30,
    label: "30",
  },
  {
    value: 40,
    label: "40",
  },
  {
    value: 50,
    label: "50",
  },
];
const Stocks = () => {
  const [dates, setDates] = useState([]);
  const filterCriterias = useSelector(
    (state) => state.stockFilterSlice.filterCriterias
  );

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
  } = useGetPage("http://localhost:8080/api/stock/readAll", filterCriterias);
  const {
    data: filterSettings,
    loading: loadingFilterSettings,
    error: errorFilterSettings,
    fetchData,
  } = useFetch("http://localhost:8080/api/stock/filterSettings");
  useEffect(() => {
    if (localStorage.getItem("pageSize"))
      setSize(parseInt(JSON.parse(localStorage.getItem("pageSize"))));
    else localStorage.setItem("pageSize", 20);
  }, []);
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

  const handlePageChange = (page) => {
    getPage(page - 1, filterCriterias);
  };
  const refetchPage = () => {
    getPage(data.number, filterCriterias);
  };
  const filterStocks = (filterCriteria) => {
    getPage(0, filterCriteria);
  };
  const handlePageSizeChange = (e) => {
    console.log(e.target.value);
    setSize(e.target.value);
    localStorage.setItem("pageSize", e.target.value);
  };

  return (
    <div className="stocks__wrapper">
      {data && (
        <>
          <div className="stock__menu">
            <FiFilter
              className={
                isOpenFilter
                  ? "search_menu_button menu__opened"
                  : "search_menu_button menu__closed"
              }
              onClick={toggleFilter}
            />
          </div>

          <div className="stock__menu">
            <span style={{ paddingRight: "20px" }}>
              Total stocuri:{data.totalElements}
            </span>
            <span>Stocuri pe pagină:</span>
            <SimpleSelect
              name="nrOfPages"
              id="nrOfPages"
              defaultValue={size}
              options={pageSizeOptions}
              height="32px"
              handleChange={handlePageSizeChange}
            />
            <SortButton
              sortDirection={sortDirection}
              toggleSortDirection={toggleSortDirection}
            />
          </div>
          {filterCriterias && (
            <TagHolder
              data={filterSettings}
              filterCriterias={filterCriterias}
              filterStocks={filterStocks}
            />
          )}
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
            // filterCriteria={filterCriterias}
            data={filterSettings}
            resetData={getPage}
            handleModal={toggleFilter}
            filterStocks={filterStocks}

            // setFilterCriterias={setFilterCriterias}
          />
        </>
      )}
    </div>
  );
};

export default Stocks;
