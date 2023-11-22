import React from "react";
import { useState } from "react";
import CustomChart from "../../CustomChart/CustomChart";
import "./SaleChart.css";
import salesAquisition from "../../productsaleschart.js";
const SaleChart = () => {
  const [chartState, setChartState] = useState(true);
  const price = {
    labels: salesAquisition.map((item) => item.date),
    datasets: [
      {
        label: "sales",
        data: salesAquisition.map((item) => item.salesPrice),
        backgroundColor: "#4361ee",
        borderColor: "#4361ee",
        type: "line",
      },
      {
        label: "aquisitions",
        data: salesAquisition.map((item) => item.aquisitionPrice),
        backgroundColor: "#fca311",
        borderColor: "#fca311",
        type: "line",
      },
    ],
  };
  const piece = {
    labels: salesAquisition.map((item) => item.date),
    datasets: [
      {
        label: "sales",
        data: salesAquisition.map((item) => item.salesPieces),
        backgroundColor: "#4361ee",
        borderColor: "#4361ee",
        type: "line",
      },
      {
        label: "aquisitions",
        data: salesAquisition.map((item) => item.aquisitionPieces),
        backgroundColor: "#fca311",
        borderColor: "#fca311",
        type: "line",
      },
    ],
  };
  const [chartData, setChartData] = useState({ ...price });
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
  const chartOptions = {
    interaction: {
      mode: "index",
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        usePointStyle: true,
        callbacks: {
          afterTitle: (context) => {
            console.log(context);
            const difference = context[0].raw - context[1].raw;
            if (chartState) {
              return "Bilanța vânzărilor constituie " + difference + " lei";
            } else {
              return "Bilanța vânzărilor constituie " + difference + " bucăți";
            }
          },
        },
      },
    },
    tension: 0.4,
    pointRadius: 0,
    pointHoverRadius: 7,
    pointHitRadius: 20,
    hoverBackgroundColor: "white",
    pointHoverBorderWidth: 3,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };
  const handleChange = () => {
    setChartState((prevState) => !prevState);
    chartState === false
      ? setChartData({ ...price })
      : setChartData({ ...piece });
  };
  return (
    <div className="chart_2">
      <button onClick={handleChange} className="toggleData">
        {chartState !== true ? "Cash" : "Bucăți"}
      </button>
      {chartState !== true ? (
        <h2>Bilanțul venitului în bucați</h2>
      ) : (
        <h2>Bilanțul venitului în lei</h2>
      )}
      <div className="chart_1">
        <CustomChart
          chartData={chartData}
          options={chartOptions}
          plugins={hoverLine}
          className="line__chart_2"
        />
      </div>
    </div>
  );
};

export default SaleChart;
