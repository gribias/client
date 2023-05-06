import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useTable } from '@refinedev/core';

const AllOrders = () => {
  const {
    tableQueryResult: { data, isLoading, isError },
    current,
    setCurrent,
    setPageSize,
    pageCount,
    sorter,
    setSorter,
    setFilters,
    filters,
  } = useTable();

  const allOrders = data?.data ?? [];

  const columns = [
    { field: 'orderNumber', headerName: 'NºEncomenda', width: 200 },
    { field: 'orderDate', headerName: 'Data de criação', width: 200 },
    { field: 'NumberArticles', headerName: 'Número de artigos', width: 200 },
    { field: 'Total', headerName: 'Total', width: 200 },
  ];

  const rows = allOrders.map((order) => {
    return {
      id: order._id,
      orderNumber: order.orderNumber,
      orderDate: order.orderDate,
      NumberArticles: order.NumberArticles,
      Total: `${order.Total}€`,
    };
  });

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} pageSize={10} />
    </div>
  );
};

export default AllOrders;
