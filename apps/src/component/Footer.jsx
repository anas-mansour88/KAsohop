import React from 'react';
import { Box, Container, Typography, IconButton, Stack, Link } from '@mui/material';
import { Facebook, GitHub, LinkedIn, WhatsApp } from '@mui/icons-material';

export default function Footer() {
  // تم تنظيف الرقم من المسافات والشرطات ليعمل رابط wa.me
  const phoneNumber = "972569505120"; 

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: (theme) => theme.palette.grey[200],
        py: 6,
        px: 2,
        mt: 'auto',
        borderTop: '1px solid #e0e0e0'
      }}
    >
      <Container maxWidth="lg">
        <Stack 
          direction={{ xs: 'column', sm: 'row' }} 
          justifyContent="space-between" 
          alignItems="center"
          spacing={2}
        >
          <Box>
            <Typography variant="h6" color="text.primary" gutterBottom sx={{ fontWeight: 'bold' }}>
              نظام إدارة المهام
            </Typography>
            <Typography variant="body2" color="text.secondary">
              © {new Date().getFullYear()} جميع الحقوق محفوظة.
            </Typography>
          </Box>

          <Stack direction="row" spacing={1.5}>
            <IconButton 
              component={Link} 
              href="https://www.facebook.com/share/18SL9SmMPB/?mibextid=wwXIfr" 
              target="_blank"
              sx={{ color: '#1877F2', '&:hover': { transform: 'scale(1.1)' } }}
            >
              <Facebook />
            </IconButton>

            <IconButton 
              component={Link} 
              href={`https://wa.me/${phoneNumber}`} 
              target="_blank"
              sx={{ color: '#25D366', '&:hover': { transform: 'scale(1.1)', color: '#128C7E' } }}
            >
              <WhatsApp />
            </IconButton>

            <IconButton 
              component={Link} 
              href="https://github.com/anas-mansour88" 
              target="_blank"
              sx={{ color: '#333', '&:hover': { transform: 'scale(1.1)' } }}
            >
              <GitHub />
            </IconButton>

            <IconButton 
              component={Link} 
              href="https://www.linkedin.com/in/anas-mansour-145034322?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" 
              target="_blank"
              sx={{ color: '#0A66C2', '&:hover': { transform: 'scale(1.1)' } }}
            >
              <LinkedIn />
            </IconButton>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}