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
  const handleRowDelete = (id) => {
    console.log("id=", id);
    //  const newArray=fullData.filter(item=>parseInt(item.id)===parseInt(id));
    setFullData((prev) =>
      prev.filter((item) => parseInt(item.id) !== parseInt(id))
    );
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
  const getEarliestDate = (arr) => {
    return arr.reduce((earliest, current) => {
      const earliestDate = new Date(earliest.dateOfValidation);
      const currentDate = new Date(current.dateOfValidation);
      return currentDate < earliestDate ? current : earliest;
    }, arr[0]);
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

        // .reduce((earliest, current) => {
        //   const earliestDate = new Date(earliest.dateOfValidation);
        //   const currentDate = new Date(current.dateOfValidation);
        //   return currentDate < earliestDate ? current : earliest;
        // });
        // console.log("firstInSale=", inSale);
        // console.log("firstforSale=", forSale);
        return {
          id: position.id,
          name: position.productName,
          image: position.productImg,
          quantity: position.stocks.reduce(
            (prevValue, currentValue) =>
              parseInt(prevValue) + parseInt(currentValue.remainingQuantity),
            0
          ),
          currentStock: chosenStock,
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
