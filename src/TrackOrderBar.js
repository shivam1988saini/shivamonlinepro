import React from 'react';
import { LinearProgress, Box, Typography, Stepper, Step, StepLabel } from '@mui/material';

const TrackOrderBar = () => {
  // Define the steps of the order
  const steps = ['Order Placed', 'Shipped', 'Out for Delivery', 'Delivered'];
    const orderStatus='Order Placed'
  // Calculate the progress value based on the current order status
  const getProgress = () => {
    switch (orderStatus) {
      case 'Order Placed':
        return 25; // 25% for Order Placed
      case 'Shipped':
        return 50; // 50% for Shipped
      case 'Out for Delivery':
        return 75; // 75% for Out for Delivery
      case 'Delivered':
        return 100; // 100% for Delivered
      default:
        return 0;
    }
  };

  // Get the current step based on the order status
  const currentStep = steps.indexOf(orderStatus);

  return (
    <Box sx={{ width: '100%', marginTop: 2 }}>
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        Track Your Order
      </Typography>

      {/* Stepper Component to display the stages */}
      <Stepper activeStep={currentStep} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {/* Progress Bar */}
      <Box sx={{ marginTop: 2 }}>
        <LinearProgress
          variant="determinate"
          value={getProgress()}
          sx={{ height: 10, borderRadius: 5 }}
        />
      </Box>

      {/* Display current order status */}
      <Typography sx={{ marginTop: 2, textAlign: 'center' }}>
        Current Status: {orderStatus}
      </Typography>
    </Box>
  );
};

export default TrackOrderBar;
