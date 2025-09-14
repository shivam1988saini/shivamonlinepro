import React, { useState,useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Favorite } from "@mui/icons-material";
import axios from "axios";


const WishlistPage = () => {
   const [wishlist, setWishlist] = useState([]); // Wishlist state
   const [_error, setError] = useState("");

   useEffect(() => {  
     fetchWishList();
   }, [])


  // ✅ Remove product from wishlist
const handleRemoveFromWishlist = async (productId) => {
  const filteredItems = wishlist.filter((item) => item.productId === productId); 
  if (filteredItems.length > 0) {

    try {
      const response = await axios.delete("http://localhost:8080/wishlistdelete", {
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
      response&&setWishlist((prev) =>
        prev.filter((item) => item.productId !== productId)
      );
    } catch (err) {
      setError("Failed to remove from wishlist");
      console.error("Wishlist Error:", err);
    }
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
          setWishlist(response?.data);
        } catch (err) {
          setError("Failed to fetch users");
          console.error(err);
        }
    };

  const handleOpenDialog = (item) => {
console.log("abc---")
  };

  return (
    <Box sx={{ paddingY: 4 }}>
      <Container sx={{ paddingX: { xs: 2, sm: 4 }, width: "100%" }}>
        <Typography variant="h4" gutterBottom sx={{ textAlign: "center" }}>
          Wishlist
        </Typography>
        <Grid container spacing={4}>
          {wishlist.length === 0 ? (
            <Grid item xs={12}>
              <Typography variant="h6" color="textSecondary" align="center">
                Your wishlist is empty. Start adding items!
              </Typography>
            </Grid>
          ) : (
            wishlist.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item.productId}>
                <Card
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    height: "100%",
                  }}
                >
                  <Box sx={{ position: "relative" }}>
                  <Link to={`/ProductDescriptionPage`} style={{ textDecoration: 'none' }}>
                    <CardMedia
                      component="img"
                      height="200"
                      image={item.image}
                      alt={item.name}
                      sx={{ objectFit: "cover" }}
                    /></Link>

                    <Box
                      onClick={() => handleRemoveFromWishlist(item.productId)}
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
                      <Favorite sx={{ color: "red" }} />
                    </Box>
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="h6">{item.name}</Typography>
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
                      <Typography
                        variant="body1"
                        color="primary"
                        sx={{ mt: 1 }}
                      >
                        ${item.price.toFixed(2)}
                      </Typography>
                    </CardContent>
                    <Box
                      sx={{
                        mt: 1,
                        padding: 1,
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        component={Link}
                        to="/ProductDescriptionPage"
                        onClick={() => handleOpenDialog(item)}
                        sx={{ width: "100%" }}
                      >
                        View Details
                      </Button>
                      {/* <IconButton
                      onClick={() => handleRemoveFromWishlist(item.id)}
                    >
                      <Favorite sx={{ color: 'red' }} />
                    </IconButton> */}
                    </Box>
                  </Box>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default WishlistPage;
