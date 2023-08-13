import React, { useState, useEffect } from "react";
import "./Customers.css";
import useFetch from "../../hooks/useFetch";
import Table from "../../components/Table/Table";
import CustomersMenu from "../../components/CustomersMenu/CustomersMenu";
import DeleteMessage from "../../components/DeleteMessage/DeleteMessage";
const Customers = () => {
  const { data, loading, error, fetchData } = useFetch(
    "http://localhost:8080/api/customer/readAll"
  );
  const [customers, setCustomers] = useState([]);
  useEffect(() => {
    if (data) {
      setCustomers(() =>
        data.map((customer) => ({
          id: customer.id,
          img: customer.avatar,
          Nickname: customer.nickname,
          Email: customer.email,
          Tel: customer.phone,
          Adresa: customer.address,
        }))
      );
    }
  }, [data]);
  return (
    <div className="Customers">
      {customers && data && (
        <>
          {data && (
            <CustomersMenu
              data={data}
              setCustomers={setCustomers}
              fetchData={fetchData}
            />
          )}
          {customers.length !== 0 ? (
            <Table data={customers} page="customers" coloredCell="Validat" />
          ) : (
            <h2>Nu exista rezultate</h2>
          )}
        </>
      )}
      <DeleteMessage />
    </div>
  );
};

export default Customers;
