import React, { useState, useRef } from "react";
import ProviderModal from "../ProviderModal/ProviderModal";
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

  const formRef = useRef(null);
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
    <ProviderModal
      active={active}
      title="Creați un nou furnizor:"
      image={image}
      onSelectedFile={onSelectedFile}
      formFields={formFields}
      nameError={nameError}
      message={message}
      handleCloseForm={handleCloseForm}
      handleFormChange={handleFormChange}
      handleSubmit={handleSubmit}
      formRef={formRef}
    />
  );
};

export default CreateProvider;
