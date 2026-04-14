import { Box, CircularProgress, Typography, Grid, Button } from "@mui/material";
import { Link, useNavigate } from 'react-router-dom'; // أضفنا useNavigate
import useCategories from "../../hook/useCategories";
import Cardcatigoris from "../../ui/cartcatigoris"; 
import { useTranslation } from "react-i18next";

export default function Categories() {
  const { data, isLoading, isError, error } = useCategories(4);
  const { t } = useTranslation();
  const navigate = useNavigate(); // دالة التنقل

  if (isLoading) return <Box sx={{ display: 'flex', justifyContent: 'center', py: 5 }}><CircularProgress /></Box>;
  if (isError) return <Box component={'h3'} color={'red'}>{error.message}</Box>;

  return (
    <Box>
      <Typography component="h2" variant="h2" fontWeight={500} sx={{ mb: 4 }}>
        {t("Categories")}
      </Typography>

      <Grid container spacing={3}>
        {data.map((item) => (
          <Grid 
            item 
            key={item.id} 
            size={{xs:12, sm:6, md:4, lg:3}}
            onClick={() => navigate(`/category/${item.id}`)} // الربط المباشر بالـ Router
            sx={{ cursor: 'pointer' }} // لجعل الماوس يظهر كيد ضاغطة
          >
            <Cardcatigoris name={item.name} />
          </Grid>
        ))}
      </Grid>

      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Button
          component={Link}
          to="/Catigores"
          variant="contained"
          color="primary"
          sx={{
            borderRadius: "50px",
            padding: "10px 25px",
            fontWeight: "bold",
            boxShadow: "0 4px 10px rgba(0,0,0,0.2)"
          }}
        >
          {t("Show More")}
        </Button>
      </Box>
    </Box>
  );
}