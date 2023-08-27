import React, { useEffect, useState } from "react";
import Card from "../Card/Card";
import CustomChart from "../../CustomChart/CustomChart";
import useGetData from "../../hooks/useGetData";
import getMonthAndYear from "../../functions/getMonthAndYear";
import "./ChartTable.css";
import ResponsiveTable from "../ResponsiveTable/ResponsiveTable";
import hoverLine from "../../CustomChart/hoverLine";
import RadioButton from "../RadioButton/RadioButton";
import SimpleSelect from "../SimpleSelect/SimpleSelect";
import { useNavigate } from "react-router-dom";

const nrOfPositionsOptions = [
  {
    value: 1,
    label: "1",
  },
  {
    value: 3,
    label: "3",
  },
  {
    value: 5,
    label: "5",
  },
  {
    value: 7,
    label: "7",
  },
  {
    value: 10,
    label: "10",
  },
];
const ChartTable = ({
  endpoint,
  //   balanceSetter,
  title,
  navTo,
  chartDataSetter,
  tableDataSetter,
  id,
}) => {
  const [period, setPeriod] = useState(6);
  const [nrOfPositions, setNrOfPositions] = useState(5);
  const navigate = useNavigate();
  //   const [criteria, setCriteria] = useState(2);
  const [tableData, setTableData] = useState(null);
  const [chartData, setChartData] = useState(null);
  //   const [balance, setBalance] = useState({
  //     totalAcquisitions: 0,
  //     totalSales: 0,
  //   });
  const { data, loading, error, getData } = useGetData(
    endpoint
    // "http://localhost:8080/api/provider/getBalance/"
    // "http://localhost:8080/api/"
  );
  const getChartData = async () => {
    // await getData(`?id=${id}&period=${period}`);
    await getData(`?period=${period}&nrOfPositions=${nrOfPositions}`);
  };
  useEffect(() => {
    getChartData();
  }, [period, endpoint, nrOfPositions]);
  useEffect(() => {
    if (data) {
      console.log("chartData=", data);
      //   balanceSetter && setBalance(balanceSetter(data));
      setChartData(chartDataSetter(data, period));
      setTableData(tableDataSetter(data));
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

            return "Bilanța vânzărilor pentru fiecare produs constituie: ";
          },
          label: (TooltipItem) => {
            console.log("TooltipItem", TooltipItem);
            let index = 0;
            while (index < nrOfPositions) {
              if (TooltipItem.datasetIndex === index)
                return (
                  TooltipItem.dataset.label + " :   " + TooltipItem.raw + " lei"
                );
              index++;
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
        ticks: {
          callback: function (value, index, values) {
            return formatCurrency(value);
          },
        },
      },
      x: {
        ticks: {
          callback: function (value, index, values) {
            console.log("ticks:", value, index, values);
            if (!(index % 2)) return this.getLabelForValue(value);
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
  const handleSelectChange = (e) => {
    setNrOfPositions(e.target.value);
  };
  const handleDetails = (id) => {
    navigate(`/${navTo}/${id}`);
  };
  return (
    <Card>
      {data && chartData && (
        <>
          <h2 className="chart__title">{title}</h2>
          <div className="chart__table__menu__buttons">
            <div>
              <span>Arată primele </span>
              <SimpleSelect
                name="nrOfProducts"
                id="nrOfProducts"
                defaultValue={nrOfPositions}
                options={nrOfPositionsOptions}
                height="32px"
                handleChange={handleSelectChange}
              />
              <span> produse </span>{" "}
            </div>
            <div className="menu__checkboxes">
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
            </div>
          </div>
          <div className="chart__table__wrapper">
            <div className="chart__container">
              <CustomChart
                chartData={chartData}
                plugins={hoverLine}
                options={chartOptions}
                height="530px"
              />
            </div>
            <div className="table__container">
              <ResponsiveTable data={tableData} handleDetails={handleDetails} />
            </div>
          </div>
        </>
      )}
    </Card>
  );
};

export default ChartTable;
