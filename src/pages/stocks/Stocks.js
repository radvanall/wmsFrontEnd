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
import {
  resetFilterCriterias,
  resetAllCriterias,
  setNavigate,
} from "../../toolkitRedux/stockFilterSlice";
import { useLocation } from "react-router-dom";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import SimpleSelect from "../../components/SimpleSelect/SimpleSelect";
import axios from "axios";
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
  const dispatch = useDispatch();
  const location = useLocation();
  const filterCriterias = useSelector(
    (state) => state.stockFilterSlice.filterCriterias
  );
  const checkboxStates = useSelector(
    (state) => state.stockFilterSlice.checkboxStates
  );
  const navigate = useSelector((state) => state.stockFilterSlice.navigate);
  console.log("filter criterias stocks:", filterCriterias);
  console.log("checkbox states:", checkboxStates);

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
  // const {
  //   data: filterSettings,
  //   loading: loadingFilterSettings,
  //   error: errorFilterSettings,
  //   fetchData,
  // } = useFetch("http://localhost:8080/api/stock/filterSettings");
  const [filterSettings, setFilterSettings] = useState(null);
  const getSettings = async () => {
    // await fetchData();

    try {
      const fetch = await axios.get(
        "http://localhost:8080/api/stock/filterSettings"
      );
      setFilterSettings(fetch.data);
      if (!navigate) {
        console.log("filter settings:", fetch.data);
        console.error("navigate0:", navigate);

        console.log("location changes", location);
        dispatch(resetFilterCriterias());
        console.error("navigate:", navigate);
        dispatch(resetAllCriterias(fetch.data));
      } else {
        dispatch(setNavigate(false));
        console.error("navigate5:", navigate);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    return () => getSettings();
  }, [location.pathname, navigate]);

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
      if (!newDates.includes(dateOfCreation)) {
        newDates.push(dateOfCreation);
      }
    });
    setDates(newDates);
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
    setSize(e.target.value);
    localStorage.setItem("pageSize", e.target.value);
  };

  return (
    <div className="stocks__wrapper">
      {loading && <LoadingComponent />}
      {data && (
        <>
          <button
            onClick={() => {
              console.log(checkboxStates);
              console.log("filter criterias stocks:", filterCriterias);
              console.log("navigate:", navigate);
              console.log("filter settings:", filterSettings);
              // dispatch(setNavigate(!navigate));
            }}
          >
            click
          </button>
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
          <br />
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
            data={filterSettings}
            resetData={getPage}
            handleModal={toggleFilter}
            filterStocks={filterStocks}
          />
        </>
      )}
    </div>
  );
};

export default Stocks;
