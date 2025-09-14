import React from 'react';
import Slider from 'react-slick';
import { Box, Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import { AddShoppingCart } from '@mui/icons-material';

// Sample Trending Items Data
const trendingItems = [
  {
    id: 1,
    name: 'Smartphone',
    price: 799,
    image: 'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'A high-end smartphone with great features.',
  },
  {
    id: 2,
    name: 'Laptop',
    price: 1200,
    image: 'https://images.pexels.com/photos/4509334/pexels-photo-4509334.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'A powerful laptop for work and play.',
  },
  {
    id: 3,
    name: 'Headphones',
    price: 150,
    image: 'https://images.pexels.com/photos/1601073/pexels-photo-1601073.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Noise-canceling headphones for a premium listening experience.',
  },
  {
    id: 4,
    name: 'Smartwatch',
    price: 199,
    image: 'https://images.pexels.com/photos/925040/pexels-photo-925040.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'A sleek smartwatch with fitness tracking.',
  },
];

const TrendingItemsCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center' }}>
        Trending Items
      </Typography>
      <Slider {...settings}>
        {trendingItems.map((item) => (
          <Box key={item.id} sx={{ padding: 1 }}>
            <Card sx={{ display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                height="200"
                image={item.image}
                alt={item.name}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  {item.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {item.description}
                </Typography>
                <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
                  ${item.price}
                </Typography>
              </CardContent>
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddShoppingCart />}
                sx={{ margin: 1 }}
              >
                Add to Cart
              </Button>
            </Card>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default TrendingItemsCarousel;
