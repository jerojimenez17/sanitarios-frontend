import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { DocumentData } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { fetchSales } from "../services/FireBase";
import Row from "../components/Row";

const Counts = () => {
  const [sales, setsales] = useState<DocumentData[] | null>([]);

  useEffect(() => {
    fetchSales().then((data: DocumentData[] | null) => {
      console.log(data);
      setsales(data);
    });
    console.log(sales);
  }, []);

  return (
    <Box mt={2} ml="2rem" mr="2rem" maxWidth={"50"}>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>
                <Typography variant="h6" color="primary.light">
                  Cliente
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h6" color="primary.light">
                  Fecha
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h6" color="primary.light">
                  Total
                </Typography>
              </TableCell>
              <TableCell>
                {" "}
                <Typography variant="h6" color="primary.light">
                  Acciones
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sales
              ?.sort((a, b) => a.date - b.date)
              .map((row) => (
                <Row key={row.name} row={row} />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Counts;
