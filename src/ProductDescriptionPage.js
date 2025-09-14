import React from 'react';
import { Grid, Container, Typography, Button, Paper, Box, IconButton, Chip } from '@mui/material';
import { AddShoppingCart } from '@mui/icons-material';
import { Rating } from '@mui/material'; // For product rating
import { Link } from "react-router-dom";

function ProductDescriptionPage() {
  const product = {
    title: "Unstitched Salwar Suit",
    description:
      "This elegant unstitched salwar suit set includes a top, bottom, and dupatta made from premium fabric, allowing you to customize the outfit as per your measurements. Perfect for weddings, festivals, or any special occasion.",
    price: 1500, // Price of the unstitched salwar suit
    images: [
      'https://via.placeholder.com/600x400?text=Unstitched+Salwar+Suit+1',  // Replace with actual image URLs
      'https://via.placeholder.com/600x400?text=Unstitched+Salwar+Suit+2',
    ],
    features: [
      'Premium quality fabric (Cotton, Georgette, Chanderi Silk)',
      'Unstitched for customization',
      'Perfect for weddings, festivals, and parties',
      'Includes top, bottom, and dupatta for a complete set'
    ],
    rating: 4.5,
    availableColors: ['#FF5733', '#33FF57', '#3357FF'], // Color hex codes
    availableSizes: ['Free Size (Unstitched)', 'Customizable'], // Updated for unstitched
    whatsInBox: [
      'Unstitched Top',
      'Unstitched Bottom',
      'Unstitched Dupatta'
    ]
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        minHeight: "100vh",
        width: "100%",
        paddingY: 4,
      }}
    >
      <Container sx={{ paddingX: { xs: 2, sm: 4 }, width: "100%" }}>
        <Grid container spacing={4}>
          {/* Product Images */}
          <Grid item xs={12} md={6}>
            <Paper elevation={3}>
              <Box>
                <img
                  src={product.images[0]}
                  alt="product"
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '10px',
                    objectFit: 'cover',
                  }}
                />
              </Box>
            </Paper>
          </Grid>

          {/* Product Information */}
          <Grid item xs={12} md={6}>
            <Typography variant="h4" component="h1" gutterBottom>
              {product.title}
            </Typography>

            <Typography variant="h6" color="primary" gutterBottom>
              ₹{product.price}
            </Typography>

            <Box>
              <Rating
                name="product-rating"
                value={product.rating}
                precision={0.5}
                readOnly
                size="large"
              />
            </Box>

            <Typography variant="body1" paragraph>
              {product.description}
            </Typography>

            {/* Product Features */}
            <Typography variant="h6" gutterBottom>
              Features:
            </Typography>
            <ul>
              {product.features.map((feature, index) => (
                <li key={index}>
                  <Typography variant="body1">{feature}</Typography>
                </li>
              ))}
            </ul>

            {/* Color Options */}
            <Typography variant="h6" gutterBottom>
              Available Colors:
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              {product.availableColors.map((color, index) => (
                <Chip
                  key={index}
                  sx={{ backgroundColor: color, cursor: 'pointer' }}
                  variant="filled"
                  label=""
                  style={{ width: 30, height: 30, borderRadius: '50%' }}
                />
              ))}
            </Box>

            {/* Size Options */}
            <Typography variant="h6" gutterBottom>
              Available Sizes:
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              {product.availableSizes.map((size, index) => (
                <Button key={index} variant="outlined" color="primary">
                  {size}
                </Button>
              ))}
            </Box>

            {/* Buttons */}
            <Box sx={{ mt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    startIcon={<AddShoppingCart />}
                  >
                    Add to Cart
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    variant="contained"
                    color="secondary"
                    fullWidth
                    component={Link} to="/AddressConfirmation"
                  >
                    Buy Now
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>

        {/* Shop with Confidence Section */}
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="h6" color="textSecondary">
            Shop with Confidence
          </Typography>
          <Typography variant="body1" color="textSecondary" paragraph>
            100% Secure Payment | Free Shipping on Orders Above ₹1000 | 30-Day Return Policy
          </Typography>
        </Box>

        {/* What's in the Box */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            What's in the Box:
          </Typography>
          <ul>
            {product.whatsInBox.map((item, index) => (
              <li key={index}>
                <Typography variant="body1">{item}</Typography>
              </li>
            ))}
          </ul>
        </Box>
      </Container>
    </Box>
  );
}

export default ProductDescriptionPage;
