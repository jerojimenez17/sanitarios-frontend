import React, { useContext, useEffect, useState } from "react";

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Product from "../../models/Product";
import { CartContext } from "../cart/context/CartContext";
interface propsGrid {
  products: Product[];
  openCart: boolean;
}
const ProductGrid = ({ products, openCart }: propsGrid) => {
  const columns: GridColDef[] = [
    {
      field: "cod",
      headerName: "Codigo",
      headerClassName: "header-grid",
      width: openCart ? 60 : 120,
      minWidth: 60,
    },
    {
      field: "description",
      headerName: "Descripcion",
      headerClassName: "header-grid",
      width: openCart ? 350 : 700,
      editable: true,
    },
    {
      field: "brand",
      headerName: "Marca",
      headerClassName: "header-grid",
      width: openCart ? 100 : 350,
      editable: true,
    },
    {
      field: "price",
      headerName: "Precio",
      headerClassName: "header-grid",
      type: "number",
      width: 110,
      editable: true,
    },
  ];

  const { addItem } = useContext(CartContext);
  const [selectionModel, setSelectionModel] = useState<Product[]>([]);

  useEffect(() => {
    console.log(selectionModel);
  }, [selectionModel, setSelectionModel]);

  return (
    <div style={{ height: "80vh", width: "100%" }}>
      <DataGrid
        sx={{
          boxShadow: 2,
        }}
        className="products-grid"
        density="standard"
        rows={products}
        columns={columns}
        pageSize={9}
        onSelectionModelChange={(ids) => {
          const selectedIDs = new Set(ids);
          const selectedRowData = products
            .filter((row) => selectedIDs.has(row.id.toString()))
            .map((row) => {
              addItem(row);
            });
        }}
        rowsPerPageOptions={[5]}
      />
    </div>
  );
};

export default ProductGrid;
