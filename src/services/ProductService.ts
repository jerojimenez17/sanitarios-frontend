import axios from "axios";

const fetchProducts = (route: string) => {
  return axios
    .get("https://sanitarios-backend.onrender.com/api/productos/" + route, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      //console.log(response.data);
      return response.data;
    })
    .catch((e: Error) => {
      console.log(e);
      return [];
    });
};

export default fetchProducts;
