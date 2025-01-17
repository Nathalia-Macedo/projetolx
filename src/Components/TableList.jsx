import React, { useState } from 'react';

const TableList = ({ tables, onTableSelect, currentTableId }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile dropdown */}
      <div className="relative sm:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          {tables.find(table => table.id === currentTableId)?.title}
          <svg
            className={`ml-2 h-5 w-5 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {/* Dropdown menu */}
        {isOpen && (
          <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-300">
            {tables.map(table => (
              <button
                key={table.id}
                onClick={() => {
                  onTableSelect(table.id);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-2 text-sm ${
                  currentTableId === table.id
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {table.title}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Desktop buttons */}
      <div className="hidden sm:flex sm:flex-row gap-2">
        {tables.map(table => (
          <button
            key={table.id}
            onClick={() => onTableSelect(table.id)}
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              currentTableId === table.id
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            {table.title}
          </button>
        ))}
      </div>
    </>
  );
};

export default TableList;

