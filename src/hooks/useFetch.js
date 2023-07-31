import React from "react";
import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fetchData = async () => {
    setLoading(true);
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          console.log("errorar la connectare");
          throw Error("Eroare la conectare..");
        }
        return res.json();
      })
      .then((res) => {
        setLoading(false);
        // console.log("data:", res);
        setData(res);
        setError(null);
      })
      .catch((err) => {
        setLoading(false);
        // console.log(err);
        setError(err.message);
      });
  };
  useEffect(() => {
    fetchData();
  }, [url]);
  return { data, loading, error, fetchData };
};

export default useFetch;
