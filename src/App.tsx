import "./App.css";
import SearchAppBar from "./components/AppBar/SearchAppBar";
import { useEffect, useState } from "react";
import LeftDrawer from "./components/LeftDrawer";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Products from "./Pages/Products";
import CartProvider from "./components/cart/context/CartProvider";
import Counts from "./Pages/Counts";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { esES } from "@mui/x-data-grid";
import { pink } from "@mui/material/colors";

function App() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [page, setPage] = useState(window.location.href.split("/")[3]);
  const [searchText, setSearchText] = useState("");
  const [openCart, setOpenCart] = useState(false);
  const handleOpenDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  // const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = createTheme(
    {
      palette: {
        // mode: prefersDarkMode ? "dark" : "light",
        primary: { main: "#1976d2" },

        secondary: pink,
      },
    },
    esES // x-data-grid translations
  );
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CartProvider>
          <SearchAppBar
            page={page}
            handlePageChange={setPage}
            openCart={openCart}
            setOpenCart={setOpenCart}
            openDrawer={handleOpenDrawer}
            handleSearchText={setSearchText}
            searchText={searchText}
          />
          <LeftDrawer open={openDrawer} onClose={handleOpenDrawer} />
          <BrowserRouter>
            <Routes>
              <Route
                path="/products"
                element={<Products openCart={openCart} />}
              />
              <Route path="/counts" element={<Counts />} />
              <Route path="*" element={<Navigate to="/products" />} />
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
