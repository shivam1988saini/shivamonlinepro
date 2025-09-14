import React, { useState,useEffect } from 'react';
import { Divider, Badge, AppBar, Toolbar, IconButton, Typography, Button, Drawer, List, ListItem, ListItemIcon, ListItemText, useMediaQuery, useTheme } from '@mui/material';
import { Home, Login, ShoppingBasket, Info, Menu, ArrowBack } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom'; // Use useNavigate hook
import { AddShoppingCart, FavoriteBorder } from "@mui/icons-material";
import axios from "axios";
const navItems = [
  { text: 'Home', icon: <Home />, to: '/ProductListPage' },
  { text: 'Login', icon: <Login />, to: '/login' },
  { text: 'Order', icon: <ShoppingBasket />, to: '/OrderHistoryPage' },
  { text: 'About Us', icon: <Info />, to: '/about' },
  { text: 'Signup', icon: <Info />, to: '/SignupPage' },
  { text: 'AdminDashboard', icon: <Info />, to: '/AdminDashboard' },
  { text: 'AdminCustomerDetail', icon: <Info />, to: '/AdminCustomerDetail' }
];

function Header() {
  const cartItemCount = 3;
  const wishlistItemCount = 5;
  const [drawerOpen, setDrawerOpen] = useState(false);
    const [wishlist, setWishlist] = useState([]); // Wishlist state
    const [error, setError] = useState("");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Check if it's a mobile device
  const navigate = useNavigate(); // Hook to navigate programmatically
  useEffect(() => {  
   fetchWishList();
  }, [])
  // Toggle Drawer Open/Close
  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

    const fetchWishList = async () => {
        try {
          const response = await axios.get("http://localhost:8080/wishlistitem", {
          headers: {
            "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("dgfdgdgdgd")}`
          }
          });
          setWishlist(response.data);
        } catch (err) {
          setError("Failed to fetch users");
          console.error(err);
        }
    };

  // Function to handle back navigation
  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  // Render navigation items
  const renderNavItems = () => (
    <>
      {navItems.map((item) => (
        <Button
          key={item.text}
          component={Link}
          to={item.to}
          startIcon={item.icon}
          sx={{ color: 'white', textTransform: 'none', display: 'inline-flex', alignItems: 'center', margin: '0 10px' }}
        >
          {item.text}
        </Button>
      ))}
    </>
  );

  // Render Drawer for Mobile view
  const renderDrawer = () => (
    <Drawer
      anchor="left"
      open={drawerOpen}
      onClose={handleDrawerToggle}
    >
      <div style={{ width: 250 }}>
        <Typography variant="h6" sx={{ padding: 2, textAlign: "center" }}>
          India Item
        </Typography>
        <Divider />

        <List>
          {navItems.map((item, index) => (
            <ListItem
              button
              component={Link}
              to={item.to}
              key={item.text}
              onClick={handleDrawerToggle}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
        <Divider />
      </div>
    </Drawer>
  );

  return (
    <AppBar position="sticky" color="primary">
      <Toolbar>
        {/* Back Button (Mobile and Desktop) */}
        <IconButton color="inherit" edge="start" onClick={handleBack} sx={{ mr: 2 }}>
          <ArrowBack />
        </IconButton>

        {/* Mobile Menu Icon */}
        {isMobile && (
          <IconButton color="inherit" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2 }}>
            <Menu />
          </IconButton>
        )}

        {/* Logo */}
        <Typography
          variant="h6"
          component={Link}
          to="/ProductListPage"
          sx={{ flexGrow: 1, color: "white", textDecoration: "none" }}
        >
          India Item
        </Typography>

        {/* Desktop Navigation */}
        {!isMobile && renderNavItems()}

        {/* Render Drawer for Mobile */}
        {isMobile && renderDrawer()}

        {/* Cart and Wishlist Icons */}
        {isMobile ? (
          <>
            <IconButton color="inherit" component={Link} to="/CartListPage">
              <Badge badgeContent={cartItemCount} color="secondary">
                <AddShoppingCart />
              </Badge>
            </IconButton>

            {/* Wishlist Icon with Notification Badge */}
            <IconButton color="inherit" component={Link} to="/WishlistPage">
              <Badge badgeContent={wishlist?.length} color="secondary">
                <FavoriteBorder />
              </Badge>
            </IconButton>
          </>
        ) : (
          <>
            <IconButton color="inherit" component={Link} to="/CartListPage">
              <Badge badgeContent={cartItemCount} color="secondary">
                <AddShoppingCart />
              </Badge>
            </IconButton>

            {/* Wishlist Icon with Notification Badge */}
            <IconButton color="inherit" component={Link} to="/WishlistPage">
              <Badge badgeContent={wishlist?.length} color="secondary">
                <FavoriteBorder />
              </Badge>
            </IconButton>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Header;
