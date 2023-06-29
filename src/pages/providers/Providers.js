import React, { useEffect, useState } from "react";
import "./Providers.css";
import useFetch from "../../hooks/useFetch";
import Table from "../../components/Table/Table";
import ProvidersMenu from "../../components/ProvidersMenu/ProvidersMenu";
const Providers = () => {
  const { data, loading, error } = useFetch(
    "http://localhost:8080/api/provider/readAll"
  );
  const [providers, setProviders] = useState(null);
  useEffect(() => {
    console.log(data);
    if (data) {
      const newArray = data.map((provider) => {
        return {
          id: provider.id,
          img: provider.image,
          providerName: provider.providerName,
          email: provider.email,
          ["Nr. of positions"]: provider.positions.length,
        };
      });
      setProviders(newArray);
    }
  }, [data]);
  return (
    <div className="Providers">
      {providers && (
        <div>
          {data && <ProvidersMenu data={data} setProviders={setProviders} />}
          {providers.length !== 0 ? (
            <Table data={providers} page="providers" />
          ) : (
            <h2>Nu exista rezultate</h2>
          )}
        </div>
      )}
    </div>
  );
};

export default Providers;
