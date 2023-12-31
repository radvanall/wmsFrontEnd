import React, { useEffect, useState } from "react";
import SellingForm from "../../components/SellingForm/SellingForm";
import "./NewOrder.css";
import useFetch from "../../hooks/useFetch";
import ResponsiveTable from "../../components/ResponsiveTable/ResponsiveTable";
import { useDispatch, useSelector } from "react-redux/es/exports";
import BasicButton from "../../components/BasicButton/BasicButton";
import usePostData from "../../hooks/usePostData";
import ModalMessage from "../../components/ModalMessage/ModalMessage";
import { useToggle } from "../../hooks/useToggle";

import {
  setSelectedPosition,
  setPositionBeforeEdit,
  setProductQuantity,
  setSelectedTableRowId,
  setFormMode,
  resetAllStates,
} from "../../toolkitRedux/newOrderSlice";
const NewOrder = () => {
  const userId = useSelector((state) => state.userSlice.userData?.id);
  const { data, loading, error, fetchData } = useFetch(
    "http://localhost:8080/api/position/getPositionsForSale"
  );
  const {
    data: customers,
    loading: loadingCustomers,
    error: errorCustomers,
    fetchData: fetchCustomers,
  } = useFetch("http://localhost:8080/api/customer/readCustomerInvoice");
  const {
    message,
    loading: postLoading,
    error: postError,
    resetMessage,
    postData,
  } = usePostData();
  const [positions, setPositions] = useState();

  const [errors, setErrors] = useState({
    clientError: false,
    addressError: false,
    productError: false,
    invoiceError: false,
    quantityError: false,
  });
  const { status: isOpenServerMessage, toggleStatus: toggleServerMessage } =
    useToggle(false);
  const { status: isOpenSaveModal, toggleStatus: toggleSaveModal } =
    useToggle(false);
  const [isModifying, setIsModifying] = useState(false);
  const [fullData, setFullData] = useState([]);
  const [dateState, setDateState] = useState(new Date());
  const [tableData, setTableData] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState({});
  const [selectedAddress, setSelectedAddress] = useState({
    id: 1,
    name: "Pe loc",
  });
  const dispatch = useDispatch();
  const formMode = useSelector((state) => state.newOrderSlice.formMode);
  const selectedPosition = useSelector(
    (state) => state.newOrderSlice.selectedPosition
  );
  const selectedTableRowId = useSelector(
    (state) => state.newOrderSlice.selectedTableRowId
  );
  const handleDateChange = (e) => {
    const dateValue = e.target.value;
    const newDate = new Date(dateValue);
    setDateState(newDate);
  };
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
    const finalStocks = updatedStocks.map((stock, index) => {
      if (index === newIndex)
        return {
          ...stock,
          remainingQuantity: stock.initialQuantity,
        };
      else return stock;
    });

    const restoredPosition = {
      ...position,
      currentStockIndex: newIndex,
      quantity: restoredQuantity,
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
  };
  const resetMultipleStocks = (positionId, stockId) => {
    const position = positions.find(
      (position) => parseInt(position.id) === parseInt(positionId)
    );
    const stockIndex = position.stocks.findIndex(
      (stock) => parseInt(stock.id) === parseInt(stockId)
    );
    let diff = 0;

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
  };
  const handleRowDelete = (id) => {
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
    const foundStock = fullData.find(
      (item) =>
        parseInt(item.id) === parseInt(id) &&
        parseInt(item.stockId) === parseInt(currentStockId)
    );
    if (foundStock) {
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

        return newData;
      });
      resetMultipleStocks(positionId, stockId);
    }
  };
  const handleRowEdit = (id) => {
    const row = fullData.find((item) => parseInt(item.id) === parseInt(id));
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
    }
  };

  const getNextStock = (stocks) => {
    const inSale = stocks.filter((stock) => stock.state === "inSale");
    const forSale = stocks.filter((stock) => stock.state === "forSale");
    const nextStock = inSale.length
      ? getEarliestDate(inSale)
      : getEarliestDate(forSale);
    if (nextStock) return nextStock;
    else return false;
  };
  useEffect(() => {
    if (fullData.length) {
      const newData = fullData.map(({ stockId, positionId, ...rest }) => rest);
      setTableData(newData);
    } else setTableData([]);
  }, [fullData]);
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
    }
  }, [data]);
  useEffect(() => {
    if (customers) {
      setSelectedCustomer(
        customers.find((customer) => parseInt(customer.id) === 3)
      );
    }
  }, [customers]);
  useEffect(() => {
    dispatch(resetAllStates());
  }, []);
  const handleSaveInvoice = async (shipped) => {
    if (!fullData.length) {
      setErrors((prev) => ({
        ...prev,
        invoiceError: true,
      }));
      return;
    }
    if (parseInt(selectedCustomer.id) === 0) {
      setErrors((prev) => ({
        ...prev,
        clientError: true,
      }));
      return;
    }
    if (selectedAddress.name.trim() === "") {
      setErrors((prev) => ({
        ...prev,
        addressError: true,
      }));
      return;
    }

    const invoice = {
      operatorId: userId,
      clientId: selectedCustomer.id,
      date: dateState,
      shipped: shipped,
      address:
        parseInt(selectedAddress.id) === 1 ? "inStore" : selectedAddress.name,
      invoiceTableDTOS: fullData.map((data) => ({
        quantity: data.Cantitate,
        stockId: data.stockId,
      })),
    };
    await postData(invoice, "http://localhost:8080/api/invoice/create");
    toggleServerMessage();
  };
  const handleCloseServerModal = () => {
    resetMessage();
    toggleServerMessage();
  };
  const handleOkSaveModal = () => {
    toggleSaveModal();
    handleSaveInvoice(true);
  };
  return data && positions && customers && selectedCustomer ? (
    <div>
      <div className="new__order__wrapper">
        <div className="new__order__form__wrapper">
          <SellingForm
            positions={positions}
            customers={customers}
            dateState={dateState}
            selectedAddress={selectedAddress}
            selectedCustomer={selectedCustomer}
            errors={errors}
            setErrors={setErrors}
            setSelectedAddress={setSelectedAddress}
            setSelectedCustomer={setSelectedCustomer}
            handleDateChange={handleDateChange}
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
            handleDelete={formMode === "add" ? handleRowDelete : false}
            handleEdit={formMode === "add" ? handleRowEdit : false}
          />
          <div className="total__price__container">
            <label>
              Suma totală:{" "}
              {fullData.reduce((accumulator, item) => {
                const price = parseInt(item["Preț total/lei"]);
                return accumulator + price;
              }, 0)}{" "}
              lei
            </label>
          </div>
        </div>
      </div>
      <div className="button__container">
        <BasicButton
          text="Salvează factura"
          handleClick={() => handleSaveInvoice(false)}
        />
        <BasicButton
          text="Salvează și validează factura"
          handleClick={toggleSaveModal}
        />
      </div>
      <ModalMessage
        isOpened={isOpenServerMessage}
        close={handleCloseServerModal}
        handleOk={handleCloseServerModal}
      >
        {message && <p>{message}</p>}
        {postError && <p>{postError}</p>}
      </ModalMessage>
      <ModalMessage
        isOpened={isOpenSaveModal}
        close={toggleSaveModal}
        handleCancel={toggleSaveModal}
        handleOk={handleOkSaveModal}
      >
        <p>
          Sunteți siguri că doriți să validați factura? Dacă o validați nu veți
          putea face modificări.
        </p>
      </ModalMessage>
    </div>
  ) : (
    <p>Loading</p>
  );
};

export default NewOrder;
