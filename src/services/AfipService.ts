import axios from "axios";
import BillingData from "../models/BillingData";
import Product from "../models/Product";
import CartState from "../models/CartState";

export const postBill = async (cartState: CartState) => {
  try {
    const response = await axios.post("http://localhost:3002/api/afip", {
      cartState: cartState,
    });
    return response.data;
  } catch (err) {
    console.error(err);
  }
};
