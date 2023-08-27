import React, { useEffect } from "react";
import StatisticChart from "../../components/StatisticsChart/StatisticChart";
import getMonthAndYear from "../../functions/getMonthAndYear";
import useGetData from "../../hooks/useGetData";
import DoughnutChart from "../../components/DoughnutChart/DoughnutChart";
import areDateEquals from "../../functions/areDatesEquals";
import ChartTable from "../../components/ChartTable/ChartTable";
import "./Statistics.css";
const getRandomColor = () => {
  const symbols = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color = color + symbols[Math.floor(Math.random() * 16)];
  }
  return color;
};
function getStartOfWeek(date) {
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -7 : 0);
  return new Date(date.setDate(diff));
  //   return new Date(date.setDate(day));
}

function generateWeekStartDates(startDate, endDate) {
  const weekStartDates = [];
  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    weekStartDates.push(currentDate.toISOString());
    currentDate.setDate(currentDate.getDate() + 7); // Move to the next week
  }

  return weekStartDates;
}
const uniqueDates = (arr) => {
  const dates = [];
  arr.forEach((element) => {
    element.sales.forEach((sale) => {
      if (!dates.includes(sale.weekStart)) {
        dates.push(sale.weekStart);
      }
    });
  });
  return dates;
};
const totalBalanceSetter = (data) => {
  return {
    totalAcquisitions: data.reduce((sum, currentValue) => {
      return parseInt(sum) + parseInt(currentValue.totalAcquisitions);
    }, 0),
    totalSales: data.reduce((sum, currentValue) => {
      return parseInt(sum) + parseInt(currentValue.totalSales);
    }, 0),
  };
};
const totalProductsDataSetter = (data) => {
  return {
    labels: data
      .reverse()
      .map((item) => getMonthAndYear(item.weekStart, "RO-ro")),
    datasets: [
      {
        label: "Vânzari",
        data: data.map((item) => item.totalSales),
        backgroundColor: "#4361ee",
        borderColor: "#4361ee",
        type: "line",
      },
      {
        label: "Achiziții",
        data: data.map((item) => item.totalAcquisitions),
        backgroundColor: "#fca311",
        borderColor: "#fca311",
        type: "line",
      },
    ],
  };
};
const topSoldProducts = (data, period) => {
  const today = new Date();
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - period);

  const weekStartDates = generateWeekStartDates(
    getStartOfWeek(sixMonthsAgo),
    getStartOfWeek(today)
  );
  const chartData = weekStartDates.map((day) => {
    const productArray = data.map((product) => {
      let totalSales = 0;
      const targetSalesEntry = product.sales.find((sale) =>
        areDateEquals(sale.weekStart, day)
      );
      if (targetSalesEntry) totalSales = targetSalesEntry.totalSales;
      return {
        [product.name]: totalSales,
      };
    });
    const chartField = {};
    productArray.forEach((pa) => {
      const key = Object.keys(pa)[0];
      const value = pa[key];
      chartField[key.toLowerCase()] = value;
    });
    chartField.weekStart = day;
    console.log("productsArray", chartField);
    return chartField;
  });
  console.log("products DATA", chartData);
  const chartDataSet = [];
  if (chartData.length > 0) {
    const { weekStart, ...firstProd } = chartData[0];
    const keys = Object.keys(firstProd);
    for (const key of keys) {
      const color = getRandomColor();
      chartDataSet.push({
        label: key,
        data: chartData.map((product) => product[key]),
        backgroundColor: color,
        borderColor: color,
        type: "line",
      });
    }
  }
  console.error("PRODdATAsETS", chartDataSet);
  return {
    labels: weekStartDates.map((item) => getMonthAndYear(item, "RO-ro")),
    datasets: [...chartDataSet],
  };
};
const getTopBalance = (data, period) => {
  const today = new Date();
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - period);

  const weekStartDates = generateWeekStartDates(
    getStartOfWeek(sixMonthsAgo),
    getStartOfWeek(today)
  );
  const chartData = weekStartDates.map((day) => {
    const productArray = data.map((product) => {
      let totalSales = 0;
      const targetSalesEntry = product.balance.find((item) =>
        areDateEquals(item.weekStart, day)
      );
      if (targetSalesEntry) totalSales = targetSalesEntry.balance;
      return {
        [product.name]: totalSales,
      };
    });
    const chartField = {};
    productArray.forEach((pa) => {
      const key = Object.keys(pa)[0];
      const value = pa[key];
      chartField[key] = value;
    });
    chartField.weekStart = day;
    console.log("productsArray", chartField);
    return chartField;
  });
  const chartDataSet = [];
  if (chartData.length > 0) {
    const { weekStart, ...firstProd } = chartData[0];
    const keys = Object.keys(firstProd);
    for (const key of keys) {
      const color = getRandomColor();
      chartDataSet.push({
        label: key,
        data: chartData.map((product) => product[key]),
        backgroundColor: color,
        borderColor: color,
        type: "line",
      });
    }
  }
  return {
    labels: weekStartDates.map((item) => getMonthAndYear(item, "RO-ro")),
    datasets: [...chartDataSet],
  };
};
const getTableData = (data) => {
  return data.map((item) => ({
    id: item.id,
    image: item.avatar,
    Produs: item.name,
    ["Vânzări totale"]: item.balance.reduce(
      (sum, element) => sum + element.totalSales,
      0
    ),
    ["Achiziții totale"]: item.balance.reduce(
      (sum, element) => sum + element.totalAcquisitions,
      0
    ),
    Balanța: item.balance.reduce((sum, element) => sum + element.balance, 0),
  }));
};
const doughnutSetter = (data) => {
  return {
    labels: data.map((item) => item.name),
    datasets: [
      {
        type: "doughnut",
        data: data.map((item) => item.sum),
        backgroundColor: data.map(() => getRandomColor()),
        hoverOffset: 4,
      },
    ],
  };
};
const Statistics = () => {
  return (
    <div className="stats">
      <div className="totalBalance">
        <StatisticChart
          endpoint="http://localhost:8080/api/position/getTotalBalance/"
          balanceSetter={totalBalanceSetter}
          chartDataSetter={totalProductsDataSetter}
          title="Bilanțul vânzărilor"
          id="balance"
        />
      </div>
      <div className="todayChart">
        <DoughnutChart
          chartDataSetter={doughnutSetter}
          endpoint="http://localhost:8080/api/position/getLastWeekAcquisitions"
          title="Achiziții săptămîna curentă"
        />
        <DoughnutChart
          chartDataSetter={doughnutSetter}
          endpoint="http://localhost:8080/api/position/getLastWeekSales"
          title="Vânzări săptămîna curentă"
        />
      </div>

      <div className="productBalance ">
        <ChartTable
          endpoint="http://localhost:8080/api/position/getTopBalance/"
          chartDataSetter={getTopBalance}
          tableDataSetter={getTableData}
          title="Cele mai profitabile produse"
          navTo="products"
          id="prod"
        />
      </div>
    </div>
  );
};

export default Statistics;
