const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
        },

        quality: {
            type: Number,
            required: true
        }
    }
)