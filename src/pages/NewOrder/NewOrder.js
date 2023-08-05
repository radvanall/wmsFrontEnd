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
  setPositionBeforeEdit,
  setProductQuantity,
  setSelectedTableRowId,
  setFormMode,
} from "../../toolkitRedux/newOrderSlice";
import stocks from "../../stock";
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
  const sortStocks = (a, b) => {
    if (a.state === "forSale" && b.state === "inSale") return 1;
    if (a.state == "inSale" && b.state === "forSale") return -1;

    const dateA = new Date(a.dateOfValidation);
    const dateB = new Date(b.dateOfValidation);

    return dateA - dateB;
  };
  const resetPositionById = (positionId) => {
    const position = positions.find(
      (position) => parseInt(position.id) === parseInt(positionId)
    );

    const updatedStocks = [...position.stocks];
    const newIndex =
      position.currentStockIndex >= position.stocks.length
        ? position.currentStockIndex - 1
        : updatedStocks[position.currentStockIndex].remainingQuantity <
            updatedStocks[position.currentStockIndex].initialQuantity &&
          updatedStocks[position.currentStockIndex].remainingQuantity > 0
        ? position.currentStockIndex
        : updatedStocks[position.currentStockIndex].remainingQuantity ===
          updatedStocks[position.currentStockIndex].initialQuantity
        ? position.currentStockIndex - 1
        : false;
    const restoredQuantity =
      parseInt(position.quantity) +
      parseInt(updatedStocks[newIndex].initialQuantity) -
      parseInt(updatedStocks[newIndex].remainingQuantity);
    // updatedStocks[newIndex].remainingQuantity =
    //   updatedStocks[newIndex.initialQuantity];
    console.log("restoredQuantity:", restoredQuantity);
    const finalStocks = updatedStocks.map((stock, index) => {
      if (index === newIndex)
        return {
          ...stock,
          remainingQuantity: stock.initialQuantity,
        };
      else return stock;
    });

    // const updatedStocks = position.stocks.map((stock, index) => {
    //   if (
    //     parseInt(stock.remainingQuantity) === 0 &&
    //     position.currentStockIndex - 1 === index
    //   ) {
    //     restoredQuantity =
    //       parseInt(stock.initialQuantity) - parseInt(stock.remainingQuantity);
    //   }
    //   if (index === parseInt(position.currentStockIndex)) {
    //     restoredQuantity =
    //       parseInt(stock.initialQuantity) - parseInt(stock.remainingQuantity);
    //     return {
    //       ...stock,
    //       remainingQuantity: stock.initialQuantity,
    //     };
    //   } else return stock;
    // });
    const restoredPosition = {
      ...position,
      // quantity: parseInt(position.quantity) + restoredQuantity,
      currentStockIndex: newIndex,
      quantity: restoredQuantity,
      stocks: finalStocks,
    };

    // const inSale = position.stocks.filter((stock) => stock.state === "inSale");
    // const forSale = position.stocks.filter(
    //   (stock) => stock.state === "forSale"
    // );
    // const chosenStock = inSale.length
    //   ? getEarliestDate(inSale)
    //   : getEarliestDate(forSale);
    // console.log("chosenStock=", chosenStock);

    // const availableStocks = position.stocks.filter(
    //   (stock) => parseInt(stock.id) !== parseInt(chosenStock.id)
    // );
    // const restoredPosition = {
    //   id: position.id,
    //   name: position.productName,
    //   image: position.productImg,
    //   quantity: position.stocks.reduce(
    //     (prevValue, currentValue) =>
    //       parseInt(prevValue) + parseInt(currentValue.remainingQuantity),
    //     0
    //   ),
    //   currentStock: chosenStock,
    //   availableStocks: availableStocks,
    // };
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
  const resetMultipleStocks = (positionId, stockId) => {
    const position = positions.find(
      (position) => parseInt(position.id) === parseInt(positionId)
    );
    const stockIndex = position.stocks.findIndex(
      (stock) => parseInt(stock.id) === parseInt(stockId)
    );
    let diff = 0;
    // parseInt(position.stocks[stockIndex].initialQuantity) -
    //   parseInt(position.stocks[stockIndex.remainingQuantity]);
    const finalStocks = position.stocks.map((stock, index) => {
      if (index >= stockIndex) {
        diff =
          diff +
          parseInt(stock.initialQuantity) -
          parseInt(stock.remainingQuantity);
        return {
          ...stock,
          remainingQuantity: stock.initialQuantity,
        };
      } else return stock;
    });
    const restoredPosition = {
      ...position,
      // quantity: parseInt(position.quantity) + restoredQuantity,
      currentStockIndex: stockIndex,
      quantity: position.quantity + diff,
      stocks: finalStocks,
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
    console.log("stockIndex", stockIndex);
  };
  const handleRowDelete = (id) => {
    console.log("id=", id);
    //  const newArray=fullData.filter(item=>parseInt(item.id)===parseInt(id));
    const positionId = fullData.find(
      (row) => parseInt(row.id) === parseInt(id)
    )?.positionId;
    const position = positions.find(
      (position) => parseInt(position.id) === parseInt(positionId)
    );

    const currentStock =
      position?.stocks.length > position.currentStockIndex
        ? position?.stocks[position.currentStockIndex]
        : position?.stocks[position.currentStockIndex - 1];

    const currentStockId =
      position?.stocks.length > position.currentStockIndex
        ? currentStock.remainingQuantity < currentStock.initialQuantity
          ? position?.stocks[position.currentStockIndex]?.id
          : position?.stocks[position.currentStockIndex - 1]?.id
        : currentStock.remainingQuantity < currentStock.initialQuantity
        ? position?.stocks[position.currentStockIndex - 1]?.id
        : position?.stocks[position.currentStockIndex - 2]?.id;
    console.log(
      "current stock comp:",
      currentStock.remainingQuantity < currentStock.initialQuantity
        ? currentStockId
        : currentStockId - 1
    );
    console.log("currentStock=", currentStock);
    console.log("currentStockId=", currentStockId);
    console.log("currentStock[]id=", currentStock.id);
    console.log("positionId:", positionId);
    console.log("currentStockId", currentStockId);
    const foundStock = fullData.find(
      (item) =>
        parseInt(item.id) === parseInt(id) &&
        parseInt(item.stockId) === parseInt(currentStockId)
    );
    if (foundStock) {
      console.log("foundStock=", foundStock);
      setFullData((prev) => {
        const newData = prev.filter(
          (item) => parseInt(item.id) !== parseInt(id)
        );

        let lastStock = null;
        newData.forEach((item) => {
          if (parseInt(item.positionId) === parseInt(positionId))
            lastStock = item;
        });
        if (lastStock) {
          lastStock.last = true;
        }
        return newData;
      });
      resetPositionById(positionId);
      console.log(true);
    } else {
      const stockId = fullData.find(
        (row) => parseInt(id) === parseInt(row.id)
      )?.stockId;
      setFullData((prev) => {
        let lastStock = null;
        const newData = prev.filter(
          (item) =>
            parseInt(item.id) !== parseInt(id) &&
            (parseInt(positionId) !== parseInt(item.positionId) ||
              parseInt(item.id) <= parseInt(id))
        );
        newData.forEach((item) => {
          if (parseInt(item.positionId) === parseInt(positionId))
            lastStock = item;
        });
        if (lastStock) {
          lastStock.last = true;
        }

        //   .map((item) => {
        //     if (parseInt(item.id) === lastStockId)
        //       return {
        //         ...item,
        //         last: true,
        //       };
        //     else return item;
        //   });
        // console.log("lastStockId:", lastStockId);
        return newData;
      });
      console.log(false);
      resetMultipleStocks(positionId, stockId);
    }
  };
  const handleRowEdit = (id) => {
    const row = fullData.find((item) => parseInt(item.id) === parseInt(id));
    console.log(row.positionId);
    const position = positions.find(
      (item) => parseInt(item.id) === parseInt(row.positionId)
    );
    if (position) {
      dispatch(setPositionBeforeEdit(position));
      const stockId = row.stockId;
      const stock = {
        ...position.stocks.find(
          (stock) => parseInt(stock.id) === parseInt(stockId)
        ),
      };
      stock.remainingQuantity = stock.initialQuantity;
      const stocks = position.stocks;
      // const newIndex =
      //   parseInt(position.currentStockIndex) >= parseInt(position.stocks.length)
      //     ? position.currentStockIndex - 1
      //     : position.currentStockIndex;
      const newIndex =
        position.currentStockIndex >= position.stocks.length
          ? position.currentStockIndex - 1
          : stocks[position.currentStockIndex].remainingQuantity <
              stocks[position.currentStockIndex].initialQuantity &&
            stocks[position.currentStockIndex].remainingQuantity > 0
          ? position.currentStockIndex
          : stocks[position.currentStockIndex].remainingQuantity ===
            stocks[position.currentStockIndex].initialQuantity
          ? position.currentStockIndex - 1
          : false;
      // position.quantity =
      //   position.quantity + stock.initialQuantity - stock.remainingQuantity;
      // console.log(row.positionId);
      const finalPosition = {
        ...position,
        currentStockIndex: newIndex,
        quantity: parseInt(position.quantity) + parseInt(row.Cantitate),
        stocks: position.stocks.map((obj) => {
          if (parseInt(obj.id) === parseInt(stockId)) return stock;
          else return obj;
        }),
      };
      setPositions((prev) => {
        return prev.map((item) => {
          if (item.id === position.id) return finalPosition;
          else return item;
        });
      });
      dispatch(setSelectedPosition(finalPosition));
      dispatch(setFormMode("edit"));
      dispatch(setSelectedTableRowId(id));
      dispatch(setProductQuantity(row.Cantitate));
      console.log("finalPosition:", finalPosition);
    }
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
      const newData = fullData.map(({ stockId, positionId, ...rest }) => rest);
      setTableData(newData);
      console.log("Full data:", fullData);
    } else setTableData([]);
  }, [fullData]);
  useEffect(() => {
    console.log("data", data);
    if (data) {
      const newPositions = data.map((position) => {
        // const sortedStocks = [...position.stocks];
        // sortedStocks.sort(sortStocks);
        // console.log("sortedStocks=", sortedStocks);
        // const inSale = position.stocks.filter(
        //   (stock) => stock.state === "inSale"
        // );
        // const forSale = position.stocks.filter(
        //   (stock) => stock.state === "forSale"
        // );
        // const chosenStock = inSale.length
        //   ? getEarliestDate(inSale)
        //   : getEarliestDate(forSale);
        // console.log("chosenStock=", chosenStock);

        // const availableStocks = position.stocks.filter(
        //   (stock) => parseInt(stock.id) !== parseInt(chosenStock.id)
        // );

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
          currentStockIndex: 0,
          stocks: position.stocks.sort(sortStocks).map((stock) => ({
            ...stock,
            initialQuantity: stock.remainingQuantity,
          })),
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
          checkEdit={true}
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
