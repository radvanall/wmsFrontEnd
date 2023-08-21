import React from "react";
import "./home.css";
import AdminHomePage from "../../components/AdminHomePage/AdminHomePage";

const Home = () => {
  return (
    <div className="home">
      <AdminHomePage />
      {/* {widged.map((item) => {
        return <Widged data={item} key={item.id} />;
      })} */}
    </div>
  );
};

export default Home;
