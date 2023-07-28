import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import CartState from "../models/CartState";
import { addEntrega } from "../services/FireBase";

interface CashModalProps {
  open: boolean;
  handleClose: () => void;
  row: CartState;
}
export const CashModal = ({ open, handleClose, row }: CashModalProps) => {
  const [entrega, setEntrega] = useState(0);
  return (
    <Dialog open={open}>
      <DialogTitle>Ingrese monto que entrega de {row.client}</DialogTitle>
      <TextField
        type="number"
        onChange={(e) => setEntrega(Number(e.target.value))}
      />
      <DialogActions>
        <Box display="flex" justifyContent="space-between">
          <Box display="flex">
            <Button
              variant="contained"
              color="error"
              onClick={() => handleClose()}
            >
              Cancelar
            </Button>
          </Box>
          <Box display="flex">
            <Button
              variant="outlined"
              color="primary"
              onClick={() => {
                addEntrega(row.id, entrega);
                handleClose();
              }}
            >
              Aceptar
            </Button>
          </Box>
        </Box>
      </DialogActions>
    </Dialog>
  );
};
