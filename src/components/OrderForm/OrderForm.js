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
      console.log("positons:", newPositions);
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
    console.log(e.currentTarget.id);
    const position = displayedPositions.find(
      (position) => parseInt(position.id) === parseInt(e.currentTarget.id)
    );
    //setImage(position.image);
    // setSelectedPosition(position);
    setSelectedPosition(position);
    setOpened(false);
    setDisplayedPositions(positions);
    console.log("SELECTED:", position);
    setProductQuantity(0);
    // setErrors((prev) => ({
    //   ...prev,
    //   clientError: false,
    // }));
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
    // setErrors((prev) => ({
    //   ...prev,
    //   quantityError: false,
    // }));
    console.log("cantitatea:", e.target.value);
    if (parseInt(e.target.value) <= parseInt(selectedPosition.quantity))
      setProductQuantity(e.target.value);
    if (e.target.value === "") setProductQuantity(0);
  };
  const getUsedQuantity = (requestedQunatity, stockQuantity) => {
    const diff = Math.abs(
      parseInt(stockQuantity) - parseInt(requestedQunatity)
    );
    console.log(requestedQunatity - diff);
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
      console.log("abs:", usedQuantity);
      remainingProductQuantity =
        parseInt(remainingProductQuantity) -
        parseInt(currentStock.remainingQuantity);
      console.log("remainingProductQuantity", remainingProductQuantity);
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
      console.log("availableStocks=", availableStocks);
      console.log("stockArray=", stockArray);
      setStockArray(stockArray);
      console.log("selected podition:", selectedPosition);
      toggleMessage();
      return false;
    }

    // const newIndex =
    //   parseInt(currentStockQuantity) === parseInt(productQuantity)
    //     ? selectedPosition.currentStockIndex + 1
    //     : selectedPosition.currentStockIndex;
    // const updatedPosition = { ...selectedPosition };

    // if (
    //   parseInt(updatedPosition.currentStockIndex) <
    //   updatedPosition.stocks.length
    // ) {
    //   const updatedStock = {
    //     ...updatedPosition.stocks[updatedPosition.currentStockIndex],
    //   };
    //   updatedStock.remainingQuantity =
    //     parseInt(currentStockQuantity) - parseInt(productQuantity);
    //   updatedPosition.quantity =
    //     parseInt(updatedPosition.quantity) - parseInt(productQuantity);
    //   const finalPosition = {
    //     ...updatedPosition,
    //     currentStockIndex: newIndex,
    //     stocks: updatedPosition.stocks.map((stock) => {
    //       if (parseInt(stock.id) === updatedStock.id) return updatedStock;
    //       else return stock;
    //     }),
    //   };

    //   const newPositions = positions.map((position) => {
    //     if (parseInt(position.id) === parseInt(selectedPosition.id))
    //       return finalPosition;
    //     else return position;
    //   });

    //   console.log("newPositions:", newPositions);
    //   setDisplayedPositions(newPositions);
    //   setPositions(newPositions);

    //   setSelectedPosition(finalPosition);
    // }
    return true;
  };

  const handleSubmit = async (e) => {
    // e.preventDefault();
    if (selectedPosition.name === "") {
      console.log("name");
      setErrors((prev) => ({
        ...prev,
        productError: true,
      }));
      return;
    }
    if (!parseInt(productQuantity)) {
      console.log("productQuantity");
      setErrors((prev) => ({
        ...prev,
        quantityError: true,
      }));
      return;
    }
    if (!changePositionQuantity()) {
      console.log("changeQuantity");
      return;
    }
    setErrors((prev) => ({
      ...prev,
      quantityError: false,
      productError: false,
      totalQuantityError: false,
    }));
    // const sellingPrice =
    //   selectedPosition.stocks[selectedPosition.currentStockIndex].sellingPrice;
    const stockId =
      selectedPosition.stocks[selectedPosition.currentStockIndex].id;
    const newOrders = [{ stockId, quantity: productQuantity, invoiceId }];
    console.log("newOrder", newOrders);
    await postData(newOrders, "http://localhost:8080/api/invoice/addOrders");
    await refetch();
    fetchData();
    setTimeout(() => {
      resetMessage();
    }, 3000);

    // const newRow = {
    //   id: id,
    //   image: selectedPosition.image,
    //   Produs: selectedPosition.name,
    //   Cantitate: productQuantity,
    //   ["Preț/buc."]: sellingPrice,
    //   ["Preț total/lei"]:
    //     parseFloat(productQuantity) * parseFloat(sellingPrice),
    //   stockId: stockId,
    //   positionId: selectedPosition.id,
    //   last: true,
    // };
    // handleTableInsert(newRow);
    setErrors((prev) => ({
      ...prev,
      invoiceError: false,
    }));
    // setId(id + 1);
  };
  const handleConfirmMultyStock = async () => {
    // const updatedStocks = selectedPosition.stocks.map((stock) => {
    //   const modifiedStock = stockArray.find(
    //     (item) => parseInt(item.id) === parseInt(stock.id)
    //   );
    //   return modifiedStock ? modifiedStock : stock;
    // });
    // const index = updatedStocks.findIndex(
    //   (stock) => stock.remainingQuantity > 0
    // );
    // const newIndex = index === -1 ? selectedPosition.stocks.length : index;
    // const newPositions = positions.map((position) => {
    //   if (parseInt(position.id) === parseInt(selectedPosition.id)) {
    //     return {
    //       ...position,
    //       quantity: parseInt(position.quantity) - parseInt(productQuantity),
    //       currentStockIndex: newIndex,
    //       stocks: updatedStocks,
    //     };
    //   } else return position;
    // });
    // setPositions(newPositions);

    // setSelectedPosition({
    //   ...selectedPosition,
    //   quantity: parseInt(selectedPosition.quantity) - parseInt(productQuantity),
    //   currentStockIndex: newIndex,
    //   stocks: updatedStocks,
    // });

    // setDisplayedPositions(newPositions);
    // let newId = 0;
    const newOrders = usedStocks.map((stock) => ({
      stockId: stock.id,
      quantity: stock.usedQuantity,
      invoiceId,
      //   const newRow = {
      //     id: newId,
      //     image: selectedPosition.image,
      //     Produs: selectedPosition.name,
      //     Cantitate: stock.usedQuantity,
      //     ["Preț/buc."]: stock.price,
      //     ["Preț total/lei"]:
      //       parseFloat(stock.usedQuantity) * parseFloat(stock.price),
      //     stockId: stock.id,
      //     positionId: selectedPosition.id,
      //     last: true,
      //   };
      //   if (!handleTableInsert(newRow)) newId++;

      // return newRow;
    }));

    console.log("newOrders", newOrders);
    await postData(newOrders, "http://localhost:8080/api/invoice/addOrders");
    await refetch();
    fetchData();
    setTimeout(() => {
      resetMessage();
    }, 3000);
    // setErrors((prev) => ({
    //   ...prev,
    //   invoiceError: false,
    // }));
    // setId(newId);
    setStockArray([]);
    setUsedStocks([]);
    toggleMessage();
    // setSelectedTableRowId(-1);
    // dispatch(resetPositionBeforeEdit());
    // dispatch(setFormMode("add"));
    // setIsModifying(true);
    // setTimeout(() => {
    //   setIsModifying(false);
    // }, 2000);
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
    <Modal active={active}>
      <button
        onClick={() => {
          console.log("selectedPosition:", selectedPosition);
          console.log("positions:", positions);
          console.log("selectedPosition:", selectedPosition);
        }}
      >
        test
      </button>
      <CloseModal handleCloseModal={handleCloseModal} />
      <label className="input__label">Selectați produsul:</label>
      <CustomSelect
        positions={displayedPositions}
        // disableSelect={formMode === "add" ? false : true}
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
