import React from 'react';
import { TableProvider } from '../Context/TableContext';
import { useTable } from '../hooks/useTable';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import Pagination from './Pagination';
import Filters from './Filters';
import GlobalSearch from './GlobalSearch';
import ColumnSelector from './ColumnSelector';
import ExportButton from './ExportButton';
import ChatGPTHelper from './ChatGPTHelper';

const DataTable = ({ data, columns }) => {
  return (
    <TableProvider>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-4 space-y-4">
          <div className="flex justify-between items-center">
            <GlobalSearch />
            <div className="flex space-x-2">
              <ColumnSelector label="Colunas" />
              <ExportButton />
              <ChatGPTHelper />
            </div>
          </div>
          <Filters />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <TableHeader />
            <TableBody />
          </table>
        </div>
        <Pagination />
      </div>
    </TableProvider>
  );
};

export default DataTable;

