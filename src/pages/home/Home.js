import React from "react";
import "./home.css";
import Widged from "../../components/widged/Widged";
import widged from "../../widged.json";

const Home = () => {
  return (
    <div className="home">
      {widged.map((item) => {
        return <Widged data={item} key={item.id} />;
      })}
    </div>
  );
};

export default Home;
