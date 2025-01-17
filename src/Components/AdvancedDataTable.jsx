import React, { useState, useMemo, useEffect } from 'react';
import TableList from './TableList';

const AdvancedDataTable = ({ tables, currentTableId, onTableSelect }) => {
  const [sortColumn, setSortColumn] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({});
  const [showFilters, setShowFilters] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  useEffect(() => {
    setCurrentPage(1);
    setFilters({});
    setSearchTerm('');
    setSortColumn('');
    setSortDirection('asc');
  }, [currentTableId]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters, searchTerm, itemsPerPage]);

  const handleSort = (columnKey) => {
    if (sortColumn === columnKey) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(columnKey);
      setSortDirection('asc');
    }
  };

  const handleFilterChange = (columnKey, value) => {
    setFilters(prev => ({
      ...prev,
      [columnKey]: value
    }));
    setCurrentPage(1); 
  };

  const handleItemsPerPageChange = (e) => {
    const newItemsPerPage = parseInt(e.target.value, 10);
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  const normalizeText = (text) => {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  };

  const getFilterOptions = (columnKey) => {
    const currentTable = tables.find(table => table.id === currentTableId);
    const columnData = currentTable.data.map(item => item[columnKey]);

    if (typeof columnData[0] === 'number') {
      const min = Math.min(...columnData);
      const max = Math.max(...columnData);
      const step = (max - min) / 5;
      return Array.from({ length: 5 }, (_, i) => {
        const start = min + i * step;
        const end = start + step;
        return `${start.toFixed(2)} - ${end.toFixed(2)}`;
      });
    } else {
      return [...new Set(columnData)].sort();
    }
  };

  const filteredAndSortedData = useMemo(() => {
    const currentTable = tables.find(table => table.id === currentTableId);
    const filtered = [...currentTable.data]
      .filter(row => 
        Object.entries(filters).every(([key, value]) => {
          if (!value) return true;
          const rowValue = row[key];
          if (key === 'nome') {
            return normalizeText(rowValue).includes(normalizeText(value));
          } else if (key === 'salario' || key === 'preco') {
            const [min, max] = value.split(' - ').map(parseFloat);
            return rowValue >= min && rowValue <= max;
          } else if (key === 'estoque') {
            const [min, max] = value.split(' - ').map(parseInt);
            return rowValue >= min && rowValue <= max;
          } else {
            return rowValue === value;
          }
        })
      )
      .filter(row =>
        Object.values(row).some(value => {
          const normalizedValue = normalizeText(value.toString());
          const normalizedSearchTerm = normalizeText(searchTerm);
          return normalizedValue.includes(normalizedSearchTerm);
        })
      )
      .sort((a, b) => {
        if (sortColumn) {
          const aValue = a[sortColumn];
          const bValue = b[sortColumn];
          if (typeof aValue === 'string') {
            return sortDirection === 'asc' 
              ? normalizeText(aValue).localeCompare(normalizeText(bValue))
              : normalizeText(bValue).localeCompare(normalizeText(aValue));
          } else {
            return sortDirection === 'asc' 
              ? aValue - bValue
              : bValue - aValue;
          }
        }
        return 0;
      });

    return {
      data: filtered,
      total: filtered.length
    };
  }, [filters, searchTerm, sortColumn, sortDirection, currentTableId, tables]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedData.data.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSortedData, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredAndSortedData.total / itemsPerPage);

  const goToPage = (page) => {
    const newPage = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(newPage);
  };

  const getPageRange = () => {
    const range = [];
    const maxVisiblePages = 5;
    const leftOffset = Math.floor(maxVisiblePages / 2);

    let start = Math.max(1, currentPage - leftOffset);
    let end = Math.min(totalPages, start + maxVisiblePages - 1);

    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(1, end - maxVisiblePages + 1);
    }

    if (start > 1) {
      range.push(1);
      if (start > 2) {
        range.push('...');
      }
    }

    for (let i = start; i <= end; i++) {
      range.push(i);
    }

    if (end < totalPages) {
      if (end < totalPages - 1) {
        range.push('...');
      }
      range.push(totalPages);
    }

    return range;
  };

  const currentTable = tables.find(table => table.id === currentTableId);

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="px-4 py-5 sm:px-6 flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:justify-between sm:items-center bg-gray-50">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          {currentTable.title}
        </h3>
        <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
          <TableList
            tables={tables}
            currentTableId={currentTableId}
            onTableSelect={onTableSelect}
          />
          <div className="flex gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex-1 sm:flex-none px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {showFilters ? 'Esconder Filtros' : 'Mostrar Filtros'}
            </button>
            <button
              onClick={() => {
                const csvContent = "data:text/csv;charset=utf-8," 
                  + currentTable.columns.map(col => col.label).join(",") + "\n"
                  + currentTable.data.map(row => currentTable.columns.map(col => row[col.key]).join(",")).join("\n");
                const encodedUri = encodeURI(csvContent);
                const link = document.createElement("a");
                link.setAttribute("href", encodedUri);
                link.setAttribute("download", `${currentTable.title}.csv`);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
              className="flex-1 sm:flex-none px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Exportar CSV
            </button>
          </div>
        </div>
      </div>
      <div className="px-4 py-3 border-b border-gray-200">
        <input
          type="text"
          placeholder="Pesquisar..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); 
          }}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      {showFilters && (
        <div className="px-4 py-3 border-b border-gray-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {currentTable.columns.map(column => (
            <div key={column.key} className="flex flex-col">
              <label htmlFor={column.key} className="block text-sm font-medium text-gray-700 mb-1">
                {column.label}
              </label>
              {column.key === 'nome' ? (
                <input
                  type="text"
                  id={column.key}
                  value={filters[column.key] || ''}
                  onChange={(e) => handleFilterChange(column.key, e.target.value)}
                  placeholder={`Filtrar ${column.label}`}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              ) : (
                <select
                  id={column.key}
                  value={filters[column.key] || ''}
                  onChange={(e) => handleFilterChange(column.key, e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Todos</option>
                  {getFilterOptions(column.key).map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              )}
            </div>
          ))}
        </div>
      )}
      <div className="flex-grow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {currentTable.columns.map((column) => (
                <th
                  key={column.key}
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort(column.key)}
                >
                  <div className="flex items-center">
                    {column.label}
                    {sortColumn === column.key && (
                      sortDirection === 'asc' ? (
                        <span className="ml-1">▲</span>
                      ) : (
                        <span className="ml-1">▼</span>
                      )
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan={currentTable.columns.length} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                  Nenhum resultado encontrado para a busca atual.
                </td>
              </tr>
            ) : (
              paginatedData.map((row, rowIndex) => (
                <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  {currentTable.columns.map((column) => (
                    <td key={`${rowIndex}-${column.key}`} className="px-4 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-sm text-gray-500 truncate max-w-xs">
                      {column.key === 'salario' || column.key === 'preco' 
                        ? `R$ ${row[column.key].toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` 
                        : row[column.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="bg-white px-4 py-3 flex flex-col sm:flex-row items-center justify-between border-t border-gray-200 sm:px-6">
        <div className="flex-1 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="mb-4 sm:mb-0">
            <p className="text-sm text-gray-700">
              Mostrando <span className="font-medium">{Math.min((currentPage - 1) * itemsPerPage + 1, filteredAndSortedData.total)}</span> a <span className="font-medium">{Math.min(currentPage * itemsPerPage, filteredAndSortedData.total)}</span> de{' '}
              <span className="font-medium">{filteredAndSortedData.total}</span> resultados
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-700">Itens por página:</span>
            <select
              value={itemsPerPage.toString()}
              onChange={handleItemsPerPageChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
            </select>
          </div>
        </div>
        <div className="mt-4 sm:mt-0 flex justify-center">
          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span className="sr-only">Anterior</span>
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </button>
            <div className="hidden sm:flex">
              {getPageRange().map((page, index) => (
                page === '...' ? (
                  <span key={`ellipsis-${index}`} className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                    ...
                  </span>
                ) : (
                  <button
                    key={page}
                    onClick={() => goToPage(page)}
                    className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                      currentPage === page
                        ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                        : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                )
              ))}
            </div>
            <div className="flex sm:hidden">
              <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                Página {currentPage} de {totalPages}
              </span>
            </div>
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span className="sr-only">Próximo</span>
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default AdvancedDataTable;

