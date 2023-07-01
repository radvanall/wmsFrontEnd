import React, { useEffect } from "react";
import Card from "../Card/Card";
import "./ProviderCard.css";

const ProviderCard = ({ provider }) => {
  useEffect(() => {
    console.log(provider);
  }, [provider]);
  return (
    <Card>
      <div className="provider__card__wrapper">
        <img src={provider.image} alt="#" className="provider__image" />
        <div className="provider_rows">
          <p>
            <span>Name:</span>
            <span>{provider.providerName}</span>
          </p>
          <p>
            <span>Adresa:</span>
            <span>{provider.address ?? "---"}</span>
          </p>
          <p>
            <span>Email:</span>
            <span>{provider.email ?? "---"}</span>
          </p>
          <p>
            <span>Tel:</span>
            <span>{provider.tel ?? "---"}</span>
          </p>
          <p>
            <span>Nr. de poziții:</span>
            <span>{provider.positions.length ?? "0"}</span>
          </p>
        </div>
      </div>
    </Card>
  );
};

export default ProviderCard;
