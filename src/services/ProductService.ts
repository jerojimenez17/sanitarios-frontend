import axios from "axios";

const fetchProducts = (route: string) => {
  return axios
    .get("https://pacific-gorge-77207.herokuapp.com/api/productos/" + route, {
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

export const fetchProductById = (id: string) => {
  const listName = id.split("-")[0];
  return axios
    .get(
      `https://pacific-gorge-77207.herokuapp.com/api/${listName}//id?=` + id,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
      return [];
    });
};

export default fetchProducts;
