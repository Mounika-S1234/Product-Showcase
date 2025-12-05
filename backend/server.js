require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

// Default route
app.get("/", (req, res) => {
  res.send("Backend server is running successfully!");
});

// Sample products API route
app.get("/products", (req, res) => {
  res.json([
    { id: 1, name: "Laptop", price: 50000 },
    { id: 2, name: "Phone", price: 20000 },
  ]);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
