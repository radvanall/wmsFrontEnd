import React, { useEffect, useState } from "react";
import useGetData from "../../hooks/useGetData";
import hoverLine from "../../CustomChart/hoverLine";
import Card from "../Card/Card";
import getMonthAndYear from "../../functions/getMonthAndYear";
import CustomChart from "../../CustomChart/CustomChart";
import RadioButton from "../RadioButton/RadioButton";
import "./CustomerPurchasesChart.css";
const CustomerPurchasesChart = ({ id, url, label }) => {
  const [period, setPeriod] = useState(1);
  const [chartData, setChartData] = useState(null);
  const { data, loading, error, getData } = useGetData(
    url
    // "http://localhost:8080/api/invoice/getWeeklySales"
  );
  const getChartData = async () => {
    await getData(`?id=${id}&period=${period}`);
  };
  useEffect(() => {
    getChartData();
  }, [period, id]);
  useEffect(() => {
    if (data) {
      console.log("chartData=", data);
      setChartData({
        labels: data.map((item) => getMonthAndYear(item.weekStart, "RO-ro")),
        datasets: [
          {
            label: label,
            data: data.map((item) => item.totalSales),
            backgroundColor: "#4361ee",
            borderColor: "#4361ee",
            type: "line",
          },
        ],
      });
    }
  }, [data]);
  function formatCurrency(value) {
    return value.toLocaleString("RO-ro", { minimumFractionDigits: 2 }) + " lei";
  }
  const chartOptions = {
    scales: {
      y: {
        ticks: {
          callback: function (value, index, values) {
            return formatCurrency(value);
          },
        },
      },
    },
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
          label: function (tooltipItem, data) {
            return label + ": " + tooltipItem.raw + " lei";
          },
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };
  const isStatusSelected = (value) => parseInt(period) === parseInt(value);
  const handlePeriodCheck = (e) => {
    setPeriod(e.currentTarget.value);
    getChartData();
  };
  return (
    // <Card>
    <>
      {data && chartData && (
        <>
          <div className="month__radio__buttons">
            <RadioButton
              id="1month"
              name="month__radio"
              label="Ultima lună"
              value={1}
              checked={isStatusSelected(1)}
              handleChange={handlePeriodCheck}
            />
            <RadioButton
              id="3month"
              name="month__radio"
              label="Ultimele 3 luni"
              value={3}
              checked={isStatusSelected(3)}
              handleChange={handlePeriodCheck}
            />
            <RadioButton
              id="6month"
              name="month__radio"
              label="Ultimele 6 luni"
              value={6}
              checked={isStatusSelected(6)}
              handleChange={handlePeriodCheck}
            />
          </div>
          <CustomChart
            chartData={chartData}
            plugins={hoverLine}
            options={chartOptions}
            height="460px"
          />
        </>
      )}
    </>
    // </Card>
  );
};

export default CustomerPurchasesChart;
