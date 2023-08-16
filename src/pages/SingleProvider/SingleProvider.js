import React, { useEffect, useState } from "react";
import Card from "../../components/Card/Card";
import ResponsiveTable from "../../components/ResponsiveTable/ResponsiveTable";
import ProviderCard from "../../components/ProviderCard/ProviderCard";
import { useParams } from "react-router-dom";
import useGetData from "../../hooks/useGetData";
import ProviderBalanceChart from "../../components/ProviderBalanceChart/ProviderBalanceChart";
import "./SingleProvider.css";
import { useNavigate } from "react-router-dom";
import getFormatedDate from "../../functions/getFormatedDate";
const SingleProvider = () => {
  const navigate = useNavigate();
  const { providerId } = useParams();
  const [products, setProducts] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [provider, setProvider] = useState({});
  const { data, loading, error, getData } = useGetData(
    "http://localhost:8080/api/provider/read/"
  );

  console.log(providerId);
  useEffect(() => {
    getData(providerId);
    console.log(data);
  }, []);
  useEffect(() => {
    if (data) {
      const { positions, invoices, ...providerData } = data;
      const invoicesArray = invoices.map((invoice) => ({
        id: invoice.id,
        Data: getFormatedDate(invoice.date, "RO-ro"),
        ["Creată de"]: invoice.administrator,
        ["Preț/ lei"]: invoice.price,
        Validat: invoice.validated ? (
          <div
            style={{
              backgroundColor: "#b4f8c8",
              padding: "5px",
              borderRadius: "5px",
            }}
          >
            Validat
          </div>
        ) : (
          <div
            style={{
              backgroundColor: "#ffaebc",
              padding: "5px",
              borderRadius: "5px",
            }}
          >
            Nevalidat
          </div>
        ),
      }));
      const newArray = positions.map((position) => ({
        id: position.id,
        Nume: position.name,
        image: position.image,
        ["Cantitatea rămasă"]: position.remainingQuantity,
        Starea: position.active ? (
          <div
            style={{
              backgroundColor: "#b4f8c8",
              padding: "5px",
              borderRadius: "5px",
            }}
          >
            Activ
          </div>
        ) : (
          <div
            style={{
              backgroundColor: "#ffaebc",
              padding: "5px",
              borderRadius: "5px",
            }}
          >
            Inactiv
          </div>
        ),
      }));
      setProducts(newArray);
      setProvider(providerData);
      setInvoices(invoicesArray);
    }
  }, [data]);
  const handleDetails = (id) => {
    navigate(`/products/${id}`);
  };
  const handleInvoiceDetails = (id) => {
    navigate(`/invoices/${id}`);
  };
  return (
    <div className="single__provider__wrapper">
      SingleProvider
      {data && (
        <>
          {provider && (
            <div className="card">
              <ProviderCard provider={data} getData={getData} />
            </div>
          )}
          <div className="lineChart">
            <ProviderBalanceChart
              // id={providerId}
              endpoint={`provider/getBalance?id=${providerId}`}
            />
          </div>
          <div className="invoices">
            <Card>
              {invoices.length && (
                <ResponsiveTable
                  data={invoices}
                  title="Facturi"
                  handleDetails={handleInvoiceDetails}
                />
              )}
            </Card>
          </div>
          <div className="products">
            <Card>
              {products.length && (
                <ResponsiveTable
                  data={products}
                  title="Produsele furnizorului"
                  handleDetails={handleDetails}
                />
              )}{" "}
            </Card>
          </div>
        </>
      )}
    </div>
  );
};

export default SingleProvider;
