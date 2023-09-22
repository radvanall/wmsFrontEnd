import React, { useState } from "react";
import Modal from "../Modal/Modal";
import CloseModal from "../CloseModal/CloseModal";
import BasicInput from "../BasicInput/BasicInput";
import usePostData from "../../hooks/usePostData";
import BasicButton from "../BasicButton/BasicButton";
const CreateCategory = ({ active, close, label, endpoint }) => {
  const [input, setInput] = useState("");
  const { message, loading, error, resetMessage, postData } = usePostData();
  const save = () => {
    const data = new FormData();
    data.append("category", input);
    postData(data, endpoint);
  };
  const closeModal = () => {
    resetMessage();
    setInput("");
    close();
  };
  return (
    <Modal active={active}>
      <CloseModal handleCloseModal={closeModal} />
      <BasicInput
        label={label}
        fullBorder={true}
        value={input}
        handleChange={(e) => setInput(e.target.value)}
      />
      <BasicButton text="Salvează" handleClick={save} />
      <br />
      {message && <label style={{ color: "red" }}>{message}</label>}
      <br />
      {error && <label style={{ color: "red" }}>{error}</label>}
    </Modal>
  );
};

export default CreateCategory;
