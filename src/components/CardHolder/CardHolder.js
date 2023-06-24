import React from "react";
import "./CardHolder.css";
import ProductCard from "../../components/ProductCard/ProductCard";
const CardHolder = ({ stockName, allStocks }) => {
  const stocks = allStocks.filter((item) => item.name === stockName);
  console.log(stocks);
  return (
    <div className="card__holder">
      <h2 className="card__holder__name">{stockName}</h2>
      {stocks.map((item) => (
        <ProductCard item={item} />
      ))}
    </div>
  );
};

export default CardHolder;
