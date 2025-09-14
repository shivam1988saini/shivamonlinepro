import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Paper,
  Box,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { Link } from "react-router-dom";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const PaymentMethodPage = () => {
  const add = {
    name: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    phoneNumber: "",
  };

  const [address, setAddress] = useState(add);
  const [isConfirmedAddress, setIsConfirmedAddress] = useState(false);
  const [mapLocation, setMapLocation] = useState({
    lat: 40.7128,
    lng: -74.006,
  }); // Default to New York

  // Geolocation state
  const [currentLocation, setCurrentLocation] = useState(null);

//   useEffect(() => {
//     // Check if the browser supports geolocation
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           // On success, get the coordinates and update the state
//           const { latitude, longitude } = position.coords;
//           setCurrentLocation({ lat: latitude, lng: longitude });
//           setMapLocation({ lat: latitude, lng: longitude }); // Set the map to the current location
//         },
//         (error) => {
//           console.error("Error getting location:", error);
//           // Handle error (use default location in case of failure)
//         }
//       );
//     } else {
//       console.error("Geolocation is not supported by this browser.");
//     }
//   }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddress({
      ...address,
      [name]: value,
    });
  };

  const handleConfirmAddress = () => {
    setIsConfirmedAddress(!isConfirmedAddress); // Sets address as confirmed
  };

  // Update address based on the location picked on the map
//   const handleMapClick = (e) => {
//     setMapLocation({ lat: e.latLng.lat(), lng: e.latLng.lng() });
//     // You can also use a geocoding service here to update the address fields based on the lat/lng
//   };

  return (
    <Box sx={{ maxWidth: 600, margin: "auto", padding: 3 }}>
      <Paper sx={{ padding: 2 }}>
        <Box>
          <Typography variant="h5" gutterBottom>
            Address Detail
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Full Name"
                name="name"
                value={address.name}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Street Address"
                name="street"
                value={address.street}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="City"
                name="city"
                value={address.city}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="State"
                name="state"
                value={address.state}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Postal Code"
                name="postalCode"
                value={address.postalCode}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Country"
                name="country"
                value={address.country}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Phone Number"
                name="phoneNumber"
                value={address.phoneNumber}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>

            {/* Google Maps */}
            {/* <Grid item xs={12}>
              <Typography variant="body1" gutterBottom>
                Select your location on the map:
              </Typography>
              <LoadScript googleMapsApiKey="YOUR_ACTUAL_GOOGLE_MAPS_API_KEY">
                <GoogleMap
                  mapContainerStyle={{
                    width: "100%",
                    height: "400px",
                  }}
                  center={mapLocation}
                  zoom={12}
                  onClick={handleMapClick}
                >
                  <Marker position={mapLocation} />
                </GoogleMap>
              </LoadScript>
            </Grid> */}

            {/* Confirm Address */}
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
                onClick={handleConfirmAddress}
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
                    setIsConfirmedAddress(false);
                  }}
                  component={Link}
                  to="/AddressConfirmation"
                  sx={{ width: "100%" }}
                >
                  Cancel
                </Button>
              </Grid>

              {/* Conditional Buttons (Confirm Address or Edit Address) */}
              <Grid item xs={12} sm={6}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    setIsConfirmedAddress(false);
                  }}
                  component={Link}
                  to="/AddressConfirmation"
                  sx={{ width: "100%" }}
                  disabled={!isConfirmedAddress}
                >
                  Confirm Address
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default PaymentMethodPage;
