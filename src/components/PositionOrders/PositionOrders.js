import React, { useEffect, useState } from "react";
import getFormatedDate from "../../functions/getFormatedDate";
import ResponsiveTable from "../ResponsiveTable/ResponsiveTable";
import Card from "../Card/Card";
import useGetData from "../../hooks/useGetData";
import { useNavigate } from "react-router-dom";
const PositionOrders = ({ id }) => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const { data, loading, error, getData } = useGetData(
    "http://localhost:8080/api/position/getOrders/"
  );
  useEffect(() => {
    getData(id);
    console.log(data);
  }, []);
  useEffect(() => {
    if (data) {
      const invoicesArray = data.map((order) => ({
        id: order.id,
        Data: getFormatedDate(order.date, "RO-ro"),
        ["Preț/buc.  lei"]: order.price,
        Cantitate: order.quantity,
        ["Preț total"]: order.price * order.quantity,
      }));
      setOrders(invoicesArray);
    }
  }, [data]);
  const handleDetails = (id) => {
    navigate(`/orders/${id}`);
  };

  return (
    <Card>
      {data && orders.length ? (
        <ResponsiveTable
          data={orders}
          title="Vânzări"
          handleDetails={handleDetails}
        />
      ) : (
        <h2 className="missing__result">Nu există rezultate</h2>
      )}
    </Card>
  );
};
export default PositionOrders;
