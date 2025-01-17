import React from 'react';

const TableList = ({ tables, onTableSelect, currentTableId }) => {
  return (
    <div className="flex items-center space-x-2">
      {tables.map(table => (
        <button
          key={table.id}
          onClick={() => onTableSelect(table.id)}
          className={`inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md ${
            currentTableId === table.id
              ? 'text-white bg-indigo-600 hover:bg-indigo-700'
              : 'text-gray-700 bg-white hover:bg-gray-50'
          } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
        >
          {table.title}
        </button>
      ))}
    </div>
  );
};

export default TableList;

