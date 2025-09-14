import React from 'react';
import { Button, Container, Typography, Paper, Grid, Box } from '@mui/material';
import { jsPDF } from 'jspdf';

const orderData = {
  orderId: "ORD12345",
  orderDate: "2025-02-26",
  status: "Placed",
  total: 1240,
  paymentMode: "Credit Card",
  shippingAddress: {
    name: "John Doe",
    address: "1234 Elm Street",
    city: "New York",
    zip: "10001",
    country: "USA"
  },
  items: [
    { name: "Laptop", quantity: 1, price: 1200 },
    { name: "Wireless Mouse", quantity: 2, price: 20 }
  ],
  trackingId: "TRACK123456789"
};

const DownloadInvoice = () => {
  const downloadInvoice = () => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("Invoice", 20, 20);

    // Order ID & Date
    doc.setFontSize(12);
    doc.text(`Order ID: ${orderData.orderId}`, 20, 30);
    doc.text(`Order Date: ${orderData.orderDate}`, 20, 40);

    // Billing Information
    doc.text("Billing Information:", 20, 50);
    doc.text(`Name: ${orderData.shippingAddress.name}`, 20, 60);
    doc.text(`Address: ${orderData.shippingAddress.address}`, 20, 70);
    doc.text(`City: ${orderData.shippingAddress.city}`, 20, 80);
    doc.text(`ZIP: ${orderData.shippingAddress.zip}`, 20, 90);
    doc.text(`Country: ${orderData.shippingAddress.country}`, 20, 100);

    // Ordered Items
    doc.text("Ordered Items:", 20, 110);
    let y = 120;
    orderData.items.forEach((item) => {
      doc.text(`${item.name} x${item.quantity}`, 20, y);
      doc.text(`$${item.price * item.quantity}`, 160, y);
      y += 10;
    });

    // Order Summary
    doc.text("Order Summary:", 20, y + 10);
    doc.text(`Subtotal: $${orderData.total}`, 20, y + 20);
    doc.text(`Payment Mode: ${orderData.paymentMode}`, 20, y + 30);
    doc.text(`Total: $${orderData.total}`, 20, y + 40);

    // Tracking ID
    doc.text(`Tracking ID: ${orderData.trackingId}`, 20, y + 50);

    // Save PDF
    doc.save(`invoice-${orderData.orderId}.pdf`);
  };

  return (
    <Container>
      <Box my={4}>
        <Paper elevation={3} sx={{ padding: 3 }}>
          <Typography variant="h4" gutterBottom align="center">
            Invoice
          </Typography>

          <Grid container spacing={2}>
            {/* Order Details */}
            <Grid item xs={12} md={6}>
              <Typography variant="h6">Order ID: {orderData.orderId}</Typography>
              <Typography variant="body1">Order Date: {orderData.orderDate}</Typography>
              <Typography variant="body1">Status: {orderData.status}</Typography>
              <Typography variant="body1">Total: ${orderData.total}</Typography>
              <Typography variant="body1">Payment Mode: {orderData.paymentMode}</Typography>
            </Grid>

            {/* Shipping Information */}
            <Grid item xs={12} md={6}>
              <Typography variant="h6">Shipping Information</Typography>
              <Typography variant="body1">Name: {orderData.shippingAddress.name}</Typography>
              <Typography variant="body1">Address: {orderData.shippingAddress.address}</Typography>
              <Typography variant="body1">City: {orderData.shippingAddress.city}</Typography>
              <Typography variant="body1">ZIP Code: {orderData.shippingAddress.zip}</Typography>
              <Typography variant="body1">Country: {orderData.shippingAddress.country}</Typography>
            </Grid>

            {/* Ordered Items */}
            <Grid item xs={12}>
              <Typography variant="h6">Ordered Items</Typography>
              <ul>
                {orderData.items.map((item, index) => (
                  <li key={index}>
                    {item.name} | Quantity: {item.quantity} | Price: ${item.price}
                  </li>
                ))}
              </ul>
            </Grid>

            {/* Tracking Information */}
            <Grid item xs={12}>
              <Typography variant="h6">Tracking Information</Typography>
              <Typography variant="body1">Tracking ID: {orderData.trackingId}</Typography>
            </Grid>

            {/* Download Button */}
            <Grid item xs={12} mt={2}>
              <Button variant="contained" color="primary" fullWidth onClick={downloadInvoice}>
                Download Invoice
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Container>
  );
};

export default DownloadInvoice;
