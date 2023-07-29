import "./App.css";
import SearchAppBar from "./components/AppBar/SearchAppBar";
import { useState } from "react";
import LeftDrawer from "./components/LeftDrawer";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Products from "./Pages/Products";
import CartProvider from "./components/cart/context/CartProvider";
import Counts from "./Pages/Counts";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { esES } from "@mui/x-data-grid";
import { blue, pink } from "@mui/material/colors";
import { Paper } from "@mui/material";
import { inherits } from "util";
import PaidCounts from "./Pages/PaidCounts";

function App() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [page, setPage] = useState(window.location.href.split("/")[3]);
  const [searchText, setSearchText] = useState("");
  const [openCart, setOpenCart] = useState(false);
  const [themeMode, setThemeMode] = useState(false);

  const handleTheme = () => {
    setThemeMode(!themeMode);
  };
  const handleOpenDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  // const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = createTheme(
    {
      palette: {
        mode: themeMode ? "dark" : "light",
        primary: { main: blue[400] },

        secondary: { main: pink[400] },
        action: {},
        text: {
          secondary: blue[400],
        },
      },
    },
    esES // x-data-grid translations
  );
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Paper>
          <CartProvider>
            <BrowserRouter>
              <SearchAppBar
                page={page}
                handlePageChange={setPage}
                openCart={openCart}
                setOpenCart={setOpenCart}
                openDrawer={handleOpenDrawer}
                handleSearchText={setSearchText}
                searchText={searchText}
                themeMode={themeMode}
                handleTheme={handleTheme}
              />
              <LeftDrawer open={openDrawer} onClose={handleOpenDrawer} />
              <Routes>
                <Route
                  path="/products"
                  element={<Products openCart={openCart} />}
                />
                <Route path="/counts" element={<Counts />} />
                <Route path="/paidcounts" element={<PaidCounts />} />
                <Route path="*" element={<Navigate to="/products" />} />
              </Routes>
            </BrowserRouter>
          </CartProvider>
        </Paper>
      </ThemeProvider>
    </div>
  );
}

export default App;
