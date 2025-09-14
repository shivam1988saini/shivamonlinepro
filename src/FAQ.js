import React from "react";
import { Box, Container, Typography, Grid } from "@mui/material";

const FAQ = () => {
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
        <Typography
          variant="h3"
          gutterBottom
          align="center"
          sx={{
            fontSize: { xs: "2rem", sm: "3rem", md: "4rem" },
            marginBottom: 2,
            width: "100%",
          }}
        >
          Frequently Asked Questions (FAQ)
        </Typography>
        <Grid
          container
          spacing={4}
          justifyContent="center"
          sx={{ width: "100%" }}
        >
          <Grid item xs={12}>
            <Box sx={{ padding: 2, textAlign: "left", width: "100%" }}>
              <Typography variant="h5" gutterBottom>
                What is India Item?
              </Typography>
              <Typography variant="body1" paragraph>
                India Item is an eCommerce platform offering a wide range of
                products from India, such as handmade crafts, home decor, and
                fashion items. We provide a seamless online shopping experience
                while supporting local artisans.
              </Typography>
            </Box>

            <Box sx={{ padding: 2, textAlign: "left", width: "100%" }}>
              <Typography variant="h5" gutterBottom>
                How do I place an order?
              </Typography>
              <Typography variant="body1" paragraph>
                To place an order, simply browse through our collection, select
                the products you want, and add them to your cart. Once you're
                ready, proceed to checkout, where you can enter your shipping
                and payment details to complete your purchase.
              </Typography>
            </Box>

            <Box sx={{ padding: 2, textAlign: "left", width: "100%" }}>
              <Typography variant="h5" gutterBottom>
                Do you offer international shipping?
              </Typography>
              <Typography variant="body1" paragraph>
                Yes, we offer international shipping! You can check the shipping
                options and charges during the checkout process based on your
                location.
              </Typography>
            </Box>

            <Box sx={{ padding: 2, textAlign: "left", width: "100%" }}>
              <Typography variant="h5" gutterBottom>
                How can I track my order?
              </Typography>
              <Typography variant="body1" paragraph>
                Once your order has been shipped, you will receive an email with
                tracking information so you can track your package directly with
                the shipping carrier.
              </Typography>
            </Box>

            <Box sx={{ padding: 2, textAlign: "left", width: "100%" }}>
              <Typography variant="h5" gutterBottom>
                Can I return or exchange an item?
              </Typography>
              <Typography variant="body1" paragraph>
                Yes, we have a return and exchange policy. Please refer to our
                Return Policy page for more details on how to return or exchange
                your products.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default FAQ;
