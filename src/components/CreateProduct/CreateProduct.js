import React, { useState, useRef, useEffect } from "react";
import Modal from "../Modal/Modal";
import "./CreateProduct.css";
import useFetch from "../../hooks/useFetch";
import { CgCloseR } from "react-icons/cg";
import ProductForm from "../ProductForm/ProductForm";
import useCheckProductFormError from "../ProductForm/ProductFormHooks/useCheckProductFormError";
import closeForm from "../ProductForm/ProductFormFunctions/closeForm";
import formChange from "../ProductForm/ProductFormFunctions/formChange";
import selectFile from "../ProductForm/ProductFormFunctions/selectFile";
import useProductFormSubmit from "../ProductForm/ProductFormHooks/useProductFormSubmit";
import postProduct from "../ProductForm/ProductFormFunctions/postProduct";

const CreateProduct = ({ active, setActive }) => {
  const [image, setImage] = useState("\\img\\placeholder.jpg");
  const [serverResponse, setServerResponse] = useState("");
  const [formFields, setFormFields] = useState({
    product_name: "",
    categorie: "",
    subcategorie: "",
    provider: "",
    product_description: "",
    unity: "",
    selectedImage: null,
    imgName: "",
    minQuantity: 0,
  });
  const formRef = useRef(null);
  const {
    data,
    error: fail,
    fetchData,
  } = useFetch("http://localhost:8080/api/productobjectcriteria/get");
  useEffect(() => {
    fetchData();
  }, [active]);
  const { error, setError, checkError } = useCheckProductFormError();
  const filePicker = useRef(null);
  const onSelectedFile = (event) => {
    selectFile(event, setImage, setFormFields, "\\img\\placeholder.jpg", "");
  };
  const { Submit } = useProductFormSubmit(
    checkError,
    setServerResponse,
    postProduct
  );
  const handleSubmit = (event) => {
    Submit(event);
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

  return (
    <div>
      <Modal active={active}>
        <CgCloseR onClick={handleCloseForm} />
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
export default CreateProduct;
