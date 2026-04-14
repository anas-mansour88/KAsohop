import React, { useState } from "react"; 
import { 
  Box, Typography, Table, TableBody, TableCell, 
  TableContainer, TableRow, Paper, Button, Divider, Grid,
  FormControl, InputLabel, Select, MenuItem, CircularProgress
} from "@mui/material";
import useAuth from "../../hook/useAuth";
import { useNavigate } from "react-router-dom";
import PaymentsIcon from '@mui/icons-material/Payments'; 

import useCheckout from "../../hook/useCheckout";

export default function Checkout() {
  const { data, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  
  // ✅ جعلنا القيمة الافتراضية Cash بحرف كبير لتطابق السيرفر
  const [paymentMethod, setPaymentMethod] = useState('Cash');

  // ✅ استخراج القيم الصحيحة من الهوك
  const { mutate: checkout, isPending } = useCheckout();

  if (authLoading) return <Typography align="center" sx={{ mt: 5 }}>Loading Summary...</Typography>;

  return (
    <Box sx={{ py: 5, px: { xs: 2, md: 8 } }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>
        Checkout Summary
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={7}>
          <TableContainer component={Paper} elevation={2} sx={{ borderRadius: 2 }}>
            <Table>
              <TableBody>
                {data?.items?.map((item) => (
                  <TableRow key={item.productId}>
                    <TableCell>
                      <Typography sx={{ fontWeight: '500' }}>{item.productName}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Qty: {item.count}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography sx={{ fontWeight: 'bold' }}>${item.totalPrice}</Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          
          <Button variant="text" onClick={() => navigate('/caret')} sx={{ mt: 2 }}>
            ← Edit Cart
          </Button>
        </Grid>

        <Grid item xs={12} md={5}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 2, bgcolor: '#fbfbfb' }}>
            <Typography variant="h6" gutterBottom>Order Summary</Typography>
            <Divider sx={{ my: 2 }} />
            
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                <PaymentsIcon color="primary" /> Payment Method
              </Typography>
              
              <FormControl fullWidth size="small">
                <InputLabel id="payment-label">Select Method</InputLabel>
                <Select
                  labelId="payment-label"
                  value={paymentMethod}
                  label="Select Method"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                >
                  {/* ✅ القيم هنا يجب أن تطابق ما يقبله السيرفر */}
                  <MenuItem value="Cash">Cash on Delivery</MenuItem>
                  <MenuItem value="Visa">Visa</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Divider sx={{ my: 2 }} />
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography>Subtotal:</Typography>
              <Typography sx={{ fontWeight: 'bold' }}>${data?.cartTotal}</Typography>
            </Box>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              <Typography variant="h6">Total Amount:</Typography>
              <Typography variant="h6" color="primary.main">${data?.cartTotal}</Typography>
            </Box>

            <Button 
              variant="contained" 
              fullWidth 
              size="large" 
              color="success"
              disabled={isPending} 
              sx={{ py: 1.5, fontWeight: 'bold', fontSize: '1.1rem' }}
              // ✅ التعديل هنا: إرسال كائن بداخلة PaymentMethod بحرف P كبير
              onClick={() => checkout({ PaymentMethod: paymentMethod })}
              startIcon={isPending ? <CircularProgress size={20} color="inherit" /> : null}
            >
              {isPending ? 'Processing...' : 'Place Order Now'}
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
