import React from "react";
import { Box, Container, Typography, Grid, Button } from "@mui/material";
import { Link } from "react-router-dom";
const AboutUs = () => {
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
          About US
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
                Our Story
              </Typography>
              <Typography variant="body1" paragraph>
                Welcome to India Item! We are an eCommerce platform dedicated to
                bringing you the best products from around India. Whether you're
                looking for handmade crafts, home decor, or unique fashion
                pieces, we've got you covered. Our goal is to provide quality
                products and exceptional customer service. Join us on our
                journey to discover the finest items from India, all at your
                fingertips.
              </Typography>
              <Typography variant="body1" paragraph>
                We believe in the beauty of Indian craftsmanship, and our
                mission is to support local artisans while offering our
                customers an exclusive collection of products. Our online store
                is designed to make your shopping experience easy, enjoyable,
                and satisfying.
              </Typography>
            </Box>
            <Box sx={{ padding: 2, textAlign: "left", width: "100%" }}>
              <Typography variant="h5" gutterBottom>
                Our Values
              </Typography>
              <Typography variant="body1" paragraph>
                We are driven by a passion for Indian culture, tradition, and
                craftsmanship. Our values are:
              </Typography>
              <Typography variant="h5" gutterBottom>
                1. Quality Products:
              </Typography>
              <Typography variant="body1" paragraph>
                We ensure that each product in our store meets high-quality
                standards.
              </Typography>

              <Typography variant="h5" gutterBottom>
                2. Supporting Artisans:
              </Typography>
              <Typography variant="body1" paragraph>
                By shopping with us, you are supporting local artisans and small
                businesses from across India.
              </Typography>

              <Typography variant="h5" gutterBottom>
                3. Exceptional Customer Service:
              </Typography>
              <Typography variant="body1" paragraph>
                Our customers are at the heart of everything we do. We ensure a
                smooth and hassle-free shopping experience.
              </Typography>
            </Box>
            <Box sx={{ textAlign: "center", marginTop: 4, width: "100%" }}>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/Contact"
                sx={{ fontSize: 16,textTransform: "none" }}
              >
                Get In Touch With Us
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AboutUs;
