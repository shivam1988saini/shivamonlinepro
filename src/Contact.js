import React from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
} from "@mui/material";

const Contact = () => {
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
          Contact Us
        </Typography>

        <Grid container spacing={1}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>
              Our Office
            </Typography>
            <Typography variant="body1" paragraph>
              India Item, 17/3 Ramji Nagar Kaharai Mod Shamabad Road, Agra,
              India
            </Typography>
            <Typography variant="body2" paragraph>
              Email: support@indiaitem.com
            </Typography>
            <Typography variant="body2" paragraph>
              Phone: +91 9528885228
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                padding: 3,
                backgroundColor: "#fff",
                borderRadius: 2,
                boxShadow: 2,
              }}
            >
              <Typography variant="h5" gutterBottom>
                Get In Touch
              </Typography>
              <Typography variant="body1" paragraph>
                Have a question or need assistance? We're here to help! Fill out
                the form below, and we'll get back to you as soon as possible.
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  marginTop: 2,
                }}
              >
                <TextField label="Name" variant="outlined" fullWidth required />
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  required
                  type="email"
                />
                <TextField
                  label="Message"
                  variant="outlined"
                  fullWidth
                  required
                  multiline
                  rows={4}
                />
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ alignSelf: "center", marginTop: 2 }}
                >
                  Submit
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Contact;
