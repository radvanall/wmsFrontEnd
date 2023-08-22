import React from "react";
import "./home.css";
import AdminHomePage from "../../components/AdminHomePage/AdminHomePage";
import OperatorHomePage from "../OperatorHomePage/OperatorHomePage";
import { useSelector } from "react-redux";

const Home = () => {
  const role = useSelector((state) => state.userSlice.userData.authority);
  return (
    <div className="home">
      {role === "ROLE_ADMIN" || role === "ROLE_MAIN" ? (
        <AdminHomePage />
      ) : (
        <OperatorHomePage />
      )}
    </div>
  );
};

export default Home;
