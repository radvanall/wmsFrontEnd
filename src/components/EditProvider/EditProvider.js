import React, { useState, useEffect, useRef } from "react";
import selectFile from "../ProductForm/ProductFormFunctions/selectFile";
import ProviderModal from "../ProviderModal/ProviderModal";
import usePostData from "../../hooks/usePostData";
import imgLink from "../../googleAPI";
const EditProvider = ({ provider, active, setActive, fetchData }) => {
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
  provider.image.split("/").pop();
  useEffect(() => {
    if (active) {
      setFormFields({
        providerName: provider.providerName,
        address: provider.address,
        email: provider.email,
        tel: provider.tel,
        selectedImage: null,
        imgName: provider.image.split("/").pop(),
      });
      setImage(imgLink + provider.image);
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
      provider.image,
      provider.image.split("/").pop()
    );
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const dataEntities = new FormData(event.target);
    const data = Object.fromEntries(dataEntities.entries());
    if (data.providerName === "" || data.providerName === null) {
      setNameError(true);
      return;
    }
    setNameError(false);
    await postData(
      dataEntities,
      "http://localhost:8080/api/provider/update/" + provider.id
    );
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
    setNameError(false);
    resetMessage();
  };

  return (
    <ProviderModal
      active={active}
      title="Editați furnizorul:"
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

export default EditProvider;
