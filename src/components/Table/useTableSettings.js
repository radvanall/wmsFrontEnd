import "./Table.css";

import { useState, useEffect } from "react";

import sorting from "./sorting";
const useTableSettings = (info) => {
  const [data, setData] = useState(info);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);
  const [order, setOrder] = useState("DSC");
  const sortObj = {};
  const columnsState = Object.keys(data[0]).map((key) => key);
  columnsState.map((key) => (sortObj[key] = "DSC"));
  const [sortColumnsState, setSortColumnsState] = useState(sortObj);
  const indexOfLastPost = postsPerPage * currentPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const [currentPosts, setCurrentPosts] = useState(
    data.slice(indexOfFirstPost, indexOfLastPost)
  );
  useEffect(() => {
    setCurrentPage(1);
    if (info.length !== 0) setData(info);
  }, [info]);
  useEffect(() => {
    setCurrentPosts(data.slice(indexOfFirstPost, indexOfLastPost));
  }, [data, currentPage]);
  const handleSorting = (col) => {
    sorting(
      col,
      data,
      order,
      sortColumnsState,
      setData,
      setOrder,
      setSortColumnsState
    );
  };
  const tableHeader = Object.keys(currentPosts[0]);
  const dataLength = data.length;
  return {
    tableHeader,
    sortColumnsState,
    currentPosts,
    postsPerPage,
    currentPage,
    dataLength,
    setCurrentPage,
    handleSorting,
  };
};
export default useTableSettings;
