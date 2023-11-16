import React from "react";
import Modal from "../Modal/Modal";
import CloseModal from "../CloseModal/CloseModal";
import CategoryList from "../CategoryList/CategoryList";
import "./CategoryModal.css";

const CategoryModal = ({ closeModal, active }) => {
  return (
    <Modal active={active}>
      <CloseModal handleCloseModal={closeModal} />
      <div className="category__wrapper">
        <CategoryList
          endpoint="http://localhost:8080/api/category"
          active={active}
          firstLabel="Adăugați o nouă categorie:"
          secondLabel="Modificați categoria:"
          name="categoryName"
        />
        <CategoryList
          endpoint="http://localhost:8080/api/subcategory"
          active={active}
          firstLabel="Adăugați o nouă subcategorie:"
          secondLabel="Modificați subcategoria:"
          name="subcategoryName"
        />
      </div>
    </Modal>
  );
};

export default CategoryModal;
