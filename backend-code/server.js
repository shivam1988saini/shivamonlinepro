// server.js
const express = require('express');
const mongoose = require('mongoose');
const productRoutes = require('./routes/productRoutes');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/yourdbname', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB error:', err));

// Routes
app.use('/api/products', productRoutes);

// Server start
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });
server.listen(8080, () => {
    console.log("Server started on http://localhost:8080");
});

