// TermsOfService.js
import React from 'react';
import { Container, Typography, Box, Grid } from '@mui/material';

const TermsOfService = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        minHeight: '100vh',
        width: '100%', // This ensures full width
        paddingY: 4,
      }}
    >
      <Container sx={{ paddingX: { xs: 2, sm: 4 }, width: '100%' }}>
        {/* Title */}
        <Typography
          variant="h3"
          gutterBottom
          align="center"
          sx={{
            fontSize: { xs: '2rem', sm: '3rem', md: '4rem' },
            marginBottom: 2, // Adds space below the title
            width: '100%', // Makes the title span the full width
          }}
        >
          Terms of Service
        </Typography>

        {/* Terms Content */}
        <Grid container spacing={4} justifyContent="center" sx={{ width: '100%' }}>
          {/* Left Column: Terms of Service Text */}
          <Grid item xs={12}>
            <Box sx={{ padding: 2, textAlign: 'left', width: '100%' }}>
              <Typography variant="h5" gutterBottom>
                Introduction
              </Typography>
              <Typography variant="body1" paragraph>
                Welcome to India Item! These Terms of Service govern your use of our website, services, and products. By accessing or using the India Item website, you agree to comply with and be bound by these terms. Please read them carefully.
              </Typography>

              <Typography variant="h5" gutterBottom>
                1. User Accounts
              </Typography>
              <Typography variant="body1" paragraph>
                To use certain features of our website, you may need to create an account. You agree to provide accurate, current, and complete information during the registration process, and to update this information if it changes. You are responsible for safeguarding your account credentials and agree not to share your login details with anyone else.
              </Typography>

              <Typography variant="h5" gutterBottom>
                2. Orders & Payments
              </Typography>
              <Typography variant="body1" paragraph>
                By placing an order on India Item, you agree to pay the total amount specified for the product(s) purchased, including taxes and shipping fees. Payments are processed through our third-party payment providers, and we do not store your payment information.
              </Typography>

              <Typography variant="h5" gutterBottom>
                3. Shipping and Delivery
              </Typography>
              <Typography variant="body1" paragraph>
                India Item ships products to various locations. Shipping costs and delivery times may vary depending on your location and the shipping method chosen. We strive to provide accurate delivery times but cannot guarantee specific delivery dates.
              </Typography>

              <Typography variant="h5" gutterBottom>
                4. Returns and Refunds
              </Typography>
              <Typography variant="body1" paragraph>
                Our return and refund policy can be found on our "Returns & Exchanges" page. Please review it before making a purchase. If you are dissatisfied with a product, please contact our customer support team for assistance.
              </Typography>

              <Typography variant="h5" gutterBottom>
                5. Intellectual Property
              </Typography>
              <Typography variant="body1" paragraph>
                All content on the India Item website, including but not limited to text, images, logos, and graphics, is protected by copyright and trademark laws. You may not use any content without explicit permission from India Item.
              </Typography>

              <Typography variant="h5" gutterBottom>
                6. Limitation of Liability
              </Typography>
              <Typography variant="body1" paragraph>
                India Item is not liable for any indirect, incidental, or consequential damages resulting from the use or inability to use our website, products, or services. We do not guarantee that our website will be free of errors, viruses, or interruptions.
              </Typography>

              <Typography variant="h5" gutterBottom>
                7. Governing Law
              </Typography>
              <Typography variant="body1" paragraph>
                These Terms of Service are governed by the laws of India. Any disputes arising from the use of our website or products will be resolved in the courts of India.
              </Typography>

              <Typography variant="h5" gutterBottom>
                8. Changes to These Terms
              </Typography>
              <Typography variant="body1" paragraph>
                India Item reserves the right to update or modify these Terms of Service at any time. Any changes will be posted on this page, and the updated terms will be effective immediately upon posting.
              </Typography>

              <Typography variant="h5" gutterBottom>
                Contact Us
              </Typography>
              <Typography variant="body1" paragraph>
                If you have any questions about these Terms of Service, please contact us at:
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

export default TermsOfService;
