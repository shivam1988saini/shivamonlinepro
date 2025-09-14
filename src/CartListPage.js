import React, { useState,useEffect } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  IconButton,
  Box,
  TextField,
} from "@mui/material";
import { Link } from "react-router-dom";
import {
  RemoveShoppingCart,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import axios from "axios";


function CartListPage() {
  const [cartItems, setCartItems] = useState([]);
  const [viewDetails, setViewDetails] = useState(null); // Track which product details are viewed
     const [_error, setError] = useState("");
   useEffect(() => {  
     fetchCardList();
   }, [])

  // Handle quantity change
  // const handleQuantityChange = (id, quantity) => {
  //   setCartItems(
  //     cartItems.map((item) =>
  //       item.id === id ? { ...item, quantity: parseInt(quantity) } : item
  //     )
  //   );
  // 

  const handleQuantityChange = async (id, newQuantity, productId) => {
  const quantity = parseInt(newQuantity);

  if (newQuantity > 0) {
    // Quantity is zero or less – remove the item
    await handleRemoveFromCardlist(id, quantity, productId);
  } else {
    // Update quantity locally (could also send PATCH to backend if needed)
   //await handleRemoveAllCardlist(productId);
    
      setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  }
};


    const fetchCardList = async () => {
        try {
          const response = await axios.get("http://localhost:8080/cardlistitem", {
          headers: {
            "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("dgfdgdgdgd")}`
          }
          });
          setCartItems(response?.data);
        } catch (err) {
          setError("Failed to fetch users");
          console.error(err);
        }
  };

    // ✅ Remove product from cardlist
const handleRemoveFromCardlist = async (id, quantity, productId) => {
console.log("quantity",quantity)
    try {
      const response = await axios.delete("http://localhost:8080/cardlistdelete", {
        data: {
          userId: "64f96a3f2d889a41cc0ee123", // Replace with dynamic userId if needed
          productId: productId
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("dgfdgdgdgd")}`
        }
      });

      // ✅ Remove item from local wishlist state
      if(response&&quantity>0)setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
      
    );
     if(response&&quantity===0)setCartItems((prev) =>
        prev.filter((item) => item.productId !== productId)
      );
    } catch (err) {
      setError("Failed to remove from wishlist");
      console.error("Wishlist Error:", err);
    }
};

    // ✅ Remove product from cardlist
const handleRemoveAllCardlist = async (id, quantity, productId) => {

    try {
      const response = await axios.delete("http://localhost:8080/cardlistdelete", {
        data: {
          userId: "64f96a3f2d889a41cc0ee123", // Replace with dynamic userId if needed
          productId: productId
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("dgfdgdgdgd")}`
        }
      });

      // ✅ Remove item from local wishlist state
      response&&setCartItems((prev) =>
        prev.filter((item) => item.productId !== productId)
      );
    } catch (err) {
      setError("Failed to remove from wishlist");
      console.error("Wishlist Error:", err);
    }
};

  // Handle toggling the view of product details
  const handleToggleView = (id) => {
    setViewDetails(viewDetails === id ? null : id); // Toggle between null (hidden) and product ID (visible)
  };

  // Calculate total price
  const getTotalPrice = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Shopping Cart
      </Typography>

      <Grid container spacing={4}>
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Card sx={{ display: "flex", flexDirection: "column" }}>
              <Link to={`/ProductDescriptionPage`} style={{ textDecoration: 'none' }}>
                <CardMedia
                  component="img"
                  alt={item.title}
                  height="200"
                  image={item.image}
                  sx={{ objectFit: "cover" }}
                /></Link>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6">{item.title}</Typography>
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
                    {item?.description}
                  </Typography>
                  <Typography variant="body1" color="primary" sx={{ mt: 1 }}>
                    ${item.price.toFixed(2)}
                  </Typography>

                 

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mt: 2,
                    }}
                  >
                    <TextField
  label="Quantity"
  type="number"
  value={item.quantity}
  onChange={(e) => {
    const value = e.target.value;
    if (value >= 0 || value === "") {
      handleQuantityChange(item.id, value, item.productId);
    }
  }}
  size="small"
  sx={{ width: "60%" }}
/>
                    <IconButton
                      color="primary"
                      onClick={() => handleToggleView(item.id)}
                      component={Link}
                      to="/ProductDescriptionPage"
                    >
                      {viewDetails === item.id ? (
                        <Visibility />
                      ) : (
                        <VisibilityOff />
                      )}
                    </IconButton>
                    {/* {viewDetails === item.id && (
                      <Typography variant="body2" sx={{ mt: 2 }}>
                        {item.description} 
                      </Typography>
                    )} */}
                    <IconButton
                      color="primary"
                      onClick={() => handleRemoveAllCardlist(item.id, item.quantity, item.productId)}
                    >
                      <RemoveShoppingCart sx={{ color: "primary" }} />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography variant="h6" color="textSecondary" align="center">
              Your cart is empty.
            </Typography>
          </Grid>
        )}
      </Grid>

      {cartItems.length > 0 && (
        <Box sx={{ display: "flex", flexDirection: "column", mt: 4 }}>
          {/* Container for the Total Cost and Checkout Button */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
          >
            <Typography variant="h6" sx={{ marginRight: 2 }}>
              Total: ${getTotalPrice()}
            </Typography>

            {/* Button on the right */}
            <Button
              variant="contained"
              color="primary"
              to="/AddressConfirmation"
              sx={{
                marginTop: 2,
                width: { xs: "100%", sm: "auto" }, // 100% width on mobile, auto width on larger screens
                maxWidth: "300px", // Set a maximum width for the button on larger screens
                marginLeft: 2, // Add spacing between total and button
              }}
              component={Link}
            >
              Proceed to Checkout
            </Button>
          </Box>
        </Box>
      )}
    </Container>
  );
}

export default CartListPage;
