import React from "react";
import "./SingleProduct.css";
import { useParams } from "react-router-dom";
import ItemTable from "../../components/ItemTable/ItemTable";
import stocks from "../../stock";
import productBalance from "../../productBalance";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchProducts } from "../../toolkitRedux/productsSlice";
import ProductWidged from "../../components/ProductWidged/ProductWidged";
import BalanceTable from "../../components/BalanceTable/BalanceTable";
import SaleChart from "../../components/SaleChart/SaleChart";
import RangeDatePiker from "../../components/RangeDatePicker/RangeDatePicker";
import StockTable from "../../components/StockTable/StockTable";

import SingleProductMenu from "../../components/SingleProductMenu/SingleProductMenu";

const SingleProduct = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();

  const data = useSelector((state) => state.productsSlice);
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const product = useSelector((state) =>
    state.productsSlice.displaiedData.find(
      (item) => item.id === Number(productId)
    )
  );

  console.log(product);

  return (
    <div>
      {data.error && <div>{data.error}</div>}
      {data.loading && <div>Loading...</div>}
      {product && (
        <div className="Single">
          <SingleProductMenu id={productId} />
          <ProductWidged product={product} />
          <StockTable productId={productId} />
          <SaleChart />
          <BalanceTable />
        </div>
      )}
    </div>
  );
};

export default SingleProduct;
