import React from "react";
import Modal from "../Modal/Modal";
import CloseModal from "../CloseModal/CloseModal";
import ImagePicker from "../ImagePicker/ImagePicker";
import BasicInput from "../BasicInput/BasicInput";
import "./CustomerModal.css";
const CustomerModal = ({
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
        <form className="customer__form" onSubmit={handleSubmit} ref={formRef}>
          <BasicInput
            inputName="nickname"
            label="Numele clientului"
            value={formFields.nickname}
            handleChange={handleFormChange}
            fullBorder={true}
            id="nickname"
          />
          {nameError && (
            <label style={{ color: "red" }}>Numele e obligatoriu!</label>
          )}
          <BasicInput
            inputName="email"
            label="Email-ul clientului"
            value={formFields.email}
            handleChange={handleFormChange}
            fullBorder={true}
            type="email"
            id="email"
          />
          <BasicInput
            inputName="phone"
            type="number"
            label="Numărul the telefon al clientului"
            value={formFields.phone}
            handleChange={handleFormChange}
            fullBorder={true}
            id="phone"
          />
          <BasicInput
            inputName="address"
            label="Adresa clientului"
            value={formFields.address}
            handleChange={handleFormChange}
            fullBorder={true}
            id="address"
          />
          <label className="img_label">
            Alegeți imaginea:
            <ImagePicker
              imgName={formFields.imgName}
              onSelectedFile={onSelectedFile}
              handleImgNameChange={handleFormChange}
            />
          </label>
          <button
            type="submit"
            className="submit_product_buton customer__button"
          >
            Submit
          </button>
          {message && <label style={{ color: "red" }}>{message}</label>}
        </form>

        <img src={image} alt="img" className="product_add_img" />
      </div>
    </Modal>
  );
};

export default CustomerModal;
