import React, { useState, useRef } from "react";
import OperatorModal from "../OperatorModal/OperatorModal";
import selectFile from "../ProductForm/ProductFormFunctions/selectFile";
import usePostData from "../../hooks/usePostData";

const CreateOperator = ({ active, setActive, fetchData, url, user }) => {
  const [image, setImage] = useState("\\img\\placeholder.jpg");
  const [nameError, setNameError] = useState(false);
  const [formFields, setFormFields] = useState({
    nickname: "",
    name: "",
    surname: "",
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
    if (data.phone === "" || data.phone === null) {
      dataEntities.set("phone", 0);
    }
    console.log("false");
    setNameError(false);
    await postData(dataEntities, url);
    fetchData();
    setTimeout(() => {
      resetMessage();
    }, 2000);
  };

  const handleCloseForm = () => {
    setActive();
    formRef.current.reset();
    setFormFields({
      nickname: "",
      name: "",
      surname: "",
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
    <OperatorModal
      active={active}
      handleCloseForm={handleCloseForm}
      title={`Creați un nou ${user}`}
      user={user}
      image={image}
      onSelectedFile={onSelectedFile}
      formFields={formFields}
      nameError={nameError}
      message={message}
      handleFormChange={handleFormChange}
      handleSubmit={handleSubmit}
      formRef={formRef}
    />
  );
};

export default CreateOperator;
