import axios from "axios";
import Product from "../models/Product";

const fetchProducts = async (route: string) => {
  try {
    const response = await axios.get(
      "https://sanitarios-backend-production-9972.up.railway.app/api/productos/" +
        route,
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
  cod: string
): Promise<Product[]> => {
  try {
    const listName = id.split("-")[0];
    if (listName === "taladro") {
      const response = await axios.get(
        `https://sanitarios-backend-production-9972.up.railway.app/api/productos/${listName}/` +
          cod,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } else {
      const response = await axios.get(
        `https://sanitarios-backend-production-9972.up.railway.app/api/productos/${listName}/` +
          id,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    }
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default fetchProducts;
