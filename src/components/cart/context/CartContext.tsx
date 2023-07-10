import { createContext } from "react";
import CartState from "../../../models/CartState";
import Product from "../../../models/Product";
import CAE from "../../../models/CAE";

export default interface CartContextProps {
  cartState: CartState;
  addItem: (product: Product) => void;
  addUnit: (product: Product) => void;
  removeUnit: (product: Product) => void;
  removeAll: () => void;
  removeItem: (product: Product) => void;
  changePrice: (product: Product) => void;
  changeAmount: (product: Product) => void;
  total: () => void;
  discount: (disc: number) => void;
  clientName: (name: string) => void;
  typeDocument: (type: string) => void;
  documentNumber: (number: number) => void;
  IVACondition: (condition: string) => void;
  CAE: (cae: CAE) => void;
  setState: (cartState: CartState) => void;
}

export const CartContext = createContext<CartContextProps>(
  {} as CartContextProps
);
