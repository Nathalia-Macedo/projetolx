import React from 'react';
import { useTableContext } from '../Context/TableContext';
import { SearchIcon } from '@heroicons/react/solid';

const GlobalSearch = () => {
  const { searchTerm, setSearchTerm } = useTableContext();

  return (
    <div className="relative">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 sm:text-sm"
        placeholder="Pesquisar em todas as colunas"
      />
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
      </div>
    </div>
  );
};

export default GlobalSearch;

