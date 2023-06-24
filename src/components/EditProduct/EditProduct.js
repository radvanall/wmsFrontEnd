import React, { useState, useRef, useEffect } from "react";
import Modal from "../Modal/Modal";
import "../CreateProduct/CreateProduct.css";
import useFetch from "../../hooks/useFetch";
import { CgCloseR, CgOpenCollective } from "react-icons/cg";
import ProductForm from "../ProductForm/ProductForm";
import useCheckProductFormEditError from "../ProductForm/ProductFormHooks/useCheckProductFormEditError";
import closeForm from "../ProductForm/ProductFormFunctions/closeForm";
import formChange from "../ProductForm/ProductFormFunctions/formChange";
import selectFile from "../ProductForm/ProductFormFunctions/selectFile";
import useProductFormEdit from "../ProductForm/ProductFormHooks/useProductFormEdit";
import putProduct from "../ProductForm/ProductFormFunctions/putProduct";

const EditProduct = ({ active, setActive, product }) => {
  const [image, setImage] = useState("\\img\\placeholder.jpg");
  const [serverResponse, setServerResponse] = useState("");
  const [formFields, setFormFields] = useState({
    product_name: "",
    categorie: "",
    subcategorie: "",
    provider: "",
    product_description: "",
    unity: "",
    //selectedImage: null,
    imgName: "",
  });

  const formRef = useRef(null);
  const { data, error: fail } = useFetch(
    "http://localhost:8080/api/productobjectcriteria/get"
  );
  const { error, setError, checkError } = useCheckProductFormEditError();
  const filePicker = useRef(null);
  const onSelectedFile = (event) => {
    selectFile(event, setImage, setFormFields, product.img, product.imgName);
  };
  const { Submit } = useProductFormEdit(
    checkError,
    setServerResponse,
    putProduct
  );
  const handleSubmit = (event) => {
    Submit(event, product.id);
    console.log("product=", product.id);
    // event.preventDefault();
    // const dataEntities = new FormData(event.target);
    // const data = Object.fromEntries(dataEntities.entries());
    // console.log(data);
  };
  const pickFile = (event) => {
    event.preventDefault();
    filePicker.current.click();
  };
  const handleCloseForm = () => {
    closeForm(
      setActive,
      setFormFields,
      setImage,
      setError,
      setServerResponse,
      formRef
    );
  };
  const handleFormChange = (event) => {
    formChange(event, setFormFields);
    console.log(formFields);
  };
  useEffect(() => {
    //var file = new File([imgS], "nameiMG");

    setFormFields({
      product_name: product.name,
      categorie: product.categorie,
      subcategorie: product.subcategorie,
      provider: product.producator,
      product_description: product.descriere,
      unity: product.unitate,
      //selectedImage: product.img,
      imgName: product.imgName,
    });
    setImage(product.img);
  }, [product]);
  return (
    <div>
      <Modal active={active}>
        <CgCloseR onClick={handleCloseForm} />
        <h2>{product.name}</h2>
        {fail === null ? (
          <ProductForm
            handleSubmit={handleSubmit}
            handleFormChange={handleFormChange}
            formRef={formRef}
            formFields={formFields}
            onSelectedFile={onSelectedFile}
            serverResponse={serverResponse}
            image={image}
            error={error}
            data={data}
            filePicker={filePicker}
            pickFile={pickFile}
          />
        ) : (
          <h2>{fail}</h2>
        )}
      </Modal>
    </div>
  );
};

export default EditProduct;
