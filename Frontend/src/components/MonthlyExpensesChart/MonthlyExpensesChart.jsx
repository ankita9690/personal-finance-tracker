import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"; // Imported the Given Chart Lib

const MonthlyExpensesChart = ({ transactions }) => {
  const formatDataForChart = () => {
    const monthlyExpenses = {};
    transactions.forEach((transaction) => {
      const month = new Date(transaction.date).toLocaleString("default", { month: "short" });
      monthlyExpenses[month] = (monthlyExpenses[month] || 0) + transaction.amount;
    });
    return Object.keys(monthlyExpenses).map((month) => ({
      month,
      amount: monthlyExpenses[month],
    }));
  };

  const data = formatDataForChart();

  return (
    <div>
      <h2 className="text-xl font-bold mt-4 mb-2">Monthly Expenses</h2>
      <BarChart width={500} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="amount" fill="#8884d8" />
      </BarChart>
    </div>
  );
};

export default MonthlyExpensesChart;