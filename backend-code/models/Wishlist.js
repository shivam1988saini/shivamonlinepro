const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
  userId: {
    type: String, // assuming users are stored separately
    // required: true,
    // ref: 'User'
  },
  productId: {
    type: String,
    // required: true,
    // ref: 'Product'
  },
  addedAt: {
    type: Date,
    default: Date.now
  },

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

});

const Wishlist = mongoose.model("Wishlists", wishlistSchema);
module.exports = Wishlist;
