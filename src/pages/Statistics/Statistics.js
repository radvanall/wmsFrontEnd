import React from "react";
import StatisticChart from "../../components/StatisticsChart/StatisticChart";
import getMonthAndYear from "../../functions/getMonthAndYear";
const totalBalanceSetter = (data) => {
  return {
    totalAcquisitions: data.reduce((sum, currentValue) => {
      return parseInt(sum) + parseInt(currentValue.totalAcquisitions);
    }, 0),
    totalSales: data.reduce((sum, currentValue) => {
      return parseInt(sum) + parseInt(currentValue.totalSales);
    }, 0),
  };
};
const totalProductsDataSetter = (data) => {
  return {
    labels: data
      .reverse()
      .map((item) => getMonthAndYear(item.weekStart, "RO-ro")),
    datasets: [
      {
        label: "Vânzari",
        data: data.map((item) => item.totalSales),
        backgroundColor: "#4361ee",
        borderColor: "#4361ee",
        type: "line",
      },
      {
        label: "Achiziții",
        data: data.map((item) => item.totalAcquisitions),
        backgroundColor: "#fca311",
        borderColor: "#fca311",
        type: "line",
      },
    ],
  };
};

const Statistics = () => {
  return (
    <div>
      <StatisticChart
        endpoint="http://localhost:8080/api/position/getTotalBalance/"
        balanceSetter={totalBalanceSetter}
        chartDataSetter={totalProductsDataSetter}
      />
    </div>
  );
};

export default Statistics;
