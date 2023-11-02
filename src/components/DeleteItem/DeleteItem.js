import React from "react";
import Modal from "../Modal/Modal";
import { CgCloseR } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { setMessage, toggle } from "../../toolkitRedux/deleteMessageSlice";
import CloseModal from "../CloseModal/CloseModal";
// import { fetchProducts } from "../../../toolkitRedux/productsSlice";
import { useNavigate } from "react-router-dom";
import deleteItem from "./functions/deleteItem";
import "./DeleteItem.css";
const DeleteItem = ({ active, setActive, endpoint, id, navigateTo, title }) => {
  const dispatch = useDispatch();
  const jwt = useSelector((state) => state.userSlice.jwt);

  const navigate = useNavigate();
  const handleDelete = async () => {
    await deleteItem(id, endpoint, dispatch, setMessage, jwt);
    navigate(navigateTo);
    dispatch(toggle());
  };

  return (
    <Modal active={active}>
      <CloseModal handleCloseModal={setActive} />

      <div className="delete_product_container">
        <h2>{title}</h2>
        <div className="delete_buttons_container">
          <button onClick={handleDelete}>Șterge</button>
          <button onClick={setActive}>Anulează</button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteItem;
