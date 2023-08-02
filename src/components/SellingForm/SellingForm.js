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
  const [displayedPositions, setDisplayedPositions] = useState(positions);
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
  const changePositionQuantity = () => {
    if (
      parseInt(selectedPosition.currentStock.remainingQuantity) <
      parseInt(productQuantity)
    ) {
      console.log(true);
      toggleMessage();
      return false;
    }
    const newPositions = positions.map((position) => {
      if (parseInt(position.id) === selectedPosition.id)
        return {
          ...position,
          quantity: parseInt(position.quantity) - parseInt(productQuantity),
          currentStock: {
            ...position.currentStock,
            remainingQuantity:
              parseInt(position.currentStock.remainingQuantity) -
              parseInt(productQuantity),
          },
        };
      else return position;
    });
    console.log("newPositions:", newPositions);
    setDisplayedPositions(newPositions);
    setPositions(newPositions);
    dispatch(
      setSelectedPosition({
        ...selectedPosition,
        quantity:
          parseInt(selectedPosition.quantity) - parseInt(productQuantity),
        currentStock: {
          ...selectedPosition.currentStock,
          remainingQuantity:
            parseInt(selectedPosition.currentStock.remainingQuantity) -
            parseInt(productQuantity),
        },
      })
    );
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
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!changePositionQuantity()) return;
    const newRow = {
      id: id,
      image: selectedPosition.image,
      Produs: selectedPosition.name,
      Cantitate: productQuantity,
      ["Preț/buc."]: selectedPosition.currentStock.sellingPrice,
      ["Preț total"]:
        parseFloat(productQuantity) *
        parseFloat(selectedPosition.currentStock.sellingPrice),
      currentStockId: selectedPosition.currentStock.id,
      positionId: selectedPosition.id,
    };
    const samePosition = fullData.find(
      (position) =>
        parseInt(position.positionId) === parseInt(newRow.positionId)
    );
    console.log("samePosition:", samePosition ? "true" : "false");
    console.log("selectedPosition:", selectedPosition);

    if (samePosition) {
      const newFullData = fullData.map((position) => {
        if (parseInt(position.positionId) === parseInt(newRow.positionId))
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
      return;
    }
    setId(id + 1);
    setFullData((prev) => [...prev, newRow]);
  };
  const handleCancelEdit = () => {
    dispatch(resetSelectedPosition());
    dispatch(setFormMode("add"));
    dispatch(setSelectedTableRowId(-1));
    dispatch(setProductQuantity(0));
  };
  const handleEdit = () => {
    const newFullData = fullData.map((item) => {
      if (parseInt(item.id) === parseInt(selectedTableRowId))
        return {
          ...item,
          image: selectedPosition.image,
          Produs: selectedPosition.name,
          Cantitate: productQuantity,
          ["Preț/buc."]: selectedPosition.currentStock.sellingPrice,
          ["Preț total"]:
            parseFloat(productQuantity) *
            parseFloat(selectedPosition.currentStock.sellingPrice),
          currentStockId: selectedPosition.currentStock.id,
          positionId: selectedPosition.currentStock.positionId,
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

  return (
    <form onSubmit={handleSubmit}>
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
        Prețul per bucată:{selectedPosition.currentStock.sellingPrice} lei
      </label>
      <br />
      <label>
        Prețul total:
        {parseFloat(productQuantity) *
          parseFloat(selectedPosition.currentStock.sellingPrice) ?? 0}
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
        handleCancel={toggleMessage}
      >
        <p>Nu există suficiente bucăți în stoc.</p>
      </ModalMessage>
    </form>
  );
};

export default SellingForm;
