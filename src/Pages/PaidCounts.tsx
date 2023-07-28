import {
  Box,
  CircularProgress,
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

const PaidCounts = () => {
  const [sales, setsales] = useState<CartState[] | null>([]);
  const [newProductsState, setNewProductsState] = useState<any[]>([]);
  const [newSalesState, setNewSalesState] = useState<CartState[]>([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState("");

  const [docToChange, setDocToChange] = useState("");

  const handleOpenDeleteModal = (rowId: string) => {
    console.log(rowId);
    setOpenDeleteModal(rowId);
  };

  const handleDelete = useCallback((row: CartState) => {
    deleteDoc(doc(db, "paids", row.id));
  }, []);

  const refreshPrice = (sale: CartState) => {
    let newProducts: Product[] = [];
    sale.products.forEach(async (product) => {
      fetchProductById(product.id, product.cod, product.description)
        .then(async (product: Product[]) => {
          setLoading(true);
          console.log(product[0]);
          console.log(sale);
          await updateProduct(sale.id, product[0]);
          setLoading(false);
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
    onSnapshot(collection(db, "paids"), (querySnapshot) => {
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
      {loading && (
        <CircularProgress sx={{ position: "fixed", top: "50%", left: "50%" }} />
      )}
      <TableContainer component={Paper}>
        <Typography variant="h4" color="primary">
          Cuentas Pagas
        </Typography>
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
                  loading={loading}
                />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default PaidCounts;
