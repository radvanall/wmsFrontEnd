import React, { useEffect, useState } from "react";
import Modal from "../Modal/Modal";
import CloseModal from "../CloseModal/CloseModal";
import BasicInput from "../BasicInput/BasicInput";
import BasicButton from "../BasicButton/BasicButton";
import CustomSelect from "../CustomSelect/CustomSelect";
import useGetData from "../../hooks/useGetData";
import usePostData from "../../hooks/usePostData";
const AddStock = ({
  active,
  invoiceId,
  handleCloseModal,
  provider,
  providerId,
  image,
  refetch,
}) => {
  const [productImage, setProductImage] = useState("/img/57x57.png");
  const [opened, setOpened] = useState(false);
  const [unity, setUnity] = useState("-");
  const [selected, setSelected] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const { data, loading, error, getData } = useGetData(
    `http://localhost:8080/api/provider/read/`
  );
  const {
    message,
    loading: load,
    error: postError,
    resetMessage,
    postData,
  } = usePostData();
  const [formFields, setFormFields] = useState({
    productId: 0,
    productImg: 0,
    productName: 0,
    stockQuantity: 0,
    buyingPrice: 0,
    sellingPrice: 0,
  });
  useEffect(() => {
    getData(providerId);
  }, []);

  const handleSelect = (event) => {
    const element = data.positions.find(
      (obj) => parseInt(obj.id, 10) === parseInt(event.target.id, 10)
    );
    setSelected(element.name);
    setUnity(element.unity);
    setOpened((prev) => !prev);
    setProductImage(element.image);
    setFormFields((prev) => ({
      ...prev,
      productId: event.target.id,
      productName: element.name,
      productImg: element.image,
    }));
  };
  const handleFormChange = (e) => {
    e.preventDefault();
    setFormFields({
      ...formFields,
      [e.target.name]: e.target.value,
    });
  };
  const closeModal = () => {
    // resetMessage();
    setProductImage("/img/57x57.png");
    setUnity("-");
    setSelected("");
    setFormFields({
      productId: 0,
      productImg: 0,
      productName: 0,
      stockQuantity: 0,
      buyingPrice: 0,
      sellingPrice: 0,
    });
    setErrorMessage(null);
    handleCloseModal();
  };
  console.log("positionData:", data);
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formFields);
    const newStock = {
      invoiceId,
      productId: formFields.productId,
      stockQuantity: formFields.stockQuantity,
      buyingPrice: formFields.buyingPrice,
      sellingPrice: formFields.sellingPrice,
    };
    await postData(
      newStock,
      `http://localhost:8080/api/invoiceReception/addStock`
    );
    refetch();
  };
  return (
    <Modal active={active}>
      <CloseModal handleCloseModal={closeModal} />
      <div className="edit__stock__header">
        <img src={image} />
        <p>
          <span> Numele furnizorului: </span>
          {provider}
        </p>
      </div>
      <br />
      <form onSubmit={handleSubmit}>
        {data && (
          <CustomSelect
            positions={data.positions}
            image={productImage}
            selected={selected}
            opened={opened}
            setOpened={setOpened}
            handleSelect={handleSelect}
          />
        )}

        <BasicInput
          label="Preț de cumpărare:"
          handleChange={handleFormChange}
          value={formFields.buyingPrice}
          inputName="buyingPrice"
          type="number"
        />
        <BasicInput
          label="Preț de vînzare:"
          handleChange={handleFormChange}
          value={formFields.sellingPrice}
          inputName="sellingPrice"
          type="number"
        />
        <div className="quantity__input">
          <BasicInput
            label="Cantitate:"
            handleChange={handleFormChange}
            value={formFields.stockQuantity}
            inputName="stockQuantity"
            type="number"
          />
          <span>{unity}</span>
        </div>
        <div className="edit__stock__buttons">
          <BasicButton type="submit" text="Modifică" />
          <BasicButton type="button" text="Anulează" handleClick={closeModal} />
        </div>
        {errorMessage && (
          <p className="stock__error__message">{errorMessage}</p>
        )}
        {message && <p className="stock__error__message">{message}</p>}
        {postError && <p className="stock__error__message">{postError}</p>}
      </form>
    </Modal>
  );
};

export default AddStock;
