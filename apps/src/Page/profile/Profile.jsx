import { Typography, Box, Grid, Paper, Button, Divider } from "@mui/material";
import useProfile from "../../hook/useProfile";
import {Link, Outlet} from 'react-router-dom'
export default function Profile(){
    const {data}=useProfile();
    console.log(data)
    return <>
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        My Profile
      </Typography>

      <Grid container spacing={3}>
        {/* Sidebar */}
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2, borderRadius: 2, bgcolor: "background.paper" }} elevation={3}>
            <Typography variant="h6" gutterBottom>
              Menu
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Button
                component={Link}
                to=""
        
                color="primary"
                fullWidth
              >
                Info
              </Button>
              <Button
                component={Link}
                to="order"
             
                color="primary"
                fullWidth
              >
                Orders
              </Button>
            </Box>
          </Paper>
        </Grid>

        {/* Content */}
        <Grid item xs={12} md={9}>
          <Paper sx={{ p: 3, borderRadius: 2, bgcolor: "background.paper" }} elevation={3}>
            {/* بيانات المستخدم */}
            <Typography variant="h6" gutterBottom>
              Welcome, {data?.name || "User"}
            </Typography>
            <Divider sx={{ mb: 2 }} />

            {/* هنا يتم عرض Outlet */}
            <Outlet />
          </Paper>
        </Grid>
      </Grid>
    </Box>
    </>
}