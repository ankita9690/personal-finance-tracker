import React, { useState, useEffect } from "react";
import axios from "axios";
import TransactionForm from "./components/TransactionForm/TransactionForm";
import TransactionList from "./components/TransactionList/TransactionList";
import MonthlyExpensesChart from "./components/MonthlyExpensesChart/MonthlyExpensesChart";

const API_URL = "http://localhost:5000/api/transactions";    // API Connection

function App() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    const response = await axios.get(API_URL);
    setTransactions(response.data);
  };

  const handleAddTransaction = async (formData) => {
    await axios.post(API_URL, formData);
    fetchTransactions();
  };

  const handleDeleteTransaction = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchTransactions();
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Personal Finance Visualizer</h1>
      <TransactionForm onSubmit={handleAddTransaction} />
      <TransactionList transactions={transactions} onDelete={handleDeleteTransaction} />
      <MonthlyExpensesChart transactions={transactions} />
    </div>
  );
}

export default App;