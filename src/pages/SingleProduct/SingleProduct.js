import React from "react";
import "./SingleProduct.css";
import { useParams } from "react-router-dom";
import ProviderBalanceChart from "../../components/ProviderBalanceChart/ProviderBalanceChart";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchProducts } from "../../toolkitRedux/productsSlice";
import ProductWidged from "../../components/ProductWidged/ProductWidged";
import StockTable from "../../components/StockTable/StockTable";
import PositionOrders from "../../components/PositionOrders/PositionOrders";
import SingleProductMenu from "../../components/SingleProductMenu/SingleProductMenu";
const SingleProduct = () => {
  const role = useSelector((state) => state.userSlice.userData?.authority);
  const isAllowed = role === "ROLE_ADMIN" || role === "ROLE_MAIN";
  const dispatch = useDispatch();
  const { productId } = useParams();
  const jwt = useSelector((state) => state.userSlice.jwt);

  const data = useSelector((state) => state.productsSlice);
  useEffect(() => {
    dispatch(fetchProducts(jwt));
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
          {isAllowed && <SingleProductMenu id={productId} />}
          <ProductWidged product={product} />
          <StockTable productId={productId} />
          <div className="product__chart">
            <ProviderBalanceChart
              endpoint={`position/getBalance?id=${productId}`}
            />
          </div>
          <div className="product__chart">
            <PositionOrders id={productId} />
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleProduct;
