// models/Product.js
const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Product title is required"],
    trim: true,
    maxlength: [100, "Title must be under 100 characters"]
  },
  price: {
    type: Number,
    required: [true, "Product price is required"],
    min: [0, "Price must be a positive number"]
  },
  description: {
    type: String,
    required: [true, "Product description is required"],
    maxlength: [1000, "Description too long"]
  },
  image: {
    type: String,
    required: [true, "Product image URL is required"],
    validate: {
      validator: function (value) {
        return /^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)/i.test(value);
      },
      message: "Invalid image URL"
    }
  },
  dateAdded: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('AllProducts', productSchema);
