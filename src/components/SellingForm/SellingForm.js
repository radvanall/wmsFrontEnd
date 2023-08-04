import React, { useState } from "react";
import BasicInput from "../BasicInput/BasicInput";
import CustomSelect from "../CustomSelect/CustomSelect";
import { useToggle } from "../../hooks/useToggle";
import { useDispatch, useSelector } from "react-redux/es/exports";
import ModalMessage from "../ModalMessage/ModalMessage";
import {
  setSelectedPosition,
  resetSelectedPosition,
  findPosition,
  setFormMode,
  setProductQuantity,
  setSelectedTableRowId,
} from "../../toolkitRedux/newOrderSlice";
import BasicButton from "../BasicButton/BasicButton";
const SellingForm = ({
  positions,
  setFullData,
  setPositions,
  fullData,
  setIsModifying,
  getNextStock,
}) => {
  const dispatch = useDispatch();
  const productQuantity = useSelector(
    (state) => state.newOrderSlice.productQuantity
  );
  const selectedPosition = useSelector(
    (state) => state.newOrderSlice.selectedPosition
  );
  const formMode = useSelector((state) => state.newOrderSlice.formMode);
  const selectedTableRowId = useSelector(
    (state) => state.newOrderSlice.selectedTableRowId
  );
  const [opened, setOpened] = useState(false);
  const [usedStocks, setUsedStocks] = useState([]);
  const [displayedPositions, setDisplayedPositions] = useState(positions);
  const [stockArray, setStockArray] = useState([]);
  const [id, setId] = useState(1);
  const { status: isOpenMessage, toggleStatus: toggleMessage } =
    useToggle(false);

  // const [selectedPosition, setSelectedPosition] = useState({
  //   id: -1,
  //   name: "",
  //   image: "/img/57x57.png",
  //   quantity: 0,
  //   currentStock: {},
  // });
  // const [productQunatity, setProductQuantity] = useState(0);
  const getUsedQuantity = (requestedQunatity, stockQuantity) => {
    const diff = Math.abs(
      parseInt(stockQuantity) - parseInt(requestedQunatity)
    );
    console.log(requestedQunatity - diff);
    if (requestedQunatity > stockQuantity) return requestedQunatity - diff;
    else return stockQuantity - diff;
  };
  const changePositionQuantity = () => {
    const currentStockQuantity =
      selectedPosition.stocks[selectedPosition.currentStockIndex]
        .remainingQuantity;
    const currentStock =
      selectedPosition.stocks[selectedPosition.currentStockIndex];
    if (parseInt(selectedPosition.quantity) < parseInt(productQuantity))
      return false;
    if (parseInt(currentStockQuantity) < parseInt(productQuantity)) {
      console.log(true);
      let remainingProductQuantity = productQuantity;
      let stockIndex = selectedPosition.currentStockIndex;
      const availableStocks = [...selectedPosition.stocks];
      const usedQuantity = getUsedQuantity(
        remainingProductQuantity,
        currentStockQuantity
      );
      const stockArray = [];
      if (parseInt(currentStock.remainingQuantity) > 0) {
        stockArray.push({
          ...currentStock,
          remainingQuantity:
            parseInt(currentStockQuantity) - parseInt(usedQuantity),
        });
      }

      // parseInt(remainingProductQuantity) -
      // Math.abs(
      //   parseInt(selectedPosition.currentStock.remainingQuantity) -
      //     parseInt(remainingProductQuantity)
      // );
      if (parseInt(currentStock.remainingQuantity) > 0) {
        setUsedStocks((prev) => [
          ...prev,
          {
            usedQuantity,
            id: currentStock.id,
            price: currentStock.sellingPrice,
            // id: selectedPosition.currentStock.id,
            // price: selectedPosition.currentStock.sellingPrice,
          },
        ]);
      }
      console.log("abs:", usedQuantity);
      remainingProductQuantity =
        parseInt(remainingProductQuantity) -
        parseInt(currentStock.remainingQuantity);
      // parseInt(selectedPosition.currentStock.remainingQuantity);
      console.log("remainingProductQuantity", remainingProductQuantity);
      while (parseInt(remainingProductQuantity) > 0) {
        // const nextStock = getNextStock(availableStocks);
        stockIndex++;
        if (stockIndex > availableStocks.length - 1) return;
        const nextStock = availableStocks[stockIndex];
        if (!nextStock) return;
        const usedQuantity = getUsedQuantity(
          remainingProductQuantity,
          nextStock.remainingQuantity
        );
        setUsedStocks((prev) => [
          ...prev,
          {
            id: nextStock.id,
            usedQuantity: usedQuantity,
            price: nextStock.sellingPrice,
          },
        ]);

        stockArray.push({
          ...nextStock,
          remainingQuantity:
            parseInt(nextStock.remainingQuantity) - parseInt(usedQuantity),
        });
        remainingProductQuantity =
          remainingProductQuantity - nextStock.remainingQuantity;

        // const stockIndexToRemove = availableStocks.findIndex(
        //   (stock) => parseInt(stock.id) === parseInt(nextStock.id)
        // );
        // if (stockIndexToRemove !== -1) {
        //   availableStocks.splice(stockIndexToRemove, 1);
        // }
      }
      console.log("availableStocks=", availableStocks);
      console.log("stockArray=", stockArray);
      setStockArray(stockArray);

      // setNextStock(
      //   getNextStock(selectedPosition.currentStock.id, selectedPosition.id)
      // );
      console.log("selected podition:", selectedPosition);
      toggleMessage();
      return false;
    }

    const newIndex =
      parseInt(currentStockQuantity) === parseInt(productQuantity)
        ? selectedPosition.currentStockIndex + 1
        : selectedPosition.currentStockIndex;
    // const newPositions = positions.map((position) => {
    //   if (parseInt(position.id) === selectedPosition.id)
    //     return {
    //       ...position,
    //       quantity: parseInt(position.quantity) - parseInt(productQuantity),
    //       stocks: position.stocks.map((stock))
    // currentStock: {
    //   ...position.currentStock,
    //   remainingQuantity:
    //     parseInt(position.currentStock.remainingQuantity) -
    //     parseInt(productQuantity),
    // },
    //     };
    //   else return position;
    // });
    // const newPositions=[...positions];
    // const updatedPosition=newPositions.find(position=>parseInt(position.id)=parseInt(selectedPosition.id));
    // });

    const updatedPosition = { ...selectedPosition };

    if (
      parseInt(updatedPosition.currentStockIndex) <
      updatedPosition.stocks.length
    ) {
      // updatedPosition.stocks[
      //   updatedPosition.currentStockIndex
      // ].remainingQuantity =
      //   parseInt(currentStockQuantity) - parseInt(productQuantity);
      // const stock = {
      //   ...updatedPosition.stocks[updatedPosition.currentStockIndex],
      // };
      const updatedStock = {
        ...updatedPosition.stocks[updatedPosition.currentStockIndex],
      };
      updatedStock.remainingQuantity =
        parseInt(currentStockQuantity) - parseInt(productQuantity);
      // updatedPosition.stocks[updatedPosition.currentStockIndex] = stock;

      updatedPosition.quantity =
        parseInt(updatedPosition.quantity) - parseInt(productQuantity);
      const finalPosition = {
        ...updatedPosition,
        currentStockIndex: newIndex,
        stocks: updatedPosition.stocks.map((stock) => {
          if (parseInt(stock.id) === updatedStock.id) return updatedStock;
          else return stock;
        }),
      };

      const newPositions = positions.map((position) => {
        if (parseInt(position.id) === parseInt(selectedPosition.id))
          return finalPosition;
        else return position;
      });

      console.log("newPositions:", newPositions);
      setDisplayedPositions(newPositions);
      setPositions(newPositions);
      dispatch(
        setSelectedPosition(
          finalPosition
          //   {
          //   ...selectedPosition,
          //   quantity:
          //     parseInt(selectedPosition.quantity) - parseInt(productQuantity),
          //   currentStock: {
          //     ...selectedPosition.currentStock,
          //     remainingQuantity:
          //       parseInt(selectedPosition.currentStock.remainingQuantity) -
          //       parseInt(productQuantity),
          //   },
          // }
        )
      );
    }
    return true;
  };

  const resetPositions = () => {
    setDisplayedPositions(positions);
  };
  const toggleSelect = () => {
    resetPositions();
    setOpened((prev) => !prev);
  };
  const handleSelect = (e) => {
    console.log(e.target.id);
    const position = displayedPositions.find(
      (position) => parseInt(position.id) === parseInt(e.target.id)
    );
    //setImage(position.image);
    // setSelectedPosition(position);
    dispatch(setSelectedPosition(position));
    setOpened(false);
    resetPositions();
    console.log("SELECTED:", position);
    dispatch(setProductQuantity(0));
  };
  const handleChange = (e) => {
    console.log(e.target.value);
    dispatch(findPosition(e.target.value));
    // setSelectedPosition({
    //   id: -1,
    //   name: e.target.value,
    //   image: "/img/57x57.png",
    //   quantity: 0,
    //   currentStock: {},
    // });
    setOpened(true);

    const newPositions = positions.filter((position) =>
      position.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setDisplayedPositions(newPositions);
    dispatch(setProductQuantity(0));
  };
  const changeQuantity = (e) => {
    console.log("cantitatea:", e.target.value);
    if (parseInt(e.target.value) <= parseInt(selectedPosition.quantity))
      dispatch(setProductQuantity(e.target.value));
    if (e.target.value === "") dispatch(setProductQuantity(0));
  };
  const handleTableInsert = (newRow) => {
    const samePosition = fullData.find(
      (position) =>
        parseInt(position.positionId) === parseInt(newRow.positionId) &&
        parseInt(position.stockId) === parseInt(newRow.stockId)
    );
    if (samePosition) {
      const newFullData = fullData.map((position) => {
        if (
          parseInt(position.positionId) === parseInt(newRow.positionId) &&
          parseInt(position.stockId) === parseInt(newRow.stockId)
        )
          return {
            ...position,
            ["Preț total"]:
              parseInt(position[["Preț total"]]) +
              parseInt(newRow[["Preț total"]]),
            Cantitate:
              parseInt(position.Cantitate) + parseInt(newRow.Cantitate),
          };
        else return position;
      });
      setFullData(newFullData);
      return true;
    }
    // setId((prev) => prev + 1);
    setFullData((prev) => [...prev, newRow]);
    return false;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!changePositionQuantity()) return;
    const sellingPrice =
      selectedPosition.stocks[selectedPosition.currentStockIndex].sellingPrice;
    const stockId =
      selectedPosition.stocks[selectedPosition.currentStockIndex].id;
    const newRow = {
      id: id,
      image: selectedPosition.image,
      Produs: selectedPosition.name,
      Cantitate: productQuantity,
      ["Preț/buc."]: sellingPrice,
      ["Preț total"]: parseFloat(productQuantity) * parseFloat(sellingPrice),
      stockId: stockId,
      positionId: selectedPosition.id,
    };
    handleTableInsert(newRow);
    // const samePosition = fullData.find(
    //   (position) =>
    //     parseInt(position.positionId) === parseInt(newRow.positionId) &&
    //     parseInt(position.stockId) === parseInt(newRow.stockId)
    // );
    // console.log("samePosition:", samePosition ? "true" : "false");
    // console.log("selectedPosition:", selectedPosition);
    // if (samePosition) {
    //   const newFullData = fullData.map((position) => {
    //     if (
    //       parseInt(position.positionId) === parseInt(newRow.positionId) &&
    //       parseInt(position.stockId) === parseInt(newRow.stockId)
    //     )
    //       return {
    //         ...position,
    //         ["Preț total"]:
    //           parseInt(position[["Preț total"]]) +
    //           parseInt(newRow[["Preț total"]]),
    //         Cantitate:
    //           parseInt(position.Cantitate) + parseInt(newRow.Cantitate),
    //       };
    //     else return position;
    //   });
    //   setFullData(newFullData);
    //   return;
    // }
    setId(id + 1);
    // setFullData((prev) => [...prev, newRow]);
  };
  const handleCancelEdit = () => {
    dispatch(resetSelectedPosition());
    dispatch(setFormMode("add"));
    dispatch(setSelectedTableRowId(-1));
    dispatch(setProductQuantity(0));
  };
  const handleEdit = () => {
    const sellingPrice =
      selectedPosition.stocks[selectedPosition.currentStockIndex].sellingPrice;
    const stockId =
      selectedPosition.stocks[selectedPosition.currentStockIndex].id;
    const newFullData = fullData.map((item) => {
      if (parseInt(item.id) === parseInt(selectedTableRowId))
        return {
          ...item,
          image: selectedPosition.image,
          Produs: selectedPosition.name,
          Cantitate: productQuantity,
          ["Preț/buc."]: sellingPrice,
          ["Preț total"]:
            parseFloat(productQuantity) * parseFloat(sellingPrice),
          stockId: stockId,
          positionId: selectedPosition.id,
        };
      else return item;
    });
    setFullData(newFullData);
    setSelectedTableRowId(-1);
    dispatch(setFormMode("add"));
    setIsModifying(true);
    setTimeout(() => {
      setIsModifying(false);
    }, 2000);
  };

  const handleConfirmMultyStock = () => {
    // const updatedArray = [...stockArray];
    // const newCurrentStock = stockArray[stockArray.length - 1];
    // console.log("newCurrentStock:", newCurrentStock);
    // const newAvailableStocks = [...selectedPosition.stocks];
    // .filter(
    //   (stock) => {
    //     return !stockArray.some(
    //       (item) => parseInt(item.id) === parseInt(stock.id)
    //     );
    //   }
    // );
    const updatedStocks = selectedPosition.stocks.map((stock) => {
      const modifiedStock = stockArray.find(
        (item) => parseInt(item.id) === parseInt(stock.id)
      );
      return modifiedStock ? modifiedStock : stock;
    });
    const index = updatedStocks.findIndex(
      (stock) => stock.remainingQuantity > 0
    );
    const newIndex = index === -1 ? selectedPosition.stocks.length : index;

    // const newIndex =
    //   parseInt(updatedStocks[index].remainingQuantity) ===
    //   parseInt(updatedStocks[index].initialQuantity)
    //     ? index - 1
    //     : index;

    // console.log("newAvailableStocks=", newAvailableStocks);
    const newPositions = positions.map((position) => {
      if (parseInt(position.id) === parseInt(selectedPosition.id)) {
        return {
          ...position,
          quantity: parseInt(position.quantity) - parseInt(productQuantity),
          currentStockIndex: newIndex,
          stocks: updatedStocks,
        };
      } else return position;
    });
    setPositions(newPositions);
    dispatch(
      setSelectedPosition({
        ...selectedPosition,
        quantity:
          parseInt(selectedPosition.quantity) - parseInt(productQuantity),
        currentStockIndex: newIndex,
        stocks: updatedStocks,
      })
    );
    setDisplayedPositions(newPositions);
    let newId = id;
    const newRows = usedStocks.map((stock) => {
      const newRow = {
        id: newId,
        // id: id,
        image: selectedPosition.image,
        Produs: selectedPosition.name,
        Cantitate: stock.usedQuantity,
        ["Preț/buc."]: stock.price,
        ["Preț total"]:
          parseFloat(stock.usedQuantity) * parseFloat(stock.price),
        stockId: stock.id,
        positionId: selectedPosition.id,
      };
      if (!handleTableInsert(newRow)) newId++;

      // return newRow;
    });
    console.log(newRows);
    // setFullData([...fullData, ...newRows]);
    setId(newId);
    setStockArray([]);
    setUsedStocks([]);
  };

  const handleCancelModalMessage = () => {
    toggleMessage();
    setStockArray([]);
    setUsedStocks([]);
    console.log("newSelectedPositon:", selectedPosition);
    console.log("newDisplaeyedPosition:", displayedPositions);
    console.log("newPositons:", positions);
  };

  return (
    <form onSubmit={handleSubmit}>
      <button
        onClick={(e) => {
          e.preventDefault();
          console.log("fullData=", fullData);
          console.log("positons:", positions);
        }}
      >
        test
      </button>
      <BasicInput label="Data" type="date" fullBorder={true} />
      <CustomSelect
        positions={displayedPositions}
        setOpened={toggleSelect}
        opened={opened}
        image={selectedPosition.image}
        selected={selectedPosition.name}
        handleSelect={handleSelect}
        handleChange={handleChange}
      />
      <BasicInput
        label="Introduceți cantitatea"
        type="number"
        fullBorder={true}
        value={productQuantity}
        handleChange={changeQuantity}
      />
      <label>Cantitatea disponibilă:{selectedPosition.quantity}</label>
      <br />
      <label>
        Prețul per bucată:
        {
          selectedPosition.stocks[selectedPosition.currentStockIndex]
            ?.sellingPrice
        }{" "}
        lei
      </label>
      <br />
      <label>
        Prețul total:
        {parseFloat(productQuantity) *
          parseFloat(
            selectedPosition.stocks[selectedPosition.currentStockIndex]
              ?.sellingPrice
          ) ?? 0}
        lei
      </label>
      {formMode === "add" ? (
        <BasicButton type="submit" text="Adaugă" />
      ) : (
        <div>
          <BasicButton type="button" text="Modifică" handleClick={handleEdit} />
          <BasicButton
            type="button"
            text="Anulează"
            handleClick={handleCancelEdit}
          />
        </div>
      )}
      <ModalMessage
        isOpened={isOpenMessage}
        close={toggleMessage}
        handleCancel={handleCancelModalMessage}
        handleOk={handleConfirmMultyStock}
      >
        <h2>Nu există suficiente bucăți în stocul curent.</h2>
        <p>
          Produsele sunt luate din mai multe stocuri de aceea prețul poate fi
          diferit.
        </p>
        {usedStocks.length && (
          <>
            {usedStocks.map((stock, index) => (
              <p key={index}>
                {stock.usedQuantity} buc. la preț de: {stock.price} lei.
              </p>
            ))}
            <p>Dacă sunteți de acord confirmați, dacă nu anulați.</p>
          </>
        )}
      </ModalMessage>
    </form>
  );
};

export default SellingForm;
