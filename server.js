// server.js
const express = require('express');
const mongoose = require('mongoose');
const productRoutes = require('./backend-code/routes/productRoutes');
const wishlistRoutes = require('./backend-code/routes/wishlistRoutes'); 
const cardlistRoutes = require('./backend-code/routes/cardlistRoutes'); 
const cors = require('cors');


// Middleware
const server = express();
server.use(cors());
server.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/shivammongodatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB error:', err));

// Routes
server.use(productRoutes);
server.use(wishlistRoutes);
server.use(cardlistRoutes);


// Server start
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });




server.listen(8080, () => {
    console.log("Server started on http://localhost:8080");
});

