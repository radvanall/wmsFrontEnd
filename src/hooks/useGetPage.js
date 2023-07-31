import axios from "axios";
import queryString from "query-string";
import { useState, useEffect } from "react";

const useGetPage = (url, filters) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [size, setSize] = useState(20);
  const [sortDirection, setSortDirection] = useState("DESC");
  const toggleSortDirection = () => {
    if (sortDirection === "DESC") setSortDirection("ASC");
    else setSortDirection("DESC");
  };
  const getPage = async (page, filterCriteria) => {
    // console.log("page filter Criterisa:", filterCriteria);
    // console.log("type of Criterisa:", typeof filterCriteria);
    setLoading(true);

    try {
      const response = await axios.post(
        url + `/?page=${page}&size=${size}&sortDirection=${sortDirection}`,
        filterCriteria ? filterCriteria : undefined
      );
      setData(response.data);
      // console.log("data:", response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getPage(0, filters);
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
