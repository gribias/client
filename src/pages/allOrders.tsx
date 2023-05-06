import React from 'react';
import {
    Grid,
    Box,
    TextField,
    Button,
    Typography,
    Stack,
    Autocomplete,
    CardContent,
    Card,
    CardHeader,
} from "@mui/material";
import { DataGrid,GridColumns } from '@mui/x-data-grid';
import {
    useDataGrid,
    NumberField,
    DateField,
} from "@refinedev/mui";
import { useTable } from '@refinedev/core';
import {IOrder} from '../interfaces/property';
import {  CustomTooltip } from "components/common/customToolTip";

const AllOrders = () => {
//   const {
//     tableQueryResult: { data, isLoading, isError },
//     current,
//     setCurrent,
//     setPageSize,
//     pageCount,
//     sorter,
//     setSorter,
//     setFilters,
//     filters,
//   } = useTable();

//   const allOrders = data?.data ?? [];

  const { dataGridProps, search, filters, sorter } = useDataGrid<
  IOrder
>({
    initialCurrent: 1,
    initialPageSize: 10,
    initialSorter: [
        {
            field: "Total",
            order: "asc",
        },
    ],
    initialFilter: [
        {
            field: "status",
            operator: "eq",
            value: "draft",
        },
    ],
    syncWithLocation: true,
});

//   const columns = [
//     { field: 'orderNumber', headerName: 'NºEncomenda', width: 200 },
//     { field: 'orderDate', headerName: 'Data de criação', width: 200 },
//     { field: 'NumberArticles', headerName: 'Número de artigos', width: 200 },
//     { field: 'Total', headerName: 'Total', width: 200 },
//   ];
const getRowId = (order: IOrder) => order.orderNumber;
const columns = React.useMemo<GridColumns<IOrder>>(
    () => [
        
        {
            field: "orderNumber",
            headerName: "NºEncomenda",
            description: "orders.fields.orderNumber",
            headerAlign: "center",
            align: "center",
            flex: 1,
            minWidth: 100,
        },
        // {
        //     field: "status.text",
        //     headerName: "orders.fields.status",
        //     headerAlign: "center",
        //     align: "center",
        //     renderCell: function render({ row }) {
        //         return <OrderStatus status={row.status.text} />;
        //     },
        //     flex: 1,
        //     minWidth: 100,
        // },
        {
            field: "Total",
            headerName: "Total",
            headerAlign: "center",
            align: "center",
            renderCell: function render({ row }) {
                return (
                    <NumberField
                        options={{
                            currency: "EUR",
                            style: "currency",
                        }}
                        value={row.Total}
                        sx={{ fontSize: "14px" }}
                    />
                );
            },
            flex: 1,
            minWidth: 100,
        },
        // {
        //     field: "store",
        //     headerName: t("orders.fields.store"),
        //     valueGetter: ({ row }) => row.store.title,
        //     flex: 1,
        //     minWidth: 150,
        //     sortable: false,
        // },
        // {
        //     field: "user",
        //     headerName: t("orders.fields.user"),
        //     valueGetter: ({ row }) => row.user.fullName,
        //     flex: 1,
        //     minWidth: 150,
        //     sortable: false,
        // },
        {
            field: "products",
            headerName: "produtos",
            headerAlign: "center",
            align: "center",
            sortable: false,
            renderCell: function render({ row }) {
                return (
                    <CustomTooltip
                        arrow
                        placement="top"
                        title={
                            <Stack sx={{ padding: "2px" }}>
                                {row.products.map((products) => (
                                    <li id={products.product._id} key={products.product._id}>{products.product.reference}</li>
                                ))}
                            </Stack>
                        }
                    >
                        <Typography sx={{ fontSize: "14px" }}>
                         {row.products.length} artigos
                        </Typography>
                        
                    </CustomTooltip>
                );
            },
            flex: 1,
            minWidth: 100,
        },
        {
            field: "createdAt",
            headerName: "Data de criação",
            flex: 1,
            minWidth: 170,
            renderCell: function render({ row }) {
                return (
                    <DateField
                        value={row.orderDate}
                        format="LLL"
                        sx={{ fontSize: "14px" }}
                    />
                );
            },
        },
        // {
        //     field: "actions",
        //     type: "actions",
        //     headerName: t("table.actions"),
        //     flex: 1,
        //     minWidth: 100,
        //     sortable: false,
        //     getActions: ({ id }) => [
        //         // @ts-expect-error `@mui/x-data-grid@5.17.12` broke the props of `GridActionsCellItem` and requires `onResize` and `onResizeCapture` props which should be optional.
        //         <GridActionsCellItem
        //             key={1}
        //             icon={<CheckOutlinedIcon color="success" />}
        //             sx={{ padding: "2px 6px" }}
        //             label={t("buttons.accept")}
        //             showInMenu
        //             onClick={() => {
        //                 mutate({
        //                     resource: "orders",
        //                     id,
        //                     values: {
        //                         status: {
        //                             id: 2,
        //                             text: "Ready",
        //                         },
        //                     },
        //                 });
        //             }}
        //         />,
        //         // @ts-expect-error `@mui/x-data-grid@5.17.12` broke the props of `GridActionsCellItem` and requires `onResize` and `onResizeCapture` props which should be optional.
        //         <GridActionsCellItem
        //             key={2}
        //             icon={<CloseOutlinedIcon color="error" />}
        //             sx={{ padding: "2px 6px" }}
        //             label={t("buttons.reject")}
        //             showInMenu
        //             onClick={() =>
        //                 mutate({
        //                     resource: "orders",
        //                     id,
        //                     values: {
        //                         status: {
        //                             id: 5,
        //                             text: "Cancelled",
        //                         },
        //                     },
        //                 })
        //             }
        //         />,
        //     ],
        // },
    ],
    [],
);

//   const rows = allOrders.map((order) => {
//     return {
//       id: order._id,
//       orderNumber: order.orderNumber,
//       orderDate: order.orderDate,
//       NumberArticles: order.NumberArticles,
//       Total: `${order.Total}€`,
//     };
//   });

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid  {...dataGridProps} columns={columns} pageSize={10} getRowId={getRowId} onRowClick={({ id }) => {
                            console.log(id);
                        }}
                        rowsPerPageOptions={[10, 20, 50, 100]}
                        sx={{
                            ...dataGridProps.sx,
                            "& .MuiDataGrid-row": {
                                cursor: "pointer",
                            },
                        }}  />
      {/* rows={rows} */}
      
    </div>
  );
};

export default AllOrders;
