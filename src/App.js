import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Products from "./pages/products/Products";
import SingleProduct from "./pages/SingleProduct/SingleProduct";
import SingleOperator from "./pages/Single/SingleOperator";
import Customers from "./pages/customers/Customers";
import Operators from "./pages/operators/Operators";
import Stocks from "./pages/stocks/Stocks";
import Providers from "./pages/providers/Providers";
import SingleProvider from "./pages/SingleProvider/SingleProvider";
import SingleInvoice from "./pages/SingleInvoice/SingleInvoice";
import SingleOrder from "./pages/SingleOrder/SingleOrder";
import SingleCustomer from "./pages/SingleCustomer/SingleCustomer";
import "./App.css";
import OperatorsInvoice from "./pages/OperatorsInvoice/OperatorsInvoice";
import { useSelector, useDispatch } from "react-redux";
import { setJwt, setUserData } from "./toolkitRedux/userSlice";
import Invoice from "./pages/Invoice/Invoice";
import Orders from "./pages/orders/Orders";
import NewOrder from "./pages/NewOrder/NewOrder";
import Layout from "./components/Layout/Layout";
import RequireAuth from "./components/Layout/RequireAuth";
import Unauthorized from "./components/Unauthorized/Unauthorized";
import Administrators from "./pages/Administrators/Administrators";
import SingleAdmin from "./pages/SingleAdmin/SingleAdmin";
import Statistics from "./pages/Statistics/Statistics";
function App() {
  const dispatch = useDispatch();
  const jwt = window.localStorage.getItem("jwt");
  if (jwt === null) {
    console.log("Key 'jwt' does not exist in localStorage.");
  } else {
    dispatch(setJwt(window.localStorage.getItem("jwt")));
    dispatch(setUserData(JSON.parse(window.localStorage.getItem("userData"))));
  }
  const opened = useSelector((state) => state.menuState.opened);
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="unauthorized" element={<Unauthorized />} />
        <Route
          element={
            <RequireAuth
              allowedRoles={["ROLE_ADMIN", "ROLE_MAIN", "ROLE_OPERATOR"]}
            />
          }
        >
          <Route index element={<Home />} />
          <Route path="products">
            <Route index element={<Products />} />
            <Route path=":productId" element={<SingleProduct />} />
          </Route>
          <Route path="providers">
            <Route index element={<Providers />} />
            <Route path=":providerId" element={<SingleProvider />} />
          </Route>
          <Route path="customers">
            <Route index element={<Customers />} />
            <Route path=":customerId" element={<SingleCustomer />} />
          </Route>
          <Route path="orders">
            <Route index element={<Orders />} />
            <Route path=":orderId" element={<SingleOrder />} />
            <Route element={<RequireAuth allowedRoles={["ROLE_OPERATOR"]} />}>
              <Route path="newOrder" element={<NewOrder />} />
            </Route>
          </Route>
          <Route path="stocks">
            <Route index element={<Stocks />} />
            <Route path=":stockId" element={<SingleOperator />} />
          </Route>
          <Route path="sales">
            <Route path=":saleId" element={<SingleOperator />} />
          </Route>
        </Route>
        <Route
          element={<RequireAuth allowedRoles={["ROLE_ADMIN", "ROLE_MAIN"]} />}
        >
          <Route path="operators">
            <Route index element={<Operators />} />
            <Route path=":operatorId" element={<SingleOperator />} />
          </Route>
          <Route path="invoices">
            <Route index element={<Invoice />} />
            <Route path=":invoiceId" element={<SingleInvoice />} />
          </Route>

          <Route path="operatorsinvoice" element={<OperatorsInvoice />}></Route>
          <Route path="stats" element={<Statistics />}></Route>
        </Route>
        <Route
          element={<RequireAuth allowedRoles={["ROLE_ADMIN", "ROLE_MAIN"]} />}
        >
          <Route path="administrators">
            <Route index element={<Administrators />} />
            <Route path=":administratorId" element={<SingleAdmin />} />
          </Route>
        </Route>
        <Route path="login" element={<Login />} />
      </Route>
    </Routes>
  );
}

export default App;
