import React from 'react';
import { useTableContext } from '../Context/TableContext';
const Filters = () => {
  const { columns, filters, setFilters } = useTableContext();

  const handleFilterChange = (columnKey, value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [columnKey]: value,
    }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {columns.map(column => (
        <div key={column.key} className="flex flex-col">
          <label htmlFor={column.key} className="block text-sm font-medium text-gray-700">
            {column.label}
          </label>
          <input
            type="text"
            id={column.key}
            value={filters[column.key] || ''}
            onChange={(e) => handleFilterChange(column.key, e.target.value)}
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            placeholder={`Filtrar ${column.label}`}
          />
        </div>
      ))}
    </div>
  );
};

export default Filters;

