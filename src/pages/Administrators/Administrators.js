import React from "react";
import { useState, useEffect } from "react";
// import "./Operators.css";
import Table from "../../components/Table/Table";
import useFetch from "../../hooks/useFetch";
import OperatorMenu from "../../components/OperatorMenu/OperatorMenu";
import DeleteMessage from "../../components/DeleteMessage/DeleteMessage";
const Administrators = () => {
  // const [data, setData] = useState([]);
  // useEffect(() => {
  //   fetch("http://localhost:8080/api/operator/readOperatorsTable")
  //     .then((response) => response.json())
  //     .then((data) => setData(data));
  // }, []);
  // console.log("data=", data);
  const [admins, setAdmins] = useState(null);
  const { data, loading, error, fetchData } = useFetch(
    "http://localhost:8080/api/administrator/readAll"
  );
  useEffect(() => {
    console.log(data);
    if (data) {
      const newArray = data.map((admin) => {
        return {
          // Validat: invoice.validated ? "validat" : "nevalidat",
          // ...admin,
          id: admin.id,
          img: admin.img,
          Nickname: admin.nickname,
          Nume: admin.name,
          Prenume: admin.surname,
          Email: admin.email,
          Tel: admin.tel,
          Status: {
            text: admin.status,
            state: admin.status,
          },
        };
      });
      setAdmins(newArray);
    }
  }, [data]);
  console.log("data=", data);
  return (
    <div>
      {error && <div>{error}</div>}
      {loading && <div>Loading...</div>}
      {admins && data && (
        <>
          {data && (
            <OperatorMenu
              data={data}
              setOperators={setAdmins}
              fetchData={fetchData}
              url="http://localhost:8080/api/administrator/create"
              user="administrator"
            />
          )}
          {admins.length !== 0 ? (
            <Table data={admins} page={"administrators"} coloredCell="Status" />
          ) : (
            <h2>Nu exista rezultate</h2>
          )}
        </>
      )}
      <DeleteMessage />
    </div>
  );
};
export default Administrators;
