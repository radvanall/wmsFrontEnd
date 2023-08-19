import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux/es/exports";

const useFetch = (url) => {
  const jwt = useSelector((state) => state.userSlice.jwt);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fetchData = async () => {
    setLoading(true);
    console.log(jwt);
    fetch(url, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          console.log("errorar la connectare");
          console.log(res);
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
