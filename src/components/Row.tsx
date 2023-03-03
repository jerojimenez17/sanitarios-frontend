import {
  Box,
  Button,
  Collapse,
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton,
  Paper,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useRef, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Delete, Print, RefreshRounded } from "@mui/icons-material";
import { useReactToPrint } from "react-to-print";
import CartState from "../models/CartState";
import PrinteableProducts from "./PrinteableProducts";

interface rowProps {
  key: string;
  row: CartState;
  handleDeleteDoc: (doc: CartState) => void;
  handleOpenDeleteModal: (rowId: string) => void;
  openDeleteModal: string;
  setDocToChange: React.Dispatch<React.SetStateAction<string>>;
  refreshPrice: (sale: CartState) => void;
}

const Row = ({
  key,
  row,
  handleDeleteDoc,
  handleOpenDeleteModal,
  openDeleteModal,
  setDocToChange,
  refreshPrice,
}: rowProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => ref.current,
  });
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
          <Typography variant="h6">{row.date.toLocaleDateString()}</Typography>
        </TableCell>

        <TableCell align="center">
          <Typography variant="h6">
            $
            {row?.products
              ?.reduce(
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
                if (!open) {
                  setOpen(!open);
                }
                setTimeout(() => {
                  handlePrint();
                }, 300);
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
                handleOpenDeleteModal(row.id);
              }}
            >
              <Delete />
            </IconButton>
          </Tooltip>
          <Tooltip title="Actualizar">
            <IconButton onClick={() => refreshPrice(row)}>
              <RefreshRounded />
            </IconButton>
          </Tooltip>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Paper>
            <Collapse in={open} timeout="auto" unmountOnExit component={Paper}>
              <PrinteableProducts
                edit={false}
                products={row.products}
                reference={ref}
                client={row.client}
                date={row.date}
                documentId={row.id}
                setDocToChange={setDocToChange}
              />
              {/* <Box
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
                    {row.date.toLocaleDateString()}
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
                  {row?.products?.map((product: Product) => (
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
                  {row?.products
                      ?.reduce(
                        (acc: number, cur: { price: number; amount: number }) =>
                        acc + cur.price * cur.amount,
                        0
                      )
                      .toFixed()}
                      </Typography>
                      </Box>
              </Table>
            </Box> */}
            </Collapse>
          </Paper>
        </TableCell>
      </TableRow>
      <Dialog open={openDeleteModal === row.id}>
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
                  handleDeleteDoc(row);
                  handleOpenDeleteModal("");
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
                  handleOpenDeleteModal("");
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
