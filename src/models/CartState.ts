import Product from "./Product";

export default interface CartState {
  id: string;
  products: Product[];
  total: number;
  totalWithDiscount: number;
  client: string;
  date: Date;
}
