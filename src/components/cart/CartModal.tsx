import {
  Avatar,
  Backdrop,
  Box,
  Divider,
  Fade,
  List,
  ListItemButton,
  Modal,
  Typography,
} from "@mui/material";
import { DocumentData } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { fetchSales, addProductsToClient } from "../../services/FireBase";
import { green } from "@mui/material/colors";
import { CartContext } from "./context/CartContext";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
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
  const [counts, setCounts] = useState<DocumentData[] | null>([]);

  useEffect(() => {
    fetchSales().then((data: DocumentData[] | null) => {
      setCounts(data);
    });
  }, []);

  const { cartState } = useContext(CartContext);
  const addProductsToCount = async (sale: DocumentData) => {
    await addProductsToClient(sale, cartState.products);
  };
  return (
    <div>
      <Modal
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
        <Fade in={open}>
          <Box sx={style}>
            <List>
              {counts?.map((sale) => {
                return (
                  <ListItemButton onClick={() => addProductsToCount(sale)}>
                    <Avatar sx={{ bgcolor: green[500] }}>
                      <AssignmentIcon />
                    </Avatar>
                    <Typography ml={3}>{sale.client}</Typography>
                  </ListItemButton>
                );
              })}
            </List>
            <Divider />
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
