import React, { useState, useRef } from "react";
import CustomerModal from "../CustomerModal/CustomerModal";
import selectFile from "../ProductForm/ProductFormFunctions/selectFile";
import usePostData from "../../hooks/usePostData";
const CreateCustomer = ({ active, setActive, fetchData }) => {
  const [image, setImage] = useState("\\img\\placeholder.jpg");
  const [nameError, setNameError] = useState(false);
  const [formFields, setFormFields] = useState({
    nickname: "",
    email: "",
    phone: "",
    address: "",
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
    if (data.nickname === "" || data.nickname === null) {
      console.log("true");
      setNameError(true);
      return;
    }
    console.log("false");
    setNameError(false);
    await postData(dataEntities, "http://localhost:8080/api/customer/create");
    fetchData();
    setTimeout(() => {
      resetMessage();
    }, 2000);
  };

  const handleCloseForm = () => {
    setActive();
    formRef.current.reset();
    // setImgName("");
    setFormFields({
      nickname: "",
      email: "",
      phone: "",
      address: "",
      selectedImage: null,
      imgName: "",
    });
    setImage("\\img\\placeholder.jpg");
    setNameError(false);
    resetMessage();
  };

  return (
    <CustomerModal
      active={active}
      handleCloseForm={handleCloseForm}
      title="Creați un nou client:"
      image={image}
      onSelectedFile={onSelectedFile}
      // pickFile={pickFile}
      formFields={formFields}
      nameError={nameError}
      message={message}
      // filePicker={filePicker}

      handleFormChange={handleFormChange}
      handleSubmit={handleSubmit}
      formRef={formRef}
    />
  );
};

export default CreateCustomer;
