import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import New from "./pages/New/New";
import Products from "./pages/products/Products";
import SingleProduct from "./pages/SingleProduct/SingleProduct";
import Table from "./components/Table/Table";
import SingleOperator from "./pages/Single/SingleOperator";
import Customers from "./pages/customers/Customers";
import Navbar from "./components/navbar/Navbar";
import Operators from "./pages/operators/Operators";
import Stocks from "./pages/stocks/Stocks";
import Providers from "./pages/providers/Providers";
import SingleProvider from "./pages/SingleProvider/SingleProvider";
import SingleInvoice from "./pages/SingleInvoice/SingleInvoice";
import SingleOrder from "./pages/SingleOrder/SingleOrder";
import SingleCustomer from "./pages/SingleCustomer/SingleCustomer";
import "./App.css";
import Sidebar from "./components/sidebar/Sidebar";
import OperatorsInvoice from "./pages/OperatorsInvoice/OperatorsInvoice";
import { useSelector } from "react-redux";
//test commgit sent
import Invoice from "./pages/Invoice/Invoice";
import Orders from "./pages/orders/Orders";
import NewOrder from "./pages/NewOrder/NewOrder";
import Layout from "./components/Layout/Layout";
import RequireAuth from "./components/Layout/RequireAuth";
import Unauthorized from "./components/Unauthorized/Unauthorized";
function App() {
  const opened = useSelector((state) => state.menuState.opened);
  console.log("opened=", opened);
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<Login />} />
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
            <Route path="newOrder" element={<NewOrder />} />
          </Route>
          <Route path="stocks">
            <Route index element={<Stocks />} />
            <Route path=":stockId" element={<SingleOperator />} />
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

          <Route path="sales">
            <Route path=":saleId" element={<SingleOperator />} />
          </Route>
          <Route path="operatorsinvoice" element={<OperatorsInvoice />}></Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
