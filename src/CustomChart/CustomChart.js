import React from "react";
import { Chart } from "react-chartjs-2";

const CustomChart = ({ chartData, options, plugins, height }) => {
  return (
    <div style={{ height: height, position: "relative", paddingLeft: "5px" }}>
      <Chart data={chartData} options={options} plugins={[plugins]}></Chart>
    </div>
  );
};

export default CustomChart;
