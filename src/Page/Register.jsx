import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Box, Container, Typography, TextField, Button, Stack, Paper, CircularProgress } from "@mui/material";
import axios from "axios";

import AuthaxiosInstance from "../api/AuthaxiosInstance";
import schema  from "../validation/Register";import { t } from "i18next";
;


export default function Register() {

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(schema),
  });

const [servererror, setservererror] = useState({});



  const submit = async (value) => {
    console.log("Sending to API:", value);
    try {
      const response = await AuthaxiosInstance.post(
        "/Register",
        value,
        { headers: { "Content-Type": "application/json" } }
      );
      console.log("Response:", response.data.response);
      console.log(response.data);

      return response.data.response
    } catch (error) {
        console.log(error.response?.data);
    
 setservererror(error.response?.data?.errors || {}) ;
    
  console.error("Registration failed:", error.response?.data?.errors);
    
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
            {t("Register")}
          </Typography>


      {servererror && Object.keys(servererror).length > 0 && (
  <Box mt={2} color="red">
    {Object.values(servererror).flat().map((err, index) => (
      <Typography key={index}>{err}</Typography>
    ))}
  </Box>
)}

          <Box component="form" onSubmit={handleSubmit(submit)}>
            <Stack spacing={2}>
              <TextField
                label="Full Name"
                {...register("fullName")}
                error={!!errors.fullName}
                helperText={errors.fullName?.message}
                fullWidth
              />
              <TextField
                label="Username"
                {...register("userName")}
                error={!!errors.userName}
                helperText={errors.userName?.message}
                fullWidth
              />
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
              <TextField
                label="Phone Number"
                {...register("phoneNumber")}
                error={!!errors.phoneNumber}
                helperText={errors.phoneNumber?.message}
                fullWidth
              />
              {isSubmitting ?<CircularProgress/>:
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Register
              </Button>}
            </Stack>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
