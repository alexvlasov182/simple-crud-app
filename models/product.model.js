const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter product name"],
      trim: true,
    },

    quantity: {
      type: Number,
      required: true,
      default: 0,
      min: [0, "Quantity cannot be negative"],
    },
    price: {
      type: Number,
      required: true,
      default: 0,
      min: [0, "Price cannot be negative"],
    },
    image: {
      type: String,
      required: false,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
