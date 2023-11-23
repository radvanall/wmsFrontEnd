const sorting = (
  col,
  data,
  order,
  sortColumnsState,
  setData,
  setOrder,
  setSortColumnsState
) => {
  const monthsInRomanian = {
    IANUARIE: 0,
    FEBRUARIE: 1,
    MARTIE: 2,
    APRILIE: 3,
    MAI: 4,
    IUNIE: 5,
    IULIE: 6,
    AUGUST: 7,
    SEPTEMBRIE: 8,
    OCTOMBRIE: 9,
    NOIEMBRIE: 10,
    DECEMBRIE: 11,
  };
  const datePattern = /^\d{1,2}\s[a-zA-Z]{2,20}\s\d{4}$/;
  if (datePattern.test(data[0][col])) {
    if (order === "ASC") {
      const sorted = [...data].sort((date1, date2) => {
        if (!datePattern.test(date1[col])) return -1;
        if (!datePattern.test(date2[col])) return 1;
        const [, day1, month1, year1] = date1[col].match(
          /(\d+)\s+(\w+)\s+(\d+)/
        );
        const [, day2, month2, year2] = date2[col].match(
          /(\d+)\s+(\w+)\s+(\d+)/
        );

        const monthNumber1 = monthsInRomanian[month1.toUpperCase()];
        const monthNumber2 = monthsInRomanian[month2.toUpperCase()];
        const dateObj1 = new Date(year1, monthNumber1, day1);
        const dateObj2 = new Date(year2, monthNumber2, day2);

        return dateObj2 - dateObj1;
      });
      setData(sorted);
      setOrder("DSC");
      setSortColumnsState({ ...sortColumnsState, [col]: "DSC" });
    }
    if (order === "DSC") {
      const sorted = [...data].sort((date1, date2) => {
        if (!datePattern.test(date1[col])) return -1;
        if (!datePattern.test(date2[col])) return 1;
        const [, day1, month1, year1] = date1[col].match(
          /(\d+)\s+(\w+)\s+(\d+)/
        );
        const [, day2, month2, year2] = date2[col].match(
          /(\d+)\s+(\w+)\s+(\d+)/
        );

        const monthNumber1 = monthsInRomanian[month1.toUpperCase()];
        const monthNumber2 = monthsInRomanian[month2.toUpperCase()];
        const dateObj1 = new Date(year1, monthNumber1, day1);
        const dateObj2 = new Date(year2, monthNumber2, day2);
        return dateObj1 - dateObj2;
      });
      setData(sorted);
      setOrder("ASC");
      setSortColumnsState({ ...sortColumnsState, [col]: "ASC" });
    }
    return;
  }
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
