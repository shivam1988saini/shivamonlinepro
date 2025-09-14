import React from "react";
import {
  Box,
  Paper,
  Typography,
  Grid,
  Divider,
  ListItem,
  ListItemText,
  Button,
  Avatar,
} from "@mui/material";
import { Link } from "react-router-dom";
import { jsPDF } from "jspdf";

// Mock Data for Order Details
const orderData = {
  orderId: "ORD12345",
  orderDate: "2025-02-26",
  shippingAddress: {
    name: "John Doe",
    address: "17/3 ramji nagar kaharai mod shamashabad road agra",
    city: "New York",
    zip: "10001",
    country: "USA",
  },
  items: [
    {
      name: "Laptop",
      quantity: 1,
      price: 1200,
      image: "https://via.placeholder.com/100?text=Laptop",
    },
    {
      name: "Wireless Mouse",
      quantity: 2,
      price: 20,
      image: "https://via.placeholder.com/100?text=Wireless+Mouse",
    },
  ],
  total: 1240,
  status: "Placed",
  paymentMode: "Credit Card",
  trackingId: "TRACK123456789",
};





const InvoicePage = () => {
    const downloadInvoice = () => {
        const doc = new jsPDF();
        // Set Title and Format
        doc.setFontSize(20);
        doc.setFont("helvetica", "bold");
        doc.text("Invoice", 20, 20);    
        // Add a horizontal line after title
        doc.setLineWidth(0.5);
        doc.line(20, 22, 190, 22);      
        // Add From (Seller) Section
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.text("From:", 20, 30);
        doc.setFont("helvetica", "normal");
        doc.text("Seller Name: INDIA ITEM", 20, 42);
        // Define the width for the text block (adjust as needed)
        var pageWidth = doc.internal.pageSize.width/2 -20;  // Subtract some margin space (left and right)
        var addressText1 = "Address: 17/3 RAMJI NAGAR KAHARAI";
        var addressText2 = `Address: ${orderData.shippingAddress.address}`
        // Use splitTextToSize to automatically break the text into multiple lines
        var splitText1 = doc.splitTextToSize(addressText1, pageWidth);
        var splitText2 = doc.splitTextToSize(addressText2, pageWidth);
        // Draw the wrapped text starting at position (20, 50)
        let yPosition1 = 50;
        splitText1.forEach(line => {
            doc.text(line, 20, yPosition1);
            yPosition1 += 8;  // Adjust y position for each line
        });
        let yPosition2 = 50;
        splitText2.forEach(line => {
            doc.text(line, 120, yPosition2);
            yPosition2 += 8;  // Adjust y position for each line
        });
        let yPosition=yPosition1>yPosition2?yPosition1:yPosition2
        doc.text("City: AGRA", 20, yPosition);
        doc.text("ZIP: 282004", 20, yPosition + 8);
        doc.text("Country: INDIA", 20, yPosition + 16);
      
      
        // Add To (Buyer) Section
        doc.setFont("helvetica", "bold");
        doc.text("To:", 120, 30); // Align To section to the right
        doc.setFont("helvetica", "normal");
        doc.text(`Name: ${orderData.shippingAddress.name}`, 120, 42);
        doc.text(`City: ${orderData.shippingAddress.city}`, 120, yPosition);
        doc.text(`ZIP: ${orderData.shippingAddress.zip}`, 120, yPosition + 8);
        doc.text(`Country: ${orderData.shippingAddress.country}`, 120, yPosition + 16);
      
        // Order ID & Date
        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");
        doc.text(`Order ID: ${orderData.orderId}`, 20, yPosition + 24);
        doc.text(`Order Date: ${orderData.orderDate}`, 120, yPosition + 24);

        // Billing Information Header
        doc.setFont("helvetica", "bold");
        doc.text("Billing Information:", 20, yPosition+45);
        doc.setFont("helvetica", "normal");
      
        // Billing Details
        doc.text(`Name: ${orderData.shippingAddress.name}`, 20, yPosition+53);
        doc.text(`Address: ${orderData.shippingAddress.address}`, 20, yPosition+61);
        doc.text(`City: ${orderData.shippingAddress.city}`, 20, yPosition+69);
        doc.text(`ZIP: ${orderData.shippingAddress.zip}`, 20, yPosition+77);
        doc.text(`Country: ${orderData.shippingAddress.country}`, 20, yPosition+85);
      
        // Ordered Items Header
        doc.setFont("helvetica", "bold");
        doc.text("Ordered Items:", 20, yPosition+98);
        doc.setFont("helvetica", "normal");
      
        // Ordered Items List with Columns for Quantity and Price
        let y = yPosition+106;
        orderData.items.forEach((item) => {
          doc.text(`${item.name}`, 20, y);
          doc.text(`Quantity: ${item.quantity}`, 120, y);
          doc.text(`$${(item.price * item.quantity).toFixed(2)}`, 160, y);
          y += 8;
        });

        // Order Summary Header
        doc.setFont("helvetica", "bold");
        doc.text("Order Summary:", 20, y + 20);
        doc.setFont("helvetica", "normal");
      
        // Order Summary Details
        doc.text(`Subtotal: $${orderData.total}`, 20, y + 28);
        doc.text(`Payment Mode: ${orderData.paymentMode}`, 20, y + 36);
        doc.text(`Total: $${orderData.total}`, 120, y + 36);
      
        // Tracking Information Header
        doc.setFont("helvetica", "bold");
        doc.text("Tracking Information:", 20, y + 60);
        doc.setFont("helvetica", "normal");
      
        // Tracking ID
        doc.text(`Tracking ID: ${orderData.trackingId}`, 20, y + 70);
      
        // Add a horizontal line at the end
        doc.setLineWidth(0.5);
        doc.line(20, y + 80, 190, y + 80);
      
        // Save the PDF
        doc.save(`invoice-${orderData.orderId}.pdf`);
      };
      
      

  return (
    <Box sx={{ maxWidth: "1200px", margin: "auto", padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Order Placed Successfully!
      </Typography>
      <Paper sx={{ padding: 3, position: "relative" }}>
        {/* Download Invoice Button */}
        <Box
          sx={{
            position: { xs: "relative", sm: "absolute" }, // Position relative on small screens, absolute on larger screens
            top: { xs: "auto", sm: 16 }, // Default to auto on small screens, 16px for larger
            right: { xs: "auto", sm: 16 }, // Default to auto on small screens, 16px for larger
            left: { xs: "0", sm: "auto" }, // Left aligned for small screens, auto for larger ones
            width: { xs: "100%", sm: "auto" }, // Full width on small screens, auto for large screens
            zIndex: 1,
          }}
        >
          <Button variant="outlined" color="primary" fullWidth={true}  onClick={downloadInvoice}>
            Download Invoice
          </Button>
        </Box>

        {/* Order Summary */}
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6" gutterBottom>
            Order Summary
          </Typography>
          <Typography variant="body1">
            <strong>Order ID:</strong> {orderData.orderId}
          </Typography>
          <Typography variant="body1">
            <strong>Order Date:</strong> {orderData.orderDate}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Status:</strong> {orderData.status}
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            <strong>Total:</strong> ${orderData.total}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Payment Mode:</strong> {orderData.paymentMode}
          </Typography>
        </Box>

        <Divider sx={{ marginBottom: 3 }} />

        {/* Shipping Information */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Shipping Information
          </Typography>
          <Typography variant="body1">
            <strong>Name:</strong> {orderData.shippingAddress.name}
          </Typography>
          <Typography variant="body1" sx={{
  wordWrap: 'break-word',  // Break long words to avoid overflow
  overflow: 'hidden',      // Hide overflow text
  textOverflow: 'ellipsis', // Add ellipsis for overflow text
  whiteSpace: 'normal',    // Allow wrapping of text
  maxWidth: '75%',        // Ensure the text does not exceed the container's width
}}>
  <strong>Address:</strong> {orderData.shippingAddress.address}
</Typography>
          <Typography variant="body1">
            <strong>City:</strong> {orderData.shippingAddress.city}
          </Typography>
          <Typography variant="body1">
            <strong>ZIP Code:</strong> {orderData.shippingAddress.zip}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Country:</strong> {orderData.shippingAddress.country}
          </Typography>
        </Box>

        <Divider sx={{ marginBottom: 3 }} />

        {/* Ordered Items */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Ordered Items
          </Typography>
          <Grid container spacing={2}>
            {orderData.items.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <ListItem sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
                  <Avatar
                    src={item.image}
                    alt={item.name}
                    sx={{ width: 60, height: 60, marginRight: 2 }}
                  />
                  <ListItemText
                    primary={item.name}
                    secondary={`Quantity: ${item.quantity} | Price: $${item.price}`}
                  />
                </ListItem>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Divider sx={{ marginBottom: 3 }} />

        {/* Tracking Information */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Tracking Information
          </Typography>
          <Typography variant="body1">
            <strong>Tracking ID:</strong> {orderData.trackingId}
          </Typography>
        </Box>

        {/* Action Buttons */}
        <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 2 }}>
          <Button variant="outlined" color="primary" fullWidth sx={{ marginBottom: { xs: 2, sm: 0 } }}
           component={Link}
           to="/ProductListPage">
            Continue Shopping
          </Button>
          <Button variant="contained" color="secondary" fullWidth 
          component={Link}
          to="/TrackOrderBar">
            Track Order
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default InvoicePage;
