// seeder.js
const mongoose = require('mongoose');
const Product = require('./models/Product');

mongoose.connect('mongodb://localhost:27017/yourdbname', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const products = [
  {
    title: "Wireless Bluetooth Headphones",
    price: 99.99,
    description: "A high-end smartphone with great features.",
    image:
      "https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    title: "Stylish Laptop",
    price: 1299.99,
    description:
      "Noise-canceling headphones for a premium listening experience.",
    image:
      "https://images.pexels.com/photos/1601073/pexels-photo-1601073.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
];

const seedProducts = async () => {
  await Product.deleteMany();
  await Product.insertMany(products);
  console.log("Products seeded!");
  mongoose.disconnect();
};

seedProducts();
