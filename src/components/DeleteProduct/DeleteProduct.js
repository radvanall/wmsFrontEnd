import React from "react";
import Modal from "../Modal/Modal";
import { CgCloseR } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { setMessage, toggle } from "../../toolkitRedux/deleteMessageSlice";
// import { fetchProducts } from "../../../toolkitRedux/productsSlice";
import { useNavigate } from "react-router-dom";
import deleteProduct from "./functions/deleteProduct";
import "./DeleteProduct.css";
const DeleteProduct = ({ active, setActive, productId }) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const handleDelete = () => {
    deleteProduct(productId, dispatch, setMessage);
    navigate("/products");
    dispatch(toggle());
  };

  return (
    <Modal active={active}>
      <CgCloseR onClick={setActive} />
      <div className="delete_product_container">
        <h2>Sunteți siguri că doriți să ștergeți produsul ales?</h2>
        <div className="delete_buttons_container">
          <button onClick={handleDelete}>Șterge</button>
          <button onClick={setActive}>Anulează</button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteProduct;
