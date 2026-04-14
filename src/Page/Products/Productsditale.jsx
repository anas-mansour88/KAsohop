import { useParams } from "react-router-dom";
import { useState } from "react"; // أضفنا useState للتحكم في مدخلات التقييم
import { 
  Box, Card, Typography, CardMedia, CircularProgress, 
  Rating, Divider, Button, Chip, Stack, TextField, Paper, Avatar, Grid 
} from "@mui/material";
import { ShoppingCart, CheckCircle, Inventory, Send } from "@mui/icons-material";
import useProduct from "../../hook/useProduct";
import useADDTOCARD from "../../hook/useADDTOCARD.JSX";
import useGetProductReviews from "../../hook/useGetProductReviews"; // استيراد الهوك الجديد

export default function ProductDetails() {
  const { id } = useParams();
  const [userRating, setUserRating] = useState(0);
  const [userComment, setUserComment] = useState("");

  const { data, isLoading, isError, error } = useProduct(id);
  const { mutate, isPending } = useADDTOCARD();
  
  // استخدام هوك التقييمات
  const { reviews, addReview, isSubmitting, isLoading: isReviewsLoading } = useGetProductReviews(id);

  const handleAddReview = () => {
    if (userRating === 0 || userComment.trim() === "") return;
    
    addReview({
      rating: userRating,
      comment: userComment,
      productId: id
    }, {
      onSuccess: () => {
        setUserRating(0);
        setUserComment("");
      }
    });
  };

  if (isLoading) return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
      <CircularProgress size={60} />
    </Box>
  );
  
  if (isError) return <Typography color="error" align="center" sx={{ mt: 5 }}>Error: {error?.message}</Typography>;

  const product = data?.response; 
  if (!product) return <Typography align="center" sx={{ mt: 5 }}>Product Not Found</Typography>;

  return (
    <Box sx={{ p: { xs: 2, md: 5 }, maxWidth: 1200, margin: "0 auto" }}>
      <Card sx={{ 
        display: "flex", 
        flexDirection: { xs: 'column', md: 'row' }, 
        p: 3, gap: 4, borderRadius: 4, boxShadow: "0 10px 30px rgba(0,0,0,0.1)", mb: 5
      }}>
        {/* قسم الصورة */}
        <Box sx={{ flex: 1, textAlign: 'center' }}>
          <CardMedia 
            component="img" 
            image={product.image} 
            alt={product.name}
            sx={{ width: '100%', maxHeight: 500, objectFit: 'contain', borderRadius: 2, backgroundColor: '#f9f9f9' }} 
          />
        </Box>

        {/* قسم التفاصيل */}
        <Box sx={{ flex: 1.2, display: 'flex', flexDirection: 'column' }}>
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
            <Typography variant="h4" fontWeight="bold" gutterBottom>{product.name}</Typography>
            <Chip 
              icon={<CheckCircle />} 
              label={product.quantity > 0 ? "In Stock" : "Out of Stock"} 
              color={product.quantity > 0 ? "success" : "error"} 
              variant="outlined" 
            />
          </Stack>

          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
            <Rating value={product.rate || 0} readOnly precision={0.5} />
            <Typography variant="body2" color="text.secondary">
              ({reviews?.length || 0} reviews)
            </Typography>
          </Stack>

          <Typography variant="h3" color="primary.main" fontWeight="bold" sx={{ mb: 2 }}>
            ${product.price}
          </Typography>

          <Divider sx={{ mb: 3 }} />

          <Typography variant="h6" fontWeight="bold" gutterBottom>Description</Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.7, mb: 3 }}>
            {product.description}
          </Typography>

          <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 4 }}>
             <Inventory color="action" />
             <Typography variant="body2">Available: <b>{product.quantity}</b> items</Typography>
          </Stack>

          <Box sx={{ mt: 'auto' }}>
            <Button 
              variant="contained" 
              size="large" 
              startIcon={<ShoppingCart />}
              fullWidth
              disabled={isPending || product.quantity <= 0}
              onClick={() => mutate({ ProductId: product.id, Count: 1 })}
              sx={{ py: 1.5, borderRadius: 2, fontSize: '1.1rem', textTransform: 'none' }}
            >
              Add to Shopping Cart
            </Button>
          </Box>
        </Box>
      </Card>

      {/* --- قسم التقييمات (Reviews Section) --- */}
      <Typography variant="h4" fontWeight="bold" sx={{ mb: 3 }}>Customer Reviews</Typography>
      
      <Grid container spacing={4}>
        {/* قائمة التقييمات السابقة */}
        <Grid item xs={12} md={7}>
          {isReviewsLoading ? <CircularProgress size={24} /> : (
            <Stack spacing={3}>
              {reviews.length > 0 ? reviews.map((rev, index) => (
                <Paper key={index} sx={{ p: 2, borderRadius: 3, bgcolor: '#fbfbfb' }} elevation={0}>
                  <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 1 }}>
                    <Avatar sx={{ width: 32, height: 32, fontSize: '0.9rem' }}>{rev.userName?.charAt(0) || 'U'}</Avatar>
                    <Typography variant="subtitle2" fontWeight="bold">{rev.userName || "Customer"}</Typography>
                    <Rating value={rev.rating} readOnly size="small" />
                  </Stack>
                  <Typography variant="body2" color="text.secondary">{rev.comment}</Typography>
                </Paper>
              )) : (
                <Typography color="text.secondary">No reviews yet for this product.</Typography>
              )}
            </Stack>
          )}
        </Grid>

        {/* نموذج إضافة تقييم جديد */}
        <Grid item xs={12} md={5}>
          <Paper sx={{ p: 3, borderRadius: 4, border: '1px solid #eee' }} elevation={0}>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>Write a Review</Typography>
            <Stack spacing={2}>
              <Box>
                <Typography variant="body2" sx={{ mb: 0.5 }}>Your Rating:</Typography>
                <Rating value={userRating} onChange={(e, val) => setUserRating(val)} size="large" />
              </Box>
              <TextField 
                fullWidth 
                multiline 
                rows={3} 
                placeholder="Share your thoughts about the product..."
                value={userComment}
                onChange={(e) => setUserComment(e.target.value)}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
              />
              <Button 
                variant="contained" 
                color="secondary" 
                endIcon={!isSubmitting && <Send />}
                onClick={handleAddReview}
                disabled={isSubmitting || userRating === 0 || !userComment.trim()}
                sx={{ borderRadius: 3, py: 1 }}
              >
                {isSubmitting ? <CircularProgress size={24} color="inherit" /> : "Post Review"}
              </Button>
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}