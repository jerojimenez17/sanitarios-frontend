import { DocumentData } from "firebase/firestore";
import CartState from "./CartState";

export class FirebaseAdapter {
  public static fromDocumentDataArray(data: DocumentData[]): CartState[] {
    return data.map((d) => FirebaseAdapter.fromDocumentData(d.data(), d.id));
  }

  public static fromDocumentData(
    data: DocumentData,
    dataId: string
  ): CartState {
    return {
      id: dataId,
      products: data.products,
      total: data.total,
      totalWithDiscount: data.totalWithDiscount,
      client: data.client,
      entrega: data.entrega,
      IVACondition: data.IVACondition,
      tipoFactura: data.tipoFactura,
      documentNumber: data.documentNumber,
      typeDocument: data.typeDocument,
      nroAsociado:data.nroAsociado,
      CAE: data.CAE,
      date: new Date(
        data.date.seconds * 1000 + data.date.nanoseconds / 1000000000
      ),
    } as CartState;
  }
}
