import React from 'react';
import TableCell from './TableCell';

const TableRow = ({ row, columns }) => {
  return (
    <tr className="hover:bg-gray-50">
      {columns.map(column => (
        <TableCell key={column.key} value={row[column.key]} />
      ))}
    </tr>
  );
};

export default TableRow;

