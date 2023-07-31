import React, { useEffect, useState } from "react";
import ItemTable from "../../components/ItemTable/ItemTable";
import stocks from "../../stock";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SingleProductMenu from "../../components/SingleProductMenu/SingleProductMenu";
import {
  filterStocksByProductId,
  setNavigate,
} from "../../toolkitRedux/stockFilterSlice";
import useFetch from "../../hooks/useFetch";
const StockTable = ({ productId }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [tableData, setTableData] = useState([]);
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
    getStocks();
  }, [data]);
  const navigateToStocks = () => {
    dispatch(setNavigate(true));
    dispatch(filterStocksByProductId(productId));
    navigate("/stocks");
  };
  return (
    <>
      {data && tableData && (
        <ItemTable
          data={tableData}
          header={"stocuri:"}
          // itemLink={"operatorsinvoice"}
          handleFooterClick={navigateToStocks}
        />
      )}
    </>
  );
};

export default StockTable;
