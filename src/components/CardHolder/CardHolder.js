import React from "react";
import "./CardHolder.css";
import getFormatedDate from "../../functions/getFormatedDate";
import ProductCard from "../../components/ProductCard/ProductCard";
const CardHolder = ({ stockName, stocks, refetchPage }) => {
  // const stocks = allStocks.filter((item) => item.name === stockName);
  // console.log(stocks);
  return (
    <div className="card__holder">
      <h2 className="card__holder__name">{stockName}</h2>
      {stocks
        .filter(
          (stock) =>
            getFormatedDate(stock.dateOfCreation, "ro-RO") === stockName
        )
        .map((item) => (
          <ProductCard item={item} key={item.id} refetchPage={refetchPage} />
        ))}
    </div>
  );
};

export default CardHolder;
