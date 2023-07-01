import React, { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import useGetData from "../../hooks/useGetData";
import { useToggle } from "../../hooks/useToggle";
import CreateInvoiceForm from "../CreateInvoiceForm/CreateInvoiceForm";
import "./CreateInvoice.css";
import usePostData from "../../hooks/usePostData";
const CreateInvoice = ({ active, setActive }) => {
  const { data, error: fail } = useFetch(
    "http://localhost:8080/api/provider/readProvidersNamesAndId"
  );
  const {
    data: positionsData,
    loading,
    error,
    getData,
  } = useGetData(`http://localhost:8080/api/provider/read/`);
  const [formFields, setFormFields] = useState({
    productId: 0,
    productImg: 0,
    productName: 0,
    stockQuantity: 0,
    buyingPrice: 0,
    sellingPrice: 0,
  });
  const [isValid, setIsValid] = useState({
    product: true,
    quantity: true,
    price: true,
  });

  const [positionId, setPositionId] = useState(0);
  const [provider, setProvider] = useState("default");
  const [positions, setPositions] = useState([]);
  const [invoice, setInvoice] = useState([]);
  const [invoiceId, setInvoiceId] = useState();
  const [modifyButtons, setModifyButtons] = useState(false);
  const [invoiceModified, setInvoiceModified] = useState(false);
  const [selectBuffer, setSelectBuffer] = useState();
  const [closeMessage, setCloseMessage] = useState(false);
  const [isSavedMessage, setIsSavedMessage] = useState(false);
  const [fillFormMessage, setFillFormMessage] = useState(false);
  const { status: isOpenMessage, toggleStatus: toggleMessage } =
    useToggle(false);
  const {
    message: savedMessage,
    loading: messageLoading,
    error: messageError,
    resetMessage,
    postData,
  } = usePostData();
  const [opened, setOpened] = useState(false);
  const [selected, setSelected] = useState("");
  const [image, setImage] = useState("/img/57x57.png");
  const handleSelect = (event) => {
    const element = positions.find(
      (obj) => parseInt(obj.id, 10) === parseInt(event.target.id, 10)
    );
    setSelected(element.name);
    setOpened((prev) => !prev);
    setImage(element.image);
    setFormFields((prev) => ({
      ...prev,
      productId: event.target.id,
      productName: element.name,
      productImg: element.image,
    }));
  };
  const setInitialFields = () => {
    setImage("/img/57x57.png");
    setSelected("");
    setFormFields({
      productId: 0,
      productImg: 0,
      productName: 0,
      stockQuantity: 0,
      buyingPrice: 0,
      sellingPrice: 0,
    });
    setIsValid({
      product: true,
      quantity: true,
      price: true,
    });
    setPositionId(0);
    setPositions([]);
    setInvoice([]);
  };

  useEffect(() => {
    if (positionsData !== null && positionsData !== undefined)
      setPositions([...positionsData.positions]);
  }, [positionsData]);
  const handleFormChange = (event) => {
    setFormFields((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };
  const handleProviderChange = (event) => {
    setSelectBuffer(event.target.value);
    setOpened(false);
    if (invoice.length > 0) toggleMessage();
    else {
      setProvider(event.target.value);
      setInitialFields();
      if (event.target.value !== "default") getData(event.target.value);
    }
  };
  const handleChange = () => {
    setProvider(selectBuffer);
    setInitialFields();
    if (selectBuffer !== "default") getData(selectBuffer);
    toggleMessage();
  };

  const getPositions = () => {
    if (positions.length > 0) alert("datele introduse vor fi pierdute");
    getData(provider);
  };
  const validateForm = () => {
    formFields.productName !== 0 && formFields.productName !== "0"
      ? setIsValid((prev) => ({ ...prev, product: true }))
      : setIsValid((prev) => ({ ...prev, product: false }));
    formFields.buyingPrice !== "0" && formFields.buyingPrice !== 0
      ? setIsValid((prev) => ({ ...prev, price: true }))
      : setIsValid((prev) => ({ ...prev, price: false }));
    formFields.stockQuantity !== "0" && formFields.stockQuantity !== 0
      ? setIsValid((prev) => ({ ...prev, quantity: true }))
      : setIsValid((prev) => ({ ...prev, quantity: false }));
    if (
      formFields.productName !== "0" &&
      formFields.productName !== 0 &&
      formFields.buyingPrice !== "0" &&
      formFields.buyingPrice !== 0 &&
      formFields.stockQuantity !== "0" &&
      formFields.stockQuantity !== 0
    ) {
      return true;
    }
    return false;
  };

  const addPosition = () => {
    const validated = validateForm();
    if (validated) {
      setInvoice([...invoice, { id: positionId, ...formFields }]);
      setPositionId((prev) => prev + 1);
    }
  };

  const handleDelete = (id) => {
    setInvoice((prev) => prev.filter((item) => item.id !== id));
  };
  const handleEdit = (id) => {
    setModifyButtons(() => true);
    const invoiceItem = invoice.find((item) => item.id === id);
    setInvoiceId(invoiceItem.id);
    setSelected(invoiceItem.productName);
    setImage(invoiceItem.productImg);
    setFormFields(() => {
      const { id, ...rest } = invoiceItem;
      return rest;
    });
  };
  const modifyPosition = () => {
    const validated = validateForm();
    if (validated) {
      const updatedInvoice = invoice.map((item) => {
        if (item.id === invoiceId) return { id: invoiceId, ...formFields };
        else return item;
      });
      setInvoice(updatedInvoice);
      setInvoiceModified(() => true);
      setModifyButtons(() => false);
      setTimeout(function () {
        setInvoiceModified(() => false);
      }, 2000);
    }
  };
  const cancelModify = () => {
    setModifyButtons(() => false);
  };

  const closeForm = () => {
    setCloseMessage(false);
    setActive();
    setInitialFields();
  };
  const cancelCloseForm = () => {
    setCloseMessage(false);
  };
  const saveData = () => {
    if (invoice.length === 0) {
      setFillFormMessage(true);
      return;
    }
    const finalInvoice = invoice.map(
      ({ productImg, productName, ...rest }) => ({ ...rest })
    );
    const formData = new FormData();
    formData.append("data", JSON.stringify(finalInvoice));
    formData.append("providerId", provider);
    formData.append("adminId", 1);
    postData(formData, "http://localhost:8080/api/invoiceReception/create");
    setIsSavedMessage(true);
  };
  const handleSaveData = () => {
    setIsSavedMessage(false);
    if (savedMessage) {
      setInitialFields();
      if (selectBuffer !== "default") getData(selectBuffer);
    }
    resetMessage();
  };
  const handleCloseForm = () => {
    if (invoice.length > 0) setCloseMessage(true);
    else closeForm();
  };
  return (
    <CreateInvoiceForm
      active={active}
      data={data}
      provider={provider}
      formFields={formFields}
      image={image}
      selected={selected}
      opened={opened}
      positions={positions}
      modifyButtons={modifyButtons}
      invoiceModified={invoiceModified}
      isValid={isValid}
      invoice={invoice}
      invoiceId={invoiceId}
      isOpenMessage={isOpenMessage}
      closeMessage={closeMessage}
      messageLoading={messageLoading}
      messageError={messageError}
      savedMessage={savedMessage}
      isSavedMessage={isSavedMessage}
      fillFormMessage={fillFormMessage}
      setOpened={setOpened}
      setFormFields={setFormFields}
      handleFormChange={handleFormChange}
      getPositions={getPositions}
      handleProviderChange={handleProviderChange}
      handleSelect={handleSelect}
      addPosition={addPosition}
      modifyPosition={modifyPosition}
      cancelModify={cancelModify}
      handleDelete={handleDelete}
      handleEdit={handleEdit}
      handleChange={handleChange}
      toggleMessage={toggleMessage}
      closeForm={closeForm}
      cancelCloseForm={cancelCloseForm}
      handleSaveData={handleSaveData}
      handleCloseForm={handleCloseForm}
      setFillFormMessage={setFillFormMessage}
      saveData={saveData}
    />
  );
};

export default CreateInvoice;
