import Product from "./Product";

export default class Sales {
  products: Product[];
  total: number;
  totalWithDiscount: number;
  client: string;
  date?: Date;

  constructor(
    products: Product[],
    total: number,
    totalWithDiscount: number,
    client: string,
    date?: Date
  ) {
    this.products = products;
    this.total = total;
    this.totalWithDiscount = totalWithDiscount;
    this.client = client;
    this.date = date;
  }
}
