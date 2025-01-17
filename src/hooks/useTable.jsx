import { useEffect, useMemo } from 'react';
import { useTableContext } from '../Context/TableContext';

export const useTable = (initialData, initialColumns) => {
  const {
    data,
    setData,
    columns,
    setColumns,
    filters,
    sortColumn,
    sortDirection,
    currentPage,
    pageSize,
    searchTerm,
    visibleColumns,
    setVisibleColumns,
    setLoading,
  } = useTableContext();

  useEffect(() => {
    setData(initialData);
    setColumns(initialColumns);
    setVisibleColumns(initialColumns.map(col => col.key));
  }, [initialData, initialColumns, setData, setColumns, setVisibleColumns]);

  const filteredData = useMemo(() => {
    setLoading(true);
    let result = [...data];

    // Apply filters
    Object.entries(filters).forEach(([key, value]) => {
      result = result.filter(item => {
        const itemValue = item[key];
        if (typeof itemValue === 'string') {
          return itemValue.toLowerCase().includes(value.toLowerCase());
        }
        if (typeof itemValue === 'number') {
          return itemValue === parseFloat(value);
        }
        if (itemValue instanceof Date) {
          return itemValue.toISOString().startsWith(value);
        }
        return true;
      });
    });

    // Apply global search
    if (searchTerm) {
      result = result.filter(item =>
        Object.values(item).some(val =>
          String(val).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Apply sorting
    if (sortColumn) {
      result.sort((a, b) => {
        if (a[sortColumn] < b[sortColumn]) return sortDirection === 'asc' ? -1 : 1;
        if (a[sortColumn] > b[sortColumn]) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }

    setLoading(false);
    return result;
  }, [data, filters, searchTerm, sortColumn, sortDirection, setLoading]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredData.slice(startIndex, startIndex + pageSize);
  }, [filteredData, currentPage, pageSize]);

  return {
    paginatedData,
    totalItems: filteredData.length,
  };
};

