import React from "react";
import "./Products.css";
import ProductsMenu from "../../components/productsMenu/ProductsMenu";
import Table from "../../components/Table/Table";
import { useDispatch, useSelector } from "react-redux";
import { setData, setDisplaiedData } from "../../toolkitRedux/productsSlice";
import { useState, useEffect } from "react";
import { fetchProducts } from "../../toolkitRedux/productsSlice";
import productsData from "../../productsData";
import useFetch from "../../hooks/useFetch";
const Products = () => {
  const jwt = useSelector((state) => state.userSlice.jwt);
  // const [products, setProducts] = useState(productsData);
  // const changeProducts = (newProducts) => {
  //   setProducts([...newProducts]);
  // };
  // const { data, loading, error } = useFetch(
  //   "http://localhost:8080/api/position/readtablepositions"
  // );
  const dispatch = useDispatch();

  const data = useSelector((state) => state.productsSlice.data);
  useEffect(() => {
    dispatch(fetchProducts(jwt));
  }, [dispatch]);
  const products = useSelector((state) => state.productsSlice.displaiedData);
  //console.log("data=", data);

  // const data = useSelector((state) => state.productsSlice.displaiedData);

  // const [products, setProducts] = useState(productsData);
  // console.log("products:", products);

  // const info = useSelector((state) => state.productsSlice.data);
  // useEffect(() => {
  //   return () => {
  //     dispatch(setDisplaiedData(info));
  //   };
  // }, []);

  // useEffect(() => {
  //   dispatch(setData(data));
  //   dispatch(setDisplaiedData(data));
  // }, [data]);

  // const storeProducts = useSelector(
  //   (state) => state.productsSlice.displaiedData
  // );
  // console.log("storeProducts=", storeProducts);
  // const [products, setProducts] = useState(storeProducts);

  // useEffect(() => {
  //   setProducts(storeProducts);
  // }, [storeProducts]);
  // console.log("products=", products);

  return (
    <div className="Products">
      {/* <SearchMenu info={products} changeProducts={changeProducts} />
      {products.length === 0 ? (
        <h2>Nu exista rezultate</h2>
      ) : (
        <Table info={products} key={products} />
      )} */}
      {/* <div>{data.length}</div> */}
      {/* {error && <div>{error}</div>}
      {loading && <div>Loading...</div>} */}
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
