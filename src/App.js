import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import New from "./pages/New/New";
import Products from "./pages/products/Products";
import SingleProduct from "./pages/SingleProduct/SingleProduct";
import Table from "./components/Table/Table";
import SingleOperator from "./pages/Single/SingleOperator";
import Navbar from "./components/navbar/Navbar";
import Operators from "./pages/operators/Operators";
import Stocks from "./pages/stocks/Stocks";
import "./App.css";
import Sidebar from "./components/sidebar/Sidebar";
import OperatorsInvoice from "./pages/OperatorsInvoice/OperatorsInvoice";
import { useSelector } from "react-redux";
import Invoice from "./pages/Invoice/Invoice";
function App() {
  const opened = useSelector((state) => state.menuState.opened);
  console.log("opened=", opened);
  return (
    <div className="App">
      <div className={opened ? "page_opened" : "page_closed"}></div>
      <div className="_container">
        {/* <div className="page__container"> */}

        <BrowserRouter>
          {" "}
          <Navbar />
          <div className="content">
            <div className={opened ? " sidebar_opened" : "sidebar"}>
              <Sidebar />
            </div>
            <div className="page">
              <Routes>
                <Route path="/">
                  <Route index element={<Home />} />
                  <Route path="login" element={<Login />} />
                  <Route path="operators">
                    {/* <Route index element={<Table />} /> */}
                    <Route index element={<Operators />} />
                    <Route path=":operatorId" element={<SingleOperator />} />
                    {/* <Route
                path="new"
                element={
                  <New inputs={operatorInputs} title="Add New Operator" />
                }
              /> */}
                  </Route>
                  <Route path="invoice">
                    <Route index element={<Invoice />} />
                    <Route path="invoiceId" element={<Login />} />
                  </Route>
                  <Route path="products">
                    <Route index element={<Products />} />
                    <Route path=":productId" element={<SingleProduct />} />
                    {/* <Route
                path="new"
                element={<New inputs={productInputs} title="Add New Product" />}
              /> */}
                  </Route>
                  <Route path="customers">
                    {/* <Route index element={<Table />} /> */}
                    <Route path=":customerId" element={<SingleOperator />} />
                    {/* <Route
                path="new"
                element={<New inputs={productInputs} title="Add New Product" />}
              /> */}
                  </Route>
                  <Route path="orders">
                    {/* <Route index element={<Table />} /> */}
                    <Route path=":orderId" element={<SingleOperator />} />
                    {/* <Route
                path="new"
                element={<New inputs={productInputs} title="Add New Product" />}
              /> */}
                  </Route>
                  <Route path="stocks">
                    {/* <Route index element={<Table />} /> */}
                    <Route index element={<Stocks />} />
                    <Route path=":stockId" element={<SingleOperator />} />
                    {/* <Route
                path="new"
                element={<New inputs={productInputs} title="Add New Product" />}
              /> */}
                  </Route>
                  <Route path="sales">
                    {/* <Route index element={<Table />} /> */}
                    <Route path=":saleId" element={<SingleOperator />} />
                    {/* <Route
                path="new"
                element={<New inputs={productInputs} title="Add New Product" />}
              /> */}
                  </Route>
                </Route>
                <Route
                  path="operatorsinvoice"
                  element={<OperatorsInvoice />}
                ></Route>
              </Routes>
            </div>
          </div>
        </BrowserRouter>
        {/* </div> */}
      </div>
    </div>
  );
}

export default App;
