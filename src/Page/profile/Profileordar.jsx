import React from "react";
import { Typography, Paper, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import useProfile from "../../hook/useProfile";

export default function Profileordar() {
  const { data, isLoading, isError } = useProfile();

  if (isLoading) return <Typography>Loading orders...</Typography>;
  if (isError) return <Typography color="error.main">Error loading orders</Typography>;

  const orders = data?.orders || [];

  return (
    <Paper sx={{ p: 3, borderRadius: 2, bgcolor: "background.paper" }} elevation={3}>
      <Typography variant="h6" gutterBottom>
        My Orders
      </Typography>
      <Divider sx={{ mb: 2 }} />

      {orders.length === 0 ? (
        <Typography>No orders found</Typography>
      ) : (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Amount Paid</TableCell>
                <TableCell>Payment Status</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Order Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.amountPaid}</TableCell>
                  <TableCell>{order.paymentStatus}</TableCell>
                  <TableCell>{order.status}</TableCell>
                  <TableCell>{new Date(order.orderDate).toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Paper>
  );
}