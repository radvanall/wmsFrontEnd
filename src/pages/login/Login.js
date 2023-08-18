import React, { useState } from "react";
import "./login.css";
import BasicInput from "../../components/BasicInput/BasicInput";
import BasicButton from "../../components/BasicButton/BasicButton";
const Login = () => {
  const [errors, setErrors] = useState({
    nickname: false,
    password: false,
  });
  const [fields, setFields] = useState({
    nickname: "",
    password: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (fields.nickname === "") {
      setErrors({ ...errors, nickname: true });
      return;
    }
    if (fields.password === "") {
      setErrors({ ...errors, password: true });
      return;
    }
    console.log("submit");
  };
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (value !== "") setErrors({ ...errors, [name]: false });
    console.log(name, value);
    setFields({
      ...fields,
      [name]: value,
    });
  };
  return (
    <div className="login">
      <form className="login__form" onSubmit={handleSubmit}>
        <h2>Logare</h2>
        <BasicInput
          label="Introduceți nikname-ul"
          fullBorder={true}
          value={fields.nickname}
          inputName="nickname"
          handleChange={handleChange}
        />
        {errors.nickname && (
          <p style={{ color: "red" }}>Nickname-ul e obligatoriu</p>
        )}
        <BasicInput
          label="Introduceți parola"
          fullBorder={true}
          value={fields.password}
          inputName="password"
          type="password"
          handleChange={handleChange}
        />
        {errors.password && (
          <p style={{ color: "red" }}>Parola e obligatorie</p>
        )}
        <div className="submit__button">
          <BasicButton type="submit" text="Logare" />
        </div>
      </form>
    </div>
  );
};

export default Login;
