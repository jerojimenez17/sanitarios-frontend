import Product from "./Product";

export default interface CartState {
  products: Product[];
  total: number;
  totalWithDiscount: number;
  client: string;
  date?: Date;
}
