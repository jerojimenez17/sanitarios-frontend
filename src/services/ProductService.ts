import axios from "axios";

const fetchProducts = (route: string) => {
  return axios
    .get("https://sanitarios-backend-production-9972.up.railway.app/api/productos/" + route, {
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
