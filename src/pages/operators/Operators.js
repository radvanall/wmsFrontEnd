import React from "react";
import { useState, useEffect } from "react";
import "./Operators.css";
import Table from "../../components/Table/Table";
import useFetch from "../../hooks/useFetch";
import OperatorMenu from "../../components/OperatorMenu/OperatorMenu";
import DeleteMessage from "../../components/DeleteMessage/DeleteMessage";
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
  const { data, loading, error, fetchData } = useFetch(
    "http://localhost:8080/api/operator/readOperatorsTable"
  );
  useEffect(() => {
    console.log(data);
    if (data) {
      const newArray = data.map((operator) => {
        return {
          // Validat: invoice.validated ? "validat" : "nevalidat",
          // ...operator,
          id: operator.id,
          img: operator.img,
          Nickname: operator.nickname,
          Nume: operator.name,
          Prenume: operator.surname,
          Email: operator.email,
          Tel: operator.tel,
          Status: {
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
          <>
            {data && (
              <OperatorMenu
                data={data}
                setOperators={setOperators}
                fetchData={fetchData}
              />
            )}

            <Table data={operators} page={"operators"} coloredCell="Status" />
          </>
        ) : (
          <h2>Nu exista rezultate</h2>
        ))}
      <DeleteMessage />
    </div>
  );
};
export default Operators;
