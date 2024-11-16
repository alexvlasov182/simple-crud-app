const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const productRoutes = require("./routes/productRoutes");

// Initialize app
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Base route
app.get("/", (req, res) => {
  res.send("Node.js API REST! && Clean Architecture");
});

// API routes
app.use("/api", productRoutes);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to mongodb");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch(() => {
    console.log("Connection failed");
  });
