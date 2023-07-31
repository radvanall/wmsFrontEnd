import React from "react";
import "./ProductCard.css";
import { Link } from "react-router-dom";
import getFormatedDate from "../../functions/getFormatedDate";
import "../../widged__wrapper.css";
import StockDataModal from "../StockDataModal/StockDataModal";
import { useToggle } from "../../hooks/useToggle";
import getState from "../../functions/getState";
const ProductCard = ({ item, refetchPage }) => {
  const { status: isOpenStockData, toggleStatus: toggleStockData } =
    useToggle(false);

  const handleDetails = (id) => {
    toggleStockData();
  };
  return (
    <div className="card__wrapper product__card__wrapper">
      <div className="product__card__img__container">
        <img src={item.positionImg} alt="#" />
      </div>
      <div className="card__fields">
        <div className="card__field__container">
          <h2>Id: </h2>
          <h2>{item.id}</h2>
        </div>
        <div className="card__field__container">
          <h2>Data:</h2>
          <h2>{getFormatedDate(item.dateOfCreation, "ro-RO")}</h2>
        </div>
        <div className="card__field__container">
          <h2>Cantitatea:</h2>
          <h2>
            {item.quantity} {item.unity}
          </h2>
        </div>
        <div className="card__field__container">
          <h2>Producator:</h2>
          <h2>{item.provider}</h2>
        </div>
        <div className="card__field__container">
          <h2>Statut:</h2>
          {getState(item.state)}
        </div>
      </div>
      <button onClick={toggleStockData} className="card__link">
        Detalii
      </button>

      <StockDataModal
        active={isOpenStockData}
        handleCloseModal={toggleStockData}
        stock={item}
        refetchPage={refetchPage}
      />
    </div>
  );
};

export default ProductCard;
