import React from "react";
import "./Products.css";
import ProductsMenu from "../../components/productsMenu/ProductsMenu";
import Table from "../../components/Table/Table";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchProducts } from "../../toolkitRedux/productsSlice";
const Products = () => {
  const jwt = useSelector((state) => state.userSlice.jwt);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.productsSlice.data);
  useEffect(() => {
    dispatch(fetchProducts(jwt));
  }, [dispatch]);
  const products = useSelector((state) => state.productsSlice.displaiedData);
  return (
    <div className="Products">
      {data.error && <div>{data.error}</div>}
      {data.loading && <div>Loading...</div>}
      {products && (
        <div>
          <ProductsMenu />
          {products.length !== 0 ? (
            <Table data={products} page={"products"} />
          ) : (
            <h2>Nu exista rezultate</h2>
          )}
        </div>
      )}
    </div>
  );
};

export default Products;
