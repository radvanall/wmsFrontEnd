import React from "react";
import { useState, useEffect } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import { Divide as Hamburger } from "hamburger-react";
import { toggle as changeState } from "../../toolkitRedux/menuSlice";
import { resetJwt, resetUserData } from "../../toolkitRedux/userSlice";
import { useSelector, useDispatch } from "react-redux";
const Navbar = () => {
  const dispatch = useDispatch();
  const [isOpen, setOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const setWindowDimension = () => {
    setWindowWidth(window.innerWidth);
  };
  function setHamburger() {
    dispatch(changeState(!isOpen));
    setOpen((isOpen) => !isOpen);
  }
  useEffect(() => {
    window.addEventListener("resize", setWindowDimension);

    return () => {
      window.removeEventListener("resize", setWindowDimension);
    };
  }, []);
  useEffect(() => {
    if (windowWidth > 990 && isOpen) {
      setHamburger();
    }
  }, [windowWidth]);
  const logout = () => {
    dispatch(resetJwt());
    dispatch(resetUserData());
  };
  return (
    <div className="Navbar">
      <div className="hamburger">
        <Hamburger toggled={isOpen} toggle={() => setHamburger()}></Hamburger>
      </div>
      <div className="logo">Dashboard</div>
      <div className="login__container">
        <div className="avatar">
          <FaRegUser className="avatar_img"></FaRegUser>
        </div>
        <Link to="/login" className="logo" onClick={logout}>
          Logout
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
