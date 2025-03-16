// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";

// const app = express();
// app.use(express.json());
// // app.use(cors());
// const corsOptions = {
//   origin: "https://your-frontend.onrender.com", // Replace with your actual frontend URL
//   methods: "GET,POST,DELETE",
//   credentials: true,
// };
// app.use(cors(corsOptions));


// mongoose.connect("mongodb+srv://ankitakundliya:Anki1230@cluster0.mx9by2w.mongodb.net/reactprac?retryWrites=true&w=majority") //Replace If you are using Atlas API
//   .then(() => console.log("Connected to MongoDB"))
//   .catch((err) => console.error("Failed to connect to MongoDB", err));

//   //Models
// const transactionSchema = new mongoose.Schema({
//   amount: Number,
//   date: Date,
//   description: String,
// });

// const Transaction = mongoose.model("Transaction", transactionSchema);

// // CRUD Operations
// app.get("/api/transactions", async (req, res) => {
//   const transactions = await Transaction.find();
//   res.json(transactions);
// });

// app.post("/api/transactions", async (req, res) => {
//   const { amount, date, description } = req.body;
//   const transaction = new Transaction({ amount, date, description });
//   await transaction.save();
//   res.json(transaction);
// });

// app.delete("/api/transactions/:id", async (req, res) => {
//   await Transaction.findByIdAndDelete(req.params.id);
//   res.json({ message: "Transaction deleted" });
// });

// const PORT = 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });

import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
app.use(express.json());

// CORS Configuration
const corsOptions = {
  origin: "https://personal-finance-tracker-1-w4ce.onrender.com", // Your frontend URL
  methods: "GET, POST, DELETE",
  credentials: true,
};
app.use(cors(corsOptions));

// MongoDB Connection
mongoose.connect("your-mongodb-uri", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

// Transaction Model
const transactionSchema = new mongoose.Schema({
  amount: Number,
  date: Date,
  description: String,
});

const Transaction = mongoose.model("Transaction", transactionSchema);

// API Routes
app.get("/api/transactions", async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/transactions", async (req, res) => {
  try {
    const { amount, date, description } = req.body;
    const transaction = new Transaction({ amount, date, description });
    await transaction.save();
    res.json(transaction);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/transactions/:id", async (req, res) => {
  try {
    await Transaction.findByIdAndDelete(req.params.id);
    res.json({ message: "Transaction deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Default Route (Prevents "Cannot GET /" Issue)
app.get("/", (req, res) => {
  res.send("Backend is running! Use /api/transactions to fetch data.");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
