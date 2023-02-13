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
import { db, fetchSales, updateProduct } from "../services/FireBase";
import Row from "../components/Row";
import { fetchProductById } from "../services/ProductService";
import Product from "../models/Product";
import CartState from "../models/CartState";

const Counts = () => {
  const [sales, setsales] = useState<CartState[] | null>([]);
  const [newProductsState, setNewProductsState] = useState<any[]>([]);
  const [newSalesState, setNewSalesState] = useState<CartState[]>([]);
  const [openDeleteModal, setOpenDeleteModal] = useState("");

  const handleOpenDeleteModal = (rowId: string) => {
    setOpenDeleteModal(rowId);
  };

  const handleDelete = useCallback((row: CartState) => {
    deleteDoc(doc(db, "sales", row.id));
  }, []);
  const refreshPrice = (sale: CartState) => {
    let newSales: CartState[] = [];
    // sales.forEach(async (sale) => {

    let newSale: CartState = {
      id: "",
      products: [],
      total: 0,
      totalWithDiscount: 0,
      client: "",
      date: new Date(0),
    };
    let newProducts: Product[] = [];
    sale.products.forEach(async (product) => {
      fetchProductById(product.id, product.cod, product.description)
        .then((product: Product[]) => {
          console.log(product[0]);
          console.log(sale);
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
        if (sales && sales.length > 0) {
          sales?.forEach((s) => refreshPrice(s));
        }
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
              ?.sort((a, b) => a.date.getTime() - b.date.getTime())
              ?.map((row) => (
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
