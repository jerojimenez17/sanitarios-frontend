import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import Product from "../../models/Product";
import { CartContext } from "../cart/context/CartContext";
import { HTMLInputTypeAttribute, useContext, useEffect, useState } from "react";
import { blue } from "@mui/material/colors";

interface ProductsTableProps {
  products: Product[];
  rowsPerPage: number;
  searchText: string;
}

const ProductsTable = ({
  products,
  rowsPerPage,
  searchText,
}: ProductsTableProps) => {
  const [units, setUnits] = useState<number>(1);
  const { addItem } = useContext(CartContext);
  const [splittedSearch, setSplittedSearch] = useState<string[]>([]);

  useEffect(() => {
    setSplittedSearch(searchText.split(" "));
  }, [searchText]);

  return (
    <Paper>
      <Box>
        <Table style={{}}>
          {/* TO-DO: Maybe could create a component for the table header
      TO-DO: create class style for TableCell component*/}
          <TableHead>
            <TableRow sx={{ borderBottom: "3px solid blue" }}>
              <TableCell
                style={{
                  borderBottom: 2,
                  borderBottomColor: "#f09",
                  fontSize: "1.5rem",
                  fontWeight: "700",
                }}
              >
                Codigo
              </TableCell>
              <TableCell
                style={{
                  border: "#f09",
                  fontSize: "1.5rem",
                  fontWeight: "700",
                }}
              >
                Descripcion
              </TableCell>
              <TableCell
                style={{
                  border: "#f09",
                  fontSize: "1.5rem",
                  fontWeight: "700",
                }}
              >
                Marca
              </TableCell>
              <TableCell
                style={{
                  border: "#f09",
                  fontSize: "1.5rem",
                  fontWeight: "700",
                }}
              >
                Precio
              </TableCell>
              <TableCell style={{ fontSize: "1.5rem", fontWeight: "700" }} />{" "}
              {/* This is used to show bottons on rows */}
            </TableRow>
          </TableHead>
          <TableBody>
            {/* 
         Maybe could create a product table body component
        TO-DO: create a component to show the product, for example ProductItem and it will contain the TableCell*/}
            {products
              .filter((product: Product) => {
                if (splittedSearch.length === 0) {
                  return true;
                } else {
                  return splittedSearch.some((word) =>
                    product.description.toLowerCase().match(word)
                  );
                }
              })

              .slice(0, rowsPerPage)
              .map((product) => (
                <TableRow
                  key={product.id}
                  sx={{ borderBottom: "2px solid #ccc" }}
                >
                  <TableCell>{product.cod}</TableCell>
                  <TableCell>{product.description}</TableCell>
                  <TableCell>{product.brand}</TableCell>
                  <TableCell>{`$${product.price.toFixed()}`}</TableCell>
                  <TableCell>
                    {/* TO-DO: add styles to buttons and textfield */}
                    <IconButton>
                      <RemoveCircleIcon color="error" />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        addItem(product);
                      }}
                    >
                      <AddCircleIcon color="success" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Box>
    </Paper>
  );
};

export default ProductsTable;
