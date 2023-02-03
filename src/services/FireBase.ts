// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import {
  doc,
  getFirestore,
  collection,
  getDocs,
  DocumentData,
  updateDoc,
  arrayUnion,
  addDoc,
  serverTimestamp,
  runTransaction,
  Transaction,
} from "firebase/firestore";
import CartState from "../models/CartState";
import Product from "../models/Product";
import { FirebaseAdapter } from "../models/FirebaseAdapter";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBTV-Q47ZTg_brtsrH63meMVaHQq5uJW7Y",
  authDomain: "jimenez-sanitarios.firebaseapp.com",
  projectId: "jimenez-sanitarios",
  storageBucket: "jimenez-sanitarios.appspot.com",
  messagingSenderId: "1020459471858",
  appId: "1:1020459471858:web:74b374d8ddeb34e639916b",
  measurementId: "G-DHV80207QV",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);

export const fetchSales = async () => {
  const collectionRef = collection(db, "sales");
  let sales: CartState[] = [];
  const docSnap = await getDocs(collectionRef);

  let s: CartState = {
    id: "",
    products: [],
    client: "",
    total: 0,
    totalWithDiscount: 0,
    date: new Date(),
  };
  const adapterDocs: CartState[] = FirebaseAdapter.fromDocumentDataArray(
    docSnap.docs
  );
  if (adapterDocs.length > 0) {
    return adapterDocs;
  } else {
    return null;
  }
};
export const less = async (document: CartState, productToUpdate: Product) => {
  try {
    const docRef = doc(db, "sales", document.id);
    await runTransaction(db, async (transaction) => {
      const doc = await transaction.get(docRef);
      if (!doc.exists()) {
        throw "document doesn't exist";
      }
      const formatedDoc = FirebaseAdapter.fromDocumentData(doc);
      const products = formatedDoc.products;
      const newProduct = formatedDoc.products.find(
        (product) =>
          product.id === productToUpdate.id &&
          product.description === productToUpdate.description
      );
      products.
    });
  } catch (err) {
    console.error(err);
  }
};

export const addProductsToClient = async (
  document: DocumentData,
  newProducts: Product[]
) => {
  const docRef = doc(db, "sales", document.id);

  console.log(docRef);
  newProducts.forEach((newProduct) => {
    updateDoc(docRef, {
      products: arrayUnion(newProduct),
    });
  });
};
// save the products in documents

export const saveProducts = async (list: string, products: Product[]) => {
  const date = new Date();
  const collectionRef = collection(db, `${list}`);
  const docref = await addDoc(collectionRef, {
    products,
    timestamp: serverTimestamp(),
    listName: list,
  });
};

//fetch the products from Firebase
export const fetchProductsFromFB = async (list: string) => {
  const collectionRef = collection(db, `${list}`);
  const docSnap = await getDocs(collectionRef);
  const productsRes: Product[] = [];
  docSnap.docs.forEach((doc) => {
    const p: Product = {
      id: "",
      cod: "",
      description: "",
      brand: "",
      price: 0,
      amount: 0,
    };
    p.id = doc.data().id;
    p.cod = doc.data().cod;
    p.description = doc.data().description;
    p.amount = doc.data().amount;
    p.brand = doc.data().brand;
    p.price = doc.data().price;
    productsRes.push(p);
  });
  return productsRes;
};

//refresh the price to a list of products

const refreshProducts = async (list: string, products: Product) => {
  const collectionRef = collection(db, `${list}`);
};
