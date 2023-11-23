import React, { useEffect, useState } from "react";
import Card from "../Card/Card";
import CustomChart from "../../CustomChart/CustomChart";
import useGetData from "../../hooks/useGetData";
import hoverLine from "../../CustomChart/hoverLine";
import RadioButton from "../RadioButton/RadioButton";

const StatisticChart = ({
  endpoint,
  balanceSetter,
  chartDataSetter,
  id,
  title,
  withCriteria = true,
}) => {
  const [period, setPeriod] = useState(6);
  const [criteria, setCriteria] = useState(2);
  const [chartData, setChartData] = useState(null);
  const [balance, setBalance] = useState({
    totalAcquisitions: 0,
    totalSales: 0,
  });
  const { data, loading, error, getData } = useGetData(endpoint);
  const getChartData = async () => {
    await getData(`?criteria=${criteria}&period=${period}&nrOfPositions=4`);
  };
  useEffect(() => {
    getChartData();
  }, [period, endpoint, criteria]);
  useEffect(() => {
    if (data) {
      balanceSetter && setBalance(balanceSetter(data));
      setChartData(chartDataSetter(data, period));
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
  };
  const isCriteriaSelected = (value) => parseInt(criteria) === parseInt(value);
  const handleCriteriaCheck = (e) => {
    setCriteria(e.currentTarget.value);
  };
  return (
    <Card>
      {data && chartData && (
        <>
          <h2 className="chart__title">{title}</h2>
          <div className="month__menu__buttons">
            {withCriteria && (
              <>
                <RadioButton
                  id={"quant" + id}
                  name={"criteria__radio" + id}
                  label="Bucăți"
                  value={1}
                  checked={isCriteriaSelected(1)}
                  handleChange={handleCriteriaCheck}
                />
                <RadioButton
                  id={"money" + id}
                  name={"criteria__radio" + id}
                  label="Bani"
                  value={2}
                  checked={isCriteriaSelected(2)}
                  handleChange={handleCriteriaCheck}
                />
              </>
            )}

            <RadioButton
              id={"1month" + id}
              name={"month__radio" + id}
              label="Ultima lună"
              value={1}
              checked={isStatusSelected(1)}
              handleChange={handlePeriodCheck}
            />
            <RadioButton
              id={"3month" + id}
              name={"month__radio" + id}
              label="Ultimele 3 luni"
              value={3}
              checked={isStatusSelected(3)}
              handleChange={handlePeriodCheck}
            />
            <RadioButton
              id={"6month" + id}
              name={"month__radio" + id}
              label="Ultimele 6 luni"
              value={6}
              checked={isStatusSelected(6)}
              handleChange={handlePeriodCheck}
            />
            {balanceSetter && (
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
            )}
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
