import React, { useEffect, useState } from "react";
import SellingForm from "../../components/SellingForm/SellingForm";
import "./NewOrder.css";
import useFetch from "../../hooks/useFetch";
import ResponsiveTable from "../../components/ResponsiveTable/ResponsiveTable";
import { useDispatch, useSelector } from "react-redux/es/exports";
import {
  setSelectedPosition,
  resetSelectedPosition,
  findPosition,
  setProductQuantity,
  setSelectedTableRowId,
  setFormMode,
} from "../../toolkitRedux/newOrderSlice";
const NewOrder = () => {
  const { data, loading, error, fetchData } = useFetch(
    "http://localhost:8080/api/position/getPositionsForSale"
  );
  const [positions, setPositions] = useState();
  const [isModifying, setIsModifying] = useState(false);
  const [fullData, setFullData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const dispatch = useDispatch();
  const selectedPosition = useSelector(
    (state) => state.newOrderSlice.selectedPosition
  );
  const selectedTableRowId = useSelector(
    (state) => state.newOrderSlice.selectedTableRowId
  );
  const getEarliestDate = (arr) => {
    return arr.reduce((earliest, current) => {
      const earliestDate = new Date(earliest.dateOfValidation);
      const currentDate = new Date(current.dateOfValidation);
      return currentDate < earliestDate ? current : earliest;
    }, arr[0]);
  };
  const resetPositionById = (positionId) => {
    const position = data.find(
      (position) => parseInt(position.id) === parseInt(positionId)
    );
    const inSale = position.stocks.filter((stock) => stock.state === "inSale");
    const forSale = position.stocks.filter(
      (stock) => stock.state === "forSale"
    );
    const chosenStock = inSale.length
      ? getEarliestDate(inSale)
      : getEarliestDate(forSale);
    console.log("chosenStock=", chosenStock);

    const availableStocks = position.stocks.filter(
      (stock) => parseInt(stock.id) !== parseInt(chosenStock.id)
    );
    const restoredPosition = {
      id: position.id,
      name: position.productName,
      image: position.productImg,
      quantity: position.stocks.reduce(
        (prevValue, currentValue) =>
          parseInt(prevValue) + parseInt(currentValue.remainingQuantity),
        0
      ),
      currentStock: chosenStock,
      availableStocks: availableStocks,
    };
    setPositions((prev) =>
      prev.map((position) => {
        if (parseInt(position.id) === parseInt(positionId))
          return restoredPosition;
        else return position;
      })
    );
    if (parseInt(selectedPosition.id) === parseInt(positionId)) {
      dispatch(setSelectedPosition(restoredPosition));
    }
  };
  const handleRowDelete = (id) => {
    console.log("id=", id);
    //  const newArray=fullData.filter(item=>parseInt(item.id)===parseInt(id));
    const positionId = fullData.find(
      (row) => parseInt(row.id) === parseInt(id)
    )?.positionId;
    const currentStockId = positions.find(
      (position) => parseInt(position.id) === parseInt(positionId)
    )?.currentStock?.id;
    console.log("positionId:", positionId);
    console.log("currentStockId", currentStockId);
    const foundStock = fullData.find(
      (item) =>
        parseInt(item.id) === parseInt(id) &&
        parseInt(item.currentStockId) === parseInt(currentStockId)
    );
    if (foundStock) {
      console.log("foundStock=", foundStock);
      setFullData((prev) =>
        prev.filter((item) => parseInt(item.id) !== parseInt(id))
      );
      resetPositionById(positionId);
      console.log(true);
    } else console.log(false);
  };
  const handleRowEdit = (id) => {
    const row = fullData.find((item) => parseInt(item.id) === parseInt(id));
    console.log(row.positionId);
    const position = positions.find(
      (item) => parseInt(item.id) === parseInt(row.positionId)
    );
    if (position) {
      dispatch(setSelectedPosition(position));
      dispatch(setFormMode("edit"));
      dispatch(setSelectedTableRowId(id));
      dispatch(setProductQuantity(row.Cantitate));
    }
    console.log(position);
  };

  // const getStocksByPosition=(positionId)=>{
  //   return data.
  // }
  const getNextStock = (stocks) => {
    const inSale = stocks.filter((stock) => stock.state === "inSale");
    const forSale = stocks.filter((stock) => stock.state === "forSale");
    const nextStock = inSale.length
      ? getEarliestDate(inSale)
      : getEarliestDate(forSale);

    console.log("nextStock=", nextStock);
    if (nextStock) return nextStock;
    else return false;
  };
  useEffect(() => {
    if (fullData.length) {
      const newData = fullData.map(
        ({ currentStockId, positionId, ...rest }) => rest
      );
      setTableData(newData);
      console.log("Full data:", fullData);
    } else setTableData([]);
  }, [fullData]);
  useEffect(() => {
    console.log("data", data);
    if (data) {
      const newPositions = data.map((position) => {
        const inSale = position.stocks.filter(
          (stock) => stock.state === "inSale"
        );
        const forSale = position.stocks.filter(
          (stock) => stock.state === "forSale"
        );
        const chosenStock = inSale.length
          ? getEarliestDate(inSale)
          : getEarliestDate(forSale);
        console.log("chosenStock=", chosenStock);

        const availableStocks = position.stocks.filter(
          (stock) => parseInt(stock.id) !== parseInt(chosenStock.id)
        );

        return {
          id: position.id,
          name: position.productName,
          image: position.productImg,
          quantity: position.stocks.reduce(
            (prevValue, currentValue) =>
              parseInt(prevValue) + parseInt(currentValue.remainingQuantity),
            0
          ),
          initialQuantity: position.stocks.reduce(
            (prevValue, currentValue) =>
              parseInt(prevValue) + parseInt(currentValue.remainingQuantity),
            0
          ),
          currentStock: chosenStock,
          availableStocks: availableStocks,
        };
      });
      console.log("positons:", newPositions);
      setPositions(newPositions);
    }
  }, [data]);
  return data && positions ? (
    <div className="new__order__wrapper">
      <div className="new__order__form__wrapper">
        <SellingForm
          positions={positions}
          setFullData={setFullData}
          fullData={fullData}
          setIsModifying={setIsModifying}
          setPositions={setPositions}
          getNextStock={getNextStock}
        />
      </div>
      <div className="new__order__table__wrapper">
        <ResponsiveTable
          data={tableData}
          title="Cumpărături"
          isModifying={isModifying}
          changingRowId={selectedTableRowId}
          handleDelete={handleRowDelete}
          handleEdit={handleRowEdit}
        />
      </div>
    </div>
  ) : (
    <p>Loading</p>
  );
};

export default NewOrder;
