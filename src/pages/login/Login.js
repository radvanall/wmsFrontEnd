import React, { useState } from "react";
import "./login.css";
import BasicInput from "../../components/BasicInput/BasicInput";
import BasicButton from "../../components/BasicButton/BasicButton";
import useAuth from "../../hooks/useAuth";
import { resetJwt, resetUserData } from "../../toolkitRedux/userSlice";
import { useSelector, useDispatch } from "react-redux";
const Login = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userSlice.userData);
  const jwt = useSelector((state) => state.userSlice.jwt);
  const { login } = useAuth();
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
    if (fields.username === "") {
      setErrors({ ...errors, username: true });
      return;
    }
    if (fields.password === "") {
      setErrors({ ...errors, password: true });
      return;
    }
    console.log("submit");
    login(fields);
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
  const revelState = () => {
    console.log("revel", userData);
    console.log("revel", jwt);
  };
  const logout = () => {
    dispatch(resetJwt());
    dispatch(resetUserData());
  };
  return (
    <div className="login">
      <button onClick={revelState}>revelState</button>
      <button onClick={logout}>Logout</button>
      <form className="login__form" onSubmit={handleSubmit}>
        <h2>Logare</h2>
        <BasicInput
          label="Introduceți nikname-ul"
          fullBorder={true}
          value={fields.username}
          inputName="username"
          handleChange={handleChange}
        />
        {errors.username && (
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
