import React from "react";
import "./Card.css";
const Card = ({ children }) => {
  return <div className="card__container">{children}</div>;
};

export default Card;
