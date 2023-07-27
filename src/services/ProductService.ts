import axios from "axios";
import Product from "../models/Product";

const fetchProducts = async (route: string) => {
  try {
    const response = await axios.get(
      "https://sanitarios-backend-production-9972.up.railway.app/api/productos/" + route,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (e) {
    console.log(e);
    return [];
  }
};

export const fetchProductById = async (
  id: string,
  cod: string,
  description: string
): Promise<Product[]> => {
  try {
    const listName = id.split("-")[0];
    const response = await axios.get(
      `https://sanitarios-backend-production-9972.up.railway.app/api/productos/${listName}/` +
        cod
          .toString()
          .toLocaleLowerCase()
          .replace(/[^a-zA-Z0-9]/g, "") +
        "/" +
        description
          .toLocaleLowerCase()
          // .replace(/\//g, "-")
          // .replace(/\s/g, "-")
          // .replace(/`/g, "-")
          // .replace(/'/g, "/"),
          .replace(/[^a-zA-Z0-9]/g, ""),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default fetchProducts;
