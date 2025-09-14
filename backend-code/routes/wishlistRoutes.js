const express = require('express');
const Wishlist = require('../models/Wishlist'); // path to your Wishlist model
const router = express.Router();

// POST /wishlist
router.post('/wishlistAdd', async (req, res) => {
    const { userId, productId,title,price,description,image } = req.body;
    if (!userId || !productId) {
        return res.status(400).json({ error: "userId and productId are required" });
    }
  try {
    const wishlistItem = new Wishlist({ userId, productId,title,price,description,image });
    const result = await wishlistItem.save();
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// POST /wishlist
// router.post('/wishlist', async (req, res) => {
//     const { userId, productId } = req.body;
//     if (!userId || !productId) {
//       return res.status(400).json({ error: "userId and productId are required" });
//     }
//   try {
//     const result=await Wishlist.insertMany(req.body);
//     res.status(201).json(result);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// // Get all wishlist items
// router.get('/wishlist', async (req, res) => {
//   try {
//     const items = await Wishlist.find().populate('productId').populate('userId');
//     res.status(200).json(items);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// Get all wishlist items
router.get('/wishlistitem', async (req, res) => {
//     const items = await Wishlist.find().populate('productId').populate('userId');
    try {
      const items = await Wishlist.find({});
      res.status(200).json(items);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
});

// Get wishlist by user
router.get('/wishlist/user/:userId', async (req, res) => {
  try {
    const items = await Wishlist.find({ userId: req.params.userId }).populate('productId');
    res.status(200).json(items);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// // DELETE /wishlist/:id
// router.delete('/wishlist/:id', async (req, res) => {
//   const id = req.params.id;
//   console.log("Deleting wishlist item with ID:", id);

//   try {
//     const deletedItem = await Wishlist.findByIdAndDelete(id);

//     if (!deletedItem) {
//       return res.status(404).json({ message: "Wishlist item not found" });
//     }

//     res.status(200).json({
//       message: "Wishlist item deleted successfully",
//       deletedItem
//     });
//   } catch (err) {
//     console.error("Error deleting wishlist item:", err);
//     res.status(500).json({ error: err.message });
//   }
// });

// // DELETE /wishlist
// router.delete('/wishlist', async (req, res) => {
//   const { userId, productId } = req.body;

//   if (!userId || !productId) {
//     return res.status(400).json({ message: "userId and productId are required" });
//   }

//   try {
//     const deletedItem = new Wishlist({ userId, productId });
//     const result = await deletedItem.findOneAndDelete({ userId, productId });

//     if (!result) {
//       return res.status(404).json({ message: "Wishlist item not found" });
//     }

//     res.status(200).json({
//       message: "Wishlist item deleted successfully",
//       result
//     });
//   } catch (err) {
//     console.error("Error deleting wishlist item:", err);
//     res.status(500).json({ error: err.message });
//   }
// });


// DELETE /wishlist
router.delete('/wishlistdelete', async (req, res) => {
  const { userId, productId } = req.body;

  if (!userId || !productId) {
    return res.status(400).json({ message: "userId and productId are required" });
  }

  try {
    // ✅ Use the model directly
    const deletedItem = await Wishlist.findOneAndDelete({ userId, productId });

    if (!deletedItem) {
      return res.status(404).json({ message: "Wishlist item not found" });
    }

    res.status(200).json({
      message: "Wishlist item deleted successfully",
      deletedItem
    });
  } catch (err) {
    console.error("Error deleting wishlist item:", err);
    res.status(500).json({ error: err.message });
  }
});





// Update wishlist item (optional, rarely used)
router.put('/wishlist/:id', async (req, res) => {
  try {
    const result = await Wishlist.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// const products = [
// {
//   "userId": "64f96a3f2d889a41cc0ee123",
//   "productId": "64f9699f2d889a41cc0ee122"
// }
// ];

// const seedProducts = async () => {
//   await Wishlist.deleteMany();
//   await Wishlist.insertMany(products);
//   console.log("Products seeded!");
//   //mongoose.disconnect();
// };

// seedProducts();

module.exports = router;
