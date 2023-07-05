const sorting = (
  col,
  data,
  order,
  sortColumnsState,
  setData,
  setOrder,
  setSortColumnsState
) => {
  if (typeof data[0][col] === "string") {
    if (order === "ASC") {
      const sorted = [...data].sort((a, b) =>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
      );
      setData(sorted);
      setOrder("DSC");
      setSortColumnsState({ ...sortColumnsState, [col]: "DSC" });
    }
    if (order === "DSC") {
      const sorted = [...data].sort((a, b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );
      setData(sorted);
      setOrder("ASC");
      setSortColumnsState({ ...sortColumnsState, [col]: "ASC" });
    }
    return;
  }
  if (typeof data[0][col] === "object") {
    console.log("object");
    if (order === "ASC") {
      const sorted = [...data].sort((a, b) =>
        a[col].text.toLowerCase() < b[col].text.toLowerCase() ? 1 : -1
      );
      setData(sorted);
      setOrder("DSC");
      setSortColumnsState({ ...sortColumnsState, [col]: "DSC" });
    }
    if (order === "DSC") {
      const sorted = [...data].sort((a, b) =>
        a[col].text.toLowerCase() > b[col].text.toLowerCase() ? 1 : -1
      );
      setData(sorted);
      setOrder("ASC");
      setSortColumnsState({ ...sortColumnsState, [col]: "ASC" });
    }
    return;
  }
  if (order === "ASC") {
    const sorted = [...data].sort((a, b) => a[col] - b[col]);
    setOrder("DSC");
    setData(sorted);
    setSortColumnsState({ ...sortColumnsState, [col]: "DSC" });
  }
  if (order === "DSC") {
    const sorted = [...data].sort((a, b) => b[col] - a[col]);
    setData(sorted);
    setOrder("ASC");
    setSortColumnsState({ ...sortColumnsState, [col]: "ASC" });
  }
};

export default sorting;
