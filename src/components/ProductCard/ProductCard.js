import React from "react";
import "./ProductCard.css";
import { Link } from "react-router-dom";
import "../../widged__wrapper.css";
const ProductCard = ({ item }) => {
  return (
    <div className="card__wrapper product__card__wrapper">
      <div className="product__card__img__container">
        <img src={item.img} alt="#" />
      </div>
      <div className="card__fields">
        <div className="card__field__container">
          <h2>Id: </h2>
          <h2>{item.id}</h2>
        </div>
        <div className="card__field__container">
          <h2>Data:</h2>
          <h2>{item.data}</h2>
        </div>
        <div className="card__field__container">
          <h2>Cantitatea:</h2>
          <h2>{item.cantitate}</h2>
        </div>
        <div className="card__field__container">
          <h2>Producator:</h2>
          <h2>{item.producator}</h2>
        </div>
      </div>
      <Link to="/" className="card__link">
        Detalii
      </Link>
    </div>
  );
};

export default ProductCard;
