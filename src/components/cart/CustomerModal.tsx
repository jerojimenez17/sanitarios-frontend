import {
  Backdrop,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, {
  ChangeEvent,
  ChangeEventHandler,
  FormEvent,
  useContext,
  useEffect,
  useState,
} from "react";
import { CartContext } from "./context/CartContext";
import CartState from "../../models/CartState";
import { postBill } from "../../services/AfipService";
import AfipResp from "../../models/AfipResp";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../services/FireBase";

interface CustomerModalProps {
  open: boolean;
  handleClose: (value: React.SetStateAction<boolean>) => void;
}

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
const CustomerModal = ({ open, handleClose }: CustomerModalProps) => {
  const {
    cartState,
    typeDocument,
    documentNumber,
    IVACondition,
    CAE,
    tipoFactura,
    nroAsociado,
  } = useContext(CartContext);
  const [documentNumberError, setDocumentNumberError] =
    useState<boolean>(false);
  const [emptyCart, setEmptyCart] = useState(false);
  const [response, setResponse] = useState<AfipResp>();
  const [errorAmount, setErrorAmount] = useState(false);
  const [openConfirmation, setOpenConfirmation] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setOpenConfirmation(true);
  };
  const collectionRef = collection(db, "AFIPvouchers");
  const handleCreateBoucher = () => {
    postBill(cartState).then(async (resp: AfipResp) => {
      console.log(resp);
      CAE({
        CAE: resp.afip.CAE,
        vencimiento: resp.afip.CAEFchVto,
        nroComprobante: resp.nroCbte,
        qrData: resp.qrData,
      });

      await addDoc(collectionRef, cartState);
      setResponse(resp);
    });
  };
  const handleErrorProducts = () => {
    if (cartState.products.length === 0) {
      setEmptyCart(true);
    } else {
      setEmptyCart(false);
    }
  };

  useEffect(() => {
    handleErrorProducts();
    handleErrorAmount();
    console.log(cartState.CAE?.CAE);
  }, [cartState]);

  const handleErrorAmount = () => {
    if (
      cartState.documentNumber === 0 &&
      cartState.products.reduce(
        (acc, cur) => acc + cur.price * cur.amount,
        0
      ) >= 61534
    ) {
      setErrorAmount(true);
    } else {
      setErrorAmount(false);
    }
  };
  const handleChangeNumber = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (
      (cartState.typeDocument === "DNI" && e.target.value.length === 8) ||
      (cartState.typeDocument === "CUIT" && e.target.value.length === 11)
    ) {
      setDocumentNumberError(false);
      documentNumber(Number(e.target.value));
      console.log(cartState.documentNumber);
    } else {
      if (e.target.value === "" || e.target.value === "0") {
        setDocumentNumberError(false);
        documentNumber(0);
      } else {
        setDocumentNumberError(true);
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
        sx={{ minWidth: "20vw", minHeight: "40vh" }}
      >
        <DialogContent>
          <Box sx={{ minWidth: "20vw", minHeight: "40vh" }}>
            <form
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-around",
              }}
              onSubmit={(e: FormEvent<HTMLFormElement>) => {
                handleSubmit(e);
              }}
            >
              <FormControl
                color="primary"
                error={errorAmount || documentNumberError}
              >
                <InputLabel
                  sx={{
                    ml: 1,
                    mt: 1,
                  }}
                >
                  Tipo Factura
                </InputLabel>
                <Select
                  sx={{ m: 1 }}
                  labelId="conditionIVASelect"
                  id="facturaSelect"
                  value={cartState.tipoFactura}
                  label="Tipo de factura"
                  onChange={(e) => {
                    tipoFactura(e.target.value);
                  }}
                  error={errorAmount || documentNumberError}
                >
                  <MenuItem value="C">C</MenuItem>
                  <MenuItem value="Nota de credito">Nota de credito</MenuItem>
                </Select>
                {cartState.tipoFactura !== "C" && (
                  <>
                    <TextField
                      sx={{ m: 1 }}
                      type="number"
                      value={cartState.nroAsociado}
                      placeholder={cartState.nroAsociado?.toString()}
                      onChange={(e) => nroAsociado(Number(e.target.value))}
                      error={documentNumberError}
                    ></TextField>
                  </>
                )}
                <FormControl>
                  <InputLabel
                    sx={{
                      ml: 1,
                      mt: 1,
                    }}
                  >
                    Condicion IVA
                  </InputLabel>
                  <Select
                    sx={{ m: 1 }}
                    labelId="conditionIVASelect"
                    id="IVASelect"
                    value={cartState.IVACondition}
                    label="Condicion frente a IVA"
                    onChange={(e) => {
                      IVACondition(e.target.value);
                    }}
                    error={errorAmount || documentNumberError}
                  >
                    <MenuItem value="Consumidor Final">
                      Consumidor Final
                    </MenuItem>
                    <MenuItem value="IVA Excento">IVA Excento</MenuItem>
                  </Select>
                </FormControl>
                <FormControl error={errorAmount || documentNumberError}>
                  <InputLabel sx={{ ml: 1, mt: 1 }}>Tipo de Doc</InputLabel>
                  <Select
                    sx={{ m: 1 }}
                    labelId="documentTypeSelect"
                    id="DocumentSelect"
                    value={
                      cartState.IVACondition === "IVA Excento"
                        ? "CUIT"
                        : cartState.typeDocument
                    }
                    label="Type document"
                    onChange={(e) => {
                      if (cartState.IVACondition === "IVA Excento") {
                        typeDocument("CUIT");
                      } else {
                        typeDocument(e.target.value);
                      }
                    }}
                  >
                    <MenuItem value="CUIT">CUIT</MenuItem>
                    <MenuItem value="DNI">DNI</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  sx={{ m: 1 }}
                  type="number"
                  placeholder={cartState.documentNumber?.toLocaleString()}
                  onChange={handleChangeNumber}
                  error={documentNumberError}
                ></TextField>
                <Button
                  disabled={emptyCart || documentNumberError || errorAmount}
                  type="submit"
                >
                  Facturar
                </Button>
              </FormControl>
            </form>
          </Box>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button onClick={() => handleClose(false)} color="error">
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openConfirmation}
        onClose={() => setOpenConfirmation(false)}
      >
        <DialogContent>
          Seguro quiere crear el siguiente comprobante?
          <br />
          {cartState.IVACondition}
          <br />
          {cartState.typeDocument}
          <br />
          Nro: {cartState.documentNumber}
          <br />
          Total:{" $"}
          {cartState.products
            .reduce((acc, cur) => acc + cur.price * cur.amount, 0)
            .toFixed()}
        </DialogContent>
        <DialogActions>
          <Button
            variant="text"
            color="error"
            onClick={() => setOpenConfirmation(false)}
          >
            Cancelar
          </Button>
          <Button variant="outlined" onClick={handleCreateBoucher}>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CustomerModal;
