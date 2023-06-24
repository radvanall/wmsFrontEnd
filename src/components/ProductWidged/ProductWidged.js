import React from "react";
import "./ProductWidged.css";

const ProductWidged = ({ product }) => {
  return (
    <div className="widged__container">
      <div className="widged__img__container">
        <img src={product.img} alt="" />
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
          <h2>Cantitate:</h2>
          <h2>{product.cantitate}</h2>
        </div>
        <div className="field__container">
          <h2>Unitate:</h2>
          <h2>{product.unitate}</h2>
        </div>
        <div className="field__container">
          <h2>Pret:</h2>
          <h2>{product.pret}</h2>
        </div>
      </div>
    </div>
  );
};

export default ProductWidged;
