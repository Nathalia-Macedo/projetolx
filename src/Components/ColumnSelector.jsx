import React, { useState } from 'react';
import { useTableContext } from '../Context/TableContext';
import { ViewListIcon } from '@heroicons/react/solid';

const ColumnSelector = () => {
  const { columns, visibleColumns, setVisibleColumns } = useTableContext();
  const [isOpen, setIsOpen] = useState(false);

  const toggleColumn = (columnKey) => {
    setVisibleColumns(prev =>
      prev.includes(columnKey)
        ? prev.filter(key => key !== columnKey)
        : [...prev, columnKey]
    );
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <ViewListIcon className="-ml-1 mr-2 h-5 w-5 text-gray-400" aria-hidden="true" />
        Colunas
      </button>
      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            {columns.map(column => (
              <label key={column.key} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">
                <input
                  type="checkbox"
                  checked={visibleColumns.includes(column.key)}
                  onChange={() => toggleColumn(column.key)}
                  className="form-checkbox h-5 w-5 text-indigo-600"
                />
                <span className="ml-2">{column.label}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ColumnSelector;

