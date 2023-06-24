import React from "react";
import { useState, useEffect } from "react";
import "./Operators.css";
import Table from "../../components/Table/Table";
import useFetch from "../../hooks/useFetch";
//import data from "../../data";
const Operators = () => {
  // const [data, setData] = useState([]);
  // useEffect(() => {
  //   fetch("http://localhost:8080/api/operator/readOperatorsTable")
  //     .then((response) => response.json())
  //     .then((data) => setData(data));
  // }, []);
  // console.log("data=", data);
  const { data, loading, error } = useFetch(
    "http://localhost:8080/api/operator/readOperatorsTable"
  );
  console.log("data=", data);
  return (
    <div>
      {error && <div>{error}</div>}
      {loading && <div>Loading...</div>}
      {data && <Table data={data} page={"operators"} />}
    </div>
  );
};
export default Operators;
