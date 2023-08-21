import React from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import { adminLinks, operatorLinks } from "../../links";
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
          : operatorLinks.map((item) => (
              <li key={item.text}>
                <item.icon className="fa" />
                <Link to={item.link} className="list">
                  {item.text}
                </Link>
              </li>
            ))}
        {/* <li>
          <FaRegIdCard className="fa" />
          <Link to="/operators" className="list">
            Operatori
          </Link>
        </li>
        <li>
          <FaUserTie className="fa" />
          <Link to="/customers" className="list">
            Clienți
          </Link>
        </li>
        <li>
          <FaWarehouse className="fa" />
          <Link to="/stocks" className="list">
            Stocuri
          </Link>
        </li>
        <li>
          <FaShippingFast className="fa" />
          <Link to="/providers" className="list">
            Furnizori
          </Link>
        </li>
        <li>
          <FaMoneyBill className="fa" />
          <Link to="/sales" className="list">
            Vânzări
          </Link>
        </li>

        <li>
          <FaBox className="fa" />
          <Link to="/products" className="list">
            Produse
          </Link>
        </li>
        <li>
          <FaOutdent className="fa" />
          <Link to="/orders" className="list">
            Comenzi
          </Link>
        </li>
        <li>
          <FaChartBar className="fa" />
          <Link to="/stats" className="list">
            Statistica
          </Link>
        </li>
        <li>
          <FaPager className="fa" />
          <Link to="/notifications" className="list">
            Notificări
          </Link>
        </li>
        <li>
          <FaFileInvoice className="fa" />
          <Link to="/invoices" className="list">
            Facturi
          </Link>
        </li> */}
      </ul>
    </div>
  );
};

export default Sidebar;
