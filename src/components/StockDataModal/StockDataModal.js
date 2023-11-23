import React, { useState } from "react";
import Modal from "../Modal/Modal";
import "./StockDataModal.css";
import { TiEdit } from "react-icons/ti";
import getFormatedDate from "../../functions/getFormatedDate";
import CloseModal from "../CloseModal/CloseModal";
import getState from "../../functions/getState";
import { useNavigate } from "react-router-dom";
import BasicButton from "../BasicButton/BasicButton";
import BasicInput from "../BasicInput/BasicInput";
import { useToggle } from "../../hooks/useToggle";
import usePostData from "../../hooks/usePostData";
import AlertMessage from "../AlertMessage/AlertMessage";
import { useSelector } from "react-redux";
import imgLink from "../../googleAPI";
const StockDataModal = ({ active, handleCloseModal, stock, refetchPage }) => {
  const role = useSelector((state) => state.userSlice.userData?.authority);
  const isAllowed = role === "ROLE_ADMIN" || role === "ROLE_MAIN";
  const { status: isOpenEdit, toggleStatus: toggleEdit } = useToggle(false);
  const { status: isOpenAlert, toggleStatus: toggleAlert } = useToggle(false);
  const navigate = useNavigate();
  const [sellingPrice, setSellingPrice] = useState(stock.sellingPrice);
  const { message, loading, error, resetMessage, postData } = usePostData();

  const handlePriceChange = (e) => {
    if (e.target.value >= 0) setSellingPrice(e.target.value);
  };
  const handleKeyDown = (event) => {
    if (event.keyCode === 189) {
      event.preventDefault();
    }
  };
  const handleChangePrice = async () => {
    const dataEntities = new FormData();
    dataEntities.append("id", stock.id);
    dataEntities.append("sellingPrice", sellingPrice);
    await postData(
      dataEntities,
      `http://localhost:8080/api/stock/updateSellingPrice`
    );
    refetchPage();
  };
  const handleChangeState = async () => {
    if (stock.state != "validated") return;
    const dataEntities = new FormData();
    dataEntities.append("id", stock.id);
    dataEntities.append("state", "forSale");
    await postData(dataEntities, `http://localhost:8080/api/stock/updateState`);
    refetchPage();
    toggleAlert();
  };
  const handleToggleEdit = () => {
    resetMessage();
    setSellingPrice(stock.sellingPrice);
    toggleEdit();
  };
  const closeModal = () => {
    if (isOpenEdit) handleToggleEdit();
    handleCloseModal();
  };
  return (
    <Modal active={active}>
      <CloseModal handleCloseModal={closeModal} />
      <div className="stock__data__header">
        <div className="state__holder">{getState(stock.state)}</div>
        <div className="stock__data__field">
          <img
            src={imgLink + stock.positionImg}
            alt=""
            className="stock__data__img"
          />
          <p>
            <span>{stock.position}</span>
          </p>
        </div>
        <div className="stock__data__field">
          <img
            src={imgLink + stock.providerImg}
            alt=""
            className="stock__data__img"
          />
          <p>
            <span>{stock.provider}</span>
          </p>
        </div>
      </div>
      <div>
        <p className="stock__data__p">
          <span className="field__name">Data creării:</span>
          <span>{getFormatedDate(stock.dateOfCreation, "ro-RO")}</span>
        </p>
        <p className="stock__data__p">
          <span className="field__name">Data validării:</span>
          <span>{getFormatedDate(stock.dateOfValidation, "ro-RO")}</span>
        </p>
        <p className="stock__data__p">
          <span className="field__name">Categorie:</span>
          <span>{stock.categoryName}</span>
        </p>
        <p className="stock__data__p">
          <span className="field__name">Subcategorie:</span>
          <span>{stock.subcategoryName}</span>
        </p>
        <p className="stock__data__p">
          <span className="field__name">Cantitatea totală:</span>
          <span>
            {stock.quantity} {stock.unity}
          </span>
        </p>
        <p className="stock__data__p">
          <span className="field__name">Cantitatea rămasă:</span>
          <span>
            {stock.remainingQuantity} {stock.unity}
          </span>
        </p>
        <p className="stock__data__p">
          <span className="field__name">Preț cumpărare:</span>
          <span>{stock.buyingPrice} lei</span>
        </p>
        <p className="stock__data__p">
          <span className="field__name">Preț vânzare:</span>
          <span className="quantity__span">
            {stock.sellingPrice} lei
            {stock.state !== "inSale" &&
              stock.state !== "forSale" &&
              stock.state !== "soldOut" &&
              isAllowed && (
                <button
                  className="invoice__table__button"
                  onClick={handleToggleEdit}
                >
                  <TiEdit
                    className={
                      isOpenEdit
                        ? "search_menu_button menu__opened"
                        : "search_menu_button menu__closed"
                    }
                  />
                </button>
              )}
          </span>
        </p>
        <div
          className={isOpenEdit ? "open__price__edit" : "close__price__edit"}
        >
          <div className="input__button__wrapper">
            <BasicInput
              type="number"
              placeholder="Prețul de vânzare"
              value={sellingPrice}
              handleChange={handlePriceChange}
              name="price__input"
              handleKeyDown={handleKeyDown}
            />
            <BasicButton text="Salvează" handleClick={handleChangePrice} />
          </div>
          {message && (
            <p style={{ color: "red", paddingLeft: "10px" }}>{message}</p>
          )}
        </div>{" "}
        <p className="stock__data__p">
          <span className="field__name">Prețul total de cumpărare:</span>
          <span>{stock.totalBuyingPrice} lei</span>
        </p>
        <p className="stock__data__p">
          <span className="field__name">Prețul total de vânzare:</span>
          <span>{stock.totalSellingPrice} lei</span>
        </p>
      </div>
      {isAllowed && (
        <div className="stock__data__button__wrapper">
          <BasicButton
            text="Vezi factura"
            handleClick={() => {
              navigate(`/invoices/${stock.invoiceId}`);
            }}
          />
          {stock.state == "validated" && (
            <BasicButton text="Permiteți vânzarea" handleClick={toggleAlert} />
          )}
        </div>
      )}
      <AlertMessage
        message="Sunteți siguri că doriți să permiteți vânzarea acestui produs? Dacă confirmați nu veți mai putea modifica datele stocului."
        active={isOpenAlert}
      >
        <BasicButton
          text="Confirmați"
          handleClick={handleChangeState}
        ></BasicButton>
        <BasicButton text="Anulați" handleClick={toggleAlert}></BasicButton>
      </AlertMessage>
    </Modal>
  );
};

export default StockDataModal;
