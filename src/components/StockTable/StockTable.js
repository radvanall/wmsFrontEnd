import React, { useEffect, useState } from "react";
import ItemTable from "../../components/ItemTable/ItemTable";
import stocks from "../../stock";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SingleProductMenu from "../../components/SingleProductMenu/SingleProductMenu";
import StockDataModal from "../StockDataModal/StockDataModal";
import { useToggle } from "../../hooks/useToggle";
import {
  filterStocksByProductId,
  setNavigate,
} from "../../toolkitRedux/stockFilterSlice";
import useFetch from "../../hooks/useFetch";
const StockTable = ({ productId }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [tableData, setTableData] = useState([]);
  const [currentStock, setCurrentStock] = useState(null);

  const { status: isOpenStockData, toggleStatus: toggleStockData } =
    useToggle(false);
  const { data, loading, error, fetchData } = useFetch(
    `http://localhost:8080/api/stock/getStocksByProductId/${productId}`
  );
  const getStocks = async () => {
    console.log("stockTable:", data);
    const newArray = data.map((item) => ({
      id: item.id,
      ["Cantitatea totală"]: item.quantity,
      ["Cantitatea rămasă"]: item.remainingQuantity,
      ["Preț total cumpărare"]: item.totalBuyingPrice,
      ["Preț total vânzare"]: item.totalSellingPrice,
      Starea: item.state,
    }));
    setTableData(newArray);
  };
  useEffect(() => {
    if (data) getStocks();
  }, [data]);
  const navigateToStocks = () => {
    dispatch(setNavigate(true));
    dispatch(filterStocksByProductId(productId));
    navigate("/stocks");
  };
  const handleDetails = (id) => {
    const chosenStock = data.find((item) => parseInt(item.id) === parseInt(id));
    setCurrentStock(chosenStock);
    toggleStockData();
  };
  return (
    <>
      {data && tableData && (
        <>
          <ItemTable
            data={tableData}
            header={"stocuri:"}
            handleDatails={handleDetails}
            handleFooterClick={navigateToStocks}
          />
          {currentStock && (
            <StockDataModal
              active={isOpenStockData}
              handleCloseModal={toggleStockData}
              stock={currentStock}
              refetchPage={fetchData}
            />
          )}
        </>
      )}
    </>
  );
};

export default StockTable;
