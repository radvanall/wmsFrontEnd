import React from "react";
import { useState, useEffect } from "react";
import "./Operators.css";
import Table from "../../components/Table/Table";
import useFetch from "../../hooks/useFetch";
import OperatorMenu from "../../components/OperatorMenu/OperatorMenu";
import DeleteMessage from "../../components/DeleteMessage/DeleteMessage";
const Operators = () => {
  const [operators, setOperators] = useState(null);
  const { data, loading, error, fetchData } = useFetch(
    "http://localhost:8080/api/operator/readOperatorsTable"
  );
  useEffect(() => {
    if (data) {
      const newArray = data.map((operator) => {
        return {
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
  return (
    <div>
      {error && <div>{error}</div>}
      {loading && <div>Loading...</div>}
      {operators && data && (
        <>
          {data && (
            <OperatorMenu
              data={data}
              setOperators={setOperators}
              fetchData={fetchData}
              url="http://localhost:8080/api/operator/create"
              user="operator"
            />
          )}
          {operators.length !== 0 ? (
            <Table data={operators} page={"operators"} coloredCell="Status" />
          ) : (
            <h2>Nu exista rezultate</h2>
          )}
        </>
      )}
      <DeleteMessage />
    </div>
  );
};
export default Operators;
