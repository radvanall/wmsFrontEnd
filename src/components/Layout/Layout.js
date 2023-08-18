import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import { useSelector } from "react-redux";
import Sidebar from "../sidebar/Sidebar";
const Layout = () => {
  const opened = useSelector((state) => state.menuState.opened);
  return (
    <div className="App">
      <div className={opened ? "page_opened" : "page_closed"}></div>
      <div className="_container">
        <Navbar />
        <div className="content">
          <div className={opened ? " sidebar_opened" : "sidebar"}>
            <Sidebar />
          </div>
          <div className="page">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
