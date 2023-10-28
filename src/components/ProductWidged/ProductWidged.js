import React from "react";
import "./ProductWidged.css";
import imgLink from "../../googleAPI";
const ProductWidged = ({ product }) => {
  return (
    <div className="widged__container">
      <div className="widged__img__container">
        <img src={imgLink + product.img} alt="" />
      </div>
      <div className="product__fields">
        <div className="field__container">
          <h2>Id:</h2>
          <h2>{product.id}</h2>
        </div>
        <div className="field__container">
          <h2>Nume:</h2>
          <h2>{product.name}</h2>
        </div>
        <div className="field__container">
          <h2>Categorie:</h2>
          <h2>{product.categorie}</h2>
        </div>
        <div className="field__container">
          <h2>Subcategorie:</h2>
          <h2>{product.subcategorie}</h2>
        </div>
        <div className="field__container">
          <h2>Producator:</h2>
          <h2>{product.producator}</h2>
        </div>
        <div className="field__container">
          <h2>Cantitate în stoc:</h2>
          <h2>{product.cantitate ? product.cantitate : 0}</h2>
        </div>
        <div className="field__container">
          <h2>Cantitate minimă admisibilă:</h2>
          <h2>{product.minQuantity ? product.minQuantity : 0}</h2>
        </div>
        <div className="field__container">
          <h2>Unitate:</h2>
          <h2>{product.unitate}</h2>
        </div>
      </div>
    </div>
  );
};

export default ProductWidged;
