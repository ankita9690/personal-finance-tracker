import React, { useState } from "react";
import { Button, TextField } from "@mui/material";

const TransactionForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    amount: "",
    date: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ amount: "", date: "", description: "" }); 
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <TextField
        type="number"
        name="amount"
        label="Amount"
        value={formData.amount}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        type="date"
        name="date"
        label="Date"
        value={formData.date}
        onChange={handleChange}
        fullWidth
        margin="normal"
        InputLabelProps={{ shrink: true }}
        required
      />
      <TextField
        type="text"
        name="description"
        label="Description"
        value={formData.description}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />
      <Button type="submit" variant="contained" color="primary">
        Add Transaction
      </Button>
    </form>
  );
};

export default TransactionForm;