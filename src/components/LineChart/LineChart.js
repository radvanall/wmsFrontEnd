import React from "react";
import { Line } from "react-chartjs-2";
import { Chart } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const LineChart = ({ chartData }) => {
  return (
    <Chart
      data={chartData}
      options={{
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        responsive: true,
        maintainAspectRatio: false,
      }}
    ></Chart>
  );
};

export default LineChart;
