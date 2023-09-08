import React, { useEffect, useState } from "react";
import ResponsiveTable from "../ResponsiveTable/ResponsiveTable";
import { useNavigate } from "react-router-dom";
import RadioButton from "../RadioButton/RadioButton";
import Card from "../../components/Card/Card";
import useGetData from "../../hooks/useGetData";
const StatisticsTable = ({ id, url, title, getFields, navTo, width }) => {
  const [products, setProducts] = useState([]);
  const [period, setPeriod] = useState(6);
  const navigate = useNavigate();
  const { data, loading, error, getData } = useGetData(url);
  useEffect(() => {
    getData(`?period=${period}`);
  }, [period]);
  useEffect(() => {
    if (data) {
      console.log("admintable:", data);
      const newProducts = data.map((item) => getFields(item));
      setProducts(newProducts);
    }
  }, [data]);
  const handleDetails = (id) => {
    navigate(`/${navTo}/${id}`);
  };
  const isStatusSelected = (value) => parseInt(period) === parseInt(value);
  const handlePeriodCheck = (e) => {
    setPeriod(e.currentTarget.value);
  };
  return (
    <Card>
      <div
        className="menu__checkboxes"
        style={{ justifyContent: "flex-end", padding: "5px" }}
      >
        <RadioButton
          id={"1month" + id}
          name={"month__radio" + id}
          label="Ultima lună"
          value={1}
          checked={isStatusSelected(1)}
          handleChange={handlePeriodCheck}
        />
        <RadioButton
          id={"3month" + id}
          name={"month__radio" + id}
          label="Ultimele 3 luni"
          value={3}
          checked={isStatusSelected(3)}
          handleChange={handlePeriodCheck}
        />
        <RadioButton
          id={"6month" + id}
          name={"month__radio" + id}
          label="Ultimele 6 luni"
          value={6}
          checked={isStatusSelected(6)}
          handleChange={handlePeriodCheck}
        />
      </div>
      {products.length && (
        <ResponsiveTable
          data={products}
          title={title}
          handleDetails={handleDetails}
        />
      )}
    </Card>
  );
};

export default StatisticsTable;
