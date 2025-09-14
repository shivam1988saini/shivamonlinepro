import React from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";

const ShippingInformation = () => {
  return (
    <Container maxWidth="lg" sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>
        Shipping Information
      </Typography>

      <Typography variant="h6" paragraph>
        Welcome to [Your Store Name]! We're excited to ship your order to you.
        Here's everything you need to know about our shipping process.
      </Typography>

      <Box sx={{ marginBottom: 4 }}>
        <Typography variant="h5" gutterBottom>
          Shipping Rates
        </Typography>
        <Card>
          <CardContent>
            <List>
              <ListItem>
                <ListItemText
                  primary="Standard Shipping"
                  secondary="$X.XX (Estimated delivery time: 5-7 business days)"
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText
                  primary="Expedited Shipping"
                  secondary="$X.XX (Estimated delivery time: 2-3 business days)"
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText
                  primary="Express Shipping"
                  secondary="$X.XX (Estimated delivery time: 1 business day)"
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText
                  primary="Free Shipping"
                  secondary="Available on orders over $XX.XX (Standard shipping applies)"
                />
              </ListItem>
            </List>
          </CardContent>
        </Card>
      </Box>
      <Box sx={{ marginBottom: 4 }}>
        <Typography variant="h5" gutterBottom>
          Shipping Timeframes
        </Typography>
        <Typography variant="body1" paragraph>
          We process and ship all orders within 1-2 business days (Monday
          through Friday). Once your order ships, you'll receive an email with
          tracking information.
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Domestic Orders:</strong> Deliveries typically take 5-7
          business days for standard shipping. Expedited and express options are
          available for faster delivery.
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>International Orders:</strong> Delivery times vary by
          location. Estimated delivery is 7-21 business days, depending on your
          country’s customs processing times.
        </Typography>
      </Box>
      <Box sx={{ marginBottom: 4 }}>
        <Typography variant="h5" gutterBottom>
          Order Tracking
        </Typography>
        <Typography variant="body1" paragraph>
          Once your order has shipped, you will receive an email with a tracking
          number. You can track your order on our website or through the
          carrier’s tracking portal.
        </Typography>
      </Box>
      <Box sx={{ marginBottom: 4 }}>
        <Typography variant="h5" gutterBottom>
          International Shipping
        </Typography>
        <Typography variant="body1" paragraph>
          We are proud to offer international shipping to the following
          countries: [List countries]. International customers are responsible
          for any customs duties, taxes, or import fees that may apply when the
          order arrives in their country. These fees are not included in the
          shipping charges and are the buyer’s responsibility.
        </Typography>
      </Box>
      <Box sx={{ marginBottom: 4 }}>
        <Typography variant="h5" gutterBottom>
          Shipping Restrictions
        </Typography>
        <Typography variant="body1" paragraph>
          Some products may have shipping restrictions due to size, weight, or
          local regulations. If any items in your order are restricted, you will
          be notified, and we will do our best to find a solution.
        </Typography>
      </Box>
      <Box sx={{ marginBottom: 4 }}>
        <Typography variant="h5" gutterBottom>
          Lost or Damaged Packages
        </Typography>
        <Typography variant="body1" paragraph>
          We take great care to ensure that your order arrives in perfect
          condition. If your package is lost or damaged, please contact our
          customer service team immediately. We will work with the carrier to
          resolve the issue and ensure you receive a replacement or refund.
        </Typography>
      </Box>
      <Box sx={{ marginBottom: 4 }}>
        <Typography variant="h5" gutterBottom>
          Address Accuracy
        </Typography>
        <Typography variant="body1" paragraph>
          Please ensure that the shipping address entered at checkout is
          correct. We are not responsible for delays or lost shipments due to
          incorrect or incomplete address information. If you notice an error,
          please contact us as soon as possible.
        </Typography>
      </Box>
      <Box sx={{ marginBottom: 4 }}>
        <Typography variant="h5" gutterBottom>
          Contact Us
        </Typography>
        <Typography variant="body1" paragraph>
          If you have any questions or concerns about shipping, feel free to
          reach out to our customer support team at [Your Email] or call us at
          [Your Phone Number]. We’re here to help!
        </Typography>
      </Box>
    </Container>
  );
};

export default ShippingInformation;
