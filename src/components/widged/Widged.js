import React from "react";
import "./Widged.css";
import { FaMoneyBill } from "react-icons/fa";
import { Link } from "react-router-dom";
const Widged = ({ data }) => {
  console.log(data);
  return (
    <div className="Widged">
      {/* <div className="widged_top"> */}
      <h2 className="widged__title">{data.title}</h2>
      <div>
        <div className="img_container">
          <img className="img_widged" src={data.img} alt="" />
        </div>
        <div className="details">
          <Link to={data.link}>Detalii</Link>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};

export default Widged;
