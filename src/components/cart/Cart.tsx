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
import { DeleteSharp, EditSharp, PeopleAltOutlined } from "@mui/icons-material";
import { db } from "../../services/FireBase";
import { addDoc, collection } from "firebase/firestore";
import CartModal from "./CartModal";
import CustomerModal from "./CustomerModal";
import PrinteableProducts from "../PrinteableProducts";
import CountsModal from "../CountsModal";
import ReceiptIcon from "@mui/icons-material/Receipt";
import SourceIcon from "@mui/icons-material/Source";
import VouchersModal from "../VouchersModal";
// import JimenezLogo from "../../assets/logo";

function Cart() {
  const { cartState, removeAll, clientName, CAE } = useContext(CartContext);

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
  const [openCountsModal, setOpenCountsModal] = useState(false);
  const [openVouchersModal, setOpenVouchersModal] = useState(false);

  const collectionRef = collection(db, "sale");
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
  const handleGetAccount = () => {};
  useEffect(() => {
    if (cartState.CAE?.CAE !== "") {
      setPrint(true);
    } else {
      setPrint(false);
    }
  }, [cartState.CAE]);
  const handleFacturacion = (importe: number) => {
    setOpenCustomerModal(true);
    // postBill(importe);
  };

  return (
    <Paper className="itemCart">
      <Box>
        <PrinteableProducts
	  date={cartState.date!== new Date()? cartState.date : new Date(Date.now())}
          print={print}
          edit={edit}
          products={cartState.products}
          client={cartState.client}
          setPrint={setPrint}
        />
        <Divider />
        <Box display="flex" justifyContent="space-around" alignItems="center">
          {/* <Button color="success" variant="contained" onClick={handleSaveSale}>
            Vender
          </Button> */}
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

          <Tooltip title={"Facturar"}>
            <IconButton
              onClick={() => {
                handleFacturacion(
                  cartState.products.reduce(
                    (acc, cur) => acc + cur.price * cur.amount,
                    0
                  )
                );
              }}
              color="success"
              onClickCapture={() => {
                edit && setEdit(!edit);
              }}
            >
              <ReceiptIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title={"Traer Cuenta"}>
            <IconButton
              onClick={() => {
                setOpenCountsModal(!openCountsModal);
              }}
              color="primary"
              // onClickCapture={() => {
              //   edit && setEdit(!edit);
              // }}
            >
              <PeopleAltOutlined />
            </IconButton>
          </Tooltip>
          <Tooltip title={"Facturas"}>
            <IconButton
              onClick={() => {
                setOpenVouchersModal(!openVouchersModal);
              }}
              color="primary"
              // onClickCapture={() => {
              //   edit && setEdit(!edit);
              // }}
            >
              <SourceIcon />
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
        <CountsModal
          open={openCountsModal}
          handleClose={() => setOpenCountsModal(false)}
        />
        <VouchersModal
          open={openVouchersModal}
          handleClose={() => setOpenVouchersModal(false)}
        />
      </Box>
    </Paper>
  );
}

export default Cart;
