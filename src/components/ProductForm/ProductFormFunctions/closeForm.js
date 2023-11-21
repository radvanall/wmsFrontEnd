const closeForm = (
  setActive,
  setFormFields,
  setImage,
  setError,
  setServerResponse,
  formRef
) => {
  setActive();
  formRef.current.reset();
  setFormFields({
    product_name: "",
    categorie: "",
    subcategorie: "",
    provider: "",
    product_description: "",
    unity: "",
    imgName: "",
  });
  setImage("\\img\\placeholder.jpg");
  setError({
    name: false,
    file: false,
    fileName: false,
    description: false,
  });
  setServerResponse("");
};
export default closeForm;
