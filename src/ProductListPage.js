import React, { useState,useEffect } from "react";
import axios from "axios";
import {
  Grid,
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Box,
  TextField,
} from "@mui/material";
import { AddShoppingCart, FavoriteBorder, Favorite } from "@mui/icons-material";
import { Link } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // import carousel styles
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ProductListPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]); // Wishlist state
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  
   useEffect(() => {  
     fetchProductsList();
     fetchWishList();
  }, []); 
    // Filtering users whenever `users` or `searchQuery` changes
  useEffect(() => {
    const filtered = users.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [users, searchQuery]);

  // Define async function inside useEffect
  const fetchProductsList = async () => {
      try {
        const response = await axios.get("http://localhost:8080/users", {
        headers: {
          "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("dgfdgdgdgd")}`
        }
        });
        setUsers(response.data);
      } catch (err) {
        setError("Failed to fetch users");
        console.error(err);
      }
  };

  const fetchWishList = async () => {
      try {
        const response = await axios.get("http://localhost:8080/wishlistitem", {
        headers: {
          "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("dgfdgdgdgd")}`
        }
        });
        setWishlist(response.data);
      } catch (err) {
        setError("Failed to fetch users");
        console.error(err);
      }
  };

  const handleAddToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
    console.log(`${product.title} added to cart!`);
  };

  // Add product from wishlist
const handleAddToWishlist = async (product,path) => {
  // ✅ Check if product is already in wishlist — skip if it is
  console.log("product",product)
    const filteredItems = wishlist.filter((item) => item.productId === product._id); 
  if (filteredItems?.length===0) {
  try {
    const response = await axios.post(
      `http://localhost:8080/${path}`,
      {
        userId: "64f96a3f2d889a41cc0ee123",      // Replace with dynamic userId if needed
        productId: product._id,
        title:product.title,
        price:product.price,
        description:product.description,
        image:product.image                   // product._id from the passed product
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("dgfdgdgdgd")}`
        }
      }
    );

    // ✅ Add new wishlist item to local state
    if (response?.data) {
  setWishlist((prev) => [...prev, response.data]);
}



  } catch (err) {
    setError("Failed to add to wishlist");
    console.error("Wishlist Error:", err);
  }
  }
};


  // Add product from Cradlist
const handleAddToCardlist = async (product,path) => {

  try {
    const response = await axios.post(
      `http://localhost:8080/${path}`,
      {
        userId: "64f96a3f2d889a41cc0ee123",      // Replace with dynamic userId if needed
        productId: product._id,
        title:product.title,
        price:product.price,
        description:product.description,
        image:product.image,
        quantity:1                  // product._id from the passed product
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("dgfdgdgdgd")}`
        }
      }
    );
        // ✅ Add new wishlist item to local state
    if (response?.data) {
      toast.success("Product added successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        pauseOnHover: true,
        draggable: true,
      });
    }
  } catch (err) {
    toast.error("Failed to add product to the list.", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      pauseOnHover: true,
      draggable: true,
    });
    console.error("Cardlist Error:", err);
  }
};






// ✅ Remove product from wishlist
const handleRemoveToWishlist = async (product,path) => {
  const filteredItems = wishlist.filter((item) => item.productId === product._id); 

  if (filteredItems.length > 0) {

    try {
      const response = await axios.delete(`http://localhost:8080/${path}`, {
        data: {
          userId: "64f96a3f2d889a41cc0ee123", // Replace with dynamic userId if needed
          productId: product._id
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("dgfdgdgdgd")}`
        }
      });

      // ✅ Remove item from local wishlist state
      response&&setWishlist((prev) =>
        prev.filter((item) => item.productId !== product._id)
      );
    } catch (err) {
      setError("Failed to remove from wishlist");
      console.error("Wishlist Error:", err);
    }
  }
};




  return (
    <Box sx={{ paddingY: 4 }}>
      <Container sx={{ paddingX: { xs: 2, sm: 4 }, width: "100%" }}>
        {/* Search Bar */}
        <Box sx={{ mb: 4 }}>
          <TextField
            label="Search Products"
            variant="outlined"
            fullWidth
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ marginBottom: 1 }}
          />
        </Box>

        {/* Grid to display filtered products */}
        <Grid container spacing={2}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product._id}>
                <Card sx={{ maxWidth: 345 }}>
                  <Box sx={{ position: "relative" }}>
                  {/* <Link to={`/ProductDescriptionPage/${product.id}`} style={{ textDecoration: 'none' }}> */}
                  <Link to={`/ProductDescriptionPage`} style={{ textDecoration: 'none' }}>
                    <CardMedia
                      component="img"
                      alt={product.name}
                      height="200"
                      image={product.image}
                      title={product.title}
                    /></Link>
                    {/* Wishlist Icon */}
                    <Box
                      
                      sx={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        backgroundColor: "rgba(255, 255, 255, 0.7)",
                        borderRadius: "50%",
                        padding: 1,
                        cursor: "pointer",
                      }}
                    >
                    {/* {product?.wishlist?( */}
                      {wishlist.some((item) => item.productId === product._id) ? (
                      
                        <Favorite sx={{ color: "red" }} onClick={() => handleRemoveToWishlist(product,'wishlistdelete')}/>
                      ) : (
                        <FavoriteBorder sx={{ color: "gray" }} onClick={() => handleAddToWishlist(product,'wishlistAdd')}/>
                      )}
                    </Box>
                  </Box>
                  <CardContent>
                    <Typography variant="h6">{product.title}</Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{
                        mt: 1,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {product?.description}
                    </Typography>
                    <Typography variant="body1" color="primary" sx={{ mt: 1 }}>
                      ${product.price.toFixed(2)}
                    </Typography>
                  </CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      p: 2,
                    }}
                  >
                    {/* Add to Cart Button */}
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<AddShoppingCart />}
                      onClick={() => handleAddToCardlist(product,'cardlistAdd')}
                    >
                      Add to Cart
                    </Button>
                    {/* View Details Button */}
                    <Button
                      color="primary"
                      variant="outlined"
                      sx={{ textTransform: "none" }}
                      component={Link}
                      to="/ProductDescriptionPage"
                    >
                      View Details
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Typography variant="h6" color="text.secondary" align="center">
                No products found for {searchQuery}
              </Typography>
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  );
}

export default ProductListPage;
