import React from "react";
import "./Calendar.css";
import moment from "moment";
import { useState, useEffect, useRef } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import Modal from "../Modal/Modal";

const Calendar = ({ operator }) => {
  const calendar = [];
  moment.updateLocale("en", {
    months: [
      "Ianuarie",
      "Februarie",
      "Martie",
      "Aprilie",
      "Mai",
      "Iunie",
      "Iulie",
      "August",
      "Septembrie",
      "Octobrie",
      "Noiembrie",
      "Decembrie",
    ],
  });
  //   const [currentMonth, setCurrentMonth] = useState(moment().month());
  moment.updateLocale("en", { week: { dow: 1 } });
  const [modalActive, setModalActive] = useState(false);
  const [today, setToday] = useState(moment());
  const [dayIndex, setDayIndex] = useState(0);
  const [activeMonth, setActiveMonth] = useState(today.month());
  const [hours, setHours] = useState(0);

  const [selectedDay, setSelectedDay] = useState(moment());
  const startDay = today.clone().startOf("month").startOf("week");
  const endDay = today.clone().endOf("month").endOf("week");
  const weekDays = ["L", "M", "Mc", "J", "V", "S", "D"];
  console.log(moment().month());
  if (endDay.diff(startDay, "days") < 41) {
    endDay.add(7, "day");
  }
  const day = startDay.clone();
  //   console.log(calendarState);

  while (!day.isAfter(endDay)) {
    // {workedHours:0;
    // date:day.clone()}
    // setCalendarState([...calendarState, { workedHours: 0, date: day.clone() }]);
    calendar.push({ workedHours: 0, date: day.clone() });
    day.add(1, "day");
  }
  console.log(calendar);
  const [calendarState, setCalendarState] = useState(calendar);
  // const calendarState = useRef(calendar);
  useEffect(() => {
    setCalendarState([...calendar]);
    setActiveMonth(today.clone().month());
  }, [today]);
  console.log(today.month());
  function lastMonth() {
    console.log("cal:", calendar);
    setToday(today.clone().subtract(1, "month"));
    console.log("cal-=chage:", calendar);
    // setCalendarState(calendar);

    // setCalendarState([...calendar]);
  }
  function nextMonth() {
    setToday(today.clone().add(1, "month"));
  }
  console.log(operator.name);
  function dayHandler(index, day) {
    setModalActive(true);
    setSelectedDay(day.clone());
    setDayIndex(index);

    // console.log(day.format("DD-MM-YYYY"));
  }
  function handleMinus() {
    if (hours === 0) return;
    setHours((hours) => hours - 1);
  }
  function handlePlus() {
    if (hours === 12) return;
    setHours((hours) => hours + 1);
  }
  function handleHours() {
    const newCalendar = calendarState.map((item, index) => {
      if (index === dayIndex) {
        return { ...item, workedHours: hours };
      }

      return item;
    });
    setCalendarState(newCalendar);
  }

  return (
    <div className="calendar__wrapper">
      <h2 className="calendar__title">Zile lucrate:</h2>
      <div className="month">
        <FaAngleLeft
          className="month__left"
          onClick={() => {
            lastMonth();
          }}
        />
        <h2>
          {today.format("MMMM")}/{today.format("YYYY")}
        </h2>
        <FaAngleRight className="month__right" onClick={nextMonth} />
      </div>
      <div className="day__header">
        {weekDays.map((day) => (
          <div className="day" key={day}>
            <div className="day__container day__title">{day}</div>
          </div>
        ))}
      </div>

      <div className="calendar">
        {calendarState.map((item, index) => (
          <div
            className={`days day${item.date.day()} ${
              item.date.month() === activeMonth ? "current" : "another"
            }`}
            key={index}
          >
            <div
              className="day__container "
              onClick={() => {
                dayHandler(index, item.date);

                // console.log(e.currentTarget);
              }}
            >
              <div className="day__of__month">{item.date.format("D")}</div>
              <div className="worked__hours">{item.workedHours} ore</div>
            </div>
          </div>
        ))}
      </div>
      <Modal active={modalActive} setActive={setModalActive}>
        <div className="modal__name__container">
          <h2 className="modal__name">Name:</h2>
          <h2 className="modal__name">
            {operator.name + " " + operator.surname}
          </h2>
        </div>
        <div className="modal__date__container">
          <h2 className="modal__date">Data:</h2>
          <h2 className="modal__date">{selectedDay.format("DD-MM-YYYY")}</h2>
        </div>
        <div className="modal__hour__container">
          <h2 className="modal__hour">Ore lucrate:</h2>
          <div className="hours">
            <button onClick={handleMinus}>-</button>
            <h2 className="modal__hour">{hours}</h2>
            <button onClick={handlePlus}>+</button>
          </div>
          <button onClick={handleHours}>Submit</button>
        </div>
      </Modal>
    </div>
  );
};

export default Calendar;
