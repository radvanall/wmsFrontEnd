import React, { useState, useEffect } from "react";
import Modal from "../Modal/Modal";
import CloseModal from "../CloseModal/CloseModal";
import BasicInput from "../BasicInput/BasicInput";
import BasicButton from "../BasicButton/BasicButton";
import usePostData from "../../hooks/usePostData";
import "./EditStock.css";

const EditStock = ({ active, handleCloseModal, stock, refetch }) => {
  console.log("stockEdit=", stock);
  const [errorMessage, setErrorMessage] = useState(null);
  const [formData, setFormData] = useState({
    id: "",
    buyingPrice: 0,
    sellingPrice: 0,
    quantity: 0,
  });
  const {
    message,
    loading: load,
    error,
    resetMessage,
    postData,
  } = usePostData();
  useEffect(() => {
    if (active) {
      setFormData({
        id: stock.id,
        buyingPrice: stock["Preț de cumpărare"],
        sellingPrice: stock["Preț de vînzare"],
        quantity: stock["Cantitate"],
      });
    }
  }, [active]);
  const handleFormChange = (e) => {
    console.log(e.target.name);
    setFormData({
      ...formData,
      [e.target.name]: [e.target.value],
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const dataEntities = new FormData(event.target);
    const data = Object.fromEntries(dataEntities.entries());
    dataEntities.append("id", formData.id);
    if (data.quantity <= 0 || data.buyingPrice <= 0 || data.sellingPrice <= 0) {
      setErrorMessage("Completați toate cîmpurile");
      return;
    }
    setErrorMessage(null);
    console.log("data=", data);
    console.log("dataEntity=", dataEntities);
    await postData(dataEntities, `http://localhost:8080/api/stock/update`);
    refetch();
  };
  const closeModal = () => {
    resetMessage();
    setErrorMessage(null);
    handleCloseModal();
  };
  return (
    <Modal active={active}>
      <CloseModal handleCloseModal={closeModal} />
      <div className="edit__stock__header">
        <img src={stock.image} alt="" />
        <p>
          <span> Numele produsului: </span>
          {stock.Produs}
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <BasicInput
          label="Preț de cumpărare:"
          handleChange={handleFormChange}
          value={formData.buyingPrice}
          inputName="buyingPrice"
          type="number"
        />
        <BasicInput
          label="Preț de vînzare:"
          handleChange={handleFormChange}
          value={formData.sellingPrice}
          inputName="sellingPrice"
          type="number"
        />
        <div className="quantity__input">
          <BasicInput
            label="Cantitate:"
            handleChange={handleFormChange}
            value={formData.quantity}
            inputName="quantity"
            type="number"
          />
          <span>{stock.Unitate}</span>
        </div>
        <div className="edit__stock__buttons">
          <BasicButton type="submit" text="Modifică" />
          <BasicButton type="button" text="Anulează" handleClick={closeModal} />
        </div>
        {errorMessage && (
          <p className="stock__error__message">{errorMessage}</p>
        )}
        {message && <p className="stock__error__message">{message}</p>}
        {error && <p className="stock__error__message">{error}</p>}
      </form>
    </Modal>
  );
};

export default EditStock;
