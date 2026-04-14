import { 
  Box, CircularProgress, Typography, Table, TableBody, 
  TableCell, TableContainer, TableHead, TableRow, Paper, Button, 
  IconButton
} from "@mui/material";
import { useNavigate } from "react-router-dom"; 
import useAuth from "../hook/useAuth";
import useremove from "../hook/useremove";
import useupdateitem from "../hook/useupdateitem";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export default function Caret() {
  const { data, isLoading, isError, error } = useAuth();
  const navigate = useNavigate();
  
  const { mutate: removeitem, isPending } = useremove();
  const { mutate: updateitem, isPending: ispandingupdate } = useupdateitem();

  // تحديث الكمية
  const handlyupdate = (ProductId, Action) => {
    const item = data?.items?.find((i) => i.productId === ProductId);
    if (!item) return;

    if (Action === '-' && item.count > 1) {
      updateitem({ ProductId, Count: item.count - 1 });
    } else if (Action === '+') {
      updateitem({ ProductId, Count: item.count + 1 });
    }
  };

  // Spinner أثناء التحميل
  if (isLoading) return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
      <CircularProgress size={60} thickness={5} />
    </Box>
  );

  // رسالة خطأ إذا فشل الـ API
  if (isError) return (
    <Box sx={{ p: 2, color: 'red', textAlign: 'center' }}>
      {error?.message || "حدث خطأ أثناء تحميل عربة التسوق"}
    </Box>
  );

  // عربة فارغة
  if (!data?.items || data.items.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', mt: 10 }}>
        <Typography variant="h5">عربة التسوق فارغة حالياً 🛒</Typography>
        <Button onClick={() => navigate('/')} sx={{ mt: 2 }}>العودة للتسوق</Button>
      </Box>
    );
  }

  return (
    <Box className="cart-page" sx={{ py: 5, px: { xs: 2, md: 8 } }}>
      <Typography component="h1" variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>
        My Cart
      </Typography>

      <TableContainer component={Paper} elevation={4} sx={{ borderRadius: 3 }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead sx={{ bgcolor: '#f8f9fa' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Product Name</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>Price</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>Quantity</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>Total Price</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data?.items?.length > 0 ? (
              data.items.map((item) => (
                <TableRow key={item.productId} hover>
                  <TableCell sx={{ fontSize: '1rem' }}>{item.productName}</TableCell>
                  <TableCell align="center">${item.price}</TableCell>

                  <TableCell align="center">
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                      <IconButton 
                        onClick={() => handlyupdate(item.productId, '-')}
                        disabled={ispandingupdate || item.count <= 1}
                      >
                        <RemoveIcon />
                      </IconButton>

                      <Typography sx={{ fontWeight: 'bold', minWidth: '30px' }}>
                        {item.count}
                      </Typography>

                      <IconButton 
                        onClick={() => handlyupdate(item.productId, '+')}
                        disabled={ispandingupdate}
                      >
                        <AddIcon />
                      </IconButton>
                    </Box>
                  </TableCell>

                  <TableCell align="center" sx={{ fontWeight: '600' }}>
                    ${item.totalPrice ?? item.price * item.count}
                  </TableCell>
                  
                  <TableCell align="center">
                    <Button 
                      variant="contained" 
                      color="error" 
                      size="small"
                      onClick={() => removeitem(item.productId)}
                      disabled={isPending}
                      sx={{ textTransform: 'none', borderRadius: 2 }}
                    >
                      {isPending ? "Removing..." : "Remove"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <Typography sx={{ py: 3 }}>عربة التسوق فارغة حالياً 🛒</Typography>
                </TableCell>
              </TableRow>
            )}

            <TableRow sx={{ bgcolor: '#f0f7ff' }}>
              <TableCell colSpan={3} align="right" sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
                Cart Total:
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: '1.3rem', color: 'primary.main' }}>
                ${data?.cartTotal ?? 0}
              </TableCell>
              <TableCell />
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ display: 'flex', gap: 3, mt: 4 }}>
        <Button 
          variant="contained" 
          color="success" 
          sx={{ flex: 1, py: 1.5, fontSize: '1rem', fontWeight: 'bold' }} 
          onClick={() => navigate('/Checkout')}
        >
          Process To Checkout
        </Button>

        <Button 
          variant="outlined" 
          color="primary" 
          sx={{ flex: 1, py: 1.5, fontSize: '1rem', fontWeight: 'bold' }} 
          onClick={() => navigate('/')}
        >
          Continue Shopping
        </Button>
      </Box>
    </Box>
  );
}