import React from "react";
import "./ProductCard.css";
import { Link } from "react-router-dom";
import getFormatedDate from "../../functions/getFormatedDate";
import "../../widged__wrapper.css";
import StockDataModal from "../StockDataModal/StockDataModal";
import { useToggle } from "../../hooks/useToggle";
const ProductCard = ({ item }) => {
  const { status: isOpenStockData, toggleStatus: toggleStockData } =
    useToggle(false);
  const getState = () => {
    if (item.state === "unvalidated")
      return (
        <>
          {" "}
          <h2>Statut:</h2>
          <h2
            style={{
              backgroundColor: "#ffaebc",
              padding: "5px",
              borderRadius: "5px",
            }}
          >
            Nevalidat
          </h2>
        </>
      );
    if (item.state === "validated")
      return (
        <>
          {" "}
          <h2>Statut:</h2>
          <h2
            style={{
              backgroundColor: "#b4f8c8",
              padding: "5px",
              borderRadius: "5px",
            }}
          >
            Validat
          </h2>
        </>
      );
    if (item.state === "inSale")
      return (
        <>
          {" "}
          <h2>Statut:</h2>
          <h2
            style={{
              backgroundColor: "#b4f8f5",
              padding: "5px",
              borderRadius: "5px",
            }}
          >
            În vânzare
          </h2>
        </>
      );
    if (item.state === "forSale")
      return (
        <>
          {" "}
          <h2>Statut:</h2>
          <h2
            style={{
              backgroundColor: "#f8e4b4",
              padding: "5px",
              borderRadius: "5px",
            }}
          >
            Pentru vânzare
          </h2>
        </>
      );
  };
  console.log(item);
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
          <h2>{item.quantity}</h2>
        </div>
        <div className="card__field__container">
          <h2>Producator:</h2>
          <h2>{item.provider}</h2>
        </div>
        <div className="card__field__container">{getState()}</div>
      </div>
      <button onClick={toggleStockData} className="card__link">
        Detalii
      </button>
      {/* <Link to="/" className="card__link">
        Detalii
      </Link> */}
      <StockDataModal
        active={isOpenStockData}
        handleCloseModal={toggleStockData}
      />
    </div>
  );
};

export default ProductCard;
