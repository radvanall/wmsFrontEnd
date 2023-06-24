import React from "react";
import { Chart } from "react-chartjs-2";

const CustomChart = ({ chartData, options, plugins }) => {
  return <Chart data={chartData} options={options} plugins={[plugins]}></Chart>;
};

export default CustomChart;
