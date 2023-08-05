import {
  Avatar,
  Dialog,
  DialogContent,
  Divider,
  List,
  ListItem,
  ListItemButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import CartState from "../models/CartState";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../services/FireBase";
import { FirebaseAdapter } from "../models/FirebaseAdapter";
import { CartContext } from "./cart/context/CartContext";

import AssignmentIcon from "@mui/icons-material/Assignment";
import { blue, green } from "@mui/material/colors";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";

interface CountsModalProps {
  open: boolean;
  handleClose: (value: React.SetStateAction<boolean>) => void;
}
const VouchersModal = ({ open, handleClose }: CountsModalProps) => {
  const [counts, setCounts] = useState<CartState[] | null>([]);

  const [nameCount, setNameCount] = useState("");
  useEffect(() => {
    onSnapshot(collection(db, "AFIPvouchers"), (querySnapshot) => {
      const newSales = FirebaseAdapter.fromDocumentDataArray(
        querySnapshot.docs
      );
      setCounts(newSales);
    });
  }, []);

  const { setState } = useContext(CartContext);

  return (
    <Dialog
      scroll={"paper"}
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
    >
      <Paper>
        <DialogContent>
          <List>
            <ListItem sx={{ width: "100%" }}>
              <Avatar sx={{ bgcolor: green[500] }}>
                <CreateNewFolderIcon />
              </Avatar>
              <TextField
                sx={{ marginLeft: 2 }}
                placeholder="Buscar Cuenta"
                onChange={(e) => setNameCount(e.target.value)}
              ></TextField>
            </ListItem>
            {counts
              ?.sort((a, b) => a.date.getTime() - b.date.getTime())
              .map((sale) => {
                return (
                  <ListItemButton
                    sx={{ width: "100%" }}
                    onClick={() => {
                      setState(sale);
                      handleClose(true);
                    }}
                  >
                    <Avatar sx={{ bgcolor: blue[500] }}>
                      <AssignmentIcon />
                    </Avatar>
                    <Typography ml={3}>
                      {sale.CAE?.nroComprobante}
                    </Typography>
                  </ListItemButton>
                );
              })}
          </List>
          <Divider />
        </DialogContent>
      </Paper>
    </Dialog>
  );
};

export default VouchersModal;
