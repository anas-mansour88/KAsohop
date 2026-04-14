import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Box, Container, Paper, Typography, TextField, Button, Stack, CircularProgress } from "@mui/material";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import useAuthStor from "../Stor/UseAuthStor";
import schema from "../validation/Login";
import { t } from "i18next";
import AuthaxiosInstance from "../api/AuthaxiosInstance";

export default function Login() {
 
  
  const navigate = useNavigate();
  const setToken = useAuthStor((state) => state.setToken);

  const { register, handleSubmit, formState: { errors,isSubmitting } } = useForm({
    resolver: yupResolver(schema),
  });

  const submit = async (data) => {
    console.log("Login Data:", data);

    try {
      const response = await AuthaxiosInstance.post(
        "/Login",
        data,
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("Response:", response.data);

 
      const token = response.data.token || response.data.accessToken;

      if (token) {
        setToken(token);
        console.log("Token Saved:", token);
      }


  
      navigate("/");

    } catch (error) {
      console.log("Error:", error.response?.data || error.message);
  
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f5f5f5",
        p: 2,
      }}
    >
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            {t("Login")}
          </Typography>

          <Box component="form" onSubmit={handleSubmit(submit)}>
            <Stack spacing={2}>
              <TextField
                label="Email"
                type="email"
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email?.message}
                fullWidth
              />
              <TextField
                label="Password"
                type="password"
                {...register("password")}
                error={!!errors.password}
                helperText={errors.password?.message}
                fullWidth
              />
            


               {isSubmitting ? <CircularProgress/> :     <Button type="submit" variant="contained" color="primary" fullWidth>
                Login
              </Button>}
            </Stack>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
