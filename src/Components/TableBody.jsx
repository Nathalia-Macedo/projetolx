import React from 'react';
import { useTable } from '../hooks/useTable';
import { useTableContext } from '../Context/TableContext';
import TableRow from './TableRow';

const TableBody = () => {
  const { columns, visibleColumns } = useTableContext();
  const { paginatedData } = useTable();

  return (
    <tbody className="bg-white divide-y divide-gray-200">
      {paginatedData.map((row, index) => (
        <TableRow
          key={index}
          row={row}
          columns={columns.filter(column => visibleColumns.includes(column.key))}
        />
      ))}
    </tbody>
  );
};

export default TableBody;

