import React, { useEffect, useState } from "react";
import Modal from "../Modal/Modal";
import CloseModal from "../CloseModal/CloseModal";
import CustomSelect from "../CustomSelect/CustomSelect";
import BasicInput from "../BasicInput/BasicInput";
import BasicButton from "../BasicButton/BasicButton";
import ModalMessage from "../ModalMessage/ModalMessage";
import { useToggle } from "../../hooks/useToggle";
import useFetch from "../../hooks/useFetch";
import usePostData from "../../hooks/usePostData";
const OrderForm = ({ active, handleCloseModal, invoiceId, refetch }) => {
  const { data, loading, error, fetchData } = useFetch(
    "http://localhost:8080/api/position/getPositionsForSale"
  );
  const {
    message,
    loading: postLoading,
    error: postError,
    resetMessage,
    postData,
  } = usePostData();
  const [opened, setOpened] = useState(false);
  const [usedStocks, setUsedStocks] = useState([]);
  const [stockArray, setStockArray] = useState([]);
  const { status: isOpenMessage, toggleStatus: toggleMessage } =
    useToggle(false);
  const [positions, setPositions] = useState([]);
  const [displayedPositions, setDisplayedPositions] = useState([]);
  const [selectedPosition, setSelectedPosition] = useState({
    id: -1,
    name: "",
    image: "/img/57x57.png",
    quantity: 0,
    initialQuantity: 0,
    currentStockIndex: 0,
    stocks: [],
  });
  const [productQuantity, setProductQuantity] = useState(0);
  const [errors, setErrors] = useState({
    productError: false,
    quantityError: false,
    totalQuantityError: false,
  });
  const sortStocks = (a, b) => {
    if (a.state === "forSale" && b.state === "inSale") return 1;
    if (a.state === "inSale" && b.state === "forSale") return -1;

    const dateA = new Date(a.dateOfValidation);
    const dateB = new Date(b.dateOfValidation);

    return dateA - dateB;
  };
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
      setPositions(newPositions);
      setDisplayedPositions(newPositions);
      if (parseInt(selectedPosition.id) > -1) {
        const position = newPositions.find(
          (position) => parseInt(position.id) === parseInt(selectedPosition.id)
        );
        setSelectedPosition(position);
      }
    }
  }, [data]);
  const toggleSelect = () => {
    setDisplayedPositions(positions);
    setOpened((prev) => !prev);
  };
  const handleSelect = (e) => {
    const position = displayedPositions.find(
      (position) => parseInt(position.id) === parseInt(e.currentTarget.id)
    );

    setSelectedPosition(position);
    setOpened(false);
    setDisplayedPositions(positions);
    setProductQuantity(0);
  };
  const handleChange = (e) => {
    setSelectedPosition({
      id: -1,
      name: e.target.value,
      image: "/img/57x57.png",
      quantity: 0,
      initialQuantity: 0,
      currentStockIndex: 0,
      stocks: [],
    });
    setOpened(true);

    const newPositions = positions.filter((position) =>
      position.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setDisplayedPositions(newPositions);
    setProductQuantity(0);
  };
  const changeQuantity = (e) => {
    if (parseInt(e.target.value) <= parseInt(selectedPosition.quantity))
      setProductQuantity(e.target.value);
    if (e.target.value === "") setProductQuantity(0);
  };
  const getUsedQuantity = (requestedQunatity, stockQuantity) => {
    const diff = Math.abs(
      parseInt(stockQuantity) - parseInt(requestedQunatity)
    );
    if (requestedQunatity > stockQuantity) return requestedQunatity - diff;
    else return stockQuantity - diff;
  };
  const changePositionQuantity = () => {
    if (parseInt(selectedPosition.quantity) < parseInt(productQuantity)) {
      setErrors((prev) => ({
        ...prev,
        totalQuantityError: true,
      }));
      return false;
    }
    setErrors((prev) => ({
      ...prev,
      totalQuantityError: false,
    }));
    const currentStockQuantity =
      selectedPosition.stocks[selectedPosition.currentStockIndex]
        .remainingQuantity;
    const currentStock =
      selectedPosition.stocks[selectedPosition.currentStockIndex];
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
      if (parseInt(currentStock.remainingQuantity) > 0) {
        setUsedStocks((prev) => [
          ...prev,
          {
            usedQuantity,
            id: currentStock.id,
            price: currentStock.sellingPrice,
          },
        ]);
      }
      remainingProductQuantity =
        parseInt(remainingProductQuantity) -
        parseInt(currentStock.remainingQuantity);
      while (parseInt(remainingProductQuantity) > 0) {
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
      }
      setStockArray(stockArray);
      toggleMessage();
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    if (selectedPosition.name === "") {
      setErrors((prev) => ({
        ...prev,
        productError: true,
      }));
      return;
    }
    if (!parseInt(productQuantity)) {
      setErrors((prev) => ({
        ...prev,
        quantityError: true,
      }));
      return;
    }
    if (!changePositionQuantity()) {
      return;
    }
    setErrors((prev) => ({
      ...prev,
      quantityError: false,
      productError: false,
      totalQuantityError: false,
    }));

    const stockId =
      selectedPosition.stocks[selectedPosition.currentStockIndex].id;
    const newOrders = [{ stockId, quantity: productQuantity, invoiceId }];
    await postData(newOrders, "http://localhost:8080/api/invoice/addOrders");
    await refetch();
    fetchData();
    setTimeout(() => {
      resetMessage();
    }, 3000);

    setErrors((prev) => ({
      ...prev,
      invoiceError: false,
    }));
  };
  const handleConfirmMultyStock = async () => {
    const newOrders = usedStocks.map((stock) => ({
      stockId: stock.id,
      quantity: stock.usedQuantity,
      invoiceId,
    }));
    await postData(newOrders, "http://localhost:8080/api/invoice/addOrders");
    await refetch();
    fetchData();
    setTimeout(() => {
      resetMessage();
    }, 3000);

    setStockArray([]);
    setUsedStocks([]);
    toggleMessage();
  };
  const handleCancelModalMessage = () => {
    toggleMessage();
    setStockArray([]);
    setUsedStocks([]);
  };
  return (
    <Modal active={active}>
      <CloseModal handleCloseModal={handleCloseModal} />
      <label className="input__label">Selectați produsul:</label>
      <CustomSelect
        positions={displayedPositions}
        setOpened={toggleSelect}
        opened={opened}
        image={selectedPosition.image}
        selected={selectedPosition.name}
        handleSelect={handleSelect}
        handleChange={handleChange}
        zIndex={3}
      />
      {errors.productError && (
        <p style={{ color: "red" }}>Selectați produsul</p>
      )}
      <BasicInput
        label="Introduceți cantitatea"
        type="number"
        padding="0"
        fullBorder={true}
        borderRadius="0px"
        value={productQuantity}
        handleChange={changeQuantity}
      />
      {errors.quantityError && (
        <p style={{ color: "red" }}>Introduceți cantitatea</p>
      )}
      {errors.totalQuantityError && (
        <p style={{ color: "red" }}>Cantitatea introdusă e prea mare.</p>
      )}
      <div className="quantity__container">
        <label>Cantitatea disponibilă:{selectedPosition.quantity} buc.</label>
      </div>
      <BasicButton type="submit" text="Adaugă" handleClick={handleSubmit} />
      {message && <p style={{ color: "red" }}>{message}</p>}
      {postError && <p style={{ color: "red" }}>{postError}</p>}
      <ModalMessage
        isOpened={isOpenMessage}
        close={handleCancelModalMessage}
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
    </Modal>
  );
};

export default OrderForm;
