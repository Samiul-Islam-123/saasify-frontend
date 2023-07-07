import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import data from "../../AdminData.json";
import { Divider, Typography } from "@mui/material";

export default function Tabulation() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      const CustomerData = data.Customers;
      const updatedRows = CustomerData.map((item) => ({
        
        id: item.CustomerID,
        name: item.CustomerName,
        email: item.CustomerEmail,
        role: item.CustomerRole,
      }));
      setRows(updatedRows);
    };

    fetchData();
  }, []);

  return (
    <>
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell><Typography variant="h6">ID</Typography></TableCell>
            <TableCell><Typography variant="h6">Customer Name</Typography></TableCell>
            <TableCell><Typography variant="h6">Email</Typography></TableCell>
            <TableCell><Typography variant="h6">Role</Typography></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.role}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    
    </>
  );
}
