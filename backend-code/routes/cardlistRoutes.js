const express = require('express');
const Cardlist = require('../models/Cardlist'); // path to your Cardlist model
const router = express.Router();

// Add /cardlist
// Add /cardlist
router.post('/cardlistAdd', async (req, res) => {
  const { userId, productId, title, price, description, image, quantity = 1 } = req.body;

  if (!userId || !productId) {
    return res.status(400).json({ error: "userId and productId are required" });
  }

  try {
    // Check if the item already exists for this user
    const existingItem = await Cardlist.findOne({ userId, productId });

    if (existingItem) {
      // If it exists, increment the quantity
      existingItem.quantity += quantity;
      const updatedItem = await existingItem.save();
      return res.status(200).json(updatedItem);
    }

    // If it doesn't exist, create a new entry
    const newItem = new Cardlist({
      userId,
      productId,
      title,
      price,
      description,
      image,
      quantity,
    });

    const result = await newItem.save();
    res.status(201).json(result);

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// Get all cardlist items
router.get('/cardlistitem', async (req, res) => {
//     const items = await Cardlist.find().populate('productId').populate('userId');
    try {
      const items = await Cardlist.find({});
      res.status(200).json(items);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
});

// DELETE /cardlist
router.delete('/cardlistdelete1', async (req, res) => {
  const { userId, productId } = req.body;

  if (!userId || !productId) {
    return res.status(400).json({ message: "userId and productId are required" });
  }

  try {
    // ✅ Use the model directly
    const deletedItem = await Cardlist.findOneAndDelete({ userId, productId });

    if (!deletedItem) {
      return res.status(404).json({ message: "Cardlist item not found" });
    }

    res.status(200).json({
      message: "Cardlist item deleted successfully",
      deletedItem
    });
  } catch (err) {
    console.error("Error deleting cardlist item:", err);
    res.status(500).json({ error: err.message });
  }
});


// DELETE /cardlist
router.delete('/cardlistdelete', async (req, res) => {
  const { userId, productId } = req.body;

  if (!userId || !productId) {
    return res.status(400).json({ message: "userId and productId are required" });
  }

  try {
    // Find the item in the cart
    const existingItem = await Cardlist.findOne({ userId, productId });

    if (!existingItem) {
      return res.status(404).json({ message: "Cardlist item not found" });
    }

    if (existingItem.quantity > 1) {
      // Decrease the quantity by 1
      existingItem.quantity -= 1;
      const updatedItem = await existingItem.save();
      return res.status(200).json({
        message: "Quantity decreased by 1",
        item: updatedItem
      });
    } else {
      // Quantity is 1 → delete the item
      await Cardlist.deleteOne({ userId, productId });
      return res.status(200).json({
        message: "Cardlist item deleted as quantity reached 0"
      });
    }

  } catch (err) {
    console.error("Error updating/deleting cardlist item:", err);
    res.status(500).json({ error: err.message });
  }
});



// const products = [
// {
//     "userId": "64f96a3f2d889a41cc0ee123",
//     "productId": "68ae133df2acf33eb1dce3d1",
//     "title": "Wireless Bluetooth Headphones",
//     "price": 99.99,
//     "description": "A high-end smartphone with great features.",
//     "image": "https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
// }
// ];

// const seedProducts = async () => {
//   await Cardlist.deleteMany();
//   await Cardlist.insertMany(products);
//   console.log("Products seeded!");
//   //mongoose.disconnect();
// };

// seedProducts();

module.exports = router;
