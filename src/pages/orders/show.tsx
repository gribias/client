import { DataGrid, GridCellParams, GridColDef } from "@mui/x-data-grid";
import { useShow } from "@refinedev/core";
import React from "react";
import { Avatar, Box, Stack, Typography } from "@mui/material";

interface IOrder {
  _id: string;
  user: string;
  orderDate: string;
  orderNumber: string;
  NumberArticles: number;
  Total: number;
  products: {
    product: {
      _id: string;
      reference: string;
      material: string;
      cost: number;
      photo: string;
    };
    quantity: number;
    _id: string;
    size: string | null;
  }[];
  creator: string;
  __v: number;
}

export const OrderShow: React.FC = () => {
  const { queryResult } = useShow<IOrder>();
  const record = queryResult.data?.data;

  const columns: GridColDef[] = [
    {
      field: "product",
      headerName: "Photo",
      width: 150,
      renderCell: (params: GridCellParams) => (
        <Stack direction="row" spacing={4} alignItems="center">
          <Avatar
            sx={{ width: 108, height: 108 }}
            src={params.row.product.photo}
          />
        </Stack>
      ),
    },
    {
      field: "product.reference",
      headerName: "Reference",
      width: 150,
      renderCell: (params: GridCellParams) => (
        <Typography variant="body1" whiteSpace="break-spaces">
          {params.row.product.reference}
        </Typography>
      ),
    },
    {
      field: "product.material",
      headerName: "Material",
      width: 150,
      renderCell: (params: GridCellParams) => (
        <Typography variant="body1">{params.row.product.material}</Typography>
      ),
    },
    {
      field: "product.cost",
      headerName: "Cost",
      type: "number",
      width: 100,
      renderCell: (params: GridCellParams) => (
        <Typography variant="body1">{params.row.product.cost}</Typography>
      ),
    },
    {
      field: "quantity",
      headerName: "Quantity",
      type: "number",
      width: 100,
      renderCell: (params: GridCellParams) => (
        <Typography variant="body1">{params.row.quantity}</Typography>
      ),
    },
    {
      field: "size",
      headerName: "Size",
      width: 100,
      renderCell: (params: GridCellParams) => (
        <Typography variant="body1">{params.row.size}</Typography>
      ),
    },
  ];
  

  return (
    <div style={{ height: 300, width: "100%" }}>
      <DataGrid
        autoHeight
        rows={record?.products ?? []}
        columns={columns}
        getRowId={(row) => row._id}
        hideFooterPagination
        rowHeight={124}
      />
    </div>
  );
};


