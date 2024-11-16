const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./models/product.model");

// Initialize app
const app = express();
app.use(express.json());

// Base route
app.get("/", (req, res) => {
  res.send("Node.js API REST!");
});

// Route Handlers
const createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Error creating product" });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching products" });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching product" });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product successfully deleted", product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Product have been deleted" });
  }
};

// API routes
app.post("/api/products", createProduct);
app.get("/api/products", getAllProducts);
app.get("/api/products/:id", getProductById);
app.put("/api/products/:id", updateProduct);
app.delete("/api/products/:id", deleteProduct);

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
