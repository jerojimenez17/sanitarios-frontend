import {
  Box,
  Button,
  ButtonBase,
  Collapse,
  Dialog,
  DialogActions,
  DialogTitle,
  Divider,
  IconButton,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import { deleteDoc, doc, DocumentData } from "firebase/firestore";
import React, { useRef, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Product from "../models/Product";
import { Delete, Print } from "@mui/icons-material";
import { useReactToPrint } from "react-to-print";
import { db } from "../services/FireBase";

interface rowProps {
  key: string;
  row: DocumentData;
}

const Row = ({ key, row }: rowProps) => {
  const [open, setOpen] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const ref = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => ref.current,
  });
  const handleDelete = (row: DocumentData) => {
    deleteDoc(doc(db, "sales", row.id));
  };
  return (
    <>
      <TableRow key={key} sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand now"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          <Typography
            variant="h6"
            component="div"
            color={open ? "primary" : ""}
          >
            {row.client}
          </Typography>
        </TableCell>
        <TableCell align="center">
          <Typography variant="h6">
            {new Date(row.date.seconds * 1000).toLocaleDateString()}
          </Typography>
        </TableCell>

        <TableCell align="center">
          <Typography variant="h6">
            $
            {row.products
              .reduce(
                (acc: number, cur: { price: number; amount: number }) =>
                  acc + cur.price * cur.amount,
                0
              )
              .toFixed()}
          </Typography>
        </TableCell>
        <TableCell>
          <Tooltip title={"Imprimir"}>
            <IconButton
              onClick={() => {
                handlePrint();
              }}
              color="primary"
            >
              <Print />
            </IconButton>
          </Tooltip>
          <Tooltip title="Borrar">
            <IconButton
              color="error"
              onClick={() => {
                setOpenDeleteModal(!openDeleteModal);
              }}
            >
              <Delete />
            </IconButton>
          </Tooltip>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit component={Paper}>
            <Box
              sx={{ margin: 1, backgroundColor: "#f0f0f0", boxShadow: 2 }}
              ref={ref}
            >
              <Box display="flex" justifyContent="space-between">
                <Typography
                  m={2}
                  variant="h5"
                  gutterBottom
                  component="div"
                  color="primary"
                >
                  {row.client}
                </Typography>
                <Box display="flex" justifyContent="flex-end" m={2}>
                  <Typography variant="h6">
                    {new Date(row.date.seconds * 1000).toLocaleDateString()}
                  </Typography>
                </Box>
              </Box>
              <Divider />
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="right">Codigo</TableCell>
                    <TableCell align="right">Descripcion</TableCell>
                    <TableCell align="right">Cantidad</TableCell>
                    <TableCell align="right">Precio</TableCell>
                    <TableCell align="right"> Subtotal</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.products.map((product: Product) => (
                    <TableRow key={product.id}>
                      <TableCell align="right">{product.cod}</TableCell>
                      <TableCell align="right">{product.description}</TableCell>
                      <TableCell align="right">{product.amount}</TableCell>
                      <TableCell align="right">
                        ${Number(product.price).toFixed()}
                      </TableCell>
                      <TableCell align="right">
                        ${(product.price * product.amount).toFixed()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <Box display="flex" justifyContent="flex-end" width="100%">
                  <Typography variant="h5">
                    Total:
                    {row.products
                      .reduce(
                        (acc: number, cur: { price: number; amount: number }) =>
                          acc + cur.price * cur.amount,
                        0
                      )
                      .toFixed()}
                  </Typography>
                </Box>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      <Dialog open={openDeleteModal}>
        <DialogTitle>
          Seguro que desea eliminar la cuenta de {row.client}
        </DialogTitle>
        <DialogActions>
          <Box display="flex" justifyContent="space-between">
            <Box display="flex">
              <Button
                variant="contained"
                color="error"
                onClick={() => {
                  handleDelete(row);
                }}
              >
                Borrar
              </Button>
            </Box>
            <Box display="flex">
              <Button
                variant="outlined"
                color="primary"
                onClick={() => {
                  setOpenDeleteModal(!openDeleteModal);
                }}
              >
                Cancelar
              </Button>
            </Box>
          </Box>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Row;
