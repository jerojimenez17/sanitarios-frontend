import CAE from "./CAE";
import Product from "./Product";

export default interface CartState {
  id: string;
  products: Product[];
  total: number;
  totalWithDiscount: number;
  client: string;
  date: Date;
  typeDocument: string;
  documentNumber: number;
  IVACondition: string;
  CAE?: CAE;
}
