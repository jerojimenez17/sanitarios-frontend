import { useContext, useEffect, useState } from "react";
import { CartContext } from "./context/CartContext";

import {
  Box,
  Button,
  Divider,
  IconButton,
  Paper,
  Tooltip,
} from "@mui/material";
import PrintIcon from "@mui/icons-material/Print";
import { DeleteSharp, EditSharp } from "@mui/icons-material";
import { db } from "../../services/FireBase";
import { addDoc, collection } from "firebase/firestore";
import CartModal from "./CartModal";
import CustomerModal from "./CustomerModal";
import PrinteableProducts from "../PrinteableProducts";
// import JimenezLogo from "../../assets/logo";

function Cart() {
  const { cartState, removeAll, clientName } = useContext(CartContext);

  const handleDeleteAll = () => {
    removeAll();
  };
  const [print, setPrint] = useState(false);

  // useEffect(() => {
  //   setTimeout(() =>{
  //   clientName("");}
  //   ,500);
  // },[handlePrint]);

  const [edit, setEdit] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState(false);
  const [openCustomerModal, setOpenCustomerModal] = useState(false);

  const collectionRef = collection(db, "sales");
  const handleSaveSale = () => {
    console.log(cartState.products.length);
    if (cartState.products.length !== 0) {
      const now = Date.now();

      cartState.date = new Date(now);
      cartState.id = cartState.date.toLocaleDateString();
      addDoc(collectionRef, cartState);
      clientName("");
      removeAll();
    }
  };

  return (
    <Paper className="itemCart">
      <Box>
        <PrinteableProducts
          print={print}
          edit={edit}
          products={cartState.products}
          client={cartState.client}
          setPrint={setPrint}
        />
        {/* <Box ref={ref} className="printeable-cart">
          <Typography variant="h3" className="title-card" color="primary" ml={1}>
          Jimenez Sanitarios
          </Typography> 
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
                 <img className="img-logo" alt="Jimenez Sanitarios" /> 
              </Box>
              <div className="date-customer-container">
                <Typography variant="h6" className="date">
                  Fecha: {fecha?.toLocaleDateString()}{" "}
                  {fecha?.toLocaleTimeString()}
                </Typography>
                {cartState.client !== "" && (
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
              <Box
                className="cart-total"
                display="flex"
                justifyContent="space-between"
                m={2}
                gap={60}
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
                      endAdornment={
                        <InputAdornment position="end">%</InputAdornment>
                      }
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
                    <Typography variant="h6">
                      Descuento: {discountState}%
                    </Typography>
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
                      Total con Descuento: $
                      {cartState.totalWithDiscount.toFixed()}
                    </Typography>x
                  )}
                </Box>
              </Box>
            </Box>
          </Box>
        </Box> */}
        <Divider />
        <Box display="flex" justifyContent="space-around" alignItems="center">
          <Button color="success" variant="contained" onClick={handleSaveSale}>
            Vender
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => setOpenModal(!openModal)}
          >
            A Cuenta
          </Button>
          <Tooltip title={"Vaciar"}>
            <IconButton onClick={handleDeleteAll} color="error">
              <DeleteSharp />
            </IconButton>
          </Tooltip>
          <Tooltip title={"Editar"}>
            <IconButton onClick={() => setEdit(!edit)} color="primary">
              <EditSharp />
            </IconButton>
          </Tooltip>

          <Tooltip title={"Imprimir"}>
            <IconButton
              onClick={() => {
                setPrint(!print);
              }}
              color="success"
              onClickCapture={() => {
                edit && setEdit(!edit);
              }}
            >
              <PrintIcon />
            </IconButton>
          </Tooltip>
        </Box>
        <CartModal open={openModal} handleClose={() => setOpenModal(false)} />
        <CustomerModal
          open={openCustomerModal}
          handleClose={() => setOpenCustomerModal(false)}
        />
      </Box>
    </Paper>
  );
}

export default Cart;
