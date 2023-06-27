import React, { useEffect } from "react";
import "./Providers.css";
import useFetch from "../../hooks/useFetch";
const Providers = () => {
  const { data, loading, error } = useFetch(
    "http://localhost:8080/api/provider/readAll"
  );
  useEffect(() => {
    console.log(data);
  }, [data]);
  return <div className="Providers">Providers</div>;
};

export default Providers;
