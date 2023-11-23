import React from "react";
import { TiEdit } from "react-icons/ti";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useToggle } from "../../hooks/useToggle";
import EditProduct from "../EditProduct/EditProduct";
import DeleteItem from "../DeleteItem/DeleteItem";
import useGetData from "../../hooks/useGetData";
import "./SingleProductMenu.css";
const SingleProductMenu = ({ id }) => {
  const { status: isOpenModify, toggleStatus: toggleModify } = useToggle(false);
  const { status: isOpenDelete, toggleStatus: toggleDelete } = useToggle(false);
  const { data, loading, error, getData } = useGetData(
    `http://localhost:8080/api/position/readproduct/`
  );
  const handleModify = () => {
    toggleModify();
    getData(id);
    console.log(data);
  };
  return (
    <div className="single_menu__buttons">
      <TiEdit
        className={
          isOpenModify
            ? "search_menu_button menu__opened"
            : "search_menu_button menu__closed"
        }
        onClick={handleModify}
      />
      <RiDeleteBin6Line
        className={
          isOpenDelete
            ? "search_menu_button menu__opened"
            : "search_menu_button menu__closed"
        }
        onClick={toggleDelete}
      />

      {data && (
        <EditProduct
          active={isOpenModify}
          setActive={toggleModify}
          product={data}
        />
      )}

      <DeleteItem
        active={isOpenDelete}
        setActive={toggleDelete}
        endpoint="position"
        id={id}
        title="Sunteți siguri că doriți să ștergeți produsul ales?"
        navigateTo="/products"
      />
    </div>
  );
};

export default SingleProductMenu;
