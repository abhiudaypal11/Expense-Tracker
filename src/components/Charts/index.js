import React from 'react'; 
import { Line, Pie } from '@ant-design/charts';

function ChartComponent({ sortedTransactions }) {
  // Data for the line chart
  const data = sortedTransactions.map((item) => {
    return { date: item.date, amount: item.amount };
  });

  // Filter out expense transactions
  let spendingData = sortedTransactions.filter(
    (transaction) => transaction.type === "expense"
  );

  // Group and sum expenses by tag
  let newSpendings = [
    { tag: "food", amount: 0 },
    { tag: "education", amount: 0 },
    { tag: "bill", amount: 0 },
  ];

  spendingData.forEach((item) => {
    if (item.tag === "food") {
      newSpendings[0].amount += item.amount;
    } else if (item.tag === "education") {
      newSpendings[1].amount += item.amount;
    } else {
      newSpendings[2].amount += item.amount;
    }
  });

  // Filter out income transactions
  let incomeData = sortedTransactions.filter(
    (transaction) => transaction.type === "income"
  );

  // Group and sum incomes by tag
  let newIncomes = [
    { tag: "salary", amount: 0 },
    { tag: "freelancing", amount: 0 },
    { tag: "investments", amount: 0 },
  ];

  incomeData.forEach((item) => {
    if (item.tag === "salary") {
      newIncomes[0].amount += item.amount;
    } else if (item.tag === "freelancing") {
      newIncomes[1].amount += item.amount;
    } else {
      newIncomes[2].amount += item.amount;
    }
  });

  // Config for the line chart
  const config = {
    data: data,
    autoFit: false,
    xField: 'date',
    yField: 'amount',
    width: 550,
  };

  // Config for the spending pie chart
  const spendingConfig = {
    data: newSpendings,
    width: 300,
    angleField: "amount",
    colorField: "tag",
  };

  // Config for the income pie chart
  const incomeConfig = {
    data: newIncomes,
    width: 300,
    angleField: "amount",
    colorField: "tag",
  };

  let chart;
  let pieChart;

  return (
    <div className='charts-wrapper'>
      <div>
        <h2>Your Analytics</h2>
        <Line {...config} onReady={(chartInstance) => (chart = chartInstance)} />
      </div>

      <div>
        <h2>Your Spendings</h2>
        <Pie {...spendingConfig} onReady={(chartInstance) => (pieChart = chartInstance)} />
      </div>

      <div>
        <h2>Your Income</h2>
        <Pie {...incomeConfig} onReady={(chartInstance) => (pieChart = chartInstance)} />
      </div>
    </div>
  );
}

export default ChartComponent;
