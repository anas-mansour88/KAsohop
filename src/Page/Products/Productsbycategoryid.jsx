import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Box, 
  Grid, 
  Typography, 
  TextField, 
  MenuItem, 
  Select, 
  FormControl, 
  InputLabel, 
  CircularProgress,
  Container,
  InputAdornment,
  Card,          // تأكد من وجود هذه
  CardMedia,     // تأكد من وجود هذه
  CardContent    // تأكد من وجود هذه
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search'; 
import useGetProductsByCategory from '../../hook/useGetProductsByCategory'; 

const Productsbycategoryid = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: products, isLoading, isError, error } = useGetProductsByCategory(id);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortType, setSortType] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (products && products.response) {
      setFilteredProducts(products.response);
    } else if (Array.isArray(products)) {
      setFilteredProducts(products);
    }
  }, [products]);

  useEffect(() => {
    const actualData = products?.response || (Array.isArray(products) ? products : []);
    if (actualData.length === 0 && !searchTerm && !sortType) return;

    let result = [...actualData];

    if (searchTerm) {
      result = result.filter(item => 
        item.name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortType === "low") {
      result.sort((a, b) => (a.price || 0) - (b.price || 0));
    } else if (sortType === "high") {
      result.sort((a, b) => (b.price || 0) - (a.price || 0));
    }

    setFilteredProducts(result);
  }, [searchTerm, sortType, products]);

  if (isLoading) return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
      <CircularProgress size={50} thickness={4} color="primary" />
    </Box>
  );

  if (isError) return (
    <Container sx={{ mt: 5 }}>
      <Box sx={{ p: 4, bgcolor: '#fff1f0', color: '#cf1322', borderRadius: '12px', textAlign: 'center' }}>
        <Typography variant="h6">Error: {error.message}</Typography>
      </Box>
    </Container>
  );

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Box sx={{ mb: 6, textAlign: 'left' }}>
        <Typography variant="h3" fontWeight="700" gutterBottom>Category Results</Typography>
        <Typography variant="body1" color="textSecondary">Browse our top products.</Typography>
      </Box>

      <Grid container spacing={3} sx={{ mb: 8 }}>
        <Grid item xs={12} md={8}>
          <TextField 
            fullWidth 
            placeholder="Search products..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (<InputAdornment position="start"><SearchIcon /></InputAdornment>),
              sx: { borderRadius: '12px', backgroundColor: '#f9f9f9' }
            }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl fullWidth>
            <InputLabel>Sort By</InputLabel>
            <Select value={sortType} label="Sort By" onChange={(e) => setSortType(e.target.value)} sx={{ borderRadius: '12px' }}>
              <MenuItem value="">Default</MenuItem>
              <MenuItem value="low">Price: Low to High</MenuItem>
              <MenuItem value="high">Price: High to Low</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      
      <Grid container spacing={4}>
        {filteredProducts.map((product) => (
          <Grid item key={product?.id || Math.random()} xs={12} sm={6} md={4} lg={3}>
            {/* الحل الجذري: نستخدم Card من MUI مباشرة وليس CardProducts */}
            <Card 
              sx={{ 
                height: '100%', borderRadius: '16px', transition: '0.3s', 
                '&:hover': { transform: 'translateY(-5px)', boxShadow: 6 },
                cursor: 'pointer'
              }}
              onClick={() => navigate(`/Product/${product?.id}`)}
            >
              <CardMedia
                component="img"
                height="200"
                image={product?.image || 'https://via.placeholder.com/200'}
                alt={product?.name}
                sx={{ objectFit: 'contain', p: 2, bgcolor: '#f9f9f9' }}
              />
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="subtitle1" fontWeight="bold" noWrap>
                  {product?.name || "Product"}
                </Typography>
                <Typography variant="h6" color="primary" fontWeight="bold">
                  ${product?.price || "0.00"}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Productsbycategoryid;