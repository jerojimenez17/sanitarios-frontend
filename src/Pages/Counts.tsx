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
import { deleteDoc, doc, DocumentData } from "firebase/firestore";
import React, { useCallback, useEffect, useState } from "react";
import { db, fetchSales } from "../services/FireBase";
import Row from "../components/Row";

const Counts = () => {
  const [sales, setsales] = useState<DocumentData[] | null>([]);
  const [openDeleteModal, setOpenDeleteModal] = useState("");

  const handleOpenDeleteModal = (rowId: string) => {
    setOpenDeleteModal(rowId);
  };

  const handleDelete = useCallback((row: DocumentData) => {
    deleteDoc(doc(db, "sales", row.id));
  }, []);
  useEffect(() => {
    if (!openDeleteModal) {
      fetchSales().then((data: DocumentData[] | null) => {
        console.log(data);
        setsales(data);
      });
    }
  }, [openDeleteModal]);
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
                <Row
                  key={row.id}
                  row={row}
                  handleDeleteDoc={handleDelete}
                  handleOpenDeleteModal={handleOpenDeleteModal}
                  openDeleteModal={openDeleteModal}
                />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Counts;
