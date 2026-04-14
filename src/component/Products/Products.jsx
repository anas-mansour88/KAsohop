import { 
  Box, 
  CircularProgress, 
  Card, 
  CardContent, 
  Typography, 
  Grid, 
  CardMedia 
} from "@mui/material";

import useProducts from "../../hook/useProducts";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Products() {
  const { data = [], isLoading, isError, error } = useProducts();
const {t}=useTranslation();
  if (isLoading) return <CircularProgress />;
  if (isError) return <Box color="red">{error?.message}</Box>;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h2" fontWeight={500} sx={{ mb: 4 }}>
        {t("products")}
      </Typography>

      <Grid container spacing={3}>
        {data.map((item) => (
          <Grid key={item.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Card
              component={Link}
              to={`/product/${item.id}`}
              sx={{
                py: 2,
                textAlign: "center",
                textDecoration: "none", // يمنع الخط تحت النص
                color: "inherit",       // يحافظ على لون النص الأصلي
                height: "100%",
                display: "flex",
                flexDirection: "column",
                cursor: "pointer",
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: 3,
                },
              }}
            >
              <CardMedia
                component="img"
                image={item.image}
                alt={item.name}
                sx={{
                  height: 200,
                  objectFit: "cover",
                  width: "100%",
                }}
              />

              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom>
                  {item.name}
                </Typography>
                <Typography color="text.secondary">${item.price}</Typography>
                <Typography color="text.secondary">⭐ {item.rate}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}