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
import React, {
  MutableRefObject,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useReactToPrint } from "react-to-print";
import Product from "../models/Product";
import CartItems from "./cart/CartItems";
import { CartContext } from "./cart/context/CartContext";
import logo from "../assets/logo.png";
interface PrinteableProductsProps {
  edit: boolean;
  reference?: MutableRefObject<null>;
  print?: boolean;
  products: Product[];
  date?: Date;
  client?: string;
  setPrint?: React.Dispatch<React.SetStateAction<boolean>>;
  documentId?: string;
  setDocToChange?: React.Dispatch<React.SetStateAction<string>>;
}
const PrinteableProducts = ({
  edit,
  reference,
  print,
  setPrint,
  date,
  documentId,
  products,
  client,
  setDocToChange,
}: PrinteableProductsProps) => {
  const [fecha, setFecha] = useState<Date>();
  const [discountState, setDiscountState] = useState(0);

  const { cartState, discount, clientName } = useContext(CartContext);
  const ref = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => ref.current,
  });
  useEffect(() => {
    if (print && setPrint) {
      handlePrint();
      setPrint(!print);
    }
  }, [print]);
  useEffect(() => {
    const hoy = Date.now();
    if (date) {
      setFecha(date);
    } else {
      setFecha(new Date(hoy));
    }
  }, [print]);
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
    <Box ref={reference ? reference : ref} className="printeable-cart">
      {/* <Typography variant="h3" className="title-card" color="primary" ml={1}>
  Jimenez Sanitarios
  </Typography>  */}
      <Box m={1} className="cart">
        <Box display="flex">
          <Box className="logo">
            {/* <Typography
              variant="h4"
              className="title-card"
              color="primary"
              ml={2}
            >
              Jimenez Sanitarios
            </Typography> */}
            <img className="img-logo" alt="Jimenez Sanitarios" src={logo} />
          </Box>
          <div className="date-customer-container">
            <Typography variant="h6" className="date">
              Fecha:{fecha?.toLocaleDateString()} {fecha?.toLocaleTimeString()}
            </Typography>
            {client !== "" && (
              <Typography className="customer" variant="h6">
                Cliente: {client}
              </Typography>
            )}
          </div>
        </Box>

        <Divider />
        <Box className="products-cart">
          <CartItems
            edit={edit}
            products={products}
            count={date !== undefined}
            documentId={documentId}
            setDocToChange={setDocToChange}
          />
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
              Total: $
              {products
                .reduce((acc, cur) => acc + cur.price * cur.amount, 0)
                .toFixed()}
            </Typography>
            {discountState !== 0 && (
              <Typography
                variant="h5"
                className="title-card"
                color="primary"
                mr={1}
              >
                Total con Descuento: $
                {(
                  cartState.products.reduce(
                    (acc, cur) => acc + cur.price * cur.amount,
                    0
                  ) -
                  cartState.products.reduce(
                    (acc, cur) => acc + cur.price * cur.amount,
                    0
                  ) *
                    discountState *
                    0.01
                ).toFixed()}
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PrinteableProducts;
