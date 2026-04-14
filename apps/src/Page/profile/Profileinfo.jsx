import React from "react";
import { Typography, Box, Paper, Divider } from "@mui/material";
import useProfile from "../../hook/useProfile";

export default function Profileinfo() {
  const { data, isLoading, isError } = useProfile();

  if (isLoading) return <Typography>Loading profile info...</Typography>;
  if (isError) return <Typography color="error.main">Error loading profile info</Typography>;

  return (
    <Paper sx={{ p: 3, borderRadius: 2, bgcolor: "background.paper" }} elevation={3}>
      <Typography variant="h6" gutterBottom>
        Personal Information
      </Typography>
      <Divider sx={{ mb: 2 }} />

      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Typography><strong>Full Name:</strong> {data?.fullName || "N/A"}</Typography>
        <Typography><strong>Email:</strong> {data?.email || "N/A"}</Typography>
        <Typography><strong>Phone:</strong> {data?.phoneNumber || "N/A"}</Typography>
        <Typography><strong>City:</strong> {data?.city || "Not specified"}</Typography>
      </Box>
    </Paper>
  );
}