import React, { useState, useEffect, useRef } from "react";
import selectFile from "../ProductForm/ProductFormFunctions/selectFile";
import usePostData from "../../hooks/usePostData";
import OperatorModal from "../OperatorModal/OperatorModal";
import imgLink from "../../googleAPI";

const EditOperator = ({
  operator,
  active,
  setActive,
  fetchData,
  user,
  url,
}) => {
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
  useEffect(() => {
    if (active) {
      setFormFields({
        nickname: operator.nickname,
        name: operator.name,
        surname: operator.surname,
        address: operator.address,
        email: operator.email,
        phone: operator.phone,
        selectedImage: null,
        imgName: operator.avatar.split("/").pop(),
      });
      setImage(imgLink + operator.avatar);
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
      operator.avatar,
      operator.avatar.split("/").pop()
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
      url + operator.id
      // "http://localhost:8080/api/operator/update/" + operator.id
    );
    fetchData();
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
    setNameError(false);
    resetMessage();
  };
  return (
    <OperatorModal
      active={active}
      handleCloseForm={handleCloseForm}
      title={`Editați ${user}ul`}
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

export default EditOperator;
