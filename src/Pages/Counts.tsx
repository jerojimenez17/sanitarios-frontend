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
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import React, { useCallback, useEffect, useState } from "react";
import { db, fetchSales, updateProduct } from "../services/FireBase";
import Row from "../components/Row";
import { fetchProductById } from "../services/ProductService";
import Product from "../models/Product";
import CartState from "../models/CartState";
import { FirebaseAdapter } from "../models/FirebaseAdapter";

const Counts = () => {
  const [sales, setsales] = useState<CartState[] | null>([]);
  const [openDeleteModal, setOpenDeleteModal] = useState("");

  const [docToChange, setDocToChange] = useState("");

  const handleOpenDeleteModal = (rowId: string) => {
    console.log(rowId);
    setOpenDeleteModal(rowId);
  };

  const handleDelete = useCallback((row: CartState) => {
    deleteDoc(doc(db, "sales", row.id));
  }, []);

  const refreshPrice = (sale: CartState) => {
    sale.products.forEach(async (product) => {
      fetchProductById(product.id, product.cod, product.description)
        .then((product: Product[]) => {
          updateProduct(sale.id, product[0]);
        })
        .catch((error) => {
          console.error(error);
        });
    });
  };
  // };

  useEffect(() => {
    if (openDeleteModal === "") {
      fetchSales().then((data: CartState[] | null) => {
        console.log(data);
        setsales(data);
      });
    }
    onSnapshot(collection(db, "sales"), (querySnapshot) => {
      const newSales = FirebaseAdapter.fromDocumentDataArray(
        querySnapshot.docs
      );
      setsales(newSales);
    });
  }, []);
  return (
    <Box
      mt={2}
      ml="2rem"
      mr="2rem"
      minHeight="100vh"
      display="flex"
      flexWrap="wrap"
    >
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
              ?.sort((a, b) => a.date.getTime() - b.date.getTime())
              ?.map((row) => (
                <Row
                  key={row.id}
                  row={row}
                  handleDeleteDoc={handleDelete}
                  handleOpenDeleteModal={handleOpenDeleteModal}
                  openDeleteModal={openDeleteModal}
                  setDocToChange={setDocToChange}
                  refreshPrice={refreshPrice}
                />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Counts;
