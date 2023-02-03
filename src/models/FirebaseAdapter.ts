import { DocumentData } from "firebase/firestore";
import CartState from "./CartState";

export class FirebaseAdapter {
  public static fromDocumentDataArray(data: DocumentData[]): CartState[] {
    return data.map((d) => FirebaseAdapter.fromDocumentData(d.data()));
  }

  public static fromDocumentData(data: DocumentData): CartState {
    console.log(data.date);
    return {
      products: data.products,
      total: data.total,
      totalWithDiscount: data.totalWithDiscount,
      client: data.client,
      date: new Date(
        data.date.seconds * 1000 + data.date.nanoseconds / 1000000000
      ),
    } as CartState;
  }
}
