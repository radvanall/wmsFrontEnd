import React from "react";
import "./RangeDatePicker.css";
import { useEffect, useState, useRef } from "react";
import { DateRangePicker } from "react-date-range";
import format from "date-fns/format";
import { BsFillCalendarCheckFill, BsFillCalendarXFill } from "react-icons/bs";
import { MdClose } from "react-icons/md";
import { FiFilter } from "react-icons/fi";
import { addDays } from "date-fns";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const RangeDatePiker = ({
  range,
  resetRange,
  handleDateSetting,
  handleFilter,
  rangeSelected,
}) => {
  // const [range, setRange] = useState([
  //   {
  //     startDate: new Date(),
  //     endDate: addDays(new Date(), 7),
  //     key: "selection",
  //   },
  // ]);
  const [open, setOpen] = useState(false);
  const [inputOpened, setInputOpened] = useState(false);
  const refOne = useRef(null);
  useEffect(() => {
    document.addEventListener("keydown", hideOnEscape, true);
    document.addEventListener("click", hideOnClickOutside, true);
    return () => {
      document.removeEventListener("keydown", hideOnEscape);
      document.removeEventListener("click", hideOnClickOutside);
    };
  }, []);

  const hideOnEscape = (e) => {
    if (e.key === "Escape") {
      // handleSort();
      setOpen(false);
    }
  };
  const hideOnClickOutside = (e) => {
    if (refOne.current && !refOne.current.contains(e.target)) {
      // handleSort();
      setOpen(false);

      // console.log("range=", format(range[0].endDate, "dd/MM/yyyy"));
    }
  };

  return (
    <div className="calendarWrap">
      <div
        className={
          inputOpened
            ? "range__input__wrapper__opened"
            : "range__input__wrapper"
        }
      >
        <button
          onClick={() => setInputOpened((prev) => !prev)}
          className="range__input__wrapper__button"
        >
          {inputOpened ? <BsFillCalendarXFill /> : <BsFillCalendarCheckFill />}
        </button>
        <input
          value={
            rangeSelected
              ? `${format(range[0].startDate, "dd/MM/yyyy")} to ${format(
                  range[0].endDate,
                  "dd/MM/yyyy"
                )}`
              : "all"
          }
          readOnly
          className="range__date__picker__input "
          onClick={() => setOpen((open) => !open)}
        />
        <button className="range__input__wrapper__buttonX" onClick={resetRange}>
          <MdClose />
        </button>
        <button
          className="range__input__wrapper__butto__sort"
          onClick={handleFilter}
        >
          <FiFilter />
        </button>
      </div>

      <div ref={refOne}>
        {open && (
          <div>
            {/* <button onClick={handleSort}>click</button> */}
            <DateRangePicker
              onChange={(item) => handleDateSetting([item.selection])}
              editableDateInputs={true}
              moveRangeOnFirstSelection={false}
              ranges={range}
              months={1}
              direction="horizontal"
              className="calendarElement"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default RangeDatePiker;
