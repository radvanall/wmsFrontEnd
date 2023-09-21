import React, { useState, useRef } from "react";
import Modal from "../Modal/Modal";
import CloseModal from "../CloseModal/CloseModal";
import BasicInput from "../BasicInput/BasicInput";
import BasicButton from "../BasicButton/BasicButton";
import usePostData from "../../hooks/usePostData";
import "./ChangePasswordModal.css";

const ChangePasswordModal = ({
  active,
  handleCloseForm,
  id,
  endpoint,
  fetchData,
}) => {
  const formRef = useRef();
  const {
    message,
    loading,
    error: postError,
    resetMessage,
    postData,
  } = usePostData();
  const [errors, setErrors] = useState({
    oldPassword: false,
    newPassword: false,
    repeatNewPassword: false,
    areNotTheSame: false,
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e.target);
    const passwordFields = new FormData(e.target);
    const data = Object.fromEntries(passwordFields.entries());
    let hasErrors = false;
    for (const [name, value] of passwordFields.entries()) {
      if (value.length < 5) {
        setErrors((prev) => ({ ...prev, [name]: true }));
        hasErrors = true;
      } else setErrors((prev) => ({ ...prev, [name]: false }));
    }
    if (data.newPassword !== data.repeatNewPassword) {
      hasErrors = true;
      setErrors((prev) => ({ ...prev, areNotTheSame: true }));
    } else setErrors((prev) => ({ ...prev, areNotTheSame: false }));
    console.log(data);
    if (hasErrors) return;
    await postData(passwordFields, endpoint + id);
    fetchData();
  };
  const resetForm = () => {
    setErrors({
      oldPassword: false,
      newPassword: false,
      repeatNewPassword: false,
      areNotTheSame: false,
    });
    resetMessage();
    handleCloseForm();
    formRef.current.reset();
  };
  return (
    <Modal active={active}>
      <CloseModal handleCloseModal={resetForm} />
      <h2 className="form__title">Modificați parola contului</h2>

      <form className="customer__form" onSubmit={handleSubmit} ref={formRef}>
        <BasicInput
          inputName="oldPassword"
          label="Introduceți parola curentă"
          type="password"
          fullBorder={true}
          eyeIcon={true}
          id="oldPassword"
        />
        {errors.oldPassword && (
          <label style={{ color: "red" }}>
            Parola trebuie să conțină cel puțin 5 caractere!
          </label>
        )}
        <BasicInput
          inputName="newPassword"
          label="Introduceți parola nouă"
          type="password"
          fullBorder={true}
          eyeIcon={true}
          id="newPassword"
        />
        {errors.newPassword && (
          <label style={{ color: "red" }}>
            Parola trebuie să conțină cel puțin 5 caractere!
          </label>
        )}
        <BasicInput
          inputName="repeatNewPassword"
          label="Repetați parola nouă"
          type="password"
          fullBorder={true}
          eyeIcon={true}
          id="repeatNewPassword"
        />
        {errors.repeatNewPassword && (
          <label style={{ color: "red" }}>
            Parola trebuie să conțină cel puțin 5 caractere!
          </label>
        )}
        {errors.areNotTheSame && (
          <label style={{ color: "red", marginTop: "5px" }}>
            Parolele nu coincid.
          </label>
        )}
        <div className="change__password__button__wrapper">
          <BasicButton type="submit" text="Modificați" />
        </div>

        {message && (
          <label style={{ color: "red", marginTop: "5px" }}>{message}</label>
        )}
      </form>
    </Modal>
  );
};

export default ChangePasswordModal;
