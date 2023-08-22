import React from "react";
import Modal from "../Modal/Modal";
import CloseModal from "../CloseModal/CloseModal";
import ImagePicker from "../ImagePicker/ImagePicker";
import BasicInput from "../BasicInput/BasicInput";
const OperatorModal = ({
  active,
  title,
  user,
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
            label={`Nick-ul ${user}ului`}
            value={formFields.nickname}
            handleChange={handleFormChange}
            fullBorder={true}
            id="nickname"
          />
          <BasicInput
            inputName="name"
            label={`Numele ${user}ului`}
            value={formFields.name}
            handleChange={handleFormChange}
            fullBorder={true}
            id="name"
          />
          {nameError && (
            <label style={{ color: "red" }}>Numele e obligatoriu!</label>
          )}
          <BasicInput
            inputName="surname"
            label={`Preumele ${user}ului`}
            value={formFields.surname}
            handleChange={handleFormChange}
            fullBorder={true}
            id="surname"
          />

          <BasicInput
            inputName="email"
            label={`Email-ul ${user}ului`}
            value={formFields.email}
            handleChange={handleFormChange}
            fullBorder={true}
            id="email"
          />
          <BasicInput
            inputName="phone"
            type="number"
            label={`Nuărul de telefon al ${user}ului`}
            value={formFields.phone}
            handleChange={handleFormChange}
            fullBorder={true}
            id="phone"
          />
          <BasicInput
            inputName="address"
            label={`Adresa ${user}ului`}
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

export default OperatorModal;
