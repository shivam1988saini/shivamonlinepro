// Footer.js
import React from 'react';
import { Box, Container, Grid, Typography, Link, IconButton, Fab } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import WhatsAppIcon from '@mui/icons-material/WhatsApp'; // Import the WhatsApp Icon
import { Link as RouterLink } from 'react-router-dom';

const Footer = () => {
    const scrollToContact = () => {
        // Scroll to the "contact-section" element when clicked
        window.scrollTo({
            top: 0,
            behavior: "smooth" // This makes the scroll smooth
        });
    };

    const openChat = () => {
        // Open a chat window or redirect to a chat page
        window.open('https://your-chat-service-link.com', '_blank'); // Replace with your chat service URL
    };

    const openWhatsApp = () => {
        // WhatsApp chat link: Replace with your WhatsApp number
        window.open('https://wa.me/1234567890', '_blank'); // Replace with your WhatsApp phone number
    };

    return (
        <Box component="footer" sx={{ backgroundColor: '#1976d2', color: 'white', padding: '20px 0' }}>
            <Container>
                <Grid container spacing={4}>
                    {/* Column 1: About Us, Privacy Policy */}
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6" gutterBottom>
                            Company
                        </Typography>
                        <Link component={RouterLink} to="/about" color="inherit" underline="none">
                            <Typography variant="body2" onClick={scrollToContact}>About Us</Typography>
                        </Link>
                        <Link component={RouterLink} to="/privacy-policy" color="inherit" underline="none">
                            <Typography variant="body2" onClick={scrollToContact}>Privacy Policy</Typography>
                        </Link>
                        <Link component={RouterLink} to="/TermsOfService" color="inherit" underline="none">
                            <Typography variant="body2" onClick={scrollToContact}>Terms of Service</Typography>
                        </Link>
                    </Grid>

                    {/* Column 2: Customer Support */}
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6" gutterBottom>
                            Customer Support
                        </Typography>
                        <Link component={RouterLink} to="/faq" color="inherit" underline="none">
                            <Typography variant="body2" onClick={scrollToContact}>FAQ</Typography>
                        </Link>
                        <Link component={RouterLink} to="/contact" color="inherit" underline="none">
                            <Typography variant="body2" onClick={scrollToContact}>Contact</Typography>
                        </Link>
                        <Link component={RouterLink} to="/ShippingInformation" color="inherit" underline="none">
                            <Typography variant="body2" onClick={scrollToContact}>Shipping Information</Typography>
                        </Link>
                    </Grid>

                    {/* Column 3: Social Media Links */}
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6" gutterBottom>
                            Follow Us
                        </Typography>
                        <IconButton color="inherit" href="https://facebook.com" target="_blank" aria-label="Facebook">
                            <FacebookIcon />
                        </IconButton>
                        <IconButton color="inherit" href="https://instagram.com" target="_blank" aria-label="Instagram">
                            <InstagramIcon />
                        </IconButton>
                        <IconButton color="inherit" href="https://twitter.com" target="_blank" aria-label="Twitter">
                            <TwitterIcon />
                        </IconButton>
                    </Grid>
                </Grid>

                {/* Copyright Section */}
                <Box sx={{ textAlign: 'center', marginTop: '20px' }}>
                    <Typography variant="body2">
                        &copy; {new Date().getFullYear()} India Item. All Rights Reserved.
                    </Typography>
                </Box>
            </Container>

            {/* Floating Chat Button */}
            {/* <Fab 
                color="primary" 
                onClick={openChat} 
                sx={{
                    position: 'fixed', 
                    bottom: 80, 
                    right: 20, 
                    zIndex: 10,
                }}
                aria-label="chat with us"
            >
                <ChatBubbleIcon />
            </Fab> */}

            {/* Floating WhatsApp Button */}
            <Fab 
                color="success" 
                onClick={openWhatsApp} 
                sx={{
                    position: 'fixed', 
                    bottom: 20, 
                    right: 20, 
                    zIndex: 10,
                }}
                aria-label="chat with us on WhatsApp"
            >
                <WhatsAppIcon />
            </Fab>
        </Box>
    );
};

export default Footer;
