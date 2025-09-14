import React from "react";
import { Container, Typography, Box, Grid } from "@mui/material";

const PrivacyPolicy = () => {
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
          Privacy Policy
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
                Introduction
              </Typography>
              <Typography variant="body1" paragraph>
                At India Item, we value your privacy and are committed to
                protecting your personal information. This Privacy Policy
                outlines the types of data we collect, how it is used, and the
                steps we take to safeguard your information when you visit our
                website or interact with us.
              </Typography>

              <Typography variant="h5" gutterBottom>
                Information We Collect
              </Typography>
              <Typography variant="body1" paragraph>
                We collect personal information that you provide directly to us,
                such as when you create an account, place an order, or contact
                customer support. This information may include:
              </Typography>
              <Box sx={{ marginLeft: 2 }}>
                <Typography variant="body1" paragraph>
                  - Name, email address, phone number, and shipping address
                </Typography>
                <Typography variant="body1" paragraph>
                  - Payment information (credit card details, etc.)
                </Typography>
                <Typography variant="body1" paragraph>
                  - Browsing activity, including products viewed and search
                  queries
                </Typography>
              </Box>

              <Typography variant="h5" gutterBottom>
                How We Use Your Information
              </Typography>
              <Typography variant="body1" paragraph>
                We use your personal information for the following purposes:
              </Typography>
              <Box sx={{ marginLeft: 2 }}>
                <Typography variant="body1" paragraph>
                  - To process and fulfill your orders
                </Typography>
                <Typography variant="body1" paragraph>
                  - To communicate with you about your orders, promotions, and
                  customer support
                </Typography>
                <Typography variant="body1" paragraph>
                  - To improve the user experience on our website
                </Typography>
                <Typography variant="body1" paragraph>
                  - To analyze and improve our products and services
                </Typography>
              </Box>

              <Typography variant="h5" gutterBottom>
                Data Security
              </Typography>
              <Typography variant="body1" paragraph>
                We take data security seriously and employ a variety of security
                measures to protect your personal information, including
                encryption and secure servers. However, please be aware that no
                method of transmission over the internet is 100% secure, and we
                cannot guarantee absolute security.
              </Typography>

              <Typography variant="h5" gutterBottom>
                Your Rights
              </Typography>
              <Typography variant="body1" paragraph>
                You have the right to access, update, or delete your personal
                information at any time. If you wish to make any changes or have
                any concerns regarding your personal information, please contact
                us.
              </Typography>

              <Typography variant="h5" gutterBottom>
                Cookies
              </Typography>
              <Typography variant="body1" paragraph>
                We use cookies to enhance your experience on our website,
                analyze site traffic, and personalize content. You can manage
                your cookie preferences through your browser settings.
              </Typography>

              <Typography variant="h5" gutterBottom>
                Changes to This Policy
              </Typography>
              <Typography variant="body1" paragraph>
                We may update this Privacy Policy from time to time. Any changes
                will be posted on this page, and the updated policy will be
                effective immediately upon posting.
              </Typography>

              <Typography variant="h5" gutterBottom>
                Contact Us
              </Typography>
              <Typography variant="body1" paragraph>
                If you have any questions or concerns about our privacy
                practices, please contact us at:
              </Typography>
              <Typography variant="body1" paragraph>
                Email: support@indiaitem.com
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default PrivacyPolicy;
