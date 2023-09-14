import React, { useState, useEffect } from "react";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import Card from "../Card/Card";
import "./DoughnutChart.css";
import useGetData from "../../hooks/useGetData";
Chart.register(ArcElement, Tooltip, Legend);
const DoughnutChart = ({ chartDataSetter, endpoint, title }) => {
  const [chartData, setChartData] = useState(null);
  const { data, loading, error, getData } = useGetData(endpoint);
  const [totalSum, setTotalSum] = useState(0);
  useEffect(() => {
    getData(null);
  }, [endpoint]);
  useEffect(() => {
    if (data) {
      console.log("doughnut map:", data);
      setChartData(chartDataSetter(data));
      setTotalSum(data.reduce((sum, item) => sum + item.sum, 0));
    }
  }, [data]);
  const options = {
    cutout: "90%",
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        usePointStyle: true,
        callbacks: {
          label: (TooltipItem) => {
            return TooltipItem.label + " :   " + TooltipItem.raw + " lei";
          },
        },
      },
    },
  };
  const centerTextDoughnut = {
    id: "centerTextDoughnut",
    afterDatasetsDraw(chart, args, pluginOptions) {
      const { ctx } = chart;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = "bold 14px sans-serif";
      const text = `Suma totală: ${totalSum} de lei.`;
      if (chart.getDatasetMeta(0).data[0] && chart.getDatasetMeta(0).data[0]) {
        const x = chart.getDatasetMeta(0).data[0].x;
        const y = chart.getDatasetMeta(0).data[0].y;
        ctx.fillText(text, x, y);
      }
    },
  };
  return (
    <Card>
      {chartData && data && (
        <div className="doughnut__container">
          <h2>{title}</h2>
          <Doughnut
            data={chartData}
            options={options}
            plugins={[centerTextDoughnut]}
          />
        </div>
      )}
    </Card>
  );
};

export default DoughnutChart;
