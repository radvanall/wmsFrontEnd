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
      console.log("itemDate=", itemDate);
      console.log("itemDate.getTime=", itemDate.getTime());
      console.log(
        "irange[0].startDate.getTime()=",
        range[0].startDate.getTime()
      );
      console.log("irange[0].startDate=", range[0].startDate);

      if (
        itemDate.getTime() >= range[0].startDate.getTime() &&
        itemDate.getTime() <= range[0].endDate.getTime()
      ) {
        console.log("true");
        return item;
      }
      //   return "false";
    });
    setData([...filtered]);
    console.log("filtered=", filtered);
  };
  const resetRange = () => {
    console.log("click");
    setRangeSelected(false);
    setData([...productBalance]);
  };
  //   console.log("range=", format(range[0].endDate, "dd-MM-yyyy"));
  //   const r = range[0].endDate;
  //   console.log("r=", r);
  //   console.log("typof r=", typeof r);
  //   const dat = new Date("14/11/2020", "dd/MM/yyyy");
  //   const dat = "14/11/2020";
  //   const dat2 = parse(dat, "dd/MM/yyyy", new Date());
  //   console.log("dat2=", dat2);

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
