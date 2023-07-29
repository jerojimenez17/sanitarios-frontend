import {
  Avatar,
  Backdrop,
  Box,
  Divider,
  Fade,
  List,
  ListItem,
  ListItemButton,
  Dialog,
  Paper,
  TextField,
  Typography,
  DialogContent,
} from "@mui/material";
import {
  addDoc,
  collection,
  DocumentData,
  onSnapshot,
} from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { fetchSales, addProductsToClient, db } from "../../services/FireBase";
import { blue, green } from "@mui/material/colors";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import { CartContext } from "./context/CartContext";
import { Console } from "console";
import { FirebaseAdapter } from "../../models/FirebaseAdapter";
import CartState from "../../models/CartState";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: "60vh",
  display: "flex",
  flexWrap: "wrap",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
interface CartModalProps {
  open: boolean;
  handleClose: (value: React.SetStateAction<boolean>) => void;
}

export default function TransitionsModal({
  open,
  handleClose,
}: CartModalProps) {
  const [nameNewCount, setNameNewCount] = useState("");
  const [counts, setCounts] = useState<CartState[] | null>([]);
  useEffect(() => {
    onSnapshot(collection(db, "sales"), (querySnapshot) => {
      const newSales = FirebaseAdapter.fromDocumentDataArray(
        querySnapshot.docs
      );
      setCounts(newSales);
    });
  }, []);

  const { cartState, clientName, removeAll } = useContext(CartContext);
  const addProductsToCount = async (sale: DocumentData) => {
    await addProductsToClient(sale, cartState.products);
    handleClose(!open);
    clientName("");
    removeAll();
  };
  const collectionRef = collection(db, "sales");

  const handleNewCount = async (e: any) => {
    if (e.key === "Enter") {
      if (cartState.products.length !== 0) {
        const now = Date.now();

        cartState.date = new Date(now);
        cartState.client = nameNewCount;
        cartState.id = cartState.date.toLocaleDateString();
        await addDoc(collectionRef, cartState);
        removeAll();
        setNameNewCount("");
        handleClose(!open);
      }
    }
  };

  return (
    <div>
      <Dialog
        scroll={"paper"}
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
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
                  placeholder="Nueva Cuenta"
                  onChange={(e) => setNameNewCount(e.target.value)}
                  onKeyDown={handleNewCount}
                ></TextField>
              </ListItem>
              {counts
                ?.filter((count) => {
                  return count.client
                    ?.toString()
                    .toLocaleLowerCase()
                    .includes(nameNewCount.toLowerCase());
                })
                .map((sale) => {
                  return (
                    <ListItemButton
                      sx={{ width: "100%" }}
                      onClick={() => addProductsToCount(sale)}
                    >
                      <Avatar sx={{ bgcolor: blue[500] }}>
                        <AssignmentIcon />
                      </Avatar>
                      <Typography ml={3}>{sale.client}</Typography>
                    </ListItemButton>
                  );
                })}
            </List>
            <Divider />
          </DialogContent>
        </Paper>
      </Dialog>
    </div>
  );
}
