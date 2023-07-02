import React, { useEffect } from "react";
import ProviderCard from "../../components/ProviderCard/ProviderCard";
import { useParams } from "react-router-dom";
import useGetData from "../../hooks/useGetData";
const SingleProvider = () => {
  const { providerId } = useParams();
  const { data, loading, error, getData } = useGetData(
    "http://localhost:8080/api/provider/read/"
  );

  console.log(providerId);
  useEffect(() => {
    getData(providerId);
    console.log(data);
  }, []);
  return (
    <div>
      SingleProvider
      {data && (
        <div style={{ maxWidth: 300 }}>
          <ProviderCard provider={data} getData={getData} />
        </div>
      )}
    </div>
  );
};

export default SingleProvider;
