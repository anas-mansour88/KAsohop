import { Card, CardContent, Typography } from "@mui/material";


const Cardcatigoris = ({ name }) => {
  return (
    <Card sx={{ 
        py: 3, 
        textAlign: 'center', 
        
        background: 'linear-gradient(135deg, #BF953F, #FCF6BA, #B38728, #FBF5B7, #AA771C)',
        color: '#5d4037', 
        borderRadius: 2,
        boxShadow: '0 4px 15px rgba(184, 134, 11, 0.4)',
        border: '1px solid #D4AF37',
        transition: '0.3s',
        '&:hover': { transform: 'scale(1.03)', boxShadow: '0 8px 25px rgba(184, 134, 11, 0.6)' }
    }}>
      <CardContent>
        <Typography variant="h6" fontWeight="bold">
          {name}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Cardcatigoris;
