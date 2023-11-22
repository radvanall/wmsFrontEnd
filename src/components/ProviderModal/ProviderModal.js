import React from "react";
import Modal from "../Modal/Modal";
import CloseModal from "../CloseModal/CloseModal";
import ImagePicker from "../ImagePicker/ImagePicker";
import "./ProviderModal.css";
const ProviderModal = ({
  active,
  title,
  image,
  onSelectedFile,
  formFields,
  nameError,
  message,
  handleCloseForm,
  handleFormChange,
  handleSubmit,
  formRef,
}) => {
  return (
    <Modal active={active}>
      <CloseModal handleCloseModal={handleCloseForm} />
      <h2 className="form__title">{title}</h2>
      <div className="provider__form__wrapper">
        <form className="provider__form" onSubmit={handleSubmit} ref={formRef}>
          <div className="input__container">
            <label htmlFor="providerNameId">Numele furnizorului:</label>
            <input
              type="text"
              name="providerName"
              id="providerNameId"
              value={formFields.providerName}
              onChange={handleFormChange}
            />
            {nameError && (
              <label style={{ color: "red" }}>Numele e obligatoriu!</label>
            )}
          </div>
          <div className="input__container">
            <label htmlFor="providerAddressId">Adresa furnizorului:</label>
            <input
              type="text"
              name="address"
              id="providerAddressId"
              value={formFields.address}
              onChange={handleFormChange}
            />
          </div>
          <div className="input__container">
            <label htmlFor="providerEmailId">Email-ul furnizorului:</label>
            <input
              type="email"
              name="email"
              id="providerEmailId"
              value={formFields.email}
              onChange={handleFormChange}
            />
          </div>
          <div className="input__container">
            <label htmlFor="providerTelId">Telefonul furnizorului:</label>
            <input
              type="text"
              name="tel"
              id="providerTelId"
              value={formFields.tel}
              onChange={handleFormChange}
            />
          </div>
          <label className="img_label">
            Alegeți imaginea:
            <ImagePicker
              imgName={formFields.imgName}
              onSelectedFile={onSelectedFile}
              handleImgNameChange={handleFormChange}
            />
          </label>
          <button type="submit" className="submit_product_buton">
            Submit
          </button>
          {message && <label style={{ color: "red" }}>{message}</label>}
        </form>

        <img src={image} alt="img" className="product_add_img" />
      </div>
    </Modal>
  );
};

export default ProviderModal;
