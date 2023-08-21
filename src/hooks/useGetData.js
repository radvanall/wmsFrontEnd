import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux/es/exports";

const useGetData = (url) => {
  const jwt = useSelector((state) => state.userSlice.jwt);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const getData = async (id) => {
    setLoading(true);
    try {
      const fetch = await axios.get(id === null ? url : url + `${id}`, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
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
