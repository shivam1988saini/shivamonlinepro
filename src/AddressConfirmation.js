import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Paper,
  Box,
  FormControlLabel,
  Checkbox,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { Link } from "react-router-dom";
const AddressConfirmation = () => {
  const add = {
    name: "Shivam Prakash Saini",
    street: "17/3 RAMJI NAGAR KAHARAI MOD SHASHABAD ROAD",
    city: "AGRA",
    state: "UP",
    postalCode: "282001",
    country: "INDIA",
    phoneNumber: "+91 9528885228",
  };
  const [address, setAddress] = useState(add);

  // State for payment method
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isEditable, setIsEditable] = useState(false); // Allows toggling between edit mode and confirmation mode
  const [isConfirmedAddress, setIsConfirmedAddress] = useState(false); // Keeps track of whether the user confirmed the address
  const [isEdiData, setIsEditData] = useState(false); // Allows toggling between edit mode and confirmation mode
  const [isConfirmedPayment, setIsConfirmedPayment] = useState(false); // Keeps track of whether the user confirmed the address

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddress({
      ...address,
      [name]: value,
    });
  };

  const handleConfirmPayment = () => {
    setIsConfirmedPayment(!isConfirmedPayment);
  };
  const handleConfirmAddress = () => {
    setIsConfirmedAddress(!isConfirmedAddress); // Sets address as confirmed
  };
  const handleEdit = () => {
    setIsEditable(true); // Re-enable editing
  };

  // Handle payment method change
  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  // Define the function that updates both states
  const handleEditClick = () => {
    setIsEditData(true);
    setIsEditable(false);
    setIsConfirmedPayment(false);
  };
  return (
    <Box>
      {!isEdiData && add ? (
        <Box>
          <Box sx={{ maxWidth: 800, margin: "auto", padding: 3 }}>
            <Paper sx={{ padding: 2, mb: 3 }}>
              <Typography variant="h5" gutterBottom>
                Shipping Address
              </Typography>
              {add.name ? (
                <Box>
                  <Typography variant="h6">Your Address</Typography>
                  <Typography>Name: {add.name}</Typography>
                  <Typography>Street: {add.street}</Typography>
                  <Typography>City: {add.city}</Typography>
                  <Typography>State: {add.state}</Typography>
                  <Typography>Postal Code: {add.postalCode}</Typography>
                  <Typography>Country: {add.country}</Typography>
                  <Typography>Phone: {add.phoneNumber}</Typography>

                  <Button
                    component={Link}
                    onClick={handleEditClick}
                    variant="contained"
                    color="primary"
                    sx={{ width: "100%", mt: 2 }}
                  >
                    Change Address
                  </Button>
                </Box>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  component={Link}
                  to="/PaymentMethodPage"
                  sx={{ width: "100%", mt: 2 }}
                >
                  Add Address
                </Button>
              )}
            </Paper>

            <Paper sx={{ padding: 2, mb: 3 }}>
              <Typography variant="h5" gutterBottom>
                Payment Method
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Payment Method</InputLabel>
                    <Select
                      value={paymentMethod}
                      onChange={handlePaymentMethodChange}
                      label="Payment Method"
                    >
                      <MenuItem value="creditCard">Credit Card</MenuItem>
                      <MenuItem value="paypal">PayPal</MenuItem>
                      <MenuItem value="bankTransfer">Bank Transfer</MenuItem>
                      <MenuItem value="upi">UPI</MenuItem>{" "}
                      {/* Added UPI option */}
                    </Select>
                  </FormControl>
                </Grid>

                {paymentMethod === "creditCard" && (
                  <Grid item xs={12}>
                    <TextField
                      label="Card Number"
                      fullWidth
                      // Add necessary validation for credit card
                    />
                  </Grid>
                )}

                {paymentMethod === "creditCard" && (
                  <Grid item xs={6}>
                    <TextField
                      label="Expiry Date"
                      fullWidth
                      // Add necessary validation for expiry date
                    />
                  </Grid>
                )}

                {paymentMethod === "creditCard" && (
                  <Grid item xs={6}>
                    <TextField
                      label="CVV"
                      fullWidth
                      // Add necessary validation for CVV
                    />
                  </Grid>
                )}

                {paymentMethod === "paypal" && (
                  <Grid item xs={12}>
                    <Typography variant="body1">
                      Please log in to your PayPal account to complete the
                      payment.
                    </Typography>
                  </Grid>
                )}

                {paymentMethod === "bankTransfer" && (
                  <Grid item xs={12}>
                    <Typography variant="body1">
                      Please transfer the payment to the following account
                      number: 123-456-789
                    </Typography>
                  </Grid>
                )}

                {paymentMethod === "upi" && (
                  <Grid item xs={12}>
                    <TextField
                      label="UPI ID"
                      fullWidth
                      // You can add more validation for UPI ID format
                    />
                  </Grid>
                )}
              </Grid>
            </Paper>

            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" }, // Stack vertically on small screens and horizontally on larger screens
                justifyContent: "space-between",
                mt: 3,
                gap: 2, // Adds space between the items when stacked
              }}
            >
              <FormControlLabel
                control={<Checkbox />}
                label={
                  <div
                    onClick={(e) => e.stopPropagation()} // Prevent event propagation
                  >
                    I confirm that my address and payment details are correct.
                  </div>
                }
                onClick={add.name ? handleConfirmPayment : undefined}
                disabled={!add.name}
              />

              <Button
                component={Link}
                to='/InvoicePage'
                variant="contained"
                color="primary"
                disabled={!isConfirmedPayment}
              >
                Confirm Payment
              </Button>
            </Box>
          </Box>
        </Box>
      ) : (
        <Box sx={{ maxWidth: 600, margin: "auto", padding: 3 }}>
          <Paper sx={{ padding: 2 }}>
            <Box>
              <Typography variant="h5" gutterBottom>
                Address Confirmation
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Full Name"
                    name="name"
                    value={address.name}
                    onChange={handleInputChange}
                    fullWidth
                    disabled={!isEditable}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Street Address"
                    name="street"
                    value={address.street}
                    onChange={handleInputChange}
                    fullWidth
                    disabled={!isEditable}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="City"
                    name="city"
                    value={address.city}
                    onChange={handleInputChange}
                    fullWidth
                    disabled={!isEditable}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="State"
                    name="state"
                    value={address.state}
                    onChange={handleInputChange}
                    fullWidth
                    disabled={!isEditable}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Postal Code"
                    name="postalCode"
                    value={address.postalCode}
                    onChange={handleInputChange}
                    fullWidth
                    disabled={!isEditable}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Country"
                    name="country"
                    value={address.country}
                    onChange={handleInputChange}
                    fullWidth
                    disabled={!isEditable}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Phone Number"
                    name="phoneNumber"
                    value={address.phoneNumber}
                    onChange={handleInputChange}
                    fullWidth
                    disabled={!isEditable}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox />}
                    label={
                      <div
                        onClick={(e) => e.stopPropagation()} // Prevent event propagation
                      >
                        I confirm that this is my correct shipping address
                      </div>
                    }
                    disabled={!isEditable}
                    onClick={isEditable ? handleConfirmAddress : undefined}
                  />
                </Grid>
              </Grid>
              <Box sx={{ mt: 2 }}>
                <Grid container spacing={2}>
                  {/* Cancel Button */}
                  <Grid item xs={12} sm={6}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        setIsEditData(false);
                        setIsConfirmedAddress(false);
                      }}
                      sx={{ width: "100%" }}
                    >
                      Cancel
                    </Button>
                  </Grid>

                  {/* Conditional Buttons (Confirm Address or Edit Address) */}
                  <Grid item xs={12} sm={6}>
                    {isEditable ? (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          setIsEditData(false);
                          setIsConfirmedAddress(false);
                        }}
                        sx={{ width: "100%" }}
                        disabled={!isConfirmedAddress}
                      >
                        Confirm Address
                      </Button>
                    ) : (
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={handleEdit}
                        sx={{ width: "100%" }}
                      >
                        Edit Address
                      </Button>
                    )}
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Paper>
        </Box>
      )}
    </Box>
  );
};

export default AddressConfirmation;
