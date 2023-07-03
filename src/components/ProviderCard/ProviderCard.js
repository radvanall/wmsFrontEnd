import React, { useEffect } from "react";
import { TiEdit } from "react-icons/ti";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useToggle } from "../../hooks/useToggle";
import EditProvider from "../EditProvider/EditProvider";
import DeleteItem from "../DeleteItem/DeleteItem";
import Card from "../Card/Card";
import "./ProviderCard.css";

const ProviderCard = ({ provider, getData }) => {
  const { status: isOpenModify, toggleStatus: toggleModify } = useToggle(false);
  const { status: isOpenDelete, toggleStatus: toggleDelete } = useToggle(false);
  useEffect(() => {
    console.log(provider);
  }, [provider]);
  const fetchData = () => {
    getData(provider.id);
  };
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

        <div className="provider__actions">
          <TiEdit
            className={
              isOpenModify
                ? "search_menu_button menu__opened"
                : "search_menu_button menu__closed"
            }
            onClick={toggleModify}
          />
          <RiDeleteBin6Line
            className={
              isOpenDelete
                ? "search_menu_button menu__opened"
                : "search_menu_button menu__closed"
            }
            onClick={toggleDelete}
          />
        </div>
      </div>
      <EditProvider
        provider={provider}
        active={isOpenModify}
        setActive={toggleModify}
        fetchData={fetchData}
      />
      <DeleteItem
        active={isOpenDelete}
        setActive={toggleDelete}
        endpoint="provider"
        id={provider.id}
        title="Sunteți siguri că doriți să ștergeți furnizorul ales?"
        navigateTo="/providers"
      />
    </Card>
  );
};

export default ProviderCard;
