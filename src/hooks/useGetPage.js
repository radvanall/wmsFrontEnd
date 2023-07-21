import axios from "axios";
import { useState, useEffect } from "react";

const useGetPage = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [size, setSize] = useState(20);
  const [sortDirection, setSortDirection] = useState("DESC");
  const toggleSortDirection = () => {
    if (sortDirection === "DESC") setSortDirection("ASC");
    else setSortDirection("DESC");
  };
  const getPage = async (page) => {
    setLoading(true);
    try {
      const response = await axios.get(
        url + `/?page=${page}&size=${size}&sortDirection=${sortDirection}`
      );
      setData(response.data);
      console.log("data:", response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getPage(0);
  }, [size, sortDirection]);
  return {
    data,
    loading,
    error,
    size,
    sortDirection,
    getPage,
    setSize,
    toggleSortDirection,
  };
};

export default useGetPage;
