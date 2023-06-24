import React from "react";
import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw Error("Eroare la conectare..");
        }
        return res.json();
      })
      .then((res) => {
        setLoading(false);
        setData(res);
        setError(null);
      })
      .catch((err) => {
        setLoading(false);
        setError(err.message);
      });
  }, [url]);
  return { data, loading, error };
};

export default useFetch;
