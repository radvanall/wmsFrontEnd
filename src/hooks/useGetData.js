import { useState } from "react";
import axios from "axios";

const useGetData = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const getData = async (id) => {
    setLoading(true);
    try {
      const fetch = await axios.get(url + `${id}`);
      console.log("data is: ", fetch);
      setData(fetch.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  return { data, loading, error, getData };
};
export default useGetData;
