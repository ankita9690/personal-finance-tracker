import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());


mongoose.connect("mongodb+srv://ankitakundliya:Anki1230@cluster0.mx9by2w.mongodb.net/reactprac?retryWrites=true&w=majority") //Replace If you are using Atlas API
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

  //Models
const transactionSchema = new mongoose.Schema({
  amount: Number,
  date: Date,
  description: String,
});

const Transaction = mongoose.model("Transaction", transactionSchema);

// CRUD Operations
app.get("/api/transactions", async (req, res) => {
  const transactions = await Transaction.find();
  res.json(transactions);
});

app.post("/api/transactions", async (req, res) => {
  const { amount, date, description } = req.body;
  const transaction = new Transaction({ amount, date, description });
  await transaction.save();
  res.json(transaction);
});

app.delete("/api/transactions/:id", async (req, res) => {
  await Transaction.findByIdAndDelete(req.params.id);
  res.json({ message: "Transaction deleted" });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});