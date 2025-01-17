import React, { createContext, useContext, useState, useMemo } from 'react';

const TableContext = createContext();

export const TableProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [filters, setFilters] = useState({});
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleColumns, setVisibleColumns] = useState([]);
  const [loading, setLoading] = useState(false);

  const value = useMemo(() => ({
    data,
    setData,
    columns,
    setColumns,
    filters,
    setFilters,
    sortColumn,
    setSortColumn,
    sortDirection,
    setSortDirection,
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
    searchTerm,
    setSearchTerm,
    visibleColumns,
    setVisibleColumns,
    loading,
    setLoading,
  }), [
    data,
    columns,
    filters,
    sortColumn,
    sortDirection,
    currentPage,
    pageSize,
    searchTerm,
    visibleColumns,
    loading,
  ]);

  return <TableContext.Provider value={value}>{children}</TableContext.Provider>;
};

export const useTableContext = () => {
  const context = useContext(TableContext);
  if (!context) {
    throw new Error('useTableContext must be used within a TableProvider');
  }
  return context;
};

