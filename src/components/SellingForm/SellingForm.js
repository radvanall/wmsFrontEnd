import React, { useState } from "react";
import BasicInput from "../BasicInput/BasicInput";
import CustomSelect from "../CustomSelect/CustomSelect";
import { useToggle } from "../../hooks/useToggle";
import { useDispatch, useSelector } from "react-redux/es/exports";
import ModalMessage from "../ModalMessage/ModalMessage";
import "./SellingForm.css";
import {
  setSelectedPosition,
  resetSelectedPosition,
  findPosition,
  setFormMode,
  setProductQuantity,
  setSelectedTableRowId,
  resetPositionBeforeEdit,
} from "../../toolkitRedux/newOrderSlice";
import BasicButton from "../BasicButton/BasicButton";
const SellingForm = ({
  positions,
  setFullData,
  setPositions,
  errors,
  setErrors,
  fullData,
  dateState,
  handleDateChange,
  setIsModifying,
  customers,
  selectedAddress,
  selectedCustomer,
  setSelectedAddress,
  setSelectedCustomer,
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
  const positionBeforeEdit = useSelector(
    (state) => state.newOrderSlice.positionBeforeEdit
  );
  const [opened, setOpened] = useState(false);
  const [customersOpened, setCustomersOpened] = useState(false);
  const [addressOpened, setAddressOpened] = useState(false);
  const [addresses, setAddresses] = useState([{ id: 1, name: "Pe loc" }]);
  const [usedStocks, setUsedStocks] = useState([]);
  const [displayedPositions, setDisplayedPositions] = useState(positions);
  const [displayedCustomers, setDisplayedCustomers] = useState(customers);
  const [stockArray, setStockArray] = useState([]);
  const [id, setId] = useState(1);
  const { status: isOpenMessage, toggleStatus: toggleMessage } =
    useToggle(false);
  const getUsedQuantity = (requestedQunatity, stockQuantity) => {
    const diff = Math.abs(
      parseInt(stockQuantity) - parseInt(requestedQunatity)
    );
    if (requestedQunatity > stockQuantity) return requestedQunatity - diff;
    else return stockQuantity - diff;
  };
  const changePositionQuantity = () => {
    if (parseInt(selectedPosition.quantity) < parseInt(productQuantity))
      return false;
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

    const newIndex =
      parseInt(currentStockQuantity) === parseInt(productQuantity)
        ? selectedPosition.currentStockIndex + 1
        : selectedPosition.currentStockIndex;
    const updatedPosition = { ...selectedPosition };

    if (
      parseInt(updatedPosition.currentStockIndex) <
      updatedPosition.stocks.length
    ) {
      const updatedStock = {
        ...updatedPosition.stocks[updatedPosition.currentStockIndex],
      };
      updatedStock.remainingQuantity =
        parseInt(currentStockQuantity) - parseInt(productQuantity);
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
      setDisplayedPositions(newPositions);
      setPositions(newPositions);
      dispatch(setSelectedPosition(finalPosition));
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

  const toggleCustomerSelect = () => {
    setDisplayedCustomers(customers);
    setCustomersOpened((prev) => !prev);
  };
  const handleSelect = (e) => {
    const position = displayedPositions.find(
      (position) => parseInt(position.id) === parseInt(e.currentTarget.id)
    );
    dispatch(setSelectedPosition(position));
    setOpened(false);
    resetPositions();
    dispatch(setProductQuantity(0));
    setErrors((prev) => ({
      ...prev,
      clientError: false,
    }));
  };
  const handleCustomersSelect = (e) => {
    const customer = displayedCustomers.find(
      (customer) => parseInt(customer.id) === parseInt(e.currentTarget.id)
    );
    setSelectedCustomer(customer);
    setCustomersOpened(false);
    setDisplayedCustomers(customers);
    setAddresses([
      { id: 1, name: "Pe loc" },
      { id: 2, name: customer.address },
    ]);
    setErrors((prev) => ({
      ...prev,
      clientError: false,
    }));
  };
  const handleAddressSelect = (e) => {
    const address = addresses.find(
      (address) => parseInt(address.id) === parseInt(e.target.id)
    );
    setSelectedAddress(address);
    setAddressOpened(false);
    setErrors((prev) => ({
      ...prev,
      addressError: false,
    }));
  };
  const handleChange = (e) => {
    dispatch(findPosition(e.target.value));
    setOpened(true);
    const newPositions = positions.filter((position) =>
      position.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setDisplayedPositions(newPositions);
    dispatch(setProductQuantity(0));
  };
  const handleCustomersChange = (e) => {
    setSelectedCustomer((prev) => ({ id: 0, name: e.target.value }));
    setCustomersOpened(true);
    const newCustomers = customers.filter((customer) =>
      customer.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setDisplayedCustomers(newCustomers);
  };
  const handleAddressChange = (e) => {
    setSelectedAddress({ id: 3, name: e.target.value });
    setErrors((prev) => ({
      ...prev,
      addressError: false,
    }));
  };
  const changeQuantity = (e) => {
    setErrors((prev) => ({
      ...prev,
      quantityError: false,
    }));
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
            ["Preț total/lei"]:
              formMode === "add"
                ? parseInt(position[["Preț total/lei"]]) +
                  parseInt(newRow[["Preț total/lei"]])
                : parseInt(newRow[["Preț total/lei"]]),
            Cantitate:
              formMode === "add"
                ? parseInt(position.Cantitate) + parseInt(newRow.Cantitate)
                : parseInt(newRow.Cantitate),
          };
        else return position;
      });
      setFullData(newFullData);
      return true;
    }
    setFullData((prev) => {
      const newData = prev.map((row) => {
        if (parseInt(row.positionId) === parseInt(newRow.positionId)) {
          return {
            ...row,
            last: false,
          };
        } else return row;
      });
      return [...newData, newRow];
    });
    return false;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
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
    if (!changePositionQuantity()) return;
    setErrors((prev) => ({
      ...prev,
      quantityError: false,
      productError: false,
    }));
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
      ["Preț total/lei"]:
        parseFloat(productQuantity) * parseFloat(sellingPrice),
      stockId: stockId,
      positionId: selectedPosition.id,
      last: true,
    };
    handleTableInsert(newRow);
    setErrors((prev) => ({
      ...prev,
      invoiceError: false,
    }));
    setId(id + 1);
  };
  const handleCancelEdit = () => {
    setPositions((prev) =>
      prev.map((position) => {
        if (parseInt(position.id) === parseInt(selectedPosition.id))
          return positionBeforeEdit;
        else return position;
      })
    );
    setErrors((prev) => ({
      ...prev,
      quantityError: false,
    }));
    dispatch(resetPositionBeforeEdit());
    dispatch(resetSelectedPosition());
    dispatch(setFormMode("add"));
    dispatch(setSelectedTableRowId(-1));
    dispatch(setProductQuantity(0));
  };
  const handleEdit = () => {
    if (!parseInt(productQuantity)) {
      setErrors((prev) => ({
        ...prev,
        quantityError: true,
      }));
      return;
    }
    if (!changePositionQuantity()) return;
    setErrors((prev) => ({
      ...prev,
      quantityError: false,
    }));
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
          ["Preț total/lei"]:
            parseFloat(productQuantity) * parseFloat(sellingPrice),
          stockId: stockId,
          positionId: selectedPosition.id,
        };
      else return item;
    });
    setFullData(newFullData);
    setSelectedTableRowId(-1);
    dispatch(resetPositionBeforeEdit());
    dispatch(setFormMode("add"));
    setIsModifying(true);
    setTimeout(() => {
      setIsModifying(false);
    }, 2000);
  };

  const handleConfirmMultyStock = () => {
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
        image: selectedPosition.image,
        Produs: selectedPosition.name,
        Cantitate: stock.usedQuantity,
        ["Preț/buc."]: stock.price,
        ["Preț total/lei"]:
          parseFloat(stock.usedQuantity) * parseFloat(stock.price),
        stockId: stock.id,
        positionId: selectedPosition.id,
        last: true,
      };
      if (!handleTableInsert(newRow)) newId++;
    });
    setErrors((prev) => ({
      ...prev,
      invoiceError: false,
    }));
    setId(newId);
    setStockArray([]);
    setUsedStocks([]);
    toggleMessage();
    setSelectedTableRowId(-1);
    dispatch(resetPositionBeforeEdit());
    dispatch(setFormMode("add"));
    setIsModifying(true);
    setTimeout(() => {
      setIsModifying(false);
    }, 2000);
  };

  const handleCancelModalMessage = () => {
    toggleMessage();
    setStockArray([]);
    setUsedStocks([]);
  };

  return (
    <form onSubmit={handleSubmit} className="selling__form">
      <BasicInput
        label="Data"
        type="date"
        fullBorder={true}
        borderRadius="0px"
        padding="0"
        value={
          dateState?.toISOString().split("T")[0] ||
          new Date().toISOString().slice(0, 10)
        }
        handleChange={handleDateChange}
      />
      <label className="input__label">Selectați clientul:</label>
      <CustomSelect
        positions={displayedCustomers}
        setOpened={toggleCustomerSelect}
        opened={customersOpened}
        image={selectedCustomer.image}
        selected={selectedCustomer.name}
        handleSelect={handleCustomersSelect}
        handleChange={handleCustomersChange}
        zIndex={5}
      />
      {errors.clientError && <p style={{ color: "red" }}>Selectați clientul</p>}
      <label className="input__label">Selectați adresa:</label>
      <CustomSelect
        positions={addresses}
        setOpened={() => setAddressOpened((prev) => !prev)}
        opened={addressOpened}
        selected={selectedAddress.name}
        handleSelect={handleAddressSelect}
        handleChange={handleAddressChange}
        zIndex={4}
      />
      {errors.addressError && (
        <p style={{ color: "red" }}>Introduceți adresa</p>
      )}
      <label className="input__label">Selectați produsul:</label>
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
        <p style={{ color: "red" }}>Selectați cantitatea</p>
      )}

      <div className="quantity__container">
        <label>Cantitatea disponibilă:{selectedPosition.quantity} buc.</label>
      </div>
      {errors.invoiceError && (
        <p style={{ color: "red" }}>Nu a-ți selectat nici un produs</p>
      )}

      <br />
      <div className="button__container">
        {formMode === "add" ? (
          <BasicButton type="submit" text="Adaugă" />
        ) : (
          <>
            <BasicButton
              type="button"
              text="Modifică"
              handleClick={handleEdit}
            />
            <BasicButton
              type="button"
              text="Anulează"
              handleClick={handleCancelEdit}
            />
          </>
        )}
      </div>

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
    </form>
  );
};

export default SellingForm;
