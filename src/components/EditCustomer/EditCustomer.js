import React, { useState, useEffect, useRef } from "react";
import selectFile from "../ProductForm/ProductFormFunctions/selectFile";
import usePostData from "../../hooks/usePostData";
import CustomerModal from "../CustomerModal/CustomerModal";
const EditCustomer = ({ customer, active, setActive, fetchData }) => {
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
  useEffect(() => {
    if (active) {
      setFormFields({
        nickname: customer.nickname,
        address: customer.address,
        email: customer.email,
        phone: customer.phone,
        selectedImage: null,
        imgName: customer.avatar.split("/").pop(),
      });
      setImage(customer.avatar);
    }
  }, [active]);
  const { message, loading, error, resetMessage, postData } = usePostData();
  const formRef = useRef(null);
  const handleFormChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormFields((prevState) => ({ ...prevState, [name]: value }));
  };
  const onSelectedFile = (event) => {
    selectFile(
      event,
      setImage,
      setFormFields,
      customer.avatar,
      customer.avatar.split("/").pop()
    );
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
    await postData(
      dataEntities,
      "http://localhost:8080/api/customer/update/" + customer.id
    );
    fetchData();
  };
  const handleCloseForm = () => {
    setActive();
    formRef.current.reset();
    setFormFields({
      nickname: "",
      email: "",
      phone: "",
      address: "",
      selectedImage: null,
      imgName: "",
    });
    setNameError(false);
    resetMessage();
  };
  return (
    <CustomerModal
      active={active}
      handleCloseForm={handleCloseForm}
      title="Editați clientul:"
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

export default EditCustomer;
