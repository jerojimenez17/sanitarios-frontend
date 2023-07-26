import { ProductionQuantityLimitsTwoTone } from "@mui/icons-material";
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import React from "react";

interface LeftDrawerProps {
  open: boolean;
  onClose: () => void;
}

const LeftDrawer = ({ open, onClose }: LeftDrawerProps) => {
  return (
    <Drawer open={open} onClose={onClose} anchor="left" variant="temporary">
      <Typography variant="h5" color="primary" align="center">
        MENU
      </Typography>
      <List>
        <Divider variant="middle" />
        <Link to="/products" style={{ textDecoration: "none" }}>
          <ListItem>
            <ListItemIcon>
              <ProductionQuantityLimitsTwoTone color="success" />
            </ListItemIcon>
            <ListItemText>
              <Typography variant="h6" color="primary">
                Productos
              </Typography>
            </ListItemText>
          </ListItem>
        </Link>
        <Divider variant="middle" />

        <Link to="/counts" style={{ textDecoration: "none" }}>
          <ListItem>
            <ListItemIcon>
              <LocalLibraryIcon color="error" />
            </ListItemIcon>
            <ListItemText>
              <Typography variant="h6" color="primary">
                Cuentas
              </Typography>
            </ListItemText>
          </ListItem>
        </Link>
        <Divider variant="middle" />
      </List>
    </Drawer>
  );
};

export default LeftDrawer;
