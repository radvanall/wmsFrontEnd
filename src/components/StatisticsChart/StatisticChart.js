import React, { useEffect, useState } from "react";
import Card from "../Card/Card";
import CustomChart from "../../CustomChart/CustomChart";
import useGetData from "../../hooks/useGetData";
import getMonthAndYear from "../../functions/getMonthAndYear";
import hoverLine from "../../CustomChart/hoverLine";
import RadioButton from "../RadioButton/RadioButton";

const StatisticChart = ({ endpoint, balanceSetter, chartDataSetter }) => {
  const [period, setPeriod] = useState(6);
  const [criteria, setCriteria] = useState(1);
  const [chartData, setChartData] = useState(null);
  const [balance, setBalance] = useState({
    totalAcquisitions: 0,
    totalSales: 0,
  });
  const { data, loading, error, getData } = useGetData(
    endpoint
    // "http://localhost:8080/api/provider/getBalance/"
    // "http://localhost:8080/api/"
  );
  const getChartData = async () => {
    // await getData(`?id=${id}&period=${period}`);
    await getData(`?criteria=${criteria}&period=${period}`);
  };
  useEffect(() => {
    getChartData();
  }, [period, endpoint, criteria]);
  useEffect(() => {
    if (data) {
      console.log("chartData=", data);
      setBalance(
        balanceSetter(data)
        //     {
        //     totalAcquisitions: data.reduce((sum, currentValue) => {
        //       return parseInt(sum) + parseInt(currentValue.totalAcquisitions);
        //     }, 0),
        //     totalSales: data.reduce((sum, currentValue) => {
        //       return parseInt(sum) + parseInt(currentValue.totalSales);
        //     }, 0),
        //   }
      );
      setChartData(
        chartDataSetter(data)
        //     {
        //     labels: data
        //       .reverse()
        //       .map((item) => getMonthAndYear(item.weekStart, "RO-ro")),
        //     datasets: [
        //       {
        //         label: "Vânzari",
        //         data: data.map((item) => item.totalSales),
        //         backgroundColor: "#4361ee",
        //         borderColor: "#4361ee",
        //         type: "line",
        //       },
        //       {
        //         label: "Achiziții",
        //         data: data.map((item) => item.totalAcquisitions),
        //         backgroundColor: "#fca311",
        //         borderColor: "#fca311",
        //         type: "line",
        //       },
        //     ],
        //   }
      );
    }
  }, [data]);
  function formatCurrency(value) {
    return value.toLocaleString("RO-ro", { minimumFractionDigits: 2 }) + " lei";
  }
  const chartOptions = {
    interaction: {
      mode: "index",
    },
    plugins: {
      legend: {
        position: "bottom",
        align: "center",
        labels: {
          boxWidth: 20,
          padding: 10,
        },
      },
      tooltip: {
        usePointStyle: true,
        callbacks: {
          afterTitle: (context) => {
            console.log(context);
            const difference = context[0].raw - context[1].raw;
            return (
              "Bilanța vânzărilor constituie " +
              difference +
              (criteria == 2 ? " lei" : " buc.")
            );
          },
          label: (TooltipItem) => {
            if (TooltipItem.datasetIndex === 0)
              return (
                "Vânzări: " +
                TooltipItem.raw +
                (criteria == 1 ? " buc." : " lei.")
              );
            if (TooltipItem.datasetIndex === 1)
              return (
                "Achiziții: " +
                TooltipItem.raw +
                (criteria === 1 ? " buc." : " lei.")
              );
            // console.log(TooltipItems.forEach((item) => item.raw));
            // return TooltipItem.raw;
            // return (
            //   "Vânzari " +
            //   context[0].raw +
            //   " lei" +
            //   "Achiziții " +
            //   context[1].raw +
            //   " lei"
            // );
            // const difference = context[0].raw - context[1].raw;
            // return (
            //   "Bilanța vânzărilor constituie " +
            //   difference +
            //   (criteria == 2 ? " lei" : " buc.")
            // );
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
        ticks: {
          callback: function (value, index, values) {
            console.log("criteria", criteria);
            return criteria == 2 ? formatCurrency(value) : value + " buc.";
          },
        },
      },
      x: {
        ticks: {
          callback: function (value, index, values) {
            console.log("ticks:", value, index, values);
            if (!(index % 4)) return this.getLabelForValue(value);
          },
          autoSkip: false,
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };
  const isStatusSelected = (value) => parseInt(period) === parseInt(value);
  const handlePeriodCheck = (e) => {
    setPeriod(e.currentTarget.value);
    // getChartData();
  };
  const isCriteriaSelected = (value) => parseInt(criteria) === parseInt(value);
  const handleCriteriaCheck = (e) => {
    setCriteria(e.currentTarget.value);
    // getChartData();
  };
  return (
    <Card>
      {data && chartData && (
        <>
          <div className="month__menu__buttons">
            <RadioButton
              id="quant"
              name="criteria__radio"
              label="Bucăți"
              value={1}
              checked={isCriteriaSelected(1)}
              handleChange={handleCriteriaCheck}
            />
            <RadioButton
              id="money"
              name="criteria__radio"
              label="Bani"
              value={2}
              checked={isCriteriaSelected(2)}
              handleChange={handleCriteriaCheck}
            />
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
            <div className="balance__fields">
              <p>
                Total achiziții:{balance.totalAcquisitions}{" "}
                {criteria == 1 ? "buc" : "lei"}
              </p>
              <p>
                Total vânzări:{balance.totalSales}{" "}
                {criteria == 1 ? "buc." : "lei"}
              </p>
              <p>
                Balanța:
                {parseInt(balance.totalSales) -
                  parseInt(balance.totalAcquisitions)}{" "}
                {criteria == 1 ? "buc." : "lei"}
              </p>
            </div>
          </div>
          <CustomChart
            chartData={chartData}
            plugins={hoverLine}
            options={chartOptions}
            height="430px"
          />
        </>
      )}
    </Card>
  );
};

export default StatisticChart;
