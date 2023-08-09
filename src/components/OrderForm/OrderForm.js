import React, { useEffect, useState } from "react";
import Modal from "../Modal/Modal";
import CloseModal from "../CloseModal/CloseModal";
import CustomSelect from "../CustomSelect/CustomSelect";
import useFetch from "../../hooks/useFetch";
const OrderForm = ({ active, handleCloseModal, orderId }) => {
  const { data, loading, error, fetchData } = useFetch(
    "http://localhost:8080/api/position/getPositionsForSale"
  );
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    if (data) {
      const newPositions = data.map((position) => {
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
  return (
    <Modal active={active}>
      <CloseModal handleCloseModal={handleCloseModal} />
      <p>{orderId}</p>
      {/* <label className="input__label">Selectați produsul:</label>
      <CustomSelect
        positions={displayedPositions}
        disableSelect={formMode === "add" ? false : true}
        setOpened={toggleSelect}
        opened={opened}
        image={selectedPosition.image}
        selected={selectedPosition.name}
        handleSelect={handleSelect}
        handleChange={handleChange}
        zIndex={3}
      />
      <BasicInput
        label="Introduceți cantitatea"
        type="number"
        padding="0"
        fullBorder={true}
        borderRadius="0px"
        value={productQuantity}
        handleChange={changeQuantity}
      />
      <div className="quantity__container">
        <label>Cantitatea disponibilă:{selectedPosition.quantity} buc.</label>
      </div> */}
    </Modal>
  );
};

export default OrderForm;
