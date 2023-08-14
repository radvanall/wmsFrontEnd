import React, { useState, useEffect } from "react";
import Card from "../Card/Card";
import useGetData from "../../hooks/useGetData";
import ProgressBar from "../ProgressBar/ProgressBar";
import ResponsiveTable from "../ResponsiveTable/ResponsiveTable";

const FavoriteProducts = ({ id }) => {
  const [products, setProducts] = useState([]);
  const { data, loading, error, getData } = useGetData(
    "http://localhost:8080/api/customer/getFavoriteProducts/"
  );
  useEffect(() => {
    getData(id);
  }, [id]);

  useEffect(() => {
    if (data) {
      const maxPrice = data[0]?.moneySpend ?? 0;
      const newArray = data.map((product, index) => {
        return {
          id: product.id,
          Produs: product.name,
          image: product.image,
          ["Total cheltuieli:"]: (
            <ProgressBar
              value={product.moneySpend ?? 0}
              max={maxPrice}
              key={index}
              additionalLabel="lei"
            />
          ),
        };
      });
      setProducts(newArray);
    }
  }, [data]);
  return (
    <Card>
      {products.length && (
        <ResponsiveTable data={products} title="Cele mai cupărate produse" />
      )}
    </Card>
  );
};

export default FavoriteProducts;
