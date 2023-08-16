import React from "react";
import "./Calendar.css";
import moment from "moment";
import { useState, useEffect, useRef } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import Modal from "../Modal/Modal";
import CloseModal from "../CloseModal/CloseModal";
import BasicButton from "../BasicButton/BasicButton";

const Calendar = ({ operator, workedDays, handleHours }) => {
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
  moment.updateLocale("en", { week: { dow: 1 } });
  const [modalActive, setModalActive] = useState(false);
  const [today, setToday] = useState(moment().clone());
  const [dayIndex, setDayIndex] = useState(0);
  const [activeMonth, setActiveMonth] = useState(today.month());
  const [hours, setHours] = useState(0);

  const [selectedDay, setSelectedDay] = useState(moment());
  const [calendarState, setCalendarState] = useState([]);
  const weekDays = ["L", "M", "Mc", "J", "V", "S", "D"];
  console.log(moment().month());
  const getCalendar = () => {
    const calendar = [];
    const startDay = today.clone().startOf("month").startOf("week");
    const endDay = today.clone().endOf("month").endOf("week");
    if (endDay.diff(startDay, "days") < 41) {
      endDay.add(7, "day");
    }
    const day = startDay.clone();
    while (!day.isAfter(endDay)) {
      const foundDay = workedDays.find((dayw) => {
        const momentDay = moment(dayw.data, "YYYY-MM-DD HH:mm:ss.S");
        if (
          momentDay.isSame(day, "day") &&
          momentDay.isSame(day, "month") &&
          momentDay.isSame(day, "year")
        )
          console.log("the same");
        return (
          momentDay.isSame(day, "day") &&
          momentDay.isSame(day, "month") &&
          momentDay.isSame(day, "year")
        );
      });
      if (foundDay) {
        calendar.push({ workedHours: foundDay.workedHours, date: day.clone() });
      } else calendar.push({ workedHours: 0, date: day.clone() });
      day.add(1, "day");
      setCalendarState(calendar);
    }
  };
  useEffect(() => {
    getCalendar();
  }, [workedDays]);

  useEffect(() => {
    getCalendar();
    setActiveMonth(today.clone().month());
  }, [today]);
  console.log(today.month());
  function lastMonth() {
    setToday(today.clone().subtract(1, "month"));
  }
  function nextMonth() {
    setToday(today.clone().add(1, "month"));
  }
  console.log(operator.name);
  function dayHandler(index, day) {
    setModalActive(true);
    setSelectedDay(day.clone());
    setDayIndex(index);
  }
  function handleMinus() {
    if (hours === 0) return;
    setHours((hours) => hours - 1);
  }
  function handlePlus() {
    if (hours === 12) return;
    setHours((hours) => hours + 1);
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
      {calendarState.length && (
        <div className="calendar">
          {calendarState.map((item, index) => (
            <div
              className={`days day${item.date.day()} ${
                item.date.month() === activeMonth ? "current" : "another"
              }  
             ${
               item.date.isSame(moment(), "month") &&
               item.date.isSame(moment(), "day")
                 ? " today"
                 : " not_today"
             }
             ${
               parseInt(item.workedHours) > 0
                 ? " worked_day"
                 : " day_not_worked"
             }
             `}
              key={index}
            >
              <div
                className="day__container "
                onClick={() => {
                  dayHandler(index, item.date);
                }}
              >
                <div className="day__of__month">{item.date.format("D")}</div>
                <div className="worked__hours">{item.workedHours} ore</div>
              </div>
            </div>
          ))}
        </div>
      )}
      <Modal active={modalActive}>
        <CloseModal
          handleCloseModal={() => {
            setModalActive(false);
          }}
        />
        <div className="modal__name__container">
          <p>
            <span>Nume:</span>
            <span>{operator.name + " " + operator.surname}</span>
          </p>
        </div>
        <div className="modal__name__container">
          <p>
            <span>Data:</span>
            <span>{selectedDay.format("DD MMMM YYYY")}</span>
          </p>
        </div>
        <div className="modal__name__container">
          <p>
            <span>Ore lucrate:</span>
            <span>
              <button onClick={handleMinus}>-</button>
              <span className="worked__hours__span">{hours}</span>
              <button onClick={handlePlus}>+</button>
            </span>
          </p>
        </div>
        <div className="calendar__button__container">
          <BasicButton
            handleClick={() => handleHours(hours, selectedDay.toDate())}
            text="Salvează"
          />
        </div>
      </Modal>
    </div>
  );
};

export default Calendar;
