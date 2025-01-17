import React from 'react';
import { useTableContext } from '../Context/TableContext';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/solid';

const TableHeader = () => {
  const { columns, visibleColumns, sortColumn, sortDirection, setSortColumn, setSortDirection } = useTableContext();

  const handleSort = (columnKey) => {
    if (sortColumn === columnKey) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(columnKey);
      setSortDirection('asc');
    }
  };

  return (
    <thead className="bg-gray-50">
      <tr>
        {columns
          .filter(column => visibleColumns.includes(column.key))
          .map(column => (
            <th
              key={column.key}
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => handleSort(column.key)}
            >
              <div className="flex items-center space-x-1">
                <span>{column.label}</span>
                {sortColumn === column.key && (
                  sortDirection === 'asc' ? (
                    <ChevronUpIcon className="w-4 h-4" />
                  ) : (
                    <ChevronDownIcon className="w-4 h-4" />
                  )
                )}
              </div>
            </th>
          ))
        }
      </tr>
    </thead>
  );
};

export default TableHeader;

