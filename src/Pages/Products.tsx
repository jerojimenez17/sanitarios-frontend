import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Cart from "../components/cart/Cart";
import ProductGrid from "../components/ProductsTable/ProductGrid";
import Product from "../models/Product";
import fetchProducts from "../services/ProductService";

interface ProductProps {
  openCart: boolean;
}
const Products = ({ openCart }: ProductProps) => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [productsListName, setProductListName] = useState<string>("taladro");
  const [search, setSearch] = useState<string>("");
  useEffect(() => {
    fetchProducts(productsListName).then((productsWS: Product[]) =>
      setAllProducts(productsWS)
    );
  }, [productsListName]);

  // const loadMore = () => {
  //   if (rowsPerPage + 10 < allProducts.length) {
  //     setRowsPerPage(rowsPerPage + 10);
  //     console.log(rowsPerPage);
  //   } else {
  //     setHasMore(false);
  //   }
  // };
  const handleKeyPress = (e: any) => {
    if (e.key === "Enter") {
      setSearch(e.target.value);
    }
  };
  const handleSearch = (e: any) => {
    if (e.target.value === "") {
      setSearch("");
    }
  };

  return (
    <Box display="flex" flexWrap="nowrap" height="100vh" flexDirection="column">
      <Box
        display="flex"
        mt={1}
        mb={1}
        justifyContent="flex-start"
        alignItems="center"
        alignContent="center"
        className="search-select-container"
      >
        <TextField
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            maxWidth: "25%",
            minWidth: "25%",
            maxHeight: "60px",
            height: "50px",
            ml: 4,
          }}
          variant="outlined"
          label="Buscar"
          color="primary"
          onKeyDown={handleKeyPress}
          onChange={handleSearch}
        />
        <FormControl
          color="primary"
          sx={{
            m: "2rem",
            minWidth: 200,
            height: "1.25rem",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <InputLabel color="primary" id="demo-simple-select-helper-label">
            Listas
          </InputLabel>
          <Select
            color="primary"
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={productsListName}
            variant="outlined"
            label="Listas"
            onChange={(e: any) => setProductListName(e.target.value)}
          >
            <MenuItem value="taladro">Taladro</MenuItem>
            <MenuItem value="jm">JM</MenuItem>
            <MenuItem value="cerrajeria">Cerrajeria</MenuItem>
            <MenuItem value="trebol">Trebol</MenuItem>
            <MenuItem value="nexo">Nexo</MenuItem>
            <MenuItem value="foxs">Foxs</MenuItem>
            <MenuItem value="ciardi">Ciardi</MenuItem>
            <MenuItem value="paulo">Paulo</MenuItem>
            <MenuItem value="fg">FG</MenuItem>
          </Select>
        </FormControl>

        {/* </Box>
      </Box> */}
      </Box>
      <Grid container spacing={1}>
        <Grid item xs={12} md={openCart ? 6 : 12}>
          {/* <InfiniteScroll
          dataLength={products.length}
          next={loadMore}
          hasMore={hasMore}
          loader={<h4>Cargando...</h4>}
        >
          <ProductsTable
            products={allProducts}
            rowsPerPage={rowsPerPage}
            searchText={search}
          />
        </InfiniteScroll> */}
          <ProductGrid
            openCart={openCart}
            products={allProducts.filter((product) => {
              return (
                product.description
                  ?.toString()
                  .toLocaleLowerCase()
                  .includes(search.toLowerCase()) ||
                product.cod
                  ?.toString()
                  .toLocaleLowerCase()
                  .includes(search.toLowerCase()) ||
                product.brand
                  ?.toString()
                  .toLocaleLowerCase()
                  .includes(search.toLowerCase())
              );
            })}
          />
        </Grid>
        <Grid
          item
          xs={openCart ? 12 : 0}
          md={openCart ? 6 : 0}
          hidden={!openCart}
        >
          <Cart />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Products;
