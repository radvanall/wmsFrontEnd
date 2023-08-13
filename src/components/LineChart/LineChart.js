import React from "react";
import { Line } from "react-chartjs-2";
import { Chart } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
const hoverLine = {
  id: "line",
  beforeDatasetDraw(chart) {
    const {
      ctx,
      tooltip,
      chartArea: { top, bottom },
    } = chart;
    console.log(tooltip._active);
    if (tooltip._active[0]) {
      ctx.beginPath();
      ctx.strokeStyle = "grey";
      ctx.lineWidth = 1;
      ctx.moveTo(tooltip._active[0].element.x, top);
      ctx.lineTo(tooltip._active[0].element.x, bottom);
      ctx.stroke();
      ctx.restore();
    }
  },
};
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
      plugins={[hoverLine]}
    ></Chart>
  );
};

export default LineChart;
