import React, { useState, useEffect, useRef } from "react";
import selectFile from "../ProductForm/ProductFormFunctions/selectFile";
import usePostData from "../../hooks/usePostData";
import AdministratorModal from "../AdministratorModal/AdministratorModal";

const EditAdmin = ({ administrator, active, setActive, fetchData }) => {
  const [image, setImage] = useState("\\img\\placeholder.jpg");
  const [error, setError] = useState({
    name: false,
    password: false,
  });
  const [formFields, setFormFields] = useState({
    nickname: "",
    name: "",
    surname: "",
    email: "",
    phone: "",
    address: "",
    selectedImage: null,
    imgName: "",
    password: "",
    repeatPassword: "",
  });
  useEffect(() => {
    if (active) {
      setFormFields({
        ...formFields,
        nickname: administrator.nickname,
        name: administrator.name,
        surname: administrator.surname,
        address: administrator.address,
        email: administrator.email,
        phone: administrator.phone,
        selectedImage: null,
        imgName: administrator.avatar.split("/").pop(),
      });
      setImage(administrator.avatar);
    }
  }, [active]);
  const {
    message,
    loading,
    error: postError,
    resetMessage,
    postData,
  } = usePostData();
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
      administrator.avatar,
      administrator.avatar.split("/").pop()
    );
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const dataEntities = new FormData(event.target);
    const data = Object.fromEntries(dataEntities.entries());
    console.log(data);
    if (data.nickname === "" || data.nickname === null) {
      console.log("true");
      setError((prev) => ({
        ...prev,
        name: true,
      }));
      return;
    }
    if (data.password === "" || data.password === null) {
      console.log("true");
      setError((prev) => ({
        ...prev,
        password: true,
      }));
      return;
    }
    if (data.password !== data.repeatPassword) {
      console.log("true");
      setError((prev) => ({
        ...prev,
        password: true,
      }));
      return;
    }
    console.log("false");
    setError({
      name: false,
      password: false,
    });
    await postData(
      dataEntities,
      "http://localhost:8080/api/administrator/update/" + administrator.id
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
      password: "",
      repeatPassword: "",
    });
    setError({
      name: false,
      password: false,
    });
    resetMessage();
  };
  return (
    <AdministratorModal
      active={active}
      handleCloseForm={handleCloseForm}
      title="Editați administratorul:"
      image={image}
      onSelectedFile={onSelectedFile}
      formFields={formFields}
      error={error}
      message={message}
      handleFormChange={handleFormChange}
      handleSubmit={handleSubmit}
      formRef={formRef}
    />
  );
};

export default EditAdmin;
