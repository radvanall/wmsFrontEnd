import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import { useSelector } from "react-redux";
import Sidebar from "../sidebar/Sidebar";
const Layout = () => {
  const opened = useSelector((state) => state.menuState.opened);
  const jwt = useSelector((state) => state.userSlice.jwt);
  return (
    <div className="App">
      {/* <Navigate to="/home" /> */}
      <div className={opened ? "page_opened" : "page_closed"}></div>
      <div className="_container">
        {jwt !== "" && jwt !== null && <Navbar />}
        <div className="content">
          {jwt !== "" && jwt !== null && (
            <div className={opened ? " sidebar_opened" : "sidebar"}>
              <Sidebar />
            </div>
          )}
          <div className="page">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
