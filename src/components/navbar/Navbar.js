import React from "react";
import { useState, useEffect } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { Divide as Hamburger } from "hamburger-react";
import { toggle as changeState } from "../../toolkitRedux/menuSlice";
import { resetJwt, resetUserData } from "../../toolkitRedux/userSlice";
import { useSelector, useDispatch } from "react-redux";
import imgLink from "../../googleAPI";
const Navbar = () => {
  const dispatch = useDispatch();
  const avatar = useSelector((state) => state.userSlice.userData?.avatar);
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
    dispatch(changeState(false));
  };
  return (
    <div className="Navbar">
      <div className="hamburger">
        <Hamburger toggled={isOpen} toggle={() => setHamburger()}></Hamburger>
      </div>
      <div className="logo__img">
        <MdDashboard />
      </div>
      <div className="login__container">
        <Link to="/login" className="logo" onClick={logout}>
          Ieșire
        </Link>
        <div className="avatar">
          <img src={imgLink + avatar} alt="" />
          {/* <FaRegUser className="avatar_img"></FaRegUser> */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
