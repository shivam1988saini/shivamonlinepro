import React, { useState } from 'react';
import { TextField, Button, Box, Container, Typography, Grid, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton,Link } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Link as RouterLink } from 'react-router-dom';
const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone:'',
    password: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Toggle password visibility
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Form Validation
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    if (!formData.email || !formData.password || !formData.name) {
      alert('Please fill in all the fields!');
      return;
    }

    // API Call to submit form data to the backend
    fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
        .then((response) => response.json())
        .then((data) => {
        console.log(data);
        alert('Account created successfully!');
        })
        .catch((error) => {
        console.error('Error:', error);
        });
    };
  
  return (
    <Container maxWidth="xs" sx={{ paddingTop: '50px' }}>
      <Typography variant="h4" gutterBottom align="center">
        Create an Account
      </Typography>

      <form onSubmit={handleSubmit}>
        {/* Full Name Field */}
        <Box sx={{ marginBottom: 2 }}>
          <TextField
            fullWidth
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            variant="outlined"
            required
          />
        </Box>

        {/* Email Address Field */}
        <Box sx={{ marginBottom: 2 }}>
          <TextField
            fullWidth
            label="Email Address"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            variant="outlined"
            required
            type="email"
          />
        </Box>

        {/* Mobile No. Field */}
        <Box sx={{ marginBottom: 2 }}>
          <TextField
            fullWidth
            label="Mobile No."
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            variant="outlined"
            required
            type="phone"
          />
        </Box>

        {/* Password Field */}
        <Box sx={{ marginBottom: 2 }}>
          <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor="password">Password</InputLabel>
            <OutlinedInput
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleInputChange}
              name="password"
              label="Password"
              required
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {/* {showPassword ? <VisibilityOff /> : <Visibility />} */}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </Box>

        {/* Confirm Password Field */}
        <Box sx={{ marginBottom: 2 }}>
          <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
            <OutlinedInput
              id="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              value={formData.confirmPassword}
              onChange={handleInputChange}
              name="confirmPassword"
              label="Confirm Password"
              required
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowConfirmPassword}
                    edge="end"
                  >
                    {/* {showConfirmPassword ? <VisibilityOff /> : <Visibility />} */}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </Box>

        {/* Submit Button */}
        <Box sx={{ marginBottom: 2 }}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
          >
            Sign Up
          </Button>
        </Box>

        {/* Login Link */}
        <Grid container justifyContent="center">
          <Typography variant="body2">
            Already have an account? <Link component={RouterLink} to="/login"  >Log in</Link>
          </Typography>
        </Grid>
      </form>
    </Container>
  );
};

export default SignupPage;
