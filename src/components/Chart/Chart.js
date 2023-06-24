import React from "react";
import "./Chart.css";
import { useState } from "react";
import LineChart from "../LineChart/LineChart";
import chartData from "../../chart.js";
const Chart = () => {
  const [salesData, setSalesData] = useState({
    labels: chartData.map((data) => data.month),
    datasets: [
      {
        label: "sales",
        data: chartData.map((data) => data.sales),
        backgroundColor: "#7a2512",
        borderColor: "#fe6240",
        type: "line",
      },
    ],
  });
  return (
    <div className="chart">
      <LineChart chartData={salesData} className="line__chart" />
    </div>
  );
};

export default Chart;
