import React from "react";
import "./Stocks.css";
import CardHolder from "../../components/CardHolder/CardHolder";
import allStocks from "../../allStocks";
const Stocks = () => {
  const unique = [];
  allStocks.forEach((value) => {
    if (!unique.includes(value.name)) {
      unique.push(value.name);
    }
  });
  console.log(unique);

  return (
    <div className="Stocks">
      {unique.map((item) => (
        <CardHolder stockName={item} allStocks={allStocks} />
      ))}
    </div>
  );
};

export default Stocks;
