import React from "react";
import ItemTable from "../ItemTable/ItemTable";
import RangeDatePiker from "../RangeDatePicker/RangeDatePicker";
import productBalance from "../../productBalance";
import { addDays, parse } from "date-fns";
import { useState } from "react";

const BalanceTable = () => {
  const [data, setData] = useState([...productBalance]);
  const [rangeSelected, setRangeSelected] = useState(false);
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);
  const handleDateSetting = (items) => {
    setRange([...items]);
    setRangeSelected(true);
  };
  const handleFilter = () => {
    const filtered = productBalance.filter((item) => {
      const itemDate = parse(item.date, "dd-MM-yyyy", new Date());
      if (
        itemDate.getTime() >= range[0].startDate.getTime() &&
        itemDate.getTime() <= range[0].endDate.getTime()
      ) {
        return item;
      }
    });
    setData([...filtered]);
  };
  const resetRange = () => {
    setRangeSelected(false);
    setData([...productBalance]);
  };
  return (
    <ItemTable
      data={data}
      header={"Bilanțul vînzărilor:"}
      itemLink={"products"}
    >
      {" "}
      <RangeDatePiker
        resetRange={resetRange}
        range={range}
        handleDateSetting={handleDateSetting}
        handleFilter={handleFilter}
        rangeSelected={rangeSelected}
      />
    </ItemTable>
  );
};

export default BalanceTable;
