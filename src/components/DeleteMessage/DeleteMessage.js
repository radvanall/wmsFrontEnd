import React from "react";
import Modal from "../Modal/Modal";
import { CgCloseR } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { toggle, setMessage } from "../../toolkitRedux/deleteMessageSlice";
// import { fetchProducts } from "../../../toolkitRedux/productsSlice";
import "../DeleteProduct/DeleteProduct.css";
const DeleteMessage = () => {
  const dispatch = useDispatch();
  const active = useSelector((state) => state.deleteSlice.opened);
  const message = useSelector((state) => state.deleteSlice.message);
  const setActive = () => {
    dispatch(toggle());
    dispatch(setMessage(""));
  };
  return (
    <Modal active={active} setActive={setActive}>
      <CgCloseR onClick={setActive} />
      <div className="delete_product_container">
        <h2>{message}</h2>
      </div>
    </Modal>
  );
};

export default DeleteMessage;
