import React, { useState } from "react";
import "./login.css";
import BasicInput from "../../components/BasicInput/BasicInput";
import BasicButton from "../../components/BasicButton/BasicButton";
import useAuth from "../../hooks/useAuth";
import { useSelector, useDispatch } from "react-redux";
import SessionExpiredMessage from "../../components/SessionExpiredMessage/SessionExpiredMessage";
const Login = () => {
  const { login, error } = useAuth();
  const [errors, setErrors] = useState({
    username: false,
    password: false,
  });
  const [fields, setFields] = useState({
    username: "",
    password: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (fields.username.trim().length < 5) {
      setErrors({ ...errors, username: true });
      return;
    }
    if (fields.password.trim().length < 5) {
      setErrors({ ...errors, password: true });
      return;
    }
    login(fields);
  };
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (value.trim().length > 4) setErrors({ ...errors, [name]: false });
    setFields({
      ...fields,
      [name]: value,
    });
  };
  return (
    <div className="login">
      <form className="login__form" onSubmit={handleSubmit}>
        <h2>Autentificare</h2>
        <BasicInput
          label="Introduceți nikname-ul"
          fullBorder={true}
          value={fields.username}
          inputName="username"
          handleChange={handleChange}
        />
        {errors.username && (
          <p style={{ color: "red" }}>
            Nickname-ul trebuie să aibă o lungime de cel puțin 5 caractere
          </p>
        )}
        <BasicInput
          label="Introduceți parola"
          fullBorder={true}
          value={fields.password}
          inputName="password"
          type="password"
          eyeIcon={true}
          handleChange={handleChange}
        />
        {errors.password && (
          <p style={{ color: "red" }}>
            Parola trebuie să aibă o lungime de cel puțin 5 caractere
          </p>
        )}
        <div className="submit__button">
          <BasicButton type="submit" text="Logare" />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
      <SessionExpiredMessage />
    </div>
  );
};

export default Login;
