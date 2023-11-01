import React from "react";
import Modal from "../Modal/Modal";
import CloseModal from "../CloseModal/CloseModal";
import ImagePicker from "../ImagePicker/ImagePicker";
import BasicInput from "../BasicInput/BasicInput";

const AdministratorModal = ({
  active,
  title,
  image,
  onSelectedFile,
  formFields,
  error,
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
            label="Introduceți nickname-ul"
            value={formFields.nickname}
            handleChange={handleFormChange}
            fullBorder={true}
            id="nickname"
          />
          <BasicInput
            inputName="name"
            label="Introduceți numele"
            value={formFields.name}
            handleChange={handleFormChange}
            fullBorder={true}
            id="name"
          />
          {error.name && (
            <label style={{ color: "red" }}>Numele e obligatoriu!</label>
          )}
          <BasicInput
            inputName="surname"
            label="Introduceți prenumele"
            value={formFields.surname}
            handleChange={handleFormChange}
            fullBorder={true}
            id="surname"
          />

          <BasicInput
            inputName="email"
            label="Introduceți email-ul"
            value={formFields.email}
            handleChange={handleFormChange}
            fullBorder={true}
            id="email"
          />
          <BasicInput
            inputName="phone"
            type="number"
            label="Introduceți numărul de telefon"
            value={formFields.phone}
            handleChange={handleFormChange}
            fullBorder={true}
            id="phone"
          />
          <BasicInput
            inputName="address"
            label="Introduceți adresa"
            value={formFields.address}
            handleChange={handleFormChange}
            fullBorder={true}
            id="address"
          />
          <BasicInput
            inputName="password"
            label="Introduceți parola"
            value={formFields.password}
            handleChange={handleFormChange}
            fullBorder={true}
            id="password"
            type="password"
          />
          {/* <BasicInput
            inputName="repeatPassword"
            label="Repetați parola"
            value={formFields.repeatPassword}
            handleChange={handleFormChange}
            fullBorder={true}
            id="repeatPassword"
            type="password"
          />
          {error.password && (
            <label style={{ color: "red" }}>
              Parolele trebuie să coincidă!
            </label>
          )} */}

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
          {error.name && (
            <label style={{ color: "red" }}>Introduce-ți nickname-ul</label>
          )}
          {error.password && (
            <label style={{ color: "red" }}>Introduce-ți parola</label>
          )}
        </form>

        <img src={image} alt="img" className="product_add_img" />
      </div>
    </Modal>
  );
};

export default AdministratorModal;
