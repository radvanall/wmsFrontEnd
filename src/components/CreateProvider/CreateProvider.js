import React, { useState, useRef } from "react";
import Modal from "../Modal/Modal";
import { CgCloseR } from "react-icons/cg";
import { MdOutlineOpenInBrowser } from "react-icons/md";
import "./CreateProvider.css";
import selectFile from "../ProductForm/ProductFormFunctions/selectFile";
import usePostData from "../../hooks/usePostData";

const CreateProvider = ({ active, setActive, fetchData }) => {
  const [image, setImage] = useState("\\img\\placeholder.jpg");
  const [nameError, setNameError] = useState(false);
  const [formFields, setFormFields] = useState({
    providerName: "",
    address: "",
    email: "",
    tel: "",
    selectedImage: null,
    imgName: "",
  });
  const { message, loading, error, resetMessage, postData } = usePostData();

  const filePicker = useRef(null);
  const formRef = useRef(null);
  const pickFile = (event) => {
    event.preventDefault();
    filePicker.current.click();
  };
  const handleFormChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormFields((prevState) => ({ ...prevState, [name]: value }));
  };
  const onSelectedFile = (event) => {
    selectFile(event, setImage, setFormFields, "\\img\\placeholder.jpg", "");
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const dataEntities = new FormData(event.target);
    const data = Object.fromEntries(dataEntities.entries());
    console.log(data);
    if (data.providerName === "" || data.providerName === null) {
      console.log("true");
      setNameError(true);
      return;
    }
    console.log("false");
    setNameError(false);
    await postData(dataEntities, "http://localhost:8080/api/provider/create");
    fetchData();
  };
  const handleCloseForm = () => {
    setActive();
    formRef.current.reset();
    // setImgName("");
    setFormFields({
      providerName: "",
      address: "",
      email: "",
      tel: "",
      selectedImage: null,
      imgName: "",
    });
    setImage("\\img\\placeholder.jpg");
    setNameError(false);
    resetMessage();
  };
  return (
    <Modal active={active}>
      <CgCloseR onClick={handleCloseForm} />
      <h2 className="form__title">Creați un nou furnizor:</h2>
      <div className="provider__form__wrapper">
        <form className="provider__form" onSubmit={handleSubmit} ref={formRef}>
          <label htmlFor="providerNameId">Numele furnizorului:</label>
          <input type="text" name="providerName" id="providerNameId" />
          {nameError && (
            <label style={{ color: "red" }}>Numele e obligatoriu!</label>
          )}
          <label htmlFor="providerAddressId">Adresa furnizorului:</label>
          <input type="text" name="address" id="providerAddressId" />
          <label htmlFor="providerEmailId">Email-ul furnizorului:</label>
          <input type="text" name="email" id="providerEmailId" />
          <label htmlFor="providerTelId">Telefonul furnizorului:</label>
          <input type="text" name="tel" id="providerTelId" />
          <label className="img_label">
            Alegeți imaginea:
            <button onClick={pickFile} className="img_browse_button">
              <MdOutlineOpenInBrowser className="img_browse" />
            </button>
            <input
              type="text"
              name="imgName"
              id="add_product_name"
              className="img_name_input"
              value={formFields.imgName}
              onChange={handleFormChange}
            />
            <input
              className="hidden"
              name="image"
              type="file"
              ref={filePicker}
              accept="image/*,.png,.jpg,.jpeg,.web"
              onChange={onSelectedFile}
            ></input>
          </label>
          <button type="submit" className="submit_product_buton">
            Submit
          </button>
        </form>
        {message && <label style={{ color: "red" }}>{message}</label>}
        <img src={image} alt="img" className="product_add_img" />
      </div>
    </Modal>
  );
};

export default CreateProvider;
