import React from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import { adminLinks, operatorLinks, mainLinks } from "../../links";
import { useSelector } from "react-redux";

const Sidebar = () => {
  console.log(adminLinks);
  const authority = useSelector((state) => state.userSlice.userData?.authority);
  return (
    <div className="Sidebar">
      <ul>
        {authority === "ROLE_ADMIN"
          ? adminLinks.map((item) => (
              <li key={item.text}>
                <item.icon className="fa" />
                <Link to={item.link} className="list">
                  {item.text}
                </Link>
              </li>
            ))
          : authority === "ROLE_MAIN"
          ? mainLinks.map((item) => (
              <li key={item.text}>
                <item.icon className="fa" />
                <Link to={item.link} className="list">
                  {item.text}
                </Link>
              </li>
            ))
          : operatorLinks.map((item) => (
              <li key={item.text}>
                <item.icon className="fa" />
                <Link to={item.link} className="list">
                  {item.text}
                </Link>
              </li>
            ))}
      </ul>
    </div>
  );
};

export default Sidebar;
