//interface export for product
export default interface Product {
  id: string;
  cod: string;
  description: string;
  brand: string;
  price: number;
  amount: number;
  search?: number;
}
