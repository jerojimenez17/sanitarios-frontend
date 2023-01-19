import {
  Box,
  Divider,
  FilledInput,
  FormControl,
  FormHelperText,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import Product from "../models/Product";
import CartItems from "./cart/CartItems";
import { CartContext } from "./cart/context/CartContext";

interface PrinteableProductsProps {
  edit: boolean;
  print: boolean;
  products: Product[];
  client?: string;
  setPrint: React.Dispatch<React.SetStateAction<boolean>>;
}
const PrinteableProducts = ({
  edit,
  print,
  setPrint,
  client,
}: PrinteableProductsProps) => {
  const [fecha, setFecha] = useState<Date>();
  const [discountState, setDiscountState] = useState(0);

  const { cartState, discount, clientName } = useContext(CartContext);
  const ref = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => ref.current,
  });
  useEffect(() => {
    if (print) {
      handlePrint();
      setPrint(!print);
    }
  }, [print]);
  useEffect(() => {
    const hoy = Date.now();
    setFecha(new Date(hoy));
  }, [handlePrint]);
  const handleDiscount = (e: any) => {
    if (e.key === "Enter") {
      if (e.target.value === "" || e.target.value === "0") {
        setDiscountState(0);
      } else {
        setDiscountState(e.target.value);
      }
      discount(discountState);
    }
  };
  const handleClient = (e: any) => {
    if (e.key === "Enter") {
      clientName(e.target.value);
    }
  };
  return (
    <Box ref={ref} className="printeable-cart">
      {/* <Typography variant="h3" className="title-card" color="primary" ml={1}>
  Jimenez Sanitarios
  </Typography>  */}
      <Box m={1} className="cart">
        <Box display="flex">
          <Box className="logo">
            <Typography
              variant="h4"
              className="title-card"
              color="primary"
              ml={2}
            >
              Jimenez Sanitarios
            </Typography>
            {/* <img className="img-logo" alt="Jimenez Sanitarios" /> */}
          </Box>
          <div className="date-customer-container">
            <Typography variant="h6" className="date">
              Fecha: {fecha?.toLocaleDateString()} {fecha?.toLocaleTimeString()}
            </Typography>
            {client !== "" && (
              <Typography className="customer" variant="h6">
                Cliente: {cartState.client}
              </Typography>
            )}
          </div>
        </Box>

        <Divider />
        <Box className="products-cart">
          <CartItems edit={edit} />
        </Box>

        <Divider />
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          mt={2}
          className="cart-total-container"
        >
          {edit ? (
            <FormControl sx={{ m: 1, width: "20ch" }} variant="standard">
              <TextField
                variant="standard"
                label="Cliente"
                placeholder={cartState.client}
                aria-label="cliente"
                onKeyDown={handleClient}
              />
              <FilledInput
                id="filled-adornment"
                onKeyDown={handleDiscount}
                endAdornment={<InputAdornment position="end">%</InputAdornment>}
                aria-describedby="filled-weight-helper-text"
                inputProps={{
                  "aria-label": "descuento",
                }}
              />
              <FormHelperText id="filled-weight-helper-text">
                Descuento
              </FormHelperText>
            </FormControl>
          ) : (
            <Box ml={2} mt={2}>
              <Typography variant="h6">Descuento: {discountState}%</Typography>
            </Box>
          )}
          <Box mt={2}>
            <Typography variant="h5" color="primary" mr={2} ml={1}>
              Total: ${cartState.total.toFixed()}
            </Typography>
            {discountState !== 0 && (
              <Typography
                variant="h5"
                className="title-card"
                color="primary"
                mr={1}
              >
                Total con Descuento: ${cartState.totalWithDiscount.toFixed()}
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PrinteableProducts;
