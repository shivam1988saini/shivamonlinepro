import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  CircularProgress,
  Avatar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip, // Import Tooltip component
} from "@mui/material";
import {
  Cancel as CancelIcon,
  Download as DownloadIcon,
  Visibility as ViewIcon,
  VisibilityOff as CloseIcon,
  LocationOn as LocationOnIcon, // For tracking
  HelpOutline as InquiryIcon
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { jsPDF } from "jspdf";
// Mock Data for Order Details
const orderData = {
  orderId: "ORD12345",
  orderDate: "2025-02-26",
  shippingAddress: {
    name: "John Doe",
    address: "1234 Elm Street",
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

const orderHistoryData = [
  {
    orderId: "ORD12345",
    orderDate: "2025-02-20",
    items: [
      {
        name: "Laptop",
        quantity: 1,
        price: 1200,
        image: "https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      },
      {
        name: "Mouse",
        quantity: 1,
        price: 20,
        image: "https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      },
    ],
    status: "Cancelled",
    total: 1220,
  },
  {
    orderId: "ORD12346",
    orderDate: "2025-02-15",
    items: [
      {
        name: "Smartphone",
        quantity: 1,
        price: 799,
        image: "https://via.placeholder.com/100?text=Smartphone",
      },
      {
        name: "Charger",
        quantity: 1,
        price: 25,
        image: "https://via.placeholder.com/100?text=Charger",
      },
    ],
    status: "Delivered",
    total: 824,
  },
  {
    orderId: "ORD12347",
    orderDate: "2025-01-30",
    items: [
      {
        name: "Headphones",
        quantity: 2,
        price: 50,
        image: "https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      },
    ],
    status: "Shipped",
    total: 100,
  },
];

const OrderHistoryPage = () => {
  const [loading, setLoading] = useState(false);
  const [viewDetails, setViewDetails] = useState(null); // To track which order to view details
  const [orders, setOrders] = useState(orderHistoryData); // Track orders' current status
  const [openDialog, setOpenDialog] = useState(false); // Track dialog open state
  const [orderToCancel, setOrderToCancel] = useState(null); // Track the order to cancel
  // const [inquiryDialogOpen, setInquiryDialogOpen] = useState(false); // Track inquiry dialog state
  // const [inquiryItem, setInquiryItem] = useState(null); // Track the item for the inquiry
  
  // const handleInquiryClick = (item) => {
  //   setInquiryItem(item);
  //   setInquiryDialogOpen(true); // Open the inquiry dialog
  // };

  // const handleInquiryClose = () => {
  //   setInquiryDialogOpen(false);
  //   setInquiryItem(null);
  // };

  // const handleInquirySubmit = () => {
  //   // You can replace this with your actual inquiry submission logic
  //   alert(`Inquiry for item "${inquiryItem.name}" has been submitted.`);
  //   setInquiryDialogOpen(false);
  //   setInquiryItem(null);
  // };
  
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
    doc.text("Seller Name: Example Seller", 20, 40);
    doc.text("Address: 123 Business Blvd", 20, 50);
    doc.text("City: Business City", 20, 60);
    doc.text("ZIP: 20000", 20, 70);
    doc.text("Country: USA", 20, 80);

    // Add space between From and To sections
    doc.text("", 20, 90);

    // Add To (Buyer) Section
    doc.setFont("helvetica", "bold");
    doc.text("To:", 120, 30); // Align To section to the right
    doc.setFont("helvetica", "normal");
    doc.text(`Name: ${orderData.shippingAddress.name}`, 120, 40);
    doc.text(`Address: ${orderData.shippingAddress.address}`, 120, 50);
    doc.text(`City: ${orderData.shippingAddress.city}`, 120, 60);
    doc.text(`ZIP: ${orderData.shippingAddress.zip}`, 120, 70);
    doc.text(`Country: ${orderData.shippingAddress.country}`, 120, 80);

    // Add space between sections
    doc.text("", 20, 95);

    // Order ID & Date
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Order ID: ${orderData.orderId}`, 20, 110);
    doc.text(`Order Date: ${orderData.orderDate}`, 120, 110);

    // Add some space between sections
    doc.text("", 20, 115);

    // Billing Information Header
    doc.setFont("helvetica", "bold");
    doc.text("Billing Information:", 20, 125);
    doc.setFont("helvetica", "normal");

    // Billing Details
    doc.text(`Name: ${orderData.shippingAddress.name}`, 20, 135);
    doc.text(`Address: ${orderData.shippingAddress.address}`, 20, 145);
    doc.text(`City: ${orderData.shippingAddress.city}`, 20, 155);
    doc.text(`ZIP: ${orderData.shippingAddress.zip}`, 20, 165);
    doc.text(`Country: ${orderData.shippingAddress.country}`, 20, 175);

    // Add space before Ordered Items
    doc.text("", 20, 180);

    // Ordered Items Header
    doc.setFont("helvetica", "bold");
    doc.text("Ordered Items:", 20, 185);
    doc.setFont("helvetica", "normal");

    // Ordered Items List with Columns for Quantity and Price
    let y = 195;
    orderData.items.forEach((item) => {
      doc.text(`${item.name}`, 20, y);
      doc.text(`Quantity: ${item.quantity}`, 120, y);
      doc.text(`$${(item.price * item.quantity).toFixed(2)}`, 160, y);
      y += 10;
    });

    // Add some space before Order Summary
    doc.text("", 20, y + 10);

    // Order Summary Header
    doc.setFont("helvetica", "bold");
    doc.text("Order Summary:", 20, y + 20);
    doc.setFont("helvetica", "normal");

    // Order Summary Details
    doc.text(`Subtotal: $${orderData.total}`, 20, y + 30);
    doc.text(`Payment Mode: ${orderData.paymentMode}`, 20, y + 40);
    doc.text(`Total: $${orderData.total}`, 120, y + 40);

    // Add space before tracking info
    doc.text("", 20, y + 50);

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

  const handleViewOrderDetails = (orderId) => {
    setViewDetails(orderId === viewDetails ? null : orderId); // Toggle order details view
  };

  const handleCancelOrder = (orderId) => {
    setOrderToCancel(orderId); // Set the order to cancel
    setOpenDialog(true); // Open the confirmation dialog
  };

  const handleConfirmCancelOrder = () => {
    // Confirm cancellation of the order
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.orderId === orderToCancel
          ? { ...order, status: "Cancelled" } // Update status to 'Cancelled'
          : order
      )
    );
    setOpenDialog(false); // Close the dialog
    setOrderToCancel(null); // Clear the tracked order
  };

  const handleCloseDialog = () => {
    setOpenDialog(false); // Close the dialog without cancelling
    setOrderToCancel(null); // Clear the tracked order
  };

  return (
    <Box sx={{ maxWidth: "1200px", margin: "auto", padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Order History
      </Typography>
      <Paper sx={{ padding: 2 }}>
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "200px",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <>
            <TableContainer component={Paper}>
              <Table sx={{ display: { xs: "none", sm: "table" } }}>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>Order ID</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Order Date</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Total</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders.map((order) => (
                    <>
                      {/* Static Row: Order Summary */}
                      <TableRow key={`summary-${order.orderId}`}>
                        <TableCell>{order.orderId}</TableCell>
                        <TableCell>{order.orderDate}</TableCell>
                        <TableCell>{order.status}</TableCell>
                        <TableCell>${order.total}</TableCell>
                        <TableCell>
                          <Tooltip title="Track Order">
                            <IconButton
                              color="primary"
                              component={Link}
                              to="/TrackOrderBar"
                            >
                              <LocationOnIcon />
                            </IconButton>
                          </Tooltip>

                          <Tooltip title="View Details">
                            <IconButton
                              color="primary"
                              onClick={() =>
                                handleViewOrderDetails(order.orderId)
                              }
                              sx={{ marginLeft: 2 }}
                            >
                              {viewDetails === order.orderId ? (
                                <CloseIcon />
                              ) : (
                                <ViewIcon />
                              )}
                            </IconButton>
                          </Tooltip>

                          <Tooltip title="Download Invoice">
                            <IconButton
                              color="primary"
                              onClick={downloadInvoice}
                              sx={{ marginLeft: 2 }}
                            >
                              <DownloadIcon />
                            </IconButton>
                          </Tooltip>

                          <Tooltip title="Cancel Order">
                            <IconButton
                              color="error"
                              onClick={() => handleCancelOrder(order.orderId)}
                              sx={{ marginLeft: 2 }}
                              disabled={order.status === "Cancelled"}
                            >
                              <CancelIcon />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                      {/* Dynamic Row: Order Items */}
                      {viewDetails === order.orderId && (
                        <TableRow key={`details-${order.orderId}`}>
                          <TableCell colSpan={5}>
                            {order.status === "Cancelled" && (
                              <Box>
                                <Typography
                                  variant="h6"
                                  color="error"
                                  sx={{ mb: 1 }}
                                >
                                  Order Cancelled
                                </Typography>
                              </Box>
                            )}
                            <Grid container spacing={2}>
                              {order.items.map((item, index) => (
                                <Grid item xs={12} sm={6} md={4} key={index}>
                                  <Box
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                    }}
                                  >
                                 
                                    <Avatar
                                      src={item.image}
                                      alt={item.name}
                                      sx={{
                                        width: 60,
                                        height: 60,
                                        marginRight: 2,
                                      }}
                                      component={Link}
                                      to="/ProductDescriptionPage"
                                    />
                                    <Box>
                                    
                                      <Typography variant="body2">
                                        {item.name}
                                      </Typography>
                                      <Typography variant="body2" color="text.secondary">
                                        Quantity: {item.quantity}
                                      </Typography>
                                      <Typography variant="body2" color="text.secondary">
                                        Price: ${item.price} 
                                        <Tooltip key={index} title="Inquire about this item">
                                        <IconButton
                                          color="info"
                                          sx={{ fontSize: "inherit", padding: 0 }}
                                          // onClick={() => handleInquiryClick(item)}
                                        >
                                          <InquiryIcon sx={{ fontSize: "inherit" }} />
                                        </IconButton>
                                      </Tooltip>
                                      </Typography>
                                    </Box>
                                  </Box>
                                </Grid>
                              ))}
                            </Grid>
                          </TableCell>
                        </TableRow>
                      )}
                    </>
                  ))}
                </TableBody>
              </Table>
              <Box sx={{ display: { xs: "block", sm: "none" } }}>
                {orders.map((order) => (
                  <Box
                    key={order.orderId}
                    sx={{ mb: 2, border: "1px solid #ddd", padding: 2 }}
                  >
                    {/* Order Summary */}
                    <Typography variant="body1">
                      <strong>Order ID:</strong> {order.orderId}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Order Date:</strong> {order.orderDate}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Status:</strong> {order.status}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      <strong>Total:</strong> ${order.total}
                    </Typography>

                    {/* Action Icons */}
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <IconButton
                        color="primary"
                        //onClick={() => alert("Track your order!")}
                        component={Link}
                        to="/TrackOrderBar"
                      >
                        <LocationOnIcon />
                      </IconButton>
                      <IconButton
                        color="primary"
                        onClick={() => handleViewOrderDetails(order.orderId)}
                      >
                        {viewDetails === order.orderId ? (
                          <CloseIcon />
                        ) : (
                          <ViewIcon />
                        )}
                      </IconButton>

                      <IconButton color="primary" onClick={downloadInvoice}>
                        <DownloadIcon />
                      </IconButton>

                      <IconButton
                        color="error"
                        onClick={() => handleCancelOrder(order.orderId)}
                        disabled={order.status === "Cancelled"}
                      >
                        <CancelIcon />
                      </IconButton>
                    </Box>

                    {/* Dynamic Row: Order Items (shown when View Details is clicked) */}
                    {viewDetails === order.orderId && (
                      <Box>
                        {order.status === "Cancelled" && (
                          <Typography variant="h6" color="error" sx={{ mt: 2 }}>
                            Order Cancelled
                          </Typography>
                        )}
                        <Box sx={{ mt: 2 }}>
                          {order.items.map((item, index) => (
                            <Box
                              key={index}
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                mb: 2,
                              }}
                            >
                              <Avatar
                                src={item.image}
                                alt={item.name}
                                sx={{ width: 60, height: 60, marginRight: 2 }}
                                component={Link}
                                to="/ProductDescriptionPage"
                              />
                              <Box>
                                <Typography variant="body2">
                                  <strong>{item.name}</strong>
                                </Typography>
                                <Typography variant="body2">
                                  Quantity: {item.quantity}
                                </Typography>
                                <Typography variant="body2">
                                  Price: ${item.price}
                                  <Tooltip key={index} title="Inquire about this item">
                                    <IconButton
                                      color="info"
                                      sx={{ fontSize: "inherit", padding: 0 }}
                                      // onClick={() => handleInquiryClick(item)}
                                    >
                                      <InquiryIcon sx={{ fontSize: "inherit" }} />
                                    </IconButton>
                                  </Tooltip>
                                </Typography>
                              </Box>
                            </Box>
                          ))}
                        </Box>
                      </Box>
                    )}
                  </Box>
                ))}
              </Box>
            </TableContainer>

            <Dialog
              open={openDialog}
              onClose={handleCloseDialog}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Confirm Cancellation"}
              </DialogTitle>
              <DialogContent>
                Are you sure you want to cancel this order?
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialog} color="primary">
                  No
                </Button>
                <Button
                  onClick={handleConfirmCancelOrder}
                  color="secondary"
                  autoFocus
                >
                  Yes
                </Button>
              </DialogActions>
            </Dialog>

            {/* Inquiry Dialog */}
          {/* <Dialog open={inquiryDialogOpen} onClose={handleInquiryClose}>
            <DialogTitle>Inquiry for {inquiryItem ? inquiryItem.name : ''}</DialogTitle>
            <DialogContent>
              <Typography variant="body2">
                Please enter your inquiry below:
              </Typography>
              <Box sx={{ mt: 2 }}>
                <textarea style={{ width: "100%", height: "100px", padding: "8px" }} placeholder="Write your inquiry here..."></textarea>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleInquiryClose} color="primary">Cancel</Button>
              <Button onClick={handleInquirySubmit} color="secondary">Submit</Button>
            </DialogActions>
          </Dialog> */}
          </>
        )}
      </Paper>
    </Box>
  );
};

export default OrderHistoryPage;
