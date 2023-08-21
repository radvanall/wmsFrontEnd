import React, { useEffect, useState } from "react";
import ResponsiveTable from "../ResponsiveTable/ResponsiveTable";
import { useNavigate } from "react-router-dom";
import useGetData from "../../hooks/useGetData";
const AdminPageTable = ({ getId, url, title, getFields, navTo }) => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const { data, loading, error, getData } = useGetData(url);
  useEffect(() => {
    getData(getId);
  }, []);
  useEffect(() => {
    if (data) {
      const newProducts = data.map((item) => getFields(item));
      setProducts(newProducts);
    }
  }, [data]);
  const handleDetails = (id) => {
    navigate(`/${navTo}/${id}`);
  };
  return (
    <div className="operator__invoice__wrapper">
      {products.length && (
        <ResponsiveTable
          data={products}
          title={title}
          handleDetails={handleDetails}
        />
      )}
    </div>
  );
};

export default AdminPageTable;
