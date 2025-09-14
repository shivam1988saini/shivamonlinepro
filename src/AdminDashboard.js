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
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip, // Import Tooltip component
  TextField,
  Avatar,
} from "@mui/material";
import {
  Cancel as CancelIcon,
  Visibility as ViewIcon,
  VisibilityOff as CloseIcon,
} from "@mui/icons-material";
import { Add, Edit, Delete } from "@mui/icons-material";
import { Link } from "react-router-dom";

const productData = [
  {
    id: 1,
    name: "Ladies salwar Kameez duppta suit suit suit suit suit suit suit suit suit suit suit suit suit suit suit Kameez duppta suit suit suit suit suit suit suit suit suit suit suit suit suit suit suit",
    category: "Electronics",
    price: 1200,
    stock: 30,
    sold: 5,
    image:
      "https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    id: 2,
    name: "Smartphone",
    category: "Electronics",
    price: 800,
    stock: 50,
    sold: 5,
    image:
      "https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    id: 3,
    name: "Headphones",
    category: "Accessories",
    price: 150,
    stock: 100,
    sold: 5,
    image:
      "https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
];

const AdminDashboard = () => {
  const [products, setProducts] = useState(productData);
  const [filteredProducts, setFilteredProducts] = useState(productData); // To store filtered products based on search
  const [openDialog, setOpenDialog] = useState(false);
  const [viewProduct, setViewProduct] = useState(null);
  const [editProduct, setEditProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sortDirection, setSortDirection] = useState("asc");
  const [sortField, setSortField] = useState("name");
  const [searchQuery, setSearchQuery] = useState(""); // For the search input

  // Handles opening the dialog for adding a new product or editing an existing product
  const handleOpenDialog = (product = null) => {
    setEditProduct(product);
    setOpenDialog(true);
  };

  // Handles opening the view dialog for a product
  const handleViewProduct = (product) => {
    setViewProduct(product);
  };

  // Handles closing all dialogs
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditProduct(null);
    setViewProduct(null);
  };

  // Handle saving the product (either add or update)
  const handleSaveProduct = () => {
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      if (editProduct) {
        // Update the product
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.id === editProduct.id ? editProduct : product
          )
        );
      } else {
        // Add new product
        setProducts((prevProducts) => [
          ...prevProducts,
          { ...editProduct, id: prevProducts.length + 1 },
        ]);
      }

      setLoading(false);
      handleCloseDialog();
    }, 1000);
  };

  // Handle deleting a product
  const handleDeleteProduct = (id) => {
    setFilteredProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== id)
    );
  };

    // Sorting Function
    const handleSort = (field) => {
      const direction = sortDirection === "asc" ? "desc" : "asc";
      setSortDirection(direction);
      setSortField(field);
  
      const sortedProducts = [...filteredProducts].sort((a, b) => {
        if (direction === "asc") {
          return a[field] < b[field] ? -1 : a[field] > b[field] ? 1 : 0;
        } else {
          return a[field] > b[field] ? -1 : a[field] < b[field] ? 1 : 0;
        }
      });
  
      setFilteredProducts(sortedProducts);
    };
  
    // Handle the search query change and filter products based on it
    const handleSearchChange = (event) => {
      const query = event.target.value;
      setSearchQuery(query);
  
      // Filter products based on the search query
      if (query) {
        const filtered = products.filter((product) =>
          product.name.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredProducts(filtered);
      } else {
        setFilteredProducts(products); // If no search query, show all products
      }
    };

  return (
    <Box sx={{ maxWidth: "1200px", margin: "auto", padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard - Product Listing
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
                      {/* Search Bar placed on top */}
                      <Box sx={{ mb: 1 }}>
              <TextField
                label="Search Product"
                variant="outlined"
                fullWidth
                value={searchQuery}
                onChange={handleSearchChange}
                sx={{ mb: 2, height: "56px" }} // Added margin bottom and set height to match buttons
              />
            </Box>
            <Box sx={{ mb: 2 }}>
              <Grid container spacing={2} alignItems="center">
                {/* Add Product Button */}
                <Grid item xs={12} sm={6} md={3}>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<Add />}
                    fullWidth
                    onClick={() => handleOpenDialog()}
                  >
                    Add Product
                  </Button>
                </Grid>

                {/* Sort Buttons */}
                <Grid item xs={12} sm={6} md={3}>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ width: "100%" }}
                    onClick={() => handleSort("stock")}
                  >
                    Stock {sortDirection === "asc" ? "↑" : "↓"}
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ width: "100%" }}
                    onClick={() => handleSort("price")}
                  >
                    Price {sortDirection === "asc" ? "↑" : "↓"}
                  </Button>
                </Grid>

                {/* Search Bar */}
                {/* <Grid item xs={12} sm={6} md={3}>
                <TextField
                    label="Search Product"
                    variant="outlined"
                    fullWidth
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                </Grid> */}
              </Grid>
            </Box>
            <TableContainer component={Paper}>
              <Table sx={{ display: { xs: "none", sm: "table" } }}>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>Product</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      Product Name
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Category</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Price</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Stock</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Sold</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredProducts.map((product) => (
                    <>
                      <TableRow key={product.id}>
                        <TableCell>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <Avatar
                              src={product.image}
                              alt={product.name}
                              sx={{
                                width: 60,
                                height: 60,
                                marginRight: 2,
                              }}
                              component={Link}
                              to="/ProductDescriptionPage"
                            />
                          </Box>
                        </TableCell>
                        <TableCell>
                          {" "}
                          <Typography
                            variant="body1"
                            sx={{
                              // overflow: "hidden",
                              // textOverflow: "ellipsis",
                              maxWidth: "300px",
                            }}
                          >
                            {product.name.length > 28
                              ? `${product.name.substring(0, 30)}...`
                              : product.name}
                          </Typography>
                        </TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell>${product.price}</TableCell>
                        <TableCell>{product.stock}</TableCell>
                        <TableCell>{product.sold}</TableCell>
                        <TableCell>
                          <Tooltip title="Edit">
                            <IconButton
                              onClick={() => handleOpenDialog(product)}
                              color="primary"
                              // component={Link}
                              // to="/TrackOrderBar"
                            >
                              <Edit />
                            </IconButton>
                          </Tooltip>

                          <Tooltip title="View Details">
                            <IconButton
                              color="primary"
                              onClick={() => handleViewProduct(product)}
                              sx={{ marginLeft: 2 }}
                            >
                              {true ? <CloseIcon /> : <ViewIcon />}
                            </IconButton>
                          </Tooltip>

                          <Tooltip title="Cancel Order">
                            <IconButton
                              color="error"
                              onClick={() => handleDeleteProduct(product.id)}
                              sx={{ marginLeft: 2 }}
                            >
                              <Delete />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    </>
                  ))}
                </TableBody>
              </Table>

              <Box sx={{ display: { xs: "block", sm: "none" } }}>
                {filteredProducts.map((product) => (
                  <>
                    <Box
                      key={product.orderId}
                      sx={{ border: "1px solid #ddd", padding: 2 }}
                    >
                      <Typography variant="body1">
                        <strong>Product Name:</strong>{" "}
                        {product.name.length > 28
                          ? `${product.name.substring(0, 30)}...`
                          : product.name}
                      </Typography>

                      <Box key={product.orderId} sx={{ padding: 2 }}>
                        <Grid container spacing={2}>
                          <Grid xs={12} sm={6} md={4}>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <Avatar
                                src={product.image}
                                alt={product.name}
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
                                  <strong>Category:</strong> {product.category}
                                </Typography>
                                <Typography variant="body2">
                                  <strong>Price:</strong> {product.price}
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                  <strong>Stock:</strong> ${product.stock}
                                </Typography>
                                <Typography variant="body2">
                                  <strong>Sold:</strong> {product.sold}
                                </Typography>
                              </Box>
                            </Box>
                          </Grid>
                        </Grid>

                        {/* Action Icons */}
                        <Box
                          sx={{
                            mt: 1,
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <IconButton
                            color="primary"
                            onClick={() => handleOpenDialog(product)}
                          >
                            <Edit />
                          </IconButton>
                          <IconButton
                            color="primary"
                            onClick={() => handleViewProduct(product)}
                          >
                            {true ? <CloseIcon /> : <ViewIcon />}
                          </IconButton>

                          <IconButton
                            color="error"
                            onClick={() => handleDeleteProduct(product.id)}
                          >
                            <Delete />
                          </IconButton>
                        </Box>
                      </Box>
                    </Box>
                  </>
                ))}
              </Box>
            </TableContainer>
          </>
        )}
      </Paper>

      {/* Product Add/Edit Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>
          {editProduct ? "Edit Product" : "Add New Product"}
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Product Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={editProduct ? editProduct.name : ""}
            onChange={(e) =>
              setEditProduct({ ...editProduct, name: e.target.value })
            }
          />
          <TextField
            label="Category"
            variant="outlined"
            fullWidth
            margin="normal"
            value={editProduct ? editProduct.category : ""}
            onChange={(e) =>
              setEditProduct({ ...editProduct, category: e.target.value })
            }
          />
          <TextField
            label="Price"
            variant="outlined"
            fullWidth
            margin="normal"
            type="number"
            value={editProduct ? editProduct.price : ""}
            onChange={(e) =>
              setEditProduct({
                ...editProduct,
                price: parseFloat(e.target.value),
              })
            }
          />
          <TextField
            label="Stock"
            variant="outlined"
            fullWidth
            margin="normal"
            type="number"
            value={editProduct ? editProduct.stock : ""}
            onChange={(e) =>
              setEditProduct({
                ...editProduct,
                stock: parseInt(e.target.value),
              })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleSaveProduct}
            color="primary"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Save"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Product View Dialog */}
      <Dialog open={viewProduct !== null} onClose={handleCloseDialog}>
        <DialogTitle>Product Details</DialogTitle>
        <DialogContent>
          {viewProduct ? (
            <>
              <Typography variant="h6">Name: {viewProduct.name}</Typography>
              <Typography variant="body1">
                Category: {viewProduct.category}
              </Typography>
              <Typography variant="body1">
                Price: ${viewProduct.price}
              </Typography>
              <Typography variant="body1">
                Stock: {viewProduct.stock}
              </Typography>
            </>
          ) : null}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminDashboard;
