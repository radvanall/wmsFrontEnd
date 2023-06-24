import React from "react";
import "./Operator.css";
const Operator = ({ operator }) => {
  return (
    <div className="operator__data">
      <div className="operator__img__container">
        <img src={operator.img} alt="" />
      </div>
      <div className="operator__fields">
        <div className="field__container">
          <h2>Id:</h2>
          <h2>{operator.id}</h2>
        </div>
        <div className="field__container">
          <h2>Nickname:</h2>
          <h2>{operator.nickname}</h2>
        </div>
        <div className="field__container">
          <h2>Nume:</h2>
          <h2>{operator.name}</h2>
        </div>
        <div className="field__container">
          <h2>Prenume:</h2>
          <h2>{operator.surname}</h2>
        </div>
        <div className="field__container">
          <h2>Email:</h2>
          <h2>{operator.email}</h2>
        </div>
        <div className="field__container">
          <h2>Tel:</h2>
          <h2>{operator.tel}</h2>
        </div>
        <div className="field__container">
          <h2>Status:</h2>
          <h2>{operator.status}</h2>
        </div>
      </div>
    </div>
  );
};

export default Operator;
