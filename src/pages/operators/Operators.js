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
  const [operators, setOperators] = useState(null);
  const { data, loading, error } = useFetch(
    "http://localhost:8080/api/operator/readOperatorsTable"
  );
  useEffect(() => {
    console.log(data);
    if (data) {
      const newArray = data.map((operator) => {
        return {
          // Validat: invoice.validated ? "validat" : "nevalidat",
          ...operator,
          status: {
            text: operator.status,
            state: operator.status,
          },
        };
      });
      setOperators(newArray);
    }
  }, [data]);
  console.log("data=", data);
  return (
    <div>
      {error && <div>{error}</div>}
      {loading && <div>Loading...</div>}
      {operators &&
        (operators.length !== 0 ? (
          <Table data={operators} page={"operators"} coloredCell="status" />
        ) : (
          <h2>Nu exista rezultate</h2>
        ))}
    </div>
  );
};
export default Operators;
