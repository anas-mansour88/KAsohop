import { 
  Box, 
  CircularProgress, 
  Typography, 
  Grid 
} from "@mui/material";
// 1. استيراد useNavigate من مكتبة الراوتر
import { useNavigate } from 'react-router-dom';
import useCategories from "../../hook/useCategories";
import Cardcatigoris from "../../ui/cartcatigoris";

export default function Catigorespages() {
  const { data, isLoading, isError, error } = useCategories(100);
  // 2. تعريف دالة الـ navigate
  const navigate = useNavigate();

  console.log(data);

  if (isLoading) return (
    <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
      <CircularProgress />
    </Box>
  );

  if (isError) return (
    <Box component={'h3'} color={'red'} textAlign="center">
      {error.message}
    </Box>
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography component="h2" variant="h2" fontWeight={500} sx={{ mb: 4 }}>
        Categories
      </Typography>

      <Grid container spacing={3}>
        {data.map((item) => (
          <Grid 
            item 
            key={item.id} 
            size={{xs:12, sm:6, md:4, lg:3}}
            // استخدام الـ navigate للانتقال للمسار الذي حددته في الـ Router
            onClick={() => navigate(`/category/${item.id}`)} 
            sx={{ cursor: 'pointer' }} 
          >
            <Cardcatigoris name={item.name} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}