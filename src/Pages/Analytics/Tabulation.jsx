import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import data from "./../../AdminData.json";
import { Divider, Typography } from "@mui/material";

export default function Tabulation() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      const ProductData = data.Products;
      const updatedRows = ProductData.map((item) => ({
        
        id: item.ProductID,
        name: item.ProductName,
        owner: item.ProductOwner,
        price: item.ProductPrice,
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
            <TableCell><Typography variant="h6">Product Name</Typography></TableCell>
            <TableCell><Typography variant="h6">Owner</Typography></TableCell>
            <TableCell><Typography variant="h6">Price ($)</Typography></TableCell>
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
              <TableCell>{row.owner}</TableCell>
              <TableCell>{row.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    
    </>
  );
}
